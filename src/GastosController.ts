import { Repository } from 'typeorm';
import { Gasto } from './gastos/entities/gasto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Get } from '@nestjs/common';

@Controller('/gastos')
export class GastosController {
  constructor(
    @InjectRepository(Gasto) private readonly gastosRepo: Repository<Gasto>,
  ) {}

  @Get()
  async removeAll(): Promise<boolean> {
    const result = await this.gastosRepo.update({}, { estado: false });
    return true;
  }
}
