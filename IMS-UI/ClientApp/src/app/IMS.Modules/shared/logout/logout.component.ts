import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/IMS.Services/login/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private loginService : LoginService, private snackBar : MatSnackBar) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logOut().subscribe(
      data => {
        if (data.status == "Success") {
          this.router.navigateByUrl("/login");
        }
        else {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 1000 * 2 , data : { message : "Something Went Wrong" }
          });
        }
      }
    )
  }

}
