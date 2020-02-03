import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerkRouteGuardService } from 'src/app/IMS.Services/Route/clerk-route-guard.service';
import { ClerkComponent } from './Components/clerk/clerk.component';
import { ChangePasswordComponent } from '../shared/change-password/change-password.component';
import { ChangePasswordGuardService } from 'src/app/IMS.Services/Route/change-password-guard.service';

const routes: Routes = [
  { path: '', component: ClerkComponent, canActivate:[ClerkRouteGuardService], data : { role : "Clerk"} },
  { path: 'changePassword', component: ChangePasswordComponent, canActivate: [ChangePasswordGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
