import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {getRepository} from "typeorm";
import {CountryEntity} from "../entities/country.entity";
import {CountryModel} from "../models/country.model";


@Injectable()
export class CountriesService {

    async updateCountry(countryCode: string, countryDto: CountryModel) {

       let country:CountryEntity = await getRepository(CountryEntity).findOne({ where : { countryCode : countryCode }});

       if(country) {
           country.countryName = countryDto.countryName;
           await getRepository(CountryEntity).save(country);
       }
       else {
           throw new HttpException("country code not found",HttpStatus.NOT_FOUND);
       }

    }

    async getCountryByCode(countryCode:string) {
        return getRepository(CountryEntity).findOne({where : { countryCode : countryCode}});
    }


    async createCountry(countryDto: CountryModel) {
        let country:CountryEntity = {...countryDto} as CountryEntity;
        return getRepository(CountryEntity).save(country);
    }
}
