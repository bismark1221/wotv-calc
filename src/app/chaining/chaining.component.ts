import { Component, OnInit } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { LocalStorageService } from 'angular-2-local-storage';

import { Unit } from '../entities/unit';
import { UnitService } from '../services/unit.service';
import { ChainService } from '../services/chain.service';
import { ElementsService } from '../services/elements.service';
import { KeysPipe } from '../pipes/keys.pipe';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css'],
  providers: [ElementsService]
})

export class ChainingComponent implements OnInit {
  private lastCreatedId: number = 10000;
  private positionIds: any = {};

  chain: any[] = [];

  selectedUnits: any[] = ['', ''];
  selectedAbilities: any[] = ['', ''];
  finisher: Unit;
  units: Unit[];
  createdUnits: any[] = [];

  framesGap: string = "1";
  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  abilityTypes: string[] = ['physic', 'magic'];
  viewOptions: boolean[] = [false, false];


  multiElementsTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability element(s)'
  };

  multiElementsSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 8
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
      this.createdUnits = this.localStorageService.get<any[]>('units');
      this.sortUnits();
    });
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

    if (this.createdUnits) {
      this.createdUnits.sort((a: any, b: any) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.createdUnits = [];
    }

    let position = 0;
    this.createdUnits.forEach(unit => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = position;
      position++;
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

  ngOnInit(): void {
    this.getUnits();
    this.getElements();
  }

  duplicateUnit() {
    this.selectedUnits[1] = this.selectedUnits[0];
    this.selectedAbilities[1] = this.selectedAbilities[0];

    this.chain[1] = JSON.parse(JSON.stringify(this.chain[0]));
    this.chainService.chainers[1] = this.chain[1];
    this.updateLocalDebuffs(1);

    this.onChangeChain();
  }

  createNewUnit(position: number) {
    this.selectedUnits[position] = new Unit();
    this.viewOptions[position] = true;
    this.onChangeUnit(position);
  }

  deleteUnit(position: number) {
    this.selectedUnits[position] = '';
    this.onChangeUnit(position);
  }

  onChangeDual(position: number) {
    this.chain[position].weapons[1] = '';
    this.onChangeChain();
  }

  addDebuff(position: number) {
    this.chain[position].debuffs.push({type: 'dark', value: 1});
    this.updateServiceDebuffs(position);
    this.onChangeChain();
  }

  removeDebuff(position: number, debuff: number) {
    this.chain[position].debuffs.splice(debuff, 1);
    this.updateServiceDebuffs(position);
    this.onChangeChain();
  }

  onChangeDebuff(position: number) {
    this.updateServiceDebuffs(position);
    this.onChangeChain();
  }

  onChangeSkill(position: number) {
    this.chain[position].ability = this.chain[position].abilities[this.selectedAbilities[position]];
    this.updateLocalDebuffs(position);
    this.onChangeChain();
  }

  onChangeUnit(position: number) {
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
    }

    if (this.selectedUnits[position] !== '') {
      this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
      this.chainService.chainers[position] = this.chain[position];
      this.selectedAbilities[position] = 0;
      this.chain[position].ability = this.chain[position].abilities[0];
      this.updateLocalDebuffs(position);
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    this.chainService.framesGap = parseInt(this.framesGap);
    this.chainService.calculateChain();
  }

  saveUnit(position: number) {
    this.lastCreatedId++;
    this.chain[position].id = this.lastCreatedId;
    this.createdUnits.push(this.chain[position]);
    this.sortUnits();
    this.selectedUnits[position] = this.chain[position];
    this.localStorageService.set('units', this.createdUnits);
  }

  updateUnit(position: number) {
    this.createdUnits[this.positionIds[this.chain[position].id]] = this.chain[position];
    this.sortUnits();
    this.localStorageService.set('units', this.createdUnits);
  }

  showOptions(position: number) {
    this.viewOptions[position] = !this.viewOptions[position];
  }
}
