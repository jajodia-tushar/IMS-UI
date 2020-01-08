import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
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
export class InvoiceEditorComponent implements OnInit, OnChanges {
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
  vendorDetails: VendorOrders;
  constructor(public vendorOrderdetailsService: VendorOrderdetailsService, private _ItemService: ItemService, public _orderDetailsApproveService: OrderDetailsApproveService, private snackBar: MatSnackBar) { }
  @Input() TableData;
  
  
  ngOnInit() {
    
    this.columns = this.vendorOrderdetailsService.getColumn();

    this._ItemService.getAllItems().subscribe(
      data => {
        

        this.Items = data.items;
      }
    )
   
  
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.TableData.currentValue);
    let data = changes.TableData.currentValue
    this.ClerkName = data.vendorOrderDetails.recievedBy;
    this.AdminName = data.vendorOrderDetails.submittedTo;
    this.ChallanNo = data.vendorOrderDetails.challanNumber;
    this.InvoiceNo = data.vendorOrderDetails.invoiceNumber;
    this.OrderID = data.vendorOrderDetails.orderId;
    this.Vendor = data.vendor;
    this.VendorName = data.vendor.name;
    this.VendorOrderdetails = data.vendorOrderDetails;
    this.itemquantityprice = data.vendorOrderDetails.orderItemDetails;
  }



  
  finalPriceChange(amount) {
   
    this.FinalAmount = amount;
  }
  showMessage(time, message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time, data: { message: message }
    });
  }
 
  approve() {
    
    this.VendorOrderdetails.invoiceNumber = this.InvoiceNo;
    this.VendorOrderdetails.challanNumber = this.ChallanNo;
    this.VendorOrderdetails.finalAmount = this.FinalAmount;
    this.VendorOrderdetails.orderItemDetails = this.itemquantityprice;
    this.VendorOrderdetails.isApproved = true;
    this.vendorDetails = { vendor: this.Vendor, vendorOrderDetails: this.VendorOrderdetails }
  
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


