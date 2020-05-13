import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CountryEntity } from "./entities/country.entity";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomersModule } from "./customers/customers.module";
import { CountriesModule } from "./countries/countries.module";
import { CustomersService } from './customers/customers.service';
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST, // 'localhost'
      port: parseInt(process.env.POSTGRESQL_PORT, 5432), //5432
      username: process.env.POSTGRESQL_USERNAME, //'postgres'
      password: process.env.POSTGRESQL_PASSWORD,//'12345'
      database: process.env.POSTGRESQL_DATABASE,//'postgres'
      entities: [CountryEntity, CustomerEntity],
      synchronize: true
    }),
    
    CustomersModule,
    CountriesModule,

  ],
  controllers: [AppController],
  providers: [AppService, CustomersService],
})
export class AppModule { }
