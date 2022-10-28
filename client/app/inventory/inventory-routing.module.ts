import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/:inventoryId', component: InventoryComponent },
  { path: 'JP/inventory', component: InventoryComponent },
  { path: 'JP/inventory/:inventoryId', component: InventoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
