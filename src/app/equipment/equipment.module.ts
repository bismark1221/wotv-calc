import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { SharedModule } from '../shared/shared.module';

import { EquipmentDetailComponent } from './detail/equipment.detail.component';
import { EquipmentListComponent } from './list/equipment.list.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    UiSwitchModule,
    EquipmentRoutingModule,
    SharedModule
  ],
  exports: [
    EquipmentDetailComponent,
    EquipmentListComponent
  ],
  declarations: [
    EquipmentDetailComponent,
    EquipmentListComponent
  ],
  providers: [
  ],
})
export class EquipmentModule { }
