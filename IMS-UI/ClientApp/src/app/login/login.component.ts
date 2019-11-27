import { Component, OnInit } from '@angular/core';
import { LoginService } from '../IMS.Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = "";
  public password = "";
  public error = false;
  constructor(private _loginService: LoginService, private router: Router) { }

  login() {
    this._loginService.authenticate(this.username, this.password).subscribe(
      data => {
        sessionStorage.setItem('role', data.user.role.name);
        this.router.navigateByUrl('/' + data.user.role.name);
        sessionStorage.setItem('username', this.username);
      },
      err => {
        this.error=true
      }
      
    )
  }
  ngOnInit() {
  }

}
