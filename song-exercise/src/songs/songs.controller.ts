import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiTags, ApiQuery } from "@nestjs/swagger";
import { SongModel, OrderTypes, SongFields, SongFieldsCriteriaTypes } from "./songs.model";
import { SongService } from './songs.service';

@ApiTags("songs")
@Controller()
export class SongsController {


    constructor(private service: SongService) {

    }

    @ApiParam({ name: "songId", required: true })
    @Get("/song/:songId")
    async getById(@Param("songId") id) {

        try {
            return this.service.getById(id);
        }
        catch (e) {
            console.log(e);
            throw e
        }
    }

    @ApiBody({ type: SongModel })
    @ApiCreatedResponse({
        description: 'The song has been successfully created.',
        type: SongModel,
    })
    @Post("/songs")
    async createSong(@Body() song: SongModel) {
        // Should return 500 if song already exists
        try {
            return this.service.createSong(song);
        }
        catch (e) {
            console.log(e);
            throw e
        }
    }

    @ApiParam({ name: "songId", required: true })
    @ApiBody({ type: SongModel })
    @Put("/songs/:songId")
    async updateSong(@Param("songId") id, @Body() song: SongModel) {
        // if song does not exist return appropriate error code ( maybe 404 ?)
        this.service.updateSong(id, song);
    }

    @Delete("/songs")
    async deleteAll() {
        this.service.deleteAll();
    }

    @ApiQuery({ name: "size", required: false })
    @ApiQuery({ name: "page", required: false })
    @ApiQuery({ name: "sortBy", required: false, enum : SongFields })
    @ApiQuery({ name: "sortOrder", required: false, enum : OrderTypes })
    @ApiQuery({ name: "criteriaType", required: false, enum : SongFieldsCriteriaTypes })
    @ApiQuery({ name: "criteriaValue", required: false })

    @Get("/songs/search")
    async getSongs(@Query("size") size: number = 10, @Query("page") page: number = 0, @Query("sortBy")
    sortBy: string = SongFields.SONG_ID, @Query("sortOrder") sortOrder: string = OrderTypes.ASCEND
        , @Query("criteriaType") criteriaType: string = undefined, @Query("criteriaValue") criteriaValue: string | number = undefined) {
        
        return this.service.getSongs(Number(page), Number(size), sortBy, sortOrder, criteriaType, criteriaValue);
    }


    notFound(res) {
        res.status(404).send("Not found.");
    }
}
