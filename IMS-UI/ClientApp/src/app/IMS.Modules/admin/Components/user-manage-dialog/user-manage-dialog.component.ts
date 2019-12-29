import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/IMS.Models/User/User';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';
import { UsersResponse } from 'src/app/IMS.Models/User/UsersResponse';

@Component({
  selector: 'app-user-manage-dialog',
  templateUrl: './user-manage-dialog.component.html',
  styleUrls: ['./user-manage-dialog.component.css']
})
export class UserManageDialogComponent implements OnInit {
  userData : User;
  constructor(private dialogRef: MatDialogRef<UserManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.userData = data;
    console.log(data)
  }

  ngOnInit() {
  }

  notifyTableUserEditted(usersResponse:UsersResponse){
      console.log("inside dialog");
      console.log(usersResponse);
      if(usersResponse==null){
        this.dialogRef.close(false);
      }
      else if(usersResponse.error==null){
        this.dialogRef.close(usersResponse.users[0]);
      }
      // else if(usersResponse!=null){
      //   this.dialogRef.close(false);
      // }
  }

  notifyTableUserCreated(usersResponse:UsersResponse){
    if(usersResponse==null){
      this.dialogRef.close(false);
    }
    else if(usersResponse.error==null){
      this.dialogRef.close(usersResponse.users[0]);
    }
    // else if(usersResponse!=null){
    //   this.dialogRef.close(false);
    // }
}

}
