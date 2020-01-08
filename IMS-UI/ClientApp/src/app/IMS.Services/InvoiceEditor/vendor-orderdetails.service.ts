import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Root } from 'src/app/IMS.Models/Vendor/Root';
import { COLUMN_DATA, COLUMN_DATA2 } from 'src/app/IMS.Models/Vendor/Mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorOrderdetailsService {

  constructor(private http: HttpClient) { }

  VendorOrderDetails(): Observable<any>  {
    return this.http.get<Root>("api/listOfvendororderDetails")
  }

  getColumn(){
    return COLUMN_DATA;
  }

  getColumnFordataTable() {
    return COLUMN_DATA2;
  }
 
  //getclerkOrderData(){
  //  return this.http.get<OrderItemDetail>("api/listOfvendororderDetails")
  //}
}
