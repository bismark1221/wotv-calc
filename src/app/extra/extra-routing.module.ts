import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtraContactComponent } from './contact/extra.contact.component';
import { ExtraLegalComponent } from './legal/extra.legal.component';

const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'contact', component: ExtraContactComponent },
  { path: 'legal-notices', component: ExtraLegalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraRoutingModule { }
