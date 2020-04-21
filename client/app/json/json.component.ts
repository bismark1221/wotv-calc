import { Component, OnInit } from '@angular/core';

import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  units = [];
  unitIds = [];

  visionCards = [];
  visionCardIds = [];

  isCollapsed = {
    units: [],
    visionCards: []
  };

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      // @ts-ignore
      this.units = response.units;
      this.unitIds = Object.keys(this.units)

      for (let i = 0; i < this.unitIds.length; i++) {
        this.isCollapsed.units[i] = true;
      }

      // @ts-ignore
      this.visionCards = response.visionCards;
      this.visionCardIds = Object.keys(this.visionCards)

      for (let i = 0; i < this.visionCardIds.length; i++) {
        this.isCollapsed.visionCards[i] = true;
      }
    });
  }
}
