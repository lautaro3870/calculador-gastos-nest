import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosResolver } from './gastos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { GastosController } from 'src/GastosController';

@Module({
  providers: [GastosResolver, GastosService],
  imports: [TypeOrmModule.forFeature([Gasto])],
  controllers: [GastosController]
})
export class GastosModule {}
