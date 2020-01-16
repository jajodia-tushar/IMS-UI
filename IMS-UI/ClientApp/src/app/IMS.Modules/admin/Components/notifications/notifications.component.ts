import { Component, OnInit } from '@angular/core';
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
  vendorsOrdersDetails: VendorOrder[];
  columns;

  pageInfo:PagingInfo;
  constructor( public vendorService: VendorService,private dialog: MatDialog) { }
  row;
  selectedTab : number = 0;
  isClickedOn;
  
  ngOnInit() {
    this.initializePagination();
    this.GetDataforPendingApprovals();
    this.columns = this.vendorService.getColumnFordataTable();
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

  initializePagination(){
    this.pageInfo = new PagingInfo();
    this.pageInfo.pageNumber = 1;
    this.pageInfo.pageSize = 10;
    this.pageInfo.totalResults = 0;
  }

  GetDataforPendingApprovals(){
    this.vendorService.getUnApprovedOrders(this.pageInfo.pageNumber, this.pageInfo.pageSize).subscribe(
      data => {
        this.vendorsOrdersDetails = data.vendorOrders;
        this.pageInfo=data.pagingInfo;
      }
    );
  }

  getpageInfo(event){
    this.pageInfo.pageNumber = event.pageIndex + 1;
    this.pageInfo.pageSize = event.pageSize;
    this.GetDataforPendingApprovals();
  }

  changeTab() {
    this.selectedTab += 1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(NotificationsComponent, dialogConfig);
  }
}