import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
import { AuthGaurdResponse } from '../IMS.Models/AuthGaurdResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  public UserName;
  public role;
  isLoggedIn: boolean = false;

  constructor(private _loginService: LoginService, private route: Router, private http: HttpClient)
  {
    
  }


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.http.get<AuthGaurdResponse>('api/AuthGaurd').toPromise().then(
      data => {
        console.log(data);
        this.isLoggedIn = data.userName != null;
        this.UserName = data.userName;
        this.role = data.role;
      },
      error => {
        this.isLoggedIn = false;
      }
    );
    if (!this.isLoggedIn) {
      console.log("Redirecting ", state.url);
      this.route.navigateByUrl('login');
    }
    return true;
  }

}
