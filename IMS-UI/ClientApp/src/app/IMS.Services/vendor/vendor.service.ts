import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { Observable } from 'rxjs';
import { VendroOrderResponse } from 'src/app/IMS.Models/Vendor/VendroOrderResponse';



@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient) { }

  getAllVendors() {
    return this.http.get<VendorResponse>("api/Vendor");
  }
  postVendorOrder(vendorOrder: VendorOrder) {
    return this.http.post<VendorOrder>("api/Vendor", vendorOrder);
  }

  getVendorOrder(vendorId: string, toDate: string, fromDate: string, approved : string, pageNumber : number, pageSize : number): Observable<VendroOrderResponse>{
    
    let params = new HttpParams();
    params = params.append("toDate",fromDate);
    params = params.append("fromDate",toDate);
    params = params.append("approved",approved);
    params = params.append("pageNumber",pageNumber.toString());
    params = params.append("pageSize",pageSize.toString());

    
    if (vendorId == null || vendorId == "0" || vendorId == "") {
      return this.http.get<VendroOrderResponse>("api/vendor/orders", { params });
    }
    else {
      return this.http.get<VendroOrderResponse>("api/vendor/orders/"+vendorId, { params });
    }

  }

  
}
