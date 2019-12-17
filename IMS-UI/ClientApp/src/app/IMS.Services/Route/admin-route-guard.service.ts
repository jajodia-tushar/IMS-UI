import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { CentralizedDataService } from '../shared/centralized-data.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuardService {

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient
    ,private centralizedRepo : CentralizedDataService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let userResponse : UserResponse = <UserResponse> await this.loginService.getUser();
      if (userResponse.user == null)  {
        this.router.navigateByUrl("login");
        return false;
      }
      else {
        if (route.data.allowedRoles.includes(userResponse.user.role.name)) {
            return true;
        }
        else {
          this.router.navigateByUrl(userResponse.user.role.name);
          return false;
        }
      }
    }
}
