import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShelfWiseOrderCountResponse } from 'src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelfWiseDataService {

  constructor(private httpClient : HttpClient) { }

  getShelfWiseData(fromDate : string, toDate : string): Observable<ShelfWiseOrderCountResponse> {

    let params = new HttpParams();
    params = params.append("FromDate", fromDate);
    params = params.append("ToDate", toDate);

    return this.httpClient.get<ShelfWiseOrderCountResponse>("api/shelfwiseordercount", {params: params});
  }
}
