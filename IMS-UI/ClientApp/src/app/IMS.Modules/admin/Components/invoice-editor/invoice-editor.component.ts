import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { VendorOrderDetails } from 'src/app/IMS.Models/Vendor/VendorOrderDetails';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

interface FileUrl {
  locationUrl: string;
}


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
  public IsApproved;
  public columns;
  public FinalAmount;
  public InvoiceImageUrl;
  public ChallanImageUrl;
  itemquantityprice: ItemQuantityPriceMapping[];
  public Items: Item[];
  Vendor: Vendor;
  VendorOrderdetails: VendorOrderDetails;
  vendorDetails: VendorOrder;
  orderId;
  lastModifiedBy: string;
  canEdit: boolean;
  isDisabled: boolean;

  constructor(
    private router : Router, 
    public vendorService: VendorService, 
    private _ItemService: ItemService, 
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private dialog : MatDialog, 
    private route: ActivatedRoute,
    private centralizedService: CentralizedDataService
  ) { }

  @Input() TableData;
  public vendorOrder: VendorOrder
  @Output() reloadPendingApproval: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit() {
    this.columns = this.vendorService.getColumn();

    this._ItemService.getAllItems().subscribe(
      data => {
        this.Items = data.items;
      }
    );

    this.route.paramMap.subscribe(
      params => {
        this.orderId = params.get("id");
      }
    );

    this.vendorService.getVendorOrderByOrderId(this.orderId).subscribe(
      _data => {
       
        this.canEdit = _data.canEdit;
        this.lastModifiedBy = _data.lastModifiedBy;

        let data = _data.vendorOrder;
        if (data.vendorOrderDetails) {
          this.ClerkName = data.vendorOrderDetails.recievedBy;
          this.AdminName = data.vendorOrderDetails.submittedTo;
          this.ChallanNo = data.vendorOrderDetails.challanNumber;
          this.OrderID = data.vendorOrderDetails.orderId;
          this.ChallanImageUrl=data.vendorOrderDetails.challanImageUrl;
          this.VendorOrderdetails = data.vendorOrderDetails;
          this.itemquantityprice = data.vendorOrderDetails.orderItemDetails;
          this.InvoiceNo = data.vendorOrderDetails.invoiceNumber;
          this.IsApproved = data.vendorOrderDetails.isApproved;
        }

        if (data.vendor) {
          this.Vendor = data.vendor;
          this.VendorName = data.vendor.name;
        }

        if (data.vendorOrderDetails.invoiceNumber.length !== 0) this.isDisabled = true;
        else this.isDisabled = false;
      }  
    );
  }
  
  finalPriceChange(amount) {
   
    this.FinalAmount = amount;
  }

  openDialog(){
    if(this.ChallanImageUrl==""){
      showMessage(this.snackBar, 2, "Sorry, No Image Found","warn");
      return;
    }
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.ChallanImageUrl;
    dialogConfig.panelClass = "dialog-notification-image";
    const dialogRef = this.dialog.open(ImageDialogComponent, dialogConfig);
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/Admin/Notifications"]);

  }

  Reject(){
    this.vendorService.rejectOrder(this.orderId).subscribe(
      data=>{
        if (data.status == "Success") {
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
   
    if(this.itemquantityprice[this.itemquantityprice.length-1].item.id==null||
      this.itemquantityprice[this.itemquantityprice.length-1].quantity==0||
      this.itemquantityprice[this.itemquantityprice.length-1].totalPrice==0)
      {
        showMessage(this.snackBar, 2, "Please make sure you have filled all the items details", "warn");
      }
      else
      {
      
    // if (this.InvoiceNo.length !== 0) {
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
            if (this.isSuperAdmin()) {
              showMessage(this.snackBar, 2, "Order Approved", "success");
            } else {
              showMessage(this.snackBar, 2, "Order is Edited", "success");
            }
            this.reloadComponent();
          }
          else {
            showMessage(this.snackBar, 2, "Something went wrong!", "warn");
          }
        },
      );
    // }
    // else {
    //   showMessage(this.snackBar, 2, "Please fill the InvoiceNo first", "warn");
    // }
  }
}

  isSuperAdmin(): boolean {
    return (this.centralizedService.getUser().role.id === 4);
  }

  isApprovedAndCannotEdit(): boolean {
    if (this.isSuperAdmin()) {
      return this.IsApproved;
    }
    else { 
      return (!this.canEdit || this.IsApproved);
    }
  }
}


