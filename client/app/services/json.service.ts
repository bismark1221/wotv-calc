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
    'neutral',
    'fire',
    'ice',
    'wind',
    'earth',
    'lightning',
    'water',
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

  buffTypes = {
    1: "HP",
    21: "ATK",
    22: "DEF",
    22: "MAG",
    25: "DEX",
    26: "AGI",
    27: "LCK",
    182: "FAITH"
  }

  damageTypes = [ //pierce
    "0",
    "slash",
    "2",
    "strike",
    "missile",
    "magic"
  ]

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
      this.units = this.formatJson(responses[0].items);
      this.names.unit = this.formatNames(responses[1].infos);
      this.names.job = this.formatNames(responses[2].infos);
      this.boards = this.formatJson(responses[3].items);
      this.skills = this.formatJson(responses[4].items);
      this.names.skill = this.formatNames(responses[5].infos);
      this.buffs = this.formatJson(responses[6].items);
      this.names.buff = this.formatNames(responses[7].infos);


      console.log(this.units)
      console.log(this.names)


      this.formatJsons();


      return this.wotvChainUnits;
    });
  }

  private formatJson(data) {
    let formatted = {};
    data.forEach(item => {
      formatted[item.iname] = item;
    })

    return formatted;
  }

  private formatNames(data) {
    let formatted = {};
    data.forEach(item => {
      formatted[item.key] = item.value;
    })

    return formatted;
  }

  private formatJsons() {
    Object.keys(this.units).forEach(unitId => {
      let id = this.addUnit(this.units[unitId]);

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
      console.log(unit.elem[0])
      this.wotvChainUnits[id] = {
        dataId: dataId,
        names: {},
        rarity: this.rarity[unit.rare],
        jobs: [{}, {}, {}],
        skills: [],
        buffs: [],
        element: this.elements[unit.elem[0]]
      };

      this.getUnitNames(this.wotvChainUnits[id]);
      this.getJobNames(this.wotvChainUnits[id], unit.jobsets);

      /*if (id == 0) {*/
        this.getSkillsAndBuffs(this.wotvChainUnits[id]);
      /*}*/

      this.isCollapsed.push(true);

      return id;
    }

    return null;
  }

  private getUnitNames(unit) {
    if (this.names.unit[unit.dataId]) {
      unit.names.en = this.names.unit[unit.dataId]
    } else {
      unit.names.en = unit.dataId;
    }
  }

  private getJobNames(unit, jobs) {
    for (let i = 0; i < 3; i++) {
      if (this.names.job[jobs[i]]) {
        unit.jobs[i].en = this.names.job[jobs[i]]
      } else {
        unit.jobs[i].en = jobs[i];
      }
    }
  }

  private getSkillsAndBuffs(unit) {
    console.log("=====")
    // console.log(this.boards)
    // console.log(this.skills)
    // console.log(this.buffs)


    if (this.boards[unit.dataId]) {
      this.boards[unit.dataId].panels.forEach(item => {
        // console.log(item)

        if (item.value.split("_")[0] === "BUFF") {
          // console.log("buff")
          this.addPassiveBuff(unit, item)
        } else {
          this.addSkill(unit, item)
          // console.log("skill")
        }
      });
    }

    console.log("=====")
  }

  private addPassiveBuff(unit, panelBuff) {
    // console.log(panelBuff)
    // console.log(this.buffs[panelBuff.value])

    let buff = {
      unlockStar: panelBuff.unlock_value + 1,
      unlockJob: panelBuff.get_job,
      jobLevel: panelBuff.need_level,
      jp: panelBuff.jp,
      effects: []
    };

    let finished = false;
    let i = 1;
    while (!finished) {
      if (this.buffs[panelBuff.value]["type" + i]) {
        buff.effects.push({
          type: this.buffTypes[this.buffs[panelBuff.value]["type" + i]],
          value: this.buffs[panelBuff.value]["val" + i],
          percent: this.buffs[panelBuff.value]["calc1"] == 2 ? true : undefined
        });


        // if (this.buffs[panelBuff.value]["calc1"] == 2) {
        //   console.log(panelBuff.value)
        //   console.log(this.buffs[panelBuff.value]["type" + i])
        // }


        i++;
      } else {
        finished = true;
      }
    }

    unit.buffs.push(buff);
  }

  private addSkill(unit, panelSkill) {
    console.log(panelSkill)
    console.log(this.skills[panelSkill.value])

    let skill = {
      unlockStar: panelSkill.unlock_value + 1,
      unlockJob: panelSkill.get_job,
      jobLevel: panelSkill.need_level,
      name: this.names.skill[panelSkill.value],
      effects: [],
      iname: panelSkill.value
    };

    if (typeof(this.skills[panelSkill.value].cost_type) == "number") {
      skill.cost = {
        type: this.skills[panelSkill.value].cost_type == 0 ? "AP" : "TP",
        value: this.skills[panelSkill.value].cost_type == 0 ? this.skills[panelSkill.value].cost_ap : this.skills[panelSkill.value].cost_mp
      }
      skill.type = "active"
      skill.count = this.skills[panelSkill.value].count
      skill.range = {
        h: this.skills[panelSkill.value].range_h,
        l: this.skills[panelSkill.value].range_l,
        mh: this.skills[panelSkill.value].range_mh,
        s: this.skills[panelSkill.value].range_s,
        line: this.skills[panelSkill.value].line
      }
      if (this.skills[panelSkill.value].eff_s) {
        skill.aoe = {
          s: this.skills[panelSkill.value].eff_s,
          l: this.skills[panelSkill.value].eff_l,
          h: this.skills[panelSkill.value].eff_h
        }
      }

      

      if (this.skills[panelSkill.value].eff_val) {
        skill.damage = {
          minValue: this.skills[panelSkill.value].eff_val,
          maxValue: this.skills[panelSkill.value].eff_val1,
          minSpeed: this.skills[panelSkill.value].ct_spd,
          maxSpeed: this.skills[panelSkill.value].ct_spd1,
          type: this.damageTypes[this.skills[panelSkill.value].atk_det]
        }

        if (this.skills[panelSkill.value].elem) {
          skill.elem = [];
          this.skills[panelSkill.value].elem.forEach(elem => {
            skill.elem.push(this.elements[elem])
          });
        }
      }







    } else if (this.skills[panelSkill.value].s_buffs) {
      skill.type = "passive"
      this.skills[panelSkill.value].s_buffs.forEach(buff => {
        let finished = false;
        let i = 1;
        while (!finished) {
          if (this.buffs[buff]["type" + i]) {
            skill.effects.push({
              type: this.buffTypes[this.buffs[buff]["type" + i]],
              minValue: this.buffs[buff]["val" + i],
              maxValue: this.buffs[buff]["val" + i + "1"],
              percent: this.buffs[buff]["calc1"] == 2 ? true : undefined
            });
            i++;
          } else {
            finished = true;
          }
        }
      })
    } else {
      console.log("counter")
      skill.type = "counter"
    }

    unit.skills.push(skill);
  }
}
