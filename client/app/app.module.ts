import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MarkdownModule } from 'angular2-markdown';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LightboxModule } from 'angular2-lightbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { TooltipModule } from './tooltip/tooltip.module';
import { SliderModule } from './slider/slider.module';
import { Select2Module } from './select2/select2.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyUnitsComponent } from './my-units/my-units.component';
import { ChainingComponent } from './chaining/chaining.component';
import { ChainChartComponent } from './d3/chain-chart/chain-chart.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { MacroComponent } from './macro/macro.component';
import { HowToComponent } from './how-to/how-to.component';

import { UnitService } from './services/unit.service';
import { ChainService } from './services/chain.service';
import { ChainBackService } from './services/chain.back.service';
import { FindBestService } from './services/find-best.service';
import { LoggerService } from './services/logger.service';
import { ElementsService } from './services/elements.service';
import { NavService } from './services/nav.service';

import { KeysPipe } from './pipes/keys.pipe';
import { TypePipe } from './pipes/type.pipe';
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
    KeysPipe,
    TypePipe,
    CapitalizePipe,
    AbsolutePipe,
    RoundPipe,
    MyUnitsComponent,
    ContactComponent,
    LegalComponent,
    MacroComponent,
    HowToComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    LocalStorageModule.withConfig({
      prefix: 'ffbe-chain',
      storageType: 'localStorage'
    }),
    MarkdownModule.forRoot(),
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
    LightboxModule,
    NgbModule.forRoot()
  ],
  providers: [
    UnitService,
    LoggerService,
    ChainService,
    ElementsService,
    ChainBackService,
    FindBestService,
    NavService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
