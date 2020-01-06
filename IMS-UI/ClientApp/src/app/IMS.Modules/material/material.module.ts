import { NgModule } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  MatInputModule, MatRippleModule, MatMenuModule, MatCardModule, MatSidenavModule,
  MatGridListModule, MatTableModule, MatPaginatorModule, MatIconModule, MatSnackBar, MatSnackBarModule, 
  MatRadioModule, MatSortModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDividerModule } from '@angular/material/divider';
import { CdkTableModule } from '@angular/cdk/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';



const materialModules = [
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatGridListModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  FormsModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  CommonModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSortModule,
  MatRadioModule,
    MatDividerModule,
    CdkTableModule,
    FlexLayoutModule,
    MatCheckboxModule
]


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
