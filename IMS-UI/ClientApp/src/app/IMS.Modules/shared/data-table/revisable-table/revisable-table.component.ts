import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { OrderItemDetail } from 'src/app/IMS.Models/Vendor/OrderItemDetail';

@Component({
  selector: 'app-revisable-table',
  templateUrl: './revisable-table.component.html',
  styleUrls: ['./revisable-table.component.css']
})
export class RevisableTableComponent implements OnInit {

  displayedColumns;
 public datasource = new MatTableDataSource<OrderItemDetail>();
 
  @Input() columnHeader;
  @Input() show;
    aloo: any;
  @Input() set griddata(data){
    this.datasource= new MatTableDataSource(data);
  }
  @Input() ItemList;
 
  //@Output() griddataChange: EventEmitter<any> = new EventEmitter();
  @Output() selectedEditRow: EventEmitter<any> = new EventEmitter();


  

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
    //this.ChangeIngridDataValue();
    this.editAction(this.datasource.data);
    
  }
  editAction(data: any): void {
    this.selectedEditRow.next(data);
  }
  //ChangeIngridDataValue() {
   
  //  this.griddata(this.datasource.data);
  //  this.griddataChange.emit(this.griddata);
    
  //}

  changeprice(row,event){
     console.log(row);
     row.totalPrice=  +(<HTMLInputElement>event.target).value;
     this.renderTable();
     
   }

   changequantity(row,event){
    
    row.quantity= +(<HTMLInputElement>event.target).value;
    this.renderTable();
   }

 
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
     
     
   }



getTotalCost(){
  let totalcost;
 
   totalcost=this.datasource.data.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  console.log(totalcost);
  return totalcost;
  }


  getTotalQuantity() {
    
    return this.datasource.data.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
    
  }
  ngOnInit() {
    this.displayedColumns= this.columnHeader.map(c => c.columnDef)
    console.log(this.datasource.data);
  }

  ngAfterViewInit(){  
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
    
  } 


}

