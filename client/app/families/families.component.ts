import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import * as families from '../data/families.json';

@Component({
  selector: 'app-families',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.css']
})
export class FamiliesComponent implements OnInit {
  lang = 'en';
  markdown = '';

  families = null;
  aloneFamilies = [];
  knownFamilies = [
    {
      frames: "22-5-5-5-5-5-5-5-5-5-5-20",
      name: "families.families.qh",
      units: []
    },
    {
      frames: "70-7-5-7-7-7-7",
      name: "families.families.he",
      units: []
    },
    {
      frames: "42-7-7-7-7-7-7-7-7-7-7-7",
      name: "families.families.os",
      units: []
    },
    {
      frames: "2-8-8-8-8-8-8",
      name: "families.families.pd",
      units: []
    },
    {
      frames: "82-8-8-8-8-8-8-8",
      name: "families.families.bc",
      units: []
    },
    {
      frames: "42-8-8-8-8-8-16",
      name: "families.families.cs",
      units: []
    },
    {
      frames: "60-8-8-8-8-8-8-8-8-8",
      name: "families.families.cwa",
      units: []
    },
    {
      frames: "42-10-10-10-10-10-10",
      name: "families.families.sok",
      units: []
    },
    // {
    //   frames: "42-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4",
    //   name: "Aureole Ray +2",
    //   units: []
    // },
    {
      frames: "10-10-10-10-10-10-10",
      name: "Sonic Blast",
      units: []
    }
  ];

  constructor(
    private translateService: TranslateService
  ) {
    this.lang = this.translateService.currentLang;
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
      this.getTranslation();
    });
  }

  private getTranslation() {
    this.translateService.get('families.markdown').subscribe((res: string) => {
      this.markdown = res;
    });
  }

  ngOnInit(): void {
    this.families = families;
    this.cleanFamilies();
  }

  private cleanFamilies() {
    let indexToRemove = [];

    this.families.forEach((family, index) => {
      let removed = false;
      if (family.units.length === 1) {
        this.aloneFamilies.push(family);
        indexToRemove.push(index);
        removed = true;
      }

      if (!removed) {
        this.knownFamilies.forEach(knownFamily => {
          if (family.family === knownFamily.frames) {
            knownFamily.units = family.units;
            indexToRemove.push(index);
          }
        });
      }
    });

    console.log(this.knownFamilies)

    for (let i = indexToRemove.length - 1; i >= 0; i--) {
      this.families.splice(indexToRemove[i], 1);
    }

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateName();
    });
  }

  private updateName() {
    this.families.forEach(family => {
      family.units.forEach(unit => {
        unit.name = unit.names[this.lang];
        unit.abilities.forEach(ability => {
          ability.name = ability.names[this.lang];
        });
      });
    });

    this.knownFamilies.forEach(family => {
      family.units.forEach(unit => {
        unit.name = unit.names[this.lang];
        unit.abilities.forEach(ability => {
          ability.name = ability.names[this.lang];
        });
      });
    });
  }
}
