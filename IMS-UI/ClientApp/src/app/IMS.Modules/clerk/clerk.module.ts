import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';

import { ClerkComponent } from './Components/clerk/clerk.component';
import { MaterialModule } from '../material/material.module';
import { OrderdetailsComponent } from './Components/orderdetails/orderdetails.component';
import { VendordetailsComponent } from './Components/vendordetails/vendordetails.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ClerkComponent, VendordetailsComponent, OrderdetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClerkRoutingModule,
    MaterialModule
  ]
})
export class ClerkModule { }
