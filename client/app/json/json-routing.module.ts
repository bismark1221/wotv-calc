import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JsonComponent } from './json.component';

const routes: Routes = [
  { path: '', component: JsonComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsonRoutingModule { }
