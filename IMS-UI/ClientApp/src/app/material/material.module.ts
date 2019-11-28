import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule]


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
