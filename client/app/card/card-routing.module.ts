import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailComponent } from './detail/card.detail.component';
import { CardListComponent } from './list/card.list.component';

const routes: Routes = [
  { path: 'cards', component: CardListComponent },
  { path: 'card/:slug', component: CardDetailComponent },
  { path: 'JP/cards', component: CardListComponent },
  { path: 'JP/card/:slug', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
