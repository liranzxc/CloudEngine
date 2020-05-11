import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CountryEntity } from "src/entities/country.entity";


export interface CountryModel {
    countryCode:string; // id
    countryName:string;
}

export class CountryBoundary implements CountryModel{



    constructor(countryEntity:CountryEntity=undefined) {

        if(countryEntity) {
            return {...countryEntity} as CountryBoundary;
        }

    }


    @ApiProperty()
    countryCode: string;
    
    @ApiProperty()
    countryName: string;

}
