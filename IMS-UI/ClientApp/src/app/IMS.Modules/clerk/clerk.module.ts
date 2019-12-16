import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkComponent } from './clerk.component';
import { VendordetailsComponent } from './vendordetails/vendordetails.component';
import { MaterialModule } from 'src/app/material/material.module';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdditemComponent } from './additem/additem.component';


@NgModule({
  declarations: [ClerkComponent, VendordetailsComponent, OrderdetailsComponent, AdditemComponent],
  imports: [
    CommonModule,
    ClerkRoutingModule,
    MaterialModule
  ],
  entryComponents: [AdditemComponent]
})
export class ClerkModule { }
