import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ItemManagementComponent } from '../item-management/item-management.component';
import { Item } from 'src/app/IMS.Models/Item/Item';
import { ItemManagementService } from 'src/app/IMS.Services/admin/item-management.service';

@Component({
  selector: 'app-item-add-form',
  templateUrl: './item-add-form.component.html',
  styleUrls: ['./item-add-form.component.css']
})
export class ItemAddFormComponent {
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


  get itemName(){
    return this.createItemForm.get('itemName');
  }

  get maxLimit(){
    return this.createItemForm.get('maxLimit');
  }

  get rate(){
    return this.createItemForm.get('rate');
  }

  get shelfRedLimit(){
    return this.createItemForm.get('shelfRedLimit');
  }

  get shelfAmberLimit(){
    return this.createItemForm.get('shelfAmberLimit');
  }

  get warehouseRedLimit() {
    return this.createItemForm.get('shelfRedLimit');
  }

  get warehouseAmberLimit() {
    return this.createItemForm.get('shelfRedLimit');
  }

  createItem() {
    let item: Item = <Item>this.createItemForm.getRawValue();
    console.log(item);
    //let response = this.itemManageService.createItem(item);
    let response = true;
    if (!response) {
      this.createItemForm.setErrors({
      })
    }
  }
}
