import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { User } from 'src/app/IMS.Models/User/User';
import { Router } from '@angular/router';

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
    private router: Router) {
  }

  canUpdate()  {
    return (this.oldPassword=='' || this.newPassword=='' || this.confirmPassword=='' || !this.validPasswords());
  }

  ngOnInit() {
    this.centrallizedRepo.getLoggedInUser();
    this.loggedInUser = this.centrallizedRepo.getUser();
  }

  cancel() {
    if (this.loggedInUser.role.name == "SuperAdmin")
      this.router.navigateByUrl('Admin');
    this.router.navigateByUrl(this.loggedInUser.role.name);
  }

  validPasswords() {
    if(this.oldPassword == "" || this.newPassword == "" || this.confirmPassword == "")
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
  }

}
