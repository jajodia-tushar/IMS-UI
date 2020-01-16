import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { Response } from 'src/app/IMS.Models/Shared/Response';

@Component({
  selector: 'app-deactivate-dialogcomponent-employee',
  templateUrl: './deactivate-dialogcomponent-employee.component.html',
  styleUrls: ['./deactivate-dialogcomponent-employee.component.css']
})
export class DeactivateDialogcomponentEmployeeComponent implements OnInit {

  employee: Employee
  constructor(private dialogRef: MatDialogRef<DeactivateDialogcomponentEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data, private employeeService: EmployeeService,
    private snackBar: MatSnackBar) {
    this.employee = data;
  }

  confirmButtonText = "Yes";

  async onConfirm() {
    this.confirmButtonText = ""
    let response = <Response>await this.employeeService.deactivateEmployee(this.employee.id, false);
    if (response.error == null) {
      this.dialogRef.close(true);
    }
    else {
      this.dialogRef.close(false)
    }
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close("cancelled");
  }
  ngOnInit() {
  }

}
