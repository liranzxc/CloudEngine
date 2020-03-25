import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import { keyObjectPair } from './key.object.pair.model';
import * as uuid from 'uuid';

@ApiTags("storage")
@Controller('storage')
export class StorageController {


    private storage = {};

    @ApiParam({name:"id",required:true})
    @Get(":id")
    async getById(@Param("id") id)
    {
        if(this.storage[id])
        {
            return this.storage[id];
        }
        else
        {
            return new HttpException("not found",HttpStatus.NOT_FOUND);
        }
       
    }

    @ApiBody({ type: 'genric map' })
    @ApiCreatedResponse({
        description: 'The keyObject has been successfully created.',
        type: 'genric map',
    })
    @Post()
    async createDemo(@Body() dto : {})
    {
        const id = uuid.v4()
        const keypair : keyObjectPair =  {
            key : id,
            object : dto
        } as keyObjectPair;

        this.storage[id] = dto;

        return keypair;
    }

    @ApiParam({name:"id",required:true})
    @ApiBody({ type: 'genric map' })
    @Put(":id")
    async updateDemo(@Param("id") id,@Body() dto : {})
    {
        if (dto&&this.storage[id]) {
            this.storage[id]=dto;
        }
        else if(!this.storage[id])
        {
            return new HttpException("not found",HttpStatus.NOT_FOUND);
        }
    }


    @Delete()
    async deleteAll()
    {
        this.storage={}
    }

}
