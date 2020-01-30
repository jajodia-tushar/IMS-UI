import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { User } from 'src/app/IMS.Models/User/User';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(private centrallizedRepo: CentralizedDataService) { 
  }

  async ngOnInit() {
    await this.centrallizedRepo.getLoggedInUser();
    let user: User = this.centrallizedRepo.getUser();
    console.log(user);
    console.log(this.oldPassword + " " + this.newPassword + " " + this.confirmPassword);
  }

}
