import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { LoginGuard } from './IMS.Services/Route/login-gaurd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinLoaderService } from './IMS.Services/shared/spin-loader.service';
import { LoaderInterceptor } from './IMS.Services/IMS.Interceptor/loader.interceptor';
import { SharedModule } from './IMS.Modules/shared/shared.module';
import { LoginComponent } from './Components/login/login.component';
import { FloorComponent } from './Components/floor/floor.component';
import { MaterialModule } from './IMS.Modules/material/material.module';

import { EmployeeService } from './IMS.Services/employee/employee.service';
import { ItemService } from './IMS.Services/item/item.service';
import { EmployeeOrderService } from './IMS.Services/employee/employee-order.service';
import { LoginService } from './IMS.Services/login/login.service';
import { ShelfService } from './IMS.Services/Shelf/shelf.service';
import { ClerkRouteGuardService } from './IMS.Services/Route/clerk-route-guard.service';
import { EmployeeRouteGuardService } from './IMS.Services/Route/employee-route-guard.service';
import { AdminRouteGuardService } from './IMS.Services/Route/admin-route-guard.service';
import { ItemWiseDataService } from './IMS.Services/admin/item-wise-data.service';
import { RagStatusService } from './IMS.Services/admin/rag-status.service';
import { RandomColorGeneratorService } from './IMS.Services/random-color-generator.service';
import { RecentEntriesService } from './IMS.Services/admin/recent-entries.service';
import { LoggingComponent } from './Components/logging/logging.component';
import { LogoutInterceptor } from './IMS.Services/IMS.Interceptor/logout.interceptor';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FloorComponent,
    LoggingComponent,
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
    DatePipe,
    RecentEntriesService,
    LoginService,
    LoginGuard,
    AdminRouteGuardService,
    ClerkRouteGuardService,
    EmployeeRouteGuardService,
    SpinLoaderService,
    ShelfService,
    EmployeeService,
    EmployeeOrderService,
    ItemService,
    ItemWiseDataService,
    RagStatusService,
    RandomColorGeneratorService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogoutInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FloorComponent]
})
export class AppModule { }
