import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnitService } from './unit.service'

@Injectable()
export class JsonService {
  wotvChainUnits = {};
  isCollapsed = [];
  isCollapsedRaw = true;
  units = {};
  skills = {};
  buffs = {};
  equipments = {};
  boards = {};
  jobs = {};

  names = {
    skill: {},
    unit: {},
    buff: {},
    job: {},
    equipment: {}
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
    83: "AUTO_RESTORE",
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
    119: "DARK_KILLER",
    120: "HUMAN_KILLER",
    121: "FENNES_KILLER",
    123: "SLEEP_IMBUE",
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
    301: "DEBUFFS_DURATION",
    310: "ATTACK_RES",
    311: "AOE_RES"
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
    "mnd": "SPR",
    "mag": "MAG",
    "dex": "DEX",
    "spd": "AGI",
    "luk": "LUCK",
    "iniap": "INITIAL_AP",

    "hit" : "ACCURACY",
    "crt" : "CRITIC_RATE",
    "crta": "CRITIC_AVOID",
    "avd" : "EVADE",

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

    "cpo": "POISON",
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

  calcType = [
    "0",
    "fixe",
    "percent"
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

  private jsonequipments() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Artifact.json').toPromise();
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

  private jsonequipmentNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ArtifactName.json').toPromise();
  }


  getJsons(): Promise<any[]> {
    // @ts-ignore
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
      this.jsonequipments(),
      this.jsonequipmentNames()
    ]).then(responses => {
      this.units = this.formatJson(responses[0]);
      this.names.unit = this.formatNames(responses[1]);
      this.names.job = this.formatNames(responses[2]);
      this.boards = this.formatJson(responses[3]);
      this.skills = this.formatJson(responses[4]);
      this.names.skill = this.formatNames(responses[5]);
      this.buffs = this.formatJson(responses[6]);
      this.names.buff = this.formatNames(responses[7]);
      this.jobs = this.formatJson(responses[8]);
      this.equipments = this.formatJson(responses[9]);
      this.names.equipment = this.formatNames(responses[10]);


      //console.log(this.units)
      //console.log(this.names)


      this.formatJsons();


      return this.wotvChainUnits;
    });
  }

  private formatJson(data) {
    let formatted = {};
    data.items.forEach(item => {
      formatted[item.iname] = item;
    })

    return formatted;
  }

  private formatNames(data) {
    let formatted = {};
    data.infos.forEach(item => {
      formatted[item.key] = item.value;
    })

    return formatted;
  }

  private formatJsons() {
    Object.keys(this.units).forEach(unitId => {
      this.addUnit(this.units[unitId]);
    });
  }

  private addUnit(unit) {
    let dataId = unit.iname;

    if (unit.type === 0) {
      this.wotvChainUnits[dataId] = {
        dataId: dataId,
        names: {},
        rarity: this.rarity[unit.rare],
        jobs: [{}, {}, {}],
        skills: [],
        buffs: [],
        stats: {},
        element: this.elements[unit.elem[0]],
        image: unit.charaId
      };

      this.getUnitNames(this.wotvChainUnits[dataId]);
      this.getJobNames(this.wotvChainUnits[dataId], unit.jobsets);
      
      this.getStats(this.wotvChainUnits[dataId], unit.status)
      this.getJobsStats(this.wotvChainUnits[dataId], unit.jobsets)
      this.getLB(this.wotvChainUnits[dataId], unit.limit)
      this.getTMR(this.wotvChainUnits[dataId], unit.trust)
      this.getSkillsAndBuffs(this.wotvChainUnits[dataId]);

      this.isCollapsed.push(true);
    }
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
          calcType: this.calcType[this.buffs[panelBuff.value]["calc" + i]] ? this.calcType[this.buffs[panelBuff.value]["calc" + i]] : "unknow"
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
      names: {en: this.names.skill[panelSkill.value]},
      effects: [],
      dataId: panelSkill.value,
      slot: this.skills[panelSkill.value].slot
    };

    this.updateSkill(unit, skill, panelSkill.value);

    unit.skills.push(skill);
  }

  private updateSkill(unit, skill, skillId) {
    if (skill.slot !== 3) {
      skill.cost = {
        type: this.skills[skillId].cost_type == 0 ? "AP" : "TP",
        value: this.skills[skillId].cost_type == 0 ? this.skills[skillId].cost_ap : this.skills[skillId].cost_mp
      }
      skill.type = skill.slot === 4 ? "counter" : "active"
      skill.count = this.skills[skillId].count
      skill.range = {
        h: this.skills[skillId].range_h,
        l: this.skills[skillId].range_l,
        mh: this.skills[skillId].range_mh,
        s: this.skills[skillId].range_s,
        line: this.skills[skillId].line
      }

      skill.aoe = {
        s: this.skills[skillId].eff_s,
        l: this.skills[skillId].eff_l,
        h: this.skills[skillId].eff_h
      }

      skill.hit = this.skills[skillId].hit
      skill.pierce = this.skills[skillId].pierce
      skill.ctbreak = this.skills[skillId].ctbreak // Cancel ability activation
      skill.combo = {
        num: this.skills[skillId].combo_num,
        rate: this.skills[skillId].combo_rate
      }
      skill.knockback = {
        rate: this.skills[skillId].rate,
        value: this.skills[skillId].vat,
        direction: this.skills[skillId].dir,
        ds: this.skills[skillId].ds
      }

      if (skill.slot === 4) {
        skill.counter = {
          minRate: this.skills[skillId].eff_rate,
          maxRate: this.skills[skillId].eff_rate1,
          reactDamage: this.reactCounter[this.skills[skillId].react_d_type]
        }
      }

      if (this.skills[skillId].klsp && !this.killers[this.skills[skillId].klsp[0]]) {
        console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KLSP : " + this.skills[skillId].klsp[0])
      }


      // check target 12 => ennemy -- 0 => self ??? for effects break


      if (typeof(this.skills[skillId].eff_val) == "number") {
        skill.damage = {
          minValue: this.skills[skillId].eff_val,
          maxValue: this.skills[skillId].eff_val1,
          minSpeed: this.skills[skillId].ct_spd,
          maxSpeed: this.skills[skillId].ct_spd1,
          type: this.damageTypes[this.skills[skillId].atk_det],
          pool: this.damagePool[this.skills[skillId].eff_dst]
        }

        if (this.skills[skillId].eff_dst && !this.damagePool[this.skills[skillId].eff_dst]) {
          console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- DST : " + this.skills[skillId].eff_dst)
        }

        if (this.skills[skillId].elem) {
          skill.elem = [];
          this.skills[skillId].elem.forEach(elem => {
            skill.elem.push(this.elements[elem])
          });
        }
      }


      if (this.skills[skillId].t_buffs || this.skills[skillId].s_buffs) {
        let buffs = this.skills[skillId].t_buffs ? this.skills[skillId].t_buffs : this.skills[skillId].s_buffs
        buffs.forEach(buff => {
          let finished = false;
          let i = 1;
          while (!finished) {
            if (this.buffs[buff]["type" + i]) {
              if (!this.buffTypes[this.buffs[buff]["type" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- EFFECT : " + this.buffs[buff]["type" + i])
              }

              skill.effects.push({
                type: this.buffTypes[this.buffs[buff]["type" + i]],
                minValue: this.buffs[buff]["val" + i],
                maxValue: this.buffs[buff]["val" + i + "1"],
                calcType: this.calcType[this.buffs[buff]["calc" + i]] ? this.calcType[this.buffs[buff]["calc" + i]] : "unknow",
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
      this.skills[skillId].s_buffs.forEach(buff => {
        let finished = false;
        let i = 1;
        while (!finished) {
          if (this.buffs[buff]["type" + i]) {

            if (!this.buffTypes[this.buffs[buff]["type" + i]]) {
              console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- EFFECT : " + this.buffs[buff]["type" + i])
            }

            skill.effects.push({
              type: this.buffTypes[this.buffs[buff]["type" + i]],
              minValue: this.buffs[buff]["val" + i],
              maxValue: this.buffs[buff]["val" + i + "1"],
              calcType: this.calcType[this.buffs[buff]["calc" + i]] ? this.calcType[this.buffs[buff]["calc" + i]] : "unknow"
            });
            i++;
          } else {
            finished = true;
          }
        }
      })
    } else {
       console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- SLOT : " + skill.slot)
    }
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
    unit.equipments = [];
    this.jobs[jobs[0]].equips.forEach(equip => {
      unit.equipments.push(this.jobEquip[equip])
    });
  }

  private getLB(unit, lbId) {
    if (lbId) {
      let limit = {
        names: {en: this.names.skill[lbId]},
        effects: [],
        dataId: lbId,
        slot: this.skills[lbId].slot
      };

      this.updateSkill(unit, limit, lbId);

      unit.limit = limit
    }
  }

  private getTMR(unit, tmrId) {
    if (tmrId) {
      let tmr = {
        names: {en: this.names.equipment[tmrId]},
        stats: this.equipments[tmrId].status[0],
        type: this.jobEquip[this.equipments[tmrId].cat[0]],
        inmae: tmrId,
        skills: [],
        image: this.equipments[tmrId].asset
      }

      let lastSkillId = [];
      for (let i = 1; i <= 5; i++) {
        if (this.equipments[tmrId]["skl" + i]) {
          for (let j = 0; j < this.equipments[tmrId]["skl" + i].length; j++) {
            if (lastSkillId[j] !== this.equipments[tmrId]["skl" + i][j]) {
              let skill = {
                names: {en: this.names.skill[this.equipments[tmrId]["skl" + i][j]]},
                dataId: this.equipments[tmrId]["skl" + i][j],
                effects: [],
                slot: this.skills[this.equipments[tmrId]["skl" + i][j]].s_buffs ? 3 : 1
              }
              this.updateSkill(unit, skill, this.equipments[tmrId]["skl" + i][j]);
              tmr.skills.push(skill)
              lastSkillId[j] = this.equipments[tmrId]["skl" + i][j]
            }
          }
        }
      }

      unit.tmr = tmr
    }
  }

}
