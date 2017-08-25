import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChainingComponent } from './chaining/chaining.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyUnitsComponent } from './my-units/my-units.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chain', component: ChainingComponent },
  { path: 'my-units', component: MyUnitsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'legal-notices', component: LegalComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
