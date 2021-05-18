import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LocalStorageModule } from 'angular-2-local-storage';
import { Angulartics2Module } from 'angulartics2';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { NgxMdModule } from 'ngx-md';
import { LocalStorageService } from 'angular-2-local-storage';
import { ClipboardModule } from 'ngx-clipboard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { SentryErrorHandler } from './sentry.errorHandler';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { JsonComponent } from './json/json.component';

import { LoginComponent } from './auth/login.component';

import { UnitsComponent } from './units/units.component';
import { UnitComponent } from './unit/unit.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';
import { EspersComponent } from './espers/espers.component';
import { EsperComponent } from './esper/esper.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { RaidsComponent } from './raids/raids.component';
import { RaidComponent } from './raid/raid.component';
import { QuestsComponent } from './quests/quests.component';
import { QuestComponent } from './quest/quest.component';

import { OtherComponent } from './other/other.component';
import { OtherTitlesComponent } from './other/other.titles.component';
import { OtherIndexComponent } from './other/other.index.component';
import { OtherJobPlannerComponent } from './other/other.jobplanner.component';
import { OtherIlluminatiComponent } from './other/other.illuminati.component';
import { OtherFarmCalculatorComponent } from './other/other.farmcalculator.component';
import { OtherBestiaryComponent } from './other/other.bestiary.component';

import { BuilderComponent } from './builder/builder.component';
import { BuilderUnitComponent } from './builder/builder.unit.component';
import { BuilderCardComponent } from './builder/builder.card.component';
import { BuilderEsperComponent } from './builder/builder.esper.component';
import { BuilderEquipmentComponent } from './builder/builder.equipment.component';
import { BuilderGuildComponent } from './builder/builder.guild.component';
import { BuilderTeamComponent } from './builder/builder.team.component';
import { BuilderMasterRanksComponent } from './builder/builder.mr.component';

import { ModalEquipmentsComponent } from './builder/modal/modal.equipments.component';
import { ModalEspersComponent } from './builder/modal/modal.espers.component';
import { ModalCardsComponent } from './builder/modal/modal.cards.component';
import { ModalGuildComponent } from './builder/modal/modal.guild.component';
import { ModalLoadComponent } from './builder/modal/modal.load.component';
import { ModalSaveComponent } from './builder/modal/modal.save.component';
import { ModalLinkComponent } from './builder/modal/modal.link.component';
import { ModalMasterRanksComponent } from './builder/modal/modal.mr.component';

import { TemplateItemComponent } from './template/template.item.component';

import { UnitService } from './services/unit.service';
import { NavService } from './services/nav.service';
import { JsonService } from './services/json.service';
import { SkillService } from './services/skill.service';
import { EquipmentService } from './services/equipment.service';
import { CardService } from './services/card.service';
import { EsperService } from './services/esper.service';
import { JobService } from './services/job.service';
import { GridService } from './services/grid.service';
import { GuildService } from './services/guild.service';
import { NameService } from './services/name.service';
import { ThemeService } from './services/theme.service';
import { RaidService } from './services/raid.service';
import { TeamService } from './services/team.service';
import { ItemService } from './services/item.service';
import { AuthService } from './services/auth.service';
import { ToolService } from './services/tool.service';
import { JpTranslateService } from './services/jptranslate.service';
import { MasterRanksService } from './services/mr.service';
import { CheckHashService } from './services/checkHash.service';
import { TitleService } from './services/title.service';
import { RangeService } from './services/range.service';
import { IndexService } from './services/index.service';
import { ReviewService } from './services/review.service';
import { QuestService } from './services/quest.service';
import { DataService } from './services/data.service';
import { SimulatorService } from './services/simulator.service';
import { OtherUnitService } from './services/otherunit.service';

import { RoundDownPipe } from './pipes/roundDown.pipe';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { HighlightSearchPipe } from './pipes/highlightSearch.pipe';

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
    RaidsComponent,
    RaidComponent,
    QuestsComponent,
    QuestComponent,
    RoundDownPipe,
    SafeHtmlPipe,
    HighlightSearchPipe,
    BuilderComponent,
    BuilderUnitComponent,
    BuilderCardComponent,
    BuilderEsperComponent,
    BuilderEquipmentComponent,
    BuilderGuildComponent,
    BuilderTeamComponent,
    BuilderMasterRanksComponent,
    ModalEquipmentsComponent,
    ModalEspersComponent,
    ModalCardsComponent,
    ModalGuildComponent,
    ModalMasterRanksComponent,
    ModalLoadComponent,
    ModalSaveComponent,
    ModalLinkComponent,
    LoginComponent,
    OtherComponent,
    OtherTitlesComponent,
    OtherIndexComponent,
    OtherJobPlannerComponent,
    OtherIlluminatiComponent,
    OtherFarmCalculatorComponent,
    OtherBestiaryComponent,
    TemplateItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'app-root'}),
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    LocalStorageModule.forRoot({
      prefix: 'wotv-calc',
      storageType: 'localStorage'
    }),
    NgxMdModule.forRoot(),
    Angulartics2Module.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgbModule,
    PrettyJsonModule,
    NgSelectModule,
    ClipboardModule,
    UiSwitchModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ClickOutsideModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    UnitService,
    NavService,
    JsonService,
    EquipmentService,
    SkillService,
    CardService,
    EsperService,
    JobService,
    GridService,
    GuildService,
    NameService,
    ThemeService,
    RaidService,
    TeamService,
    ItemService,
    AuthService,
    ToolService,
    JpTranslateService,
    MasterRanksService,
    CheckHashService,
    TitleService,
    RangeService,
    IndexService,
    ReviewService,
    QuestService,
    DataService,
    SimulatorService,
    OtherUnitService,
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
