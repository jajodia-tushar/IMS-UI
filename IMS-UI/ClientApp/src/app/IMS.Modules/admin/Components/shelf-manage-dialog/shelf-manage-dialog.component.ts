import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';

@Component({
  selector: 'app-shelf-manage-dialog',
  templateUrl: './shelf-manage-dialog.component.html',
  styleUrls: ['./shelf-manage-dialog.component.css']
})
export class ShelfManageDialogComponent implements OnInit {
  shelfData: Shelf;
  constructor(private dialogRef: MatDialogRef<ShelfManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.shelfData = data;
   }

  ngOnInit() {  }

  notifyTableShelfEditted(shelvesResponse: ShelfListResponse) {
    if (shelvesResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (shelvesResponse.error == null) {
      this.dialogRef.close(shelvesResponse.shelves[0]);
    }
    else if (shelvesResponse.error != null) {
      this.dialogRef.close(false);
    }
  }

  notifyTableShelfCreated(shelvesResponse: ShelfListResponse) {
    if (shelvesResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (shelvesResponse.error == null) {
      this.dialogRef.close(shelvesResponse.shelves[0]);
    }
    else if (shelvesResponse.error != null) {
      this.dialogRef.close(false);
    }
  }
}
