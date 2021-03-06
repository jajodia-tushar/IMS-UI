import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { Router } from '@angular/router';
import { BulkRequest, BulkOrderItemQuantityMapping, EmployeeBulkOrderDetails } from 'src/app/IMS.Models/Employee/BulkRequest';
import { OrderSuccessComponent } from '../order-success/order-success.component';
import { OrderSuccessDetails } from 'src/app/IMS.Models/Shared/OrderMeesage';
import { EmployeeOrderService } from 'src/app/IMS.Services/employee/employee-order.service';

@Component({
  selector: 'app-bulk-request',
  templateUrl: './bulk-request.component.html',
  styleUrls: ['./bulk-request.component.css']
})
export class BulkRequestComponent implements OnInit {
  private navigationKeys = [
    'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End', 'ArrowLeft',
    'ArrowRight', 'Clear', 'Copy', 'Paste'
  ];
  today: Date = new Date();
  minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 2);
  employeeID: string;
  displayedColumns: string[] = ['itemName', 'requestQuantity', 'action'];
  Items: Item[] = [];
  date: Date;
  reason: string;
  buttonName: string = "Submit";

  orderSuccessDetails: OrderSuccessDetails = new OrderSuccessDetails;

  bulkRequest: BulkRequest = new BulkRequest();

  dataSource: MatTableDataSource<BulkOrderItemQuantityMapping>;
  dataSourceItems: BulkOrderItemQuantityMapping[] = [];

  constructor(public dialogRef: MatDialogRef<BulkRequestComponent>,
    private snackBar: MatSnackBar, private router: Router,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: Employee,
    private itemService: ItemService, private employeeOrderService: EmployeeOrderService) {
    this.employeeID = datas.id;
  }

  validForm() {
    let errorRowIndex = this.rowValidation();
    if (this.date == null || this.reason == null)
      return false;
    if (this.dataSourceItems.length == 0)
      return false;
    if (errorRowIndex == -1)
      return true;
    if (errorRowIndex < this.dataSourceItems.length)
      return false;
    return true;
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

    this.orderSuccessDetails.imageUrl = "../../../../../assets/accept.svg";
    this.orderSuccessDetails.greetingText = "Request Sent";
    this.orderSuccessDetails.message = "Your request has been sent and is waiting for approval";
    this.orderSuccessDetails.notification = "You will be notified once your order is approved";
    let itemData: BulkOrderItemQuantityMapping = {
      item: { id: 1, name: "", maxLimit: 0, isActive: true, imageUrl: "", rate: 0 },
      quantityOrdered: 0,
      quantityUsed: 0
    };
    this.dataSource.data.push(itemData);
  }

  createRequest() {
    this.bulkRequest.employee = new Employee();
    this.bulkRequest.employee.id = this.employeeID;

    this.bulkRequest.employeeBulkOrderDetails = new EmployeeBulkOrderDetails();

    let utcDate = Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    this.bulkRequest.employeeBulkOrderDetails.createdOn = new Date(utcDate);

    utcDate = Date.UTC(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    this.bulkRequest.employeeBulkOrderDetails.requirementDate = new Date(utcDate);

    this.bulkRequest.employeeBulkOrderDetails.reasonForRequirement = this.reason;
    this.bulkRequest.employeeBulkOrderDetails.bulkOrderRequestStatus = "Pending";
    this.bulkRequest.employeeBulkOrderDetails.itemsQuantityList = [];
    this.dataSourceItems.forEach(x => {
      this.bulkRequest.employeeBulkOrderDetails.itemsQuantityList.push(x)
    });
  }

  Send() {
    this.buttonName = "";
    let errorRowIndex = this.rowValidation();
    if (errorRowIndex === -1) {
      this.createRequest();

      this.employeeOrderService.placeBulkOrder(this.bulkRequest).subscribe(
        data => {
          if (data.status == "Success") {
            let dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.panelClass = 'dialog-order-success';
            dialogConfig.autoFocus = true;
            dialogConfig.data = this.orderSuccessDetails;
            let dialogRef = this.dialog.open(OrderSuccessComponent, dialogConfig);
            setTimeout(() => {
              dialogRef.close();
              this.router.navigateByUrl('/Shelf');
            }, 5000);
          }
          else
            this.handleErrorInConnection(data.error.errorMessage);
          this.buttonName = "Submit"
          this.dialogRef.close();
        },
        error => {
          this.handleErrorInConnection();
        });
    }
    else {
      this.buttonName = "Submit";
      if (this.dataSourceItems[errorRowIndex].item.name == "")
        showMessage(this.snackBar, 5, "Item In Row " + (errorRowIndex + 1) + " Is Not Selected", "warn");
      else if (this.dataSourceItems[errorRowIndex].quantityOrdered == 0)
        showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " should be greater than 0", "warn");
    }
  }


  handleErrorInConnection(message?: string) {
    let errorMessage: string;
    if (message == null || message == "")
      errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
    else
      errorMessage = JSON.parse(JSON.stringify(message));
    showMessage(this.snackBar, 5, errorMessage);
  }

  CancelRequest() {
    this.dialogRef.close();
  }

  AddRow() {
    let errorRowIndex = this.rowValidation();
    if (errorRowIndex === -1) {
      let itemData: BulkOrderItemQuantityMapping = {
        item: { id: 1, name: "", maxLimit: 0, isActive: true, imageUrl: "", rate: 0 },
        quantityOrdered: 0,
        quantityUsed: 0
      };
      this.dataSourceItems.unshift(itemData);
      this.renderTable();
    }
    else {
      if (this.dataSourceItems[errorRowIndex].item.name == "")
        showMessage(this.snackBar, 5, "Item In Row " + (errorRowIndex + 1) + " Is Not Selected", "warn");
      else if (this.dataSourceItems[errorRowIndex].quantityOrdered == 0)
        showMessage(this.snackBar, 5, "Quantity of " + this.dataSourceItems[errorRowIndex].item.name + " should be greater than 0", "warn");
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
      return;
    }
    if (e.key === ' ' || isNaN(Number(e.key))) {
      return false;
    }
  }
}
