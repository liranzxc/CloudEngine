export class SongNotFoundException extends Error {
    constructor(args){
        super(args);
        this.name = "Song Not Found Error";
    }
}