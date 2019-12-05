import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginAuthGaurdService } from './IMS.Services/login-auth-gaurd.service';
import { AuthGaurdService } from './IMS.Services/auth-gaurd.service';


const routes: Routes = [
  { path: '', component: LoginComponent, canActivate:[LoginAuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: '*', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./IMS.Modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'clerk', loadChildren: () => import('./IMS.Modules/clerk/clerk.module').then(m => m.ClerkModule) },
  { path: 'shelf', loadChildren: () => import('./IMS.Modules/employee/employee.module').then(m => m.EmployeeModule) }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
