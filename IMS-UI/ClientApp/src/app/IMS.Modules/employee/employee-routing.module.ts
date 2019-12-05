import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { AuthGaurdService } from 'src/app/IMS.Services/auth-gaurd.service';

const routes: Routes = [{ path: '', component: EmployeeComponent, canActivate: [AuthGaurdService] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
