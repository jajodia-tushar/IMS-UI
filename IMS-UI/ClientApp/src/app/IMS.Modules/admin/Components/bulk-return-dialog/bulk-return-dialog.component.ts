import { Component, OnInit, Inject } from '@angular/core';
import { StockStatusWithSelectedDate, BulkRequestDialogComponent } from '../bulk-request-dialog/bulk-request-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BulkOrderItemQuantityMapping } from 'src/app/IMS.Models/Employee/BulkRequest';
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
  }

  cancelClikced(){
    this.dialogRef.close();
  }

  SubmitClicked(){
    this.dialogRef.close(this.data);
  }

}
