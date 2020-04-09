import { Injectable, HttpService, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { SongModel, SongEntity, SongServiceModel, SongFieldsCriteriaTypes, SongFields, OrderTypes } from "src/songs/songs.model";
import * as uuid from 'uuid/v4';

@Injectable()
export class SongService implements SongServiceModel {
    private songs = {};

    constructor(private http: HttpService) {
    }
    getById(id: string): SongModel {
        if (!(id in this.songs)) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: "song id " + id + " not found." }, HttpStatus.NOT_FOUND);
        }
        return this.songs[id];

    }

    createSong(song: SongModel): SongModel {
        //const id = uuid();
        // Using the field of songId on purpose instead of generating a new UUID
        const id = song.songId;
        if (id in this.songs) {
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: "song id " + id + " already exists." }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        this.songs[id] = song;
        return this.songs[id];
    }
    updateSong(id: string, song: SongModel) {
        if (id in this.songs) {
            song.songId = id;
            this.songs[id] = song;
            return;
        }
        throw new HttpException({ status: HttpStatus.NOT_FOUND, error: "song id " + id + " not be found." }, HttpStatus.NOT_FOUND);
    }
    deleteAll() {
        this.songs = {}
    }
    getSongs(page: number, size: number, sortAttribute: string, order: string, criteria: string, criteriaValue: object) {
        var arr: SongModel[] = []
        var count = 0;
        var skip = page * size
        for (var key in this.songs) {
            // check if the property/key is defined in the object itself, not in parent
            ++count;
            if (count <= skip) {
                continue;
            }
            if (this.songMatchesCriteria(this.songs[key], criteria, criteriaValue)) {
                arr.push(this.songs[key]);
            }
            if (arr.length >= size) {
                break;
            }
        }
        arr = this.sortSongArray(arr, sortAttribute, order);

        return arr;
    }
    sortSongArray(arr: SongModel[], sortAttribute: string, order: string): SongModel[] {
        var retVal = (order == OrderTypes.DESCEND) ? 1 : -1;
        arr.sort(function (song1 : SongModel, song2 : SongModel) {
            switch (sortAttribute) {
                case SongFields.PRODUCER:
                    return song1.producer > song2.producer ? retVal : -retVal;
                case SongFields.PERFORMER:
                    return song1.performer > song2.performer ? retVal : -retVal;
                case SongFields.NAME:
                    return song1.name > song2.name ? retVal : -retVal;
                case SongFields.PUBLISHED_YEAR:
                    return song1.publishedYear > song2.publishedYear ? retVal : -retVal;
                case SongFields.LYRICS:
                    return song1.lyrics.length > song2.lyrics.length ? retVal : -retVal;
                case SongFields.AUTHORS:
                    // undefined
                case SongFields.GENRES:
                    // undefined
                default:
                    // SongID is default
                    return song1.songId > song2.songId ? retVal : -retVal;
                // TODO continue
            }
            return retVal;
        })
        return arr;
    }

    songMatchesCriteria(song: SongModel, criteria: string, criteriaValue: object): boolean {
        if (criteria == null || criteriaValue == null) {
            return true;
        }
        var field = this.criteriaToField(criteria);
        if (field == null) {
            return true;
        }
        var songVal = Reflect.get(song, field);
        if (songVal != criteriaValue) {
            // TODO implement by field
            return false;
        }
        return true;
    }

    criteriaToField(criteria: string): string {
        switch (criteria) {
            case SongFieldsCriteriaTypes.SONG_ID:
                return SongFields.SONG_ID;
            case SongFieldsCriteriaTypes.PUBLISHED_YEAR:
                return SongFields.PUBLISHED_YEAR;
            case SongFieldsCriteriaTypes.PRODUCER:
                return SongFields.PRODUCER;
            case SongFieldsCriteriaTypes.PERFORMER:
                return SongFields.PERFORMER;
            case SongFieldsCriteriaTypes.NAME:
                return SongFields.NAME;
            case SongFieldsCriteriaTypes.LYRICS:
                return SongFields.LYRICS;
            case SongFieldsCriteriaTypes.GENRES:
                return SongFields.GENRES;
            case SongFieldsCriteriaTypes.AUTHORS:
                return SongFields.AUTHORS;
            default:
                return null;
        }
    }


}