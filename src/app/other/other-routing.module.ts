import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherComponent } from './other.component';
import { OtherTitlesComponent } from './titles/other.titles.component';
import { OtherIndexComponent } from './index/other.index.component';
import { OtherJobPlannerComponent } from './jobplanner/other.jobplanner.component';
import { OtherFarmCalculatorComponent } from './farmcalculator/other.farmcalculator.component';
import { OtherBestiaryComponent } from './bestiary/other.bestiary.component';
import { OtherUnitComponent } from './unit/other.unit.component';
import { OtherMateriaComponent } from './materia/other.materia.component';
import { OtherMaterialLookupComponent } from './materiallookup/other.materiallookup.component';
import { OtherSubCardComponent } from './subCard/other.subCard.component';
import { OtherCardsMasteryComponent } from './cardsMastery/other.cardsMastery.component';

const routes: Routes = [
  { path: '', redirectTo: 'titles', pathMatch: 'full' },
  { path: 'titles', component: OtherTitlesComponent },
  { path: 'index', component: OtherIndexComponent },
  { path: 'jobplanner', component: OtherJobPlannerComponent },
  { path: 'farm-calculator', component: OtherFarmCalculatorComponent },
  { path: 'farm-calculator/:data', component: OtherFarmCalculatorComponent },
  { path: 'bestiary', component: OtherBestiaryComponent },
  { path: 'unit/:slug', component: OtherUnitComponent },
  { path: 'materia', component: OtherMateriaComponent },
  { path: 'material-lookup', component: OtherMaterialLookupComponent },
  { path: 'subcard-ratio', component: OtherSubCardComponent },
  { path: 'cards-mastery', component: OtherCardsMasteryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRoutingModule { }
