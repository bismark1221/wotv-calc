import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestDetailComponent } from './detail/quest.detail.component';
import { QuestListComponent } from './list/quest.list.component';

const routes: Routes = [
  { path: 'quests', component: QuestListComponent },
  { path: 'quest/:slug', component: QuestDetailComponent },
  { path: 'JP/quests', component: QuestListComponent },
  { path: 'JP/quest/:slug', component: QuestDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestRoutingModule { }
