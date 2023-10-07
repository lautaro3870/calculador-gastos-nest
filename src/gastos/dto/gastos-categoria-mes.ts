import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GastosCategoriaMes { 
    @Field(() => String)
    mes: string;

    @Field(() => Float)
    super: number;

    @Field(() => Float)
    cafe: number;

    @Field(() => Float)
    bondi: number;

    @Field(() => Float)
    metro: number;

    @Field(() => Float)
    bar: number;

    @Field(() => Float)
    boludeces: number;

    @Field(() => Float)
    ropa: number;

    @Field(() => Float)
    otros: number;
}