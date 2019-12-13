import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './Components/admin/admin.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    MaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
