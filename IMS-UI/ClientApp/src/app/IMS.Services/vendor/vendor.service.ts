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

  getVendorOrder(toDate :string, fromDate :string): Observable<VendroOrderResponse>{
    let params = new HttpParams();
    params = params.append("startDate",fromDate);
    params = params.append("endDate",toDate);
    return this.http.get<VendroOrderResponse>("api/vendor/orders", { params });
  }
}
