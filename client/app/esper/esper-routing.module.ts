import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsperDetailComponent } from './detail/esper.detail.component';
import { EsperListComponent } from './list/esper.list.component';

const routes: Routes = [
  { path: 'espers', component: EsperListComponent },
  { path: 'esper/:slug', component: EsperDetailComponent },
  { path: 'JP/espers', component: EsperListComponent },
  { path: 'JP/esper/:slug', component: EsperDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsperRoutingModule { }
