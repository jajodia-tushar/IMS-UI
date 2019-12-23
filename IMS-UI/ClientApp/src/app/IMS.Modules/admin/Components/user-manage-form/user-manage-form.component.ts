import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';
import { User } from 'src/app/IMS.Models/User/User';
import { Role } from 'src/app/IMS.Models/User/Role';
import { RolesResponse } from 'src/app/IMS.Models/User/RolesResponse';

@Component({
  selector: 'app-user-manage-form',
  templateUrl: './user-manage-form.component.html',
  styleUrls: ['./user-manage-form.component.css']
})
export class UserManageFormComponent implements OnInit{
  createUserForm : FormGroup
  roles : Role[];
  constructor(formBuilder: FormBuilder, private userManageService: UserManagementService){
    this.createUserForm = formBuilder.group({
        id : ['',[]],
        username : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        role : ['',[Validators.required]],
        email : ["", [Validators.required, Validators.email]],
        firstname : ["", [Validators.required, Validators.maxLength]],
        lastname : ["",[]],
        password : ["", [Validators.minLength(8),Validators.maxLength(16)]]
    })
  }

  @Input() userDetails;
  isEditUserForm : boolean;
  
  ngOnInit(){
    this.setUserRoles();
    if(this.userDetails){
      // delete this.userDetails.id;
      console.log('onInit called')
      this.isEditUserForm = this.userDetails?true: false;
      this.createUserForm.setValue(this.userDetails);
      console.log(this.isEditUserForm);
    }
  }
  
  async setUserRoles(){
    // let roles : Role[] = (<RolesResponse> await this.userManageService.getAllRoles()).roles;
    let roles : Role[] = [
      {
      "id" : 1,
      "name" : "Admin"
      },
      {
        "id" : 2,
        "name" : "Clerk"
      },
      {
        "id" : 3,
        "name" : "Shelf"
      },
      {
        "id" : 4,
        "name" : "SuperAdmin"
      }
    ]
    this.roles = roles;
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

  editUserDetails(){
    let user: User = <User>this.createUserForm.getRawValue();
    console.log(user);
  }

  createNewUser(){
    let user: User = <User>this.createUserForm.getRawValue();
    console.log(user);
    // let response = this.userManageService.createUser(user);
    let response = true;
    if(!response){
      this.createUserForm.setErrors({
      })
    }
  }

}
