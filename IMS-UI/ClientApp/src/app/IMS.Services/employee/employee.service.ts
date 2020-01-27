import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeResponse } from '../../IMS.Models/Employee/EmployeeResponse';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';
import { Response } from 'src/app/IMS.Models/Shared/Response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getAllEmployees(pageNumber: number, pageSize: number, filter?: string) {
    let params = new HttpParams();
    params = params.append("filter", filter);
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());
    return this.http.get<EmployeesResponse>("api/employee", { params }).toPromise();
  }
  constructor(private http: HttpClient) { }

  employeeIdValidation(EmployeeID: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>("employee/validate/" + EmployeeID);
  }

  validateEmail(email: string) {
    let params = new HttpParams();
    params = params.append("email", email);
    return this.http.get('api/employee/email', { params }).toPromise();
  }

  createEmployee(employee: Employee): Promise<EmployeesResponse> {
    return this.http.post<EmployeesResponse>("api/employee", employee).toPromise();
  }

  editEmployee(employee: Employee): Promise<EmployeesResponse> {
    return this.http.put<EmployeesResponse>("api/employee", employee).toPromise();
  }

  deactivateEmployee(id: any, isHardDelete: string): Promise<Response> {
    let params = new HttpParams();
    params = params.append("id", id);
    params = params.append("isHardDelete", isHardDelete);

    return this.http.delete<Response>("api/employee", { params }).toPromise();
  }

  checkIdAlreadyExists(employeeId: string) {
    let params = new HttpParams();
    params = params.append("employeeId", employeeId);
    return this.http.get('api/employee/IdExists', { params }).toPromise();
  }


}