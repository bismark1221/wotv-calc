import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-ui-switch';

import { OtherRoutingModule } from './other-routing.module';
import { SharedModule } from '../shared/shared.module';

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

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    UiSwitchModule,
    OtherRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    OtherComponent,
    OtherTitlesComponent,
    OtherIndexComponent,
    OtherJobPlannerComponent,
    OtherFarmCalculatorComponent,
    OtherBestiaryComponent,
    OtherUnitComponent,
    OtherMateriaComponent,
    OtherMaterialLookupComponent,
    OtherSubCardComponent,
    OtherCardsMasteryComponent
  ],
  providers: [
  ],
})
export class OtherModule { }
