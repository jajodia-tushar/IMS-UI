import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../IMS.Models/LoginResponse';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticate(username, password)
  {
    return this.http.post<LoginResponse>('api/Login', {
      username: username,
      password: password
    });
  }

  getData() {
    return this.http.get('api/login');
  }

  isUserLoggedIn() {
    
    return this.http.get('api/AuthGaurd');
  }
  
}
