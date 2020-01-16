import { Item } from 'src/app/IMS.Models/Item/Item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  constructor(private http: HttpClient) { }

  deactivate(item: any) {
    return this.http.delete<Item>("api/Item", item).toPromise();
  }

  createItem(item: Item): Promise<ItemsResponse> {
    return this.http.post<ItemsResponse>("api/Item", item).toPromise();
  }

  editItem(item: Item): Promise<ItemsResponse> {
    return this.http.patch<ItemsResponse>("api/Item", item).toPromise();
  }

  getAllItems() {
    return this.http.get<ItemsResponse>("api/Item").toPromise();
  }
}
