import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GastosService } from './gastos.service';
import { Gasto } from './entities/gasto.entity';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';
import { GastosCategoriaMes } from './dto/gastos-categoria-mes';

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

  @Query(() => [GastosCategoriaMes], {name: "gastosPorCategoriaYMes"})
  async findGastoPorCategoriaMes(): Promise<GastosCategoriaMes[]> {
    return await this.gastosService.findGastosPorCategoriaMes()
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

  @Query(() => [Gasto], { name: 'gastosPorCategoria' })
  async findGastosPorCategoria(
    @Args('categoria', { type: () => String }) categoria: string,
  ): Promise<Gasto[]> {
    return await this.gastosService.findGastosPorCategoria(categoria);
  }

  @Query(() => Boolean)
  async removeAll(): Promise<boolean> {
    return await this.gastosService.removeAll();
  }

  @Mutation(() => Gasto)
  async removeGasto(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Gasto> {
    return this.gastosService.remove(id);
  }
}
