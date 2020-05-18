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

import { BuilderComponent } from './builder/builder.component';
import { BuilderUnitComponent } from './builder/builder.unit.component';
import { BuilderCardComponent } from './builder/builder.card.component';
import { BuilderEsperComponent } from './builder/builder.esper.component';
import { BuilderEquipmentComponent } from './builder/builder.equipment.component';
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

  { path: 'builder', component: BuilderComponent,
    children: [
      { path: '', redirectTo: 'unit', pathMatch: 'full' },
      { path: 'unit', component: BuilderUnitComponent },
      { path: 'unit/:slug', component: BuilderUnitComponent },
      { path: 'card', component: BuilderCardComponent },
      { path: 'card/:slug', component: BuilderCardComponent },
      { path: 'esper', component: BuilderEsperComponent },
      { path: 'esper/:slug', component: BuilderEsperComponent },
      { path: 'equipment', component: BuilderEquipmentComponent },
      { path: 'equipment/:slug', component: BuilderEquipmentComponent },
      { path: 'guild', component: BuilderGuildComponent },
    ]
  },

  { path: 'contact', component: ContactComponent },
  { path: 'legal-notices', component: LegalComponent },
  { path: 'json', component: JsonComponent },



  { path: 'JP', component: HomeComponent },
  { path: 'JP/units', component: UnitsComponent },
  { path: 'JP/unit/:slug', component: UnitComponent },
  { path: 'JP/cards', component: CardsComponent },
  { path: 'JP/card/:slug', component: CardComponent },
  { path: 'JP/espers', component: EspersComponent },
  { path: 'JP/esper/:slug', component: EsperComponent },
  { path: 'JP/equipments', component: EquipmentsComponent },
  { path: 'JP/equipment/:slug', component: EquipmentComponent },

  { path: 'JP/builder', component: BuilderComponent,
    children: [
      { path: '', redirectTo: 'unit', pathMatch: 'full' },
      { path: 'unit', component: BuilderUnitComponent },
      { path: 'unit/:slug', component: BuilderUnitComponent },
      { path: 'card', component: BuilderCardComponent },
      { path: 'card/:slug', component: BuilderCardComponent },
      { path: 'esper', component: BuilderEsperComponent },
      { path: 'esper/:slug', component: BuilderEsperComponent },
      { path: 'equipment', component: BuilderEquipmentComponent },
      { path: 'equipment/:slug', component: BuilderEquipmentComponent },
      { path: 'guild', component: BuilderGuildComponent },
    ]
  },

  { path: 'JP/contact', component: ContactComponent },
  { path: 'JP/legal-notices', component: LegalComponent },
  { path: 'JP/json', component: JsonComponent },


  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,{ enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
