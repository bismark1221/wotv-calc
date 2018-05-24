import { Component, OnInit } from '@angular/core';

import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateFamiliesComponent implements OnInit {
  units = [];
  families = [];
  isCollapsedFamily = [];

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      this.units = response;
      this.generateFamilies();

      this.castTimeDifferent();
    });
  }

  private generateFamilies() {
    let families = [];

    this.units.forEach(unit => {
      unit.abilities.forEach(ability => {
        if (ability.framesList.split('-').length > 3) {
          let frames = ability.framesList.split('-');
          frames[0] = ability.firstHit;

          ability.framesList = frames.join('-');

          let familyIndex = this.getFamilyIndexFromFramesList(ability.framesList);
          if (familyIndex === null) {
            this.families.push({
              family: ability.framesList,
              units: []
            });
            familyIndex = this.families.length - 1;
            this.isCollapsedFamily[familyIndex] = true;
          }

          let unitIndex = this.getUnitIndexFromId(this.families[familyIndex], unit.dataId);
          if (unitIndex === null) {
            this.families[familyIndex].units.push({
              id: unit.dataId,
              names: unit.names,
              abilities: []
            });
            unitIndex = this.families[familyIndex].units.length - 1;
          }

          this.families[familyIndex].units[unitIndex].abilities.push({
            id: ability.dataId,
            names: ability.names,
            firstHit: ability.firstHit,
            offset: ability.offset,
            castTime: ability.castTime
          });
        }
      });
    });

    this.sortFamilies();
  }

  private getFamilyIndexFromFramesList(framesList) {
    let find = null;

    this.families.forEach((family, index) => {
      if (family.family === framesList) {
        find = index;
        return find;
      }
    })

    return find;
  }

  private getUnitIndexFromId(family, dataId) {
    let find = null;

    family.units.forEach((unit, index) => {
      if (unit.id === dataId) {
        find = index;
        return find;
      }
    })

    return find;
  }

  private sortFamilies() {
    this.families.sort((a: any, b: any) => {
      if (Number(a.family.split('-')[1]) > Number(b.family.split('-')[1])) {
        return 1;
      } else if (Number(a.family.split('-')[1]) < Number(b.family.split('-')[1])) {
        return -1;
      } else if (a.family.split('-').length > b.family.split('-').length) {
        return 1;
      } else if (a.family.split('-').length < b.family.split('-').length) {
        return -1;
      } else if (Number(a.family.split('-')[0]) > Number(b.family.split('-')[0])) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  private castTimeDifferent() {
    // this.families.forEach(family => {
    //   let name = family.units[0].names.en + "_" + family.units[0].abilities[0].names.en;
    //   let castTime = family.units[0].abilities[0].castTime;
    //   family.units.forEach(unit => {
    //     unit.abilities.forEach(ability => {
    //       if (ability.castTime != castTime) {
    //         console.log("Diff in cast Time");
    //         console.log(family.family)
    //         console.log(name);
    //         console.log(unit.names.en + "_" + ability.names.en);
    //       }
    //     });
    //   });
    // });
  }
}
