import { Component, OnInit } from '@angular/core';

import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { VendorOrders } from 'src/app/IMS.Models/Vendor/VendorOrders';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public columns;
  vendorsOrdersDetails: VendorOrders[];
  constructor( public vendorOrderdetailsService: VendorOrderdetailsService) { }
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
    console.log(this.selectedTab);
    this.isClickedOn = value;
    if (this.isClickedOn === 1) {
      this.changeTab();
    }
  }

  changeTab() {
    this.selectedTab +=1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }
}
