import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrls: ['./user-add-form.component.css']
})
export class UserAddFormComponent {
  createUserForm : FormGroup
  constructor(formBuilder: FormBuilder){
    this.createUserForm = formBuilder.group({
        userName : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        userMail : ["", [Validators.required, Validators.email]],
        firstName : ["", [Validators.required, Validators.maxLength]],
        lastName : ["",[]],
        password : ["", [Validators.minLength(8),Validators.maxLength(16)]]
    })
  }


  get userName(){
    return this.createUserForm.get('userName');
  }

  get userMail(){
    return this.createUserForm.get('userMail');
  }

  get firstName(){
    return this.createUserForm.get('firstName');
  }

  get lastName(){
    return this.createUserForm.get('lastName');
  }

  get password(){
    return this.createUserForm.get('password');
  }

  createUser(){
    let isValid = true//callService();
    if(!isValid){
      this.createUserForm.setErrors({
      })
    }
  }

}
