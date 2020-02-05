import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';


@Component({
  selector: 'app-item-manage-dialog',
  templateUrl: './item-manage-dialog.component.html',
  styleUrls: ['./item-manage-dialog.component.css']
})
export class ItemManageDialogComponent implements OnInit {
  itemData: Item;
  constructor(private dialogRef: MatDialogRef<ItemManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.itemData = data;
  }
  ngOnInit() { }

  notifyTableItemEditted(itemsResponse: ItemsResponse) {
    if (itemsResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (itemsResponse.error == null) {
      this.dialogRef.close(itemsResponse.items[0]);
    }
    else if (itemsResponse.error != null) {
      this.dialogRef.close(false);
    }
  }

  notifyTableItemCreated(itemsResponse: ItemsResponse) {
    if (itemsResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (itemsResponse.error == null) {
      this.dialogRef.close(itemsResponse.items[0]);
    }
    else if (itemsResponse.error != null) {
      this.dialogRef.close(false);
    }
  }
}
