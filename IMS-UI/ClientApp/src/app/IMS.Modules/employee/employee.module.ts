import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './Components/employee/employee.component';
import { MaterialModule } from '../material/material.module';
import { PickItemComponent } from './Components/pick-item/pick-item.component';
import { ItemComponent } from './Components/item/item.component';
import { ItemsCartComponent } from './Components/items-cart/items-cart.component';
import { ItemsListComponent } from './Components/items-list/items-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EmployeeComponent, PickItemComponent, ItemComponent, ItemsCartComponent, ItemsListComponent],
  imports: [
    SharedModule,
    MaterialModule,
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule { }
