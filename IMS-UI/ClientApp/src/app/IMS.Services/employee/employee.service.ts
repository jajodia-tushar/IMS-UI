import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../../IMS.Models/Employee/EmployeeResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }
  
  employeeIdValidation(EmployeeID: string): Observable<EmployeeResponse>{
    return this.http.get<EmployeeResponse>("employee/validate/" + EmployeeID);
  }

}