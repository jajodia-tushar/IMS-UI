import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements OnInit {

  datasource = new MatTableDataSource<any>();
  paginator: MatPaginator;
  displayedColumns;
  date;
  
  pageSizeOptions:number[]=[5, 10, 15, 20];
  
  constructor() { }

  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  @Input() set tableRows(data) {
    this.datasource.data = data;
  }

  @Input() pageInfo : PagingInfo
  @Input() columnHeaders;

  @Output() TableData: EventEmitter<any> = new EventEmitter<any>();
  @Output() isClickedOn: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChanged: EventEmitter<PagingInfo> = new EventEmitter<any> ();

  ngOnInit() {
    this.displayedColumns = this.columnHeaders.map(c => c.columnDef)
  }

  ngAfterViewInit() {
    this.displayedColumns = this.columnHeaders.map(c => c.columnDef);

  }

  pageChange($event){
    this.pageChanged.emit($event);
  }

  ClickedRow(row){  
    this.TableData.emit(row);
    this.isClickedOn.emit(1);
  }

}
