import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from 'src/app/IMS.Models/User/Role';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';

@Component({
  selector: 'app-user-manage-dialog',
  templateUrl: './user-manage-dialog.component.html',
  styleUrls: ['./user-manage-dialog.component.css']
})
export class UserAddDialogComponent implements OnInit {
  createUserForm : FormGroup
  roles : Role[];
  constructor( @Inject(MAT_DIALOG_DATA) data, formBuilder: FormBuilder, private userManageService: UserManagementService) { 
    this.createUserForm = formBuilder.group({
      username : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      role : ['',[Validators.required]],
      email : ["", [Validators.required, Validators.email]],
      firstname : ["", [Validators.required, Validators.maxLength]],
      lastname : ["",[]],
      password : ["", [Validators.minLength(8),Validators.maxLength(16)]]
  })
    console.log(data)
  }

  ngOnInit() {
    this.setUserRoles();
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

  createUser(){
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
