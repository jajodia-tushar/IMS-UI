import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/IMS.Models/User/User';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Response} from 'src/app/IMS.Models/Shared/Response'


@Component({
  selector: 'app-deactivate-dialog',
  templateUrl: './deactivate-dialog.component.html',
  styleUrls: ['./deactivate-dialog.component.css']
})
export class DeactivateDialogComponent implements OnInit {
  user: User;
  constructor(private dialogRef: MatDialogRef<DeactivateDialogComponent>,@Inject(MAT_DIALOG_DATA) data,
              private userManageService : UserManagementService,
              private snackBar : MatSnackBar) { 
    console.log(data);
    this.user = data;
  }

  ngOnInit() {
  }

  async onConfirm() {
    let response = <Response>await this.userManageService.deactivate(this.user.id,false);
    if(response.error==null){
      this.dialogRef.close(true);
    }
    else{
      this.dialogRef.close(false)
    }
    console.log(this.user);
    this.showMessage(2,"User Deactivated Successfully");
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  showMessage(time,message){
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time , data : { message : message }
    });
  }

}