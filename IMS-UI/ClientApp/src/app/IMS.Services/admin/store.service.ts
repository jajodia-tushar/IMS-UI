import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockStatusResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { TransferRequest } from 'src/app/IMS.Models/Shelf/TransferRequest';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  getAdminStoreStatus(pageNumber: number, pageSize: number, itemName?: string): Observable<StockStatusResponse> {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());

    if(itemName == null || itemName == "")
      return this._http.get<StockStatusResponse>('api/Store', {params});
    else  {
      params = params.append("itemName", itemName);
      return this._http.get<StockStatusResponse>("api/Store/filtering", {params});
    }
  }

  transferToShelf(transferRequest: TransferRequest) {
    return this._http.patch<Response>("api/store", transferRequest);
  }

  constructor(private _http: HttpClient) { }
}
