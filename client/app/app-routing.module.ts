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
import { RaidsComponent } from './raids/raids.component';
import { RaidComponent } from './raid/raid.component';
import { ComparisonComponent } from './comparison/comparison.component';


import { OtherComponent } from './other/other.component';
import { OtherTitlesComponent } from './other/other.titles.component';

import { BuilderComponent } from './builder/builder.component';
import { BuilderUnitComponent } from './builder/builder.unit.component';
import { BuilderCardComponent } from './builder/builder.card.component';
import { BuilderEsperComponent } from './builder/builder.esper.component';
import { BuilderEquipmentComponent } from './builder/builder.equipment.component';
import { BuilderGuildComponent } from './builder/builder.guild.component';
import { BuilderTeamComponent } from './builder/builder.team.component';
import { BuilderMasterRanksComponent } from './builder/builder.mr.component';

const ROUTES: Routes = [
  // GL Router
  { path: '', component: HomeComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'unit/:slug', component: UnitComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'card/:slug', component: CardComponent },
  { path: 'espers', component: EspersComponent },
  { path: 'esper/:slug', component: EsperComponent },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'equipment/:slug', component: EquipmentComponent },
  { path: 'raids', component: RaidsComponent },
  { path: 'raid/:slug', component: RaidComponent },
  { path: 'index', component: ComparisonComponent },

  { path: 'other', component: OtherComponent,
    children: [
      { path: '', redirectTo: 'titles', pathMatch: 'full' },
      { path: 'titles', component: OtherTitlesComponent },
    ]
  },

  { path: 'builder', component: BuilderComponent,
    children: [
      { path: '', redirectTo: 'unit', pathMatch: 'full' },
      { path: 'unit', component: BuilderUnitComponent },
      { path: 'unit/:data', component: BuilderUnitComponent },
      { path: 'card', component: BuilderCardComponent },
      { path: 'card/:data', component: BuilderCardComponent },
      { path: 'esper', component: BuilderEsperComponent },
      { path: 'esper/:data', component: BuilderEsperComponent },
      { path: 'equipment', component: BuilderEquipmentComponent },
      { path: 'equipment/:data', component: BuilderEquipmentComponent },
      { path: 'guild', component: BuilderGuildComponent },
      { path: 'master-ranks', component: BuilderMasterRanksComponent },
      { path: 'team', component: BuilderTeamComponent },
      { path: 'team/:data', component: BuilderTeamComponent },
    ]
  },

  { path: 'contact', component: ContactComponent },
  { path: 'legal-notices', component: LegalComponent },
  { path: 'json', component: JsonComponent },

  // JP Router
  { path: 'JP', component: HomeComponent },
  { path: 'JP/units', component: UnitsComponent },
  { path: 'JP/unit/:slug', component: UnitComponent },
  { path: 'JP/cards', component: CardsComponent },
  { path: 'JP/card/:slug', component: CardComponent },
  { path: 'JP/espers', component: EspersComponent },
  { path: 'JP/esper/:slug', component: EsperComponent },
  { path: 'JP/equipments', component: EquipmentsComponent },
  { path: 'JP/equipment/:slug', component: EquipmentComponent },
  { path: 'JP/raids', component: RaidsComponent },
  { path: 'JP/raid/:slug', component: RaidComponent },
  { path: 'JP/index', component: ComparisonComponent },

  { path: 'JP/other', component: OtherComponent,
    children: [
      { path: '', redirectTo: 'titles', pathMatch: 'full' },
      { path: 'titles', component: OtherTitlesComponent },
    ]
  },

  { path: 'JP/builder', component: BuilderComponent,
    children: [
      { path: '', redirectTo: 'unit', pathMatch: 'full' },
      { path: 'unit', component: BuilderUnitComponent },
      { path: 'unit/:data', component: BuilderUnitComponent },
      { path: 'card', component: BuilderCardComponent },
      { path: 'card/:data', component: BuilderCardComponent },
      { path: 'esper', component: BuilderEsperComponent },
      { path: 'esper/:data', component: BuilderEsperComponent },
      { path: 'equipment', component: BuilderEquipmentComponent },
      { path: 'equipment/:data', component: BuilderEquipmentComponent },
      { path: 'guild', component: BuilderGuildComponent },
      { path: 'master-ranks', component: BuilderMasterRanksComponent },
      { path: 'team', component: BuilderTeamComponent },
      { path: 'team/:data', component: BuilderTeamComponent },
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
