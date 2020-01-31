import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrls: ['./bulk-order.component.css']
})
export class BulkOrderComponent implements OnInit {

  listOfFieldToBeDisplayed : FieldToBeDisplayed[] = [];
  dataSource = [];
  displayedColumns = ["itemName","itemQuantity","action"];
  
  numberOfColumns() {
    return (this.displayedColumns.length - 1);
  }
  
  constructor() { 

    let x : FieldToBeDisplayed = {
      fieldName : "Requested By",
      fieldValue : "Shirin"
    }

    let y : FieldToBeDisplayed = {
      fieldName : "Requested on",
      fieldValue : "Today"
    }

    let z : TableData = {
        itemName : "Pen",
        itemQuantity : 500
    }


    this.listOfFieldToBeDisplayed.push(x);
    this.listOfFieldToBeDisplayed.push(y);
    this.listOfFieldToBeDisplayed.push(y);
    this.listOfFieldToBeDisplayed.push(y);
    this.listOfFieldToBeDisplayed.push(y);

    this.dataSource.push(z);
    this.dataSource.push(z);
    this.dataSource.push(z);
    this.dataSource.push(z);
    this.dataSource.push(z);

    
  }

  ngOnInit() {
  }



}


export class FieldToBeDisplayed{
  fieldName : string;
  fieldValue : string;
}

export class TableData{
  itemName : string;
  itemQuantity : number;
}
