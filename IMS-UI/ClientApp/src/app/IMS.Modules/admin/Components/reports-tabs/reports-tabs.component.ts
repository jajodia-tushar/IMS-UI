import { Component, OnInit, Input } from "@angular/core";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";
import { ActivatedRoute } from "@angular/router";
import { RagStatusService } from "src/app/IMS.Services/admin/rag-status.service";

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

  constructor(private reportsService: ReportsService, private route: ActivatedRoute,
    private ragStatusService: RagStatusService) {
    this.locationName = this.route.snapshot.queryParams.locationName;
    this.locationCode = this.route.snapshot.queryParams.locationCode;
    this.colour = this.route.snapshot.queryParams.colour;
    this.selectedTab = this.route.snapshot.queryParams.selectedTab;

    if (this.selectedTab == null) {
      this.selectedTab = 0;
    }
  }

  async getRAGReportDropDownList() {
    return await this.ragStatusService.getRAGStatusData().toPromise();
  }
  

  async ngOnInit() {
    await this.initializeEmptyData();

    if (this.locationCode != null) {
      this.searchButtonClicked();
    }
  }

  tabChanged(event: Event) {
    // console.log(this.selectedTab);
  }

  searchButtonClicked() {
    
    if (this.selectedTab == 0) {
      this.showRAGDataTable();
    }
  }

  showRAGDataTable() {
    let locationCodeSelected = this.reportsSelectionData[0].reportsFilterOptions[0]
      .dataFromUser;
    let colourSelected = this.reportsSelectionData[0].reportsFilterOptions[1]
      .dataFromUser;

    let locationNameSelected = this.reportsSelectionData[0].reportsFilterOptions[0].dropDownOptions[this.reportsSelectionData[0].reportsFilterOptions[0].
      dropDownValues.indexOf(this.reportsSelectionData[0].reportsFilterOptions[0].dataFromUser)]
    
    this.reportsService
      .getRAGReport(locationNameSelected, locationCodeSelected, colourSelected)
      .subscribe(data => {
        this.columnToDisplay = JSON.parse(JSON.stringify(["item", "quantity"]));
        this.dataToDisplay = [];
        if (data.status == "Failure") {
          this.dataToDisplay = JSON.parse(JSON.stringify([]));
          return;
        }
        data.itemQuantityMappings.forEach(data => this.dataToDisplay.push({
          "item": data.item.name,
          "quantity": data.quantity
        }));
        this.dataToDisplay = JSON.parse(JSON.stringify(this.dataToDisplay));
        console;
      });
  }

  async initializeEmptyData() {
    this.reportsSelectionData = [
      {
        reportName: "RAG",
        reportsFilterOptions: [
          {
            placeHolderName: "Shelf",
            type: "dropDown",
            dropDownOptions: [],
            dropDownValues: [],
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

    await this.getRAGReportDropDownList().then(
      data => {
        this.reportsSelectionData[0].reportsFilterOptions[0].dropDownOptions = data.ragStatusList.map(x => x.name);
        this.reportsSelectionData[0].reportsFilterOptions[0].dropDownValues = data.ragStatusList.map(x => x.code);
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
