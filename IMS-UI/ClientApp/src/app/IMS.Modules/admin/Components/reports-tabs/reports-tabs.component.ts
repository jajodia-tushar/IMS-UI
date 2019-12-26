import { Component, OnInit } from "@angular/core";
import { reportsSelectionDataModel } from "../reports-filter/reports-filter.component";

@Component({
  selector: "app-reports-tabs",
  templateUrl: "./reports-tabs.component.html",
  styleUrls: ["./reports-tabs.component.css"]
})
export class ReportsTabsComponent implements OnInit {
  reportsSelectionData: reportsSelectionDataModel[] = [];

  constructor() {}

  ngOnInit() {
    this.reportsSelectionData = [
      {
        reportName: "RAG",
        reportsFilterOptions: [
          {
            placeHolderName: "Shelf",
            type : "dropDown",
            dropDownOptions: ["Warehouse", "First Floor", "Sixth Floor"]
          },
          {
            placeHolderName: "color",
            type : "dropDown",
            dropDownOptions: ["Red", "Amber", "Green"]
          }
        ]
      },
      {
        reportName: "Vendor",
        reportsFilterOptions: [
          {
            placeHolderName: "VendorName",
            type : "dropDown",
            dropDownOptions: ["Vendor 1", "Vendor 2", "Vendor 3"]
          },
          {
            placeHolderName: "FromDate",
            type : "datePicker",
            dropDownOptions: []
          },
          {
            placeHolderName: "ToDate",
            type : "datePicker",
            dropDownOptions: []
          }
        ]
      },
      {
        reportName: "Employee",
        reportsFilterOptions: [
          {
            placeHolderName: "Employee Id",
            type : "dropDown",
            dropDownOptions: ["1", "2", "3"]
          },
          {
            placeHolderName: "FromDate",
            type : "datePicker",
            dropDownOptions: []
          },
          {
            placeHolderName: "ToDate",
            type : "datePicker",
            dropDownOptions: []
          }
        ]
      },
      {
        reportName: "Item",
        reportsFilterOptions: [
          {
            placeHolderName: "Item Name",
            type : "dropDown",
            dropDownOptions: ["Pen", "Pencil", "Notebook"]
          },
          {
            placeHolderName: "FromDate",
            type : "datePicker",
            dropDownOptions: []
          },
          {
            placeHolderName: "ToDate",
            type : "datePicker",
            dropDownOptions: []
          }
        ]
      },
      {
        reportName: "Shelf",
        reportsFilterOptions: [
          {
            placeHolderName: "ShelfName",
            type : "dropDown",
            dropDownOptions: ["First Floor", "Sixth Floor"]
          },
          {
            placeHolderName: "FromDate",
            type : "datePicker",
            dropDownOptions: []
          },
          {
            placeHolderName: "ToDate",
            type : "datePicker",
            dropDownOptions: []
          }
        ]
      }
    ];
  }
}
