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
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private employeeValidators: EmployeeValidatorsService, centeralizedDataService: CentralizedDataService) {

    this.createEmployeeForm = formBuilder.group({
      id: [, [Validators.required], [this.employeeValidators.employeeIdTakenValidator.bind(this.employeeValidators)]],
      firstname: ["", [Validators.required, Validators.maxLength(16), this.employeeValidators.cannotContainSpace]],
      lastname: ["", [this.employeeValidators.cannotContainSpace, Validators.maxLength(16)]],
      email: ["", [Validators.required, Validators.email], [this.employeeValidators.employeeEmailTakenValidator.bind(this.employeeValidators)]],
      contactNumber: ["", [Validators.maxLength(12)]],
      temporaryCardNumber: ["", []],
      accessCardNumber: ["", []],
      isActive: [true, []]
    })
  }

  @Input() employeeDetails: Employee;
  @Output() employeeEditted: EventEmitter<EmployeesResponse> = new EventEmitter<EmployeesResponse>();
  @Output() employeeCreated: EventEmitter<EmployeesResponse> = new EventEmitter<EmployeesResponse>();
  isEditEmployeeForm: boolean;


  async ngOnInit() {
    if (this.employeeDetails) {
      this.isEditEmployeeForm = this.employeeDetails ? true : false;

    }
    if (this.isEditEmployeeForm) {
      console.log("inside iseditedEmployeeform")
      let employeeDetail = this.employeeDetails;
      console.log(employeeDetail);
      this.createEmployeeForm.setValue(employeeDetail);
      this.createEmployeeForm.get("id").disable();
    }
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
    console.log("call on edit eemployee")
    let employee: Employee = <Employee>this.createEmployeeForm.getRawValue();
    let edittedEmployee: EmployeesResponse = <EmployeesResponse>await this.employeeService.editEmployee(employee);
    this.employeeEditted.emit(edittedEmployee);
    console.log(employee);
  }

  async createNewEmployee() {
    let employee: Employee = <Employee>this.createEmployeeForm.getRawValue();
    let createdEmployee: EmployeesResponse = <EmployeesResponse>await this.employeeService.createEmployee(employee);
    this.employeeCreated.emit(createdEmployee);
  }

  submitForm() {
    //create employee or update existing employee based on editEmployeeForm variable
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






}
