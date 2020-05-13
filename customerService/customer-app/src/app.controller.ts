import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerBoundary, NameBoundary } from './models/customer.model';
import { ApiBody } from '@nestjs/swagger';
import { range } from 'rxjs';
import { CustomersService } from './customers/customers.service';
import { CountryBoundary } from './models/country.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private customerService:CustomersService) { }

  @Get("/Add1000")
  async createCustomer() {
    for (var i=1; i < 1000; i++) {
      var customer =  {
        email: i*1200 + "@gmail.com",
        country: { 
          countryCode: "LI",
          countryName: "randName " + i*150
        } as CountryBoundary,
        "name" : {"first" : i + "", "last" : i*10 + ""} as NameBoundary,
        birthdate : "01-01-" + (1000 + i)
      } as CustomerBoundary
      let check = new CustomerBoundary(await this.customerService.createCustomer(CustomerBoundary.toEntity(customer)));
    }
      
  }
}
