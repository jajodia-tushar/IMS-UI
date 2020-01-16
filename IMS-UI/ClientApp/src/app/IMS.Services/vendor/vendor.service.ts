import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { Observable } from 'rxjs';
import { VendorOrderResponse } from 'src/app/IMS.Models/Vendor/VendorOrderResponse';
import { COLUMN_DATA, COLUMN_DATA2 } from 'src/app/IMS.Models/Vendor/Mock';
import { Response } from 'src/app/IMS.Models/Shared/Response';



@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient) { }
  
  getUnApprovedOrders(pageNumber : number, pageSize : number) {
    let params = new HttpParams();
    params = params.append("toDate","");
    params = params.append("fromDate","");
    params = params.append("approved","false");
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());
    return this.http.get<VendorOrderResponse>("api/vendor/orders", { params });
  }


  getAllVendors() {
    return this.http.get<VendorResponse>("api/Vendor");
  }

  postVendorOrder(vendorOrder: VendorOrder) {
    return this.http.post<VendorOrder>("api/Vendor/orders", vendorOrder);
  }

  getVendorOrder(vendorId: string, toDate: string, fromDate: string, approved : string, pageNumber : number, pageSize : number): Observable<VendorOrderResponse>{
    
    let params = new HttpParams();
    params = params.append("toDate",toDate);
    params = params.append("fromDate",fromDate);
    params = params.append("approved",approved);
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());

    
    if (vendorId == null || vendorId == "0" || vendorId == "") {
      return this.http.get<VendorOrderResponse>("api/vendor/orders", { params });
    }
    else {
      return this.http.get<VendorOrderResponse>("api/vendor/orders/"+vendorId, { params });
    }

  }

  changeOrderDetails(vendorDetails): Observable<Response>  {
    return this.http.put<Response>("api/vendor/orders/", vendorDetails);
   }

   rejectOrder(OrderID: number): Observable<Response>{
    return this.http.delete<Response>("api/vendor/orders/" + OrderID);
  }

  getColumn(){
    return COLUMN_DATA;
  }

  getColumnFordataTable() {
    return COLUMN_DATA2;
  }

  
}
