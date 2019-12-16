import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClerkRoutingModule } from './clerk-routing.module';
import { ClerkComponent } from './Components/clerk/clerk.component';


@NgModule({
  declarations: [ClerkComponent],
  imports: [
    CommonModule,
    ClerkRoutingModule
  ]
})
export class ClerkModule { }
