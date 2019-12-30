import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminListResponse } from '../IMS.Models/User/AdminListResponse';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  getAllAdmins() {

    return this.http.get<AdminListResponse>("api/Admin");
  }
}
