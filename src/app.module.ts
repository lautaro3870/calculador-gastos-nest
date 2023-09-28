import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { GastosModule } from './gastos/gastos.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      // playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // plugins: [
      //   ApolloServerPluginLandingPageLocalDefault
      // ]
    }),
    ConfigModule.forRoot(),
    GastosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
