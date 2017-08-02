import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HomeComponent } from './home/home.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChainingComponent } from './chaining/chaining.component';

import { HeroService } from './services/hero.service';
import { UnitService } from './services/unit.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HeroDetailComponent,
    HeroesComponent,
    HomeComponent,
    HeroSearchComponent,
    PageNotFoundComponent,
    ChainingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [
    HeroService,
    UnitService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
