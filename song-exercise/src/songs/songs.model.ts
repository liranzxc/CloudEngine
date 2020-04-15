import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export interface Author {
    name: string
}
export class SongModel {
    @ApiProperty()
    songId: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    authors: Author[];
    @ApiProperty()
    publishedYear: number;
    @ApiProperty()
    genres: string[];
    @ApiProperty()
    lyrics: string;
    @ApiProperty()
    performer: string;
    @ApiProperty()
    producer: string;
}

export interface SongServiceModel {

    getById(id: string) : SongModel;

    createSong(song: SongModel) : SongModel;

    updateSong(id: string, song: SongModel);

    deleteAll();

    getSongs(page: number, size: number, sortAttribute: string, order: string, criteria: string, criteriaValue: string | number);

}

export const OrderTypes = {
    ASCEND: 'asc',
    DESCEND: 'desc'
}

export const SongFields = {
    SONG_ID: 'songId',
    NAME: 'name',
    AUTHORS: 'authors',
    PUBLISHED_YEAR: "publishedYear",
    GENRES: "genres",
    LYRICS: "lyrics",
    PERFORMER: "performer",
    PRODUCER: "producer"
}

export const SongFieldsCriteriaTypes = {
    SONG_ID: 'bySongId',
    NAME: 'byName',
    AUTHORS: 'byAuthors',
    PUBLISHED_YEAR: "byPublishedYear",
    GENRES: "byGenres",
    LYRICS: "byLyrics",
    PERFORMER: "byPerformer",
    PRODUCER: "byProducer"
}

