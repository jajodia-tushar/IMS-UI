import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../IMS.Services/login.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { Employee } from '../../IMS.Models/Employee';
import { FloorComponent } from '../floor/floor.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private ButtonName: string = "LOGIN";
  private Username: string = "";
  private Password: string = "";

  private isPopedUp: boolean = false;

  private role: string;
  private error: boolean = false;

  constructor(private _loginService: LoginService, private router: Router,
    private dialog: MatDialog) { }

  Login() {
    this._loginService.authenticate(this.Username, this.Password).subscribe(
      data => {
        this.role = data.user.role.name;
        if (this.role != null) {
          if (this.role == 'Shelf') {
            if (!this.isPopedUp) {
              this.isPopedUp = true;
              var dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = false;
              dialogConfig.autoFocus = true;
              dialogConfig.width = "20%";
              var dialogRef = this.dialog.open(FloorComponent, dialogConfig);
            }
          }
          else {
            this.router.navigateByUrl(this.role);
          }
        }
        else {
          this.ButtonName = "LOGIN";
          this.error = true;
        }
      },
      err => {
        this.ButtonName = "LOGIN";
        this.error = true
      }
    );
  }
  ngOnInit() {
  }
}