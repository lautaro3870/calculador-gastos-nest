import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosResolver } from './gastos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';

@Module({
  providers: [GastosResolver, GastosService],
  imports: [TypeOrmModule.forFeature([Gasto])],
})
export class GastosModule {}
