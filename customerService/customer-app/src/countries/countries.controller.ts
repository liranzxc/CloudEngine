import {Body, Controller, Param, Put} from "@nestjs/common";
import {CountriesService} from "./countries.service";


@Controller("countries")
export class CountriesController {

    constructor(private countryService:CountriesService) {
    }

    @Put("/:countryCode")
    async updateCountryCode(@Param("countryCode") countryCode:string,@Body() CountryModel)
    {
        await this.countryService.updateCountry(countryCode,CountryModel)
    }

}
