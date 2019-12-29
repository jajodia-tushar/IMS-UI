import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AdminRouteGuardService } from 'src/app/IMS.Services/Route/admin-route-guard.service';
import { MainnavComponent } from './Components/mainnav/mainnav.component';
import { StoreComponent } from './Components/store/store.component';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { ReportsComponent } from './Components/reports/reports.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, canActivate: [AdminRouteGuardService], data: { allowedRoles: ["Admin", "SuperAdmin"] },
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: MainnavComponent },
      { path: 'Store', component: StoreComponent },
      { path: 'Users', component: UserManagementComponent },
      { path: 'Reports', component: ReportsComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
