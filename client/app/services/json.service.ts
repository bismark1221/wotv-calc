import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnitService } from './unit.service'

@Injectable()
export class JsonService {
  wotvChainUnits = [];
  isCollapsed = [];
  isCollapsedRaw = true;
  units = {};
  skills = {};
  buffs = {};

  names = {
    skill: {},
    unit: {},
    buff: {}
  }

  rarity = [
    'N',
    'R',
    'SR',
    'MR',
    'UR'
  ]

  elements = [
    'fire',
    'ice',
    'lightning',
    'water',
    'earth',
    'earth',
    'light',
    'dark'
  ];

  stats = [
    "atk",
    "def",
    "mag",
    "spr"
  ];

  killerRaces = [
    "",
    "beast",
    "bird",
    "aquatic",
    "demon",
    "human",
    "machine",
    "dragon",
    "undead",
    "insect",
    "stone",
    "plant",
    "spirit"
  ];

  constructor(private http: HttpClient, private unitService: UnitService) {}

  private jsonUnits() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Unit.json').toPromise();
  }

  private jsonUnitsBoards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/UnitAbilityBoard.json').toPromise();
  }

  private jsonSkills() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Skill.json').toPromise();
  }

  private jsonBuffs() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Buff.json').toPromise();
  }


  /* Translation */
  private jsonUnitNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/UnitName.json').toPromise();
  }

  private jsonSkillNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/SkillName.json').toPromise();
  }

  private jsonBuffNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/BuffName.json').toPromise();
  }

  private jsonJobNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/JobName.json').toPromise();
  }


  getJsons(): Promise<any[]> {
    return Promise.all([
      this.jsonUnits(),
      this.jsonUnitNames(),
      this.jsonJobNames(),
      this.jsonUnitsBoards(),
      this.jsonSkills(),
      this.jsonSkillNames(),
      this.jsonBuffs(),
      this.jsonBuffNames(),
    ]).then(responses => {
      this.units = responses[0].items;
      this.names.unit = responses[1].infos;
      this.names.job = responses[2].infos;
      this.boards = responses[3];
      this.skills = responses[4];
      this.names.skills = responses[5].infos;
      this.buffs = responses[6];
      this.buffs.skill = responses[7].infos;


      console.log(this.units)
      console.log(this.names)


      this.formatJsons();


      return this.wotvChainUnits;
    });
  }

  private formatJsons() {
    this.units.forEach(unit => {
      let id = this.addUnit(unit);

      // if (id !== null && this.units[unitId].skills) {
      //   this.units[unitId].skills.forEach((ability, index) => {
      //     this.addSkill(id, this.getSkill(ability.id), ability.id, ability.rarity);
      //   });
      // }

      // if (this.units[unitId].entries) {
      //   let entries = Object.keys(this.units[unitId].entries);
      //   if (this.lbs[entries[entries.length - 1]]){
      //     this.addSkill(id, this.lbs[entries[entries.length - 1]], entries[entries.length - 1], this.units[unitId].rarity_max, 0, true);
      //   }
      // }
    });
  }

  private addUnit(unit) {
    let id = this.wotvChainUnits.length;
    let dataId = unit.iname;

    if (unit.type === 0) {
      this.wotvChainUnits[id] = {
        dataId: dataId,
        names: {},
        rarity: this.rarity[unit.rare],
        jobs: [{}, {}, {}],
        skills: [],
        buffs: [],
        type: unit.type
      };

      this.getUnitNames(this.wotvChainUnits[id]);
      this.getJobNames(this.wotvChainUnits[id], unit.jobsets);

      this.isCollapsed.push(true);

      return id;
    }

    return null;
  }

  private getUnitNames(unit) {
    let name = null;
    let count = 0;

    while (!unit.names.en) {
      if (this.names.unit[count] && this.names.unit[count].key == unit.dataId) {
        unit.names.en = this.names.unit[count].value
      } else if (count >= this.names.unit.length) {
        unit.names.en = unit.dataId;
      } else {
        count += 1
      }
    }
  }

  private getJobNames(unit, jobs) {
    let name = null;
    let count = 0;

    while (unit.jobs[0].en == null || unit.jobs[1].en == null || unit.jobs[2].en == null) {
      if (this.names.job[count]) {
        switch (this.names.job[count].key) {
          case jobs[0]:
              unit.jobs[0].en = this.names.job[count].value
            break;
          case jobs[1]:
              unit.jobs[1].en = this.names.job[count].value
            break;
          case jobs[2]:
              unit.jobs[2].en = this.names.job[count].value
            break;
        }
        count += 1
      } else if (count >= this.names.job.length) {
        if (!unit.jobs[0].en)
          unit.jobs[0].en = jobs[0];
        if (!unit.jobs[1].en)
          unit.jobs[1].en = jobs[1];
        if (!unit.jobs[2].en)
          unit.jobs[2].en = jobs[2];
      } else {
        count += 1
      }
    }
  }
}
