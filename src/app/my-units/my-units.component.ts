import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';

@Component({
  selector: 'app-my-units',
  templateUrl: './my-units.component.html',
  styleUrls: ['./my-units.component.css']
})
export class MyUnitsComponent implements OnInit {
  @ViewChild('myUnitsDiv') private myUnitsDiv: ElementRef;
  private lastCreatedId: number = 10000;
  private positionIds: any = {};

  selectedUnit: any = '';
  selectedAbility: any = '';

  units: Unit[] = [];
  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  abilityTypes: string[] = ['physic', 'magic', 'hybrid', 'LB'];

  activeRenameAbility = false;
  activeRenameUnit = false;

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
    this.units = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];
    this.sortUnits();
    if (this.units.length > 0) {
      this.selectedUnit = this.units[0];
      this.onChangeUnit();
    }
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

  private localSaveUnits() {
    this.sortUnits();
    this.localStorageService.set('units', this.units);
    this.activeRenameAbility = false;
    this.activeRenameUnit = false;
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

  private updateLocalDebuffs() {
    this.selectedUnit.debuffs = [];
    Object.keys(this.selectedUnit.ability.debuff).forEach(key => {
      this.selectedUnit.debuffs.push({type: key, value: this.selectedUnit.ability.debuff[key]});
    });
  }

  private updateServiceDebuffs() {
    this.selectedUnit.ability.debuff = {};
    this.selectedUnit.debuffs.forEach(debuff => {
      let actualDebuff = this.selectedUnit.ability.debuff[debuff.type] ? this.selectedUnit.ability.debuff[debuff.type] : 0;
      this.selectedUnit.ability.debuff[debuff.type] = debuff.value > actualDebuff ? debuff.value : actualDebuff;
    });
  }

  private changeMultiSelectDropdown() {
    if (this.myUnitsDiv.nativeElement.clientWidth === 250) {
      this.multiElementsSettings.dynamicTitleMaxItems = 3;
    } else {
      this.multiElementsSettings.dynamicTitleMaxItems = 8;
    }
  }

  ngOnInit() {
    this.getUnits();
    this.getElements();
  }

  ngAfterViewInit() {
    this.changeMultiSelectDropdown();
  }

  addDebuff() {
    this.selectedUnit.debuffs.push({type: 'dark', value: 1});
    this.updateServiceDebuffs();
    this.saveUnit();
  }

  removeDebuff(debuff: number) {
    this.selectedUnit.debuffs.splice(debuff, 1);
    this.updateServiceDebuffs();
    this.saveUnit();
  }

  onChangeDebuff() {
    this.updateServiceDebuffs();
    this.saveUnit();
  }

  onChangeSkill() {
    this.selectedUnit.ability = this.selectedUnit.abilities[this.selectedAbility];
    this.updateLocalDebuffs();
  }

  onChangeDual() {
    this.selectedUnit.weapons[1] = '';
    this.saveUnit();
  }

  createNewUnit() {
    this.activeRenameUnit = true;
    this.selectedUnit = new Unit();
    this.selectedUnit.name = 'Unit ' + (this.units.length + 1);
    this.onChangeUnit();
    this.saveUnit();
  }

  saveUnit() {
    let position = this.positionIds[this.selectedUnit.id];
    if (position >= 0) {
      this.units[position] = this.selectedUnit;
    } else {
      this.lastCreatedId++;
      this.selectedUnit.id = this.lastCreatedId;
      this.units.push(this.selectedUnit);
    }

    this.sortUnits();
    this.localSaveUnits();
    this.activeRenameAbility = false;
    this.activeRenameUnit = false;
    this.changeMultiSelectDropdown();
  }

  removeUnit() {
    this.units.splice(this.positionIds[this.selectedUnit.id], 1);
    this.localSaveUnits();
    this.selectedUnit = '';
    this.onChangeUnit();
  }

  onChangeUnit() {
    if (this.selectedUnit !== '') {
      this.selectedAbility = 0;
      this.selectedUnit.ability = this.selectedUnit.abilities[0];
      this.updateLocalDebuffs();
      this.activeRenameAbility = false;
      this.activeRenameUnit = false;
    }
  }

  addAbility() {
    this.activeRenameAbility = false;
    this.selectedUnit.abilities.push(new Ability());
    this.selectedAbility = this.selectedUnit.abilities.length - 1;
    this.selectedUnit.ability = this.selectedUnit.abilities[this.selectedAbility];
    this.selectedUnit.ability.name = 'Ability ' + this.selectedUnit.abilities.length;
    this.updateLocalDebuffs();
    this.saveUnit();
  }

  removeAbility() {
    this.selectedUnit.abilities.splice(this.selectedAbility, 1);
    this.selectedUnit.ability = this.selectedUnit.abilities[0];
    this.updateLocalDebuffs();
    this.saveUnit();
    this.selectedAbility = 0;
  }

  renameAbility() {
    this.activeRenameAbility = !this.activeRenameAbility;
  }

  renameUnit() {
    this.activeRenameUnit = !this.activeRenameUnit;
  }
}
