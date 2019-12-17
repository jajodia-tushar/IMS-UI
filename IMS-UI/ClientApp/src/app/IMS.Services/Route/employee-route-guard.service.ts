import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CentralizedDataService } from '../shared/centralized-data.service';
import { ShelfService } from '../Shelf/shelf.service';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRouteGuardService {

  constructor(private loginService: LoginService, private router: Router, private http: HttpClient
    ,private centralizedRepo : CentralizedDataService,private shelfService : ShelfService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userResponse : UserResponse = <UserResponse> await this.loginService.getUser();
    await this.centralizedRepo.loadSelectedShelf();
    if (userResponse.user == null)  {
      this.router.navigateByUrl("login");
      return false;
    }
    else {
      if (route.data.role == userResponse.user.role.name) {
          if(this.centralizedRepo.getShelf() == null){
            this.router.navigateByUrl('login');
            return false;
          }
          else{
            return true;
          }
      }
      else {
        this.router.navigateByUrl(userResponse.user.role.name);
      }
    }
  }
}
