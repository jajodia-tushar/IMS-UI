import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemWiseAnalysisResponse } from 'src/app/IMS.Models/Item/ItemWiseAnalysisResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemWiseDataService {

  constructor(private httpClient : HttpClient) { }

  getItemWiseTotalData(fromDate : string, toDate : string): Observable<ItemWiseAnalysisResponse> {
    let params = new HttpParams();
    params = params.append("fromDate",fromDate);
    params = params.append("toDate",toDate);

    return this.httpClient.get<ItemWiseAnalysisResponse>("api/itemwiseanalysis", {params : params});
  }
}
