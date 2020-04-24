import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { JsonComponent } from './json/json.component';

import { UnitsComponent } from './units/units.component';
import { CardsComponent } from './cards/cards.component';
import { EspersComponent } from './espers/espers.component';
import { EquipmentsComponent } from './equipments/equipments.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'units', component: UnitsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'espers', component: EspersComponent },
  { path: 'equipments', component: EquipmentsComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'legal-notices', component: LegalComponent },
  { path: 'json', component: JsonComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,{ enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
