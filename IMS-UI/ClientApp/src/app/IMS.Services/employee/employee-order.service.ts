import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeOrderData } from '../../IMS.Models/Employee/EmployeeOrderData';
import { EmployeeOrdersResponse } from 'src/app/IMS.Models/Employee/EmployeeOrdersResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOrderService {
  constructor(private http : HttpClient) { }
  postOrderData(body :EmployeeOrderData) : Observable<any>{
    return this.http.post<any>("api/employee/orders",body);
  }

  getOrders(fromDate : string, toDate : string, pageNumber : number, pageSize : number, employeeId : string) 
  : Observable<EmployeeOrdersResponse>{
    let params = new HttpParams();
    params = params.append("toDate",toDate);
    params = params.append("fromDate",fromDate);
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());
    params = params.append("employeeId",employeeId);

    return this.http.get<EmployeeOrdersResponse>("api/employee/orders",{params});
  }

  getRecentEntries() : Observable<EmployeeOrdersResponse>{
    let params = new HttpParams();
    params = params.append("pageNumber","1");
    params = params.append("pageSize","11");
    return this.http.get<EmployeeOrdersResponse>("api/employee/orders", {params});
  }
}
