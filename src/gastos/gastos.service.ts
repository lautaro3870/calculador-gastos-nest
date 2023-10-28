import { Injectable } from '@nestjs/common';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { Gasto } from './entities/gasto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GastosCategoriaMes } from './dto/gastos-categoria-mes';
import { GastosDiarios } from './dto/gastos-diarios';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastosRepository: Repository<Gasto>,
  ) {}

  // -------------- Queries
  async findAll(): Promise<Gasto[]> {
    return await this.gastosRepository.find({ where: { estado: true } });
  }

  async findGastosPorMes(mes: number, anio: number): Promise<Gasto[]> {
    const result = await this.gastosRepository
      .createQueryBuilder('gasto')
      .where('EXTRACT(MONTH FROM fecha) = :mes', { mes })
      .andWhere('EXTRACT(YEAR FROM fecha) = :anio', { anio });
    return result.getMany();
  }

  async findGastosPorCategoria(categoria: string): Promise<Gasto[]> {
    return await this.gastosRepository.find({ where: { categoria } });
  }

  async findGastosPorCategoriaMes(): Promise<GastosCategoriaMes[]> {
    const query = `SELECT
                    ROW_NUMBER() OVER () AS id,
                    EXTRACT(month from fecha) as Mes ,
                    COALESCE(SUM(CASE WHEN categoria = 'Super' THEN monto ELSE 0 END), 0) AS Super,
                    COALESCE(SUM(CASE WHEN categoria = 'Cafe' THEN monto ELSE 0 END) , 0) AS Cafe,
                    COALESCE(SUM(CASE WHEN categoria = 'Ropa' THEN monto ELSE 0 END) , 0) AS Ropa,
                    COALESCE(SUM(CASE WHEN categoria = 'Bar' THEN monto ELSE 0 END) , 0)AS Bar,
                    COALESCE(SUM(CASE WHEN categoria = 'Boludeces' THEN monto ELSE 0 END), 0) AS Boludeces,
                    COALESCE(SUM(CASE WHEN categoria = 'Metro' THEN monto ELSE 0 END), 0) AS Metro,
                    COALESCE(SUM(CASE WHEN categoria = 'Bondi' THEN monto ELSE 0 END), 0) AS Bondi,
                    COALESCE(SUM(CASE WHEN categoria = 'Otros' THEN monto ELSE 0 END), 0) AS Otros,
                    SUM(monto) AS Total
                    FROM
                        gastos
                    GROUP BY
                    EXTRACT(month from fecha)`;
    const result = await this.gastosRepository.query(query);
    return result;
  }

  async getGastosDiarios(): Promise<GastosDiarios[]> {
    const query = `select sum(monto) AS suma, fecha AS fecha, extract(month from fecha) AS mes
                    from gastos where estado = true
                    group by fecha, extract(month from fecha)`;
    return await this.gastosRepository.query(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} gasto`;
  }

  // -------------- Mutaciones
  async create(createGastoInput: CreateGastoInput): Promise<Gasto> {
    const newGasto = this.gastosRepository.create(createGastoInput);
    return await this.gastosRepository.save(newGasto);
  }

  async removeAll() {
    await this.gastosRepository.update({}, { estado: false });
    return true;
  }

  async remove(id: string): Promise<Gasto> {
    const gasto = await this.gastosRepository.findOneBy({ id });
    await this.gastosRepository.remove(gasto);
    return { ...gasto, id };
  }
}
