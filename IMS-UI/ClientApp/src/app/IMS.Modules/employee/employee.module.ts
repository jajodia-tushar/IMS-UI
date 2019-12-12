import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    MaterialModule,
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
