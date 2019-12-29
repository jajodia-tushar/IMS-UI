import { Component, OnInit, ViewChild, Input } from '@angular/core';


@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css']
})
export class ReportsTableComponent implements OnInit {
  constructor() { }

  @Input()
  columnsToDisplay: string[];
  @Input()
  dataSource = [];

  ngOnInit() {}
}
 

