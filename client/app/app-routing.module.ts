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
import { QuestsComponent } from './quests/quests.component';
import { QuestComponent } from './quest/quest.component';

import { OtherComponent } from './other/other.component';
import { OtherTitlesComponent } from './other/other.titles.component';
import { OtherIndexComponent } from './other/other.index.component';
import { OtherJobPlannerComponent } from './other/other.jobplanner.component';
import { OtherIlluminatiComponent } from './other/other.illuminati.component';
import { OtherFarmCalculatorComponent } from './other/other.farmcalculator.component';
import { OtherBestiaryComponent } from './other/other.bestiary.component';
import { OtherUnitComponent } from './other/other.unit.component';

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
  { path: 'quests', component: QuestsComponent },
  { path: 'quest/:slug', component: QuestComponent },
  { path: 'index', redirectTo: 'other/index', pathMatch: 'full' },

  { path: 'other', component: OtherComponent,
    children: [
      { path: '', redirectTo: 'titles', pathMatch: 'full' },
      { path: 'titles', component: OtherTitlesComponent },
      { path: 'index', component: OtherIndexComponent },
      { path: 'jobplanner', component: OtherJobPlannerComponent },
      { path: 'illuminati', component: OtherIlluminatiComponent },
      { path: 'illuminati/:data', component: OtherIlluminatiComponent },
      { path: 'farm-calculator', component: OtherFarmCalculatorComponent },
      { path: 'farm-calculator/:data', component: OtherFarmCalculatorComponent },
      { path: 'bestiary', component: OtherBestiaryComponent },
      { path: 'unit/:slug', component: OtherUnitComponent },
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
  { path: 'JP/quests', component: QuestsComponent },
  { path: 'JP/quest/:slug', component: QuestComponent },
  { path: 'JP/index', redirectTo: 'other/index', pathMatch: 'full' },

  { path: 'JP/other', component: OtherComponent,
    children: [
      { path: '', redirectTo: 'titles', pathMatch: 'full' },
      { path: 'titles', component: OtherTitlesComponent },
      { path: 'index', component: OtherIndexComponent },
      { path: 'jobplanner', component: OtherJobPlannerComponent },
      { path: 'farm-calculator', component: OtherFarmCalculatorComponent },
      { path: 'farm-calculator/:data', component: OtherFarmCalculatorComponent },
      { path: 'bestiary', component: OtherBestiaryComponent },
      { path: 'unit/:slug', component: OtherUnitComponent },
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
  imports: [RouterModule.forRoot(ROUTES, { enableTracing: false, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
