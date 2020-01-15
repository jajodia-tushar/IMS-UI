import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource,MatPaginator } from '@angular/material';
import { Root } from 'src/app/IMS.Models/Vendor/Root';
import { DatePipe } from '@angular/common';
import { VendorOrder } from 'src/app/IMS.Models/Vendor/VendorOrder';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  displayedColumns;
  public datasource = new MatTableDataSource<VendorOrder>();
  public date;
  pageLength:number;
  pageSize:number;
  pageSizeOptions:number[]=[5, 10, 15, 20];
  constructor(public datepipe: DatePipe) { }
  paginator: MatPaginator;
  pageNo:number;
  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
   @Input() set pageInfo(data){
     console.log(data.totalResults);
     this.pageLength=data.totalResults;
     this.pageSize=data.pageSize;
     this.pageNo=data.pageNumber;
     console.log(this.pageLength);
    console.log(this.pageSize);
     console.log(this.pageNo);
   } 

  @Input() set griddata(data) {
    this.datasource = new MatTableDataSource(data);
    
  }
  @Input() columnHeader;

  @Output() TableData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isClickedOn: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageischanged: EventEmitter<any> = new EventEmitter<any> ();
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

  pageChange($event){
    // console.log($event);
    // console.log($event.pageIndex);
    // this.pageNo=$event.pageIndex;
    // this.pageSize=$event.pageSize;
    // console.log(this.pageLength);
    // console.log(this.pageSize);
    //  console.log(this.pageNo);
    this.pageischanged.emit($event);
  }
  ClickedRow(row)
  {
    this.TableData.emit(row);
    this.isClickedOn.emit(1);
  }
 
}
