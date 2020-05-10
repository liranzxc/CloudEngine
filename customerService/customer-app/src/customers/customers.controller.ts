import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req} from "@nestjs/common";
import {CustomerBoundary, CustomerDTO} from "../models/customer.model";
import {CustomersService} from "./customers.service";
import {CustomerEntity} from "../entities/customer.entity";
import {date} from 'date-and-time';
import { ApiParam, ApiBody, ApiQuery } from "@nestjs/swagger";


@Controller("/customers")
export class CustomersController {

    constructor( private customerService:CustomersService) {
    }

    @ApiBody({ type: CustomerBoundary })
    @Post()
    async createCustomer(@Body() customerDto :CustomerBoundary)
    {
        let check = new CustomerBoundary(await this.customerService.createCustomer(this.toEntity(customerDto)));
        return check;
    }

    @ApiParam({ name: "email", required: true})
    @Get("/:email")
    async getCustomerByEmail(@Param("email") email:string)
    {
        let customer :CustomerEntity =  await  this.customerService.getCustomerByEmail(email);
        return new CustomerBoundary(customer);
    }

    @ApiParam({ name: "email", required: true})
    @ApiBody({ type: CustomerBoundary })
    @Put("/:email")
    async updateCustomerByEmail(@Param("email") email:string,@Body() customerDto :CustomerBoundary)
    {
        await this.customerService.updateCustomerByEmail(email,this.toEntity(customerDto));
    }

    @Delete()
    async deleteAllCustomer()
    {
        await this.customerService.deleteAllCustomers();
    }


    @ApiQuery({ name: "size", required: false })
    @ApiQuery({ name: "page", required: false })
    @ApiQuery({ name: "byLastName", required: false })
    @ApiQuery({ name: "byAgeGreaterThan", required: false })
    @ApiQuery({ name: "byCountryCode", required: false })
    @Get()
    async getCustomerPagination(@Req() req,
                                @Query("size") size:number = 5 ,
                                @Query("page") page:number = 0,
                                @Query("byLastName") byLastName: string,
                                @Query("byAgeGreaterThan") byAgeGreaterThan:number,
                                @Query("byCountryCode") byCountryCode: string)

    {
        if([byLastName,byCountryCode,byAgeGreaterThan].filter( i => i !== undefined).length > 1)
        {
            return "not allow";
        }

        //TODO transform to integer
        let filter = {...{size:Number(size),page:Number(page)} , ...req.query};

        let customers :CustomerEntity[] = await  this.customerService.getCustomers(filter);
        return customers.map(c => new CustomerBoundary(c));
    }

    toEntity(customerDto: CustomerBoundary)
    {
    const date = require('date-and-time');
    let entity :CustomerEntity = {} as CustomerEntity;
    entity.email = customerDto.email;
    entity.name = customerDto.name;
    entity.country = customerDto.country;
    entity.birthdate=date.parse(customerDto.birthdate,'DD-MM-YYYY')
    return entity;
    }




}
