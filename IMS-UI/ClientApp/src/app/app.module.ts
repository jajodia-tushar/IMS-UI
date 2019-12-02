import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './IMS.Services/login.service';
import { AdminComponent } from './admin/admin.component';
import { ClerkComponent } from './clerk/clerk.component';
import { EmployeeComponent } from './employee/employee.component';
import { RouterModule } from '@angular/router';
import { AuthGaurdService } from './IMS.Services/auth-gaurd.service';
import { AnonymousGaurdService } from './IMS.Services/anonymous-gaurd.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FloorComponent } from './floor/floor.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ClerkComponent,
    EmployeeComponent,
    FloorComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, canActivate: [AnonymousGaurdService] },
      { path: 'login', component: LoginComponent, canActivate: [AnonymousGaurdService]},
      { path: 'admin', component: AdminComponent, canActivate: [AuthGaurdService] },
      { path: 'clerk', component: ClerkComponent, canActivate: [AuthGaurdService] },
      { path: 'shelf', component: EmployeeComponent, canActivate: [AuthGaurdService] }
    ]),
    BrowserAnimationsModule
  ],

  providers: [LoginService, AuthGaurdService, AnonymousGaurdService ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
