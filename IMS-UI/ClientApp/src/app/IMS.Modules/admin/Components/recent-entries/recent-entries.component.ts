import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { EmployeeOrderMapping } from 'src/app/IMS.Models/Employee/EmployeeOrderMapping';
import { EmployeeOrderService } from 'src/app/IMS.Services/employee/employee-order.service';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';

@Component({
  selector: 'app-recent-entries',
  templateUrl: './recent-entries.component.html',
  styleUrls: ['./recent-entries.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecentEntriesComponent implements OnInit {
 
  recentEntriesData: CustomRecentEntriesResponse[] = [];
  dataSource = new MatTableDataSource<CustomRecentEntriesResponse>(this.recentEntriesData);
  recentOrdersList: EmployeeOrderMapping[];
  columnsToDisplay = ['employeeDetails', 'date'];
  expandedElement: CustomRecentEntriesResponse | null;

  constructor(private employeeOrderService: EmployeeOrderService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    return this.employeeOrderService.getRecentEntries().subscribe(
      data => {
        this.recentOrdersList = data.employeeOrders;
        for (let i = 0; i < this.recentOrdersList.length; i++) {
          let recentOrder = this.recentOrdersList[i];
          let response = new CustomRecentEntriesResponse;
          this.extractEmployeeDetails(recentOrder, response);
          this.extractResponseDetails(recentOrder, response);

          response.date = recentOrder.employeeOrderDetails.date;
          response.date = response.date.split('T')[0].substring(5);
          response.time = recentOrder.employeeOrderDetails.date.split('T')[1].substr(0, 5);
          this.recentEntriesData.push(response);
        }
        this.recentEntriesData = JSON.parse(JSON.stringify(this.recentEntriesData));
        this.dataSource.data = this.recentEntriesData;
      },
      error => {
        showMessage(this.snackBar, 5, error, "warn");
      });
  }
  extractEmployeeDetails(recentOrder: EmployeeOrderMapping, response: CustomRecentEntriesResponse): void {
    let employeeId = recentOrder.employee.id;
    let employeeName = recentOrder.employee.firstname;
    let totalItemsTaken = recentOrder.employeeOrderDetails.employeeItemsQuantityList.length;
    response.employeeDetails = employeeName + ' Picked ' + totalItemsTaken + ' items';
  }
  extractResponseDetails(recentOrder: EmployeeOrderMapping, response: CustomRecentEntriesResponse): void {
    response.orderDetails = '';
    let itemsQuantityList = recentOrder.employeeOrderDetails.employeeItemsQuantityList;
    for (let i = 0; i < itemsQuantityList.length; i++) {
      response.orderDetails += itemsQuantityList[i].item.name + '-' + itemsQuantityList[i].quantity;
      if (i + 1 != itemsQuantityList.length)
        response.orderDetails += ', ';
    }
    response.orderDetails.trim();
  }
}
export class CustomRecentEntriesResponse {
  employeeDetails: string;
  orderDetails: string;
  date: string;
  time: string;
}
