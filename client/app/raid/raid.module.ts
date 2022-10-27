import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { RaidRoutingModule } from './raid-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RaidDetailComponent } from './detail/raid.detail.component';
import { RaidListComponent } from './list/raid.list.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    RaidRoutingModule,
    SharedModule
  ],
  exports: [
    RaidDetailComponent,
    RaidListComponent
  ],
  declarations: [
    RaidDetailComponent,
    RaidListComponent
  ],
  providers: [
  ],
})
export class RaidModule { }