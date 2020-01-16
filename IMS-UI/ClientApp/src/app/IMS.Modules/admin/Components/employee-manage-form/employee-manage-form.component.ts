import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/IMS.Services/employee/employee.service';
import { EmployeeValidatorsService } from 'src/app/IMS.Services/admin/employee-validators.service';
import { EmployeesResponse } from 'src/app/IMS.Models/Employee/EmployeesResponse';
import { Employee } from 'src/app/IMS.Models/Employee/Employee';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';

@Component({
  selector: 'app-employee-manage-form',
  templateUrl: './employee-manage-form.component.html',
  styleUrls: ['./employee-manage-form.component.css']
})
export class EmployeeManageFormComponent implements OnInit {


  createEmployeeForm: FormGroup;
  updateButtonText: string = "Update";
  submitButtonText: string = "Submit";
  @Input() employeeDetails: Employee;
  @Output() employeeEditted: EventEmitter<EmployeesResponse> = new EventEmitter<EmployeesResponse>();
  @Output() employeeCreated: EventEmitter<EmployeesResponse> = new EventEmitter<EmployeesResponse>();
  isEditEmployeeForm: boolean;

  constructor(private formBuilder: FormBuilder, private employeeServive: EmployeeService, private employeeValidators: EmployeeValidatorsService, centeralizedDataService: CentralizedDataService) {

    this.createEmployeeForm = this.formBuilder.group({
      id: [8888, []],
      firstname: ["", [Validators.required, Validators.maxLength(16), this.employeeValidators.cannotContainSpace]],
      lastname: ["", [this.employeeValidators.cannotContainSpace, Validators.maxLength(16)]],
      email: ["", [Validators.required, Validators.email]],


    })
  }

  get id() {
    return this.createEmployeeForm.get('id');
  }

  get firstname() {
    return this.createEmployeeForm.get('firstname');
  }

  get lastname() {
    return this.createEmployeeForm.get('lastname');
  }
  get email() {
    return this.createEmployeeForm.get('email');
  }
  async editEmployeeDetails() {
    let employee: Employee = <Employee>this.createEmployeeForm.getRawValue();
    let edittedEmployee: EmployeesResponse = <EmployeesResponse>await this.employeeServive.editEmployee(employee);
    this.employeeEditted.emit(edittedEmployee);
  }

  async createNewEmployee() {
    let employee: Employee = <Employee>this.createEmployeeForm.getRawValue();
    let createdEmployee: EmployeesResponse = <EmployeesResponse>await this.employeeServive.createEmployee(employee);
    this.employeeCreated.emit(createdEmployee);
  }

  submitForm() {
    //create user or update existing user based on editUserForm variable
    if (this.isEditEmployeeForm) {
      this.editEmployeeDetails();
    }
    else {
      this.createNewEmployee();
    }
    this.submitButtonText = this.updateButtonText = "";
  }


  cancelUpdate() {
    this.employeeEditted.emit(null);
  }

  cancelCreate() {
    this.employeeCreated.emit(null);
  }




  ngOnInit() {
    if (this.employeeDetails) {
      this.isEditEmployeeForm = this.employeeDetails ? true : false;
    }
  }

}
