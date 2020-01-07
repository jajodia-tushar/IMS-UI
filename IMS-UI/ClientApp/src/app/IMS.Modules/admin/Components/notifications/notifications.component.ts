import { Component, OnInit } from '@angular/core';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';
import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public columns;
  vendorsOrdersDetails: ListOfVendorOrder[];
  constructor( public vendorOrderdetailsService: VendorOrderdetailsService) { }

  ngOnInit() {

    this.vendorOrderdetailsService.VendorOrderDetails().subscribe(

      data => {
        this.vendorsOrdersDetails = data.listOfVendorOrders;
        console.log(data);
        console.log(this.vendorsOrdersDetails);
      }
    );

    this.columns = this.vendorOrderdetailsService.getColumnFordataTable();
  }

}
