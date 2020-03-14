import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export interface DemoModel{
    name : string;
}

export class DemoEntity implements DemoModel{
    @ApiProperty()
    name: string;

    _id:string;
}

