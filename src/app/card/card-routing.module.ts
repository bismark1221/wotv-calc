import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from './detail/card.detail.component';
import { CardListComponent } from './list/card.list.component';

const routes: Routes = [
  { path: '', component: CardListComponent, pathMatch: 'full' },
  { path: ':slug', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
