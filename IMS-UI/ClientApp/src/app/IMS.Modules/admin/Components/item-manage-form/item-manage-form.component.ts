import { Item } from './../../../../IMS.Models/Item/Item';
import { HttpClient } from '@angular/common/http';
import { ItemService } from 'src/app/IMS.Services/item/item.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { ItemsResponse } from 'src/app/IMS.Models/Item/ItemsResponse';
import { showMessage } from 'src/app/IMS.Modules/shared/utils/snackbar';

interface FileUrl {
  locationUrl: string;
}

@Component({
  selector: 'app-item-manage-form',
  templateUrl: './item-manage-form.component.html',
  styleUrls: ['./item-manage-form.component.css']
})
export class ItemManageFormComponent implements OnInit {
  createItemForm: FormGroup
  updateButtonText: string = "Update";
  submitButtonText: string = "Submit";
  constructor(formBuilder: FormBuilder, private itemService: ItemService, private http: HttpClient, private snackBar: MatSnackBar) {
    this.createItemForm = formBuilder.group({
      id: [-1, []],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      maxLimit: [null, [Validators.required]],
      isActive: [true, []],
      imageUrl: [''],
      rate: [null, [Validators.required]],
      shelvesRedLimit: [null, [Validators.required]],
      shelvesAmberLimit: [null, [Validators.required]],
      warehouseRedLimit: [null, [Validators.required]],
      warehouseAmberLimit: [null, [Validators.required]]
    })
  }

  @Input() itemDetails: Item;
  @Output() itemEditted: EventEmitter<ItemsResponse> = new EventEmitter<ItemsResponse>();
  @Output() itemCreated: EventEmitter<ItemsResponse> = new EventEmitter<ItemsResponse>();
  isEditItemForm: Boolean;
  fileToUpload: File;
  fileUrl: string;

  async ngOnInit() {
    if (this.itemDetails) {
      this.isEditItemForm = this.itemDetails ? true : false;
      //this.createItemForm.setValue(this.itemDetails);
    }
    if (this.isEditItemForm) {
      let itemDetail = this.itemDetails;
      this.createItemForm.setValue(itemDetail);
    }
  }

  async editItemDetails() {
    let item: Item = <Item>this.createItemForm.getRawValue();
    let edittedItem: ItemsResponse = <ItemsResponse>await this.itemService.editItem(item);
    this.itemEditted.emit(edittedItem);
    if (this.fileToUpload) {
      let urlOfImage = item.id + ".svg";
      await this.uploadImage(urlOfImage);
    }
  }

  async createNewItem() {
    let item: Item = <Item>this.createItemForm.getRawValue();
    let createdItem: ItemsResponse = <ItemsResponse>await this.itemService.createItem(item);
    this.itemCreated.emit(createdItem);
    let newData: Item[] = createdItem.items;
    let id;
    for (var i = 0; i < newData.length - 1; i++) {
      if (newData[i].name == item.name) {
        id = newData[i].id;
        break;
      }
    }
    let urlOfImage = id + ".svg";
    if (this.uploadImage) {
      await this.uploadImage(urlOfImage);
      console.log(this.fileUrl);
    }
  }

  get name() {
    return this.createItemForm.get('name');
  }

  get maxLimit() {
    return this.createItemForm.get('maxLimit');
  }

  get imageUrl() {
    return this.createItemForm.get('imageUrl');
  }

  get rate() {
    return this.createItemForm.get('rate');
  }

  get shelvesRedLimit() {
    return this.createItemForm.get('shelvesRedLimit');
  }

  get shelvesAmberLimit() {
    return this.createItemForm.get('shelvesAmberLimit');
  }

  get warehouseRedLimit() {
    return this.createItemForm.get('warehouseRedLimit');
  }

  get warehouseAmberLimit() {
    return this.createItemForm.get('warehouseAmberLimit');
  }

  submitForm() {
    //create item or update existing user based on editUserForm variable
    if (this.isEditItemForm) {
      this.editItemDetails();
    }
    else {
      this.createNewItem();
    }
    this.submitButtonText = this.updateButtonText = "";
  }

  cancelUpdate() {
    this.itemEditted.emit(null);
  }

  cancelCreate() {
    this.itemCreated.emit(null);
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      showMessage(this.snackBar,2,"Image Uploaded Successfully",'success');
    }
    else{
      showMessage(this.snackBar,2,"Image Not Uploaded",'warn');
    }
  }

  async uploadImage(fileName) {
    const formData = new FormData();
    formData.append('FileToUpload', this.fileToUpload, fileName);
    this.http.post<FileUrl>('api/IconFileUpload', formData).subscribe(
      data => {
        this.fileUrl = data.locationUrl;
      }
    );
  }
}