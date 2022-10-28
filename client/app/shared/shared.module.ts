import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { SharedLinkModalComponent } from './linkModal/shared.linkModal.component';
import { SharedSearchOptionsModalComponent } from './searchOptionsModal/shared.searchOptionsModal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
    SharedTabsComponent,
    SharedLinkModalComponent,
    SharedSearchOptionsModalComponent
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
    SharedTabsComponent,
    SharedLinkModalComponent,
    SharedSearchOptionsModalComponent
  ],
  providers: [
  ],
})
export class SharedModule { }