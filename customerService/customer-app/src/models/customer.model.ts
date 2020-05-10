import {CountryModel} from "./country.model";
import {CustomerEntity} from "../entities/customer.entity";
import date from 'date-and-time';
import { IsEmail, IsDateString, IsNotEmpty } from "class-validator";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

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
            return {...customerEntity,name: Name, birthdate : date.format(customerEntity.birthdate,'DD-MM-YYYY') } as CustomerBoundary;
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

    // toEntity(customerDto: CustomerBoundary)
    // {
    //     const date = require('date-and-time');
    //     let entity :CustomerEntity = {} as CustomerEntity;
    //     entity.email = customerDto.email;
    //     if (!customerDto.name.first||!customerDto.name.last) {
    //         throw new HttpException("Name should have first and last name.", HttpStatus.BAD_REQUEST);
    //     }
    //     entity.name = customerDto.name;

    //     entity.country = customerDto.country;
        
    //     entity.birthdate=date.parse(customerDto.birthdate,'DD-MM-YYYY')
    //     if (entity.birthdate.getTime()!==entity.birthdate.getTime()) {
    //         throw new HttpException("Bad date format. Should be DD-MM-YYYY", HttpStatus.BAD_REQUEST);
    //     }
    //     return entity;
    // }


}


export interface NameModel {
    first:string,
    last:string;
}
