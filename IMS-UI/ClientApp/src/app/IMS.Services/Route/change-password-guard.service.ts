import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CentralizedDataService } from '../shared/centralized-data.service';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuardService implements CanActivate {
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    this.centralizedReop.getLoggedInUser();
    let user = this.centralizedReop.getUser();
    if(!user)  {
      this.routeR.navigateByUrl('login');
      return false;
    }
    return true;
  }

  constructor(private loginService: LoginService, private routeR: Router,
     private http: HttpClient, private centralizedReop: CentralizedDataService) { }
}
