import { CountryModel, CountryBoundary } from "./country.model";
import { CustomerEntity } from "../entities/customer.entity";
import {IsEmail, IsNotEmpty, ValidateNested} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as  date from 'date-and-time';
import {Type} from "class-transformer";


export interface CustomerModel {

    email: string; // id
    firstName: string;
    lastName: string;
    birthdate: Date; //dd-MM-yyyy
    country: CountryModel;
}

export interface CustomerDTO {

    email: string; // id
    name: NameBoundary;
    birthdate: string; //dd-MM-yyyy
    country: CountryBoundary;
}

export interface NameModel {
    first: string,
    last: string;
}

export class NameBoundary implements NameModel {

    constructor(nameBoundary: NameBoundary = undefined) {

        if (nameBoundary) {
            return { ...nameBoundary } as NameBoundary;
        }

    }

    @ApiProperty()
    @IsNotEmpty()
    first: string;

    @ApiProperty()
    @IsNotEmpty()
    last: string;
}

export class CustomerBoundary implements CustomerDTO {


    constructor(customerEntity: CustomerEntity = undefined) {

        if (customerEntity) {
            let Name = { first: customerEntity.firstName, last: customerEntity.lastName } as NameModel;
            let Country = new CountryBoundary(customerEntity.country);
            return { email: customerEntity.email, country: Country, name: Name, birthdate: date.format(customerEntity.birthdate, 'DD-MM-YYYY') } as CustomerBoundary;
        }

    }


    @IsEmail()
    @ApiProperty()
    email: string; // id

    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty()
    @Type(() => NameBoundary)
    name: NameBoundary;

    @IsNotEmpty()
    @ApiProperty()
    birthdate: string; //dd-MM-yyyy

    @IsNotEmpty()
    @ApiProperty()
    country: CountryBoundary;

    /**
     * function convert from bounding to entity
     * @param customer
     */
    static toEntity(customer: CustomerBoundary): CustomerEntity {
        let entity: CustomerEntity = {} as CustomerEntity;
        entity.email = customer.email;

        if (!customer.name.hasOwnProperty("first") || !customer.name.hasOwnProperty("last")) {
            throw new HttpException("Name should have first and last name.", HttpStatus.BAD_REQUEST);
        }

        entity.firstName = customer.name.first;
        entity.lastName = customer.name.last;

        if (!customer.country.hasOwnProperty("countryCode") || !customer.country.hasOwnProperty("countryName")) {
            throw new HttpException("Country should have countryCode and countryName properties.", HttpStatus.BAD_REQUEST);
        }
        else if (customer.country.countryCode.length != 2) {
            throw new HttpException("Country should have countryCode of 2 letters only.", HttpStatus.BAD_REQUEST);
        }
        entity.country = customer.country;

        entity.birthdate = date.parse(customer.birthdate, 'DD-MM-YYYY')
        if (entity.birthdate.getTime() !== entity.birthdate.getTime()) {
            throw new HttpException("Bad date format. Should be DD-MM-YYYY", HttpStatus.BAD_REQUEST);
        }
        return entity;
    }


}
