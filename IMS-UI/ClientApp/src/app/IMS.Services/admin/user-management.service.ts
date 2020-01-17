import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { RolesResponse } from 'src/app/IMS.Models/User/RolesResponse';
import { Users } from 'src/app/IMS.Models/User/Users';
import { UsersResponse } from 'src/app/IMS.Models/User/UsersResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import {Response} from 'src/app/IMS.Models/Shared/Response'
import { AdminListResponse } from 'src/app/IMS.Models/User/AdminListResponse';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  getAllAdmins() : Observable<AdminListResponse> {
    return this.http.get<AdminListResponse>("api/users/Admin");
  }

  private roles;
  
  constructor(private http: HttpClient) { }
  
  deactivate(userId: any,isHardDelete:boolean) : Promise<Response>{
   let headers=new HttpHeaders().set('Content-Type','application/json; charset=utf8');
   return this.http.delete<Response>("api/users/"+ userId+ "?isHardDelete="+isHardDelete).toPromise(); 
  }

  createUser(user : User): Promise<UsersResponse>{
    return this.http.post<UsersResponse>("api/users", user).toPromise();
  }

  editUser(user : User) :Promise<UsersResponse>{
    return this.http.put<UsersResponse>("api/users", user).toPromise();
  }

  getAllUsers() : Promise<UsersResponse>{
    return this.http.get<UsersResponse>("api/users").toPromise();
  
  }
  
  getAllRoles() : Promise<RolesResponse>{
    return this.http.get<RolesResponse>("api/users/roles").toPromise();
  }

  validateUsername(username: string){
    return this.http.get('api/users/username?username=' + username).toPromise();
  }

  validateEmail(email: string){
    return this.http.get('api/users/email?email=' + email).toPromise();
  }


  async setUserRoles(){
    let roles : Role[] = (<RolesResponse> await this.getAllRoles()).roles;
    this.roles = roles;
  }

  async getAllRolesFromService(hard:boolean= false){
    if((this.roles!=null || this.roles!= undefined) && !hard)
      return this.roles;
    else{
      await this.setUserRoles()
      return this.roles;
    }

  }



}
