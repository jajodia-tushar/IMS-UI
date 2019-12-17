import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, HostBinding } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/IMS.Models/CartItem';
import { EmployeeOrderService } from 'src/app/IMS.Services/employee/employee-order.service';
import { EmployeeOrderData } from 'src/app/IMS.Models/Employee/EmployeeOrderData';
import { SnackbarComponent } from '../../../shared/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { EmployeeOrderResponse } from 'src/app/IMS.Models/Employee/EmployeeOrderResponse';

@Component({
  selector: 'app-items-cart',
  templateUrl: './items-cart.component.html',
  styleUrls: ['./items-cart.component.css']
})
export class ItemsCartComponent implements OnInit {displayedColumns: string[] = ['position', 'name', 'Quantity', 'Symbol'];

ButtonName = 'Submit';

constructor(private employeeOrderService: EmployeeOrderService,private centralizedRepo : CentralizedDataService,
  private router: Router, private snackBar: MatSnackBar) {

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

      this.showMessage(2,"Please Collect The Items");
      this.router.navigateByUrl('/Shelf');
    
    }
    else{
      
      this.ButtonName="Submit"
      this.showMessage(3,"Something Went Wrong");
    
    }
  });
  // this.ButtonName="Try Again";

}

showMessage(time,message){
  this.snackBar.openFromComponent(SnackbarComponent, {
    duration: 1000 * time , data : { message : message }
  });
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
  this.selectedItems = JSON.parse(JSON.stringify(this.selectedItems.filter(obj => {
    return obj != element;
  })));
  this.onCartItemDeleted.emit(this.selectedItems);
}

}
