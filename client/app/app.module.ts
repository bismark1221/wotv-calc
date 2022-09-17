import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LocalStorageModule } from 'angular-2-local-storage';
import { Angulartics2Module } from 'angulartics2';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from 'angular-2-local-storage';
import { ClipboardModule } from 'ngx-clipboard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { SimpleModalModule, defaultSimpleModalOptions } from 'ngx-simple-modal';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { BarRatingModule } from 'ngx-bar-rating';

import { AppRoutingModule } from './app-routing.module';

import { SentryErrorHandler } from './sentry.errorHandler';

import { AppComponent } from './app.component';
import { ResizeDetectorComponent } from './resizeDetector.component';

import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { JsonComponent } from './json/json.component';

import { LoginComponent } from './auth/login.component';
import { UserComponent } from './user/user.component';

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

import { InventoryComponent } from './inventory/inventory.component';
import { ModalInventoryEquipmentsComponent } from './inventory/modal/modal.inventory.equipments.component';

import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';

import { OtherComponent } from './other/other.component';
import { OtherTitlesComponent } from './other/other.titles.component';
import { OtherIndexComponent } from './other/other.index.component';
import { OtherJobPlannerComponent } from './other/other.jobplanner.component';
import { OtherFarmCalculatorComponent } from './other/other.farmcalculator.component';
import { OtherBestiaryComponent } from './other/other.bestiary.component';
import { OtherUnitComponent } from './other/other.unit.component';
import { OtherMateriaComponent } from './other/other.materia.component';
import { OtherMaterialLookupComponent } from './other/other.materiallookup.component';
import { OtherSubCardComponent } from './other/other.subCard.component';

import { BuilderComponent } from './builder/builder.component';
import { BuilderUnitComponent } from './builder/builder.unit.component';
import { BuilderCardComponent } from './builder/builder.card.component';
import { BuilderEsperComponent } from './builder/builder.esper.component';
import { BuilderEquipmentComponent } from './builder/builder.equipment.component';
import { BuilderGuildComponent } from './builder/builder.guild.component';
import { BuilderTeamComponent } from './builder/builder.team.component';
import { BuilderMasterRanksComponent } from './builder/builder.mr.component';
import { BuilderMateriaComponent } from './builder/builder.materia.component';

import { ModalEquipmentsComponent } from './builder/modal/modal.equipments.component';
import { ModalEspersComponent } from './builder/modal/modal.espers.component';
import { ModalCardsComponent } from './builder/modal/modal.cards.component';
import { ModalGuildComponent } from './builder/modal/modal.guild.component';
import { ModalLoadComponent } from './builder/modal/modal.load.component';
import { ModalSaveComponent } from './builder/modal/modal.save.component';
import { ModalDeleteComponent } from './builder/modal/modal.delete.component';
import { ModalLinkComponent } from './builder/modal/modal.link.component';
import { ModalMasterRanksComponent } from './builder/modal/modal.mr.component';
import { ModalMateriaComponent } from './builder/modal/modal.materia.component';

import { TemplateItemComponent } from './template/template.item.component';

import { SearchOptionsModalComponent } from './searchOptionsModal/searchOptionsModal.component';

import { UnitService } from './services/unit.service';
import { NavService } from './services/nav.service';
import { SkillService } from './services/skill.service';
import { EquipmentService } from './services/equipment.service';
import { CardService } from './services/card.service';
import { EsperService } from './services/esper.service';
import { JobService } from './services/job.service';
import { GridService } from './services/grid.service';
import { GuildService } from './services/guild.service';
import { ThemeService } from './services/theme.service';
import { RaidService } from './services/raid.service';
import { TeamService } from './services/team.service';
import { ItemService } from './services/item.service';
import { AuthService } from './services/auth.service';
import { ToolService } from './services/tool.service';
import { MasterRanksService } from './services/mr.service';
import { TitleService } from './services/title.service';
import { RangeService } from './services/range.service';
import { IndexService } from './services/index.service';
import { QuestService } from './services/quest.service';
import { SimulatorService } from './services/simulator.service';
import { OtherUnitService } from './services/otherunit.service';
import { ApiService } from './services/api.service';
import { HomeService } from './services/home.service';
import { UserService } from './services/user.service';
import { MateriaService } from './services/materia.service';
import { InventoryService } from './services/inventory.service';

import { RoundDownPipe } from './pipes/roundDown.pipe';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';
import { HighlightSearchPipe } from './pipes/highlightSearch.pipe';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
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
    InventoryComponent,
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
    BuilderMateriaComponent,
    ModalEquipmentsComponent,
    ModalEspersComponent,
    ModalCardsComponent,
    ModalGuildComponent,
    ModalMasterRanksComponent,
    ModalMateriaComponent,
    ModalLoadComponent,
    ModalSaveComponent,
    ModalDeleteComponent,
    ModalLinkComponent,
    ModalInventoryEquipmentsComponent,
    LoginComponent,
    OtherComponent,
    OtherTitlesComponent,
    OtherIndexComponent,
    OtherJobPlannerComponent,
    OtherFarmCalculatorComponent,
    OtherBestiaryComponent,
    OtherUnitComponent,
    OtherMateriaComponent,
    OtherMaterialLookupComponent,
    OtherSubCardComponent,
    TemplateItemComponent,
    UserComponent,
    SearchOptionsModalComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'app-root'}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LocalStorageModule.forRoot({
      prefix: 'wotv-calc',
      storageType: 'localStorage'
    }),
    Angulartics2Module.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgSelectModule,
    ClipboardModule,
    UiSwitchModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgClickOutsideDirective,
    SimpleModalModule.forRoot({container: 'modal-container'}, {...defaultSimpleModalOptions, ...{
      closeOnEscape: true,
      animationDuration: 1,
      autoFocus: false
    }}),
    NgxPopperjsModule,
    BarRatingModule
  ],
  providers: [
    UnitService,
    NavService,
    EquipmentService,
    SkillService,
    CardService,
    EsperService,
    JobService,
    GridService,
    GuildService,
    ThemeService,
    RaidService,
    TeamService,
    ItemService,
    AuthService,
    ToolService,
    MasterRanksService,
    TitleService,
    RangeService,
    IndexService,
    QuestService,
    SimulatorService,
    OtherUnitService,
    ApiService,
    HomeService,
    UserService,
    MateriaService,
    InventoryService,
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
