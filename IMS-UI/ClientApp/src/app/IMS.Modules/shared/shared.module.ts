import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinningLoaderComponent } from './spinning-loader/spinning-loader.component';
import { SpinLoaderService } from 'src/app/IMS.Services/spin-loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/IMS.Services/IMS.Interceptor/loader.interceptor';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [SpinningLoaderComponent],
  imports: [
    CommonModule,MaterialModule
  ],
  providers : [
    SpinLoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  exports : [SpinningLoaderComponent]
})
export class SharedModule { }
