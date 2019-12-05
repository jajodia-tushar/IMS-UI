import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './IMS.Services/login.service';
//import { AdminComponent } from './admin/admin.component';
import { ClerkComponent } from './clerk/clerk.component';
import { EmployeeComponent } from './employee/employee.component';
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { EmployeeService } from './IMS.Services/employee.service';
import { PickItemComponent } from './employee/pick-item/pick-item.component'; 



@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule { };
import { AuthGaurdService } from './IMS.Services/auth-gaurd.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FloorComponent } from './floor/floor.component';
import { LoginAuthGaurdService } from './IMS.Services/login-auth-gaurd.service';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    PickItemComponent
    AppComponent,
    LoginComponent,
    ClerkComponent,
    EmployeeComponent,
    FloorComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: EmployeeComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'pickitem', component: PickItemComponent }
    ])
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, canActivate: [AnonymousGaurdService] },
      { path: 'login', component: LoginComponent, canActivate: [AnonymousGaurdService]},
      { path: 'admin', component: AdminComponent, canActivate: [AuthGaurdService] },
      { path: 'clerk', component: ClerkComponent, canActivate: [AuthGaurdService] },
      { path: 'shelf', component: EmployeeComponent, canActivate: [AuthGaurdService] }
    ]),
    BrowserAnimationsModule
  ],

  providers: [LoginService, AuthGaurdService, LoginAuthGaurdService ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
