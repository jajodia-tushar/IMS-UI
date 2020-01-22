import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShelfData } from '../../IMS.Models/Shelf/ShelfData';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';
import { Item } from 'src/app/IMS.Models/Item/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http : HttpClient) { }

  getShelfData(ShelfId: string): Observable<ShelfData>{
    return this.http.get<ShelfData>("api/shelf/inventory/" + ShelfId);
  }
  getAllItems() {
    return this.http.get<ItemsResponse>("api/Item");
  }

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

  getAllItem() {
    return this.http.get<ItemsResponse>("api/Item").toPromise();
  }
}
