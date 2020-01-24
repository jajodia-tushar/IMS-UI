import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { OrderMessage } from 'src/app/IMS.Models/Shared/OrderMeesage';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  orderMessage: OrderMessage = new OrderMessage();

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public message: OrderMessage) { 
    this.orderMessage = message; 
  }

  ngOnInit() {
  }

}
