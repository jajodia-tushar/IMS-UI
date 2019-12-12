import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AuthGaurdResponse } from '../IMS.Models/AuthGaurdResponse';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredRouteGuard implements CanActivate {

  constructor(private _loginService: LoginService, private route: Router, private http: HttpClient,
    private authServie: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let response: AuthGaurdResponse = <AuthGaurdResponse>await this.authServie.isAuthenticated();

    if (response.userName == null) {
      this.route.navigateByUrl("login");
      return false;
    }
    else {
      if (route.data.role == response.role) {
          return true;
      }
      else {
        this.route.navigateByUrl(response.role);
      }
    }
  }
}
