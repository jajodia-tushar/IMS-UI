import { Component, OnInit } from "@angular/core";
import { MatTabChangeEvent, MatSelect, MatSelectChange } from "@angular/material";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";

@Component({
  selector: "app-reports-tabs",
  templateUrl: "./reports-tabs.component.html",
  styleUrls: ["./reports-tabs.component.css"]
})
export class ReportsTabsComponent implements OnInit {
  reportsSelectionData: reportsSelectionDataModel[] = [];
  selectedTab : number;

  constructor(private reportsService : ReportsService) {}

  ngOnInit() {
    this.selectedTab = 0;
    this.reportsSelectionData = [
      {
        reportName: "RAG",
        reportsFilterOptions: [
          {
            placeHolderName: "Shelf",
            type: "dropDown",
            dropDownOptions: ["Warehouse", "First Floor", "Sixth Floor"],
            dataFromUser : ""
          },
          {
            placeHolderName: "Color",
            type: "dropDown",
            dropDownOptions: ["Red", "Amber", "Green"],
            dataFromUser : ""
          }
        ],
        urlToRequest : ""
      },
      {
        reportName: "Vendor",
        reportsFilterOptions: [
          {
            placeHolderName: "VendorName",
            type: "dropDown",
            dropDownOptions: ["Vendor 1", "Vendor 2", "Vendor 3"],
            dataFromUser : ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          }
        ],
        urlToRequest : ""
      },
      {
        reportName: "Employee",
        reportsFilterOptions: [
          {
            placeHolderName: "Employee Id",
            type: "dropDown",
            dropDownOptions: ["1", "2", "3"],
            dataFromUser : ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          }
        ],
        urlToRequest : ""
      },
      {
        reportName: "Item",
        reportsFilterOptions: [
          {
            placeHolderName: "Item Name",
            type: "dropDown",
            dropDownOptions: ["Pen", "Pencil", "Notebook"],
            dataFromUser : ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          }
        ],
        urlToRequest : ""
      },
      {
        reportName: "Shelf",
        reportsFilterOptions: [
          {
            placeHolderName: "ShelfName",
            type: "dropDown",
            dropDownOptions: ["First Floor", "Sixth Floor"],
            dataFromUser : ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          }
        ],
        urlToRequest : ""
      },
      {
        reportName: "Rochit",
        reportsFilterOptions: [
          {
            placeHolderName: "Chaman",
            type: "dropDown",
            dropDownOptions: ["Vendor 1", "Vendor 2", "Vendor 3"],
            dataFromUser : ""
          },
          {
            placeHolderName: "FromDate",
            type: "drop",
            dropDownOptions: [],
            dataFromUser : ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dataFromUser : ""
          }
        ],
        urlToRequest : ""
      }
    ];
  }

  tabChanged(event : Event){
    console.log(this.selectedTab);
  }

  searchButtonClicked(){  
    this.reportsService.getRAGReport("x", "B", "red").subscribe(
      data => console.log(data)
   );
  }

}
export class reportsSelectionDataModel {
  reportName: string;
  reportsFilterOptions: reportsFilterOption[];
  urlToRequest : string;
  
}

export class RequestModel{
  


}

export class reportsFilterOption {
  placeHolderName: string;
  type: string;
  dropDownOptions: string[];
  dataFromUser : string;
}
