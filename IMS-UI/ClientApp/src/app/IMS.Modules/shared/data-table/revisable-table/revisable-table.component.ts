import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-revisable-table',
  templateUrl: './revisable-table.component.html',
  styleUrls: ['./revisable-table.component.css']
})
export class RevisableTableComponent implements OnInit {

  displayedColumns;
  datasource = new MatTableDataSource();
 
  @Input() columnHeader;
  @Input() show;
  @Input() set griddata(data){
    this.datasource= new MatTableDataSource(data);
  }
  @Input() ItemList;
 
  @Output() deleteRow: EventEmitter<any> = new EventEmitter();


  //foods: Food[] = [
  //  {value: 'steak-0', viewValue: 'Steak'},
  //  {value: 'pizza-1', viewValue: 'Pizza'},
  //  {value: 'tacos-2', viewValue: 'Tacos'}
  //];
  // deletedata(data:any){
  //   let index = this.datasource.indexOf(data);
  //   if (index != -1) {
  //     this.datasource.splice(index, 1);
  //     this.renderTable();
  //   }
  // }

  // renderTable() {
  //   this.datasource = new MatTableDataSource(this.datasource);
  // }

  // deletedata(row:any):void {
  //   this.deleteRow.next(row);
  //  }

   deletedata(row:any){
     console.log(row);
    let index = this.datasource.data.indexOf(row);
    console.log(index);
    console.log(this.datasource.data);
    console.log(this.datasource);
    if (index != -1) {
      this.datasource.data.splice(index, 1);
      console.log(this.datasource.data);
      console.log(this.datasource);
      this.renderTable();
      
    }
  }

  renderTable() {
    
    this.datasource = new MatTableDataSource(this.datasource.data);
    
    console.log(this.datasource.data);
    
  }

  changeprice(row,event){
     console.log(row);
     row.totalPrice=  +(<HTMLInputElement>event.target).value;
     this.renderTable();
     
   }

   changequantity(row,event){
    
    row.quantity= +(<HTMLInputElement>event.target).value;
    this.renderTable();
   }

  //  AddRow() {
  //   let itemData: ItemQuantityPriceMapping = {
  //     item: { id: null, name: "", maxLimit: 0, isActive: false, imageUrl: "", rate: 0},
  //     quantity: 0,
  //     totalPrice:0
  //   };
  //   this.dataSourceItems.push(itemData);
  //   this.renderTable();
  //   console.log(this.dataSourceItems);
  // }
   AddRow(){
     let datasoucelength=this.datasource.data.length;
     console.log(datasoucelength);
    this.datasource.data[datasoucelength]={
        item: { id: null, name: "", maxLimit: 0, isActive: false, imageUrl: "", rate: 0},
           quantity: 0,
           totalPrice:0
         };
    this.renderTable();
   }

   selectedOption(row,event){
      console.log(row);
      console.log(row.item);
      console.log(row.item.name);
      console.log(event.value);
     row.item.name=event.value;
     this.renderTable();
     
     //console.log(event.value);
    // row.item.name=event.item.value;
    // row.item.name=
   }

//    selectedOption(event) {
//     const selectedValue = event.option.value;
//     console.log(selectedValue);
//  }

getTotalCost(){
  let totalcost;
 
   totalcost=this.datasource.data.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  console.log(totalcost);
  return totalcost;
}
  ngOnInit() {
    this.displayedColumns= this.columnHeader.map(c => c.columnDef)
    console.log(this.datasource.data);
  }

  ngAfterViewInit(){  
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
    
  } 


}

