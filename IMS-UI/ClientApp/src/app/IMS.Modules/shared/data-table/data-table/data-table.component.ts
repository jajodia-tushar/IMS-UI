import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatSort, Sort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Notification } from 'src/app/IMS.Models/Notification/Notification';
import { Router } from '@angular/router';
import { showMessage } from '../../utils/snackbar';

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
  pageSizeOptions:number[]=[5, 10, 15, 20,100,200];
  pageNumber:number;
  
  constructor(public datepipe: DatePipe, public router: Router, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  @ViewChild(MatSort, { static: false }) sort : MatSort;
  
  @Input() set pageInfo(data){
    this.pageLength=data.totalResults;
    this.pageSize=data.pageSize;
    this.pageNumber=data.pageNumber;
  }

  @Input() set griddata(data) {
    this.datasource = new MatTableDataSource(data);
    this.datasource.sort = this.sort;
  }

  @Input() columnHeader;

  @Output() TableData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isClickedOn: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageischanged: EventEmitter<any> = new EventEmitter<any> ();

  ngOnInit() {
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
    this.datasource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.displayedColumns = this.columnHeader.map(c => c.columnDef);
  }

  sortData(sort: Sort) {
    this.datasource.sort = this.sort;
  } 

  transformDate(row) {
    this.date = this.datepipe.transform(row.lastModified, 'dd/MM/yyyy');
    return this.date;
  }

  pageChange($event){
    this.pageischanged.emit($event);
  }

  ClickedRow(row){ 

    if (row.requestStatus === "Rejected") {
      showMessage(this.snackBar, 2, "You'cant view a rejected order", "warn");
    } else {
      this.router.navigateByUrl(`/Admin/Notifications/${row.requestType}/${row.requestId}`);
      this.TableData.emit(row);
      this.isClickedOn.emit(1);
    }
  }

  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
    this.datasource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
 
}
