import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';

@Component({
  selector: 'app-employee-manage-dialog',
  templateUrl: './employee-manage-dialog.component.html',
  styleUrls: ['./employee-manage-dialog.component.css']
})
export class EmployeeManageDialogComponent implements OnInit {
  employeeData: Employee;
  constructor(private dialogRef: MatDialogRef<EmployeeManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.employeeData = data;

  }

  ngOnInit() {
  }

  notifyTableEmployeeEditted(employeesResponse: EmployeesResponse) {
    if (employeesResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (employeesResponse.error == null) {
      this.dialogRef.close(employeesResponse.employees[0]);
    }
    else if (employeesResponse.error != null) {
      this.dialogRef.close(false);
    }
  }

  notifyTableEmployeeCreated(employeesResponse: EmployeesResponse) {
    if (employeesResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (employeesResponse.error == null) {
      this.dialogRef.close(employeesResponse.employees[0]);
    }
    else if (employeesResponse.error != null) {
      this.dialogRef.close(false);
    }
  }


}
