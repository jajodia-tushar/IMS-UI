import { Item } from 'src/app/IMS.Models/Item/Item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {
  
  constructor(private http: HttpClient) { }

  createItem(item: Item) {
    return this.http.post("api/item/", item).toPromise(); return this.http.post<Item>("api/item/", item).toPromise();
  }

  getAllUsers() {
    return this.http.get<Item[]>("api/item/").toPromise();

  }
  //deactivate(userId: any) : Promise<Response>{
  // let headers=new HttpHeaders().set('Content-Type','application/json; charset=utf8');
  // return this.http.delete<Response>("api/item/"+ itemId).toPromise(); 
  //}

  //createItem(user : Item): Promise<ItemsResponse>{
  //  return this.http.post<ItemsResponse>("api/Item", item).toPromise();
  //}

  //editUser(user : Item) :Promise<ItemsResponse>{
  //  return this.http.patch<ItemsResponse>("api/Item", item).toPromise();
  //}

  //getAllItems(): Promise<ItemsResponse> {
  //  return this.http.get<ItemsResponse>("api/Item").toPromise();

  //}
}
