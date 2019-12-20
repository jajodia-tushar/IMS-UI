import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-manage-dialog',
  templateUrl: './user-manage-dialog.component.html',
  styleUrls: ['./user-manage-dialog.component.css']
})
export class UserManageDialogComponent implements OnInit {
  constructor( @Inject(MAT_DIALOG_DATA) data) { 
    console.log(data)
  }

  ngOnInit() {
  }

  

}
