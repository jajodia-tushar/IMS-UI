import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { Router } from '@angular/router';
import { CartItem } from '../../../../IMS.Models/CartItem';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { SnackbarComponent } from 'src/app/IMS.Modules/shared/snackbar/snackbar.component';

import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { BulkRequestComponent } from '../bulk-request/bulk-request.component';


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
    private itemService: ItemService,private snackBar : MatSnackBar, public dialog: MatDialog) { }


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
        showMessage(this.snackBar, 2, `You cannot add more than ${cartItem.item.maxLimit} "${cartItem.item.name}"`, "warn");
      }
    }
    this.cartItems = JSON.parse(JSON.stringify(this.cartItems));
  }

  addWidthStyle() {
    let style = {
      'width': (this.cartItems.length != 0) ? '50vw' : '100vw'
    };
    
    return style;
  }

  bulkRequest()  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "auto";
    dialogConfig.height = "auto";
    dialogConfig.panelClass = 'dialog-bulk-request';
    dialogConfig.data = this.employee.id;
    dialogConfig.autoFocus = true;
    let dialogRef = this.dialog.open(BulkRequestComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }
}
