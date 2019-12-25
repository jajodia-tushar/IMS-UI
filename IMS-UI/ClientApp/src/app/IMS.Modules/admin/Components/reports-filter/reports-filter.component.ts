import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.css']
})
export class ReportsFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface Food {
  value: string;
  viewValue: string;
}
