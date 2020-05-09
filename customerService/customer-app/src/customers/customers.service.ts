import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CustomerDTO} from "../models/customer.model";
import {getRepository} from "typeorm";
import {CustomerEntity} from "../entities/customer.entity";
import {CountriesService} from "../countries/countries.service";
import {CountryEntity} from "../entities/country.entity";


@Injectable()
export class CustomersService {

    constructor(private countryService:CountriesService) {
    }
    async getCustomers(filter: any) {
        return undefined;
    }

    async deleteAllCustomers() {
        await getRepository(CustomerEntity).delete({});
    }

    async updateCustomerByEmail(email: string, customerBody: CustomerEntity) {

        let customer : CustomerEntity = await  getRepository(CustomerEntity).findOne({where : { email:email}});

        if(customer)
        {
            if(customer.country.countryCode !== customerBody.country.countryCode)
            {
                let CountryJSON:CountryEntity = await this.countryService.getCountryByCode(customerBody.country.countryCode);
                if(CountryJSON)
                {
                    customer = {...customer,...customerBody} ;
                    customer.country = CountryJSON;
                    await getRepository(CustomerEntity).save(customer);
                }
                else
                {
                    return new HttpException("country code doesnt exists",HttpStatus.NOT_FOUND);
                }
            }
            else
            {
                delete customerBody.email;
                delete customerBody.country;
                customer = {...customer,...customerBody} ;
                await getRepository(CustomerEntity).save(customer);
            }
        }
        else
        {
            throw  new HttpException("customer email doesnt exists",HttpStatus.NOT_FOUND);
        }



    }

    getCustomerByEmail(email: string) {
        return getRepository(CustomerEntity).findOne({where : { email:email}});
    }

    async createCustomer(customerBody: CustomerEntity) {

        let customer : CustomerEntity = await  getRepository(CustomerEntity).findOne({where : { email:customerBody.email}});

        if(customer)
        {
            throw  new HttpException("email already exists",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else
        {
            let CountryJSON:CountryEntity = await this.countryService.getCountryByCode(customerBody.country.countryCode);


            if(CountryJSON)
            {
                customerBody.country = CountryJSON;
            }
            else
            {
                let countrySave : CountryEntity = await this.countryService.createCountry(customerBody.country);
                customerBody.country = countrySave;
            }


            return getRepository(CustomerEntity).save(customerBody);


        }

    }
}
