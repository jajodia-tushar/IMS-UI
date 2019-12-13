import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from 'src/app/IMS.Services/Route/login-gaurd';
import { SecuredRouteGuard } from 'src/app/IMS.Services/Route/secured-route-guard';
import { ClerkComponent } from './Components/clerk/clerk.component';

const routes: Routes = [{ path: '', component: ClerkComponent, canActivate:[SecuredRouteGuard], data : { role : "Clerk"} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
