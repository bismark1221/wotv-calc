import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { JsonComponent } from './json/json.component';

import { UnitsComponent } from './units/units.component';
import { UnitComponent } from './unit/unit.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { EspersComponent } from './espers/espers.component';
import { EsperComponent } from './esper/esper.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { EquipmentComponent } from './equipment/equipment.component';

import { BuilderUnitComponent } from './builder/builder.unit.component';
import { BuilderGuildComponent } from './builder/builder.guild.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'unit/:slug', component: UnitComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'card/:slug', component: CardComponent },
  { path: 'espers', component: EspersComponent },
  { path: 'esper/:slug', component: EsperComponent },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'equipment/:slug', component: EquipmentComponent },

  { path: 'builder', component: BuilderUnitComponent },
  { path: 'builder/unit', component: BuilderUnitComponent },
  { path: 'builder/unit/:slug', component: BuilderUnitComponent },
  { path: 'builder/guild', component: BuilderGuildComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'legal-notices', component: LegalComponent },
  { path: 'json', component: JsonComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,{ enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
