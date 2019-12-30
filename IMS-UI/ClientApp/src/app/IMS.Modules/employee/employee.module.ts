import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './Components/employee/employee.component';
import { MaterialModule } from '../material/material.module';
import { PickItemComponent } from './Components/pick-item/pick-item.component';
import { ItemComponent } from './Components/item/item.component';
import { ItemsCartComponent } from './Components/items-cart/items-cart.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { SharedModule } from '../shared/shared.module';
import {MatGridListModule} from '@angular/material/grid-list';

import { FilterPipe} from './Components/pick-item/filter.pipe';


@NgModule({
  declarations: [EmployeeComponent, PickItemComponent, ItemComponent, ItemsCartComponent, ItemsListComponent, FilterPipe],
  imports: [
    SharedModule,
    MaterialModule,
    EmployeeRoutingModule,
    MatGridListModule
  ], 
  exports: [
    FilterPipe
  ]
})
export class EmployeeModule { }
