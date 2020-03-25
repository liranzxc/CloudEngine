import { Module, HttpModule } from '@nestjs/common';
import { StorageController } from './storage.controller';

@Module({
    imports:[],
    controllers : [StorageController],
    providers:[],
    exports:[]
})
export class StorageModule {}
