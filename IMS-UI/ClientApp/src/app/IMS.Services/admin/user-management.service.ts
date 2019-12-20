import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { RolesResponse } from 'src/app/IMS.Models/User/RolesResponse';
import { Users } from 'src/app/IMS.Models/User/Users';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  createUser(user : User){
    return this.http.post<User>("api/user/", user).toPromise();
  }

  getAllUsers(){
    return this.http.get<User[]>("api/user/").toPromise();
  
  }
  
  getAllRoles(){
    return this.http.get<RolesResponse>("api/roles").toPromise();
  }

}
