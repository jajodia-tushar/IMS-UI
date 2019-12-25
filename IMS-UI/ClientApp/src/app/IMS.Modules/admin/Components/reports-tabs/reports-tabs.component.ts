import { Component, OnInit } from "@angular/core";
import { reportsData } from "../reports-filter/reports-filter.component";

@Component({
  selector: "app-reports-tabs",
  templateUrl: "./reports-tabs.component.html",
  styleUrls: ["./reports-tabs.component.css"]
})
export class ReportsTabsComponent implements OnInit {
  tabsNames: string[] = ["RAG", "Vendor", "Employee", "Item", "Shelf"];

  reportsSelectionData: reportsData[] = [];

  constructor() {}

  ngOnInit() {
    this.reportsSelectionData = [
      {
        reportName: "RAG",
        data: [
          {
            placeHolderName: "Shelf",
            dropDownOptions: ["Warehouse", "First Floor", "Sixth Floor"]
          },
          {
            placeHolderName: "color",
            dropDownOptions: ["Red", "Amber", "Green"]
          }
        ]
      },
      {
        reportName: "Vendor",
        data: [
          {
            placeHolderName: "VendorName",
            dropDownOptions: ["Vendor 1", "Vendor 2", "Vendor 3"]
          },
          {
            placeHolderName: "Date",
            dropDownOptions: ["Select 1", "Select 2 ", "Select 3"]
          }
        ]
      },
      {
        reportName: "Employee",
        data: [
          {
            placeHolderName: "Employee Id",
            dropDownOptions: ["1", "2", "3"]
          },
          {
            placeHolderName: "Date",
            dropDownOptions: ["Select 1", "Select 2 ", "Select 3"]
          }
        ]
      },
      {
        reportName: "Item",
        data: [
          {
            placeHolderName: "Item Name",
            dropDownOptions: ["Pen", "Pencil", "Notebook"]
          },
          {
            placeHolderName: "Date",
            dropDownOptions: ["Select 1", "Select 2 ", "Select 3"]
          }
        ]
      },
      {
        reportName: "Shelf",
        data: [
          {
            placeHolderName: "ShelfName",
            dropDownOptions: ["First Floor", "Sixth Floor"]
          },
          {
            placeHolderName: "Date",
            dropDownOptions: ["Select 1", "Select 2 ", "Select 3"]
          }
        ]
      }
    ];
  }
}
