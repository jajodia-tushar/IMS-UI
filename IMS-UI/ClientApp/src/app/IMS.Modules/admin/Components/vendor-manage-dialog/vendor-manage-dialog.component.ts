import { Component, OnInit, Inject } from '@angular/core';
import { Vendor } from 'src/app/IMS.Models/Vendor/vendor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendorResponse } from 'src/app/IMS.Models/Vendor/VendorResponse';
import { Response } from 'src/app/IMS.Models/Shared/Response';

@Component({
  selector: 'app-vendor-manage-dialog',
  templateUrl: './vendor-manage-dialog.component.html',
  styleUrls: ['./vendor-manage-dialog.component.css']
})
export class VendorManageDialogComponent implements OnInit {
  
  vendorData: Vendor;
  action: string;
  constructor(private dialogRef: MatDialogRef<
    VendorManageDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.vendorData = data.vendor;
    this.action = data.action;
  }
  notifyTableVendorCreated(vendorResponse: VendorResponse) {
    if (vendorResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (vendorResponse.vendors != null) {
      this.dialogRef.close(vendorResponse.vendors[0]);
    }
    else if (vendorResponse.vendors == null) {
      this.dialogRef.close(false);
    }
  }
  notifyTableVendorEdited(vendorResponse: VendorResponse) {
    if (vendorResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (vendorResponse.vendors != null) {
      this.dialogRef.close(vendorResponse.vendors[0]);
    }
    else if (vendorResponse.vendors == null) {
      this.dialogRef.close(false);
    }
  }
  notifyTableVendorDeleted(deleteResponse: Response) {
    if (deleteResponse == null) {
      this.dialogRef.close("cancelled");
    }
    else if (deleteResponse.error == null) {
      this.dialogRef.close("true")
    }
    else if (deleteResponse.error != null) {
      this.dialogRef.close("false")
    }
  }
  ngOnInit() {
  }

}
