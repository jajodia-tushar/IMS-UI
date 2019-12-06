import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './IMS.Services/login.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { AuthGaurdService } from './IMS.Services/auth-gaurd.service';
import { MaterialModule } from './material/material.module';
import { FloorComponent } from './floor/floor.component';
import { LoginAuthGaurdService } from './IMS.Services/login-auth-gaurd.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FloorComponent
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  providers: [LoginService, AuthGaurdService, LoginAuthGaurdService ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
