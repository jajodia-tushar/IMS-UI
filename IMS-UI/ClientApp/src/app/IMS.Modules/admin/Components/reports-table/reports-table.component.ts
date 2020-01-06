import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SpinLoaderService } from 'src/app/IMS.Services/shared/spin-loader.service';


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
  
  ngOnInit() { }

  hasExpandableRows () {
   return  (this.dataSource[0] != null && this.dataSource[0].innerData != null)
  }

  showErrorMessage() {
    return !this.dataSource.length;
  }
}
 

