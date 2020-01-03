import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Injectable } from "@angular/core";
import { UserManagementService } from "./user-management.service";
import { Response } from "src/app/IMS.Models/Response";
import { FindValueSubscriber } from "rxjs/internal/operators/find";
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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (!this.checkIfUserNameDoesNotExists(userNameControl.value)) {
                console.log("username exists and thrown error");
                resolve({ userNameNotAvailable: true });
              } else {
                console.log('did not throw error')
                resolve(null);
              }
            }, 5000);
          });
    }
      

    emailTakenValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
          setTimeout(() => {
            if (this.checkIfEmailExists(userControl.value)) {              
              resolve({ emailNotAvailable: true });
            } else {
              resolve(null);
            }
          }, 2000);
        });
        
          
        
    }
    

    async checkIfUserNameDoesNotExists(username : string){
      let response = <Response> await this.userManagementService.validateUsername(username)
      console.log(response);
      if(response.status==="Success"){
        console.log("username Does not exists");
        return true;
      }
      else if(response.status==="Failure"){
        console.log("username exists");
        return false;
      }
    }

    async checkIfEmailExists(email : string){
      let response = <Response> await this.userManagementService.validateEmail(email)
      if(response.error==null){
        return false;
      }
      else{
        return true;
      }
    }


}