import { Component, OnInit } from '@angular/core';

import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  GLunits = [];
  GLvisionCards = [];
  GLespers = [];
  GLequipments = [];
  GLjobs = [];
  GLRaids = [];
  GLItems = [];

  JPunits = [];
  JPvisionCards = [];
  JPespers = [];
  JPequipments = [];
  JPjobs = [];
  JPRaids = [];
  JPItems = [];

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      // @ts-ignore
      this.GLunits = response.gl.units;

      // @ts-ignore
      this.GLvisionCards = response.gl.visionCards;

      // @ts-ignore
      this.GLespers = response.gl.espers;

      // @ts-ignore
      this.GLequipments = response.gl.equipments;

      // @ts-ignore
      this.GLjobs = response.gl.jobs;

      // @ts-ignore
      this.GLRaids = response.gl.raids;

      // @ts-ignore
      this.GLItems = response.gl.items;


      // @ts-ignore
      this.JPunits = response.jp.units;

      // @ts-ignore
      this.JPvisionCards = response.jp.visionCards;

      // @ts-ignore
      this.JPespers = response.jp.espers;

      // @ts-ignore
      this.JPequipments = response.jp.equipments;

      // @ts-ignore
      this.JPjobs = response.jp.jobs;

      // @ts-ignore
      this.JPRaids = response.jp.raids;

      // @ts-ignore
      this.JPItems = response.jp.items;
    });
  }
}
