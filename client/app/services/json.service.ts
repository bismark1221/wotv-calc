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
    2: "TP",
    3: "AP",
    4: "CT",
    21: "ATK",
    22: "DEF",
    23: "MAG",
    24: "SPR",
    25: "DEX",
    26: "AGI",
    27: "LCK",
    28: "MOVE",
    29: "JUMP",
    42: "FIRE_ATK",
    43: "ICE_ATK",
    44: "WIND_ATK",
    45: "EARTH_ATK",
    46: "LIGHTNING_ATK",
    47: "WATER_ATK",
    48: "LIGHT_ATK",
    49: "DARK_ATK",
    50: "ALL_ELEMENTS_ATK",
    61: "SLASH_ATK",
    62: "STRIKE_ATK",
    63: "PIERCE_ATK",
    64: "MISSILE_ATK",
    65: "MAGIC_ATK",
    70: "ALL_ATTACKS_ATK",
    81: "REGEN",
    84: "POISON",
    85: "BLIND",
    86: "SLEEP",
    87: "SILENCE",
    88: "PARALYZE",
    89: "CONFUSION",
    90: "CHARM",
    91: "PETRIFY",
    92: "TOAD",
    95: "HASTE",
    96: "SLOW",
    97: "STOP",
    98: "STUN",
    99: "IMMOBILIZE",
    100: "DISABLE",
    101: "BERSERK",
    102: "DOOM",
    103: "REVIVE",
    105: "PROTECT",
    106: "SHELL",
    110: "FLOAT",
    112: "QUICKEN",
    113: "IGNORE_FATAL",
    114: "PHYSIC_EVADE",
    115: "MAGIC_EVADE",
    116: "CRITIC_BEHIND_GUARENTED",
    117: "CRITIC_GUARENTED",
    121: "FENNES_KILLER",
    140: "ALL_AILMENTS",
    142: "ALL_DEBUFFS",
    151: "INITIAL_AP",
    152: "RANGE",
    155: "ACCURACY",
    156: "EVADE",
    158: "CRITIC_RATE",
    180: "PROVOKE",
    181: "BRAVERY",
    182: "FAITH",
    183: "ACTIVAITON_TIME",
    190: "ACQUIRED_AP",
    193: "FAITH",
    200: "DEBUFF_RES",
    300: "BUFFS_DURATION",
    301: "DEBUFFS_DURATION"
  }

  killers = {
    2: "FIRE",
    3: "ICE",
    4: "WIND",
    5: "EARTH",
    6: "LIGHTNING",
    7: "WATER",
    8: "LIGHT",
    9: "DARK",
    101: "HUMAN",
    103: "BEAST",
    110: "MACHINA",
    112: "REAPER",
    113: "STONE"
  }


  damageTypes = [
    "0",
    "slash",
    "pierce",
    "strike",
    "missile",
    "magic"
  ]

  damagePool = [
    "HP",
    "TP",
    "AP"
  ]

  reactCounter = [
    "NULL",
    "ALL",
    "PHYSIC",
    "MAGIC"
  ]

  stats = {
    "hp": "HP",
    "mp": "TP",
    "ap": "AP",
    "atk": "ATK",
    "def": "DEF",
    "mag": "MAG",
    "dex": "DEX",
    "spd": "AGI",
    "luk": "LUCK",

    "efi": "FIRE",
    "eic": "ICE",
    "eea": "EARTH",
    "ewi": "WIND",
    "eth": "LIGHTNING",
    "ewa": "WATER",
    "esh": "LIGHT",
    "eda": "DARK",

    "asl": "SLASH",
    "api": "PIERCE",
    "abl": "STRIKE",
    "ash": "MISSILE",
    "ama": "MAGIC",

    "cpo": "POISION",
    "cbl": "BLIND",
    "csl": "SLEEP",
    "cmu": "SILENCE",
    "cpa": "PARALYZE",
    "ccf": "CONFUSION",
    "cpe": "PETRIFY",
    "cfr": "TOAD",
    "cch": "CHARM",
    "csw": "SLOW",
    "cst": "STOP",
    "cdm": "IMMOBILIZE",
    "cda": "DISABLE",
    "cbe": "BERSERK",
    "cdo": "DOOM",

    "mov": "MOVE",
    "jmp": "JUMP",
  }

  jobEquip = [
    "0",
    "DAGGER",
    "SWORD",
    "GREATSWORD",
    "KATANA",
    "ROD",
    "NINJABLADE",
    "BOW",
    "AXE",
    "9",
    "SPEAR",
    "11",
    "12",
    "13",
    "GUN",
    "MACE",
    "FIST",
    "SHIELD",
    "ARMOR",
    "HAT",
    "HELM",
    "CLOTH",
    "ACC"
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

  private jsonJobs() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Job.json').toPromise();
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
      this.jsonJobs(),
    ]).then(responses => {
      this.units = this.formatJson(responses[0].items);
      this.names.unit = this.formatNames(responses[1].infos);
      this.names.job = this.formatNames(responses[2].infos);
      this.boards = this.formatJson(responses[3].items);
      this.skills = this.formatJson(responses[4].items);
      this.names.skill = this.formatNames(responses[5].infos);
      this.buffs = this.formatJson(responses[6].items);
      this.names.buff = this.formatNames(responses[7].infos);
      this.jobs = this.formatJson(responses[8].items);


      //console.log(this.units)
      //console.log(this.names)


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
        stats: {},
        element: this.elements[unit.elem[0]]
      };

      this.getUnitNames(this.wotvChainUnits[id]);
      this.getJobNames(this.wotvChainUnits[id], unit.jobsets);
      
      this.getStats(this.wotvChainUnits[id], unit.status)
      this.getJobsStats(this.wotvChainUnits[id], unit.jobsets)
      this.getLB(this.wotvChainUnits[id], unit.limit)
      this.getTMR(this.wotvChainUnits[id], unit.trust)
      this.getSkillsAndBuffs(this.wotvChainUnits[id]);

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
    //console.log("=====")
    // //console.log(this.boards)
    // //console.log(this.skills)
    // //console.log(this.buffs)


    if (this.boards[unit.dataId]) {
      this.boards[unit.dataId].panels.forEach(item => {
        // //console.log(item)

        if (item.value.split("_")[0] === "BUFF") {
          // //console.log("buff")
          this.addPassiveBuff(unit, item)
        } else {
          this.addSkill(unit, item)
          // //console.log("skill")
        }
      });
    }

    //console.log("=====")
  }

  private addPassiveBuff(unit, panelBuff) {
    // //console.log(panelBuff)
    // //console.log(this.buffs[panelBuff.value])

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

        if (!this.buffTypes[this.buffs[panelBuff.value]["type" + i]]) {
          console.log("@@@@@ " + unit.names.en + " -- EFFECT : " + this.buffs[panelBuff.value]["type" + i])
        }

        buff.effects.push({
          type: this.buffTypes[this.buffs[panelBuff.value]["type" + i]],
          value: this.buffs[panelBuff.value]["val" + i],
          percent: this.buffs[panelBuff.value]["calc1"] == 2 ? true : undefined
        });


        // if (this.buffs[panelBuff.value]["calc1"] == 2) {
        //   //console.log(panelBuff.value)
        //   //console.log(this.buffs[panelBuff.value]["type" + i])
        // }


        i++;
      } else {
        finished = true;
      }
    }

    unit.buffs.push(buff);
  }

  private addSkill(unit, panelSkill) {
    //console.log(panelSkill)
    //console.log(this.skills[panelSkill.value])

    let skill = {
      unlockStar: panelSkill.unlock_value + 1,
      unlockJob: panelSkill.get_job,
      jobLevel: panelSkill.need_level,
      name: this.names.skill[panelSkill.value],
      effects: [],
      iname: panelSkill.value,
      slot: this.skills[panelSkill.value].slot
    };

    if (skill.slot !== 3) {
      skill.cost = {
        type: this.skills[panelSkill.value].cost_type == 0 ? "AP" : "TP",
        value: this.skills[panelSkill.value].cost_type == 0 ? this.skills[panelSkill.value].cost_ap : this.skills[panelSkill.value].cost_mp
      }
      skill.type = skill.slot === 4 ? "counter" : "active"
      skill.count = this.skills[panelSkill.value].count
      skill.range = {
        h: this.skills[panelSkill.value].range_h,
        l: this.skills[panelSkill.value].range_l,
        mh: this.skills[panelSkill.value].range_mh,
        s: this.skills[panelSkill.value].range_s,
        line: this.skills[panelSkill.value].line
      }

      skill.aoe = {
        s: this.skills[panelSkill.value].eff_s,
        l: this.skills[panelSkill.value].eff_l,
        h: this.skills[panelSkill.value].eff_h
      }

      skill.hit = this.skills[panelSkill.value].hit
      skill.pierce = this.skills[panelSkill.value].pierce
      skill.ctbreak = this.skills[panelSkill.value].ctbreak // Cancel ability activation
      skill.combo = {
        num: this.skills[panelSkill.value].combo_num,
        rate: this.skills[panelSkill.value].combo_rate
      }
      skill.knockback = {
        rate: this.skills[panelSkill.value].rate,
        value: this.skills[panelSkill.value].vat,
        direction: this.skills[panelSkill.value].dir,
        ds: this.skills[panelSkill.value].ds
      }

      if (skill.slot === 4) {
        skill.counter = {
          minRate: this.skills[panelSkill.value].eff_rate,
          maxRate: this.skills[panelSkill.value].eff_rate1,
          reactDamage: this.reactCounter[this.skills[panelSkill.value].react_d_type]
        }
      }

      if (this.skills[panelSkill.value].klsp && !this.killers[this.skills[panelSkill.value].klsp[0]]) {
        console.log("@@@@@ " + unit.names.en + " -- " + skill.name + " -- KLSP : " + this.skills[panelSkill.value].klsp[0])
      }


      // check target 12 => ennemy -- 0 => self ??? for effects break


      if (typeof(this.skills[panelSkill.value].eff_val) == "number") {
        skill.damage = {
          minValue: this.skills[panelSkill.value].eff_val,
          maxValue: this.skills[panelSkill.value].eff_val1,
          minSpeed: this.skills[panelSkill.value].ct_spd,
          maxSpeed: this.skills[panelSkill.value].ct_spd1,
          type: this.damageTypes[this.skills[panelSkill.value].atk_det],
          pool: this.damagePool[this.skills[panelSkill.value].eff_dst]
        }

        if (this.skills[panelSkill.value].eff_dst && !this.damagePool[this.skills[panelSkill.value].eff_dst]) {
          console.log("@@@@@ " + unit.names.en + " -- " + skill.name + " -- DST : " + this.skills[panelSkill.value].eff_dst)
        }

        if (this.skills[panelSkill.value].elem) {
          skill.elem = [];
          this.skills[panelSkill.value].elem.forEach(elem => {
            skill.elem.push(this.elements[elem])
          });
        }
      }


      if (this.skills[panelSkill.value].t_buffs || this.skills[panelSkill.value].s_buffs) {
        let buffs = this.skills[panelSkill.value].t_buffs ? this.skills[panelSkill.value].t_buffs : this.skills[panelSkill.value].s_buffs
        buffs.forEach(buff => {
          //console.log(this.buffs[buff])
          let finished = false;
          let i = 1;
          while (!finished) {
            if (this.buffs[buff]["type" + i]) {

              if (!this.buffTypes[this.buffs[buff]["type" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- " + skill.name + " -- EFFECT : " + this.buffs[buff]["type" + i])
              }

              skill.effects.push({
                type: this.buffTypes[this.buffs[buff]["type" + i]],
                minValue: this.buffs[buff]["val" + i],
                maxValue: this.buffs[buff]["val" + i + "1"],
                percent: this.buffs[buff]["calc1"] == 2 || this.buffs[buff]["calc1"] == 30 ? true : undefined,
                rate: this.buffs[buff].rate,
                turn: this.buffs[buff].turn
              });
              i++;
            } else {
              finished = true;
            }
          }
        })
      }







    } else if (skill.slot === 3) {
      skill.type = "passive"
      this.skills[panelSkill.value].s_buffs.forEach(buff => {
        let finished = false;
        let i = 1;
        while (!finished) {
          if (this.buffs[buff]["type" + i]) {

            if (!this.buffTypes[this.buffs[buff]["type" + i]]) {
              console.log("@@@@@ " + unit.names.en + " -- " + skill.name + " -- EFFECT : " + this.buffs[buff]["type" + i])
            }

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
      //console.log("counter")
      skill.type = "counter"

      console.log(this.skills[panelSkill.value])
    }

    unit.skills.push(skill);
  }

  private getStats(unit, stats) {
    Object.keys(this.stats).forEach(stat => {
      unit.stats[this.stats[stat]] = {
        min: stats[0][stat],
        max: stats[1][stat]
      }
    })
  }

  private getJobsStats(unit, jobs) {
    unit.equipements = [];
    this.jobs[jobs[0]].equips.forEach(equip => {
      unit.equipements.push(this.jobEquip[equip])
    });
  }

  private getLB(unit, lbId) {

  }

  private getTMR(unit, tmrID) {

  }

}
