import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ItemManagementComponent } from '../item-management/item-management.component';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemManagementService } from 'src/app/IMS.Services/admin/item-management.service';

@Component({
  selector: 'app-item-manage-form',
  templateUrl: './item-manage-form.component.html',
  styleUrls: ['./item-manage-form.component.css']
})
export class ItemManageFormComponent {
  createItemForm: FormGroup
  constructor(formBuilder: FormBuilder, private itemManageService: ItemManagementService) {
    this.createItemForm = formBuilder.group({
      itemName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      maxLimit: ["", [Validators.required, Validators.maxLength(5)]],
      rate : ["", [Validators.required, Validators.maxLength(5)]],
      shelfRedLimit: ["", [Validators.required, Validators.maxLength(5)]],
      shelfAmberLimit: ["", [Validators.required, Validators.maxLength(5)]],
      warehouseRedLimit: ["", [Validators.required, Validators.maxLength(5)]],
      warehouseAmberLimit: ["", [Validators.required, Validators.maxLength(5)]]
    })
  }

  @Input() itemDetails;
  isEditItemForm: Boolean;

  ngOnInit() {
      if (this.itemDetails) {
        this.isEditItemForm=this.itemDetails?true:false;
        this.createItemForm.setValue(this.itemDetails);
      }
  }

  submitForm(){
    //create user or update existing user based on editUserForm variable
    if(this.isEditItemForm){
      this.editItemDetails();
    }
    else{
      this.createNewItem();
    }
  }

  editItemDetails(){
    let item: Item = <Item>this.createItemForm.getRawValue();
    this.itemManageService.editItem(item);
    console.log(item);
  }

  createNewItem(){
    let item: Item = <Item>this.createItemForm.getRawValue();
    console.log(item);
    let response = true;
    if(!response){
      this.createItemForm.setErrors({
      })
    }
  }
}
