import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './Components/employee/employee.component';
import { LoginGuard } from 'src/app/IMS.Services/Route/login-gaurd';
import { SecuredRouteGuard } from 'src/app/IMS.Services/Route/secured-route-guard';
import { PickItemComponent } from './Components/pick-item/pick-item.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent,canActivate:[SecuredRouteGuard], data : { role : "Shelf"}},
  { path: 'pickItem', component: PickItemComponent,canActivate:[SecuredRouteGuard], data : { role: "Shelf"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
