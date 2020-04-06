import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export interface DemoModel{
    name: string;
    version: number;
    id:string;
}

export class DemoEntity implements DemoModel{
    @ApiProperty()
    name: string;
    @ApiProperty()
    version: number;
    @ApiProperty()
    id:string;
}

export class ObjectWithKey {
    key: string;
    object: DemoModel;
}



export interface demosServiceModel{
    
    getById(id);
   
    createDemo(dto : DemoModel);
    
    updateDemo(id, dto : DemoModel);
        
    deleteAll( id);

}