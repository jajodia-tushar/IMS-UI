import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { User } from 'src/app/IMS.Models/User/User';
import { Router } from '@angular/router';
import { ChangePasswordDetails } from 'src/app/IMS.Models/ChangePasswordDetails';
import { LoginService } from 'src/app/IMS.Services/login/login.service';
import { showMessage } from '../utils/snackbar';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  loggedInUser: User = new User();
  UpdateButton: string = "Update";
  errorMessage: string = "";

  constructor(private centrallizedRepo: CentralizedDataService,
    private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) {
    this.centrallizedRepo.getLoggedInUser();
    this.loggedInUser = this.centrallizedRepo.getUser();
    if (!this.loggedInUser) {
      this.router.navigateByUrl('login');
    }
  }

  canUpdate() {
    return (this.oldPassword == '' || this.newPassword == '' || this.confirmPassword == '' || !this.validPasswords());
  }

   ngOnInit() {
    
  }

  cancel() {
    if (this.loggedInUser.role.name == "SuperAdmin")
      this.router.navigateByUrl('Admin');
    this.router.navigateByUrl(this.loggedInUser.role.name);
  }

  validPasswords() {
    if (this.oldPassword == "" || this.newPassword == "" || this.confirmPassword == "")
      this.errorMessage = "";
    else if (this.oldPassword == this.newPassword)
      this.errorMessage = "New Password cannot be same as Old Password";
    else if (this.newPassword != this.confirmPassword)
      this.errorMessage = "New passwords doesn't match";
    else
      this.errorMessage = "";
    return this.errorMessage == "" ? true : false;
  }

  update() {
    let passwordDetails = new ChangePasswordDetails();
    passwordDetails.oldPassword = this.oldPassword;
    passwordDetails.newPassword = this.newPassword;

    this.loginService.updatePassword(this.loggedInUser.id, passwordDetails).subscribe(
      data => {
        console.log(data);
        if (data.status == "Success") {
          showMessage(this.snackBar, 5, "Password Updated Successfully!", "success");
          this.router.navigateByUrl('login');
        }
        else {
          showMessage(this.snackBar, 3, data.error.errorMessage, "warn");
        }
      }
    );
  }

}
