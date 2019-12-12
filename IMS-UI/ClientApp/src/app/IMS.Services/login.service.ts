import { Injectable,Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../IMS.Models/LoginResponse';
import { SessionResponse } from '../IMS.Models/SessionResponse';


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
}
