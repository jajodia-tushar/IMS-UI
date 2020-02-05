import { Component, Inject } from '@angular/core';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';
import { ItemService } from 'src/app/IMS.Services/item/item.service';

@Component({
  selector: 'app-item-deactivate-dialog',
  templateUrl: './item-deactivate-dialog.component.html',
  styleUrls: ['./item-deactivate-dialog.component.css']
})
export class ItemDeactivateDialogComponent {
  item: Item;
  confirmButtonText: string = "Yes";
  constructor(private dialogRef: MatDialogRef<DeactivateDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
    private itemService: ItemService,
    private snackBar: MatSnackBar) {
    this.item = data;
  }

  async onConfirm() {
    this.confirmButtonText = ""
    let response = <ItemsResponse>await this.itemService.deactivate(this.item.id,"false");
    if (response.error == null) {
      this.dialogRef.close(true);
    }
    else {
      this.dialogRef.close(false)
    }
    this.dialogRef.close(true);
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