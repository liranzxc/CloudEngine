import {CountryModel} from "./country.model";
import {CustomerEntity} from "../entities/customer.entity";

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
            return {...customerEntity, birthdate : customerEntity.birthdate.toString() } as CustomerBoundary;
        }

    }


    email:string; // id
    name : NameModel;
    birthdate: string ; //dd-MM-yyyy
    country:CountryModel;


    toEntity()
    {
        let entity :CustomerEntity = {} as CustomerEntity;
        entity.email = this.email;
        entity.name = this.name;
        entity.country = this.country;
        // TODO change the convert
        entity.birthdate = new Date(this.birthdate);

        return entity;
    }
}




export interface NameModel {
    first:string,
    last:string;
}
