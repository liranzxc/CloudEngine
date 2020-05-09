import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CountryEntity} from "./entities/country.entity";
import {CustomerEntity} from "./entities/customer.entity";
import {CustomersModule} from "./customers/customers.module";
import {CountriesModule} from "./countries/countries.module";

@Module({
  imports: [


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_PORT, 10),
      username: process.env.POSTGRESQL_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      entities: [CountryEntity,CustomerEntity],
      synchronize: true
    }),
    CustomersModule,
    CountriesModule


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
