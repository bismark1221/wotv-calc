import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';
import { ChainService } from '../services/chain.service';
import { FindBestService } from '../services/find-best.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})
export class ChainingComponent implements OnInit, AfterViewChecked {
  @ViewChild('chainDiv') private chainDiv: ElementRef;
  private lastCreatedId: number = 10000;
  private positionIds: any = {};
  private positionIdsInChain: any = {};
  private units: Unit[];

  chain: any[] = [];
  idSelected: string[] = [];
  idCreated: string[] = [];
  selectedUnits: any[] = [];
  selectedAbilities: any[] = [];
  availableDuplicate: any[] = [];
  chainers: any[] = [];
  finishers: any[] = [];

  createdUnits: any[] = [];
  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  abilityDamages: string[] = ['physic', 'magic', 'hybrid'];
  abilityTypes: string[] = ['chain', 'finish'];

  viewOptions: number = -1;
  bestChainers: any[] = [];
  duplicatePosition: number[] = [];
  viewBestChainers: number = -1;

  multiElementsTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability element(s)'
  };

  multiElementsSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 8
  };

  sliderConfig: any[] = [];

  observableUnits: Array<Select2OptionData> = [];

  select2Options: Select2Options = {
    theme: 'bootstrap'
  }

  labels = {
    units: 'Units',
    myunits: 'My Units'
  }

  constructor(
    private unitService: UnitService,
    private chainService: ChainService,
    private findBestService: FindBestService,
    private elementsService: ElementsService,
    private localStorageService: LocalStorageService,
    private ref: ChangeDetectorRef,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private navService: NavService
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.getElements();
      this.reloadList();
    });
  }

  ngOnInit(): void {
    for (let i = 0; i <= 5; i++) {
      this.chain[i] = {id: 'unselect'};
      this.selectedUnits[i] = '';
      this.selectedAbilities[i] = 0;
      this.idSelected[i] = 'unselect';
      this.idCreated[i] = 'unselect';
      this.sliderConfig[i] = {
        start: 1,
        step: 1,
        range: {
          min: 0,
          max: 20
        },
        pips: {
          mode: 'count',
          values: 11,
          density: 6
        }
      };
    }
    this.getUnits();
    this.getElements();
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  private getTranslation() {
    this.translateService.get('chain.label.multiElements').subscribe((res: string) => {
      this.multiElementsTexts = {
        defaultTitle: res
      };
    });

    this.translateService.get('chain.label.units').subscribe((res: string) => {
      this.labels.units = res;
    });

    this.translateService.get('chain.label.my-units').subscribe((res: string) => {
      this.labels.myunits = res;
    });
  }

  private getUnits(): void {
    this.unitService.getUnits().then(units => {
      this.units = units;

      this.createdUnits = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];

      this.reloadList();
    });
  }

  private sortUnits() {
    this.unitService.sort(this.units, this.translateService);
    this.unitService.sort(this.createdUnits, null);

    this.createdUnits.forEach((unit, index) => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = index;

      // Needed to correct old createdUnits
      unit.abilities.forEach(ability => {
        if(this.abilityTypes.findIndex(x => x === ability.type) === -1) {
          ability.damage = ability.type === 'LB' ? 'physic' : ability.type;
          ability.type = 'chain';
        }
      });
    });
  }

  private localSaveUnits() {
    this.chain.forEach(unit => {
      if (unit.id !== 'unselect') {
        unit.activeRename = false;
        unit.ability.activeRename = false;
      }
    })
    this.sortUnits();
    this.localStorageService.set('units', this.createdUnits);
  }

  private getElements(): void {
    this.elementsService.getElements().then(elements => {
      this.elements = elements;
      this.requiredElements = JSON.parse(JSON.stringify(this.elements));
      this.requiredElements.splice(0, 1);
      this.multiElements = [];

      this.requiredElements.forEach(element => {
        this.translateService.get('elements.' + element).subscribe((res: string) => {
          this.multiElements.push({id: element, name: res});
        });
      })
    });
  }

  private updateLocalDebuffs(position: number) {
    this.chain[position].debuffs = [];
    Object.keys(this.chain[position].ability.debuff).forEach(key => {
      this.chain[position].debuffs.push({type: key, value: this.chain[position].ability.debuff[key]});
    });
  }

  private updateServiceDebuffs(position: number) {
    this.chain[position].ability.debuff = {};
    this.chain[position].debuffs.forEach(debuff => {
      let actualDebuff = this.chain[position].ability.debuff[debuff.type] ? this.chain[position].ability.debuff[debuff.type] : 1;
      this.chain[position].ability.debuff[debuff.type] = debuff.value > actualDebuff ? debuff.value : actualDebuff;
    });
  }

  private changeMultiSelectDropdown() {
    if (this.chainDiv.nativeElement.clientWidth === 250) {
      this.multiElementsSettings.dynamicTitleMaxItems = 3;
    } else {
      this.multiElementsSettings.dynamicTitleMaxItems = 8;
    }
  }

  private findPositionOfAbility(unit: any, searchAbility: any) {
    let i = 0;
    let position = 0;
    unit.abilities.forEach(ability => {
      if (ability.name === searchAbility.name) {
        position = i;
      }
      i++;
    });

    return position;
  }

  private reloadList() {
    this.sortUnits();

    this.observableUnits = [
      {
        id: 'unselect',
        text: this.labels.units,
        children: []
      },
      {
        id: '0',
        text: this.labels.units,
        children: []
      },
      {
        id: '0',
        text: this.labels.myunits,
        children: []
      }
    ];

    this.units.forEach(unit => {
      this.observableUnits[1].children.push({
        id: unit.id.toString(),
        text: unit.getName(this.translateService)
      });

      unit.abilities.forEach(ability => {
        ability.getName(this.translateService)
      })
    });

    this.createdUnits.forEach(unit => {
      this.observableUnits[2].children.push({
        id: unit.id.toString(),
        text: unit.name
      });
    });

    delete this.observableUnits[0].children;
  }

  private updateDuplicatePossibilities() {
    this.availableDuplicate = [];
    this.chainers = [];
    this.finishers = [];
    this.positionIdsInChain = {};

    this.chain.forEach(unit => {
      if (unit.id !== 'unselect') {
        if (this.availableDuplicate.findIndex(x => x.id === unit.id)) {
          this.availableDuplicate.push(unit);
        }

        if (unit.type === 'chain') {
          this.chainers.push(unit);
        } else {
          this.finishers.push(unit);
        }
      }
    });

    this.chain.forEach((unit, index) => {
      this.positionIdsInChain[unit.id] = index;
      if (this.availableDuplicate[0]) {
        this.duplicatePosition[index] = this.availableDuplicate[0].id;
      }
    });
  }

  private updateChangedUnit(position: number, ability: number = 0, framesGap: number = 0) {
    this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
    this.chainService.units[position] = this.chain[position];
    this.selectedAbilities[position] = ability;
    this.chain[position].ability = this.chain[position].abilities[ability];
    this.updateLocalDebuffs(position);
    this.chain[position].activeRename = false;
    this.chain[position].ability.activeRename = false;
    this.chain[position].framesGap = (!this.chain[position].framesGap || framesGap !== 0 ? framesGap : this.chain[position].framesGap);
  }

  private calculateMaxFramesGap() {
    let hits = this.chainService.getHits();
    let maxHitForChain = this.chainService.findHighestChainHit();
    this.chain.forEach((unit, position) => {
      if (unit.id !== 'unselect') {
        if (unit.ability.type === 'chain') {
          this.sliderConfig[position].range.max = 20;
        } else {
          this.sliderConfig[position].range.max = maxHitForChain > 20 ? maxHitForChain : 20;
        }
      }
    });
  }

  addDebuff(position: number) {
    this.chain[position].debuffs.push({type: 'dark', value: 1});
    this.updateServiceDebuffs(position);
    this.saveUnit(position);
  }

  removeDebuff(position: number, debuff: number) {
    this.chain[position].debuffs.splice(debuff, 1);
    this.updateServiceDebuffs(position);
    this.saveUnit(position);
  }

  onChangeDebuff(position: number) {
    this.updateServiceDebuffs(position);
    this.saveUnit(position);
  }

  onChangeSkill(position: number) {
    this.chain[position].ability = this.chain[position].abilities[this.selectedAbilities[position]];
    this.updateLocalDebuffs(position);
    this.onChangeChain();
  }

  onChangeDual(position: number) {
    this.chain[position].weapons[1] = '';
    this.saveUnit(position);
  }

  createNewUnit(position: number) {
    this.selectedUnits[position] = new Unit();
    this.selectedUnits[position].name = 'Unit ' + (this.createdUnits.length + 1);
    this.selectedUnits[position].activeRename = true;

    this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
    this.chain[position].ability = this.chain[position].abilities[0];

    this.saveUnit(position);

    this.idSelected[position] = this.selectedUnits[position].id;
    this.onChangeUnit(position, this.chain[position].id);

    this.angulartics.eventTrack.next({ action: 'createNewUnit', properties: { category: 'chain' }});
  }

  createNewUnitFromPredefined(position: number) {
    let unit = JSON.parse(JSON.stringify(this.chain[position]));
    unit.name = 'Unit ' + (this.createdUnits.length + 1);
    unit.id = undefined;

    this.chain[position] = unit;
    this.saveUnit(position);

    this.idSelected[position] = this.selectedUnits[position].id;
    this.onChangeUnit(position, this.chain[position].id);

    this.angulartics.eventTrack.next({ action: 'createNewUnitFromPredefined', properties: { category: 'chain' }});
  }

  saveUnit(position: number) {
    if (!this.chain[position].id || this.chain[position].id > 10000) {
      let positionCreated = this.positionIds[this.chain[position].id];
      if (positionCreated >= 0) {
        this.createdUnits[positionCreated] = this.chain[position];
      } else {
        this.lastCreatedId++;
        this.chain[position].id = this.lastCreatedId;
        this.createdUnits.push(this.chain[position]);
      }

      this.selectedUnits[position] = this.chain[position];

      this.localSaveUnits();
      this.reloadList();
    }

    this.onChangeChain();
  }

  removeUnit(position: number) {
    this.createdUnits.splice(this.positionIds[this.chain[position].id], 1);
    this.localSaveUnits();
    this.selectedUnits[position] = '';
    this.onChangeUnit(position, 'unselect');
    this.reloadList();
  }

  duplicateUnit(position: number) {
    let unit = this.unitService.getUnit(this.duplicatePosition[position]);
    this.selectedUnits[position] = unit;

    this.onChangeUnit(
      position,
      unit.id,
      this.selectedAbilities[this.positionIdsInChain[this.duplicatePosition[position]]],
      this.chain[this.positionIdsInChain[this.duplicatePosition[position]]].framesGap
    );
  }

  unselectUnit(position: number) {
    if (this.chain[position].id !== 'unselect') {
      this.selectedUnits[position] = '';
      this.onChangeUnit(position, 'unselect');
    }
    this.viewBestChainers = -1;
    this.bestChainers = [];
  }

  onChangeUnit(position: number, unitId: any = 'unselect', ability: number = 0, framesGap: number = 0) {
    this.idSelected[position] = unitId;

    if (unitId === 'unselect') {
      this.chain[position] = {
        id: 'unselect',
        framesGap: 0
      };
      this.chainService.units[position] = null;
      this.selectedAbilities[position] = 0;
    } else {
      this.viewBestChainers = -1;
      if (unitId < 10000) {
        this.selectedUnits[position] = this.unitService.getUnit(parseInt(unitId));
      } else if (unitId >= 10000) {
        this.selectedUnits[position] = this.createdUnits.find(unit => unit.id === parseInt(unitId));
      }

      if (this.chain[position] && this.chain[position].id === unitId) {
        ability = this.selectedAbilities[position];
      }

      this.updateChangedUnit(position, ability, framesGap);
    }

    this.onChangeChain();
    this.updateDuplicatePossibilities();
  }

  addAbility(position: number) {
    this.chain[position].ability.activeRename = false;
    this.chain[position].abilities.push(new Ability());
    this.selectedAbilities[position] = this.chain[position].abilities.length - 1;
    this.chain[position].ability = this.chain[position].abilities[this.selectedAbilities[position]];
    this.chain[position].ability.name = 'Ability ' + this.chain[position].abilities.length;
    this.updateLocalDebuffs(position);
    this.saveUnit(position);
  }

  removeAbility(position: number) {
    this.chain[position].abilities.splice(this.selectedAbilities[position], 1);
    this.chain[position].ability = this.chain[position].abilities[0];
    this.updateLocalDebuffs(position);
    this.saveUnit(position);
    this.selectedAbilities[position] = 0;
  }

  renameUnit(position: number) {
    this.chain[position].activeRename = !this.chain[position].activeRename;
  }

  renameAbility(position: number) {
    this.chain[position].ability.activeRename = !this.chain[position].ability.activeRename;
  }

  showOptions(modal, position: number) {
    this.viewOptions = position;
    this.navService.updateMenu(true);

    this.modalService.open(modal, { windowClass: 'options-modal' }).result.then(
      (result) => {
        this.viewOptions = -1;
        this.navService.updateMenu(false);
      },
      (reason) => {
        this.viewOptions = -1;
        this.navService.updateMenu(false);
      }
    );

    this.angulartics.eventTrack.next({ action: 'showOptions', properties: { category: 'chain' }});

    this.changeMultiSelectDropdown();
  }

  updateFramesGap(position: number, minusPlus: boolean) {
    minusPlus ? this.chain[position].framesGap++ : this.chain[position].framesGap--;

    if (this.chain[position].framesGap <= 0) {
      this.chain[position].framesGap = 0;
    } else if (this.chain[position].framesGap >= this.sliderConfig[position].range.max) {
      this.chain[position].framesGap = this.sliderConfig[position].range.max;
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    if (this.availableDuplicate.length > 0) {
      this.chainService.getChain();
      this.changeMultiSelectDropdown();
      this.calculateMaxFramesGap();
    }
  }

  findBestFrames(type: string) {
    let result;

    this.findBestService.units = this.chainService.units;
    result = this.findBestService.findBestFrames();

    this.chain.forEach((unit, index) => {
      unit.framesGap = result[type].frames[index];
    });
    this.onChangeChain();

    this.angulartics.eventTrack.next({ action: 'findBestFrames_' + type, properties: { category: 'chain' }});
  }

  findBestChainers(position: number) {
    let chainers = [];
    let allUnits = this.units.concat(this.createdUnits);

    this.viewBestChainers = position;
    this.bestChainers = [];
    this.findBestService.units = JSON.parse(JSON.stringify(this.chainService.units));

    allUnits.forEach(unit => {
      this.findBestService.units[position] = JSON.parse(JSON.stringify(unit));

      unit.abilities.forEach(ability => {
        this.findBestService.units[position].ability = ability;
        let result = this.findBestService.findBestFrames();
        chainers.push({
          unit: unit,
          ability: ability,
          frames: result.modifier.frames,
          modifier: result.modifier.max
        });
      });
    });

    chainers.sort((a: any, b: any) => {
      if (a.modifier > b.modifier) {
        return -1
      } else if (a.modifier < b.modifier) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < 5; i++) {
      if (chainers[i]) {
        this.bestChainers.push(chainers[i]);
      }
    }

    this.angulartics.eventTrack.next({ action: 'findBestChainers', properties: { category: 'chain' }});
  }

  selectUnit(position: number, unit: any, ability: any, framesGaps: any) {
    this.chain.forEach((chainer, index) => {
      chainer.framesGap = framesGaps[index];
    })
    unit.framesGap = framesGaps[position]

    this.selectedUnits[position] = unit;
    this.onChangeUnit(position, unit.id, this.findPositionOfAbility(unit, ability), framesGaps[position]);
  }
}
