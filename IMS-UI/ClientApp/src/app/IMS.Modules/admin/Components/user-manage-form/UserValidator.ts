import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class UserValidators{



    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).trim().indexOf(' ') >= 0){
            return {cannotContainSpace: true}
        }
        return null;
    }
       
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
          return null;
        }
        const valid = regex.test(control.value);
        return valid ? null : error;
      };
    }

    static userNameTakenValidator(userNameControl: AbstractControl) : Promise<ValidationErrors> |null {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (userNameControl.value=="Aniket") {
                resolve({ userNameNotAvailable: true });
              } else {
                resolve(null);
              }
            }, 2000);
          });
    }
      

      static emailTakenValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
          setTimeout(() => {
            if (userControl.value=="1singlaaniket@gmail.com") {
              resolve({ emailNotAvailable: true });
            } else {
              resolve(null);
            }
          }, 2000);
        });
      }
    
}