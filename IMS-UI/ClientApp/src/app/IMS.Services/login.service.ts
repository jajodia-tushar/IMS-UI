import { Injectable,Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../IMS.Models/LoginResponse';
import { AuthGaurdResponse } from '../IMS.Models/AuthGaurdResponse';


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


  isUserLoggedIn() {
    //let user = sessionStorage.getItem('username');
    //return !(user === null);
    return this.http.get<AuthGaurdResponse>('api/AuthGaurd');
    
  }
  
}
