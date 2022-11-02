import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '../shared/shared.module';

import { InventoryComponent } from './inventory.component';
import { InventoryModalEquipmentsComponent } from './modal/inventory.modal.equipments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    InventoryRoutingModule,
    SharedModule
  ],
  declarations: [
    InventoryComponent,
    InventoryModalEquipmentsComponent
  ],
  providers: [
  ],
})
export class InventoryModule { }
