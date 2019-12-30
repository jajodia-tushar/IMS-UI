import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';
import { Response } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsApproveService {

  constructor(private http: HttpClient) { }


  changeOrderDetails(vendorDetails) {
    this.http.put<Response>("api/vendorOrderEdit", vendorDetails).subscribe();
  }
}
