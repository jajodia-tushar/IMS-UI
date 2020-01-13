import { Component, OnInit, Input } from "@angular/core";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";
import { ActivatedRoute } from "@angular/router";
import { RagStatusService } from "src/app/IMS.Services/admin/rag-status.service";
import { VendorService } from "src/app/IMS.Services/vendor/vendor.service";
import { PagingInfo } from "src/app/IMS.Models/Shared/PagingInfo";

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


  // ====================== Pagination Support================
    pageInfo: PagingInfo;
    errorMessage: string;


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
    this.columnToDisplay = [];
    this.errorMessage = JSON.parse(JSON.stringify(""));
    let toDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].dataFromUser);
    let fromDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[2].dataFromUser);
      
    let vendorId: string = this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].dataFromUser;
    this.vendorService.getVendorOrder(vendorId,toDate, fromDate).subscribe(
      data => {
        if (data.status == "Success") {
          console.log(data);
          data.vendorOrders.forEach(
            data => {
              dataToDisplaytemp.push({
                "Invoice No" : data.vendorOrderDetails.invoiceNumber,
                "vendor Name": data.vendor.name,
                "date": (data.vendorOrderDetails.date + "").slice(0, 10),
                "amount": data.vendorOrderDetails.finalAmount,
                "innerData": data.vendorOrderDetails.orderItemDetails.map(
                  x => {
                    return {
                      "item": x.item.name,
                      "quantity": x.quantity,
                      "price": x.totalPrice
                    }
                  }),
                "innerColumns": ["item", "quantity", "price"]
              });
            });
          this.columnToDisplay = JSON.parse(JSON.stringify(["Invoice No","vendor Name", "date", "amount"]));
          this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
          if (this.dataToDisplay.length == 0) {
            this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
          }
        }
        else {
          this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
        }
      }
      ,
      error => {
        this.columnToDisplay = [];
        this.dataToDisplay = [];
        this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
      }
    );
  }

  paginatorClicked(event) {
    this.pageInfo.pageNumber = event.pageIndex + 1;
    this.pageInfo.pageSize = event.pageSize;
    this.searchButtonClicked();
  }

  showRAGDataTable() {
    this.errorMessage = JSON.parse(JSON.stringify(""));
    let locationCodeSelected = this.reportsSelectionData[0].reportsFilterOptions[0]
      .dataFromUser;
    let colourSelected = this.reportsSelectionData[0].reportsFilterOptions[1]
      .dataFromUser;

    let locationNameSelected = this.reportsSelectionData[0].reportsFilterOptions[0].dropDownOptions[this.reportsSelectionData[0].reportsFilterOptions[0].
      dropDownValues.indexOf(this.reportsSelectionData[0].reportsFilterOptions[0].dataFromUser)]
    
    this.reportsService
      .getRAGReport(locationNameSelected, locationCodeSelected, colourSelected,
        this.pageInfo.pageNumber, this.pageInfo.pageSize)
      .subscribe(data => {
        this.columnToDisplay = JSON.parse(JSON.stringify(["item", "quantity"]));
        this.dataToDisplay = [];
        if (data.status == "Failure") {
          this.dataToDisplay = JSON.parse(JSON.stringify([]));
          this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
          return;
        }
        data.itemQuantityMappings.forEach(data => this.dataToDisplay.push({
          "item": data.item.name,
          "quantity": data.quantity
        }));
        this.dataToDisplay = JSON.parse(JSON.stringify(this.dataToDisplay));
        this.pageInfo = data.pagingInfo;

        if (this.dataToDisplay.length == 0) {
          this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
        }
      },
      error => {
        this.columnToDisplay = [];
        this.dataToDisplay = [];
        this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
      }
      
    );
  }

  async initializeEmptyData() {

    let date = new Date();
    this.toDate = date.toISOString();
    date.setDate(date.getDay() - 6);
    this.fromDate = date.toISOString();

    this.pageInfo = new PagingInfo();
    this.pageInfo.pageNumber = 1;
    this.pageInfo.pageSize = 10;
    this.pageInfo.totalResults = 0;

    let reportsPageConfigFile = require("src/assets/JSON/reportsPageConfig.json");
    this.reportsSelectionData = reportsPageConfigFile as reportsSelectionDataModel[];

    this.reportsSelectionData.forEach(
      item =>{
        if(item.reportName =="RAG"){
          item.reportsFilterOptions[0].dataFromUser = this.locationCode;
          item.reportsFilterOptions[1].dataFromUser = this.colour; 
        }

        if(item.reportName == "Vendor Orders"){
          item.reportsFilterOptions[1].endDate = new Date();
          item.reportsFilterOptions[2].endDate = new Date();
          item.reportsFilterOptions[1].dataFromUser = this.fromDate;
          item.reportsFilterOptions[2].dataFromUser = this.toDate;
        }
      }
    )

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
  endDate?: Date;
}
