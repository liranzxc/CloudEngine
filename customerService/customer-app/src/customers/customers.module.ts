import { Module } from '@nestjs/common';
import {CustomersController} from "./customers.controller";
import {CustomersService} from "./customers.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CountryEntity} from "../entities/country.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {CountriesModule} from "../countries/countries.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([CountryEntity,CustomerEntity]),
        CountriesModule,
    ],
    controllers: [CustomersController],
    providers: [CustomersService],
})
export class CustomersModule {}
