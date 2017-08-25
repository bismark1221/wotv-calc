import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MarkdownModule } from 'angular2-markdown';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyUnitsComponent } from './my-units/my-units.component';
import { ChainingComponent } from './chaining/chaining.component';
import { ChainChartComponent } from './d3/chain-chart/chain-chart.component';

import { UnitService } from './services/unit.service';
import { ChainService } from './services/chain.service';
import { LoggerService } from './services/logger.service';
import { ElementsService } from './services/elements.service';

import { KeysPipe } from './pipes/keys.pipe';
import { TypePipe } from './pipes/type.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';

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
    RoundPipe,
    MyUnitsComponent,
    ContactComponent,
    LegalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    LocalStorageModule.withConfig({
      prefix: 'ffbe-chain',
      storageType: 'localStorage'
    }),
    MarkdownModule.forRoot(),
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  providers: [
    UnitService,
    LoggerService,
    ChainService,
    ElementsService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
