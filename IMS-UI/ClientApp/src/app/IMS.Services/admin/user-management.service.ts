import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  createUser(user : User){
    return this.http.post("api/user/", user).toPromise();
  }

}
