import { Component, OnInit } from '@angular/core';

import { Unit } from '../entities/unit';
import { UnitService } from '../services/unit.service';
import { ChainService } from '../services/chain.service';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})

export class ChainingComponent implements OnInit {
  units: Unit[];

  constructor(
    private unitService: UnitService,
    private chainService: ChainService
  ) { }

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits(): void {
    this.unitService.getUnits().then(units => this.units = units);
  }

  onChangeChainers(): void {
    this.chainService.calculateChain();
  }
}
