import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BulkOrderService } from 'src/app/IMS.Services/admin/bulk-order.service';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { BulkRequestDialogComponent } from '../bulk-request-dialog/bulk-request-dialog.component';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemLocationQuantityMapping, EmployeeBulkOrderDetails, BlukOrderApprove, BulkOrderItemQuantityMapping, BulkRequest } from 'src/app/IMS.Models/Employee/BulkRequest';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { BulkReturnDialogComponent } from '../bulk-return-dialog/bulk-return-dialog.component';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router : Router) {
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
          const classes = event.target.parentNode.parentNode.parentNode.parentNode.className;
          this.itemLocationQuaListToBeSent.push(result);

          if(classes.includes('clicked'))
            showMessage(this.snackBar, 2, "Allocated Quantity for item "+data.itemName+" has been Changed");
          else{
            classList.add('clicked');
            showMessage(this.snackBar, 2, "Allocated Quantity for item "+data.itemName);
          }          
      }
      else{
        showMessage(this.snackBar, 2, "Quantity for item "+data.itemName+" not Allocated");
      }
    });
  }

  approveClicked(){
    let blukOrderApproveData = new BlukOrderApprove();
    blukOrderApproveData.employee = this.employee;
    blukOrderApproveData.employeeBulkOrderDetails = this.employeeBulkOrderDetails;
    blukOrderApproveData.bulkOrderId = this.orderId;
    blukOrderApproveData.itemLocationQuantityMappings = this.itemLocationQuaListToBeSent;

    if(blukOrderApproveData.itemLocationQuantityMappings.length != this.dataSource.length){
      showMessage(this.snackBar, 2, "Please Select The Quantity for All items in List ");
      return;
    }
    
    this.bulkOrderService.approveBulkOrder(this.orderId,blukOrderApproveData).subscribe(
      data=>{
        if(data.status == "Success"){
          showMessage(this.snackBar, 2, "The Order Has Been Approved");
          this.router.navigateByUrl("/Admin/Notifications");
        }
        else{
          showMessage(this.snackBar, 2, data.error.errorMessage);
        }
      }
    )
  }

  cancelClicked(){
  this.bulkOrderService.cancelBulkOrder(this.orderId).subscribe(
    data=>{
      if(data.status == "Success"){
        showMessage(this.snackBar, 2, "The Order Has Been Cancelled");
        this.router.navigateByUrl("/Admin/Notifications");
      }
      else{
        showMessage(this.snackBar, 2, data.error.errorMessage);
      }
    }
  )

  }


  rejectClicked(){
    this.bulkOrderService.rejectBulkOrder(this.orderId).subscribe(
      data=>{
        if(data.status == "Success"){
          showMessage(this.snackBar, 2, "The Order Has Been Rejected");
          this.router.navigateByUrl("/Admin/Notifications");
        }
        else{
          showMessage(this.snackBar, 2, data.error.errorMessage);
        }
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
        let bulkOrder = new BulkRequest();
        bulkOrder.bulkOrderId = this.orderId;
        bulkOrder.employee = this.employee;
        bulkOrder.employeeBulkOrderDetails = this.employeeBulkOrderDetails;
        bulkOrder.employeeBulkOrderDetails.itemsQuantityList = result;

        this.bulkOrderService.returnBulkOrder(this.orderId,bulkOrder).subscribe(
          data=>{
            if(data.status == "Success"){
              showMessage(this.snackBar, 2, "The Order Has Been Returned");
              this.router.navigateByUrl("/Admin/Notifications");
            }
            else{
              showMessage(this.snackBar, 2, data.error.errorMessage);
            }
          });
      }
      else{
        showMessage(this.snackBar, 2, "The Action was Cancelled");

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
