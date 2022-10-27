import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgSelectModule } from '@ng-select/ng-select';

import { RaidRoutingModule } from './raid-routing.module';

import { RaidDetailComponent } from './detail/raid.detail.component';
import { RaidListComponent } from './list/raid.list.component';

import { TemplateCardComponent } from '../template/template.card.component';


@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    RaidRoutingModule
  ],
  exports: [
    RaidDetailComponent,
    RaidListComponent
  ],
  declarations: [
    RaidDetailComponent,
    RaidListComponent,
    TemplateCardComponent
  ],
  providers: [
  ],
})
export class RaidModule { }