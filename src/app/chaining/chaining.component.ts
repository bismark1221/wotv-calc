import { Component, OnInit } from '@angular/core';

import { Unit } from '../entities/unit';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})

export class ChainingComponent implements OnInit {
  selectedUnit: Unit;
  units: Unit[];

  constructor(
    private unitService: UnitService
  ) { }

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits(): void {
    this.unitService.getUnits().then(units => this.units = units);
  }

  onSelect(unit: Unit): void {
    this.selectedUnit = unit;
  }
}
