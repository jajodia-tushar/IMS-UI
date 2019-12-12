import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
import { AuthGaurdResponse } from '../IMS.Models/AuthGaurdResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn: boolean = false;
  pathToNavigate: string;

  constructor(private _loginService: LoginService, private route: Router, private http: HttpClient,
    private authService: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let data: AuthGaurdResponse = <AuthGaurdResponse>await this.authService.isAuthenticated();

    if (data.userName == null)
      return true;
    else {
      this.route.navigateByUrl(data.role);
      return false;
    }
  }
}
