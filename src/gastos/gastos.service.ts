import { Injectable } from '@nestjs/common';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { Gasto } from './entities/gasto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GastosCategoriaMes } from './dto/gastos-categoria-mes';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastosRepository: Repository<Gasto>,
  ) {}

  async create(createGastoInput: CreateGastoInput): Promise<Gasto> {
    const newGasto = this.gastosRepository.create(createGastoInput);
    return await this.gastosRepository.save(newGasto);
  }

  async findAll(): Promise<Gasto[]> {
    return await this.gastosRepository.find();
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
                    EXTRACT(month from fecha) as Mes ,
                    COALESCE(SUM(CASE WHEN categoria = 'Super' THEN monto ELSE 0 END), 0) AS Super,
                    COALESCE(SUM(CASE WHEN categoria = 'Cafe' THEN monto ELSE 0 END) , 0) AS Cafe,
                    COALESCE(SUM(CASE WHEN categoria = 'Ropa' THEN monto ELSE 0 END) , 0) AS Ropa,
                    COALESCE(SUM(CASE WHEN categoria = 'Bar' THEN monto ELSE 0 END) , 0)AS Bar,
                    COALESCE(SUM(CASE WHEN categoria = 'Boludeces' THEN monto ELSE 0 END), 0) AS Boludeces,
                    COALESCE(SUM(CASE WHEN categoria = 'Metro' THEN monto ELSE 0 END), 0) AS Metro,
                    COALESCE(SUM(CASE WHEN categoria = 'Bondi' THEN monto ELSE 0 END), 0) AS Bondi,
                    COALESCE(SUM(CASE WHEN categoria = 'Otros' THEN monto ELSE 0 END), 0) AS Otros
                    FROM
                        gastos
                    GROUP BY
                    EXTRACT(month from fecha)`;
    debugger
    const result = await this.gastosRepository.query(query);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} gasto`;
  }

  update(id: number, updateGastoInput: UpdateGastoInput) {
    return `This action updates a #${id} gasto`;
  }

  async remove(id: string): Promise<Gasto> {
    const gasto = await this.gastosRepository.findOneBy({ id });
    await this.gastosRepository.remove(gasto);
    return { ...gasto, id };
  }
}
