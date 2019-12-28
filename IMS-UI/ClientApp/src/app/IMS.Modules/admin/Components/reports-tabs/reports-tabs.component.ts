import { Component, OnInit, Input } from "@angular/core";
import {
  MatTabChangeEvent,
  MatSelect,
  MatSelectChange
} from "@angular/material";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reports-tabs",
  templateUrl: "./reports-tabs.component.html",
  styleUrls: ["./reports-tabs.component.css"]
})
export class ReportsTabsComponent implements OnInit {
  reportsSelectionData: reportsSelectionDataModel[] = [];
  selectedTab: number;

  locationCode: string;
  locationName: string;
  colour: string;

  columnToDisplay: string[];
  dataToDisplay: any[] = [];

  constructor(private reportsService: ReportsService,private route: ActivatedRoute) {
    this.locationName = this.route.snapshot.queryParams.locationName
    this.locationCode =  this.route.snapshot.queryParams.locationCode
    this.colour = this.route.snapshot.queryParams.colour
  }

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
            dropDownValues: ["WH", "A", "B"],
            dataFromUser: this.locationCode
          },
          {
            placeHolderName: "Color",
            type: "dropDown",
            dropDownOptions: ["Red", "Amber", "Green"],
            dropDownValues: ["Red", "Amber", "Green"],
            dataFromUser: this.colour
          }
        ],
        urlToRequest: ""
      },
      {
        reportName: "Vendor",
        reportsFilterOptions: [
          {
            placeHolderName: "VendorName",
            type: "dropDown",
            dropDownOptions: ["Vendor 1", "Vendor 2", "Vendor 3"],
            dropDownValues: ["Vendor 1", "Vendor 2", "Vendor 3"],
            dataFromUser: ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          }
        ],
        urlToRequest: ""
      },
      {
        reportName: "Employee",
        reportsFilterOptions: [
          {
            placeHolderName: "Employee Id",
            type: "dropDown",
            dropDownOptions: ["1", "2", "3"],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          }
        ],
        urlToRequest: ""
      },
      {
        reportName: "Item",
        reportsFilterOptions: [
          {
            placeHolderName: "Item Name",
            type: "dropDown",
            dropDownOptions: ["Pen", "Pencil", "Notebook"],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          }
        ],
        urlToRequest: ""
      },
      {
        reportName: "Shelf",
        reportsFilterOptions: [
          {
            placeHolderName: "ShelfName",
            type: "dropDown",
            dropDownOptions: ["First Floor", "Sixth Floor"],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: ""
          }
        ],
        urlToRequest: ""
      }
    ];

    if (this.locationCode != null) {
      this.searchButtonClicked();
    }
  }

  tabChanged(event: Event) {
    console.log(this.selectedTab);
  }

  searchButtonClicked() {
    let a = this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0]
      .dataFromUser;
    let b = this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1]
      .dataFromUser;
    this.reportsService
      .getRAGReport(a, a, b)
      .subscribe(data => {
        this.columnToDisplay = JSON.parse(JSON.stringify(["item", "quantity"]));
        this.dataToDisplay = [];
        if (data.status  == "Failure") {
          this.dataToDisplay = JSON.parse(JSON.stringify([]));
          return;
        }
        data.itemQuantityMappings.forEach(
          data => this.dataToDisplay.push({
            "item": data.item.name,
            "quantity": data.quantity
          })
        )
        this.dataToDisplay = JSON.parse(JSON.stringify(this.dataToDisplay));
        console
      }
      );
  }
}
export class reportsSelectionDataModel {
  reportName: string;
  reportsFilterOptions: reportsFilterOption[];
  urlToRequest: string;
}

export class RequestModel {}

export class reportsFilterOption {
  placeHolderName: string;
  type: string;
  dropDownOptions: string[];
  dropDownValues: string[];
  dataFromUser: string;
}
