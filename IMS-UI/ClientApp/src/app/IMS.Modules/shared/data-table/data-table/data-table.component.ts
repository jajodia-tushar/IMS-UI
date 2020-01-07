import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Root } from 'src/app/IMS.Models/Vendor/Root';
import { DatePipe } from '@angular/common';
import { VendorOrders } from 'src/app/IMS.Models/Vendor/VendorOrders';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  displayedColumns;
  public datasource = new MatTableDataSource<VendorOrders>();
  public date;
  constructor(public datepipe: DatePipe) { }

  

  @Input() set griddata(data) {
    this.datasource = new MatTableDataSource(data);
    
  }
  @Input() columnHeader;

  @Output() TableData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isClickedOn: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
    this.displayedColumns = this.columnHeader.map(c => c.columnDef)
  }
  ngAfterViewInit() {
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);

  }
  transformDate(row) {
    
    this.date = this.datepipe.transform(row.vendorOrderDetails.date, 'dd/MM/yyyy');
    
    return this.date;
  }
  ClickedRow(row)
  {
    this.TableData.emit(row);
    this.isClickedOn.emit(1);
  }
 
}
