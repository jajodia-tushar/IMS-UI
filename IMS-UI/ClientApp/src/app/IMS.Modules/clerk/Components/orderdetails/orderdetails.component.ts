import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { OrderDetails } from 'src/app/IMS.Models/Vendor/OrderDetails';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';

interface DATASOURCE_ITEM {
  Item: Item;
  Quantity: number;
}

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  displayedColumns: string[] = ['Item Name', 'Quantity', 'action'];
  datasource: MatTableDataSource<ItemQuantityPriceMapping>;
  dataSourceItems: ItemQuantityPriceMapping[] = [];
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
  constructor(private _ItemService: ItemService, private _CentralizedDataService: CentralizedDataService) { }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  filterItemsByKey(value: string)
  {
    if (value == null)
    {
      value = '';
    }
    const filterValue = value.toLowerCase();
    this.filteredItems = this.itemNames.filter(name => name.toLowerCase().includes(filterValue));
  }


  //isItemAlreadySelected(item: string) {
  //  return this.dataSourceItems.find(i => i.Item.name == item) != null;
  //}


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
      console.log(this.dataSourceItems)
    }
    else
      console.log("fill completely")

  }
  ngDoCheck() {
    this.orderDetails = this._CentralizedDataService.getSiblingData();
    
  }

  ngOnInit() {
    this.Items = this.MockItems.slice();
    this.Items.forEach(item => {
      this.itemNames.push(item.name);
    });
    this.filteredItems = this.itemNames.slice();
    this.renderTable();
    //this._ItemService.getAllItems().subscribe(
    //  data => {
    //    console.log(data);
        
    //    this.Items = data.items;
    //  }
    //)
  }

}
