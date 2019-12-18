import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerkRouteGuardService } from 'src/app/IMS.Services/Route/clerk-route-guard.service';
import { ClerkComponent } from './Components/clerk/clerk.component';

const routes: Routes = [{ path: '', component: ClerkComponent, canActivate:[ClerkRouteGuardService], data : { role : "Clerk"} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
