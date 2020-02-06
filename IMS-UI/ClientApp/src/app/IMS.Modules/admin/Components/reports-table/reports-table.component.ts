import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SpinLoaderService } from 'src/app/IMS.Services/shared/spin-loader.service';
import { MatPaginator } from '@angular/material';
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
  errorMessage: string;
  paginationOption : number[] = [5, 10, 25, 100];

  @Input()
  columnsToDisplay: string[];
  @Input()
  dataSource = [];

  getPaginationOption(){
    this.paginationOption = [5, 10, 25, 100];
    if(this.dataSource.length > 100){
      this.paginationOption.push(this.dataSource.length);
    }
    return this.paginationOption;
  }

  @Input()
  pageInfo: PagingInfo;

  @Input()
  tabs
  
  paginator: MatPaginator  ;

  @Output()
  exportData : EventEmitter<any> = new EventEmitter<any>();

  @Input()
  showDownloadOption : boolean;

  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  }  

  exportCsv(){
    this.exportData.emit();
  }
  
  ngOnInit() { 
    this.pageInfo = new PagingInfo();
    this.dataSource = [];
  }


  hasExpandableRows() {
   return  (this.dataSource[0] != null && this.dataSource[0].innerData != null)
  }

  showErrorMessage() {
    return !this.dataSource.length;
  }

  getNext(event) {
    this.paginatorClicked.emit(event);
  }

  showExportOptio(){
    return this.showDownloadOption && this.tabs != 5;
  }
}
 

