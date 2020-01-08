import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/IMS.Models/Response';


@Injectable({
  providedIn: 'root'
})
export class OrderDetailsRejectService {

  constructor(private http: HttpClient) { }
  
    rejectOrder(OrderID: number): Observable<Response>{
    return this.http.delete<Response>("api/vendorOrderEdit/" + OrderID);
  }
}
