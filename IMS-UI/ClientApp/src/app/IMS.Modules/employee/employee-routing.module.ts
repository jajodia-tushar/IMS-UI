import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { LoginGuard } from 'src/app/IMS.Services/login-gaurd';
import { SecuredRouteGuard } from 'src/app/IMS.Services/secured-route-guard';

const routes: Routes = [{ path: '', component: EmployeeComponent,canActivate:[SecuredRouteGuard], data : { role : "Shelf"}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
