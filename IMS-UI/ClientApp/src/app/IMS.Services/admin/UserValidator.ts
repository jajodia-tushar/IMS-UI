import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Injectable } from "@angular/core";
import { UserManagementService } from "./user-management.service";
import { Response } from "src/app/IMS.Models/Response";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserValidators{

    constructor(private userManagementService : UserManagementService){}

    cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).trim().indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        return null;
    }
       
    patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
          return null;
        }
        const valid = regex.test(control.value);
        return valid ? null : error;
      };
    }

    async userNameTakenValidator(userNameControl: AbstractControl) {
      let response = await this.checkIfUserNameDoesNotExists(userNameControl.value);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
               if (!response) {
                resolve({ userNameNotAvailable: true });
              } else {
                resolve(null);
              }
            }, 2000);
          });
    }
      

    async emailTakenValidator(userEmailControl: AbstractControl) {
      let response = await this.checkIfEmailDoesNotExists(userEmailControl.value);
        return new Promise(resolve => {
          setTimeout(() => {
            if (!response) {
              resolve({ emailNotAvailable: true });
            } else {
              resolve(null);
            }
          }, 2000);
        });
    }
    

    async checkIfUserNameDoesNotExists(username : string){
      let response = <Response> await this.userManagementService.validateUsername(username)
      if(response.status==="Success"){
        return true;
      }
      else if(response.status==="Failure"){
        return false;
      }
    }

    async checkIfEmailDoesNotExists(email : string){
      let response = <Response> await this.userManagementService.validateEmail(email)
      if(response.status==="Success"){
        return true;
      }
      else if(response.status==="Failure"){
        return false;
      }
    }
}