import { Component, OnInit, Inject } from '@angular/core';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';
import { ItemManagementService } from 'src/app/IMS.Services/admin/item-management.service';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';

@Component({
  selector: 'app-item-deactivate-dialog',
  templateUrl: './item-deactivate-dialog.component.html',
  styleUrls: ['./item-deactivate-dialog.component.css']
})
export class ItemDeactivateDialogComponent implements OnInit {
  item: Item;
  confirmButtonText: string = "Yes";
  constructor(private dialogRef: MatDialogRef<DeactivateDialogComponent>, @Inject(MAT_DIALOG_DATA) data,
    private itemManageService: ItemManagementService,
    private snackBar: MatSnackBar) {
    this.item = data;
  }

  ngOnInit() {
  }

  async onConfirm() {
    this.confirmButtonText = ""
    //this.item.isActive=false;
    let response = <ItemsResponse>await this.itemManageService.deactivate(this.item.id,"false");
    if (response.error == null) {
      this.dialogRef.close(true);
    }
    else {
      this.dialogRef.close(false)
    }
    this.dialogRef.close(true);
    // this.showMessage(2, "Item deleted Successfully");
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