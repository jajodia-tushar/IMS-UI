import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { FloorComponent } from '../floor/floor.component';
import { LoginService } from 'src/app/IMS.Services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public ButtonName: string = "LOGIN";
  public Username: string = "";
  public Password: string = "";

  private isPopedUp: boolean = false;

  private role: string;
  public error: boolean = false;

  constructor(private loginService: LoginService, private router: Router,
    private dialog: MatDialog) { }

  Login() {
    this.ButtonName = null;
    this.loginService.authenticate(this.Username, this.Password).subscribe(
      data => {
        this.role = data.user.role.name;
        if (this.role != null) {
          if (this.role == 'Shelf') {
            if (!this.isPopedUp) {
              let dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = false;
              dialogConfig.autoFocus = true;
              // dialogConfig.width = "%";
              let dialogRef = this.dialog.open(FloorComponent, dialogConfig);
              // dialogRef.close(false);
            }
          }
          else {
            if (this.role == 'SuperAdmin')
              this.router.navigateByUrl('Admin')
            else
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