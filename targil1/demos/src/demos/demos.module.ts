import { Module } from '@nestjs/common';
import {DemosController} from "./demos.controller";
import {DemosService} from "./demos.service";

@Module({
    imports:[],
    controllers : [DemosController],
    providers:[DemosService],
    exports:[DemosService]
})
export class DemosModule {}
