import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/IMS.Models/User/User';

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

  notifyTableUserEditted(user){
      console.log("inside dialog");
      this.dialogRef.close(user);      
  }

}
