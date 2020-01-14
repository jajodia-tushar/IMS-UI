import { Component, OnInit, SimpleChanges } from '@angular/core';

import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public columns;
  vendorsOrdersDetails: VendorOrder[];
  pageInfo:PagingInfo;
  constructor( public vendorOrderdetailsService: VendorOrderdetailsService,private dialog: MatDialog) { }
  public row;
  public pageSize="10";
  public pageNo="1";
  selectedTab : number = 0;
  public isClickedOn;
  
  ngOnInit() {
    this.vendorService.getUnApprovedOrders().subscribe(
      data => {
        this.vendorsOrdersDetails = data.vendorOrders;
     
      }
    );
    this.GetDataforPendingApprovals();
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

  GetDataforPendingApprovals(){
    this.vendorOrderdetailsService.VendorOrderDetails(this.pageNo, this.pageSize).subscribe(
      data => {
        this.vendorsOrdersDetails = data.vendorOrders;
        this.pageInfo=data.pagingInfo;
        
      }
    );
  }

  getpageInfo(value){
    this.pageNo=value.pageIndex+1;
    this.pageSize=value.pageSize;
   this.GetDataforPendingApprovals();
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