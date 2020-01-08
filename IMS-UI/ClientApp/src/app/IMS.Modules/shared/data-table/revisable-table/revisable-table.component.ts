import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { OrderItemDetail } from 'src/app/IMS.Models/Vendor/OrderItemDetail';

import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';

@Component({
  selector: 'app-revisable-table',
  templateUrl: './revisable-table.component.html',
  styleUrls: ['./revisable-table.component.css']
})
export class RevisableTableComponent implements OnInit {

  displayedColumns;
  public datasource = new MatTableDataSource<ItemQuantityPriceMapping>();
 
  @Input() columnHeader;
  @Input() show;
  aloo: any;
   public totalcost;
  @Input() set griddata(data){
    this.datasource= new MatTableDataSource(data);
  }
  @Input() ItemList;
 
  //@Output() griddataChange: EventEmitter<any> = new EventEmitter();
  @Output() selectedEditRow: EventEmitter<any> = new EventEmitter();
  @Output() ChangedFinalAmount: EventEmitter<any> = new EventEmitter<any>();


  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];

   deletedata(row:any){
     //console.log(row);
    let index = this.datasource.data.indexOf(row);
    //console.log(index);
    //console.log(this.datasource.data);
    //console.log(this.datasource);
    if (index != -1) {
      this.datasource.data.splice(index, 1);
      //console.log(this.datasource.data);
      //console.log(this.datasource);
      this.renderTable();
      
    }
  }

  renderTable() {
    
    this.datasource = new MatTableDataSource(this.datasource.data);
   
    
    this.editAction(this.datasource.data);
    
  }
  editAction(data: any): void {
    this.selectedEditRow.next(data);
  }
 

  changeprice(row,event){
     console.log(row);
    row.totalPrice = +(<HTMLInputElement>event.target).value;
    
     this.renderTable();
     
   }

   changequantity(row,event){
    
    row.quantity= +(<HTMLInputElement>event.target).value;
    this.renderTable();
   }

 
   AddRow(){
     let datasoucelength=this.datasource.data.length;
     //console.log(datasoucelength);
    this.datasource.data[datasoucelength]={
        item: { id: null, name: "", maxLimit: 0, isActive: false, imageUrl: "", rate: 0},
           quantity: 0,
           totalPrice:0
         };
    this.renderTable();
   }

   selectedOption(row,event){
      //console.log(row);
      //console.log(row.item);
      //console.log(row.item.name);
      //console.log(event.value);
     row.item.name=event.value;
     this.renderTable();
     
     
   }



getTotalCost(){
  
 
   this.totalcost=this.datasource.data.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  //console.log(this.totalcost);
  this.ChangedFinalAmount.emit(this.totalcost);
  return this.totalcost;
  }


  getTotalQuantity() {
    
    return this.datasource.data.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
    
  }

  allowOnlyDigits(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true)  // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      return false;
    }
  }
  ngOnInit() {
    this.displayedColumns= this.columnHeader.map(c => c.columnDef)
    //console.log(this.datasource.data);
  }

  ngAfterViewInit(){  
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
    
  } 


}

