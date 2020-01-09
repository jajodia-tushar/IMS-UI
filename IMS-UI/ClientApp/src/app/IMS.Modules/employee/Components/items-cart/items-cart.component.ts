import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, HostBinding } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/IMS.Models/CartItem';
import { EmployeeOrderService } from 'src/app/IMS.Services/employee/employee-order.service';
import { EmployeeOrderData } from 'src/app/IMS.Models/Employee/EmployeeOrderData';
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import { MatSnackBar, getMatInputUnsupportedTypeError, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { EmployeeOrderResponse } from 'src/app/IMS.Models/Employee/EmployeeOrderResponse';
import { publishLast } from 'rxjs/operators';

import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { OrderSuccessComponent } from '../order-success/order-success.component';

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit { 

  displayedColumns: string[] = ['position', 'name', 'Quantity', 'Symbol'];

ButtonName = 'Submit';
isSubmitted : boolean = false;
isPoppedUp : boolean = false;
dialogRef : MatDialogRef<OrderSuccessComponent>;
constructor(private employeeOrderService: EmployeeOrderService,
  private centralizedRepo : CentralizedDataService,
  private router: Router, 
  private snackBar: MatSnackBar,
  private dialog : MatDialog) {}

durationInSeconds = 5;

@Input() 
selectedItems: CartItem[];

@Output()
onCartItemDeleted: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

ngOnInit() {

}
onCancel() {
  if (!this.isSubmitted) {
    this.selectedItems = [];
    this.onCartItemDeleted.emit([]);
  }
}

onMakingOrder() {
  if(this.isSubmitted == true){
    return;
  }
  
  this.isSubmitted = true;
  let employeeOrderData: EmployeeOrderData = this.prepareOrderData();
  this.employeeOrderService.postOrderData(employeeOrderData)
  .subscribe(employeeOrderRes  => {
    if(employeeOrderRes.status == "Success"){
      if (!this.isPoppedUp) {
        let dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.panelClass = 'dialog-order-success';
        dialogConfig.autoFocus = true;
        let dialogRef = this.dialog.open(OrderSuccessComponent, dialogConfig);

        setTimeout(() => {
          dialogRef.close();
          this.router.navigateByUrl('/Shelf');
        }, 5000);
      }
      // showMessage(this.snackBar, 2,"Please Collect The Items", "success");
    }
    else{
      this.isSubmitted = false;
      this.ButtonName="Submit"
      showMessage(this.snackBar, 2, "Something Went Wrong", "warn");
    }
  });
  // this.ButtonName="Try Again";
}

prepareOrderData() {
  this.ButtonName=""
  let orderDataObj: EmployeeOrderData = {
    employee: {
      id: this.centralizedRepo.getEmployee().id.toString(),
    },
    employeeOrderDetails: {
      shelf: this.centralizedRepo.getShelf(),
      employeeItemsQuantityList : []
    }
  }
  this.selectedItems.forEach( obj => {
    orderDataObj.employeeOrderDetails.employeeItemsQuantityList.push(obj);
  });
  return orderDataObj;
}

@HostBinding('style.display') display: string;

ngOnChanges(changes: SimpleChanges): void {
  let lengthOfArray = changes.selectedItems.currentValue.length;
  if (lengthOfArray >= 1) {
    this.display = 'block';
  }
  else {
    this.display = 'none';
  }
}

delete(element) {
  if (!this.isSubmitted) {
    this.selectedItems = JSON.parse(JSON.stringify(this.selectedItems.filter(obj => {
      return obj != element;
    })));
    this.onCartItemDeleted.emit(this.selectedItems);
  }
}

plus(element) {
  if (!this.isSubmitted) {
    this.selectedItems.forEach(obj => {
      if (obj == element) {
        if (element.quantity < obj.item.maxLimit) {
          obj.quantity++;
        } else {
          showMessage(this.snackBar, 2, `You cannot add more than ${obj.item.maxLimit} "${obj.item.name}"`, "warn");
        }
      }
    });
  }
}

minus(element) {
  if (!this.isSubmitted) {
    this.selectedItems.forEach(obj => {
      if (obj == element) {
        if (element.quantity > 0) {
          obj.quantity--; 
          if (obj.quantity == 0) {
            this.delete(element);
            showMessage(this.snackBar, 2, `"${obj.item.name}" is removed from your cart`, "message");
          }
        } /* else {
          this.showMessage(1, `You cannot add "${obj.item.name}" more than ${obj.item.maxLimit}`);
        } */
      }
    });
  }
}

}

