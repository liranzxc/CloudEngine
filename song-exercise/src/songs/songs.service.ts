import { Injectable, HttpService, Inject } from "@nestjs/common";
import { SongModel, SongEntity, SongServiceModel } from "src/songs/songs.model";
//import * as uuid from 'uuid';

@Injectable()
export class SongService implements SongServiceModel {
    private songs = {};
    private url = "http://localhost:3001/storage";
    
    constructor (private http:HttpService ){
    }
    async getById(id)
    {
        throw new Error("Method not implemented.");
    }

    async createSong(song: SongModel) {
        throw new Error("Method not implemented.");
    }
    async updateDemo(id: any, song: SongModel) {
        throw new Error("Method not implemented.");
    }
    async deleteAll() {
        throw new Error("Method not implemented.");
    }
    async getSongs(page: number, size: number, sortAttribute: string, order: string, criteria: string, criteriaValue: object) {
        throw new Error("Method not implemented.");
    }

    



}