import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'JP', component: HomeComponent },

  {
    path: '',
    loadChildren: () => import('./raid/raid.module')
      .then(mod => mod.RaidModule)
  },

  {
    path: '',
    loadChildren: () => import('./quest/quest.module')
      .then(mod => mod.QuestModule)
  },

  {
    path: '',
    loadChildren: () => import('./card/card.module')
      .then(mod => mod.CardModule)
  },

  {
    path: '',
    loadChildren: () => import('./equipment/equipment.module')
      .then(mod => mod.EquipmentModule)
  },

  {
    path: '',
    loadChildren: () => import('./esper/esper.module')
      .then(mod => mod.EsperModule)
  },

  {
    path: '',
    loadChildren: () => import('./unit/unit.module')
      .then(mod => mod.UnitModule)
  },

  {
    path: '',
    loadChildren: () => import('./json/json.module')
      .then(mod => mod.JsonModule)
  },

  {
    path: '',
    loadChildren: () => import('./extra/extra.module')
      .then(mod => mod.ExtraModule)
  },

  {
    path: '',
    loadChildren: () => import('./inventory/inventory.module')
      .then(mod => mod.InventoryModule)
  },

  {
    path: '',
    loadChildren: () => import('./builder/builder.module')
      .then(mod => mod.BuilderModule)
  },

  {
    path: '',
    loadChildren: () => import('./other/other.module')
      .then(mod => mod.OtherModule)
  },

  {
    path: '',
    loadChildren: () => import('./user/user.module')
      .then(mod => mod.UserModule)
  },

  // Need to be keeped last
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
