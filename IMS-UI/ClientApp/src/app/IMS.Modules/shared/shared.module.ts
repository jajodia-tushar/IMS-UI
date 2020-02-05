import { HumanizePipe } from './utils/humanize.pipe';
import { NgModule } from '@angular/core';
import { SpinningLoaderComponent } from './spinning-loader/spinning-loader.component';
import { MaterialModule } from '../material/material.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HeaderComponent } from './header/header.component';
import { RevisableTableComponent } from './data-table/revisable-table/revisable-table.component';
import { LogoutComponent } from './logout/logout.component';
import { DataTableComponent } from './data-table/data-table/data-table.component';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    declarations: [SpinningLoaderComponent, SnackbarComponent, HeaderComponent, RevisableTableComponent, LogoutComponent, DataTableComponent, HumanizePipe, GenericTableComponent, ChangePasswordComponent],
  imports: [
    MaterialModule
  ],
  providers : [],
    exports: [SpinningLoaderComponent, SnackbarComponent, HeaderComponent, RevisableTableComponent, LogoutComponent, DataTableComponent, HumanizePipe,GenericTableComponent],
  entryComponents : [SnackbarComponent]
})
export class SharedModule { }
