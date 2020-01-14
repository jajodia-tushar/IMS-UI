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
 fromDate:string;
  toDate:string;
  selectedTab : number = 0;
  public isClickedOn;
  
  ngOnInit() {
    this.initializeDate();
    this.pendingApprovalData();
  }
 
  initializeDate(){
  let date = new Date();
  this.toDate = date.toISOString();
  this.toDate=this.changeDateFormat(this.toDate);
  date.setDate(date.getDay() - 6);
  this.fromDate = date.toISOString();
  this.fromDate=this.changeDateFormat(this.fromDate);
  console.log(this.fromDate);
  console.log(this.toDate);
 
  }

  pendingApprovalData(){
    this.vendorOrderdetailsService.VendorOrderDetails(this.fromDate,this.toDate).subscribe(
      data => {
        this.vendorsOrdersDetails = data.vendorOrders;
     console.log(this.toDate);
      }
    );
    this.columns = this.vendorOrderdetailsService.getColumnFordataTable();
    let date = new Date();
    this.toDate = date.toISOString();
    this.fromDate = date.toISOString();
  }
  
  chooseDate(){
    this.toDate=this.changeDateFormat(this.toDate);
    this.fromDate=this.changeDateFormat(this.fromDate);
    console.log(this.fromDate);
    console.log(this.toDate)
    this.pendingApprovalData();
  }

  changeDateFormat(date:string){
    let inputDate: Date = new Date(Date.parse(date));
    return `${inputDate.getFullYear()}${("0" + (inputDate.getMonth() + 1))
      .slice(-2)}${("0" + inputDate.getDate()).slice(-2)}`
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
