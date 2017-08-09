import { Component, OnInit } from '@angular/core';

import { Unit } from '../entities/unit';
import { Chain } from '../entities/chain';
import { UnitService } from '../services/unit.service';
import { ChainService } from '../services/chain.service';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})

export class ChainingComponent implements OnInit {
  selectedUnit: Unit;
  units: Unit[];
  chain: Chain;
  testHits: any[];
  chartData: Array<any>;
  chainData: Array<any>;

  constructor(
    private unitService: UnitService,
    private chainService: ChainService
  ) { }

  ngOnInit(): void {
    this.getUnits();
    this.chain = new Chain();
    this.generateData();
  }

  getUnits(): void {
    this.unitService.getUnits().then(units => this.units = units);
  }

  onSelect(unit: Unit): void {
    this.selectedUnit = unit;
  }

  onChangeUnit1(unit: Unit) {
    this.testHits = this.unitService.calculateFrames(unit);
    this.chainData = this.testHits;
  }

  calculateChain(): void {
    this.chainService.calculateChain(this.chain).then(chain => {
      this.chain = chain;
    });
  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
