import { Component, OnInit, Input } from "@angular/core";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";
import { ActivatedRoute } from "@angular/router";
import { RagStatusService } from "src/app/IMS.Services/admin/rag-status.service";
import { VendorService } from "src/app/IMS.Services/vendor/vendor.service";

@Component({
  selector: "app-reports-tabs",
  templateUrl: "./reports-tabs.component.html",
  styleUrls: ["./reports-tabs.component.css"]
})
export class ReportsTabsComponent implements OnInit {

  reportsSelectionData: reportsSelectionDataModel[] = [];
  selectedTab: number;
  hasExpandableRows: boolean = true;

  locationCode: string;
  locationName: string;
  colour: string;

  toDate: string;
  fromDate: string;

  columnToDisplay: string[];
  dataToDisplay: any[] = [];

  constructor(private reportsService: ReportsService, private route: ActivatedRoute,
    private ragStatusService: RagStatusService , private vendorService : VendorService) {
    this.locationName = this.route.snapshot.queryParams.locationName;
    this.locationCode = this.route.snapshot.queryParams.locationCode;
    this.colour = this.route.snapshot.queryParams.colour;
    this.selectedTab = this.route.snapshot.queryParams.selectedTab;

    if (this.selectedTab == null) {
      this.selectedTab = 0;
    }

    if (this.locationName == null || this.locationCode == null || this.colour == null) {
      this.locationCode = "WH";
      this.locationName = "Warehouse";
      this.colour = "Red";
    }


  }

  async getRAGReportDropDownList() {
    return await this.ragStatusService.getRAGStatusData().toPromise();
  }
  

  async ngOnInit() {
    await this.initializeEmptyData();

    this.searchButtonClicked();
  }

  tabChanged(event: Event) {
    this.columnToDisplay = [];
    this.dataToDisplay = [];
    this.searchButtonClicked();
  }

  searchButtonClicked() {
    
    if (this.selectedTab == 0) {
      this.showRAGDataTable();
    }
    else if (this.selectedTab == 1) {
      this.showVendorDataTable();
    }
  }

  changeDateFormat(inputFormat: string): string{
    if (inputFormat == null || inputFormat == "")
      return "";
    let inputDate: Date = new Date(Date.parse(inputFormat));
    return `${inputDate.getFullYear()}${("0" + (inputDate.getMonth() + 1))
      .slice(-2)}${("0" + inputDate.getDate()).slice(-2)}`
  }

  showVendorDataTable() {
    let dataToDisplaytemp = []
    this.dataToDisplay = [];
    let toDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].dataFromUser);
    let fromDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[2].dataFromUser);
      
    let vendorId: string = this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].dataFromUser;
    this.vendorService.getVendorOrder(vendorId,toDate, fromDate).subscribe(
      data => {
        console.log(data);
        data.vendorOrders.forEach(
          data => {
            dataToDisplaytemp.push({
              "vendorName": data.vendor.name,
              "date": (data.vendorOrderDetails.date +"").slice(0,10),
              "amount": data.vendorOrderDetails.finalAmount,
              "innerData": data.vendorOrderDetails.orderItemDetails.map(
                x => {
                  return {
                    "item": x.item.name,
                    "quantity": x.quantity,
                    "rate" : x.item.rate
                  }
                }),
              "innerColumns" : ["item", "quantity","rate"]
              });
            });
            this.columnToDisplay = JSON.parse(JSON.stringify(["vendorName", "date","amount"]));
            this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
      }
    );
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

    let date = new Date();
    this.toDate = date.toISOString();
    date.setDate(date.getDay() - 6);
    this.fromDate = date.toISOString();

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
            dropDownOptions: ["All Vendors"],
            dropDownValues: ["0"],
            dataFromUser: "0"
          },
          {
            placeHolderName: "FromDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: this.fromDate
          },
          {
            placeHolderName: "ToDate",
            type: "datePicker",
            dropDownOptions: [],
            dropDownValues: [],
            dataFromUser: this.toDate
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
      // {
      //   reportName: "Shelf",
      //   reportsFilterOptions: [
      //     {
      //       placeHolderName: "ShelfName",
      //       type: "dropDown",
      //       dropDownOptions: ["First Floor", "Sixth Floor"],
      //       dropDownValues: [],
      //       dataFromUser: ""
      //     },
      //     {
      //       placeHolderName: "FromDate",
      //       type: "datePicker",
      //       dropDownOptions: [],
      //       dropDownValues: [],
      //       dataFromUser: ""
      //     },
      //     {
      //       placeHolderName: "ToDate",
      //       type: "datePicker",
      //       dropDownOptions: [],
      //       dropDownValues: [],
      //       dataFromUser: ""
      //     }
      //   ],
      //   urlToRequest: ""
      // }
      
    ];

    await this.getRAGReportDropDownList().then(
      data => {
        this.reportsSelectionData[0].reportsFilterOptions[0].dropDownOptions = data.ragStatusList.map(x => x.name);
        this.reportsSelectionData[0].reportsFilterOptions[0].dropDownValues = data.ragStatusList.map(x => x.code);
      }
    );

    await this.vendorService.getAllVendors().subscribe(
      data => {
        data.vendors.forEach(
          vendor => {
            this.reportsSelectionData[1].reportsFilterOptions[0].dropDownOptions.push(vendor.name);
            this.reportsSelectionData[1].reportsFilterOptions[0].dropDownValues.push(vendor.id.toString());
          }
        )
      }
    )
  }

  isDisabled(index: number) : boolean {
    return index >= 2;
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
