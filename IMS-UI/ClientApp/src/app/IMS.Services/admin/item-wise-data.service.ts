import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemWiseAnalysisResponse } from 'src/app/IMS.Models/Item/ItemWiseAnalysisResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemWiseDataService {

  constructor(private httpClient: HttpClient) { }

  getItemWiseTotalData(startDate: string, endDate: string): Observable<ItemWiseAnalysisResponse> {
    let params = new HttpParams();
    params = params.append("startDate", startDate);
    params = params.append("endDate", endDate);

    return this.httpClient.get<ItemWiseAnalysisResponse>("api/itemwiseanalysis", { params: params });
  }
}
