import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerkComponent } from './clerk.component';
import { LoginGuard } from 'src/app/IMS.Services/login-gaurd';
import { SecuredRouteGuard } from 'src/app/IMS.Services/secured-route-guard';

const routes: Routes = [{ path: '', component: ClerkComponent, canActivate:[SecuredRouteGuard], data : { role : "Clerk"} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
