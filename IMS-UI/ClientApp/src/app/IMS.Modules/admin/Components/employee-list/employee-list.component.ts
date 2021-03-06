import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { MatSort, MatDialog, MatTableDataSource, MatDialogConfig, MatSnackBar, MatPaginator } from '@angular/material';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';
import { EmployeeManageDialogComponent } from '../employee-manage-dialog/employee-manage-dialog.component';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';
import { DeactivateDialogcomponentEmployeeComponent } from '../deactivate-dialogcomponent-employee/deactivate-dialogcomponent-employee.component';
import { PagingInfo } from 'src/app/IMS.Models/Shared/PagingInfo';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'contactNumber', 'temporaryCardNumber', 'accessCardNumber', 'actions'];
  ELEMENT_DATA: Employee[];
  dataSource: MatTableDataSource<any>;
  filter = "";
  pageSizeOptions: number[] = [5, 10, 15, 20];
  employeesResponse: EmployeesResponse;
  paginator: MatPaginator;
  pagingInfo: PagingInfo = new PagingInfo();
  @Output()
  paginatorClicked: EventEmitter<any> = new EventEmitter();
  @Input() event: Employee;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  numberOfColumns() {
    return (this.displayedColumns.length - 1);
  }
  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.pagingInfo = new PagingInfo();
    this.pagingInfo.pageNumber = 1;
    this.pagingInfo.pageSize = 10;
    this.pagingInfo.totalResults = 100;
    await this.setEmployees();
  }

  async applyFilter(filterValue: string) {
    let employeesResponse = <EmployeesResponse>await this.employeeService.getAllEmployees(this.pagingInfo.pageNumber, this.pagingInfo.pageSize, filterValue)
      .then(
        data => {
          this.dataSource.data = data.employees;
          this.filter = filterValue;
          if (data.status == "Failure") {
            this.pagingInfo.pageSize = 0;
            this.pagingInfo.totalResults = 0;
            this.paginator.pageIndex = 0;
          }
          else {
            this.pagingInfo.pageSize = data.pagingInfo.pageSize;
            this.pagingInfo.totalResults = data.pagingInfo.totalResults;
            this.paginator.pageIndex = 0;
          }

        });
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

      }
      else if ('firstname' in result) {
        if (this.filter)
          this.applyFilter(this.filter);
        this.ELEMENT_DATA = this.dataSource.data;
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
    const dialogRef = this.dialog.open(EmployeeManageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        showMessage(this.snackBar, 2, "Employee Updation Failed", "warn");
      }
      else if (result == "cancelled") {

      }
      else if ('id' in result) { this.editEmployeeIntable(result); }
    })
  }
  editEmployeeIntable(employee) {
    if (this.filter)
      this.applyFilter(this.filter);
    this.ELEMENT_DATA = this.dataSource.data;
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
    let employeeResponse: EmployeesResponse = (<EmployeesResponse>await this.employeeService.getAllEmployees(this.pagingInfo.pageNumber, this.pagingInfo.pageSize));
    let employeelist = employeeResponse.employees;
    this.dataSource = new MatTableDataSource(employeelist);
    this.ELEMENT_DATA = employeelist;
    this.pagingInfo.totalResults = employeeResponse.pagingInfo.totalResults;
  }

  async pageChange(event) {
    let employeesResponse: EmployeesResponse = await this.employeeService.getAllEmployees(event.pageIndex + 1, event.pageSize, this.filter);
    this.dataSource.data = employeesResponse.employees;
    this.pagingInfo.pageSize = employeesResponse.pagingInfo.pageSize;
    this.pagingInfo.totalResults = employeesResponse.pagingInfo.totalResults;
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
    if (this.filter)
      this.applyFilter(this.filter);
    this.ELEMENT_DATA = this.dataSource.data;
    for (var index = 0; index < this.ELEMENT_DATA.length; index++) {
      if (this.ELEMENT_DATA[index].id === id) {
        this.ELEMENT_DATA.splice(index, 1);
        break;
      }
    }
    this.dataSource.data = this.ELEMENT_DATA;
  }
}

