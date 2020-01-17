import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { MatSort, MatDialog, MatTableDataSource, MatDialogConfig, MatSnackBar, MatPaginator } from '@angular/material';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';
import { EmployeeManageDialogComponent } from '../employee-manage-dialog/employee-manage-dialog.component';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { DeactivateDialogComponent } from '../deactivate-dialog/deactivate-dialog.component';
import { DeactivateDialogcomponentEmployeeComponent } from '../deactivate-dialogcomponent-employee/deactivate-dialogcomponent-employee.component';
import { PagingInformation } from 'src/app/IMS.Models/Admin/StockStatusResponse';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'contactNumber', 'temporaryCardNumber', 'accessCardNumber', 'actions'];
  ELEMENT_DATA: Employee[];

  dataSource


  @Input() event: Employee;
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
      else if ('firstname' in result) {
        this.ELEMENT_DATA.push(<Employee>result);
        this.dataSource.data = this.ELEMENT_DATA;
        showMessage(this.snackBar, 2, "Employee was Created", 'success');
      }
    }
    );
  }

  editEmployee(employee: Employee) {

    this.openEditEmployeeDialog(employee);

  }
  openEditEmployeeDialog(data: Employee) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.panelClass = "dialog-employee-manage";
    dialogConfig.disableClose = true;
    console.log(data)
    const dialogRef = this.dialog.open(EmployeeManageDialogComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Employee Updation Failed", "warn");
      }
      else if (result == "cancelled") {

      }
      else if ('firstname' in result) { this.editEmployeeIntable(result); }
    })
  }
  editEmployeeIntable(employee) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {

      if (this.ELEMENT_DATA[index].id == employee.id) {
        this.ELEMENT_DATA[index] = employee;
        break;
      }
    }

    this.dataSource.data = this.ELEMENT_DATA;
    showMessage(this.snackBar, 2, "Employee Details Updated Successfully", "success")
  }

  async setEmployees() {
    let employeelist: Employee[] = (<EmployeesResponse>await this.employeeService.getAllEmployees()).employees;
    this.ELEMENT_DATA = employeelist;
  }

  deactivateEmployee(employee) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = employee;
    dialogConfig.panelClass = "dialog-employee-manage";
    const dialogRef = this.dialog.open(DeactivateDialogcomponentEmployeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.deleteEmployeeFromTableById(employee.id);
        showMessage(this.snackBar, 2, "Employee was deleted Successfully", "success");
      }
      if (result == false) {
        showMessage(this.snackBar, 2, "Deleting Employee Failed", "warn");
      }
    });
  }
  deleteEmployeeFromTableById(id) {
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === id) {
        this.ELEMENT_DATA.splice(index, 1);
        break;
      }

    }
    this.dataSource.data = this.ELEMENT_DATA;
  }


}

