import { Component, OnInit, Inject } from '@angular/core';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';

@Component({
  selector: 'app-shelf-deactivate-dialog',
  templateUrl: './shelf-deactivate-dialog.component.html',
  styleUrls: ['./shelf-deactivate-dialog.component.css']
})
export class ShelfDeactivateDialogComponent {
  shelf: Shelf;
  confirmButtonText: string = "Yes";
  constructor(private dialogRef: MatDialogRef<DeactivateDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
    private shelfService: ShelfService,
    private snackBar: MatSnackBar) {
    this.shelf = data;
  }
  async onConfirm() {
    this.confirmButtonText = ""
    //this.item.isActive=false;
    let response = <ShelfListResponse>await this.shelfService.deactivate(this.shelf.code);
    if (response.error == null) {
      this.dialogRef.close(true);
    }
    else {
      this.dialogRef.close(false)
    }
    this.dialogRef.close(true);
    // this.showMessage(2, "Shelf deleted Successfully");
    // this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close("cancelled");
  }

  showMessage(time, message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time, data: { message: message }
    });
  }
}
