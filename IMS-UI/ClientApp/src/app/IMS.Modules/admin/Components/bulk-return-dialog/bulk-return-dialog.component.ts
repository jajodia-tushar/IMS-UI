import { Component, OnInit, Inject } from '@angular/core';
import { StockStatusWithSelectedDate, BulkRequestDialogComponent } from '../bulk-request-dialog/bulk-request-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableData } from '../bulk-order/bulk-order.component';
import { BulkOrderService } from 'src/app/IMS.Services/admin/bulk-order.service';
import { ItemLocationQuantityMapping, LocationQuantityMapping, BulkOrderItemQuantityMapping } from 'src/app/IMS.Models/Employee/BulkRequest';
import { Item } from 'src/app/IMS.Models/Item/Item';

@Component({
  selector: 'app-bulk-return-dialog',
  templateUrl: './bulk-return-dialog.component.html',
  styleUrls: ['./bulk-return-dialog.component.css']
})
export class BulkReturnDialogComponent implements OnInit {

  submitButtonText : string;
  ItemName : string;
  ItemQuantity : string;
  allShelfs : StockStatusWithSelectedDate[] = [];
  displayedColumns : string[] = ["ItemName","QuantityOrderd","QuantityUsed"]

  constructor(private dialogRef: MatDialogRef<BulkRequestDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data:BulkOrderItemQuantityMapping[],
     ) { }

  ngOnInit() {
    this.submitButtonText = "Submit";
    console.log(this.data);
  }

  cancelClikced(){
    this.dialogRef.close();
  }

  SubmitClicked(){
    alert("Submit");
    this.dialogRef.close(this.data);
  }

}
