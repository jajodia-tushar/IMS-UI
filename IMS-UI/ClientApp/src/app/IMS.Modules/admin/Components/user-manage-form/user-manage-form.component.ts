import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
    
  }

  @Input() userDetails;
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
      // delete this.userDetails.id;
      console.log('onInit called')
      this.isEditUserForm = this.userDetails?true: false;
      console.log(this.isEditUserForm);
    }
    
    this.createUserForm = this.formBuilder.group({
      id : [ -1,[]],
      username : [{value:'', disabled:this.isEditUserForm},[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      role : [{value:{},disabled:!this.isSuperAdmin && this.isEditUserForm},[Validators.required]],
      email : ["", [Validators.required, Validators.email]],
      firstname : ["", [Validators.required, Validators.maxLength]],
      lastname : ["",[]],
      password : [{value:"",disabled:this.isEditUserForm}, [Validators.minLength(8),Validators.maxLength(16)]]
  })
    if(this.isEditUserForm){
      this.createUserForm.setValue(this.userDetails);
    }
   
  }
  
  async setUserRoles(){
    let roles : Role[] = (<RolesResponse> await this.userManageService.getAllRoles()).roles;
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
    // if(createdUser==null){
    //   // show snackbar
    // }
    // else if(createdUser.error==null){
    //   //pass to the dialog, and also show snackbar. If admin don't emit , if superadmin emit user
    // }
    // if(this.isSuperAdmin){
    //   // create and Show that User Was Created . Also Check for error
    // }
    // else{
    //   // user is admin. Just show a message that request is pending.
    // }



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

  cancelUpdate(){
    this.userEditted.emit(null);
  }

  cancelCreate(){
    this.userCreated.emit(null);
  }


}
