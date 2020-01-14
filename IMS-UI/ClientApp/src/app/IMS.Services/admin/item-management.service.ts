import { Items } from './../../IMS.Models/Item/Items';
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
    return this.http.delete<Item>("api/Items/",item).toPromise(); 
   }

  createItem(item: Item) {
    return this.http.post<Item>("api/items/", item).subscribe(
      data =>{
        console.log(data);
      }
    );
  }

  editItem(item : Item){
    return this.http.put<Item>("api/items", item).subscribe(
      data =>{
        console.log(data);
      }
    );
  }

  getAllItems() {
    return this.http.get<Items>("api/item").toPromise();
  }
}
