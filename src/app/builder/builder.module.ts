import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperjsModule } from 'ngx-popperjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { BarRatingModule } from 'ngx-bar-rating';

import { BuilderRoutingModule } from './builder-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BuilderComponent } from './builder.component';

import { BuilderUnitComponent } from './unit/builder.unit.component';
import { BuilderCardComponent } from './card/builder.card.component';
import { BuilderEsperComponent } from './esper/builder.esper.component';
import { BuilderEquipmentComponent } from './equipment/builder.equipment.component';
import { BuilderGuildComponent } from './guild/builder.guild.component';
import { BuilderTeamComponent } from './team/builder.team.component';
import { BuilderMasterRanksComponent } from './mr/builder.mr.component';
import { BuilderMateriaComponent } from './materia/builder.materia.component';

import { BuilderModalEquipmentsComponent } from './modal/equipments/builder.modal.equipments.component';
import { BuilderModalEspersComponent } from './modal/espers/builder.modal.espers.component';
import { BuilderModalCardsComponent } from './modal/cards/builder.modal.cards.component';
import { BuilderModalGuildComponent } from './modal/guild/builder.modal.guild.component';
import { BuilderModalLoadComponent } from './modal/load/builder.modal.load.component';
import { BuilderModalSaveComponent } from './modal/save/builder.modal.save.component';
import { BuilderModalDeleteComponent } from './modal/delete/builder.modal.delete.component';
import { BuilderModalMasterRanksComponent } from './modal/mr/builder.modal.mr.component';
import { BuilderModalMateriaComponent } from './modal/materia/builder.modal.materia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    BuilderRoutingModule,
    NgClickOutsideDirective,
    BarRatingModule,
    UiSwitchModule,
    SharedModule
    /*

    ReactiveFormsModule,
    NgxPopperjsModule,
    */
  ],
  declarations: [
    BuilderComponent,
    BuilderUnitComponent,
    BuilderCardComponent,
    BuilderEsperComponent,
    BuilderEquipmentComponent,
    BuilderGuildComponent,
    BuilderTeamComponent,
    BuilderMasterRanksComponent,
    BuilderMateriaComponent,
    BuilderModalEquipmentsComponent,
    BuilderModalEspersComponent,
    BuilderModalCardsComponent,
    BuilderModalGuildComponent,
    BuilderModalLoadComponent,
    BuilderModalSaveComponent,
    BuilderModalDeleteComponent,
    BuilderModalMasterRanksComponent,
    BuilderModalMateriaComponent
  ],
  providers: [
  ],
})
export class BuilderModule { }
