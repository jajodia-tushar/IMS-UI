import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SpinLoaderService } from 'src/app/IMS.Services/shared/spin-loader.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';


@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms ease')),
    ]),
  ],
})
export class ReportsTableComponent implements OnInit {
  constructor(private spinLoaderService : SpinLoaderService) { }

  @Output()
  paginatorClicked: EventEmitter<any> = new EventEmitter();

  @Input()
  columnsToDisplay: string[];
  @Input()
  data = [];

  @Input()
  pageInfo: PagingInfo;

  paginator: MatPaginator  ;

@ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  }
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  
  ngOnInit() { 
    this.dataSource.data = this.data;
    this.pageInfo = new PagingInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  hasExpandableRows () {
   return  (this.data[0] != null && this.data[0].innerData != null)
  }

  showErrorMessage() {
    return !this.data.length;
  }

  getNext(event) {
    this.paginatorClicked.emit(event);
  }
}
 

