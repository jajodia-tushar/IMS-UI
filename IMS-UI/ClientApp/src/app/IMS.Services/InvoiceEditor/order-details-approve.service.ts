import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';
import { Response } from 'src/app/IMS.Models/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsApproveService {

  constructor(private http: HttpClient) { }


  changeOrderDetails(vendorDetails): Observable<Response>  {
   return this.http.put<Response>("api/vendorOrderEdit", vendorDetails);
  }
}
