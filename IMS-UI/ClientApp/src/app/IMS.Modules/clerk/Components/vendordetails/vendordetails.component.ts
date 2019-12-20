import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/IMS.Services/admin.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/IMS.Models/User/User';
import { CentralizedDataService } from 'src/app/IMS.Services/shared/centralized-data.service';
import { OrderDetails } from 'src/app/IMS.Models/Vendor/OrderDetails';
import { log } from 'util';
import { FormControl, Validators } from '@angular/forms';
import { VendorService } from 'src/app/IMS.Services/vendor/vendor.service';


  
@Component({
  selector: 'app-vendordetails',
  templateUrl: './vendordetails.component.html',
  styleUrls: ['./vendordetails.component.css']
})
export class VendordetailsComponent implements OnInit {
  public LoggedINClerk = "";
  VendorControl = new FormControl('', [Validators.required]);
  DateControl = new FormControl('', [Validators.required]);
  maxDate = new Date();
  public orderDetails: OrderDetails = {
    challanNumber: "",
    vendor: null,
    submitedTo: "mahalakshmi",
    receivedBy: "siva",
    date: null
  };
  public Admins = [];
  public Vendors = [];
  public SelectedAdmin = "";
  public SelectedVendor = null;
  public RecievedDate: Date;

  constructor(private _adminService: AdminService, private _VendorService: VendorService,
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
    this.orderDetails.receivedBy = this.SelectedAdmin;
    this.isDataToBeSend();
  }
  SelectedDate() {
    this.orderDetails.date = this.RecievedDate;
    this.isDataToBeSend();
  }
  isDataToBeSend() {
    console.log(this.orderDetails);
    if (this.orderDetails.date != null && this.orderDetails.receivedBy != null
             && this.orderDetails.vendor != null && this.orderDetails.submitedTo != null)
    {
       this._CentralizedDataService.setSiblingData(this.orderDetails);
    }
  }
  ngOnInit() {
    this._adminService.getAllAdmins().subscribe(
      data => {
        this.Admins = data.users;
      }
    )
    this._VendorService.getAllVendors().subscribe(
      data => {
        this.Vendors = data.vendors;
      }
    )
    this.http.get("api/UserName").subscribe(

      data => {
        this.LoggedINClerk = data["username"];
      })
  }

}
