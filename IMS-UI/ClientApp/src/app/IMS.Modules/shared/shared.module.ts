import { NgModule } from '@angular/core';
import { SpinningLoaderComponent } from './spinning-loader/spinning-loader.component';
import { SpinLoaderService } from 'src/app/IMS.Services/shared/spin-loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/IMS.Services/IMS.Interceptor/loader.interceptor';
import { MaterialModule } from '../material/material.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { RevisableTableComponent } from './data-table/revisable-table/revisable-table.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
    declarations: [SpinningLoaderComponent, SnackbarComponent, HeaderComponent, RevisableTableComponent, LogoutComponent],
  imports: [
    MaterialModule
  ],
  providers : [],
    exports: [SpinningLoaderComponent, SnackbarComponent, HeaderComponent, RevisableTableComponent,LogoutComponent],
  entryComponents : [SnackbarComponent]
})
export class SharedModule { }
