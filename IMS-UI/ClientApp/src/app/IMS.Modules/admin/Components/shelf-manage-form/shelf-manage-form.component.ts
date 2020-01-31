import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShelfService } from 'src/app/IMS.Services/Shelf/shelf.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { ShelfListResponse } from 'src/app/IMS.Models/Shelf/ShelfListResponse';
import { Shelf } from 'src/app/IMS.Models/Shelf/Shelf';

@Component({
  selector: 'app-shelf-manage-form',
  templateUrl: './shelf-manage-form.component.html',
  styleUrls: ['./shelf-manage-form.component.css']
})
export class ShelfManageFormComponent implements OnInit {
  createShelfForm: FormGroup
  updateButtonText: string = "Update";
  submitButtonText: string = "Submit";
  constructor(formBuilder: FormBuilder, private shelfService: ShelfService, private http: HttpClient, private snackBar: MatSnackBar) {
    this.createShelfForm = formBuilder.group({
      id: [-1, []],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      code: [null, [Validators.required]],
      isActive: [true, []]
    })
   }

   @Input() shelfDetails: Shelf;
   @Output() shelfEditted: EventEmitter<ShelfListResponse> = new EventEmitter<ShelfListResponse>();
   @Output() shelfCreated: EventEmitter<ShelfListResponse> = new EventEmitter<ShelfListResponse>();
   isEditShelfForm: Boolean;

   async ngOnInit() {
    if (this.shelfDetails) {
      this.isEditShelfForm = this.shelfDetails ? true : false;
      //this.createShelfForm.setValue(this.shelfDetails);
    }
    if (this.isEditShelfForm) {
      let shelfDetail = this.shelfDetails;
      this.createShelfForm.setValue(shelfDetail);
    }
  }

  async editShelfDetails() {
    let shelf: Shelf = <Shelf>this.createShelfForm.getRawValue();
    let edittedShelf: ShelfListResponse = <ShelfListResponse>await this.shelfService.editShelf(shelf);
    this.shelfEditted.emit(edittedShelf);
  }

  async createNewShelf() {
    let shelf: Shelf = <Shelf>this.createShelfForm.getRawValue();
    let createdShelf: ShelfListResponse = <ShelfListResponse>await this.shelfService.createShelf(shelf);
    this.shelfCreated.emit(createdShelf);
  }

  get name() {
    return this.createShelfForm.get('name');
  }

  get code() {
    return this.createShelfForm.get('code');
  }

  submitForm() {
    //create shelf or update existing user based on editUserForm variable
    if (this.isEditShelfForm) {
      this.editShelfDetails();
    }
    else {
      this.createNewShelf();
    }
    this.submitButtonText = this.updateButtonText = "";
  }

  cancelUpdate() {
    this.shelfEditted.emit(null);
  }

  cancelCreate() {
    this.shelfCreated.emit(null);
  }

}
