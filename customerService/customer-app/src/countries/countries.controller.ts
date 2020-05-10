import {Body, Controller, Param, Put} from "@nestjs/common";
import {CountriesService} from "./countries.service";
import { ApiBody, ApiParam } from "@nestjs/swagger";
import {CountryModel, CountryBoundary} from "../models/country.model";



@Controller("countries")
export class CountriesController {

    constructor(private countryService:CountriesService) {
    }

    @ApiParam({ name: "countryCode", required: true})
    @Put("/:countryCode")
    async updateCountryCode(@Body() country:CountryBoundary,@Param("countryCode") countryCode:string)
    {
        await this.countryService.updateCountry(countryCode,country);
    }

}
