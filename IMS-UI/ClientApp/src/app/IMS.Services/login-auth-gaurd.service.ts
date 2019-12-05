import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { AuthGaurdResponse } from '../IMS.Models/AuthGaurdResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGaurdService implements CanActivate {
  public UserName;
  public role;
  isLoggedIn: boolean = false;
  constructor(private _loginService: LoginService, private route: Router, private http: HttpClient) {
   
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.http.get<AuthGaurdResponse>('api/AuthGaurd').toPromise().then(
      data => {
        console.log(data);
        this.isLoggedIn = data.userName != null;
        this.UserName = data.userName;
        this.role = data.role;
      },
      error => {
        this.isLoggedIn = false;
      }
    );
    if (this.isLoggedIn) {
      this.route.navigateByUrl(this.role);
    }
    return true;
  }
}
