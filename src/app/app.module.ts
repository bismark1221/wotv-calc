import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ChainingComponent } from './chaining/chaining.component';

import { ChainChartComponent } from './d3/chain-chart/chain-chart.component';

import { UnitService } from './services/unit.service';
import { ChainService } from './services/chain.service';
import { LoggerService } from './services/logger.service';

import { KeysPipe } from './pipes/keys.pipe';
import { TypePipe } from './pipes/type.pipe';

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
    TypePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MultiselectDropdownModule
  ],
  providers: [
    UnitService,
    LoggerService,
    ChainService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
