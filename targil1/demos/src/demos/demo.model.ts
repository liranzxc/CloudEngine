import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export interface DemoModel{
    name: string;
    version: Number;
    id:string;
}

export class DemoEntity implements DemoModel{
    @ApiProperty()
    name: string;
    version: Number;
    id:string;
}


