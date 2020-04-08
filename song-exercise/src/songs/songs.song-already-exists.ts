export class SongAlreadyExistsError extends Error {
    constructor(args){
        super(args);
        this.name = "Song Already Exists";
    }
}