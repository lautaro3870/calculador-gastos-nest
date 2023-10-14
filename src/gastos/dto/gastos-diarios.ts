import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GastosDiarios {
  @Field(() => Float)
  suma: number;

  @Field(() => Date)
  fecha: Date;

  @Field(() => Int)
  mes: number;
}
