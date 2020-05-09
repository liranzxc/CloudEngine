import {CountryModel} from "./country.model";

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

export interface NameModel {
    first:string,
    last:string;
}
