import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { MatSort, MatDialog, MatTableDataSource, MatDialogConfig, MatSnackBar } from '@angular/material';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';
import { EmployeeResponse } from 'src/app/IMS.Models/Employee/EmployeeResponse';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';
import { EmployeeManageDialogComponent } from '../employee-manage-dialog/employee-manage-dialog.component';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'isActive', 'mobileNumber', 'tCardNo', 'actions'];
  ELEMENT_DATA: Employee[];

  dataSource

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    await this.setEmployees();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    console.log(this.dataSource)
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  openAddEmployeeDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = null;
    dialogConfig.panelClass = 'dialog-employee-manage';
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(EmployeeManageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Employee Creation Failed", 'warn');
      }
      else if (result == "cancelled") {
        //don't show any message.
      }
      else {
        showMessage(this.snackBar, 2, "Employee was Created", 'success');
      }
    }
    );
  }


  async setEmployees() {
    let employeesResponse: EmployeesResponse = await this.employeeService.getAllEmployees().toPromise();
    let listOfEmployees = employeesResponse.employees;
    this.ELEMENT_DATA = listOfEmployees;
  }

}
