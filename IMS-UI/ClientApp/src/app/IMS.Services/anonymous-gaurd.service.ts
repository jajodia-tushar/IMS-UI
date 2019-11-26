import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGaurdService implements CanActivate {

  constructor(private service: LoginService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.service.isUserLoggedIn())
      return true;
    this.route.navigate([sessionStorage.getItem("role")]);
    return false;
  }
}
