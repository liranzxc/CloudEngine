import { Injectable, HttpService, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { SongModel, SongServiceModel, SongFieldsCriteriaTypes, SongFields, OrderTypes } from "src/songs/songs.model";



@Injectable()
export class SongService implements SongServiceModel {
    private songs:Map<string, SongModel> = {} as Map<string, SongModel>;

    constructor(private http: HttpService) {
        // Uncomment to create stub entries for testing
        //  const arr : number[] = Array.from(new Array(100).keys());
        
        // arr.map(id => {
        //     return {songId: id.toString(),
        //             name: id.toString(),
        //             performer:id.toString(),
        //             producer: id.toString(),
        //             genres: [(id+1) + "", (id+2) + "", "rock"],
        //             authors: [{name: id.toString()}, {name: (id + 1).toString()}],
        //             publishedYear: id*100,
        //             lyrics: id.toString()
        //         } as SongModel    
        // }).forEach(song => this.songs[song.songId] = song)
    }
    getById(id: string): SongModel {
        if (!(id in this.songs)) {
            throw new HttpException({ status: HttpStatus.NOT_FOUND, error: "song id " + id + " not found." }, HttpStatus.NOT_FOUND);
        }
        return this.songs[id];

    }

    createSong(song: SongModel): SongModel {
        song = this.validateSong(song);
        const id = song.songId;
        if (this.songs.hasOwnProperty(id)) {
            // should be internal server error (API)
            throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: "song id " + id + " already exists." }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        this.songs[id] = song;
        return this.songs[id];
    }
    updateSong(id: string, song: SongModel) {
        song = this.validateSong(song);
        if (this.songs.hasOwnProperty(id)) {
            if(song.songId !== id) {
                throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "song id " + id + "does not match song." }, HttpStatus.BAD_REQUEST);
            }
            this.songs[id] = song;
            return;
        }
        throw new HttpException({ status: HttpStatus.NOT_FOUND, error: "song id " + id + " not be found." }, HttpStatus.NOT_FOUND);
    }
    deleteAll() {
        this.songs = {} as Map<string, SongModel>
    }
    getSongs(page: number, size: number, sortAttribute: string, order: string, criteria: string, criteriaValue: string | number) {
        let arr: SongModel[] = Object.values(this.songs);
        const field = this.criteriaToField(criteria);
        if(criteria && criteriaValue) {
            arr = arr.filter((song: SongModel) => {
               
                if(field == SongFields.AUTHORS) {
                    return song.authors.map(author => author.name).includes(String(criteriaValue));
                }
                else if(field == SongFields.GENRES) {
                    return song.genres.includes(String(criteriaValue));
                }
                else if(field == SongFields.LYRICS) {
                    return song.lyrics.includes(String(criteriaValue));
                }
                return song[field] == criteriaValue;
            })
        }
        arr = this.sortSongArray(arr, sortAttribute, order);
        arr = arr.slice(page*size,(page*size + size));
        return arr;
    }
    sortSongArray(arr: SongModel[], sortAttribute: string, order: string): SongModel[] {
        var retVal = (order === OrderTypes.DESCEND) ? -1 : 1;
        // default is ascending order
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
                    return song1.lyrics > song2.lyrics ? retVal : -retVal;
                case SongFields.AUTHORS:
                    return song1.authors.length > song2.authors.length ? retVal : -retVal;
                case SongFields.GENRES:
                    return song1.genres.length > song2.genres.length ? retVal : -retVal;
                default:
                    // SongID is default
                    return song1.songId > song2.songId ? retVal : -retVal;
            }
        })
        return arr;
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




    validateSong(song: SongModel): SongModel {
        if (song.name == null) {
            song.name = "N/A";
        }
        else if (typeof(song.name) !== 'string') {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs name in type String" }, HttpStatus.BAD_REQUEST);
        }


        if (song.authors == null) {
            song.authors = [ {name:"N/A"} ];
        }
        else if (Array.isArray(song.authors)) {
            if (song.authors.filter(a => typeof(a.name) === 'string' ).length != song.authors.length) {
                throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs authors to have name property of type String" }, HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs authors to be of type Author[]" }, HttpStatus.BAD_REQUEST);
        }


        if (song.genres == null) {
            song.genres = ["N/A"];
        }
        else if (Array.isArray(song.genres)) {
            if (song.genres.filter(g => typeof(g) === 'string' ).length != song.genres.length) {
                throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs genres elements to be of type String" }, HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs genres names to be of type String[]" }, HttpStatus.BAD_REQUEST);
        }


        if (song.songId == null || song.songId === "") {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs defined songId thats not empty String" }, HttpStatus.BAD_REQUEST);
        }
        else if (typeof(song.songId) !== 'string') {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs songId of type String" }, HttpStatus.BAD_REQUEST);
        }

        
        if (song.lyrics == null) {
            song.lyrics = "";
        }
        else if (typeof(song.lyrics) !== 'string') {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs lyrics to be of type String" }, HttpStatus.BAD_REQUEST);
        }


        if (song.performer == null) {
            song.performer = "N/A";
        }
        else if (typeof(song.performer) !== 'string') {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs performer to be of type String" }, HttpStatus.BAD_REQUEST);
        }


        if (song.producer == null) {
            song.producer = "N/A";
        }
        else if (typeof(song.producer) !== 'string') {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs producer to be of type String" }, HttpStatus.BAD_REQUEST);
        }


        if (song.publishedYear == null) {
            song.publishedYear = 0;
        }
        else if (typeof(song.publishedYear) !== 'number') {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: "Song format needs publishedYear to be of type Number" }, HttpStatus.BAD_REQUEST);
        }
       
        return song;
    }


}