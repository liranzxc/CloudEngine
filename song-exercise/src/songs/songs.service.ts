import { Injectable, HttpService, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { SongModel, SongEntity, SongServiceModel, SongFieldsCriteriaTypes, SongFields } from "src/songs/songs.model";
import * as uuid from 'uuid/v4';

@Injectable()
export class SongService implements SongServiceModel {
    private songs = {};

    constructor(private http: HttpService) {
    }
    getById(id: string): SongModel {
        if (id in this.songs) {
            return this.songs[id];
        }
        throw new HttpException({status: HttpStatus.NOT_FOUND, error: "song id " + id + " not found."}, HttpStatus.NOT_FOUND);
    }

    createSong(song: SongModel): SongModel {
        //const id = uuid();
        // Using the field of songId on purpose instead of generating a new UUID
        const id = song.songId;
        if (id in this.songs) {
            throw new HttpException({status: HttpStatus.CONFLICT, error: "song id " + id + " already exists."}, HttpStatus.CONFLICT);
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
        throw new HttpException({status: HttpStatus.NOT_FOUND, error: "song id " + id + " not be found."}, HttpStatus.NOT_FOUND);
    }
    deleteAll() {
        this.songs = {}
    }
    getSongs(page: number, size: number, sortAttribute: string, order: string, criteria: string, criteriaValue: object) {
        var arr = []
        var count = 0;
        for (var key in this.songs) {
            // check if the property/key is defined in the object itself, not in parent
            ++count;
            if (count < (page + 1) * size) {
                continue;
            }
            else if (count > (page + 1) * size + size) {
                break;
            }
            if (this.songs.hasOwnProperty(key)) {
                console.log(key, this.songs[key]);
            }

            if (this.songMatches(this.songs[key], criteria, criteriaValue)) {
                arr.push(this.songs[key]);
            }
        }
        // sort arr here

        return arr;
    }

    songMatches(song: SongModel, criteria: string, criteriaValue: object): boolean {
        if (criteria == null || criteriaValue == null) {
            return true;
        }
        var field = this.criteriaToField(criteria);
        if (field == null) {
            return true;
        }
        var songVal = Reflect.get(song, field);
        if(songVal != criteriaValue)
        {
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