import { Injectable } from '@nestjs/common';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { Gasto } from './entities/gasto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    return await this.gastosRepository.find({where: {categoria}})
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
    return {...gasto, id};
  }
}
