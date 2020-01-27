import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Notification } from 'src/app/IMS.Models/Notification/Notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  datasource = new MatTableDataSource<Notification>();
  paginator: MatPaginator;
  
  displayedColumns;
  date;
  pageLength:number;
  pageSize:number;
  pageSizeOptions:number[]=[5, 10, 15, 20];
  pageNumber:number;
  
  constructor(public datepipe: DatePipe, public router: Router) { }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
   @Input() set pageInfo(data){
     this.pageLength=data.totalResults;
     this.pageSize=data.pageSize;
     this.pageNumber=data.pageNumber;
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
    this.date = this.datepipe.transform(row.lastModified, 'dd/MM/yyyy');
    return this.date;
  }

  pageChange($event){
    this.pageischanged.emit($event);
    console.log($event);
  }

  ClickedRow(row){  
    console.log(row);
    this.router.navigateByUrl(`/Admin/Notifications/${row.requestType}/${row.requestId}`);
    this.TableData.emit(row);
    this.isClickedOn.emit(1);
  }
 
}
