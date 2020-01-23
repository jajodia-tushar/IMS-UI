import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { Router } from '@angular/router';
import { ItemQuantityMapping } from 'src/app/IMS.Models/Item/ItemQuantityMapping';
import { StoreService } from 'src/app/IMS.Services/admin/store.service';
import { BulkRequestService } from 'src/app/IMS.Services/employee/bulk-request.service';
import { BulkRequest, BulkOrderItemQuantityMapping, EmployeeBulkOrderDetails } from 'src/app/IMS.Models/Employee/BulkRequest';
import { readSync } from 'fs';

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

  bulkRequest: BulkRequest = new BulkRequest();

  dataSource: MatTableDataSource<BulkOrderItemQuantityMapping>;
  dataSourceItems: BulkOrderItemQuantityMapping[] = [];

  constructor(public dialogRef: MatDialogRef<BulkRequestComponent>, 
    private snackBar: MatSnackBar, private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: Employee, 
    private itemService: ItemService, private bulkRequestService: BulkRequestService) {
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
    this.itemService.getAllItems().subscribe(
      data => {
        this.Items = data.items;
      }
    )
    this.renderTable();
  }

  reloadComponent()  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => true;
  }

  Send() {
    console.log("request sent");
    console.log(this.today);
    console.log(this.date);
    console.log(this.reason);
    console.log(this.dataSourceItems);
    this.bulkRequest.employee = new Employee();
    this.bulkRequest.employee.id = this.employeeID;
    this.bulkRequest.employeeBulkOrderDetails = new EmployeeBulkOrderDetails();
    this.bulkRequest.employeeBulkOrderDetails.createdOn = this.today;
    this.bulkRequest.employeeBulkOrderDetails.requirementDate = this.date;
    this.bulkRequest.employeeBulkOrderDetails.reasonForRequirement = this.reason;
    this.bulkRequest.employeeBulkOrderDetails.bulkOrderRequestStatus = "Pending";
    this.bulkRequest.employeeBulkOrderDetails.itemsQuantityList = [];
    this.dataSourceItems.forEach(x => {
      this.bulkRequest.employeeBulkOrderDetails.itemsQuantityList.push(x)
    });
    console.log(this.bulkRequest);
    this.bulkRequestService.placeOrder(this.bulkRequest).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
      }
    );
  }

  CancelRequest() {
    console.log("Request canceled");
    this.dialogRef.close();
  }

  AddRow() {
    let lastIndex = this.dataSourceItems.length - 1;
    let errorRowIndex = this.rowValidation();
    if (errorRowIndex === -1) {
      let itemData: BulkOrderItemQuantityMapping = {
        item: { id: 1, name: "",  maxLimit: 0, isActive: true, imageUrl: "", rate: 0},
        quantityOrdered: 0,
        quantityUsed: 0
      };
      this.dataSourceItems.unshift(itemData);
      this.renderTable();
    }
    else {
      if (this.dataSourceItems[errorRowIndex].item.name == null)
        showMessage(this.snackBar, 5, "Item In Row " + (errorRowIndex + 1) + " Is Not Selected", "warn");
      else if (this.dataSourceItems[errorRowIndex].quantityOrdered == 0)
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
        else if (!this.dataSourceItems[i].quantityOrdered)
          return i
        else if (this.dataSourceItems[i].quantityOrdered == 0)
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

  changeDateFormat(inputFormat: string): string{
    if (inputFormat == null || inputFormat == "")
      return "";
    let inputDate: Date = new Date(Date.parse(inputFormat));
    return `${inputDate.getFullYear()}${("0" + (inputDate.getMonth() + 1))
      .slice(-2)}${("0" + inputDate.getDate()).slice(-2)}`
  }

}
