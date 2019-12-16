import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/IMS.Models/LoginResponse';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';

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
}
