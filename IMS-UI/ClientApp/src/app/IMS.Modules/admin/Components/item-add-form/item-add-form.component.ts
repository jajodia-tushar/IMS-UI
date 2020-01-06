import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-item-add-form',
  templateUrl: './item-add-form.component.html',
  styleUrls: ['./item-add-form.component.css']
})
export class ItemAddFormComponent {
  createUserForm : FormGroup
  constructor(formBuilder: FormBuilder){
    this.createUserForm = formBuilder.group({
      itemName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      maxLimit: ["", [Validators.required, Validators.maxLength(5)]],
      rate : ["", [Validators.required, Validators.maxLength(5)]],
      shelfRedLimit: ["", [Validators.required, Validators.maxLength(5)]],
      shelfAmberLimit: ["", [Validators.required, Validators.maxLength(5)]],
      warehouseRedLimit: ["", [Validators.required, Validators.maxLength(5)]],
      warehouseAmberLimit: ["", [Validators.required, Validators.maxLength(5)]]
    })
  }


  get itemName(){
    return this.createUserForm.get('itemName');
  }

  get maxLimit(){
    return this.createUserForm.get('maxLimit');
  }

  get rate(){
    return this.createUserForm.get('rate');
  }

  get shelfRedLimit(){
    return this.createUserForm.get('shelfRedLimit');
  }

  get shelfAmberLimit(){
    return this.createUserForm.get('shelfAmberLimit');
  }

  get warehouseRedLimit() {
    return this.createUserForm.get('shelfRedLimit');
  }

  get warehouseAmberLimit() {
    return this.createUserForm.get('shelfRedLimit');
  }

  createItem(){
    let isValid = true//callService();
    if(!isValid){
      this.createUserForm.setErrors({
      })
    }
  }

}
