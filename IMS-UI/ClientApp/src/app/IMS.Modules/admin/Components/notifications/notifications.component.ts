import { Component, OnInit, SimpleChanges } from '@angular/core';

import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import {MatDialog, MatDialogConfig} from "@angular/material";
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public columns;
  vendorsOrdersDetails: VendorOrder[];
  constructor( public vendorOrderdetailsService: VendorOrderdetailsService,private dialog: MatDialog) { }
  public row;

  selectedTab : number = 0;
  public isClickedOn;
  
  ngOnInit() {
    this.vendorOrderdetailsService.VendorOrderDetails().subscribe(
      data => {
        this.vendorsOrdersDetails = data.vendorOrders;
     
      }
    );
    this.columns = this.vendorOrderdetailsService.getColumnFordataTable();
  }

  Tabledata(data) {
    this.row = data;
  }

  getClickedStatus(value){
    this.isClickedOn = value;
    if (this.isClickedOn === 1) {
      this.changeTab();
    } else {
      this.selectedTab -= 1;
    }
  }

  changeTab() {
    this.selectedTab +=1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(NotificationsComponent, dialogConfig);
}
}