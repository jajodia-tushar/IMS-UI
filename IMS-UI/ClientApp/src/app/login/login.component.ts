import { Component, OnInit } from '@angular/core';
import { LoginService } from '../IMS.Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username = "";
  public password = "";
  public error = false;
  constructor(private service: LoginService) { }

  login() {
    this.service.authenticate(this.username, this.password).subscribe(
      data => {
        this.service.decodeJwtToken(data["token"]);
        sessionStorage.setItem('username', this.username);
      },
      err => {
        console.log("error")
        this.error=true
      }
      
    )
  }
  ngOnInit() {
  }

}
