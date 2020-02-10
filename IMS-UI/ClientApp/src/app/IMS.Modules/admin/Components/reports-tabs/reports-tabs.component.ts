import { Component, OnInit, Input } from "@angular/core";
import { ReportsService } from "src/app/IMS.Services/admin/reports.service";
import { ActivatedRoute } from "@angular/router";
import { VendorService } from "src/app/IMS.Services/vendor/vendor.service";
import { PagingInfo } from "src/app/IMS.Models/Shared/PagingInfo";
import { EmployeeOrderService } from "src/app/IMS.Services/employee/employee-order.service";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { VendorOrderResponse } from "src/app/IMS.Models/Vendor/VendorOrderResponse";
import { PerDayConsumptionResponse } from "src/app/IMS.Models/Admin/PerDayConsumptionResponse";
import { ItemsAvailabilityResponse } from "src/app/IMS.Models/Admin/ItemsAvailabilityResponse";
import { AuditingService } from "src/app/IMS.Services/logging/auditing.service";
import { EmployeeOrdersResponse } from "src/app/IMS.Models/Employee/EmployeeOrdersResponse";
import { ItemConsumptionDetailsResponse } from "src/app/IMS.Models/Admin/ItemConsumptionDetailsResponse";
import { DatePipe } from "@angular/common";
import { CentralizedDataService } from "src/app/IMS.Services/shared/centralized-data.service";


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: "app-reports-tabs",
  templateUrl: "./reports-tabs.component.html",
  styleUrls: ["./reports-tabs.component.css"]
})
export class ReportsTabsComponent implements OnInit {

  reportsSelectionData: reportsSelectionDataModel[] = [];
  selectedTab: number;
  hasExpandableRows: boolean = true;
  dataToExport;

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


  constructor(
    private reportsService: ReportsService, 
    private route: ActivatedRoute,
    private vendorService : VendorService,
    private employeeOrderService : EmployeeOrderService,
    private auditingService : AuditingService,
    private centralizedRepo : CentralizedDataService) {
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
    return await this.reportsService.getRAGStatusData().toPromise();
  }
  

  async ngOnInit() {
    await this.initializeEmptyData();
    this.searchButtonClicked();
  }

  tabChanged(event: Event) {
    this.initializePaging();
    this.searchButtonClicked();
  }

  searchButtonClicked() {
    this.refreshColumnsAndTables();
    
    if (this.selectedTab == 0) {
      this.showRAGDataTable();
    }
    else if (this.selectedTab == 1) {
      this.showVendorDataTable();
    }
    else if(this.selectedTab == 2){
      this.showEmployeeOrdersTable();
    }
    else if(this.selectedTab == 3){
      this.showPerDayConsumption();
    }
    else if(this.selectedTab == 4){
      this.showItemConsumptionTable();
    }
    else if(this.selectedTab == 5){
      this.showAuditsLogs();
    }
  }

  showAuditsLogs(){
    let fromDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].dataFromUser);
    let toDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].
        dataFromUser);

    this.auditingService.getActivityLogs(this.pageInfo.pageSize,this.pageInfo.pageNumber,fromDate,toDate).subscribe(
        data => {
          if (data.status == "Success") {
            this.dataToExport = JSON.parse(JSON.stringify(data));
            let dataToDisplaytemp = []
            data.activityLogRecords.forEach(
              data => {
                dataToDisplaytemp.push({
                  "UserName" : data.userName,
                  "action" : data.action,
                  "details" : data.details,
                  "performedOn" : data.performedOn,
                  "createdOn" : data.createdOn.toString().replace("T"," "),
                  "remarks" : data.remarks,
                });
              });
            this.columnToDisplay = JSON.parse(JSON.stringify(["UserName", "action","details","performedOn","createdOn","remarks"]));
            this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
            this.pageInfo = data.pagingInfo;
          }
          else if(data.status == "Failure"){
            this.handleErrorInConnection(data.error.errorMessage);
          }
        });
  }

  showItemConsumptionTable() {    
    let fromDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].dataFromUser);
    let toDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].
        dataFromUser);
    
    this.reportsService.getItemConsumptionDetailedReport(fromDate,toDate,this.pageInfo.pageNumber,
      this.pageInfo.pageSize).subscribe(
        data => {
          if (data.status == "Success") {
            this.dataToExport = JSON.parse(JSON.stringify(data));
            let dataToDisplaytemp = []
            data.dateWiseItemConsumptionDetails.forEach(
              data => {
                dataToDisplaytemp.push({
                  "Item Name" : data.item.name,
                  "Quantity Consumed" : data.dateItemConsumptions.map( x => x.itemsConsumptionCount).reduce((a,b)=> a+b),
                  "innerData": data.dateItemConsumptions.map(
                    x => {
                      return {
                        "Date": new Date(x.date).toDateString(),
                        "Quantity": x.itemsConsumptionCount,
                      }
                    }),
                  "innerColumns": ["Date","Quantity"]
                });
              });
            this.columnToDisplay = JSON.parse(JSON.stringify(["Item Name", "Quantity Consumed"]));
            this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
            this.pageInfo = data.pagingInfo;
          }
          else if(data.status == "Failure"){
            this.handleErrorInConnection(data.error.errorMessage);
          }
        });
  }
  showPerDayConsumption() {    
    let fromDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].dataFromUser);
    let toDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].dataFromUser);
    this.reportsService.getPerDayConsumption(fromDate,toDate,this.pageInfo.pageNumber,this.pageInfo.pageSize).subscribe(
      data =>{
        if (data.status == "Success") {
          this.dataToExport = JSON.parse(JSON.stringify(data));
          let dataToDisplaytemp = []
          data.dateItemMapping.forEach(
            data => {
              dataToDisplaytemp.push({
                "Date" : new Date(data.date).toDateString(),
                "Total Quantity" : data.itemQuantityMappings.map( x => x.quantity).reduce((a,b)=> a+b),
                "innerData": data.itemQuantityMappings.map(
                  x => {
                    return {
                      "Item": x.item.name,
                      "quantity": x.quantity,
                    }
                  }),
                "innerColumns": ["Item", "quantity"]
              });
            });
          this.columnToDisplay = JSON.parse(JSON.stringify(["Date","Total Quantity"]));
          this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
          this.pageInfo = data.pagingInfo;
        }
        else if(data.status == "Failure"){
          this.handleErrorInConnection(data.error.errorMessage);
        }
      });
  }
  showEmployeeOrdersTable(){    
    let fromDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].dataFromUser);
    let toDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[2].
        dataFromUser);
    let employeeId = this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].dataFromUser;
    this.employeeOrderService.getOrders(fromDate,toDate,this.pageInfo.pageNumber,this.pageInfo.pageSize,
      employeeId).subscribe(
      data => {
        if (data.status == "Success") {
          this.dataToExport = JSON.parse(JSON.stringify(data));
          let dataToDisplaytemp = []
          data.employeeOrders.forEach(
            data => {
              dataToDisplaytemp.push({
                "Emp Id" : data.employee.id,
                "Name": data.employee.firstname,
                "Shelf" : data.employeeOrderDetails.shelf.name,
                "Time": new Date(data.employeeOrderDetails.date).toDateString() + " " + 
                new Date(data.employeeOrderDetails.date).toLocaleTimeString(),
                "Number of Items": data.employeeOrderDetails.employeeItemsQuantityList.length.toString(),
                "innerData": data.employeeOrderDetails.employeeItemsQuantityList.map(
                  x => {
                    return {
                      "item": x.item.name,
                      "quantity": x.quantity,
                    }
                  }),
                "innerColumns": ["item", "quantity"]
              });
            });
          this.columnToDisplay = JSON.parse(JSON.stringify(["Emp Id","Name", "Shelf", "Time","Number of Items"]));
          this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
          this.pageInfo = data.pagingInfo;
        }
        else if(data.status == "Failure"){
          this.handleErrorInConnection(data.error.errorMessage);
        }
      },
      error => {
        this.handleErrorInConnection();
      }
    );
    
  }
  showVendorDataTable() {
    let fromDate = this.changeDateFormat(
      this.reportsSelectionData[this.selectedTab].reportsFilterOptions[1].dataFromUser);
    let toDate =
      this.changeDateFormat(this.reportsSelectionData[this.selectedTab].reportsFilterOptions[2].
        dataFromUser);
    let vendorId: string = this.reportsSelectionData[this.selectedTab].reportsFilterOptions[0].
    dataFromUser;
    this.vendorService.getVendorOrder(vendorId,toDate, fromDate,
      "true",this.pageInfo.pageNumber,this.pageInfo.pageSize).subscribe(
      data => {
        if (data.status == "Success") {
          this.dataToExport = JSON.parse(JSON.stringify(data));
          let dataToDisplaytemp = []
          data.vendorOrders.forEach(  
            data => {
              dataToDisplaytemp.push({
                "Order Id" : data.vendorOrderDetails.orderId,
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
          this.columnToDisplay = JSON.parse(JSON.stringify(["Order Id","Invoice No","vendor Name",
           "date", "amount"]));
          this.dataToDisplay = JSON.parse(JSON.stringify(dataToDisplaytemp));
          this.pageInfo = data.pagingInfo;
        }
        else if(data.status == "Failure"){
          this.handleErrorInConnection(data.error.errorMessage);
        }
      }
      ,
      error => {
        this.handleErrorInConnection();
      }
    );
  }
  showRAGDataTable() {
    let locationCodeSelected = this.reportsSelectionData[0].reportsFilterOptions[0]
      .dataFromUser;
    let colourSelected = this.reportsSelectionData[0].reportsFilterOptions[1]
      .dataFromUser;
    let locationNameSelected = this.reportsSelectionData[0].reportsFilterOptions[0].
    dropDownOptions[this.reportsSelectionData[0].reportsFilterOptions[0].
      dropDownValues.indexOf(this.reportsSelectionData[0].reportsFilterOptions[0].dataFromUser)]
    
    this.reportsService
      .getRAGReport(locationNameSelected, locationCodeSelected, colourSelected,
        this.pageInfo.pageNumber, this.pageInfo.pageSize)
      .subscribe(data => {
        if(data.status == "Success"){
          this.dataToExport = JSON.parse(JSON.stringify(data));
          data.itemQuantityMappings.forEach(data => this.dataToDisplay.push({
            "item": data.item.name,
            "quantity": data.quantity
          }));
          this.dataToDisplay = JSON.parse(JSON.stringify(this.dataToDisplay));
          this.columnToDisplay = JSON.parse(JSON.stringify(["item", "quantity"]));
          this.pageInfo = data.pagingInfo;
        }
        else if(data.status == "Failure"){
          this.handleErrorInConnection(data.error.errorMessage);
        }
      },
      error => {
        this.handleErrorInConnection();
      }
    );
  }

  changeDateFormat(inputFormat: string): string{
    if (inputFormat == null || inputFormat == "")
      return "";
    let inputDate: Date = new Date(Date.parse(inputFormat));
    return `${inputDate.getFullYear()}${("0" + (inputDate.getMonth() + 1))
      .slice(-2)}${("0" + inputDate.getDate()).slice(-2)}`
  }


  clickMe(){
    let dFromDate = this.getDateFormatForDownloadableReports(this.fromDate);
    let dToDate = this.getDateFormatForDownloadableReports(this.toDate);
    let onDate = this.getDateFormatForDownloadableReports(new Date());

    if (this.selectedTab == 0) {
      let firstLevelData = this.getTopLevelDataOfRAG(this.dataToExport);
      let fileName = `RAG-Report-Of -- ${this.locationName} in ${this.colour} on ${onDate}`
      this.GenerateVendorOrderReports(fileName,firstLevelData);
    }
    else if (this.selectedTab == 1) {
      let firstLevelData = this.getTopLevelDataForVendorOrder(this.dataToExport);
      let innerLevelData = this.getInnerLevelDataForVendorOrder(this.dataToExport);
      let fileName = `Vendor-Order-report from -${dFromDate} To ${dToDate}`;
      this.GenerateVendorOrderReports(fileName,firstLevelData,innerLevelData);
    }
    else if(this.selectedTab == 2){
      let firstLevelData = this.getTopLevelDataOfEmployeeOrder(this.dataToExport);
      let fileName = `Employee-Order-Reports from - ${dFromDate}  To ${dToDate} `;
      this.GenerateVendorOrderReports(fileName,firstLevelData);
    }
    else if(this.selectedTab == 3){
      let firstLevelData = this.getTopLevelDataForPerDayConsumption(this.dataToExport);
      let innerLevelData = this.getInnerLevelDataForPerDayConsumption(this.dataToExport);
      let fileName = `Per Day Consumption Report from ${dFromDate} To ${dToDate}`;
      this.GenerateVendorOrderReports(fileName,firstLevelData,innerLevelData);
    }
    else if(this.selectedTab == 4){
      let firstLevelData = this.getTopLevelDataOfItemConsumption(this.dataToExport);
      let fileName = `Item Consumption Report from ${dFromDate} To ${dToDate}`;
      this.GenerateVendorOrderReports(fileName,firstLevelData);
    }
    else if (this.selectedTab == 5){
      let firstLevelData = this.getTopLevelDataOfAuditLogs();
      let fileName = `Audit Logs Report from ${dFromDate} To ${dToDate}`;
      this.GenerateVendorOrderReports(fileName,firstLevelData);
    }
  }
  getTopLevelDataOfAuditLogs() {
    let data = [];
    this.dataToExport.activityLogRecords.forEach(
      d=>{
        data.push({
          "UserName" : d.userName,
          "action" : d.action,
          "details" : d.details,
          "performedOn" : d.performedOn,
          "createdOn" : d.createdOn.toString().replace("T"," "),
          "remarks" : d.remarks,
        });
      });
      return data;
  }

  GenerateVendorOrderReports(fileName : string,firstLevelData, innerLevelData?){  
    let excelFileName = fileName;
    let ws = XLSX.utils.json_to_sheet(firstLevelData);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Main Page");
    if(innerLevelData){
      innerLevelData.forEach(
        d => {
          let dataToPlot = d.sheetData;
          let nameOfSheet = d.sheetName.toString();
          let innerSheet = XLSX.utils.json_to_sheet(dataToPlot);
          XLSX.utils.book_append_sheet(wb, innerSheet, nameOfSheet);
        });
    }
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  getTopLevelDataForVendorOrder(dataToExport : VendorOrderResponse){
    let data = [];
    dataToExport.vendorOrders.forEach(d => {
      let temp = {
          Order_Id : d.vendorOrderDetails.orderId,
          Vendor_Name : d.vendor.name,
          Vendor_Title : d.vendor.title,
          GST : d.vendor.gst,
          PAN : d.vendor.pan,
          Contact_Number : d.vendor.contactNumber,
          Invoice_Number : d.vendorOrderDetails.invoiceNumber,
          ChallanNumber : d.vendorOrderDetails.challanNumber,
          Recieved_By : d.vendorOrderDetails.recievedBy,
          Submitted_To : d.vendorOrderDetails.submittedTo,
          Date : this.getDateFormatForDownloadableReports(d.vendorOrderDetails.date),
          Number_of_items : d.vendorOrderDetails.orderItemDetails.length,
          Total_Quantity : d.vendorOrderDetails.orderItemDetails.map(x=>x.quantity).reduce((a,b)=>a+b),
          Amount : d.vendorOrderDetails.finalAmount,
      };
      data.push(temp);
    });
    return data;
  }

  getInnerLevelDataForVendorOrder(dataToExport : VendorOrderResponse){
    let data = [];
    let finalData = [];
    dataToExport.vendorOrders.forEach(
      d=>{
          d.vendorOrderDetails.orderItemDetails.forEach(
            e=>{
              let x = {
                Item : e.item.name,
                Quantity : e.quantity
              }
              data.push(x);
            });
            let x = {
              sheetName : d.vendorOrderDetails.orderId,
              sheetData : data
            }
            finalData.push(x);
            data = [];
      });
      return finalData;
  }

  getTopLevelDataForPerDayConsumption(dataToExport : PerDayConsumptionResponse){
    let data = [];
    dataToExport.dateItemMapping.forEach(d => {
      let temp = {
          Date : this.getDateFormatForDownloadableReports(d.date),
          Different_Items : d.itemQuantityMappings.length,
          Total_Quantity : d.itemQuantityMappings.map(x=>x.quantity).reduce((a,b)=>a+b)
      };
      data.push(temp);
    });
    return data;
  }

  getInnerLevelDataForPerDayConsumption(dataToExport : PerDayConsumptionResponse){
    let data = [];
    let finalData = [];
    dataToExport.dateItemMapping.forEach(
      d=>{
          d.itemQuantityMappings.forEach(
            e=>{
              let x = {
                Item : e.item.name,
                Quantity : e.quantity
              }
              data.push(x);
            });
           let x = {
              sheetName : this.getDateFormatForDownloadableReports(d.date),
              sheetData : data
            }
            finalData.push(x);
            data = [];
      });
      return finalData;
  }

  getTopLevelDataOfRAG(data : ItemsAvailabilityResponse){
    let finalData = [];

    data.itemQuantityMappings.forEach(
      d=>{
        let x = {
          Item_Name : d.item.name,
          Item_Quantity : d.quantity
        }
        finalData.push(x);
      });
      return finalData;
  }

  getTopLevelDataOfEmployeeOrder(data : EmployeeOrdersResponse){
    let finalData = [];
    data.employeeOrders.forEach(
      d=>{
        let x = {
            Employee_Id : d.employee.id,
            Employee_Name : d.employee.firstname + "  " + d.employee.lastname,
            Employee_ContactNumber : d.employee.contactNumber,
            Date : this.getDateFormatForDownloadableReports(d.employeeOrderDetails.date,true),
            Number_of_Items : d.employeeOrderDetails.employeeItemsQuantityList.length,
            Total_Quantity : d.employeeOrderDetails.employeeItemsQuantityList.map(x=>x.quantity).reduce((a,b)=>a+b),
            Shelf : d.employeeOrderDetails.shelf.name,
          }
        finalData.push(x);
      });
      return finalData;
  }

  getTopLevelDataOfItemConsumption(data : ItemConsumptionDetailsResponse){
    let finalData = [];
    data.dateWiseItemConsumptionDetails.forEach(
      d=>{
        let x = {
            Item_Name : d.item.name,
          }
        d.dateItemConsumptions.forEach(
          a=>{
            let date = this.getDateFormatForDownloadableReports(a.date);
            x[date] = a.itemsConsumptionCount
          }
        ) 
        finalData.push(x);
      });
      return finalData;
  }

  getDateFormatForDownloadableReports(date,requireTime? : boolean){
    let datePipe = new DatePipe('en-US');
    let newDate = new Date(date);

    if(requireTime){
      return datePipe.transform(newDate,"dd-MM-yyyy h:mm");
    }
    else{
      return datePipe.transform(newDate,"dd-MM-yyyy");
    }
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  handleErrorInConnection(message? : string){
    if(message == null || message == "")
        this.errorMessage = JSON.parse(JSON.stringify("No Data To Display"));
    else
        this.errorMessage = JSON.parse(JSON.stringify(message));
    this.columnToDisplay = [];
    this.dataToDisplay = [];
  }


  paginatorClicked(event) {
    this.pageInfo.pageNumber = event.pageIndex + 1;
    this.pageInfo.pageSize = event.pageSize;
    this.searchButtonClicked();
  }


  async initializeEmptyData() {

    let date = new Date();
    this.toDate = date.toISOString();
    date.setDate(date.getDate() - 6);
    this.fromDate = date.toISOString();

    this.initializePaging()

    let reportsPageConfigFile = require("src/assets/JSON/reportsPageConfig.json");
    this.reportsSelectionData = reportsPageConfigFile as reportsSelectionDataModel[];
    
    let loggedInUser = this.centralizedRepo.getUser();
    if(!loggedInUser){
      await this.centralizedRepo.getLoggedInUser();
      loggedInUser = this.centralizedRepo.getUser();
    }


    this.reportsSelectionData.forEach(
      (item,index) =>{
        if(item.reportName == "Audit Logs"){
          if(loggedInUser != null && loggedInUser.role.id != 4){
            this.reportsSelectionData.splice(index);
          }
        }
        if(item.reportName =="RAG"){
          item.reportsFilterOptions[0].dataFromUser = this.locationCode;
          item.reportsFilterOptions[1].dataFromUser = this.colour; 
        }
        item.reportsFilterOptions.forEach(
          element =>{
            if(element.placeHolderName == "FromDate")
              element.dataFromUser = this.fromDate;
            
            if(element.placeHolderName == "ToDate"){
              element.dataFromUser = this.toDate;
            }
          });
      });

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

  initializePaging(){
    if(this.pageInfo == null)
      this.pageInfo = new PagingInfo();
    this.pageInfo.pageNumber = 1;
    this.pageInfo.pageSize = 10;
    this.pageInfo.totalResults = 0;
  }

  refreshColumnsAndTables(){
    this.columnToDisplay = [];
    this.dataToDisplay = [];
    this.errorMessage = JSON.parse(JSON.stringify(""));
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
