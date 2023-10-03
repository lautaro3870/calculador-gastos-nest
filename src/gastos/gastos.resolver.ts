import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GastosService } from './gastos.service';
import { Gasto } from './entities/gasto.entity';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';

@Resolver(() => Gasto)
export class GastosResolver {
  constructor(private readonly gastosService: GastosService) {}

  @Mutation(() => Gasto)
  async createGasto(
    @Args('createGastoInput') createGastoInput: CreateGastoInput,
  ): Promise<Gasto> {
    return this.gastosService.create(createGastoInput);
  }

  @Query(() => [Gasto], { name: 'gastos' })
  async findAll(): Promise<Gasto[]> {
    return this.gastosService.findAll();
  }

  @Query(() => [Gasto], { name: 'gastosPorMes' })
  async findGastosPorMes(
    @Args('mes', { type: () => Int }) mes: number,
    @Args('anio', { type: () => Int }) anio: number,
  ): Promise<Gasto[]> {
    return this.gastosService.findGastosPorMes(mes, anio);
  }

  @Query(() => Gasto, { name: 'gasto' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gastosService.findOne(id);
  }

  @Mutation(() => Gasto)
  updateGasto(@Args('updateGastoInput') updateGastoInput: UpdateGastoInput) {
    return this.gastosService.update(updateGastoInput.id, updateGastoInput);
  }

  @Mutation(() => Gasto)
  async removeGasto(@Args('id', { type: () => ID }) id: string): Promise<Gasto> {
    return this.gastosService.remove(id);
  }
}
