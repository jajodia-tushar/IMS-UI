import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { OrderDetails } from 'src/app/IMS.Models/Vendor/OrderDetails';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import { HttpClient } from '@angular/common/http';
import { VendorOrderDetails } from 'src/app/IMS.Models/Vendor/VendorOrderDetails';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';

interface DATASOURCE_ITEM {
  Item: Item;
  Quantity: number;
}

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
  displayedColumns: string[] = ['ItemName', 'Quantity', 'action'];
  public selectedFile = null;
  public datasource: MatTableDataSource<ItemQuantityPriceMapping>;
  public dataSourceItems: ItemQuantityPriceMapping[] = [];
  public vendorOrder: VendorOrder = {
    vendor: null,
    vendorOrderDetails: {
      challanNumber: "",
      orderId: null,
      isApproved: null,
      recievedBy: "",
      submittedTo: "",
      challanImageUrl: "",
      date: "",
      finalAmount: null,
      invoiceImageUrl: null,
      invoiceNumber: null,
      orderItemDetails: null,
      taxableAmount: null
    }
  };

  public orderDetails: OrderDetails = {
    challanNumber: "",
    vendor: null,
    submitedTo: "",
    receivedBy: "",
    date: null
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
  constructor(private _ItemService: ItemService, private _CentralizedDataService: CentralizedDataService,
    private snackBar: MatSnackBar, private http: HttpClient) { }

 
  uploadImage(file) {
    if (file.length === 0) {
      return;
    }
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log(formData);
    this.http.post<FileUrl>('/api/FileUpload', formData).subscribe(
      data => {
        this.vendorOrder.vendorOrderDetails.challanImageUrl = data.locationUrl;
        console.log(this.vendorOrder.vendorOrderDetails.challanImageUrl)
        console.log(data.locationUrl);
        console.log("sucessfully uploaded")
      },
      err => {
        console.log("fdf")
        console.log("error");
      }
    );

    
  }

  showMessage(time, message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000 * time, data: { message: message }
    });
  }

  //filterItemsByKey(value: string)
  //{
  //  if (value == null)
  //  {
  //    value = '';
  //  }
  //  const filterValue = value.toLowerCase();
  //  this.filteredItems = this.itemNames.filter(name => name.toLowerCase().includes(filterValue));
  //}


  isItemAlreadySelected(item: Item) {
    return this.dataSourceItems.find(i => i.item.name == item.name) != null;
  }


  selectionComplete(row: DATASOURCE_ITEM, itemName: string) {
    row.Item = this.Items.find(item => item.name == itemName);
    this.filteredItems = this.itemNames.slice();
  }

  AddRow() {
    let itemData: ItemQuantityPriceMapping = {
      item: { id: null, name: "", maxLimit: 0, isActive: false, imageUrl: "", rate: 0},
      quantity: 0,
      totalPrice:0
    };
    this.dataSourceItems.push(itemData);
    this.renderTable();
    console.log(this.dataSourceItems);
  }

  allowOnlyDigits(e: KeyboardEvent) {
    //let inputText = event.target.value;
    console.log(e);
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
      console.log(e.key);
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
    if (this.orderDetails) {
      console.log(this.orderDetails);
      console.log(this.dataSourceItems);
      this.vendorOrder.vendorOrderDetails.challanNumber = this.orderDetails.challanNumber;
      this.vendorOrder.vendorOrderDetails.date = this.orderDetails.date;
      this.vendorOrder.vendorOrderDetails.orderItemDetails = this.dataSourceItems;
      this.vendorOrder.vendorOrderDetails.recievedBy = this.orderDetails.receivedBy;
      this.vendorOrder.vendorOrderDetails.submittedTo = this.orderDetails.submitedTo;
      this.vendorOrder.vendor = this.orderDetails.vendor;
//      this.vendorOrder.vendorOrderDetails = this.vendorOrder;
      console.log(this.vendorOrder);
    }
    else {
      this.showMessage(5, "fill completely");
      console.log("fill completely");
    }
  }
  ngDoCheck() {
    this.orderDetails = this._CentralizedDataService.getSiblingData();
    
  }

  ngOnInit() {
    
    this._ItemService.getAllItems().subscribe(
      data => {
        console.log(data);
        
        this.Items = data.items;
      }
    )
    //this.Items = this.MockItems.slice();
    //this.Items.forEach(item => {
    //  this.itemNames.push(item.name);
    //});
    //this.filteredItems = this.itemNames.slice();
    this.renderTable();
  }

}
