import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material'
import { FloorComponent } from '../floor/floor.component';
import { LoginService } from 'src/app/IMS.Services/login/login.service';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';

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

  constructor(private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private centralizedRepo : CentralizedDataService) { }

  Login() {
    this.ButtonName = null;
    this.loginService.authenticate(this.Username, this.Password).subscribe(
      data => {
        this.role = data.user.role.name;
        if (this.role != null) {
          this.centralizedRepo.setUser(data.user);
          if (!data.user.isDefaultPasswordChanged) {
            this.router.navigateByUrl('changePassword');
            return;
          }
          if (this.role == 'Shelf') {
            if (!this.isPopedUp) {
              let dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = true;
              dialogConfig.panelClass = 'dialog-floor-select';
              dialogConfig.autoFocus = true;
              let dialogRef = this.dialog.open(FloorComponent, dialogConfig);
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