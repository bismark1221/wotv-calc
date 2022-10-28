import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';

import { QuestRoutingModule } from './quest-routing.module';
import { SharedModule } from '../shared/shared.module';

import { QuestDetailComponent } from './detail/quest.detail.component';
import { QuestListComponent } from './list/quest.list.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgxPopperjsModule,
    QuestRoutingModule,
    SharedModule
  ],
  exports: [
    QuestDetailComponent,
    QuestListComponent
  ],
  declarations: [
    QuestDetailComponent,
    QuestListComponent
  ],
  providers: [
  ],
})
export class QuestModule { }
