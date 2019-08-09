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

import { TooltipModule } from './tooltip/tooltip.module';
import { SliderModule } from './slider/slider.module';
import { Select2Module } from './select2/select2.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChainingComponent } from './chaining/chaining.component';
import { ChainingModalComponent } from './chaining-modal/chaining-modal.component';
import { ChainChartComponent } from './d3/chain-chart/chain-chart.component';
import { DamageComponent } from './damage/damage.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { MacroComponent } from './macro/macro.component';
import { HowToComponent } from './how-to/how-to.component';
import { RequestsComponent } from './requests/requests.component';
import { JsonComponent } from './json/json.component';
import { FamiliesComponent } from './families/families.component';

import { UnitService } from './services/unit.service';
import { ChainService } from './services/chain.service';
import { BackService } from './services/back.service';
import { FindBestService } from './services/find-best.service';
import { ElementsService } from './services/elements.service';
import { NavService } from './services/nav.service';
import { JsonService } from './services/json.service';
import { MonsterService } from './services/monster.service';
import { WeaponService } from './services/weapon.service';
import { RaceService } from './services/race.service';
import { DamageService } from './services/damage.service';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AbsolutePipe } from './pipes/absolute.pipe';
import { RoundPipe } from './pipes/round.pipe';

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
    ChainingComponent,
    ChainChartComponent,
    CapitalizePipe,
    AbsolutePipe,
    RoundPipe,
    ContactComponent,
    LegalComponent,
    MacroComponent,
    HowToComponent,
    RequestsComponent,
    JsonComponent,
    FamiliesComponent,
    ChainingModalComponent,
    DamageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'app-root'}),
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    LocalStorageModule.withConfig({
      prefix: 'ffbe-chain',
      storageType: 'localStorage'
    }),
    NgxMdModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    TooltipModule,
    SliderModule,
    Select2Module,
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
    ChainService,
    ElementsService,
    BackService,
    FindBestService,
    NavService,
    JsonService,
    MonsterService,
    WeaponService,
    RaceService,
    DamageService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ChainingModalComponent
  ]
})

export class AppModule { }
