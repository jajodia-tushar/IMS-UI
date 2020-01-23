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
import { ItemConsumptionDataResponse } from 'src/app/IMS.Models/Admin/ItemConsumptionDataResponse';
import { ItemConsumptionDetailsResponse, DateItemConsumptions, DateWiseItemConsumptionDetails } from 'src/app/IMS.Models/Admin/ItemConsumptionDetailsResponse';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';

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

  getPerDayConsumption(fromDate : string, toDate : string, ) : Observable<ItemConsumptionDataResponse>{
    let params = new HttpParams();
    params = params.append("fromDate", fromDate);
    params = params.append("toDate", toDate);
    return this.httpClient.get<ItemConsumptionDataResponse>("api/reports/itemConsumptionReports",{params});
  }

  getItemConsumptionDetailedReport(fromDate : string, toDate : string, 
    pageNumber : number, pageSize : number) : ItemConsumptionDetailsResponse{
    let i : Item = new Item();
    i.id = 1;
    i.name = "Pen";

    let dateItemConsumptions : DateItemConsumptions[] = [];
    dateItemConsumptions.push(
      {
      date : "20200101",
      itemsConsumptionCount : 10
      },
      {
        date : "20200102",
        itemsConsumptionCount : 10
      }
       ,
      {
        date : "20200103",
        itemsConsumptionCount : 10
      },
      {
        date : "20200104",
        itemsConsumptionCount : 10
      }
    );

    let dateWiseItemConsumptionDetails : DateWiseItemConsumptionDetails[] = [];
    dateWiseItemConsumptionDetails.push({
      item : i,
      dateItemConsumption : dateItemConsumptions
    },
    {
      item : i,
      dateItemConsumption : dateItemConsumptions
    },
    {
      item : i,
      dateItemConsumption : dateItemConsumptions
    },
    {
      item : i,
      dateItemConsumption : dateItemConsumptions
    })

    let result : ItemConsumptionDetailsResponse =  new ItemConsumptionDetailsResponse();
    result.dateWiseItemConsumptionDetails = dateWiseItemConsumptionDetails;
    result.pagingInfo = new PagingInfo();
    result.pagingInfo.pageNumber = 1;
    result.pagingInfo.pageSize = 10;
    result.pagingInfo.totalResults = 10;
    result.status = "Success";

    return result;
  }
}
