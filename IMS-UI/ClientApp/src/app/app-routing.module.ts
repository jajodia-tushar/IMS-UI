import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './IMS.Services/Route/login-gaurd';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo : 'Clerk' , pathMatch : 'full'},
  { path: 'login', component : LoginComponent , canActivate : [LoginGuard] },
  { path: 'employee', loadChildren: () => import('./IMS.Modules/employee/employee.module').then(m => m.EmployeeModule)},
  { path: 'Shelf', redirectTo : 'employee' },
  { path: 'Admin', loadChildren: () => import('./IMS.Modules/admin/admin.module').then(m => m.AdminModule)},
  { path: 'Clerk', loadChildren: () => import('./IMS.Modules/clerk/clerk.module').then(m => m.ClerkModule)},
  { path: '**', redirectTo : 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


