import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, HostBinding } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/centralized-data.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/IMS.Models/CartItem';
import { EmployeeOrderService } from 'src/app/IMS.Services/employee-order.service';
import { EmployeeOrderData } from 'src/app/IMS.Models/EmployeeOrderData';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { EmployeeOrderResponse } from 'src/app/IMS.Models/EmployeeOrderResponse';

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {displayedColumns: string[] = ['position', 'name', 'Quantity', 'Symbol'];

ButtonName = 'Submit';

constructor(private employeeOrderService: EmployeeOrderService,private centralizedRepo : CentralizedDataService,
  private router: Router, private _snackBar: MatSnackBar) {

 }

 durationInSeconds = 5;

@Input() 
selectedItems: CartItem[];

@Output()
onCartItemDeleted: EventEmitter<CartItem[]> = new EventEmitter<CartItem[]>();

ngOnInit() {

}
onCancel() {
  this.selectedItems = [];
  this.onCartItemDeleted.emit([]);
}

onMakingOrder() {
  let employeeOrderData: EmployeeOrderData = this.prepareOrderData();
  this.employeeOrderService.postOrderData(employeeOrderData)
  .subscribe(employeeOrderRes  => {
    if(employeeOrderRes.status == "Success"){
      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: this.durationInSeconds * 1000,
      });
      this.router.navigateByUrl('/Shelf');
    }
    else{
      this.ButtonName="Submit"
      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  });
}

prepareOrderData() {
  this.ButtonName=""
  let orderDataObj: EmployeeOrderData = {
    employee: {
      id: this.centralizedRepo.getEmployee().id.toString(),
    },
    employeeOrder: {
      shelf: this.centralizedRepo.getShelf(),
      employeeItemsQuantityList : []
    }
  }
  this.selectedItems.forEach( obj => {
    orderDataObj.employeeOrder.employeeItemsQuantityList.push(obj);
  });
  return orderDataObj;
}

@HostBinding('style.display') display: string;

ngOnChanges(changes: SimpleChanges): void {
  let lengthOfArray = changes.selectedItems.currentValue.length;
  console.log(lengthOfArray);
  if (lengthOfArray >= 1) {
    this.display = 'block';
  }
  else {
    this.display = 'none';
  }
}

delete(element) {
  this.selectedItems = JSON.parse(JSON.stringify(this.selectedItems.filter(obj => {
    return obj != element;
  })));
  this.onCartItemDeleted.emit(this.selectedItems);
}

}
