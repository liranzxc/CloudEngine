import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags} from "@nestjs/swagger";
import {DemosService} from "./demos.service";
import {DemoEntity, DemoModel} from "./demo.model";
import * as uuid from 'uuid';

@ApiTags("demos")
@Controller('demos')
export class DemosController {


    private demos = {};

    @Get()
    async getAll()
    {
        return this.demos;
    }

    @ApiParam({name:"id",required:true})
    @Get(":id")
    async getById(@Param("id") id)
    {
        if(this.demos[id])
        {
            return this.demos[id];
        }
        else
        {
            throw new HttpException('Demo Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @ApiBody({ type: DemoEntity })
    @ApiCreatedResponse({
        description: 'The demo has been successfully created.',
        type: DemoEntity,
    })
    @Post()
    async createDemo(@Body() dto : DemoModel)
    {
        if(dto)
        {
            const id = uuid.v4();
            const demoEntity : DemoEntity = {...{id: id},...dto} as DemoEntity;
            this.demos[id] = demoEntity;
            return demoEntity;
        }
        else
        {
            throw new HttpException('empty body', HttpStatus.BAD_REQUEST);

        }
    }

    @ApiParam({name:"id",required:true})
    @ApiBody({ type: DemoEntity })
    @Put(":id")
    async updateDemo(@Param("id") id,@Body() dto : DemoModel)
    {
        if(this.demos[id] && dto)
        {
            const demoEntity : DemoEntity = {...{id : id},...dto} as DemoEntity;
            this.demos[id] = demoEntity;
        }
        else
        {
            throw new HttpException('Demo Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @ApiParam({name:"id",required:true})
    @ApiBody({ type: DemoEntity })
    @Patch(":id")
    async replaceDemo(@Param("id") id,@Body() dto : DemoModel)
    {
        if(this.demos[id] && dto)
        {
            const demoEntity : DemoEntity = {...{id : id},...dto} as DemoEntity;
            this.demos[id] = demoEntity;
        }
        else if(dto)
        {
            throw new HttpException('Demo Not Found', HttpStatus.NOT_FOUND);
        }
        else
        {
            throw new HttpException('Empty Body', HttpStatus.BAD_REQUEST);
        }

    }

    @Delete()
    async deleteAll(@Param("id") id)
    {
        this.demos = {};
    }

    @ApiParam({name:"id",required:true})
    @Delete(":id")
    async deleteById(@Param("id") id)
    {
        if(this.demos[id])
        {
            delete  this.demos[id];
        }
        else
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }



}
