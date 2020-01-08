import { Component, OnInit } from '@angular/core';
import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { OrderItemDetail } from 'src/app/IMS.Models/Vendor/OrderItemDetail';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { OrderDetailsApproveService } from 'src/app/IMS.Services/InvoiceEditor/order-details-approve.service';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { VendorOrderDetails } from 'src/app/IMS.Models/Vendor/vendorOrderDetails';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { VendorOrders } from 'src/app/IMS.Models/Vendor/VendorOrders';

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
  public isApprove;
  public columns;
  public FinalAmount;
  itemquantityprice: ItemQuantityPriceMapping[];
 // data: MatTableDataSource<OrderItemDetail>;
  public Items: Item[];
  Vendor: Vendor;
  VendorOrderdetails: VendorOrderDetails;
  constructor(public vendorOrderdetailsService: VendorOrderdetailsService, private _ItemService: ItemService, public _orderDetailsApproveService: OrderDetailsApproveService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.vendorOrderdetailsService.VendorOrderDetails().subscribe(
      data => {
        this.ClerkName = data.vendorOrders[0].vendorOrderDetails.submittedTo;
        this.AdminName = data.vendorOrders[0].vendorOrderDetails.submittedTo;
        this.ChallanNo = data.vendorOrders[0].vendorOrderDetails.challanNumber;
        this.InvoiceNo = data.vendorOrders[0].vendorOrderDetails.invoiceNumber;
        this.OrderID = data.vendorOrders[0].vendorOrderDetails.orderId;
        this.Vendor = data.vendorOrders[0].vendor;
        this.VendorName = data.vendorOrders[0].vendor.name;
        this.VendorOrderdetails = data.vendorOrders[0].vendorOrderDetails;
        this.itemquantityprice = data.vendorOrders[0].vendorOrderDetails.orderItemDetails;
       // this.data = new MatTableDataSource(this.itemquantityprice);
        console.log(this.itemquantityprice);
       // this.isApprove = data.listOfVendorOrders[0].vendorOrderDetails.isApproved;
       
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
  finalPriceChange(amount) {
    console.log(amount);
    this.FinalAmount = amount;
  }
  showMessage(time, message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time, data: { message: message }
    });
  }
  vendorDetails: VendorOrders;
  approve() {
    
    this.VendorOrderdetails.invoiceNumber = this.InvoiceNo;
    this.VendorOrderdetails.challanNumber = this.ChallanNo;
    this.VendorOrderdetails.finalAmount = this.FinalAmount;
    this.VendorOrderdetails.orderItemDetails = this.itemquantityprice;
    this.VendorOrderdetails.isApproved = true;
    this.vendorDetails = { vendor: this.Vendor, vendorOrderDetails: this.VendorOrderdetails }
    
    console.log(this.vendorDetails);
    console.log(this.FinalAmount);
    this._orderDetailsApproveService.changeOrderDetails(this.vendorDetails).subscribe(
      data => {
        console.log(data);
        if (data.status == "Success") {
          this.showMessage(5, "Order Approved");
        }
        else {
          this.showMessage(5, "Some error occured");
        }
      },
    );
  }
  }


