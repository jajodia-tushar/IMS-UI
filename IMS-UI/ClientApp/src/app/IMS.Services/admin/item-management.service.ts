import { Item } from 'src/app/IMS.Models/Item/Item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  constructor(private http: HttpClient) { }

  deactivate(itemId: any,isHardDelete:string) : Promise<ItemsResponse>{
    //let header= new HttpHeaders().set('Content-Type','application/json; charset=utf8');
    let params = new HttpParams();
    params = params.append("itemId",itemId);
    params = params.append("isHardDelete",isHardDelete);
    return this.http.delete<ItemsResponse>("api/Item",{params}).toPromise();
  }

  createItem(item: Item): Promise<ItemsResponse> {
    return this.http.post<ItemsResponse>("api/Item", item).toPromise();
  }

  editItem(item: Item): Promise<ItemsResponse> {
    return this.http.put<ItemsResponse>("api/Item", item).toPromise();
  }

  getAllItems() {
    return this.http.get<ItemsResponse>("api/Item").toPromise();
  }
}
