import { Injectable } from '@nestjs/common';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';

@Injectable()
export class GastosService {
  create(createGastoInput: CreateGastoInput) {
    return 'This action adds a new gasto';
  }

  findAll() {
    return []
  }

  findOne(id: number) {
    return `This action returns a #${id} gasto`;
  }

  update(id: number, updateGastoInput: UpdateGastoInput) {
    return `This action updates a #${id} gasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasto`;
  }
}
