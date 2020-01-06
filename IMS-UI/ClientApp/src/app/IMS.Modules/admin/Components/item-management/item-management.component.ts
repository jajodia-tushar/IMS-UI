import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddDialogComponent } from '../item-add-dialog/item-add-dialog.component';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.css']
})

export class ItemManagementComponent implements OnInit {


 constructor(public dialog: MatDialog) { }


  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
