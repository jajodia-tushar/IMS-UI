import { Component, OnInit } from '@angular/core';
import { LoginService } from '../IMS.Services/login.service';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FloorComponent } from '../floor/floor.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Username = "";
  public Password = "";
  public role;
  public error = false;
  constructor(private _loginService: LoginService, private router: Router,
    private dialog: MatDialog) { }

  login() {
    this._loginService.authenticate(this.Username, this.Password).subscribe(
      data => {
        this.role = data.user.role.name;
        if (this.role != null) {
          if (this.role == 'shelf') {
            var dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = false;
            dialogConfig.autoFocus = true;
            dialogConfig.width = "20%";
            this.dialog.open(FloorComponent, dialogConfig)
          }
          else {
            console.log("Coming here", this.role)
            this.router.navigateByUrl(this.role);
          }
          //sessionStorage.setItem('role', this.role);
          //sessionStorage.setItem('username', this.username);
        }
        else
          this.error = true;
      },
      err => {
        this.error=true
      }
      
    )
  }
  ngOnInit() {
  }

}
