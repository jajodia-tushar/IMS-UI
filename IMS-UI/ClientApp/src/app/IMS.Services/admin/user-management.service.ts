import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { RolesResponse } from 'src/app/IMS.Models/User/RolesResponse';
import { Users } from 'src/app/IMS.Models/User/Users';
import { DeleteResponse } from 'src/app/IMS.Models/User/DeleteResponse';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  
  constructor(private http: HttpClient) { }
  
  deactivate(user: any) : Promise<DeleteResponse>{
   let headers=new HttpHeaders().set('Content-Type','application/json; charset=utf8');
   const options = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    }), body: user
    }; 
   return this.http.delete<DeleteResponse>("api/users",options).toPromise(); 
  }

  createUser(user : User){
    return this.http.post<UserResponse>("api/users", user).toPromise();
  }

  editUser(user : User){
    return this.http.put<UserResponse>("api/users", user).toPromise();
  }

  getAllUsers(){
    return this.http.get<Users>("api/users").toPromise();
  
  }
  
  getAllRoles(){
    return this.http.get<RolesResponse>("api/roles").toPromise();
  }

}
