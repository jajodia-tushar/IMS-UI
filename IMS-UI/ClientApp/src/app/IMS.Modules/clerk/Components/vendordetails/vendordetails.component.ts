import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { OrderDetails } from 'src/app/IMS.Models/Vendor/OrderDetails';
import { log } from 'util';
import { FormControl, Validators } from '@angular/forms';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';
import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/IMS.Services/admin/user-management.service';


  
@Component({
  selector: 'app-vendordetails',
  templateUrl: './vendordetails.component.html',
  styleUrls: ['./vendordetails.component.css']
})
export class VendordetailsComponent implements OnInit {
  public LoggedINClerk;
  VendorControl = new FormControl('', [Validators.required]);
  
  maxDate = new Date();
  public orderDetails: OrderDetails = {
    challanNumber: "",
    vendor: null,
    submitedTo: null,
    receivedBy: "",
    date: null
  };
  public Admins = [];
  public Vendors = [];
  public SelectedAdmin = "";
  public SelectedVendor = null;
  public RecievedDate: Date;

  constructor(private userService: UserManagementService, private _VendorService: VendorService,private router:Router,
    private http: HttpClient, private _CentralizedDataService: CentralizedDataService) { }

  onKey(value: string) {
    this.orderDetails.challanNumber = value;
    this.isDataToBeSend();
  }
  selectedVendor() {
    this.orderDetails.vendor = this.SelectedVendor;
    this.isDataToBeSend();
  }
  selectedAdminName() {
    this.orderDetails.submitedTo = this.SelectedAdmin;
    this.isDataToBeSend();
  }
  SelectedDate() {
    let utcDate = Date.UTC(this.RecievedDate.getFullYear(), this.RecievedDate.getMonth(), this.RecievedDate.getDate());
    this.orderDetails.date = new Date(utcDate);    
    this.isDataToBeSend();
  }
  isDataToBeSend() {
    if (this.orderDetails.date != null && this.orderDetails.receivedBy != null
             && this.orderDetails.vendor != null && this.orderDetails.submitedTo != null)
    {
       this._CentralizedDataService.setSiblingData(this.orderDetails);
    }
  }
  async ngOnInit() {
    this.userService.getAllAdmins().subscribe(
      data => {
        
        if (data.status === "Success")
          this.Admins = data.users;
        else {
          if (data.errorCode === 401) {
            this.router.navigateByUrl("/login");
          }
        }
      }
    )
    this._VendorService.getAllVendors().subscribe(
      data => {
        if (data.status === "Success")
          this.Vendors = data.vendors;
        else {
          if (data.errorCode === 401) {
            this.router.navigateByUrl("/login");
          }
        }
      }
    )  
    await this._CentralizedDataService.getLoggedInUser();
    this.LoggedINClerk = this._CentralizedDataService.getUser().firstname + " " + this._CentralizedDataService.getUser().lastname;
    this.orderDetails.receivedBy = this.LoggedINClerk;    
  }

}
