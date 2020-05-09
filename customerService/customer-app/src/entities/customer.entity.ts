import {CustomerModel, NameModel} from "../models/customer.model";
import {CountryEntity} from "./country.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {IsDate, IsDateString, IsEmail, IsISO8601} from "class-validator";

@Entity("customer")
export class CustomerEntity implements CustomerModel{

    @PrimaryColumn()
    @IsEmail()
    email: string;

    @Column({type:'simple-json'})
    name: NameModel;

    @Column({type:"timestamptz"})
    birthdate: Date ;

    @ManyToOne( () => CountryEntity)
    country: CountryEntity;
}
