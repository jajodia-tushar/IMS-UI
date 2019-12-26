import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

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
  @Output() deleteRow: EventEmitter<any> = new EventEmitter();

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
    console.log(this.datasource);
  }

  changeprice(row,event){
     let index = this.datasource.data.indexOf(row);
     row.totalPrice=(<HTMLInputElement>event.target).value;
   }

   changequantity(row,event){
    let index = this.datasource.data.indexOf(row);
    row.quantity=(<HTMLInputElement>event.target).value;
   }
  
  ngOnInit() {
    this.displayedColumns= this.columnHeader.map(c => c.columnDef)
    console.log(this.datasource.data);
  }

  ngAfterViewInit(){  
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
    
  } 


}
