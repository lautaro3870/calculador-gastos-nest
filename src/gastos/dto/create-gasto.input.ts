import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGastoInput {
  
  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  categoria: string;

}
