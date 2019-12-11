import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatRippleModule, MatMenuModule, MatCardModule, MatSidenavModule, MatGridListModule, MatTableModule, MatPaginatorModule, MatIconModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
]


@NgModule({
  imports: [materialModules],
  exports: [materialModules]
})
export class MaterialModule { }
