import { Component, OnInit } from '@angular/core';
import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { MatTableDataSource } from '@angular/material';
import { OrderItemDetail } from 'src/app/IMS.Models/Vendor/OrderItemDetail';

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
  // datasourceitems:OrderItemDetail[]=[];
  constructor(public vendorOrderdetailsService:VendorOrderdetailsService) { }

  ngOnInit() {
    this.vendorOrderdetailsService.VendorOrderDetails().subscribe(
      data => {
        this.ClerkName = data.listOfVendorOrders[0].vendorOrderDetails.submittedTo;
        this.AdminName = data.listOfVendorOrders[0].vendorOrderDetails.submittedTo;
        this.ChallanNo = data.listOfVendorOrders[0].vendorOrderDetails.challanNumber;
        this.InvoiceNo = data.listOfVendorOrders[0].vendorOrderDetails.invoiceNumber;
        this.OrderID = data.listOfVendorOrders[0].vendorOrderDetails.orderId;
        this.VendorName = data.listOfVendorOrders[0].vendor.name;
       // console.log(data);
      }
        );

        this.vendorOrderdetailsService.getclerkOrderData().subscribe(
          res => {
            this.itemquantityprice=res.data;
            console.log(res.data);
          });
        this.columns = this.vendorOrderdetailsService.getColumn();
      }

      // delete(row:any){
      //      let index = this.datasourceitems.indexOf(row);
      //      if (index != -1) {
      //        this.datasourceitems.splice(index, 1);
      //        this.renderTable();
      //      }
      //    }
      
      //    renderTable() {
      //      this.itemquantityprice = new MatTableDataSource(this.datasourceitems);
      //    }
  }


