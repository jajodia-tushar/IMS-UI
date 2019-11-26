import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router:Router) { }

  decodeJwtToken(token) {
    let payload = token.split('.')[1]
    let payloadJsonString = window.atob(payload)
    let payloadJsonObject = JSON.parse(payloadJsonString)
    sessionStorage.setItem('role', payloadJsonObject["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
    this.router.navigate([payloadJsonObject["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]])

  }

  authenticate(username, password)
  {
    return this.http.post('api/Login', {
      UserName: username,
      Password: password
    });
  }

  getUser() {
    return sessionStorage.getItem('username');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }
}
