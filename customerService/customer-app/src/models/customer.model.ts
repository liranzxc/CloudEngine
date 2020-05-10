import {CountryModel} from "./country.model";
import {CustomerEntity} from "../entities/customer.entity";
import date from 'date-and-time';

export interface CustomerModel {
    email:string; // id
    name : NameModel;
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
            return {...customerEntity, birthdate : date.format(customerEntity.birthdate,'DD-MM-YYYY') } as CustomerBoundary;
        }

    }


    email:string; // id
    name : NameModel;
    birthdate: string ; //dd-MM-yyyy
    country:CountryModel;

    toEntity(customerDto: CustomerBoundary)
    {
        const date = require('date-and-time');
        let entity :CustomerEntity = {} as CustomerEntity;
        entity.email = this.email;
        entity.name = this.name;
        entity.country = this.country;
        entity.birthdate = date.parse(this.birthdate,'DD-MM-YYYY');
        return entity;
    }


}


export interface NameModel {
    first:string,
    last:string;
}
