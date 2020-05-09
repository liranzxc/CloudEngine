import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req} from "@nestjs/common";
import {CustomerDTO} from "../models/customer.model";
import {CustomersService} from "./customers.service";


@Controller("/customers")
export class CustomersController {

    constructor( private customerService:CustomersService) {
    }

    @Post()
    async createCustomer(@Body() customerDto :CustomerDTO)
    {
        return this.customerService.createCustomer(customerDto);
    }

    @Get("/:email")
    async getCustomerByEmail(@Param("email") email:string)
    {
        return this.customerService.getCustomerByEmail(email);
    }

    @Put("/:email")
    async updateCustomerByEmail(@Param("email") email:string,@Body() customerDto :CustomerDTO)
    {
        await this.customerService.updateCustomerByEmail(email,customerDto);
    }

    @Delete()
    async deleteAllCustomer()
    {
        await this.customerService.deleteAllCustomers();
    }


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

        return this.customerService.getCustomers(filter);
    }





}
