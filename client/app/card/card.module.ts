import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { CardRoutingModule } from './card-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CardDetailComponent } from './detail/card.detail.component';
import { CardListComponent } from './list/card.list.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperjsModule,
    UiSwitchModule,
    CardRoutingModule,
    SharedModule
  ],
  declarations: [
    CardDetailComponent,
    CardListComponent
  ],
  providers: [
  ],
})
export class CardModule { }
