import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { EsperRoutingModule } from './esper-routing.module';
import { SharedModule } from '../shared/shared.module';

import { EsperDetailComponent } from './detail/esper.detail.component';
import { EsperListComponent } from './list/esper.list.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    UiSwitchModule,
    EsperRoutingModule,
    SharedModule
  ],
  exports: [
    EsperDetailComponent,
    EsperListComponent
  ],
  declarations: [
    EsperDetailComponent,
    EsperListComponent
  ],
  providers: [
  ],
})
export class EsperModule { }
