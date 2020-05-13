import { CustomerModel, NameModel, CustomerBoundary } from "../models/customer.model";
import { CountryEntity } from "./country.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity implements CustomerModel {

    @PrimaryColumn()
    email: string;

    @Column({ type: 'text' })
    firstName: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: "date" })
    birthdate: Date;

    @ManyToOne(() => CountryEntity)
    country: CountryEntity;
}
