import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ItemsAvailabilityResponse } from 'src/app/IMS.Models/Admin/ItemsAvailabilityResponse';
import { Observable } from 'rxjs';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { dataFromAPI } from 'src/app/IMS.Modules/admin/Components/mainnav/mainnav.component';
import { FrequentlyUsedItemModel } from 'src/app/IMS.Models/Admin/FrequentlyUsedItemModel';
import { ItemWiseAnalysisResponse } from 'src/app/IMS.Models/Item/ItemWiseAnalysisResponse';
import { ShelfWiseOrderCountResponse } from 'src/app/IMS.Models/Shelf/ShelfWiseOrderCountResponse';
import { RAGStatusResponse } from 'src/app/IMS.Models/Admin/RAGStatusResponse';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient : HttpClient) { }

  getRAGReport(locationName: string, locationCode: string, colour: string, pageNumber: number
    , pageSize: number): Observable<ItemsAvailabilityResponse> {
    let params = new HttpParams();
    params = params.append("locationName", locationName);
    params = params.append("locationCode", locationCode);
    params = params.append("colour", colour);
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());

    return this.httpClient.get<ItemsAvailabilityResponse>("api/reports", {params: params});
  }

  getFrequentlyUsedItemData(fromDate : string, toDate :  string, itemCount : string): Observable<FrequentlyUsedItemModel> {
    let params = new HttpParams();
    params = params.append("startDate",fromDate);
    params = params.append("endDate",toDate);
    params = params.append("itemsCount",itemCount);
    
    return this.httpClient.get<FrequentlyUsedItemModel>("api/reports/frequentlyuseditem",{params: params} );
  }

  getItemWiseTotalData(startDate: string, endDate: string): Observable<ItemWiseAnalysisResponse> {
    let params = new HttpParams();
    params = params.append("startDate", startDate);
    params = params.append("endDate", endDate);

    return this.httpClient.get<ItemWiseAnalysisResponse>("api/reports/itemwiseanalysis", { params: params });
  }

  getShelfWiseData(fromDate : string, toDate : string): Observable<ShelfWiseOrderCountResponse> {

    let params = new HttpParams();
    params = params.append("FromDate", fromDate);
    params = params.append("ToDate", toDate);

    return this.httpClient.get<ShelfWiseOrderCountResponse>("api/reports/shelfwiseordercount", {params: params});
  }

  getRAGStatusData() {
    return this.httpClient.get<RAGStatusResponse>("api/reports/ragstatus/");
  }
}
