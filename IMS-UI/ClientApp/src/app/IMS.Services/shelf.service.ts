import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShelfListResponse } from '../IMS.Models/ShelfListResponse';
import { ShelfResponse } from '../IMS.Models/ShelfResponse';
import { Shelf } from '../IMS.Models/Shelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private http: HttpClient) { }

  getAllShelves() {
    return this.http.get<ShelfListResponse>('api/Shelf');
  }

  getShelfByShelfCode(shelfCode : string){
    return this.http.get<ShelfListResponse>("api/shelf/"+shelfCode).toPromise();
  }

  getShelf(){
    return this.http.get<ShelfResponse>("/api/shelf/selected").toPromise();
  }

  setShelf(shelf : Shelf){
    return this.http.post("api/shelf",shelf).subscribe();
  }

  
}
