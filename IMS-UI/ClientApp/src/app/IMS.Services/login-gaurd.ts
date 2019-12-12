import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { SessionResponse } from '../IMS.Models/SessionResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn: boolean = false;
  pathToNavigate: string;

  constructor(private _loginService: LoginService, private route: Router, private http: HttpClient,
    private authService: SessionService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let response: SessionResponse = <SessionResponse>await this.authService.isAuthenticated();
    console.log(response);
    if (response.userName == null)
      return true;
    else {
      this.route.navigateByUrl(response.role);
      return false;
    }
  }
}
