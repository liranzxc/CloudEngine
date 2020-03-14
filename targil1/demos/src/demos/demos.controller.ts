import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
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

    @Get(":id")
    async getById(@Param("id") id)
    {
        if(this.demos[id])
        {
            return this.demos[id];
        }
        else
        {
            throw new HttpException('No Found', HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async createDemo(@Body() dto : DemoModel)
    {
        if(dto)
        {
            const _id = uuid.v4();
            const demoEntity : DemoEntity = {...{_id: _id},...dto} as DemoEntity;
            this.demos[_id] = demoEntity;
            return demoEntity;
        }
        else
        {
            throw new HttpException('empty body', HttpStatus.BAD_REQUEST);

        }
    }

    @Put(":id")
    async updateDemo(@Param("id") _id,@Body() dto : DemoModel)
    {
        if(this.demos[_id] && dto)
        {
            const demoEntity : DemoEntity = {...{_id : _id},...dto} as DemoEntity;
            this.demos[_id] = demoEntity;
        }
        else
        {
            throw new HttpException('No Found', HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(":id")
    async replaceDemo(@Param("id") _id,@Body() dto : DemoModel)
    {
        if(this.demos[_id] && dto)
        {
            const demoEntity : DemoEntity = {...{_id : _id},...dto} as DemoEntity;
            this.demos[_id] = demoEntity;
        }
        else
        {
            throw new HttpException('No Found', HttpStatus.BAD_REQUEST);
        }

    }

    @Delete()
    async deleteAll(@Param("id") id)
    {
        this.demos = {};
    }

    @Delete(":id")
    async deleteById(@Param("id") _id)
    {
        if(this.demos[_id])
        {
            delete  this.demos[_id];
        }
        else
        {
            throw new HttpException('No Found', HttpStatus.BAD_REQUEST);
        }
    }



}
