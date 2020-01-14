import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../../IMS.Models/Employee/EmployeeResponse';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getAllEmployees(): Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>("api/employee");
  }
  constructor(private http: HttpClient) { }

  employeeIdValidation(EmployeeID: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>("employee/validate/" + EmployeeID);
  }

}