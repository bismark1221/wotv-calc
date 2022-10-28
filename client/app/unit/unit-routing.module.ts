import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitDetailComponent } from './detail/unit.detail.component';
import { UnitListComponent } from './list/unit.list.component';

const routes: Routes = [
  { path: 'units', component: UnitListComponent },
  { path: 'unit/:slug', component: UnitDetailComponent },
  { path: 'JP/units', component: UnitListComponent },
  { path: 'JP/unit/:slug', component: UnitDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitRoutingModule { }
