import { Component, OnInit } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';

import { Unit } from '../entities/unit';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';

@Component({
  selector: 'app-my-units',
  templateUrl: './my-units.component.html',
  styleUrls: ['./my-units.component.css']
})
export class MyUnitsComponent implements OnInit {
  private lastCreatedId: number = 10000;
  private positionIds: any = {};

  selectedUnit: any = '';
  selectedAbility: any = '';

  units: Unit[] = [];
  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  abilityTypes: string[] = ['physic', 'magic'];

  multiElementsTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability element(s)'
  };

  multiElementsSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 8
  };

  constructor(
    private unitService: UnitService,
    private elementsService: ElementsService,
    private localStorageService: LocalStorageService
  ) { }

  private getUnits(): void {
    this.units = this.localStorageService.get<any[]>('units');
    this.sortUnits();
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

  private sortUnits() {
    this.units.sort((a: any, b: any) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });

    let position = 0;
    this.units.forEach(unit => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = position;
      position++;
    });
  }

  private updateLocalDebuffs(position: number) {
    this.selectedUnit.debuffs = [];
    Object.keys(this.selectedUnit.ability.debuff).forEach(key => {
      this.selectedUnit.debuffs.push({type: key, value: this.selectedUnit.ability.debuff[key]});
    });
  }

  private updateServiceDebuffs(position: number) {
    this.selectedUnit.ability.debuff = {};
    this.selectedUnit.debuffs.forEach(debuff => {
      let actualDebuff = this.selectedUnit.ability.debuff[debuff.type] ? this.selectedUnit.ability.debuff[debuff.type] : 1;
      this.selectedUnit.ability.debuff[debuff.type] = debuff.value > actualDebuff ? debuff.value : actualDebuff;
    });
  }

  ngOnInit() {
    this.getUnits();
    this.getElements();
  }

  createNewUnit(position: number) {
    this.selectedUnit = new Unit();
    this.onChangeUnit(position);
  }

  deleteUnit(position: number) {
    this.selectedUnit = '';
    this.onChangeUnit(position);
  }

  onChangeDual(position: number) {
    this.selectedUnit.weapons[1] = '';
  }

  addDebuff(position: number) {
    this.selectedUnit.debuffs.push({type: 'dark', value: 1});
    this.updateServiceDebuffs(position);
  }

  removeDebuff(position: number, debuff: number) {
    this.selectedUnit.debuffs.splice(debuff, 1);
    this.updateServiceDebuffs(position);
  }

  onChangeDebuff(position: number) {
    this.updateServiceDebuffs(position);
  }

  onChangeSkill(position: number) {
    this.selectedUnit.ability = this.selectedUnit.abilities[this.selectedAbility];
    this.updateLocalDebuffs(position);
  }

  onChangeUnit(position: number) {
    if (this.selectedUnit !== '') {
      this.selectedAbility = 0;
      this.selectedUnit.ability = this.selectedUnit.abilities[0];
      this.updateLocalDebuffs(position);
    }
  }

  saveUnit(position: number) {
    this.lastCreatedId++;
    this.selectedUnit.id = this.lastCreatedId;
    this.units.push(this.selectedUnit);
    this.sortUnits();
    this.localStorageService.set('units', this.units);
  }

  updateUnit(position: number) {
    this.units[this.positionIds[this.selectedUnit.id]] = this.selectedUnit;
    this.sortUnits();
    this.localStorageService.set('units', this.units);
  }
}
