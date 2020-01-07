import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockStatusResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  getAdminStoreStatus(pageNumber: number, pageSize: number, itemName?: string): Observable<StockStatusResponse> {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());

    if(itemName == null || itemName == "")
      return this._http.get<StockStatusResponse>('stockStatus', {params});
    else  {
      params = params.append("itemName", itemName);
      return this._http.get<StockStatusResponse>("stockStatus/filtering", {params});
    }
  }

  constructor(private _http: HttpClient) { }
}
