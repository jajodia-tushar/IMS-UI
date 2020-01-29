import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BulkRequest } from 'src/app/IMS.Models/Employee/BulkRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulkRequestService {

  constructor(private http: HttpClient) { }

  placeOrder(bulkRequest: BulkRequest): Observable<any>  {
    return this.http.post("api/employee/bulk", bulkRequest);
  }
}
