import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsperDetailComponent } from './detail/esper.detail.component';
import { EsperListComponent } from './list/esper.list.component';

const routes: Routes = [
  { path: '', component: EsperListComponent, pathMatch: 'full' },
  { path: ':slug', component: EsperDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsperRoutingModule { }
