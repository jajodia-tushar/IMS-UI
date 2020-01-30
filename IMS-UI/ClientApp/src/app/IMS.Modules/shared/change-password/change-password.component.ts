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

  constructor(private centrallizedRepo: CentralizedDataService,
    private router: Router) { 
  }

  ngOnInit() {
    this.centrallizedRepo.getLoggedInUser();
    this.loggedInUser = this.centrallizedRepo.getUser();
    console.log(this.loggedInUser);
  }

  cancel()  {
    if(this.loggedInUser.role.name == "SuperAdmin")
      this.router.navigateByUrl('Admin');
    this.router.navigateByUrl(this.loggedInUser.role.name);
  }

  update()  {
    console.log(this.oldPassword + " " + this.newPassword + " " + this.confirmPassword);
  }

}
