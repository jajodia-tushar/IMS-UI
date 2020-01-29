import { Component, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SpinLoaderService } from 'src/app/IMS.Services/shared/spin-loader.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


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

  @Input()
  columnsToDisplay: string[];
  @Input()
  dataSource = [];

  @Input()
  pageInfo: PagingInfo;

  paginator: MatPaginator  ;

  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
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

  

  clickMe(){
    let json = this.dataSource;
    let excelFileName = "Exported FileName";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}
 

