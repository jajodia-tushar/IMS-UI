import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulkOrderService } from 'src/app/IMS.Services/admin/bulk-order.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { BulkRequestDialogComponent } from '../bulk-request-dialog/bulk-request-dialog.component';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemLocationQuantityMapping, EmployeeBulkOrderDetails, BlukOrderApprove, BulkOrderItemQuantityMapping, BulkRequest } from 'src/app/IMS.Models/Employee/BulkRequest';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { BulkReturnDialogComponent } from '../bulk-return-dialog/bulk-return-dialog.component';

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrls: ['./bulk-order.component.css']
})
export class BulkOrderComponent implements OnInit {

  listOfFieldToBeDisplayed : FieldToBeDisplayed[] = [];
  dataSource : TableData[] = [];
  displayedColumns = ["itemName","itemQuantity","action"];
  orderId : number;
  reasonForRequirement: string;
  itemLocationQuaListToBeSent : ItemLocationQuantityMapping[] = [];
  employee : Employee;
  employeeBulkOrderDetails: EmployeeBulkOrderDetails;
  bulkOrderItemQuantityMapping : BulkOrderItemQuantityMapping[] = [];
  bulkRequestStatus : FieldToBeDisplayed;
  requestBy : FieldToBeDisplayed;
  requestOn : FieldToBeDisplayed;
  requiredOn : FieldToBeDisplayed;
  employeeId :FieldToBeDisplayed;
  
  
  numberOfColumns() {
    return (this.displayedColumns.length - 1);
  }
  
  constructor(private route : ActivatedRoute,
    private bulkOrderService : BulkOrderService,
    private dialog: MatDialog) {
    this.route.paramMap.subscribe(
      params => {
        this.orderId =  parseInt(params.get("id"));
      });

    this.bulkOrderService.GetBulkOrderDetails(this.orderId).subscribe(
      data => {
        if(data.status == "Success"){
          if(data.employeeBulkOrders.length > 0){
            let orderDetails = data.employeeBulkOrders[0].employeeBulkOrderDetails;
            let requestedEmployee = data.employeeBulkOrders[0].employee;

            this.bulkRequestStatus = {
              fieldName : "Request Status",
              fieldValue : orderDetails.bulkOrderRequestStatus
            }

            this.requestBy  = {
              fieldName : "Request By",
              fieldValue : requestedEmployee.firstname
            }

            this.requestOn  = {
              fieldName : "Request On",
              fieldValue : orderDetails.createdOn.toString()
            }

            this.requiredOn  = {
              fieldName : "Required On",
              fieldValue : orderDetails.requirementDate.toString()
            }

            this.employeeId  = {
              fieldName : "Employee Id",
              fieldValue : requestedEmployee.id
            }

            this.reasonForRequirement = orderDetails.reasonForRequirement;
            this.listOfFieldToBeDisplayed.push(this.employeeId);
            this.listOfFieldToBeDisplayed.push(this.requestBy);
            this.listOfFieldToBeDisplayed.push(this.bulkRequestStatus);
            this.listOfFieldToBeDisplayed.push(this.requestOn);
            this.listOfFieldToBeDisplayed.push(this.requiredOn);
            
            let tempDataSource = [];
            orderDetails.itemsQuantityList.forEach(
              iq => {
                  let x = {
                    itemId : iq.item.id,
                    itemName : iq.item.name,
                    itemQuantity : iq.quantityOrdered,
                  }
                  tempDataSource.push(x);
                  this.bulkOrderItemQuantityMapping.push(iq);
              });
              this.dataSource = JSON.parse(JSON.stringify(tempDataSource));
          }

          this.employee = data.employeeBulkOrders[0].employee;
          this.employeeBulkOrderDetails = data.employeeBulkOrders[0].employeeBulkOrderDetails;
        }
      });
  }

  ngOnInit() {
  }

  addButtonClicked(data : TableData,event){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(BulkRequestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
          console.log(event); 
          const classList = event.target.parentNode.parentNode.parentNode.parentNode.classList;
          const classes = event.target.className;
          classes.includes('clicked') ? classList.remove('clicked') : classList.add('clicked');
          this.itemLocationQuaListToBeSent.push(result);
      }
      else{
        alert("Not Selected")
      }
    });
  }

  approveClicked(){
    alert("Approve Clicked");
    let blukOrderApproveData = new BlukOrderApprove();
    blukOrderApproveData.employee = this.employee;
    blukOrderApproveData.employeeBulkOrderDetails = this.employeeBulkOrderDetails;
    blukOrderApproveData.bulkOrderId = this.orderId;
    blukOrderApproveData.itemLocationQuantityMappings = this.itemLocationQuaListToBeSent;
    
    
    this.bulkOrderService.approveBulkOrder(this.orderId,blukOrderApproveData).subscribe(
      data=>{
        console.log(data);
      }
    )
  }

  cancelClicked(){
  this.bulkOrderService.cancelBulkOrder(this.orderId).subscribe(
    data=>{
      console.log(data);
    }
  )

  }

  callMe(column){
    console.log(column);
    return true;
  }

  rejectClicked(){
    this.bulkOrderService.rejectBulkOrder(this.orderId).subscribe(
      data=>{
        console.log(data);
      });
  }

  returnClicked(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.bulkOrderItemQuantityMapping;
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(BulkReturnDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        let bulkOrder = new BulkRequest();
        bulkOrder.bulkOrderId = this.orderId;
        bulkOrder.employee = this.employee;
        bulkOrder.employeeBulkOrderDetails = this.employeeBulkOrderDetails;
        console.log(bulkOrder.employeeBulkOrderDetails.itemsQuantityList);
        bulkOrder.employeeBulkOrderDetails.itemsQuantityList = result;

        this.bulkOrderService.returnBulkOrder(this.orderId,bulkOrder).subscribe(
          data=>{
            console.log(data);
          });
      }
    });

  }

  showApproveButton(){
    return this.bulkRequestStatus != null && this.bulkRequestStatus.fieldValue == "Pending";

  }

  showCancelButton(){
    return this.bulkRequestStatus != null && this.bulkRequestStatus.fieldValue == "Approved";

  }

  showRejectButton(){
    return this.bulkRequestStatus != null && this.bulkRequestStatus.fieldValue == "Pending";
  }

  showReturnButton(){
    return this.bulkRequestStatus != null && this.bulkRequestStatus.fieldValue == "Approved";

  }
}

export class FieldToBeDisplayed{
  fieldName : string;
  fieldValue : string;
}

export class TableData{
  itemId : string;
  itemName : string;
  itemQuantity : number;
}
