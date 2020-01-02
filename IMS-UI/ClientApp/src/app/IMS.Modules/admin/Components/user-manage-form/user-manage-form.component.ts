import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { RolesResponse } from 'src/app/IMS.Models/User/RolesResponse';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { LoginService } from 'src/app/IMS.Services/login/login.service';
import { UserResponse } from 'src/app/IMS.Models/User/UserResponse';
import { UsersResponse } from 'src/app/IMS.Models/User/UsersResponse';

@Component({
  selector: 'app-user-manage-form',
  templateUrl: './user-manage-form.component.html',
  styleUrls: ['./user-manage-form.component.css']
})
export class UserManageFormComponent implements OnInit{
  createUserForm : FormGroup
  roles : Role[];
  constructor(private formBuilder: FormBuilder, private userManageService: UserManagementService,
    private centralizedDataRepo: CentralizedDataService){

      this.createUserForm = this.formBuilder.group({
        id : [ -1,[]],
        role : ["",[Validators.required]],
        firstname : ["", [Validators.required, Validators.maxLength(16),this.cannotContainSpace]],
        lastname : ["",[this.cannotContainSpace, Validators.maxLength(16)]],
        username : ["",[Validators.required, Validators.minLength(6), Validators.maxLength(15), this.cannotContainSpace]],
        password : ["", [Validators.minLength(8),Validators.maxLength(16),this.cannotContainSpace,
          this.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
          this.patternValidator(/\d/, {hasNumber: true}),
          this.patternValidator(/[a-z]/, {hasSmallCase: true}),
          this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters: true}),
        ]],
        email : ["", [Validators.required, Validators.email]],
    })
  }

  @Input() userDetails : User;
  @Output() userEditted : EventEmitter<UsersResponse> = new EventEmitter<UsersResponse>();
  @Output() userCreated : EventEmitter<UsersResponse> = new EventEmitter<UsersResponse>();
  isEditUserForm : boolean;
  isSuperAdmin : boolean;
  
  async ngOnInit(){
    if (this.roles==null || this.roles==undefined)
       this.setUserRoles();
    if(this.centralizedDataRepo.getUser().role.id==4)
      this.isSuperAdmin = true;
    if(this.userDetails){
      this.isEditUserForm = this.userDetails?true: false;

    }
    
    
    if(this.isEditUserForm){
      let userDetail = this.userDetails;
      userDetail.password = "Dummy Password";
      this.createUserForm.setValue(userDetail);
      this.createUserForm.get("username").disable();
      this.createUserForm.get("password").disable();
    }
    if(!this.isSuperAdmin && this.isEditUserForm){
      this.createUserForm.get("role").disable();
    }
   
  }
  
  async setUserRoles(){
    let roles : Role[] = await this.userManageService.getAllRolesFromService();
    this.roles = roles;
  }
  
  async editUserDetails(){
    let user: User = <User>this.createUserForm.getRawValue();
    let edittedUser: UsersResponse = <UsersResponse> await this.userManageService.editUser(user);
    this.userEditted.emit(edittedUser);
  }

  async createNewUser(){
    let user: User = <User>this.createUserForm.getRawValue();
    let createdUser: UsersResponse = <UsersResponse>await this.userManageService.createUser(user);
    this.userCreated.emit(createdUser);
  }

  get username(){
    return this.createUserForm.get('username');
  }

  get id(){
    return this.createUserForm.get('id');
  }

  get role(){
    return this.createUserForm.get('role');
  }

  get email(){
    return this.createUserForm.get('email');
  }

  get firstname(){
    return this.createUserForm.get('firstname');
  }

  get lastname(){
    return this.createUserForm.get('lastname');
  }

  get password(){
    return this.createUserForm.get('password');
  }

  submitForm(){
    //create user or update existing user based on editUserForm variable
    if(this.isEditUserForm){
      this.editUserDetails();
    }
    else{
      this.createNewUser();
    }
  }

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

  cancelUpdate(){
    this.userEditted.emit(null);
  }

  cancelCreate(){
    this.userCreated.emit(null);
  }


}
