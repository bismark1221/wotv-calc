import { Component, OnInit } from '@angular/core';

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
  selectedUnits: any[] = ["Select unit", "Select unit"];
  chain: any[] = [];
  finisher: Unit;
  units: Unit[];
  framesGap: string = "1";
  elements: string[];
  abilityTypes: string[] = ['physic', 'magic'];

  constructor(
    private unitService: UnitService,
    private chainService: ChainService,
    private elementsService: ElementsService
  ) { }

  ngOnInit(): void {
    this.getUnits();
    this.getElements();
  }

  getUnits(): void {
    this.unitService.getUnits().then(units => this.units = units);
  }

  getElements(): void {
    this.elementsService.getElements().then(elements => this.elements = elements);
  }

  duplicateUnit() {
    this.selectedUnits[1] = this.selectedUnits[0];
    this.onChangeUnit(1);
  }

  createNewUnit(position: number) {
    this.selectedUnits[position] = new Unit();
    this.onChangeUnit(position);
  }

  deleteUnit(position: number) {
    this.selectedUnits[position] = 'Select unit';
    this.onChangeUnit(position);
  }

  onChangeDual(position: number) {
    this.chain[position].weapons[1] = '';
    this.onChangeChain();
  }

  addNewDebuff(position: number) {
    this.chain[position].debuffs.push({type: '', value: 1});
    this.updateServiceDebuffs(position);
    this.onChangeChain();
  }

  removeDebuff(position: number, debuff: number) {
    this.chain[position].debuffs.splice(debuff, 1);
    this.updateServiceDebuffs(position);
    this.onChangeChain();
  }

  onChangeDebuff(position: number, debuff: number) {
    let type = this.chain[position].debuffs[debuff].type;
    if (type !== '') {
      this.chain[position].ability.debuff[type] = this.chain[position].debuffs[debuff].value;
    }
    this.onChangeChain();
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
      this.chain[position].ability.debuff[debuff.type, debuff.value];
    });
  }

  onChangeSkill(position: number) {
    this.updateLocalDebuffs(position);
    this.onChangeChain();
  }

  onChangeUnit(position: number) {
    this.chain.splice(position, 1);
    this.chainService.chainers.splice(position, 1);

    if (position === 0 && this.chain[0]) {
      this.selectedUnits[0] = this.selectedUnits[1];
      this.selectedUnits[1] = 'Select unit';
    }

    if (this.selectedUnits[position] !== 'Select unit') {
      this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
      this.chainService.chainers[position] = this.chain[position];
      this.chain[position].ability = this.chain[position].abilities[0];
      this.updateLocalDebuffs(position);
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    this.chainService.framesGap = parseInt(this.framesGap);
    this.chainService.calculateChain();
  }
}
