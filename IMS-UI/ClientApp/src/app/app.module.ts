import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './IMS.Services/login.service';
//import { AdminComponent } from './admin/admin.component';
import { ClerkComponent } from './clerk/clerk.component';
import { EmployeeComponent } from './employee/employee.component';
import { RouterModule } from '@angular/router';
import { AuthGaurdService } from './IMS.Services/auth-gaurd.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FloorComponent } from './floor/floor.component';
import { LoginAuthGaurdService } from './IMS.Services/login-auth-gaurd.service';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClerkComponent,
    EmployeeComponent,
    FloorComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  providers: [LoginService, AuthGaurdService, LoginAuthGaurdService ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
