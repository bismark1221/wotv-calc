import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { UnitRoutingModule } from './unit-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UnitDetailComponent } from './detail/unit.detail.component';
import { UnitListComponent } from './list/unit.list.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    UiSwitchModule,
    UnitRoutingModule,
    SharedModule
  ],
  exports: [
    UnitDetailComponent,
    UnitListComponent
  ],
  declarations: [
    UnitDetailComponent,
    UnitListComponent
  ],
  providers: [
  ],
})
export class UnitModule { }
