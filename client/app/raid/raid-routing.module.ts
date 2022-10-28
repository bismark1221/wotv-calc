import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaidDetailComponent } from './detail/raid.detail.component';
import { RaidListComponent } from './list/raid.list.component';

const routes: Routes = [
  { path: 'raids', component: RaidListComponent },
  { path: 'raid/:slug', component: RaidDetailComponent },
  { path: 'JP/raids', component: RaidListComponent },
  { path: 'JP/raid/:slug', component: RaidDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaidRoutingModule { }
