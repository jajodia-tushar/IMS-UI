import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { Router } from '@angular/router';
import { ItemQuantityMapping } from 'src/app/IMS.Models/Item/ItemQuantityMapping';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';

@Component({
  selector: 'app-bulk-request',
  templateUrl: './bulk-request.component.html',
  styleUrls: ['./bulk-request.component.css']
})
export class BulkRequestComponent implements OnInit {
  private navigationKeys = [
    'Backspace', 'Delete', 'Tab','Escape', 'Enter', 'Home', 'End', 'ArrowLeft',
    'ArrowRight', 'Clear', 'Copy', 'Paste'
  ];
  today: Date = new Date();
  minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()+2);  
  employeeID: string;
  displayedColumns: string[] = ['itemName', 'requestQuantity', 'action'];
  Items: Item[] = [];
  date: Date;
  reason: string;

  dataSource: MatTableDataSource<ItemQuantityMapping>;
  dataSourceItems: ItemQuantityMapping[] = [];

  constructor(public dialogRef: MatDialogRef<BulkRequestComponent>, 
    private snackBar: MatSnackBar, private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: Employee, 
    private storeService: StoreService) {
    this.employeeID = datas.id;
  }

  DeleteRow(row_obj) {
    let index = this.dataSourceItems.indexOf(row_obj);
    if (index != -1) {
      this.dataSourceItems.splice(index, 1);
      this.renderTable();
    }
  }

  ngOnInit() {
    this.storeService.getAdminStoreStatus(1, 9999).subscribe(
      data => {
        let stockList = data.stockStatusList;
        stockList.forEach(x => {
          let itemData = new ItemQuantityMapping();
          itemData.item = x.item;
          itemData.availableQuantity = x.storeStatus[0].quantity;
          this.dataSourceItems.push(itemData);
        })
      }
    )
    //this.Items = this.MockItems.slice();
    this.renderTable();
  }

  reloadComponent()  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  Send() {
    console.log("request sent");
    console.log(this.date);
    console.log(this.reason);
    console.log(this.dataSource);



    let errorRowIndex = this.rowValidation();

    if (this.dataSourceItems.length == 0)  {
      this.reloadComponent();
      showMessage(this.snackBar, 5, "No Items Are Added In Item Details ", "warn");
    }
    else {
      if (this.dataSourceItems[errorRowIndex].item.name == null)
        showMessage(this.snackBar, 5, "Item In Row " + (errorRowIndex + 1) + " Is Not Selected", "warn");
      else if (!this.dataSourceItems[errorRowIndex].availableQuantity)
        showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Is Not Filled", "warn");
      else if (this.dataSourceItems[errorRowIndex].availableQuantity == 0)
        showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Should Be Greater Than 0", "warn");
    }
    this.dialogRef.close();
  }

  CancelRequest() {
    console.log("Request canceled");
    this.dialogRef.close();
  }

  AddRow() {
    let lastIndex = this.dataSourceItems.length - 1;
    let errorRowIndex = this.rowValidation();
    if (errorRowIndex === -1) {
      let itemData: ItemQuantityMapping = {
        item: { id: 1, name: "",  maxLimit: 0, isActive: true, imageUrl: "", rate: 0},
        availableQuantity: 0
      };
      this.dataSourceItems.unshift(itemData);
      this.renderTable();
    }
    else {
      if (this.dataSourceItems[errorRowIndex].item.name == null)
        showMessage(this.snackBar, 5, "Item In Row " + (errorRowIndex + 1) + " Is Not Selected", "warn");
      else if (!this.dataSourceItems[errorRowIndex].availableQuantity)
        showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " Is Not Filled", "warn");
    }
  }

  isItemAlreadySelected(item: Item) {
    return this.dataSourceItems.find(i => i.item.name == item.name) != null;
  }

  rowValidation() {
    if (this.dataSourceItems.length > 0) {
      for (let i = 0; i < this.dataSourceItems.length; i++) {
        if (this.dataSourceItems[i].item.name == null)
          return i;
        else if (!this.dataSourceItems[i].availableQuantity)
          return i
        else if (this.dataSourceItems[i].availableQuantity == 0)
          return i;
      }
      return -1;
    }
    else
      return -1;
  }

  renderTable() {
    this.dataSource = new MatTableDataSource(this.dataSourceItems);
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

}
