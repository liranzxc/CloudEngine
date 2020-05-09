import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags, ApiQuery} from "@nestjs/swagger";
import {DemoEntity, DemoModel} from "./demo.model";
//import * as uuid from 'uuid';
import { demosService } from './demos.service';

@ApiTags("demos")
@Controller('demos')
export class DemosController {


    constructor(private service:demosService)
    {
        
    }

    @ApiParam({name:"id",required:true})
    @Get(":id")
    async getById(@Param("id") id)
    {
       return this.service.getById(id);
    }

    @ApiQuery({name:"size",required:false})
    @ApiQuery({name:"page",required:false})
    @Get()
    async getAllDemoes(@Query("size") size:number=10, @Query("page") page:number=0)
    {
       return this.service.getAll(page,size);
    }

    @ApiBody({ type: DemoEntity })
    @ApiCreatedResponse({
        description: 'The demo has been successfully created.',
        type: DemoEntity,
    })
    @Post()
    async createDemo(@Body() dto : DemoModel)
    {
        return this.service.createDemo(dto);
    }

    @ApiParam({name:"id",required:true})
    @ApiBody({ type: DemoEntity })
    @Put(":id")
    async updateDemo(@Param("id") id,@Body() dto : DemoModel)
    {
        this.service.updateDemo(id,dto);
    }


    @Delete()
    async deleteAll()
    {
        this.service.deleteAll();
    }

}
