import { Module, HttpModule } from '@nestjs/common';
import { SongsController } from "./songs.controller";
import { SongService } from './songs.service';

@Module({
    imports: [HttpModule],
    controllers: [SongsController],
    providers: [SongService],
    exports: [SongService]
})
export class SongsModule { }
