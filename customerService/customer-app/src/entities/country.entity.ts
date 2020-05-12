import {CountryModel} from "../models/country.model";
import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {CustomerEntity} from "./customer.entity";
import {Length} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


@Entity("country")
export class CountryEntity implements CountryModel{
    @ApiProperty()
    @PrimaryColumn()
    @Length(2,2)
    countryCode: string;

    @ApiProperty()
    @Column({type:"text"})
    countryName: string;
}
