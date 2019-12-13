import { Component, OnInit } from '@angular/core';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { Router } from '@angular/router';
import { CartItem } from '../../../../IMS.Models/CartItem';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemService } from 'src/app/IMS.Services/item/item.service';

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

  constructor(private centralizedRepo: CentralizedDataService, private router: Router,
    private itemService: ItemService) { }

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
    var obj = this.cartItems.find(obj => {
      return obj.item.id == event.id;
    });

    if (obj == null) {
      this.cartItems.push({
        item: event,
        quantity: 1
      });
    }
    else {
      if (obj.quantity < obj.item.maxLimit) {
        obj.quantity += 1;
      }
      else {
        alert(`You cannot add ${obj.item.name} more than ${obj.item.maxLimit}`);
      }
    }
    this.cartItems = JSON.parse(JSON.stringify(this.cartItems));
  }
}
