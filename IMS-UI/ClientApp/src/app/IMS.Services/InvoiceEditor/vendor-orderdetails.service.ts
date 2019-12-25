import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Root } from 'src/app/IMS.Models/Vendor/Root';
import { COLUMN_DATA, itemquantityprice, COLUMN_DATA2 } from 'src/app/IMS.Models/Vendor/Mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorOrderdetailsService {

  constructor(private http: HttpClient) { }

  VendorOrderDetails() {
    return this.http.get<Root>("api/listOfvendororderDetails")
  }

  getColumn(){
    return COLUMN_DATA;
  }
  getOrderData(): Observable<any>{
    // if(environment.isMock)
    return of(itemquantityprice);
  
    // return http.get
  }
  getclerkColumn(){
    return COLUMN_DATA2;
  }
  getclerkOrderData(): Observable<any>{
    return of(itemquantityprice);
  }
}
