import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { log } from 'util';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../IMS.Models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn: boolean = false;
  pathToNavigate: string;

  constructor(private loginService: LoginService, private route: Router, private http: HttpClient) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userResponse : UserResponse = <UserResponse> await this.loginService.getUser();
    console.log(userResponse);

    if (userResponse.user == null)
      return true;
    else {
      this.route.navigateByUrl(userResponse.user.role.name);
      return false;
    }
  }
}
