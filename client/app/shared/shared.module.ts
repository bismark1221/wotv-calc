import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxPopperjsModule } from 'ngx-popperjs';

import { SharedRoundDownPipe } from './pipes/shared.roundDown.pipe';
import { SharedSafeHtmlPipe } from './pipes/shared.safeHtml.pipe';
import { SharedHighlightSearchPipe } from './pipes/shared.highlightSearch.pipe';

import { SharedCardComponent } from './card/shared.card.component';
import { SharedItemComponent } from './item/shared.item.component';
import { SharedSkillRowComponent } from './skillRow/shared.skillRow.component';
import { SharedSkillTypeComponent } from './skillType/shared.skillType.component';
import { SharedSkillWithUpgradeComponent } from './skillWithUpgrade/shared.skillWithUpgrade.component';
import { SharedTabComponent } from './tab/shared.tab.component';
import { SharedTabsComponent } from './tabs/shared.tabs.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPopperjsModule
  ],
  exports: [
    SharedRoundDownPipe,
    SharedSafeHtmlPipe,
    SharedHighlightSearchPipe,
    SharedCardComponent,
    SharedItemComponent,
    SharedSkillRowComponent,
    SharedSkillTypeComponent,
    SharedSkillWithUpgradeComponent,
    SharedTabComponent,
    SharedTabsComponent
  ],
  declarations: [
    SharedRoundDownPipe,
    SharedSafeHtmlPipe,
    SharedHighlightSearchPipe,
    SharedCardComponent,
    SharedItemComponent,
    SharedSkillRowComponent,
    SharedSkillTypeComponent,
    SharedSkillWithUpgradeComponent,
    SharedTabComponent,
    SharedTabsComponent
  ],
  providers: [
  ],
})
export class SharedModule { }