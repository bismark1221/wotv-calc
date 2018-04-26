import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';
import { ChainService } from '../services/chain.service';
import { BackService } from '../services/back.service';
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
  firstHits: any[] = [];

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
  requestPosition: number = -1;
  requestAlreadyDone: boolean = false;
  requestResult: any[] = [];

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
    private navService: NavService,
    private backService: BackService,
    private activatedRoute: ActivatedRoute
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
      this.chain[i] = {id: 'unselect', selectedIds: []};
      this.selectedUnits[i] = '';
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

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.request && params.type) {
        this.loadRequest(params);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  private loadRequest(params: any) {
    let requests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];
    let request = requests.find(request => request.id === params.request);
    let framesGap = [];
    let i = 0;

    request.units.forEach((requestUnit, index) => {
      framesGap.push(0);
      if (requestUnit) {
        let unit = this.unitService.getUnit(requestUnit.id);
        framesGap[index] = request.chain[params.type].frames[i];
        this.selectUnit(index, unit, requestUnit.ability.id - 1, framesGap); // Adapt to multiple casts
        i++;
      }
    });

    this.onChangeChain();
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
    this.units = this.unitService.getUnits();

    this.createdUnits = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];

    this.reloadList();
  }

  private sortUnits() {
    this.unitService.sort(this.units, this.translateService);
    this.unitService.sort(this.createdUnits, null);

    this.createdUnits.forEach((unit, index) => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = index;

      // Needed to correct old createdUnits
      unit.abilities.forEach(ability => {
        if (this.abilityTypes.findIndex(x => x === ability.type) === -1) {
          ability.damage = ability.type === 'LB' ? 'physic' : ability.type;
          ability.type = 'chain';
        }

        if (!ability.range) {
          ability.range = {
            min: 0,
            max: 20
          }
        }

        if (!ability.hitDamage) {
          let frames = ability.framesList.split('-');
          ability.hitDamage = [];
          frames.forEach(hit => {
            ability.hitDamage.push(100 / frames.length);
          });
        }
      });
    });
  }

  private localSaveUnits() {
    this.chain.forEach(unit => {
      if (unit.id !== 'unselect') {
        unit.activeRename = false;
        unit.selectedAbilities.forEach(ability => {
          ability.activeRename = false;
        });
      }
    })
    this.sortUnits();
    this.localStorageService.set('units', this.createdUnits);
  }

  private getElements(): void {
    this.elements = this.elementsService.getElements();
    this.requiredElements = JSON.parse(JSON.stringify(this.elements));
    this.requiredElements.splice(0, 1);
    this.multiElements = [];

    this.requiredElements.forEach(element => {
      this.translateService.get('elements.' + element).subscribe((res: string) => {
        this.multiElements.push({id: element, name: res});
      });
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

  private findPositionOfAbilityById(unit: any, id: any) {
    let i = 0;
    let position = null;
    unit.abilities.forEach(ability => {
      if (ability.id === id) {
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

        if (unit.selectedAbilities[0] && unit.selectedAbilities[0].type === 'chain') {
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

  private updateChangedUnit(position: number, abilitiesPositions: any = [], framesGap: number = 0) {
    this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
    this.chainService.units[position] = this.chain[position];

    this.chain[position].selectedAbilities = [];
    this.chain[position].selectedIds = [];
    abilitiesPositions.forEach(abilityPosition => {
      this.chain[position].selectedIds.push(this.chain[position].abilities[abilityPosition].id);
    });

    abilitiesPositions.forEach((abilityPosition, index) => {
      this.chain[position].selectedAbilities[index] = this.chain[position].abilities[abilityPosition];
      this.chain[position].selectedAbilities[index].activeRename = false;
    });

    this.chain[position].activeRename = false;
    this.chain[position].framesGap = (!this.chain[position].framesGap || framesGap !== 0 ? framesGap : this.chain[position].framesGap);
  }

  private calculateMaxFramesGap() {
    let hits = this.chainService.getHits();
    let maxHitForChain = this.chainService.findHighestChainHit();
    this.chain.forEach((unit, position) => {
      if (unit.id !== 'unselect') {
        if (unit.selectedAbilities[0].type === 'chain') {
          this.sliderConfig[position].range.min = unit.selectedAbilities[0].range.min;
          this.sliderConfig[position].range.max = unit.selectedAbilities[0].range.max;
        } else {
          this.sliderConfig[position].range.min = unit.selectedAbilities[0].range.min;
          this.sliderConfig[position].range.max = maxHitForChain > unit.selectedAbilities[0].range.max ? maxHitForChain : unit.selectedAbilities[0].range.max;
        }
      }
    });
  }

  private countNumberOfHighRangeChainer() :number {
    let count = 0;
    this.chain.forEach((unit, index) => {
      if (unit.id !== 'unselect') {
        if (unit.selectedAbilities[0].range.max - unit.selectedAbilities[0].range.min > 50)
          count++;
      }
    });

    return count;
  }

  private updateMultipleSkill(position: number) {
    if (this.chain[position].id !== 'unselect' && this.chain[position].selectedAbilities && this.chain[position].selectedAbilities[0]) {
      this.chain[position].possibleMultiple = [{id: 0}];
      let castNumber = 1;
      let ability = this.chain[position].selectedAbilities[0];
      if (ability.magicType) {
        if (this.chain[position].multipleBlack > 1) {
          this.multipleMagic("black", position);
          castNumber = this.chain[position].multipleBlack;
        }
        if (this.chain[position].multipleWhite > 1) {
          this.multipleMagic("white", position);
          castNumber = castNumber < this.chain[position].multipleWhite ? this.chain[position].multipleWhite : castNumber;
        }
      } else {
        castNumber = this.multipleAbility(position);
      }

      this.chain[position].castNumber = [];
      for (let i = 0; i < castNumber; i++) {
        this.chain[position].castNumber.push(i);
        if (i > 0) {

        }
      }
    }
  }

  private multipleMagic(magicType: string, position: number) {
    this.chain[position].abilities.forEach(ability => {
      if (ability.magicType && ability.magicType === magicType) {
        this.chain[position].possibleMultiple.push(ability);
      }
    });
  }

  private multipleAbility(position: number) :number {
    let id = this.chain[position].selectedAbilities[0].id;
    let castNumber = 1;
    if (this.chain[position].multiSkills[id]) {
      castNumber = this.chain[position].multiSkills[id];
      this.chain[position].abilities.forEach(ability => {
        if (this.chain[position].multiSkills[ability.id]) {
          this.chain[position].possibleMultiple.push(ability);
        }
      });
    }

    return castNumber;
  }

  private assignMultipleSkill(unitPosition: number) {
    let ability = this.chain[unitPosition].selectedAbilities[0];

    console.log("assign")
    for(let i = 1; i < this.chain[unitPosition].castNumber.length; i++) {
      console.log(i)
      if (!this.chain[unitPosition].selectedIds[i]) {
        console.log("Add ability")
        this.chain[unitPosition].selectedIds[i] = ability.id;
        this.chain[unitPosition].selectedAbilities[i] = ability;
      }
    }
  }

  addDebuff(unitPosition: number, abilityPosition: number) {
    this.chain[unitPosition].selectedAbilities[abilityPosition].debuffs.push({type: 'dark', value: 1});
    this.saveUnit(unitPosition);
  }

  removeDebuff(unitPosition: number, abilityPosition: number, debuff: number) {
    this.chain[unitPosition].selectedAbilities[abilityPosition].debuffs.splice(debuff, 1);
    this.saveUnit(unitPosition);
  }

  onChangeDebuff(position: number) {
    this.saveUnit(position);
  }

  onChangeSkill(unitPosition: number, abilityPosition: any) {
    let positionInList = this.findPositionOfAbilityById(this.chain[unitPosition], this.chain[unitPosition].selectedIds[abilityPosition]);
    if (positionInList !== null) {
      let ability = this.chain[unitPosition].abilities[positionInList];
      this.chain[unitPosition].selectedAbilities[abilityPosition] = ability;

      if (abilityPosition === 0) {
        this.updateMultipleSkill(unitPosition);
        this.assignMultipleSkill(unitPosition);
      }
    } else {
      this.chain[unitPosition].selectedIds.splice(abilityPosition, 1);
      this.chain[unitPosition].selectedAbilities.splice(abilityPosition, 1);
    }

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
    this.chain[position].selectedIds[0] = 0;
    this.chain[position].selectedAbilities[0] = this.chain[position].abilities[0];

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

    if (this.chain[position].id) {
      this.chain[position].abilities.forEach(ability => {
        if (ability.framesList.split('-').length !== ability.hitDamage.length) {
          let hitCount = ability.framesList.split('-').length;
          for (let i = 0; i < hitCount; i++) {
            ability.hitDamage[i] = 100 / hitCount;
          }
        }
      });
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
    let id = this.duplicatePosition[position];
    let unit;

    if (id < 10000) {
      unit = this.unitService.getUnit(this.duplicatePosition[position]);
    } else {
      unit = this.createdUnits.find(unit => unit.id === id);
    }

    if (unit.id) {
      this.selectedUnits[position] = unit;
      this.onChangeUnit(
        position,
        unit.id,
        this.chain[this.positionIdsInChain[this.duplicatePosition[position]]].selectedIds,
        this.chain[this.positionIdsInChain[this.duplicatePosition[position]]].framesGap
      );
    }
  }

  unselectUnit(position: number) {
    if (this.chain[position].id !== 'unselect') {
      this.selectedUnits[position] = '';
      this.onChangeUnit(position, 'unselect');
    }
    this.viewBestChainers = -1;
    this.bestChainers = [];
  }

  onChangeUnit(position: number, unitId: any = 'unselect', abilities: any = [0], framesGap: number = 0, launchChain: boolean = true) {
    this.idSelected[position] = unitId;

    if (unitId === 'unselect') {
      this.chain[position] = {
        id: 'unselect',
        framesGap: 0,
        selectedIds: []
      };
      this.chainService.units[position] = null;
    } else {
      this.viewBestChainers = -1;
      if (unitId < 10000) {
        this.selectedUnits[position] = this.unitService.getUnit(parseInt(unitId));
      } else if (unitId >= 10000) {
        this.selectedUnits[position] = this.createdUnits.find(unit => unit.id === parseInt(unitId));
      }

      this.updateChangedUnit(position, abilities, framesGap);
      this.updateMultipleSkill(position);
      this.assignMultipleSkill(position);
    }

    if (launchChain) {
      this.onChangeChain();
    }

    this.updateDuplicatePossibilities();
  }

  addAbility(unitPosition: number, abilityPosition: number) {
    this.chain[unitPosition].selectedAbilities[abilityPosition].activeRename = false;
    this.chain[unitPosition].abilities.push(new Ability());

    let newAbilityPosition = this.chain[unitPosition].abilities.length - 1;
    this.chain[unitPosition].selectedAbilities[abilityPosition] = this.chain[unitPosition].abilities[newAbilityPosition];
    this.chain[unitPosition].selectedAbilities[abilityPosition].name = 'Ability ' + this.chain[unitPosition].abilities.length;

    this.saveUnit(unitPosition);
    this.updateMultipleSkill(unitPosition);
  }

  removeAbility(unitPosition: number, abilityPosition: number) {
    let abilityId = this.chain[unitPosition].selectedIds[abilityPosition];
    this.chain[unitPosition].abilities.splice(this.findPositionOfAbilityById(this.chain[unitPosition], abilityId), 1);

    let indexToRemove = [];
    this.chain[unitPosition].selectedAbilities.forEach((ability, index) => {
      if (ability.id === abilityId) {
        if (index === 0) {
          this.chain[unitPosition].selectedAbilities[0] = this.chain[unitPosition].abilities[0];
          this.chain[unitPosition].selectedIds[0] = this.chain[unitPosition].abilities[0].id;
        } else {
          indexToRemove.unshift(index);
        }
      }
    });

    indexToRemove.forEach(index => {
      this.chain[unitPosition].selectedIds.splice(index, 1);
      this.chain[unitPosition].selectedAbilities.splice(index, 1);
    });

    this.updateMultipleSkill(unitPosition);
    this.saveUnit(unitPosition);
  }

  renameUnit(position: number) {
    this.chain[position].activeRename = !this.chain[position].activeRename;
  }

  renameAbility(unitPosition: number, abilityPosition: number) {
    this.chain[unitPosition].selectedAbilities[abilityPosition].activeRename = !this.chain[unitPosition].selectedAbilities[abilityPosition].activeRename;
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
    this.requestPosition = -1;
    this.requestAlreadyDone = false;
    this.requestResult = [];
    if (this.availableDuplicate.length > 0) {
      this.chainService.getChain();
      this.firstHits = this.chainService.calculateFramesDiffForFirstHits();
      this.changeMultiSelectDropdown();
      this.calculateMaxFramesGap();
    }
    console.log(this.chain)
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

  showResult(type: string) {
    let i = 0;

    this.chain.forEach((unit, index) => {
      if (unit && unit.id !== 'unselect') {
        unit.framesGap = this.requestResult[type].frames[i];
        i++;
      }
    });
    this.onChangeChain();

    this.angulartics.eventTrack.next({ action: 'showResult_' + type, properties: { category: 'chain' }});
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
        if (ability.type === 'chain') {
          this.findBestService.units[position].ability = ability; // To adapt...
          let result = this.findBestService.findBestFrames();
          chainers.push({
            unit: unit,
            ability: ability,
            frames: result.modifier.frames,
            modifier: result.modifier.max
          });
        }
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

  selectUnit(position: number, unit: any, ability: any, framesGaps: any, launchChain: boolean = true) { // Pass to multiple abilities
    this.chain.forEach((chainer, index) => {
      chainer.framesGap = framesGaps[index];
    })
    unit.framesGap = framesGaps[position]

    this.selectedUnits[position] = unit;
    this.onChangeUnit(position, unit.id, [this.findPositionOfAbility(unit, ability)], framesGaps[position], launchChain);
  }

  canFindBestChainers(position: number) :boolean {
    let highRangeChainer = this.countNumberOfHighRangeChainer();
    if (
      this.chain[position].id !== 'unselect' ||
      this.availableDuplicate.length === 0 ||
      this.chainers.length > 2 ||
      highRangeChainer > 1 ||
      this.finishers.length > 1 ||
      (highRangeChainer === 1 && this.chainers.length > 1)
    ) {
      return false;
    }

    return true;
  }

  canFindBestChain() :boolean {
    let highRangeChainer = this.countNumberOfHighRangeChainer();
    if (
      highRangeChainer > 2 ||
      this.chainers.length > 4 ||
      this.finishers.length > 3 ||
      ((highRangeChainer === 1 || highRangeChainer === 2) && this.finishers.length > 2) ||
      (highRangeChainer === 2 && this.chainers.length > 3)
    ) {
      return false;
    }

    return true;
  }

  getAbility(unitPosition: number, abilityPosition: number) {
    return this.chain[unitPosition].selectedAbilities[abilityPosition];
  }

  getAvailableAbilities(unitPosition: number, abilityPosition: number) {
    if (this.chain[unitPosition].selectedAbilities.length === 0 || abilityPosition === 0) {
      return this.chain[unitPosition].abilities;
    } else {
      return this.chain[unitPosition].possibleMultiple;
    }
  }

  getActiveRename(unitPosition: number, abilityPosition: number) {
    if (this.getAbility(unitPosition, abilityPosition)) {
      return this.chain[unitPosition].activeRename;
    } else {
      return false;
    }
  }

  async saveRequest() {
    let request = await this.backService.saveRequest(this.chain, false);
    let savedRequests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];
    savedRequests.unshift(request);
    this.localStorageService.set('requests', savedRequests);

    if (request.status === 'done') {
      this.requestAlreadyDone = true;
      this.requestResult = request.chain;
    } else {
      this.requestPosition = request.number;
    }

    this.angulartics.eventTrack.next({ action: 'saveRequest', properties: { category: 'chain' }});
  }
}
