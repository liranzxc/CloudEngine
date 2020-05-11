import {CountryModel, CountryBoundary} from "./country.model";
import {CustomerEntity} from "../entities/customer.entity";
import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { HttpException, HttpStatus } from "@nestjs/common";

export interface CustomerModel {
    email:string; // id
    firstName : string;
    lastName : string;
    birthdate: Date ; //dd-MM-yyyy
    country:CountryModel;
}

export interface CustomerDTO {
    
    email:string; // id
    name : NameModel;
    birthdate: string ; //dd-MM-yyyy
    country:CountryModel;
}

export class CustomerBoundary implements CustomerDTO{


    constructor(customerEntity:CustomerEntity=undefined) {

        if(customerEntity)
        {
            const date = require('date-and-time');
            // console.log(customerEntity.birthdate+ " check entity");
            // console.log(date.format(customerEntity.birthdate,'DD-MM-YYYY')+ " check boundary");
            let Name = {"first":customerEntity.firstName , "last": customerEntity.lastName} as NameModel;
            let Country = new CountryBoundary(customerEntity.country);
            return {email:customerEntity.email,country: Country,name: Name, birthdate : date.format(customerEntity.birthdate,'DD-MM-YYYY') } as CustomerBoundary;
        }

    }


    @IsEmail()
    @ApiProperty()
    email:string; // id

    @IsNotEmpty()
    @ApiProperty()
    name : NameModel;

    @IsNotEmpty()
    @ApiProperty()
    birthdate: string ; //dd-MM-yyyy

    @IsNotEmpty()
    @ApiProperty()
    country:CountryModel;

    static toEntity(customer:CustomerBoundary) :CustomerEntity
    {
        const date = require('date-and-time');
        let entity :CustomerEntity = {} as CustomerEntity;
        entity.email = customer.email;
    
        if (!customer.name.hasOwnProperty("first")||!customer.name.hasOwnProperty("last")) {
            throw new HttpException("Name should have first and last name.", HttpStatus.BAD_REQUEST);
        }

        entity.firstName = customer.name.first;
        entity.lastName = customer.name.last;

        if (!customer.country.hasOwnProperty("countryCode")||!customer.country.hasOwnProperty("countryName")) {
            throw new HttpException("Country should have countryCode and countryName properties.", HttpStatus.BAD_REQUEST);
        }
        else if(customer.country.countryCode.length != 2){
            throw new HttpException("Country should have countryCode of 2 letters only.", HttpStatus.BAD_REQUEST); 
        }
        entity.country = customer.country;

        entity.birthdate=date.parse(customer.birthdate,'DD-MM-YYYY')
        if (entity.birthdate.getTime()!==entity.birthdate.getTime()) {
            throw new HttpException("Bad date format. Should be DD-MM-YYYY", HttpStatus.BAD_REQUEST);
        }
        return entity;
    }


}
// CustomerBoundary.prototype.toEntity = function(){
//     const date = require('date-and-time');
//     let entity :CustomerEntity = {} as CustomerEntity;
//     entity.email = this.email;

//     if (!this.name.hasOwnProperty("first")||!this.name.hasOwnProperty("last")) {
//         throw new HttpException("Name should have first and last name.", HttpStatus.BAD_REQUEST);
//     }

//     entity.firstName = this.name.first;
//     entity.lastName = this.name.last;

//     if (!this.country.hasOwnProperty("countryCode")||!this.country.hasOwnProperty("countryName")) {
//         throw new HttpException("Country should have countryCode and countryName properties.", HttpStatus.BAD_REQUEST);
//     }
//     else if(this.country.countryCode.length != 2){
//         throw new HttpException("Country should have countryCode of 2 letters only.", HttpStatus.BAD_REQUEST); 
//     }
//     entity.country = this.country;

//     entity.birthdate=date.parse(this.birthdate,'DD-MM-YYYY')
//     if (entity.birthdate.getTime()!==entity.birthdate.getTime()) {
//         throw new HttpException("Bad date format. Should be DD-MM-YYYY", HttpStatus.BAD_REQUEST);
//     }
//     return entity;
// }


export interface NameModel {
    first:string,
    last:string;
}
