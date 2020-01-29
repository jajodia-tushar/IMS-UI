import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { Observable } from 'rxjs';
import { VendorOrderResponse } from 'src/app/IMS.Models/Vendor/VendorOrderResponse';
import { COLUMN_DATA, COLUMN_DATA2 } from 'src/app/IMS.Models/Vendor/Mock';
import { Response } from 'src/app/IMS.Models/Shared/Response';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { SingleVendorOrderResponse } from 'src/app/IMS.Models/Vendor/SingleVendorOrderResponse';



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
  checkVendorName(name: string) {
    let params = new HttpParams();
    params = params.append("name", name);
    return this.http.get<Response>("api/vendor/IsUnique", { params }).toPromise();
  }
  checkVendorPan(pan: string) {
    let params = new HttpParams();
    params = params.append("pan", pan);
    return this.http.get<Response>("api/vendor/IsUnique", { params }).toPromise();
  }
  checkVendorGst(gst: string) {
    let params = new HttpParams();
    params = params.append("gst", gst);
    return this.http.get<Response>("api/vendor/IsUnique", { params }).toPromise();
  }
  createVendor(vendor: Vendor): Promise<VendorResponse> {
    return this.http.post<VendorResponse>("api/Vendor", vendor).toPromise()
  }
  EditVendor(vendor: Vendor): Promise<VendorResponse> {
    return this.http.put<VendorResponse>("api/Vendor", vendor).toPromise()
  }
  deactivateVendor(vendorId: any, isHardDelete: boolean): Promise<Response> {
    let params = new HttpParams();
    params = params.append("isHardDelete", isHardDelete.toString());
    return this.http.delete<Response>("api/Vendor/" + vendorId, { params}).toPromise();
  }

  getAllVendors() {
    let params = new HttpParams();
    params = params.append("pageNumber", "1");
    params = params.append("pageSize", "2147483647");
    return this.http.get<VendorResponse>("api/Vendor", {params});
  }
  getVendorOnPagination(name,pageNumber, pagesize) {
    let params = new HttpParams();
    params = params.append("name", name);
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pagesize);
    return this.http.get<VendorResponse>("api/Vendor", { params });
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

  getVendorOrderByOrderId(orderId: string) {
    return this.http.get<SingleVendorOrderResponse>(`api/vendor/order/${orderId}`);
  }
}
