import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitDetailComponent } from './detail/unit.detail.component';
import { UnitListComponent } from './list/unit.list.component';

const routes: Routes = [
  { path: '', component: UnitListComponent, pathMatch: 'full' },
  { path: ':slug', component: UnitDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
