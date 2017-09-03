import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';
import { ChainService } from '../services/chain.service';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})
export class ChainingComponent implements OnInit {
  @ViewChild('chainDiv') private chainDiv: ElementRef;
  private lastCreatedId: number = 10000;
  private positionIds: any = {};

  chain: any[] = [];
  selectedUnits: any[] = ['', ''];
  selectedAbilities: any[] = ['', ''];

  units: Unit[];
  createdUnits: any[] = [];
  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  abilityTypes: string[] = ['physic', 'magic', 'hybrid', 'LB'];

  framesGap: number = 1;
  viewOptions: boolean[] = [false, false];
  bestChainers: any[] = [];

  multiElementsTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability element(s)'
  };

  multiElementsSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 8
  };

  sliderConfig: any = {
    start: 1,
    step: 1,
    range: {
      min: -10,
      max: 10
    },
    pips: {
      mode: 'steps',
      density: 10
    }
};

  constructor(
    private unitService: UnitService,
    private chainService: ChainService,
    private elementsService: ElementsService,
    private localStorageService: LocalStorageService
  ) { }

  private getUnits(): void {
    this.unitService.getUnits().then(units => {
      this.units = units;
      this.createdUnits = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];
      this.sortUnits();
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
      this.elements = elements
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
    this.getUnits();
    this.getElements();
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
    this.viewOptions[position] = true;
    this.onChangeUnit(position);
    this.saveUnit(position);
  }

  createNewUnitFromPredefined(position: number) {
    let unit = JSON.parse(JSON.stringify(this.chain[position]));
    unit.name = 'Unit ' + (this.createdUnits.length + 1);
    unit.id = undefined;

    this.chain[position] = unit;
    this.saveUnit(position);
    this.selectedUnits[position].activeRename = true;
    this.viewOptions[position] = true;
    this.onChangeUnit(position);
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

      this.chain[position].activeRename = false;
      this.chain[position].ability.activeRename = false;
      this.selectedUnits[position] = this.chain[position];

      this.sortUnits();
      this.localSaveUnits();
    }

    this.onChangeChain();
  }

  removeUnit(position: number) {
    this.createdUnits.splice(this.positionIds[this.chain[position].id], 1);
    this.localSaveUnits();
    this.selectedUnits[position] = '';
    this.onChangeUnit(position);
  }

  unselectUnit(position: number) {
    this.selectedUnits[position] = '';
    this.onChangeUnit(position);
  }

  duplicateUnit() {
    this.selectedUnits[1] = this.selectedUnits[0];
    this.selectedAbilities[1] = this.selectedAbilities[0];

    this.chain[1] = JSON.parse(JSON.stringify(this.chain[0]));
    this.chainService.chainers[1] = this.chain[1];
    this.updateLocalDebuffs(1);

    this.onChangeChain();
  }

  onChangeUnit(position: number, ability: number = 0) {
    if (this.selectedUnits[position] === '') {
      if (position === 0 && this.chain[position + 1]) {
        this.selectedUnits[position] = this.selectedUnits[position + 1];
        this.selectedUnits[position + 1] = '';
        this.chain.splice(position + 1, 1);
        this.chainService.chainers.splice(position + 1, 1);
        this.viewOptions[position] = this.viewOptions[position + 1];
        this.viewOptions[position + 1] = false;
      } else {
        this.chain.splice(position, 1);
        this.chainService.chainers.splice(position, 1);
        this.viewOptions[position] = false;
      }
      this.framesGap = 1;
    }

    if (this.selectedUnits[position] !== '') {
      this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
      this.chainService.chainers[position] = this.chain[position];
      this.selectedAbilities[position] = ability;
      this.chain[position].ability = this.chain[position].abilities[ability];
      this.updateLocalDebuffs(position);
      this.chain[position].activeRename = false;
      this.chain[position].ability.activeRename = false;
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    this.bestChainers = [];
    this.chainService.getChain(this.framesGap);
    this.changeMultiSelectDropdown();
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

  switchUnits() {
    let unit1 = this.selectedUnits[0];
    let ability1 = this.selectedAbilities[0];

    this.selectedUnits[0] = this.selectedUnits[1];
    this.selectedUnits[1] = unit1;

    this.onChangeUnit(0, this.selectedAbilities[1]);
    this.onChangeUnit(1, ability1);
  }

  updateFramesGap(minusPlus: boolean) {
    minusPlus ? this.framesGap++ : this.framesGap--;
    this.checkFramesGap();
  }

  checkFramesGap() {
    if (this.framesGap <= -10) {
      this.framesGap = -10;
    } else if (this.framesGap >= 10) {
      this.framesGap = 10;
    }

    this.onChangeChain();
  }

  findBestFrames() {
    this.framesGap = this.chainService.findBestFrames().bestFrames;
    this.chainService.getChain(this.framesGap);
  }

  findBestChainers() {
    let chainers = [];
    let allUnits = this.units.concat(this.createdUnits);
    this.bestChainers = [];

    allUnits.forEach(unit => {
      this.chainService.chainers[1] = JSON.parse(JSON.stringify(unit));

      unit.abilities.forEach(ability => {
        if (ability.type !== 'hybrid') {
          this.chainService.chainers[1].ability = ability;
          let result = this.chainService.findBestFrames();
          chainers.push({
            unit: unit,
            ability: ability,
            frames: result.bestFrames,
            modifier: result.bestModifier
          });
        }
      })
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

    this.chainService.chainers.splice(1, 1);
  }

  selectUnit(position: number, unit: any, ability: any, frames: number) {
    this.selectedUnits[position] = unit;
    this.framesGap = frames;
    this.onChangeUnit(position, this.findPositionOfAbility(unit, ability));
  }
}
