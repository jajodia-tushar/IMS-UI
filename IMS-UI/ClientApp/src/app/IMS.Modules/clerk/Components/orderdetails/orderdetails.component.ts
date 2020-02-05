import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { OrderDetails } from 'src/app/IMS.Models/Vendor/OrderDetails';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { showMessage } from "src/app/IMS.Modules/shared/utils/snackbar";

interface FileUrl {
  locationUrl: string;
}

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];

  imageUploaded: boolean = false;
  public buttonName="Submit"
  public canLoad = false;
  displayedColumns: string[] = ['ItemName', 'Quantity', 'action'];
  ItemControl = new FormControl('', [Validators.required]);
  public selectedFile = null;
  public datasource: MatTableDataSource<ItemQuantityPriceMapping>;
  public dataSourceItems: ItemQuantityPriceMapping[] = [];
  public vendorOrder: VendorOrder = {
    vendor: null,
    vendorOrderDetails: {
      challanNumber: "",
      orderId: 0,
      isApproved: false,
      recievedBy: "",
      submittedTo: "",
      challanImageUrl: "",
      date: null,
      finalAmount: 0,
      invoiceImageUrl: null,
      invoiceNumber: null,
      orderItemDetails: null,
      taxableAmount: 0
    }
  };

  public orderDetails: OrderDetails = {
    challanNumber: "",
    vendor: null,
    submitedTo: "",
    receivedBy: ""
  };
  public MockItems: Item[] = [
    {
      id: 1,
      name: "Black Marker",
      maxLimit: 5,
      isActive: true,
      imageUrl: "jksdfnsdjkf",
      rate: 5.0
    },
    {
      id: 2,
      name: "pen",
      maxLimit: 5,
      isActive: true,
      imageUrl: "abcdefef",
      rate: 5.0
    },
    {
      id: 3,
      name: "Blue Marker",
      maxLimit: 5,
      isActive: true,
      imageUrl: "abcklkjdef",
      rate: 5.0
    }
  ];
  
  itemNames: string[] = []
  public Items: Item[];
  filteredItems: string[];
  public dialog = false;
  public fileToUpload: File;
  
  constructor(private _ItemService: ItemService, private _CentralizedDataService: CentralizedDataService, private router:Router,
    private snackBar: MatSnackBar, private http: HttpClient, private _VendorSerice: VendorService) { }
 
 
  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/Clerk"]);
  }
  uploadImage(file) {
    var _validFileTypes = ["image/jpg", "image/jpeg", "image/bmp", "image/png"]
    if (file.length === 0) {
      return;
    }
    if (_validFileTypes.indexOf(file[0].type) !== -1) {
      this.fileToUpload = <File>file[0];
      showMessage(this.snackBar, 5, "you have selected " + this.fileToUpload.name, "success");

    }
    else {
      this.fileToUpload = null
      showMessage(this.snackBar, 5, "only images are allowed", "warn");
    }

  }

  isItemAlreadySelected(item: Item) {
    return this.dataSourceItems.find(i => i.item.name == item.name) != null;
  }
  rowValidation() {
    if (this.dataSourceItems.length > 0) {
      for (let i = 0; i < this.dataSourceItems.length; i++) {
        if (this.dataSourceItems[i].item.id == null)
          return i;
        else if (!this.dataSourceItems[i].quantity)
          return i
        else if (this.dataSourceItems[i].quantity == 0)
          return i;
      }
      return -1;
    }
    else
      return -1;    
  }

  AddRow() {
    let lastIndex = this.dataSourceItems.length - 1;
    let errorRowIndex = this.rowValidation();
    if (errorRowIndex === -1) {
      let itemData: ItemQuantityPriceMapping = {
        item: { id: null, name: "", maxLimit: 0, isActive: false, imageUrl: "", rate: 0 },
        quantity: 0,
        totalPrice: 0
      };
      this.dataSourceItems.unshift(itemData);
      this.renderTable();
    }
    else {
      if (this.dataSourceItems[errorRowIndex].item.id == null)
        showMessage(this.snackBar,5,"Item In Row " + (errorRowIndex + 1) + " Is Not Selected","warn");
      else if (!this.dataSourceItems[errorRowIndex].quantity)
        showMessage(this.snackBar,5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Is Not Filled","warn");
      else if (this.dataSourceItems[errorRowIndex].quantity == 0)
        showMessage(this.snackBar,5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Should Be Greater Than 0","warn");
    }   
  }

  allowOnlyDigits(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true)  // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      return false;
    }
  }

  renderTable() {
    this.datasource = new MatTableDataSource(this.dataSourceItems);
  }
 
  DeleteRow(row_obj) {
    let index = this.dataSourceItems.indexOf(row_obj);
    if (index != -1) {
      this.dataSourceItems.splice(index, 1);
      this.renderTable();
    }
  }
  
    
  onSubmit() {
    this.canLoad = true;
    this.buttonName = " ";
    let errorRowIndex = this.rowValidation();
    if (this.orderDetails) {
      if (errorRowIndex === -1 && this.dataSourceItems.length > 0) {
        this.vendorOrder.vendorOrderDetails.challanNumber = this.orderDetails.challanNumber;
        this.vendorOrder.vendorOrderDetails.orderItemDetails = this.dataSourceItems;
        this.vendorOrder.vendorOrderDetails.recievedBy = this.orderDetails.receivedBy;
        this.vendorOrder.vendorOrderDetails.submittedTo = this.orderDetails.submitedTo;
        this.vendorOrder.vendorOrderDetails.date = new Date();
        this.vendorOrder.vendor = this.orderDetails.vendor;
        if (this.fileToUpload) {
          const formData = new FormData();
          formData.append('file', this.fileToUpload, this.fileToUpload.name);
          this.http.post<FileUrl>('/api/FileUpload', formData).subscribe(
            data => {
              this.vendorOrder.vendorOrderDetails.challanImageUrl = data.locationUrl;
              this._VendorSerice.postVendorOrder(this.vendorOrder).subscribe(
                data => {
                  this.orderDetails = null;
                  this._CentralizedDataService.setSiblingData(this.orderDetails)
                  this.reloadComponent();
                  showMessage(this.snackBar, 5, "Order Is Placed", "success");
                },
                error => {
                  showMessage(this.snackBar, 5, error.errorMessage, "warn");
                }
              )
              // showMessage(this.snackBar,5, "image is uploaded","success");
              this.imageUploaded = true;
            }
          );
        }
        else {
          this._VendorSerice.postVendorOrder(this.vendorOrder).subscribe(
            data => {
              this.orderDetails = null;
              this._CentralizedDataService.setSiblingData(this.orderDetails)
              this.reloadComponent();
              showMessage(this.snackBar, 5, "Order Is Placed", "success");
            },
            error => {
              showMessage(this.snackBar, 5, error.errorMessage, "warn");
            }
          )

        }
        
        
      }
      else {
        this.canLoad = false;
        this.buttonName = "Submit";
        if (this.dataSourceItems.length == 0)
          showMessage(this.snackBar,5, "No Items Are Added In Item Details ","warn");
        else {
          if (this.dataSourceItems[errorRowIndex].item.id == null)
            showMessage(this.snackBar, 5, "Item In Row " + (errorRowIndex + 1) + " Is Not Selected", "warn");
          else if (!this.dataSourceItems[errorRowIndex].quantity)
            showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Is Not Filled", "warn");
          else if (this.dataSourceItems[errorRowIndex].quantity == 0)
            showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Should Be Greater Than 0", "warn");
        }
      }
    }
    else {
      this.canLoad = false;
      this.buttonName = "Submit";
      showMessage(this.snackBar,5, "Some Fields In Invoice Are Empty","warn");
    }
  }
  ngDoCheck() {
    
    this.orderDetails = this._CentralizedDataService.getSiblingData();    
  }

  ngOnInit() {  
    this._ItemService.getAllItems().subscribe(
      data => {
        this.Items = data.items;
      }
    )
    //this.Items = this.MockItems.slice();
    this.renderTable();
  }

}
