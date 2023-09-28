import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGastoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
