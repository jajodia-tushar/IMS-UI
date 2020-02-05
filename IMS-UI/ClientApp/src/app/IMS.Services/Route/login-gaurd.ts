import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../IMS.Models/User/UserResponse';
import { CentralizedDataService } from '../shared/centralized-data.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isLoggedIn: boolean = false;
  pathToNavigate: string;

  constructor(private loginService: LoginService, private route: Router, private http: HttpClient
    , private centralizedReop: CentralizedDataService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userResponse: UserResponse = <UserResponse>await this.loginService.getUser();
    await this.centralizedReop.loadSelectedShelf();
    if (userResponse.user == null) {
      return true;
    }
    else {
      if (userResponse.user.role.name == 'Shelf' && this.centralizedReop.getShelf() == null) {

        return true;
      }
      else {
        if (userResponse.user.role.name == 'SuperAdmin')
          this.route.navigateByUrl('Admin')
        else
          this.route.navigateByUrl(userResponse.user.role.name);
        return false;
      }
    }
  }
}
