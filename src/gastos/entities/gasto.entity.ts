import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gastos' })
@ObjectType()
export class Gasto {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => Float)
  monto: number;

  @Column()
  @Field(() => String)
  categoria: string;
  
  @Column({default: true})
  @Field(() => String)
  estado: boolean;
}
