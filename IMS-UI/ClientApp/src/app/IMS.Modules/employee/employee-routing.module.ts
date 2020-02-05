import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { EmployeeComponent } from './Components/employee/employee.component';
import { EmployeeRouteGuardService } from 'src/app/IMS.Services/Route/employee-route-guard.service';
import { PickItemComponent } from './Components/pick-item/pick-item.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent,canActivate:[EmployeeRouteGuardService], data : { role : "Shelf"}},
  { path: 'pickItem', component: PickItemComponent,canActivate:[EmployeeRouteGuardService], data : { role: "Shelf"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
