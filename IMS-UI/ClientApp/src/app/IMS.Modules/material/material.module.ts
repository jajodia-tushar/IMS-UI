import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  MatInputModule, MatRippleModule, MatMenuModule, MatCardModule, MatSidenavModule,
  MatGridListModule, MatTableModule, MatPaginatorModule, MatIconModule, MatSnackBar, MatSnackBarModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

const materialModules = [
  MatDialogModule,
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
  MatListModule
]


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
