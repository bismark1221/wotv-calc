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

  espers = [];
  esperIds = [];

  equipments = [];
  equipmentIds = [];

  jobs = [];
  jobIds = [];


  isCollapsed = {
    units: [],
    visionCards: [],
    espers: [],
    equipments: [],
    jobs: []
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

      // @ts-ignore
      this.espers = response.espers;
      this.esperIds = Object.keys(this.espers)

      for (let i = 0; i < this.esperIds.length; i++) {
        this.isCollapsed.espers[i] = true;
      }

      // @ts-ignore
      this.equipments = response.equipments;
      this.equipmentIds = Object.keys(this.equipments)

      for (let i = 0; i < this.equipmentIds.length; i++) {
        this.isCollapsed.equipments[i] = true;
      }

      // @ts-ignore
      this.jobs = response.jobs;
      this.jobIds = Object.keys(this.jobs)

      for (let i = 0; i < this.jobIds.length; i++) {
        this.isCollapsed.jobs[i] = true;
      }
    });
  }
}
