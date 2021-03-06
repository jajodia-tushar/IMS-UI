import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './IMS.Services/Route/login-gaurd';
import { LoginComponent } from './Components/login/login.component';
import { LoggingComponent } from './Components/logging/logging.component';
import { ChangePasswordComponent } from './IMS.Modules/shared/change-password/change-password.component';
import { ChangePasswordGuardService } from './IMS.Services/Route/change-password-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'Admin' , pathMatch : 'full'},
  { path: 'login', component : LoginComponent , canActivate : [LoginGuard] },
  { path: 'employee', loadChildren: () => import('./IMS.Modules/employee/employee.module').then(m => m.EmployeeModule)},
  { path: 'Shelf', redirectTo : 'employee' },
  { path: 'Admin', loadChildren: () => import('./IMS.Modules/admin/admin.module').then(m => m.AdminModule)},
  { path: 'Clerk', loadChildren: () => import('./IMS.Modules/clerk/clerk.module').then(m => m.ClerkModule) },
  { path: 'logs', component: LoggingComponent, pathMatch: 'full' },
  { path: "changePassword", component: ChangePasswordComponent, pathMatch: "full", canActivate: [ChangePasswordGuardService]},
  { path: '**', redirectTo : 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


