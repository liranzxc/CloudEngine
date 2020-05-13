import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomersService } from './customers/customers.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private customerService:CustomersService) { }
}
