import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { NgxMdModule } from 'ngx-md';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { JsonComponent } from './json/json.component';

import { UnitsComponent } from './units/units.component';
import { UnitComponent } from './unit/unit.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { EspersComponent } from './espers/espers.component';
import { EsperComponent } from './esper/esper.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { EquipmentComponent } from './equipment/equipment.component';

import { UnitService } from './services/unit.service';
import { NavService } from './services/nav.service';
import { JsonService } from './services/json.service';
import { SkillService } from './services/skill.service';
import { EquipmentService } from './services/equipment.service';
import { CardService } from './services/card.service';
import { EsperService } from './services/esper.service';
import { JobService } from './services/job.service';

import { RoundDownPipe } from './pipes/roundDown.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ContactComponent,
    LegalComponent,
    JsonComponent,
    UnitsComponent,
    UnitComponent,
    CardsComponent,
    CardComponent,
    EspersComponent,
    EsperComponent,
    EquipmentsComponent,
    EquipmentComponent,
    RoundDownPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'app-root'}),
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    LocalStorageModule.withConfig({
      prefix: 'wotv-calc',
      storageType: 'localStorage'
    }),
    NgxMdModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    ClipboardModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    PrettyJsonModule
  ],
  providers: [
    UnitService,
    NavService,
    JsonService,
    EquipmentService,
    SkillService,
    CardService,
    EsperService,
    JobService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
