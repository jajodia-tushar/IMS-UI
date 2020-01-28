import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderSuccessDetails } from 'src/app/IMS.Models/Shared/OrderMeesage';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  orderSuccessMessage: OrderSuccessDetails = new OrderSuccessDetails();

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public message: OrderSuccessDetails) { 
    this.orderSuccessMessage = message; 
  }

  ngOnInit() {
  }

}
