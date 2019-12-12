import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShelfResponse } from '../IMS.Models/ShelfResponse';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {

  constructor(private http: HttpClient) { }

  getAllShelves() {
    return this.http.get<ShelfResponse>('api/Shelf');
  }

  getShelfByShelfCode(shelfCode : string){
    return this.http.get<ShelfResponse>("api/shelf/"+shelfCode).toPromise();
  }
}
