import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';



@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient) { }

  getAllVendors() {
    return this.http.get<VendorResponse>("api/Vendor");
  }
  postVendorOrder(vendorOrder: VendorOrder) {
    console.log(vendorOrder);
    return this.http.post<VendorOrder>("api/Vendor", vendorOrder);
  }

}
