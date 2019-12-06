import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGaurdService } from 'src/app/IMS.Services/auth-gaurd.service';

const routes: Routes = [{ path: '', component: AdminComponent, canActivate:[AuthGaurdService] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
