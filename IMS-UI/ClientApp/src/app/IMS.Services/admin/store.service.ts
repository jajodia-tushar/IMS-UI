import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockStatusResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  getAdminStoreStatus(): Observable<StockStatusResponse> {
    return this._http.get<StockStatusResponse>("stockStatus");
    }

  constructor(private _http: HttpClient) { }
}
