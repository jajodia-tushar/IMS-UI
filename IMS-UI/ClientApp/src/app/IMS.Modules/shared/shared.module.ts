import { NgModule } from '@angular/core';
import { SpinningLoaderComponent } from './spinning-loader/spinning-loader.component';
import { SpinLoaderService } from 'src/app/IMS.Services/spin-loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/IMS.Services/IMS.Interceptor/loader.interceptor';
import { MaterialModule } from '../material/material.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [SpinningLoaderComponent, SnackbarComponent, HeaderComponent],
  imports: [
    MaterialModule
  ],
  providers : [
    SpinLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  exports : [SpinningLoaderComponent,SnackbarComponent,HeaderComponent],
  entryComponents : [SnackbarComponent]
})
export class SharedModule { }
