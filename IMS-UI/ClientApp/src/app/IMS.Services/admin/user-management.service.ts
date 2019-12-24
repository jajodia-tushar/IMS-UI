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
  
  deactivate(user: any) {
   return this.http.delete<User>("api/users",user).toPromise(); 
  }

  createUser(user : User){
    return this.http.post<User>("api/users", user).subscribe(
      data =>{
        console.log(data);
      }
    );
  }

  editUser(user : User){
    return this.http.put<User>("api/users", user).subscribe(
      data =>{
        console.log(data);
      }
    );
  }

  getAllUsers(){
    return this.http.get<Users>("api/users").toPromise();
  
  }
  
  getAllRoles(){
    return this.http.get<RolesResponse>("api/roles").toPromise();
  }

}
