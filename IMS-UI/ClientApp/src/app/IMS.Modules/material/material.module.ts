import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
    MatInputModule, MatRippleModule, MatMenuModule, MatCardModule, MatSidenavModule, MatTableModule, MatPaginatorModule, MatIconModule, MatSnackBar, MatSnackBarModule,
    MatCheckboxModule, MatSort, MatSortModule
} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';

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
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  FormsModule,
  MatSnackBarModule,
  CommonModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
    MatSortModule,
    MatRadioModule
]


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
