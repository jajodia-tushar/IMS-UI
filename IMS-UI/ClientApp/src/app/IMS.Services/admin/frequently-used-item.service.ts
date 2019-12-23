import { Injectable } from '@angular/core';
import { FrequentlyUsedItemModel } from 'src/app/IMS.Models/Admin/FrequentlyUsedItemModel';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrequentlyUsedItemService {

  constructor(private httpClient : HttpClient) { }

  getFrequentlyUsedItemData(fromDate : string, toDate :  string, itemCount : string): Observable<FrequentlyUsedItemModel> {
    let params = new HttpParams();
    params = params.append("startDate",fromDate);
    params = params.append("endDate",toDate);
    params = params.append("itemsCount",itemCount);
    
    return this.httpClient.get<FrequentlyUsedItemModel>("api/frequentlyuseditem",{params: params} );
  }
}
