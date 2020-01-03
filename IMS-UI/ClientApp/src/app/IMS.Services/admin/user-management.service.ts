import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { RolesResponse } from 'src/app/IMS.Models/User/RolesResponse';
import { Users } from 'src/app/IMS.Models/User/Users';
import { DeleteResponse } from 'src/app/IMS.Models/User/DeleteResponse';
import { UsersResponse } from 'src/app/IMS.Models/User/UsersResponse';
import { BehaviorSubject } from 'rxjs';
import {Response} from 'src/app/IMS.Models/Shared/Response'

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

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
    return this.http.get<RolesResponse>("api/roles").toPromise();
  }

  validateUsername(username: string){
    return this.http.get('api/users/username?username=' + username).toPromise();
  }

  validateEmail(email: string){
    return this.http.get('api/users/username?email=' + email).toPromise();
  }


  async setUserRoles(){
    let roles : Role[] = (<RolesResponse> await this.getAllRoles()).roles;
    this.roles = roles;
  }

  async getAllRolesFromService(){
    if(this.roles!=null || this.roles!= undefined)
      return this.roles;
    else{
      await this.setUserRoles()
      return this.roles;
    }

  }



}
