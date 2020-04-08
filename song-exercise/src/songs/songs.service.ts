import { Injectable, HttpService, Inject } from "@nestjs/common";
import { SongModel, SongEntity, SongServiceModel } from "src/songs/songs.model";
import * as uuid from 'uuid/v4';
import { SongNotFoundException } from "./songs.song-not-found";
import { SongAlreadyExistsError } from "./songs.song-already-exists";

@Injectable()
export class SongService implements SongServiceModel {
    private songs = {};

    constructor(private http: HttpService) {
    }
    getById(id: string) {
        if(id in this.songs) {
            return this.songs[id];
        }
        throw new SongNotFoundException(id);
    }

    createSong(song: SongModel){
        //const id = uuid();
        // Using the field of songId on purpose instead of generating a new UUID
        const id = song.songId;
        if(id in this.songs) {
            throw new SongAlreadyExistsError(song.songId);
        }
        this.songs[id] = song;
        return this.songs[id];
    }
    updateSong(id: string, song: SongModel) {
        throw new Error("Method not implemented.");
    }
    deleteAll() {
        this.songs = {}
    }
    getSongs(page: number, size: number, sortAttribute: string, order: string, criteria: string, criteriaValue: object) {
        if(criteria == null || criteriaValue == null)
        {

        }
        throw new Error("Method not implemented.");
    }





}