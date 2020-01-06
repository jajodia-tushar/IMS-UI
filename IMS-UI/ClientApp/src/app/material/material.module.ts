import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ClerkRoutingModule } from '../IMS.Modules/clerk/clerk-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [MatDialogModule, MatFormFieldModule, 
  MatSelectModule, 
  MatButtonModule, 
  CommonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  FormsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  ReactiveFormsModule
];


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
