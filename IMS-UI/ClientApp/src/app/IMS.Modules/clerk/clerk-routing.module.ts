import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClerkComponent } from './clerk.component';
import { AuthGaurdService } from 'src/app/IMS.Services/auth-gaurd.service';

const routes: Routes = [{ path: '', component: ClerkComponent, canActivate: [AuthGaurdService] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClerkRoutingModule { }
