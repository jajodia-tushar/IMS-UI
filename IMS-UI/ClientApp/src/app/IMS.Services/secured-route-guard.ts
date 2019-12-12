import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { SessionResponse } from '../IMS.Models/SessionResponse';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredRouteGuard implements CanActivate {

  constructor(private _loginService: LoginService, private route: Router, private http: HttpClient,
    private authServie: SessionService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let response: SessionResponse = <SessionResponse>await this.authServie.isAuthenticated();

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
