import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { NameModel } from "../models/customer.model";
import { getRepository, LessThan} from "typeorm";
import { CustomerEntity } from "../entities/customer.entity";
import { CountriesService } from "../countries/countries.service";
import { CountryEntity } from "../entities/country.entity";
import { CountryModel } from "src/models/country.model";
import * as date from 'date-and-time';


@Injectable()
export class CustomersService {
    constructor(private countryService: CountriesService) {
    }

    /***
     * filter must be contains page and size
     * @param filter
     */
    async getCustomers(filter: any) {


        let query = { page: filter.page, size: filter.size };

        let keys = Object.keys(filter);

        if (keys.includes("byLastName")) {
            query = { ...query, ...{ "lastName": filter["byLastName"] } }
        }

        if (keys.includes("byCountryCode")) {
            query = { ...query, ...{ "country": filter["byCountryCode"] } }
        }

        if (keys.includes("byAgeGreaterThan")) {
            let dateNow = new Date();
            let newYear: number = dateNow.getFullYear() - Number(filter["byAgeGreaterThan"]);
            dateNow.setFullYear(newYear);
            dateNow = date.format(dateNow, "YYYY-MM-DD");
            dateNow = date.parse(dateNow, "YYYY-MM-DD");
            query = { ...query, ...{ "birthdate": LessThan(dateNow) } };
        }

        let customers: CustomerEntity[] = await getRepository(CustomerEntity).find({
            skip: query.page * query.size, take: query.size, where: {
                ...query
            }, relations: ["country"]
        });
        customers.forEach(c => c.birthdate = date.parse(c.birthdate, "YYYY-MM-DD"));
        return customers;



    }

    async deleteAllCustomers() {
        await getRepository(CustomerEntity).delete({});
    }

    async updateCustomerByEmailAndFields(email: string, customerUpdateFields: Map<string, object>) {
        let customer: CustomerEntity = await getRepository(CustomerEntity).findOne({ where: { email: email }, relations: ["country"] });

        if (customer) {
            for (let [key, value] of Object.entries(customerUpdateFields)) {
                if (key == "name") {
                    value = value as NameModel;
                    if (value.hasOwnProperty("first")) {
                        customer.firstName = value.first;
                    }
                    if (value.hasOwnProperty("last")) {
                        customer.lastName = value.last;
                    }
                }
                else if (key == "country") {
                    value = value as CountryModel;
                    if (value.hasOwnProperty("countryCode")) {
                        let CountryJSON: CountryEntity = await this.countryService.getCountryByCode(value.countryCode);
                        if ((typeof CountryJSON) != 'undefined') {
                            customer.country = CountryJSON;
                        }
                        else {
                            throw new HttpException("country code does not exist.", HttpStatus.NOT_FOUND);
                        }
                    }
                    else {
                        throw new HttpException("Cannot update country for customer without a countryCode.", HttpStatus.BAD_REQUEST);
                    }
                }
                else if (key == "birthdate") {
                    value = date.parse(value, 'DD-MM-YYYY');
                    if (value.getTime() !== value.getTime()) {
                        throw new HttpException("Bad date format. Should be DD-MM-YYYY", HttpStatus.BAD_REQUEST);
                    }
                    customer.birthdate = value;
                }

                else if (key != "email") {
                    console.log("We found new key= " + key + " and value= " + value + ", maybe put exception here.");
                }
            }
            await getRepository(CustomerEntity).save(customer);
        }
        else {
            throw new HttpException("customer email does not exists", HttpStatus.NOT_FOUND);
        }
    }

    async getCustomerByEmail(email: string) {
        let customer: CustomerEntity = await getRepository(CustomerEntity).findOne({ where: { email: email }, relations: ["country"] });

        if (customer) {
            customer.birthdate = date.parse(customer.birthdate, "YYYY-MM-DD");
            return customer;
        }
        else {
            throw new HttpException("customer not exists", HttpStatus.NOT_FOUND);
        }
    }

    async createCustomer(customerBody: CustomerEntity) {

        let customer: CustomerEntity = await getRepository(CustomerEntity).findOne({ where: { email: customerBody.email }, relations: ["country"] });

        if (customer) {
            throw new HttpException("email already exists", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            let CountryJSON: CountryEntity = await this.countryService.getCountryByCode(customerBody.country.countryCode);


            if (CountryJSON) {
                customerBody.country = CountryJSON;
            }
            else {
                let countrySave: CountryEntity = await this.countryService.createCountry(customerBody.country);
                customerBody.country = countrySave;
            }
            return getRepository(CustomerEntity).save(customerBody);
        }

    }
}
