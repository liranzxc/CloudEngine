import { Module } from '@nestjs/common';
import {CountriesController} from "./countries.controller";
import {CountriesService} from "./countries.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CountryEntity} from "../entities/country.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CountryEntity])
    ],
    controllers: [CountriesController],
    providers: [CountriesService],
})
export class CountriesModule {}
