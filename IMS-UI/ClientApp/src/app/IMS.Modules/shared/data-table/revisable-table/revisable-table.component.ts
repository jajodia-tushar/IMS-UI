import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { ItemQuantityPriceMapping } from 'src/app/IMS.Models/Item/ItemQuantityPriceMapping';
import { Item } from 'src/app/IMS.Models/Item/Item';

@Component({
  selector: 'app-revisable-table',
  templateUrl: './revisable-table.component.html',
  styleUrls: ['./revisable-table.component.css']
})
export class RevisableTableComponent implements OnInit {

  displayedColumns;
  public datasource = new MatTableDataSource<ItemQuantityPriceMapping>();

  @Input() disabledCond;
  @Input() columnHeader;
  @Input() show;
   public totalcost;
   
  @Input() set griddata(data){
    this.datasource= new MatTableDataSource(data);
  }
  @Input() ItemList;
 
  
  @Output() selectedEditRow: EventEmitter<any> = new EventEmitter();
  @Output() ChangedFinalAmount: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private snackBar: MatSnackBar,
  ) { }
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
     
    let index = this.datasource.data.indexOf(row);
   
    if (index != -1) {
      this.datasource.data.splice(index, 1);
      
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
     
    row.totalPrice = +(<HTMLInputElement>event.target).value;
    
     this.renderTable();
     
   }

   changequantity(row,event){
    
    row.quantity= +(<HTMLInputElement>event.target).value;
    this.renderTable();
   }

 
   AddRow(){ 
     
     let datasoucelength=this.datasource.data.length;
     if(this.datasource.data[datasoucelength-1].item.id==null){
      showMessage(this.snackBar, 2, "First select the item", "warn");
     }
    
     else if(this.datasource.data[datasoucelength-1].quantity==0 ||this.datasource.data[datasoucelength-1].totalPrice==0)
     showMessage(this.snackBar, 2, "Quantity or Price cannot be 0", "warn");
     else
     {
    this.datasource.data[datasoucelength]={
        item: { id: null, name: "", maxLimit: 0, isActive: false, imageUrl: "", rate: 0},
           quantity: 1,
           totalPrice:1
         };
    this.renderTable();
   }
  }

   isItemAlreadySelected(item: Item) {
    return this.datasource.data.find(i => i.item.name == item.name) != null;
  }

 
getTotalCost(){
  
 
   this.totalcost=this.datasource.data.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  
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
   
  }

  ngAfterViewInit(){  
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
    
  } 


 quantityControl = new FormControl("", [Validators.max(100), Validators.min(1)])
 priceControl = new FormControl("", [Validators.max(100), Validators.min(1)])
}

