import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.css']
})
export class ReportsFilterComponent implements OnInit {


  @Input()
  reportsFilterDataList : reportsFilterOptions[];

  constructor() { }

  ngOnInit() {
  }
}

export interface Food {
  value: string;
  viewValue: string;
}

export class reportsFilterOptions{
  placeHolderName : string;
  type : string;
  dropDownOptions : string[];
}

export class reportsSelectionDataModel{
  reportName : string;
  reportsFilterOptions : reportsFilterOptions[];
}