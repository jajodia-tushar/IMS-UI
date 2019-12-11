import { Component, OnInit } from '@angular/core';
import { LoginService } from '../IMS.Services/login.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from '@angular/material'
import { FloorComponent } from '../floor/floor.component';
import { Employee } from '../IMS.Models/Employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ButtonName = "LOGIN";
  public Username = "";
  public Password = "";
  public isPopedUp = false;
  public role;
  public error = false;
  constructor(private _loginService: LoginService, private router: Router,
    private dialog: MatDialog) { }

  Login() {
    this._loginService.authenticate(this.Username, this.Password).subscribe(
      data => {
        this.role = data.user.role.name;
        let employee : Employee = {
          id : data.user.id,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          isActive: true
        }

       
        if (this.role != null) {
          if (this.role == 'Shelf') {
            console.log(this.dialog)
            if (!this.isPopedUp) {
              this.isPopedUp = true;
              var dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = false;
              dialogConfig.autoFocus = true;
              dialogConfig.width = "20%";
              var dialogRef=this.dialog.open(FloorComponent, dialogConfig);

            }
            
          }
          else {
            console.log("Coming here", this.role)
            this.router.navigateByUrl(this.role);
          }
          // else
          //   this._router.navigateByUrl('/' + data.user.role.name.trim());
          sessionStorage.setItem('role', this.role.trim());
          sessionStorage.setItem('username', this.Username);
        }
        else
        {
          this.ButtonName = "LOGIN";
          this.error = true;
        }
      },
      err => {
        this.ButtonName = "LOGIN";
        this.error=true
      }      
    )
  }
  ngOnInit() {
  }
}