import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipmentDetailComponent } from './detail/equipment.detail.component';
import { EquipmentListComponent } from './list/equipment.list.component';

const routes: Routes = [
  { path: 'equipments', component: EquipmentListComponent },
  { path: 'equipment/:slug', component: EquipmentDetailComponent },
  { path: 'JP/equipments', component: EquipmentListComponent },
  { path: 'JP/equipment/:slug', component: EquipmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
