import { Injectable, HttpService, Inject } from "@nestjs/common";
import { DemoModel, DemoEntity, demosServiceModel, ObjectWithKey } from "src/demos/demo.model";


@Injectable()
export class demosService implements demosServiceModel{


    private url = "http://localhost:3001/storage";
    
    constructor (private http:HttpService ){

        
    }


    async getAll(page:number, size:number)
    {
        return (await this.http.get<DemoModel>(`${this.url}?size=${size}&page=${page}`).toPromise()).data
    }
    
    async getById(id)
    {
        return (await this.http.get<DemoModel>(`${this.url}/${id}`).toPromise()).data
    }


    async createDemo(dto : DemoModel)
    {
        const ObjectWithKey =  (await this.http.post<ObjectWithKey>(this.url,dto).toPromise()).data
        dto.id = ObjectWithKey.key;

        await this.updateDemo(dto.id,dto);

        return dto;

    }

    async updateDemo(id, dto : DemoModel)
    {
        await this.http.put(`${this.url}/${id}`,dto).toPromise()
    }

    async deleteAll()
    {
        await this.http.delete(this.url).toPromise()
    }

}