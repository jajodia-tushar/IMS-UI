import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Employee, Error } from '../IMS.Models/Employee';
import { Observable } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }
  validate(Emp_ID: string): Observable<EmployeeResponse>{
    return this.http.get<EmployeeResponse>("employee/validate/" + Emp_ID);
  }

}
export class EmployeeResponse {
  employee: Employee;
  error: Error;
  status: String;
}

 
