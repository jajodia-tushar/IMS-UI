import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../../IMS.Models/User/UserResponse';
import { ShelfResponse } from '../../IMS.Models/Shelf/ShelfResponse';
import { CentralizedDataService } from '../shared/centralized-data.service';
import { LoginService } from '../login/login.service';
import { ShelfService } from '../Shelf/shelf.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredRouteGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private http: HttpClient
    ,private centralizedRepo : CentralizedDataService,private selfService : ShelfService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userResponse : UserResponse = <UserResponse> await this.loginService.getUser();
    await this.centralizedRepo.loadSelectedShelf();
    
    if (userResponse.user == null || this.centralizedRepo.getShelf() == null)  {
      this.router.navigateByUrl("login");
      return false;
    }
    else {
      if (route.data.role == userResponse.user.role.name) {
          return true;
      }
      else {
        this.router.navigateByUrl(userResponse.user.role.name);
      }
    }
  }
}
