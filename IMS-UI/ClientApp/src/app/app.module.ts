import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './IMS.Services/login.service';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './IMS.Services/login-gaurd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FloorComponent } from './floor/floor.component';
import { SecuredRouteGuard } from './IMS.Services/secured-route-guard';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinLoaderService } from './IMS.Services/spin-loader.service';
import { LoaderInterceptor } from './IMS.Services/IMS.Interceptor/loader.interceptor';
import { SharedModule } from './IMS.Modules/shared/shared.module';
import { AuthService } from './IMS.Services/auth.service';


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
    LoginGuard,
    AuthService,
    SecuredRouteGuard,
    SpinLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
