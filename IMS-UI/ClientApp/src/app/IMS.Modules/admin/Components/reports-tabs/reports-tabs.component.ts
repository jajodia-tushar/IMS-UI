import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-tabs',
  templateUrl: './reports-tabs.component.html',
  styleUrls: ['./reports-tabs.component.css']
})
export class ReportsTabsComponent implements OnInit {

  tabsNames : string[] = ["RAG","Vendor","Employee","Item","Shelf"];

  constructor() { }

  ngOnInit() {
  }

}
