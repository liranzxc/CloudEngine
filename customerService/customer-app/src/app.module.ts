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
      host: 'localhost',//process.env.POSTGRESQL_HOST,
      port: 5432,//parseInt(process.env.POSTGRESQL_PORT, 10),
      username: 'postgres',//process.env.POSTGRESQL_USERNAME,
      password: '12345',//process.env.POSTGRESQL_PASSWORD,
      database: 'postgres',//process.env.POSTGRESQL_DATABASE,
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
