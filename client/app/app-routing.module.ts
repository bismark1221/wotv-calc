import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChainingComponent } from './chaining/chaining.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyUnitsComponent } from './my-units/my-units.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { HowToComponent } from './how-to/how-to.component';
import { RequestsComponent } from './requests/requests.component';
import { JsonComponent } from './json/json.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chain', component: ChainingComponent },
  { path: 'my-units', component: MyUnitsComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'legal-notices', component: LegalComponent },
  { path: 'how-to', component: HowToComponent },
  { path: 'json', component: JsonComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,{ enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
