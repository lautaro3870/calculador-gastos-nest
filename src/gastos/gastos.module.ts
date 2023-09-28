import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosResolver } from './gastos.resolver';

@Module({
  providers: [GastosResolver, GastosService]
})
export class GastosModule {}
