import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RaidDetailComponent } from './detail/raid.detail.component';
import { RaidListComponent } from './list/raid.list.component';

const routes: Routes = [
  { path: '', component: RaidListComponent, pathMatch: 'full' },
  { path: ':slug', component: RaidDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaidRoutingModule { }
