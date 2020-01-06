import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SpinLoaderService } from 'src/app/IMS.Services/shared/spin-loader.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';


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

  @Input()
  columnsToDisplay: string[];
  @Input()
  dataSource = [];

  paginator: MatPaginator  ;

@ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.newDataSource.paginator = this.paginator;
  }
  
  newDataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  
  ngOnInit() { 
    this.newDataSource.data = this.dataSource;
    console.log(this.dataSource);
  }

  ngAfterViewInit() {
    this.newDataSource.paginator = this.paginator
}

  ngOnChanges(changes: SimpleChanges): void {
    this.newDataSource = new MatTableDataSource(this.dataSource);
    this.newDataSource.paginator = this.paginator;
    console.log(this.dataSource);

  }

  hasExpandableRows () {
   return  (this.dataSource[0] != null && this.dataSource[0].innerData != null)
  }

  showErrorMessage() {
    return !this.dataSource.length;
  }
}
 

