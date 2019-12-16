import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShelfData } from '../../IMS.Models/Shelf/ShelfData';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http : HttpClient) { }

  getShelfData(ShelfId: string): Observable<ShelfData>{
    return this.http.get<ShelfData>("api/shelf/inventory/" + ShelfId);
  }
}
