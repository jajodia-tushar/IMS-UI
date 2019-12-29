import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsApproveService {

  constructor(private http: HttpClient) { }


  changeOrderDetails(vendorDetails: ListOfVendorOrder) {
    this.http.put<any>("api/vendorOrderEdit");
  }
}
