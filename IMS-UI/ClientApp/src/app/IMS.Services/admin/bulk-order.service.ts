import { Injectable } from '@angular/core';
import { EmployeeBulkOrderResponse, BlukOrderApprove, BlukOrderApproveResponse, BulkRequest } from 'src/app/IMS.Models/Employee/BulkRequest';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StockStatusResponse } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { Response } from 'src/app/IMS.Models/Shared/Response';

@Injectable({
  providedIn: 'root'
})
export class BulkOrderService {

  constructor(private http:HttpClient) { }

  GetBulkOrderDetails(orderId:number):Observable<EmployeeBulkOrderResponse>{
    return this.http.get<EmployeeBulkOrderResponse>("api/Employee/EmployeeBulkOrders/"+orderId);
  }

  GetStockStatus(pageNumber : number, pageSize : number ,itemIds : string) {
    let params = new HttpParams();
  
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());
    params = params.append("itemIds",itemIds);
    return this.http.get<StockStatusResponse>("api/Employee/GetStockStatus", { params });
  }

  approveBulkOrder(orderId : number , bulkOrderApprove : BlukOrderApprove) : Observable<BlukOrderApproveResponse>{
    let path : string   = "api/employee/EmployeeBulkOrders/Approve/" + orderId;
    return this.http.put<BlukOrderApproveResponse>(path,bulkOrderApprove);
  }

  cancelBulkOrder(orderId : number){
    let path : string   = "api/employee/EmployeeBulkOrders/cancel/" + orderId;
    return this.http.put<Response>(path,null);
  }

  rejectBulkOrder(orderId : number){
    let path : string   = "api/employee/EmployeeBulkOrders/reject/" + orderId;
    return this.http.put<Response>(path,null);
  }

  returnBulkOrder(orderId: number , employeeBulkOrder : BulkRequest) : Observable<EmployeeBulkOrderResponse>{
    let path : string   = "api/employee/EmployeeBulkOrders/return/" + orderId;
    return this.http.put<EmployeeBulkOrderResponse>(path,employeeBulkOrder);
  }
}
