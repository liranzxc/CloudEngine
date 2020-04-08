import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiTags, ApiQuery } from "@nestjs/swagger";
import { SongEntity, SongModel, SongServiceModel, OrderTypes, SongFields, SongFieldsOrderTypes } from "./songs.model";

import { SongService } from './songs.service';

@ApiTags("songs")
@Controller('songs')
export class SongsController {


    constructor(private service: SongService) {

    }

    @ApiParam({ name: "id", required: true })
    @Get("/song/:songId")
    async getById(@Param("songId") id) {
        // if song does not exist return appropriate error code ( maybe 404 ?)
        return this.service.getById(id);
    }

    @ApiBody({ type: SongEntity })
    @ApiCreatedResponse({
        description: 'The song has been successfully created.',
        type: SongEntity,
    })
    @Post("/songs")
    async createSong(@Body() song: SongEntity) {
        // Should return 500 if song already exists
        return this.service.createSong(song);
    }

    @ApiParam({ name: "id", required: true })
    @ApiBody({ type: SongEntity })
    @Put("/songs/:songId")
    async updateSong(@Param("songId") id, @Body() song: SongEntity) {
        // if song does not exist return appropriate error code ( maybe 404 ?)
        this.service.updateSong(id, song);
    }

    @Delete("/songs")
    async deleteAll() {
        this.service.deleteAll();
    }

    @ApiQuery({ name: "size", required: false })
    @ApiQuery({ name: "page", required: false })
    @ApiQuery({ name: "sortBy", required: false })
    @ApiQuery({ name: "sortOrder", required: false })
    @ApiQuery({ name: "criteriaType", required: false })
    @ApiQuery({ name: "criteriaValue", required: false })
    @Get("/songs/search")
    async getSongs(@Query("size") size: number = 10, @Query("page") page: number = 0, @Query("sortBy")
    sortBy: string = SongFieldsOrderTypes.SONG_ID, @Query("sortOrder") sortOrder: string = OrderTypes.ASCEND
        , @Query("criteriaType") criteriaType: string, @Query("criteriaValue") criteriaValue: object) {
            
        return this.service.getSongs(page, size, sortBy, sortOrder, criteriaType, criteriaValue);
    }
}
