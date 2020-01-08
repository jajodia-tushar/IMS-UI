import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { VendorOrderdetailsService } from 'src/app/IMS.Services/InvoiceEditor/vendor-orderdetails.service';
import { MatTableDataSource, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { OrderItemDetail } from 'src/app/IMS.Models/Vendor/OrderItemDetail';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { OrderDetailsApproveService } from 'src/app/IMS.Services/InvoiceEditor/order-details-approve.service';
import { ListOfVendorOrder } from 'src/app/IMS.Models/Vendor/ListOfVendorOrder';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { VendorOrderDetails } from 'src/app/IMS.Models/Vendor/VendorOrderDetails';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { HttpClient } from '@angular/common/http';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Router } from '@angular/router';
import { OrderDetailsRejectService } from 'src/app/IMS.Services/InvoiceEditor/order-details-reject.service';

interface FileUrl {
  locationUrl: string;
}


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
  public InvoiceImageUrl;
  public ChallanImageUrl;
  itemquantityprice: ItemQuantityPriceMapping[];
 // data: MatTableDataSource<OrderItemDetail>;
  public Items: Item[];
  Vendor: Vendor;
  VendorOrderdetails: VendorOrderDetails;
  vendorDetails: VendorOrder;
  constructor(private router : Router, public vendorOrderdetailsService: VendorOrderdetailsService, 
    private _ItemService: ItemService, 
    public _orderDetailsApproveService: OrderDetailsApproveService, 
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog : MatDialog, 
     private orderDetailsRejectService:OrderDetailsRejectService) { }
  @Input() TableData;
  public vendorOrder: VendorOrder
  @Output() reloadPendingApproval: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit() {
    
    this.columns = this.vendorOrderdetailsService.getColumn();

    this._ItemService.getAllItems().subscribe(
      data => {
        

        this.Items = data.items;
      }
    )
   
  
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    let data = changes.TableData.currentValue
    this.ClerkName = data.vendorOrderDetails.recievedBy;
    this.AdminName = data.vendorOrderDetails.submittedTo;
    this.ChallanNo = data.vendorOrderDetails.challanNumber;
    // this.InvoiceNo = data.vendorOrderDetails.invoiceNumber;
    this.OrderID = data.vendorOrderDetails.orderId;
    this.ChallanImageUrl=data.vendorOrderDetails.challanImageUrl;
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

  uploadImage(file) {
    if (file.length === 0) {
      return;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post<FileUrl>('/api/FileUpload', formData).subscribe(
      data => {
        this.InvoiceImageUrl= this.vendorOrder.vendorOrderDetails.invoiceImageUrl = data.locationUrl;
        this.showMessage(5, "image is uploaded");
      }
    );

  }
  openDialog(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(ImageDialogComponent,{
      data: this.ChallanImageUrl
    },);
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/Admin/Notifications"]);

  }
  Reject(){
    console.log(this.OrderID);
    this.orderDetailsRejectService.rejectOrder(this.OrderID).subscribe(
      data=>{
        if (data.status == "Success") {
          console.log(data.status);
          this.showMessage(5, "Order Rejected");
          this.reloadComponent();
        }
        else {
          this.showMessage(5, "Some error occured");
        }
      },
    );
  }
  approve() {
    this.reloadPendingApproval.emit(0);
    this.VendorOrderdetails.invoiceNumber = this.InvoiceNo;
    this.VendorOrderdetails.challanNumber = this.ChallanNo;
    this.VendorOrderdetails.finalAmount = this.FinalAmount;
    this.VendorOrderdetails.orderItemDetails = this.itemquantityprice;
    this.VendorOrderdetails.isApproved = true;
    this.VendorOrderdetails.invoiceImageUrl = this.InvoiceImageUrl;
    this.VendorOrderdetails.invoiceNumber = this.InvoiceNo;
    this.vendorDetails = { vendor: this.Vendor, vendorOrderDetails: this.VendorOrderdetails }
    this._orderDetailsApproveService.changeOrderDetails(this.vendorDetails).subscribe(
      data => {
        if (data.status == "Success") {
         
          this.showMessage(5, "Order Approved");
          this.reloadComponent();
        }
        else {
          this.showMessage(5, "Some error occured");
        }
      },
    );
  }
  }


