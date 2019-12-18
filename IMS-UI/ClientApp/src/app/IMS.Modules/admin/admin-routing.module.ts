import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './Components/admin/admin.component';
import { AdminRouteGuardService } from 'src/app/IMS.Services/Route/admin-route-guard.service';

const routes: Routes = [{ path: '', component: AdminComponent , canActivate:[AdminRouteGuardService], data : { allowedRoles : ["Admin","SuperAdmin"]}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
