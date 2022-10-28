import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraRoutingModule } from './extra-routing.module';

import { ExtraContactComponent } from './contact/extra.contact.component';
import { ExtraLegalComponent } from './legal/extra.legal.component';

@NgModule({
  imports: [
    CommonModule,
    ExtraRoutingModule
  ],
  declarations: [
    ExtraContactComponent,
    ExtraLegalComponent
  ],
  providers: [
  ],
})
export class ExtraModule { }
