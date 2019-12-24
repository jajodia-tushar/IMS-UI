import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';
import { ShelfResponse } from 'src/app/IMS.Models/Shelf/ShelfResponse';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
;

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