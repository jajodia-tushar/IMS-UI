import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './IMS.Services/login.service';
import { RouterModule } from '@angular/router';
import { AuthGaurdService } from './IMS.Services/auth-gaurd.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FloorComponent } from './floor/floor.component';
import { LoginAuthGaurdService } from './IMS.Services/login-auth-gaurd.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinLoaderService } from './IMS.Services/spin-loader.service';
import { LoaderInterceptor } from './IMS.Services/IMS.Interceptor/loader.interceptor';
import { SharedModule } from './IMS.Modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FloorComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    LoginService,
    AuthGaurdService,
    LoginAuthGaurdService,
    SpinLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
