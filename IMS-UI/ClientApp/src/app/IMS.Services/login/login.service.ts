import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/app/IMS.Models/LoginResponse';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';
import { Response } from 'src/app/IMS.Models/Response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(username, password)
  {
    return this.http.post<LoginResponse>('api/login', {
      username: username,
      password: password
    });
  }

  getUser(){
    return this.http.get<UserResponse>('api/user').toPromise();
  }

  logOut() {
    return this.http.delete<Response>('api/logout');
  }

  updatePassword(userId, passwordDetails)  {
    return this.http.patch<Response>('api/updatePassword/'+userId.toString(), passwordDetails);
  }
}
