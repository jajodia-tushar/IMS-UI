import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { VendorOrderDetails } from 'src/app/IMS.Models/Vendor/VendorOrderDetails';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';

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
  constructor(private router : Router, public vendorService: VendorService, 
    private _ItemService: ItemService, 
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog : MatDialog) { }
  @Input() TableData;
  public vendorOrder: VendorOrder
  @Output() reloadPendingApproval: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit() {
    
    this.columns = this.vendorService.getColumn();

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
      }
    );

  }
  openDialog(){
    if(this.ChallanImageUrl==""){
      showMessage(this.snackBar, 2, "Sorry, No Image Found","warn");
      return;
    }
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.ChallanImageUrl;
    dialogConfig.panelClass = "dialog-notification-image";
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/Admin/Notifications"]);

  }
  Reject(){
    console.log(this.OrderID);
    this.vendorService.rejectOrder(this.OrderID).subscribe(
      data=>{
        if (data.status == "Success") {
          console.log(data.status);
          showMessage(this.snackBar, 2, "Order Rejected", "success");
          this.reloadComponent();
        }
        else {
          showMessage(this.snackBar, 2, "Something went wrong!", "warn");
        }
      },
    );
  }
  approve() {
   
    if (this.InvoiceNo!=null) {
      this.reloadPendingApproval.emit(0);
    this.VendorOrderdetails.invoiceNumber = this.InvoiceNo;
    this.VendorOrderdetails.challanNumber = this.ChallanNo;
    this.VendorOrderdetails.finalAmount = this.FinalAmount;
    this.VendorOrderdetails.orderItemDetails = this.itemquantityprice;
    this.VendorOrderdetails.isApproved = true;
    this.VendorOrderdetails.invoiceImageUrl = this.InvoiceImageUrl;
    this.VendorOrderdetails.invoiceNumber = this.InvoiceNo;
    this.vendorDetails = { vendor: this.Vendor, vendorOrderDetails: this.VendorOrderdetails }
    this.vendorService.changeOrderDetails(this.vendorDetails).subscribe(
      data => {
        if (data.status == "Success") {
         
          showMessage(this.snackBar, 2, "Order Approved", "success");
          this.reloadComponent();
        }
        else {
          showMessage(this.snackBar, 2, "Something went wrong!", "warn");
        }
      },
    );
  }
  else {
    showMessage(this.snackBar, 2, "Please fill the InvoiceNo first", "warn");
  }
}

  
  }


