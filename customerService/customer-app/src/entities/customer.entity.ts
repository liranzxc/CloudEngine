import {CustomerModel, NameModel, CustomerBoundary} from "../models/customer.model";
import {CountryEntity} from "./country.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {IsDate, IsDateString, IsEmail, IsISO8601} from "class-validator";
import date from 'date-and-time';

@Entity("customer")
export class CustomerEntity implements CustomerModel{
    // constructor(customerModel:CustomerBoundary=undefined) {
    //     if(customerModel)
    //     {
    //         const date = require('date-and-time');
    //         this.country = {...customerModel.country} as CountryEntity;
    //         this.email = customerModel.email;
    //         this.name =customerModel.name;
    //         //let birth = new Date(customerModel.birthdate) ;
    //         this.birthdate = date.parse(customerModel.birthdate, 'DD-MM-YYYY')
    //         console.log(this.birthdate + "entity constructor")

    //         return this;
    //     }
    // }
    @PrimaryColumn()
    @IsEmail()
    email: string;

    @Column({type:'simple-json'})
    name: NameModel;

    @Column({type:"date"})
    birthdate: Date ;

    @ManyToOne( () => CountryEntity)
    country: CountryEntity;
}
