import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginService } from './IMS.Services/login.service';
import { RouterModule } from '@angular/router';
import { LoginGuard } from './IMS.Services/login-gaurd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecuredRouteGuard } from './IMS.Services/secured-route-guard';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinLoaderService } from './IMS.Services/spin-loader.service';
import { LoaderInterceptor } from './IMS.Services/IMS.Interceptor/loader.interceptor';
import { SharedModule } from './IMS.Modules/shared/shared.module';
import { SessionService } from './IMS.Services/session.service';
import { LoginComponent } from './Components/login/login.component';
import { FloorComponent } from './Components/floor/floor.component';
import { MaterialModule } from './IMS.Modules/material/material.module';
import { ShelfService } from './IMS.Services/shelf.service';

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
    SessionService,
    SecuredRouteGuard,
    SpinLoaderService,
    ShelfService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
