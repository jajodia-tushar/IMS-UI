import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BulkOrderService } from 'src/app/IMS.Services/admin/bulk-order.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { BulkRequestDialogComponent } from '../bulk-request-dialog/bulk-request-dialog.component';
import { Item } from 'src/app/IMS.Models/Item/Item';

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
  
  numberOfColumns() {
    return (this.displayedColumns.length - 1);
  }
  
  constructor(private route : ActivatedRoute,
    private bulkOrderService : BulkOrderService,
    private dialog: MatDialog,) {
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

            let bulkRequestStatus : FieldToBeDisplayed = {
              fieldName : "Request Status",
              fieldValue : orderDetails.bulkOrderRequestStatus
            }

            let requestBy : FieldToBeDisplayed = {
              fieldName : "Request By",
              fieldValue : requestedEmployee.firstname
            }

            let requestOn : FieldToBeDisplayed = {
              fieldName : "Request On",
              fieldValue : orderDetails.createdOn.toString()
            }

            let requiredOn : FieldToBeDisplayed = {
              fieldName : "Required On",
              fieldValue : orderDetails.requirementDate.toString()
            }

            let employeeId : FieldToBeDisplayed = {
              fieldName : "Employee Id",
              fieldValue : requestedEmployee.id
            }

            this.reasonForRequirement = orderDetails.reasonForRequirement;
            this.listOfFieldToBeDisplayed.push(employeeId);
            this.listOfFieldToBeDisplayed.push(requestBy);
            this.listOfFieldToBeDisplayed.push(bulkRequestStatus);
            this.listOfFieldToBeDisplayed.push(requestOn);
            this.listOfFieldToBeDisplayed.push(requiredOn);
            
            let tempDataSource = [];
            orderDetails.itemsQuantityList.forEach(
              iq => {
                  let x = {
                    itemId : iq.item.id,
                    itemName : iq.item.name,
                    itemQuantity : iq.quantityOrdered
                  }
                  tempDataSource.push(x);
              });
              this.dataSource = JSON.parse(JSON.stringify(tempDataSource));
          }
        }
      });
  }

  ngOnInit() {
  }

  addButtonClicked(data : TableData){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.panelClass = 'dialog-user-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(BulkRequestDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
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
