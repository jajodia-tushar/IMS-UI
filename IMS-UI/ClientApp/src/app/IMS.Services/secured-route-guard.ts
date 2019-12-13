import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../IMS.Models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class SecuredRouteGuard implements CanActivate {
  constructor(private loginService: LoginService, private route: Router, private http: HttpClient) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userResponse : UserResponse = <UserResponse> await this.loginService.getUser();
    
    if (userResponse.user == null) {
      this.route.navigateByUrl("login");
      return false;
    }
    else {
      if (route.data.role == userResponse.user.role.name) {
          return true;
      }
      else {
        this.route.navigateByUrl(userResponse.user.role.name);
      }
    }
  }
}
