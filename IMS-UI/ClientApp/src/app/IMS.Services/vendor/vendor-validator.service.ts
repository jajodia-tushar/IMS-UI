import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { VendorService } from './vendor.service';
import { Response } from 'src/app/IMS.Models/Response';

@Injectable({
  providedIn: 'root'
})
export class VendorValidatorService {

  constructor(private vendorService: VendorService) { }

  async vendorNameTakenValidator(vendorNameControl: AbstractControl) {
    let response = await this.checkIfVendorNameDoesNotExists(vendorNameControl.value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!response) {
          resolve({ vendorNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
  async checkIfVendorNameDoesNotExists(vendorname: string) {
    let response = <Response>await this.vendorService.checkVendorName(vendorname);
    if (response.status === "Success") {
      return true;
    }
    else if (response.status === "Failure") {
      return false;
    }
  }

  async vendorPanTakenValidator(vendorPanControl: AbstractControl) {
    let response = await this.checkIfVendorPanDoesNotExists(vendorPanControl.value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!response) {
          resolve({ vendorPanNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
  async checkIfVendorPanDoesNotExists(pan: string) {
    let response = <Response>await this.vendorService.checkVendorPan(pan);
    if (response.status === "Success") {
      return true;
    }
    else if (response.status === "Failure") {
      return false;
    }
  }

  async vendorGstTakenValidator(vendorGstControl: AbstractControl) {
    let response = await this.checkIfVendorGstDoesNotExists(vendorGstControl.value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!response) {
          resolve({ vendorGstNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
  async checkIfVendorGstDoesNotExists(gst: string) {
    let response = <Response>await this.vendorService.checkVendorGst(gst);
    if (response.status === "Success") {
      return true;
    }
    else if (response.status === "Failure") {
      return false;
    }
  }
}


