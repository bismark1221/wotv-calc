import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'JP', component: HomeComponent },

  // To remove Later
  { path: 'raid/:slug', redirectTo: 'raids/:slug', pathMatch: 'full' },
  { path: 'JP/raid/:slug', redirectTo: 'JP/raids/:slug', pathMatch: 'full' },

  { path: 'quest/:slug', redirectTo: 'quests/:slug', pathMatch: 'full' },
  { path: 'JP/quest/:slug', redirectTo: 'JP/quests/:slug', pathMatch: 'full' },

  { path: 'card/:slug', redirectTo: 'cards/:slug', pathMatch: 'full' },
  { path: 'JP/card/:slug', redirectTo: 'JP/cards/:slug', pathMatch: 'full' },

  { path: 'esper/:slug', redirectTo: 'espers/:slug', pathMatch: 'full' },
  { path: 'JP/esper/:slug', redirectTo: 'JP/espers/:slug', pathMatch: 'full' },

  { path: 'unit/:slug', redirectTo: 'units/:slug', pathMatch: 'full' },
  { path: 'JP/unit/:slug', redirectTo: 'JP/units/:slug', pathMatch: 'full' },

  { path: 'equipments', redirectTo: 'equipment', pathMatch: 'full' },
  { path: 'JP/equipments', redirectTo: 'JP/equipment', pathMatch: 'full' },

  { path: 'contact', redirectTo: 'extra/contact', pathMatch: 'full' },
  { path: 'JP/contact', redirectTo: 'JP/extra/contact', pathMatch: 'full' },

  { path: 'legal-notices', redirectTo: 'extra/legal-notices', pathMatch: 'full' },
  { path: 'JP/legal-notices', redirectTo: 'JP/extra/legal-notices', pathMatch: 'full' },

  {
    path: 'raids',
    loadChildren: () => import('./raid/raid.module')
      .then(mod => mod.RaidModule)
  },

  {
    path: 'JP/raids',
    loadChildren: () => import('./raid/raid.module')
      .then(mod => mod.RaidModule)
  },

  {
    path: 'other',
    loadChildren: () => import('./other/other.module')
      .then(mod => mod.OtherModule)
  },

  {
    path: 'JP/other',
    loadChildren: () => import('./other/other.module')
      .then(mod => mod.OtherModule)
  },

  {
    path: 'quests',
    loadChildren: () => import('./quest/quest.module')
      .then(mod => mod.QuestModule)
  },

  {
    path: 'JP/quests',
    loadChildren: () => import('./quest/quest.module')
      .then(mod => mod.QuestModule)
  },

  {
    path: 'cards',
    loadChildren: () => import('./card/card.module')
      .then(mod => mod.CardModule)
  },

  {
    path: 'JP/cards',
    loadChildren: () => import('./card/card.module')
      .then(mod => mod.CardModule)
  },

  {
    path: 'equipment',
    loadChildren: () => import('./equipment/equipment.module')
      .then(mod => mod.EquipmentModule)
  },

  {
    path: 'JP/equipment',
    loadChildren: () => import('./equipment/equipment.module')
      .then(mod => mod.EquipmentModule)
  },

  {
    path: 'espers',
    loadChildren: () => import('./esper/esper.module')
      .then(mod => mod.EsperModule)
  },

  {
    path: 'JP/espers',
    loadChildren: () => import('./esper/esper.module')
      .then(mod => mod.EsperModule)
  },

  {
    path: 'units',
    loadChildren: () => import('./unit/unit.module')
      .then(mod => mod.UnitModule)
  },

  {
    path: 'JP/units',
    loadChildren: () => import('./unit/unit.module')
      .then(mod => mod.UnitModule)
  },

  {
    path: 'json',
    loadChildren: () => import('./json/json.module')
      .then(mod => mod.JsonModule)
  },

  {
    path: 'JP/json',
    loadChildren: () => import('./json/json.module')
      .then(mod => mod.JsonModule)
  },

  {
    path: 'extra',
    loadChildren: () => import('./extra/extra.module')
      .then(mod => mod.ExtraModule)
  },

  {
    path: 'JP/extra',
    loadChildren: () => import('./extra/extra.module')
      .then(mod => mod.ExtraModule)
  },

  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module')
      .then(mod => mod.InventoryModule)
  },

  {
    path: 'JP/inventory',
    loadChildren: () => import('./inventory/inventory.module')
      .then(mod => mod.InventoryModule)
  },

  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(mod => mod.UserModule)
  },

  {
    path: 'builder',
    loadChildren: () => import('./builder/builder.module')
      .then(mod => mod.BuilderModule)
  },

  {
    path: 'JP/builder',
    loadChildren: () => import('./builder/builder.module')
      .then(mod => mod.BuilderModule)
  },

  // Need to be keeped last
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
