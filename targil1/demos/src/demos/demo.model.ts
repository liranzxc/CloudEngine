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
    
    getById(id:string);
   
    createDemo(dto : DemoModel);
    
    updateDemo(id:string, dto : DemoModel);
        
    deleteAll( id:string);

    getAll(page:number, size:number)

}