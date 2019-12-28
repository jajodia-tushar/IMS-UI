import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ItemsAvailabilityResponse } from 'src/app/IMS.Models/Admin/ItemsAvailabilityResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient : HttpClient) { }

  getRAGReport(locationName : string, locationCode : string, colour : string): Observable<ItemsAvailabilityResponse> {

    let params = new HttpParams();
    params = params.append("locationName", locationName);
    params = params.append("locationCode", locationCode);
    params = params.append("colour", colour);


    return this.httpClient.get<ItemsAvailabilityResponse>("api/reports", {params: params});
  }
}
