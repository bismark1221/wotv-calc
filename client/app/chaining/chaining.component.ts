import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';
import { ChainService } from '../services/chain.service';
import { FindBestService } from '../services/find-best.service';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})
export class ChainingComponent implements OnInit, AfterViewChecked {
  @ViewChild('chainDiv') private chainDiv: ElementRef;
  private lastCreatedId: number = 10000;
  private positionIds: any = {};
  private units: Unit[];

  chain: any[] = [];
  idSelected: string[] = [];
  idCreated: string[] = [];
  selectedUnits: any[] = ['', '', '', '', '', ''];
  selectedAbilities: any[] = [0, 0, 0, 0, 0, 0];

  createdUnits: any[] = [];
  diffFirstHits: any[] = [];
  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  abilityDamages: string[] = ['physic', 'magic', 'hybrid'];
  abilityTypes: string[] = ['chain', 'finish'];

  viewOptions: boolean[] = [false, false];
  bestChainers: any[] = [];
  duplicatePosition: number = 0;

  multiElementsTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability element(s)'
  };

  multiElementsSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 8
  };

  sliderConfig: any[] = [];

  observableUnits: Array<Select2OptionData> = [];
  observableCreatedUnits: Array<Select2OptionData> = [];

  select2Options: Select2Options = {
    theme: 'bootstrap'
  }

  constructor(
    private unitService: UnitService,
    private chainService: ChainService,
    private findBestService: FindBestService,
    private elementsService: ElementsService,
    private localStorageService: LocalStorageService,
    private ref: ChangeDetectorRef
  ) { }

  private getUnits(): void {
    this.unitService.getUnits().then(units => {
      this.units = units;

      this.createdUnits = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];

      this.reloadList();
    });
  }

  private sortUnits() {
    this.unitService.sort(this.units);
    this.unitService.sort(this.createdUnits);

    let position = 0;
    this.createdUnits.forEach(unit => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = position;
      position++;
    });
  }

  private localSaveUnits() {
    this.chain.forEach(unit => {
      unit.activeRename = false;
      unit.ability.activeRename = false;
    })
    this.sortUnits();
    this.localStorageService.set('units', this.createdUnits);
  }

  private getElements(): void {
    this.elementsService.getElements().then(elements => {
      this.elements = elements;
      this.requiredElements = JSON.parse(JSON.stringify(this.elements));
      this.requiredElements.splice(0, 1);

      this.requiredElements.forEach(element => {
        this.multiElements.push({id: element, name: element});
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

  ngOnInit(): void {
    for (let i = 0; i <= 5; i++) {
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

    this.viewOptions[position] = true;
    this.saveUnit(position);

    this.idSelected[position] = this.selectedUnits[position].id;
    this.onChangeUnit(position, this.chain[position].id);
  }

  createNewUnitFromPredefined(position: number) {
    let unit = JSON.parse(JSON.stringify(this.chain[position]));
    unit.name = 'Unit ' + (this.createdUnits.length + 1);
    unit.id = undefined;

    this.chain[position] = unit;
    this.viewOptions[position] = true;
    this.saveUnit(position);

    this.idSelected[position] = this.selectedUnits[position].id;
    this.onChangeUnit(position, this.chain[position].id);
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

  private reloadList() {
    this.sortUnits();

    this.observableUnits = [
      {
        id: 'unselect',
        text: 'Predefined units',
        children: []
      },
      {
        id: '0',
        text: 'Chainers',
        children: []
      },
      {
        id: '0',
        text: 'Finishers',
        children: []
      }
    ];

    this.units.forEach(unit => {
      this.observableUnits[(unit.type === 'chain' ? 1 : 2)].children.push({
        id: unit.id.toString(),
        text: unit.name
      });
    });
    delete this.observableUnits[0].children;

    this.observableCreatedUnits = [
      {
        id: 'unselect',
        text: 'My units',
        children: []
      },
      {
        id: '0',
        text: 'Chainers',
        children: []
      },
      {
        id: '0',
        text: 'Finishers',
        children: []
      }
    ];

    this.createdUnits.forEach(unit => {
      this.observableCreatedUnits[(unit.type === 'chain' ? 1 : 2)].children.push({
        id: unit.id.toString(),
        text: unit.name
      });
    });
    delete this.observableCreatedUnits[0].children;
  }

  removeUnit(position: number) {
    this.createdUnits.splice(this.positionIds[this.chain[position].id], 1);
    this.localSaveUnits();
    this.selectedUnits[position] = '';
    this.onChangeUnit(position, 'unselect');
    this.reloadList();
  }

  duplicateUnit(position: number, copy: number) {
    this.idSelected[position] = this.idSelected[copy];
    this.selectedUnits[position] = this.selectedUnits[copy];
    this.selectedAbilities[position] = this.selectedAbilities[copy];

    this.chain[position] = JSON.parse(JSON.stringify(this.chain[copy]));
    this.chainService.units[position] = this.chain[position];
    this.updateLocalDebuffs(position);

    this.onChangeChain();
  }

  unselectUnit(position: number) {
    if (this.chain[position]) {
      let deleteLast = false;
      if (position !== this.chain.length - 1) {
        deleteLast = true;
      }

      this.selectedUnits[position] = '';
      this.onChangeUnit(position, 'unselect');

      if (deleteLast) {
        this.selectedUnits[(this.chain.length - 1)] = '';
        this.onChangeUnit((this.chain.length - 1), 'unselect');
      }
    } else {
      this.bestChainers = [];
    }
  }

  onChangeUnit(position: number, unitId: any = 0, ability: number = 0, framesGap: number = 0) {
    this.idSelected[position] = unitId;
    if (unitId < 10000) {
      this.selectedUnits[position] = this.unitService.getUnit(parseInt(unitId));
    } else if (unitId >= 10000) {
      this.selectedUnits[position] = this.createdUnits.find(unit => unit.id === parseInt(unitId));
    }

    if (unitId === 'unselect') {
      if (position === this.chain.length - 1) {
        this.chain.splice(position, 1);
        this.chainService.units.splice(position, 1);
        this.viewOptions[position] = false;
        this.selectedAbilities[position] = 0;
      } else {
        this.chain.forEach((unit, index) => {
          if (index >= position && this.chain[index + 1]) {
            this.selectedUnits[index] = this.selectedUnits[index + 1];
            this.viewOptions[index] = this.viewOptions[index + 1];
            this.idSelected[index] = this.selectedUnits[index].id;
            this.updateChangedUnit(index, this.selectedAbilities[index + 1]);
          }
        });
      }
    } else {
      if (this.chain[position] && this.chain[position].id === unitId) {
        ability = this.selectedAbilities[position];
      }

      this.updateChangedUnit(position, ability, framesGap);
    }

    this.onChangeChain();
    this.duplicatePosition = 0;
  }

  private updateChangedUnit(position: number, ability: number = 0, framesGap: number = 0) {
    this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
    this.chainService.units[position] = this.chain[position];
    this.selectedAbilities[position] = ability;
    this.chain[position].ability = this.chain[position].abilities[ability];
    this.updateLocalDebuffs(position);
    this.chain[position].activeRename = false;
    this.chain[position].ability.activeRename = false;
    this.chain[position].framesGap = (!this.chain[position].framesGap ? framesGap : this.chain[position].framesGap);
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

  showOptions(position: number) {
    this.viewOptions[position] = !this.viewOptions[position];
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
    this.bestChainers = [];
    this.chainService.getChain();
    this.diffFirstHits = this.chainService.calculateFramesDiffForFirstHits();
    this.changeMultiSelectDropdown();
    this.calculateMaxFramesGap();
  }

  private calculateMaxFramesGap() {
    let hits = this.chainService.getHits();
    let maxHitForChain = this.chainService.findHighestChainHit();
    this.chain.forEach((unit, position) => {
      if (unit.ability.type === 'chain') {
        this.sliderConfig[position].range.max = 20;
      } else {
        this.sliderConfig[position].range.max = maxHitForChain > 20 ? maxHitForChain : 20;
      }
    });
  }

  findBestFrames(type: string) {
    let result;

    this.findBestService.units = this.chainService.units;
    result = this.findBestService.findBestFrames();

    result[type].frames.forEach((framesGap, index) => {
      this.chain[index].framesGap = framesGap;
    });
    this.onChangeChain();
  }

  findBestChainers() {
    let chainers = [];
    let allUnits = this.units.concat(this.createdUnits);
    let nextChainerPosition = this.chainService.units.length;
    this.bestChainers = [];
    this.findBestService.units = JSON.parse(JSON.stringify(this.chainService.units));

    allUnits.forEach(unit => {
      this.findBestService.units[nextChainerPosition] = JSON.parse(JSON.stringify(unit));

      unit.abilities.forEach(ability => {
        this.findBestService.units[nextChainerPosition].ability = ability;
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
  }

  selectUnit(position: number, unit: any, ability: any, framesGaps: any) {
    this.chain.forEach((chainer, index) => {
      chainer.framesGap = framesGaps[index];
    })
    unit.framesGap = framesGaps[position]
    this.selectedUnits[position] = unit;
    this.onChangeUnit(position, unit.id, this.findPositionOfAbility(unit, ability), framesGaps[(framesGaps.length - 1)]);
  }
}
