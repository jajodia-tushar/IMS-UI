import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';



@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient) { }

  getAllVendors() {
    return this.http.get<VendorResponse>("api/Vendor");
  }
}
