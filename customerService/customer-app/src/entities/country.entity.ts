import {CountryModel} from "../models/country.model";
import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {CustomerEntity} from "./customer.entity";
import {Length} from "class-validator";


@Entity("country")
export class CountryEntity implements CountryModel{

    @PrimaryColumn()
    @Length(2,2)
    countryCode: string;

    @Column({type:"text"})
    countryName: string;

    //
    // @OneToMany(type => CustomerEntity , (customer : CustomerEntity) => customer.country)
    // customerId:CustomerEntity;
}
