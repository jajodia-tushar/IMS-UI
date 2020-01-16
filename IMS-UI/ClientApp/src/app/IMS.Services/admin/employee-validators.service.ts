import { Injectable } from '@angular/core';
import { EmployeeService } from '../employee/employee.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Response } from "src/app/IMS.Models/Response";
@Injectable({
  providedIn: 'root'
})
export class EmployeeValidatorsService {

  constructor(private employeeService: EmployeeService) { }

  cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).trim().indexOf(' ') >= 0) {
      return { cannotContainSpace: true }
    }
    return null;
  }

  // async emailTakenValidator(userEmailControl: AbstractControl) {
  //   let response = await this.checkIfEmailDoesNotExists(userEmailControl.value);
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       if (!response) {
  //         resolve({ emailNotAvailable: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });

  // }

  async checkIfEmailDoesNotExists(email: string) {
    let response = <Response>await this.employeeService.validateEmail(email)
    if (response.status === "Success") {
      return true;
    }
    else if (response.status === "Failure") {
      return false;
    }
  }



}
