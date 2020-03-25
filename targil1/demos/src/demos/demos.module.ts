import { Module, HttpModule } from '@nestjs/common';
import {DemosController} from "./demos.controller";
import { demosService } from './demos.service';

@Module({
    imports:[HttpModule],
    controllers : [DemosController],
    providers:[demosService],
    exports:[demosService]
})
export class DemosModule {}
