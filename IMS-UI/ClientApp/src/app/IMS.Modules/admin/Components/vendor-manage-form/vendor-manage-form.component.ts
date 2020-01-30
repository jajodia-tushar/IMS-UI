import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';

import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';
import { Response } from 'src/app/IMS.Models/Response';
import { VendorValidatorService } from 'src/app/IMS.Services/vendor/vendor-validator.service';

@Component({
  selector: 'app-vendor-manage-form',
  templateUrl: './vendor-manage-form.component.html',
  styleUrls: ['./vendor-manage-form.component.css']
})
export class VendorManageFormComponent implements OnInit {
  createVendorForm: FormGroup
  updateButtonText: string = "Update";
  submitButtonText: string = "Submit";
  confirmButtonText: string = "Yes"
  constructor(private formBuilder: FormBuilder, private _vendorService: VendorService,
    private vendorValidator: VendorValidatorService) {
    this.createVendorForm = this.formBuilder.group({
      id: [1, []],
      name: ["", [Validators.required], this.vendorValidator.vendorNameTakenValidator.bind(this.vendorValidator)],
      title: ["", [Validators.required]],
      companyIdentificationNumber: ["", [Validators.required]],
      contactNumber: ["", [Validators.required, Validators.pattern(("[6-9]\\d{9}")), Validators.maxLength(10)]],
      pan: ["", [Validators.required, Validators.pattern(("^[A-Z]{5}[0-9]{4}[A-Z]$"))],
        this.vendorValidator.vendorPanTakenValidator.bind(this.vendorValidator)],
      gst: ["", [Validators.required, Validators.pattern(("[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z\\d]{1}[Z]{1}[A-Z\\d]{1}"))],
        this.vendorValidator.vendorGstTakenValidator.bind(this.vendorValidator)],
      address: ["", [Validators.required]]
    })
  }
  @Input() vendorDetails: Vendor;
  @Input() actionToDo: string;
  @Output() vendorEditted: EventEmitter<VendorResponse> = new EventEmitter<VendorResponse>();
  @Output() vendorCreated: EventEmitter<VendorResponse> = new EventEmitter<VendorResponse>();
  @Output() vendorDeleted: EventEmitter<Response> = new EventEmitter<Response>();
  isEditVendorForm: boolean;
  isDeleteAction: boolean

  

  async createNewVendor() {
    let vendor: Vendor = <Vendor>this.createVendorForm.getRawValue();
    let createdVendor: VendorResponse = <VendorResponse>await this._vendorService.createVendor(vendor);
    this.vendorCreated.emit(createdVendor);
  }
  async EditVendor() {
    let vendor: Vendor = <Vendor>this.createVendorForm.getRawValue();
    let editedVendor: VendorResponse = <VendorResponse>await this._vendorService.EditVendor(vendor);
    this.vendorEditted.emit(editedVendor);
  }
  async onConfirm() {
    this.confirmButtonText = "";
    let deletedResponse: Response = <Response>await this._vendorService.deactivateVendor(this.vendorDetails.id, false);
    this.vendorDeleted.emit(deletedResponse);
    
  }
  

  submitForm() {
    if (this.isEditVendorForm) {
      this.EditVendor();
    }
    else {
      this.createNewVendor();
    }
    this.submitButtonText = this.updateButtonText = "";
  }

  onDismiss(): void {
    this.vendorDeleted.emit(null);
  }
  canceldialog() {
    this.vendorCreated.emit(null);
  }
  
  ngOnInit() {
    if (this.vendorDetails) {
      this.isEditVendorForm = this.vendorDetails ? true : false;
    }
    if (this.actionToDo) {
      this.isDeleteAction = this.actionToDo === "delete" ? true : false;
    }
    if (this.isEditVendorForm) {
      this.createVendorForm.setValue(this.vendorDetails)
    }
    if (this.isEditVendorForm) {
      let vendorDetail = this.vendorDetails;
      this.createVendorForm.setValue(vendorDetail);
      this.createVendorForm.get("name").clearAsyncValidators();
      this.createVendorForm.get("name").valueChanges.subscribe(
        (name: string) => {
          if (name == vendorDetail.name) {
            this.createVendorForm.get("name").clearAsyncValidators();
          }
          else {
            this.createVendorForm.get("name").setAsyncValidators(
              this.vendorValidator.vendorNameTakenValidator.bind(this.vendorValidator)
            )
          }
        }
      );
      this.createVendorForm.get("pan").clearAsyncValidators();
      this.createVendorForm.get("pan").valueChanges.subscribe(
        (name: string) => {
          if (name == vendorDetail.name) {
            this.createVendorForm.get("pan").clearAsyncValidators();
          }
          else {
            this.createVendorForm.get("pan").setAsyncValidators(
              this.vendorValidator.vendorPanTakenValidator.bind(this.vendorValidator)
            )
          }
        }
      );
      this.createVendorForm.get("gst").clearAsyncValidators();
      this.createVendorForm.get("gst").valueChanges.subscribe(
        (name: string) => {
          if (name == vendorDetail.name) {
            this.createVendorForm.get("gst").clearAsyncValidators();
          }
          else {
            this.createVendorForm.get("gst").setAsyncValidators(
              this.vendorValidator.vendorGstTakenValidator.bind(this.vendorValidator)
            )
          }
        }
      );
    }

  }

}
