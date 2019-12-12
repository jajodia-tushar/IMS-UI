import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LoginGuard } from 'src/app/IMS.Services/login-gaurd';
import { SecuredRouteGuard } from 'src/app/IMS.Services/secured-route-guard';

const routes: Routes = [{ path: '', component: AdminComponent , canActivate:[SecuredRouteGuard], data : { role : "Admin"}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
