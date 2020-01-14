import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeOrderData } from '../../IMS.Models/Employee/EmployeeOrderData';
import { EmployeeOrdersResponse } from 'src/app/IMS.Models/Employee/EmployeeOrdersResponse';
import { RecentEntriesResponse } from 'src/app/IMS.Models/Admin/RecentEntriesResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOrderService {
  constructor(private http : HttpClient) { }
  postOrderData(body :EmployeeOrderData) : Observable<any>{
    return this.http.post<any>("api/employeeOrder",body);
  }

  getOrders(fromDate : string, toDate : string, pageNumber : number, pageSize : number ) : Observable<RecentEntriesResponse>{
    let params = new HttpParams();
    params = params.append("toDate",toDate);
    params = params.append("fromDate",fromDate);
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());
    return this.http.get<RecentEntriesResponse>("api/employeeorder",{params});
  }

  getRecentEntries() : Observable<RecentEntriesResponse>{
    return this.http.get<RecentEntriesResponse>("api/employeeorder");
  }
}
