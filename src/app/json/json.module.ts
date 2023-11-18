import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsonRoutingModule } from './json-routing.module';

import { JsonComponent } from './json.component';

@NgModule({
  imports: [
    CommonModule,
    JsonRoutingModule
  ],
  declarations: [
    JsonComponent
  ],
  providers: [
  ],
})
export class JsonModule { }
