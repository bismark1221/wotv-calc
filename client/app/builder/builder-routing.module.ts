import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuilderComponent } from './builder.component';
import { BuilderUnitComponent } from './unit/builder.unit.component';
import { BuilderCardComponent } from './card/builder.card.component';
import { BuilderEsperComponent } from './esper/builder.esper.component';
import { BuilderEquipmentComponent } from './equipment/builder.equipment.component';
import { BuilderGuildComponent } from './guild/builder.guild.component';
import { BuilderTeamComponent } from './team/builder.team.component';
import { BuilderMasterRanksComponent } from './mr/builder.mr.component';
import { BuilderMateriaComponent } from './materia/builder.materia.component';

const routes: Routes = [
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
  { path: 'materia', component: BuilderMateriaComponent },
  { path: 'materia/:data', component: BuilderMateriaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuilderRoutingModule { }
