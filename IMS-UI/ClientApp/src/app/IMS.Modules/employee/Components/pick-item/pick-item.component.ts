import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { Router } from '@angular/router';
import { CartItem } from '../../../../IMS.Models/CartItem';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';
import {showMessage} from 'src/app/IMS.Modules/shared/utils/snackbar'


@Component({
  selector: 'app-pick-item',
  templateUrl: './pick-item.component.html',
  styleUrls: ['./pick-item.component.css']
})
export class PickItemComponent implements OnInit {

  cartItems: CartItem[] = [];  // -- To be Set TBD
  shelfItems: Item[] = [];
  employee: Employee;
  name : string;
  searchText : string;

  constructor(private centralizedRepo: CentralizedDataService, private router: Router,
    private itemService: ItemService,private snackBar : MatSnackBar) { }


  searchBox() {
  }
   

  ngOnInit() {
    this.employee = this.centralizedRepo.getEmployee();
    if (this.employee == null) {
      this.router.navigateByUrl("employee");
      return;
    }

    this.name = this.centralizedRepo.getEmployee().firstname + " " + this.centralizedRepo.getEmployee().lastname;
    let floorCode: string = this.centralizedRepo.getShelf().code;
    this.itemService.getShelfData(floorCode).subscribe(shelfData => {
      shelfData.itemQuantityMappings.forEach(itemQuantityMapping => {
        this.shelfItems.push(itemQuantityMapping.item);
      });
      this.shelfItems = JSON.parse(JSON.stringify(this.shelfItems));
    });
  }

  onItemDeleted(event) {
    this.cartItems = JSON.parse(JSON.stringify(event));
  }

  onItemClicked(event: Item) {
    var cartItem = this.cartItems.find(obj => {
      return obj.item.id == event.id;
    });

    if (cartItem == null) {
      this.cartItems.push({
        item: event,
        quantity: 1
      });
    }
    else {
      if (cartItem.quantity < cartItem.item.maxLimit) {
        cartItem.quantity += 1;
      }
      else {
        showMessage(1,`You cannot add "${cartItem.item.name}" more than ${cartItem.item.maxLimit}`,"error",this.snackBar);
      }
    }
    this.cartItems = JSON.parse(JSON.stringify(this.cartItems));
  }

  // showMessage(time,message,type="message"){
  //   let extraClasses;
  //     if (type == 'error') {
  //    extraClasses = ['snackbar-background-red'];
  //  } else {
  //    extraClasses = ['snackbar-background-green'];
  //  }
  //   this.snackBar.openFromComponent(SnackbarComponent, {
  //     duration: 1000 * time ,
  //     panelClass : extraClasses,
  //     data : { message : message }
  //   });
  // }

  addWidthStyle() {
    let style = {
      'width': (this.cartItems.length != 0) ? '50vw' : '100vw'
    };
    
    return style;
  }

}
