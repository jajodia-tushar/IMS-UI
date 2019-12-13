import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeOrderData } from '../../IMS.Models/Employee/EmployeeOrderData';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOrderService {
  constructor(private http : HttpClient) { }
  postOrderData(body :EmployeeOrderData) : Observable<any>{
    return this.http.post<any>("orders",body);
  }
}
