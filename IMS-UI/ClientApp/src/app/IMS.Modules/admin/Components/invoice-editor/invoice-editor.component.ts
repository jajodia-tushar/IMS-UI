import { Component, OnInit } from '@angular/core';
import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { MatTableDataSource } from '@angular/material';
import { OrderItemDetail } from 'src/app/IMS.Models/Vendor/OrderItemDetail';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';

@Component({
  selector: 'app-invoice-editor',
  templateUrl: './invoice-editor.component.html',
  styleUrls: ['./invoice-editor.component.css']
})
export class InvoiceEditorComponent implements OnInit {
  public ClerkName;
  public OrderID;
  public AdminName;
  public VendorName;
  public InvoiceNo;
  public ChallanNo;
  
  public columns;
  itemquantityprice: MatTableDataSource<OrderItemDetail>;
 
  public Items: Item[];
  constructor(public vendorOrderdetailsService: VendorOrderdetailsService, private _ItemService: ItemService) { }

  ngOnInit() {
    this.vendorOrderdetailsService.VendorOrderDetails().subscribe(
      data => {
        this.ClerkName = data.listOfVendorOrders[0].vendorOrderDetails.submittedTo;
        this.AdminName = data.listOfVendorOrders[0].vendorOrderDetails.submittedTo;
        this.ChallanNo = data.listOfVendorOrders[0].vendorOrderDetails.challanNumber;
        this.InvoiceNo = data.listOfVendorOrders[0].vendorOrderDetails.invoiceNumber;
        this.OrderID = data.listOfVendorOrders[0].vendorOrderDetails.orderId;
        this.VendorName = data.listOfVendorOrders[0].vendor.name;
        this.itemquantityprice = data.listOfVendorOrders[0].vendorOrderDetails.orderItemDetails;
        console.log(this.itemquantityprice);
       
       
      }
        );

        //this.vendorOrderdetailsService.getclerkOrderData().subscribe(
        //  res => {
        //    this.itemquantityprice=res.data;
        //    console.log(res.data);
        //  });
    this.columns = this.vendorOrderdetailsService.getColumn();

    this._ItemService.getAllItems().subscribe(
      data => {
        

        this.Items = data.items;
      }
      )
      }

  edit(aloo: any) {
    console.log(aloo);
     console.log(this.itemquantityprice);
  }
  }


