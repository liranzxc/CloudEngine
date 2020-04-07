import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export interface SongModel{
    songId: string;
    name: string;
    authors:object[];
    publishedYear:number;
    genres:string[];
    lyrics:string;
    performer:string;
    producer:string;
}

export class SongEntity implements SongModel{
    @ApiProperty()
    songId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    authors:object[];
    @ApiProperty()
    publishedYear:number;
    @ApiProperty()
    genres:string[];
    @ApiProperty()
    lyrics:string;
    @ApiProperty()
    performer:string;
    @ApiProperty()
    producer:string;
}



export interface SongServiceModel{
    
    getById(id);
   
    createSong(song: SongModel);
    
    updateDemo(id, song: SongModel);
        
    deleteAll();

    getSongs(page:number, size:number, sortAttribute:string, order:string, criteria:string,criteriaValue:object);
    /* 
    default sort by songId
    default sort: asc
    order : asc/desc
    criteria : optional

    
    */
}