import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';
import { BulkOrderService } from 'src/app/IMS.Services/admin/bulk-order.service';
import { StockStatus } from 'src/app/IMS.Models/Admin/StockStatusResponse';
import { TableData } from '../bulk-order/bulk-order.component';
import { Extractor } from '@angular/compiler';
import { LocationQuantityMapping, ItemLocationQuantityMapping } from 'src/app/IMS.Models/Employee/BulkRequest';
import { Item } from 'src/app/IMS.Models/Item/Item';

@Component({
  selector: 'app-bulk-request-dialog',
  templateUrl: './bulk-request-dialog.component.html',
  styleUrls: ['./bulk-request-dialog.component.css']
})
export class BulkRequestDialogComponent implements OnInit {

  submitButtonText : string;
  ItemName : string;
  ItemQuantity : string;
  allShelfs : StockStatusWithSelectedDate[] = [];

  constructor(private dialogRef: MatDialogRef<BulkRequestDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data:TableData,
     private bulkOrderService : BulkOrderService
     ) { }

  ngOnInit() {
    this.submitButtonText = "Submit";
    this.ItemName = this.data.itemName;
    this.ItemQuantity = this.data.itemQuantity.toString();

    this.bulkOrderService.GetStockStatus(1,10000,this.data.itemId).subscribe(
      data => {
        data.stockStatusList[0].storeStatus.forEach(
          store => {
            let stockStatusWithSelectedDate : StockStatusWithSelectedDate = {
              quantity : store.quantity,
              location : store.location,
              color : store.color,
              quantitySelected : "0"
            }
            this.allShelfs.push(stockStatusWithSelectedDate);
          });
      });
  }

  cancelClikced(){
    alert("Cancel");
    this.dialogRef.close();
  }

  SubmitClicked(){
    alert("Submit");
    let itemLocQua : ItemLocationQuantityMapping = new ItemLocationQuantityMapping();
    itemLocQua.item = new Item();
    itemLocQua.locationQuantityMappings = [];
    itemLocQua.item.id = parseInt(this.data.itemId);
    itemLocQua.item.name = this.data.itemName;

    this.allShelfs.forEach(
      shelf => {
        let locationQuantityMapping : LocationQuantityMapping = {
            location : shelf.location,
            quantity : parseInt(shelf.quantitySelected)
        }
        itemLocQua.locationQuantityMappings.push(locationQuantityMapping);
      });
    this.dialogRef.close(itemLocQua);
  }
}

export class StockStatusWithSelectedDate{
  quantity: number;
  location: string;
  color: string;
  quantitySelected : string;
}
