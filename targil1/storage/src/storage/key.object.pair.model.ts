import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export interface keyObjectPairModel{
    key: string;
    object : {}; 
}

export class keyObjectPair implements keyObjectPairModel{
    @ApiProperty()
    key: string;

    @ApiProperty()
    object: {};
    
 
}