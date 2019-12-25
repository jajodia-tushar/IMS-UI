import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.css']
})
export class ReportsFilterComponent implements OnInit {


  @Input()
  dropdownListDatas : reportsDropDownListData[];

  constructor() { }

  ngOnInit() {

    // this.dropdownListDatas = [
    //     {
    //       placeHolderName : "Shelf",
    //       dropDownOptions : [
    //         "Warehouse","First Floor","Sixth Floor"
    //       ]
    //     },
    //     {
    //       placeHolderName : "color",
    //       dropDownOptions : [
    //         "Red", "Amber", "Green"
    //       ]
    //     }
    // ]
  }
}

export interface Food {
  value: string;
  viewValue: string;
}

export class reportsDropDownListData{
  placeHolderName : string;
  dropDownOptions : string[];
}

export class reportsData{
  reportName : string;
  data : reportsDropDownListData[];
}