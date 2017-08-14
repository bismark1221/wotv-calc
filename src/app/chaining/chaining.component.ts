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
  selectedUnits: any[] = [];
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

  onChangeDual(position: number) {
    this.chain[position].weapons[1] = '';
    this.onChangeChain();
  }

  onChangeUnit(position: number) {
    this.chain.splice(position, 1);
    this.chainService.chainers.splice(position, 1);

    if (this.selectedUnits[position] !== 'Select unit') {
      this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
      this.chainService.chainers[position] = this.chain[position];
      this.chain[position].ability = this.chain[position].abilities[0];
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    this.chainService.framesGap = parseInt(this.framesGap);
    this.chainService.calculateChain();
  }
}
