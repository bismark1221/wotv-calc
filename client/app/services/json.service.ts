import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from './equipment.service'

@Injectable()
export class JsonService {
  wotvUnits = {};
  wotvVisionCards = {};
  wotvEspers = {};
  wotvEquipments = {};

  units = {};
  skills = {};
  buffs = {};
  equipments = {};
  boards = {};
  jobs = {};
  visionCards = {};
  weathers = {};
  espersBoards = {};

  names = {
    skill: {},
    unit: {},
    buff: {},
    job: {},
    equipment: {},
    visionCard: {}
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
    122: "GENERIC_KILLER",
    123: "IMBUE",
    134: "BOOST_DAMAGE_AGAINST_METAL",
    140: "ALL_AILMENTS",
    142: "ALL_DEBUFFS",
    151: "INITIAL_AP",
    152: "RANGE",
    155: "ACCURACY",
    156: "EVADE",
    157: "CRITIC_DAMAGE",
    158: "CRITIC_RATE",
    159: "CRITIC_EVADE",
    180: "PROVOKE",
    181: "BRAVERY",
    182: "FAITH",
    183: "ACTIVAITON_TIME",
    190: "ACQUIRED_AP",
    194: "ACQUIRED_JP",
    191: "EVOCATION_GAUGE_BOOST",
    192: "BRAVERY",
    193: "FAITH",
    200: "DEBUFF_RES",
    202: "ATK_DEBUFF_RES",
    300: "BUFFS_DURATION",
    301: "DEBUFFS_DURATION",
    310: "ATTACK_RES",
    311: "AOE_RES",
    313: "EVOCATION_MAGIC"
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
    106: "ELEMENTAL",
    109: "AQUATIC",
    110: "MACHINA",
    111: "PLANT",
    112: "REAPER",
    113: "STONE"
  }

  damageEffectType = [
    "0",
    "DAMAGE",
    "DAMAGE",
    "ABSORB"
  ]

  damageTypes = [
    "all",
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

  atkBased = [
    "0",
    "physic",
    "magic",
    "hybrid"
  ]

  stats = {
    unit: {
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
      "jmp": "JUMP"
    },
    visionCard: {
      "hp": "HP",
      "atk": "ATK",
      "mag": "MAG"
    },
    esper: {
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
      "jmp": "JUMP"
    }
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

  calcType = {
    1: "fixe",
    2: "percent",
    3: "resistance",
    11: "percent",
    30: "percent",
    31: "dispel",
    40: "nullify"
  }

  constructor(private http: HttpClient, private equipmentService: EquipmentService) {}

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

  private jsonEquipments() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Artifact.json').toPromise();
  }

  private jsonVisionCards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/VisionCard.json').toPromise();
  }

  private jsonEspersBoards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/NetherBeastAbilityBoard.json').toPromise();
  }

  private jsonWeathers() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Weather.json').toPromise();
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

  private jsonEquipmentNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ArtifactName.json').toPromise();
  }

  private jsonVisionCardNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/VisionCardName.json').toPromise();
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
      this.jsonEquipments(),
      this.jsonEquipmentNames(),
      this.jsonVisionCards(),
      this.jsonVisionCardNames(),
      this.jsonEspersBoards(),
      this.jsonWeathers(),
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
      this.visionCards = this.formatJson(responses[11]);
      this.names.visionCard = this.formatNames(responses[12]);
      this.espersBoards = this.formatJson(responses[13]);
      this.weathers = this.formatJson(responses[14]);

      this.formatJsons();
      this.cleanUnits();

      return {
        units: this.wotvUnits,
        visionCards: this.wotvVisionCards,
        espers: this.wotvEspers,
        equipments: this.wotvEquipments
      };
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
      if (this.units[unitId].type === 0) {
        this.addUnit(this.units[unitId]);
      }

      if (this.units[unitId].type === 1) {
        this.addEsper(this.units[unitId]);
      }
    });

    Object.keys(this.visionCards).forEach(visionCardId => {
      this.addVisionCard(this.visionCards[visionCardId]);
    });

    Object.keys(this.equipments).forEach(equipmentId => {
      this.addEquipment(this.equipments[equipmentId]);
    });
  }

  private addUnit(unit) {
    let dataId = unit.iname;
    this.wotvUnits[dataId] = {
      dataId: dataId,
      names: {},
      rarity: this.rarity[unit.rare],
      jobs: [{}, {}, {}],
      skills: [],
      buffs: [],
      stats: {},
      element: this.elements[unit.elem[0]],
      image: unit.charaId.toLowerCase(),
      equipments: {
        weapons: [],
        armors: []
      }
    };

    this.getNames(this.wotvUnits[dataId], 'unit');
    this.getJobInfos(this.wotvUnits[dataId], unit.jobsets);

    this.getStats(this.wotvUnits[dataId], unit.status, 'unit')
    this.getLB(this.wotvUnits[dataId], unit.limit)
    this.getMasterSkill(this.wotvUnits[dataId], unit.mstskl)
    this.getTMR(this.wotvUnits[dataId], unit.trust)
    this.getSkillsAndBuffs(this.wotvUnits[dataId]);
  }

  private addVisionCard(visionCard) {
    let dataId = visionCard.iname;

    if (visionCard.type === 0) {
      this.wotvVisionCards[dataId] = {
        dataId: dataId,
        names: {},
        rarity: this.rarity[visionCard.rare],
        unitBuffsClassic: [],
        unitBuffsAwake: [],
        unitBuffsMax: [],
        partyBuffsClassic: [],
        partyBuffsAwake: [],
        partyBuffsMax: [],
        stats: {},
        image: visionCard.icon.toLowerCase()
      };

      this.getNames(this.wotvVisionCards[dataId], 'visionCard');
      this.getStats(this.wotvVisionCards[dataId], visionCard.status, 'visionCard')

      this.getVisionCardSkillsAndBuffs(this.wotvVisionCards[dataId], visionCard);
    }
  }

  private getNames(item, type) {
    if (this.names[type][item.dataId]) {
      item.names.en = this.names[type][item.dataId]
    } else {
      item.names.en = item.dataId;
    }
  }

  private getJobInfos(unit, jobs) {
    for (let i = 0; i < 3; i++) {
      unit.jobs[i].image = this.jobs[jobs[i]].mdl.toLowerCase();
      if (this.names.job[jobs[i]]) {
        unit.jobs[i].names = {en: this.names.job[jobs[i]]}
      } else {
        unit.jobs[i].names = {en: jobs[i]}
      }
    }

    this.jobs[jobs[0]].equips.forEach(equip => {
      if (this.equipmentService.isWeapon(this.jobEquip[equip])) {
        unit.equipments.weapons.push(this.jobEquip[equip])
      } else {
        unit.equipments.armors.push(this.jobEquip[equip])
      }
    });
  }

  private getSkillsAndBuffs(unit) {
    if (this.boards[unit.dataId]) {
      this.boards[unit.dataId].panels.forEach(item => {
        if (item.value.split("_")[0] === "BUFF") {
          this.addPassiveBuff(unit, item)
        } else {
          this.addSkill(unit, item)
        }
      });
    }
  }


  private getVisionCardSkillsAndBuffs(visionCard, rawVisionCard) {
    // party
    if (rawVisionCard.card_skill) {
      this.addSkill(visionCard, {slot: 3, value: rawVisionCard.card_skill}, "partyBuffsClassic")
    }

    if (rawVisionCard.add_card_skill_buff_awake) {
      this.addSkill(visionCard, {slot: 3, value: rawVisionCard.add_card_skill_buff_awake}, "partyBuffsAwake")
    }

    if (rawVisionCard.add_card_skill_buff_lvmax) {
      this.addSkill(visionCard, {slot: 3, value: rawVisionCard.add_card_skill_buff_lvmax}, "partyBuffsMax")
    }

    // self
    if (rawVisionCard.self_buff) {
      this.addSkill(visionCard, {slot: 3, value: rawVisionCard.self_buff}, "unitBuffsClassic")
    }

    if (rawVisionCard.add_self_buff_awake) {
      this.addSkill(visionCard, {slot: 3, value: rawVisionCard.add_self_buff_awake}, "unitBuffsAwake")
    }

    if (rawVisionCard.add_self_buff_lvmax) {
      this.addSkill(visionCard, {slot: 3, value: rawVisionCard.add_self_buff_lvmax}, "unitBuffsMax")
    }
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
          console.log(this.buffs[panelBuff.value])
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

  private addSkill(unit, panelSkill, type = "skills") {
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

    if (this.skills[panelSkill.value].wth) {
      this.addWeather(unit, skill, this.skills[panelSkill.value].wth.id);
    }

    unit[type].push(skill);
  }

  private updateSkill(unit, skill, skillId) {
    if (skill.slot !== 3) {
      skill.cost = {
        type: this.skills[skillId].cost_type == 0 ? "AP" : "TP",
        value: this.skills[skillId].cost_type == 0 ? this.skills[skillId].cost_ap : this.skills[skillId].cost_mp
      }

      if (this.skills[skillId].hp_cost) {
        skill.effects.push({
          type: "HP_COST",
          value: this.skills[skillId].hp_cost,
          calcType: "percent"
        });
      }

      skill.type = skill.slot === 4 ? "counter" : "active"
      skill.count = this.skills[skillId].count
      skill.range = {
        h: this.skills[skillId].range_h,
        l: this.skills[skillId].range_l,
        m: this.skills[skillId].range_m,
        mh: this.skills[skillId].range_mh,
        s: this.skills[skillId].range_s,
        w: this.skills[skillId].range_w,
        line: this.skills[skillId].line
      }

      skill.based = this.skills[skillId].atk_type ? this.atkBased[this.skills[skillId].atk_type] : null

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
          minValue: this.skills[skillId].eff_rate,
          maxValue: this.skills[skillId].eff_rate1,
          reactDamage: this.reactCounter[this.skills[skillId].react_d_type],
          calcType: "percent",
        }
      }

      if (this.skills[skillId].klsp) {
        if (!this.killers[this.skills[skillId].klsp[0]]) {
          console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KLSP : " + this.skills[skillId].klsp[0])
        }

        this.skills[skillId].klsp.forEach(killer => {
          skill.effects.push({
            type: this.killers[killer] + "_KILLER",
            minValue: this.skills[skillId].klspr,
            maxValue: this.skills[skillId].klspr,
            calcType: "unknow",
          });
        });
      }

      if (this.skills[skillId].barrier) {
        skill.effects.push({
          type: this.skills[skillId].eff === "ef_com_guard_02" ? "BARRIER" : "REDUCE_DAMAGE",
          minValue: this.skills[skillId].barrier.scut,
          maxValue: this.skills[skillId].barrier.ecut,
          calcType: "percent",
          turn: this.skills[skillId].barrier.val,
          turnType: this.skills[skillId].barrier.type !== 3 ? "TURNS" : "COUNT",
        });
      }

      if (this.skills[skillId].chang) {
        skill.effects.push({
          type: "SWITCH_POS"
        });
      }

      if (this.skills[skillId].move) {
        skill.effects.push({
          type: "MOVE_UNIT"
        });
      }


      if (typeof(this.skills[skillId].eff_val) == "number" && this.skills[skillId].eff_val !== 0 
        && typeof(this.skills[skillId].eff_val1) == "number" && this.skills[skillId].eff_val1 !== 0 
      ) {
        skill.damage = {
          minValue: this.skills[skillId].eff_val,
          maxValue: this.skills[skillId].eff_val1,
          minSpeed: this.skills[skillId].ct_spd,
          maxSpeed: this.skills[skillId].ct_spd1,
          type: this.damageTypes[this.skills[skillId].atk_det],
          pool: this.damagePool[this.skills[skillId].eff_dst],
          effType: this.damageEffectType[this.skills[skillId].eff_type],
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
          let duplicateFinded = false;

          while (!finished) {
            if (this.buffs[buff]["type" + i]) {
              if (duplicateFinded && this.buffs[buff]["type" + i] === 117) {} else {
                if (!this.buffTypes[this.buffs[buff]["type" + i]]) {
                  console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- EFFECT : " + this.buffs[buff]["type" + i])
                }

                if (buff == "BUFF_MAC_LW_KADI_1_1") {
                  console.log(buff)
                }

                if (this.buffs[buff]["id" + i]) {
                  buffs.push(this.buffs[this.buffs[buff]["id" + i]]);
                }

                skill.effects.push({
                  type: this.buffs[buff]["type" + i] !== 122 ? this.buffTypes[this.buffs[buff]["type" + i]] : this.buffs[buff]["tag" + i] + "_KILLER",
                  minValue: this.buffs[buff]["val" + i],
                  maxValue: this.buffs[buff]["val" + i + "1"],
                  calcType: this.calcType[this.buffs[buff]["calc" + i]] ? this.calcType[this.buffs[buff]["calc" + i]] : "unknow",
                  rate: this.buffs[buff].rate,
                  turn: this.buffs[buff].turn
                });

                if (this.buffs[buff]["type" + i] === 116) {
                  duplicateFinded = true;
                }
              }

              i++;
            } else {
              finished = true;
            }
          }
        })
      }







    } else if (skill.slot === 3) {
      skill.type = "passive"
      let buffs = this.skills[skillId].t_buffs ? this.skills[skillId].t_buffs : this.skills[skillId].s_buffs

      buffs.forEach(buff => {
        let finished = false;
        let i = 1;
        while (!finished) {
          if (this.buffs[buff]["type" + i]) {
            if (!this.buffTypes[this.buffs[buff]["type" + i]]) {
              console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- EFFECT : " + this.buffs[buff]["type" + i])
            }

            if (this.buffs[buff]["id" + i]) {
              this.buffs[buff] = this.buffs[this.buffs[buff]["id" + i]];
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
    } else {
       console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- SLOT : " + skill.slot)
    }
  }

  private getStats(unit, stats, type) {
    Object.keys(this.stats[type]).forEach(stat => {
      unit.stats[this.stats[type][stat]] = {
        min: stats[0][stat],
        max: stats[1][stat]
      }
    })
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

  private getMasterSkill(unit, skillId) {
    if (skillId) {
      let masterSkill = {
        names: {en: this.names.skill[skillId]},
        effects: [],
        dataId: skillId,
        slot: this.skills[skillId].slot
      };

      this.updateSkill(unit, masterSkill, skillId);

      unit.masterSkill = masterSkill
    }
  }

  private getTMR(unit, tmrId) {
    if (tmrId) {
      let tmr = {
        names: {en: this.names.equipment[tmrId]},
        stats: {},
        type: this.jobEquip[this.equipments[tmrId].cat[0]],
        dataId: tmrId,
        skills: [],
        image: this.equipments[tmrId].asset.toLowerCase()
      }

      Object.keys(this.equipments[tmrId].status[0]).forEach(stat => {
        tmr.stats[this.stats.unit[stat]] = this.equipments[tmrId].status[0][stat]
      })

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

  private addEsper(esper) {
    let dataId = esper.iname;
    this.wotvEspers[dataId] = {
      dataId: dataId,
      names: {},
      rarity: this.rarity[esper.rare],
      skills: [],
      buffs: [],
      stats: {},
      element: this.elements[esper.elem[0]],
      image: esper.charaId.toLowerCase()
    };

    this.getNames(this.wotvEspers[dataId], 'unit');

    this.getEsperStats(esper, 'esper')
    this.getEspersSkillsAndBuffs(this.wotvEspers[dataId]);

    this.addSkill(this.wotvEspers[dataId], {slot: 3, value: esper.atkskl});
  }

  private getEsperStats(esper, type) {
    let maxUnit = esper;
    while (maxUnit.nb_awake_id) {
      maxUnit = this.units[maxUnit.nb_awake_id[0]]
    }

    Object.keys(this.stats[type]).forEach(stat => {
      this.wotvEspers[esper.iname].stats[this.stats[type][stat]] = {
        min: esper.status[0][stat],
        max: maxUnit.status[1][stat]
      }
    })
  }

  private getEspersSkillsAndBuffs(esper) {
    if (this.espersBoards[esper.dataId]) {
      this.espersBoards[esper.dataId].panels.forEach(item => {
        this.addPassiveBuff(esper, item)
      });
    }
  }

  private addWeather(unit, skill, weatherId) {
    this.weathers[weatherId].buffs.forEach(buff => {
      let weatherFinished = false;
      let j = 1;
      while (!weatherFinished) {
        if (buff["buff" + j]) {
          let finished = false;
          let i = 1;
          while (!finished) {
            if (this.buffs[buff["buff" + j]]["type" + i]) {

              if (!this.buffTypes[this.buffs[buff["buff" + j]]["type" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- EFFECT : " + this.buffs[buff["buff" + j]]["type" + i])
                console.log(this.buffs[buff["buff" + j]])
              }

              skill.effects.push({
                side: buff.side === 1 ? "TEAM" : "ENNEMIES",
                type: this.buffTypes[this.buffs[buff["buff" + j]]["type" + i]],
                minValue: this.buffs[buff["buff" + j]]["val" + i],
                maxValue: this.buffs[buff["buff" + j]]["val" + i + "1"],
                calcType: this.calcType[this.buffs[buff["buff" + j]]["calc" + i]] ? this.calcType[this.buffs[buff["buff" + j]]["calc" + i]] : "unknow",
                turn: this.buffs[buff["buff" + j]].turn
              });
              i++;
            } else {
              finished = true;
            }
          }
          j++;
        } else {
          weatherFinished = true;
        }
      }
    });
  }

  private addEquipment(equipment) {
    let dataId = equipment.iname;
    let rType = equipment.rtype !=="AF_LOT_50" && equipment.rtype !=="AF_LOT_TRUST" ? equipment.rtype : dataId;

    if (this.names.equipment[dataId]) {
      if (!this.wotvEquipments[rType]) {
        this.wotvEquipments[rType] = {
          names: {en: this.names.equipment[dataId]},
          stats: {},
          type: this.jobEquip[this.equipments[dataId].cat[0]],
          dataId: dataId,
          skills: [],
          rarity: this.rarity[equipment.rare],
          image: this.equipments[dataId].asset.toLowerCase()
        }

        Object.keys(this.equipments[dataId].status[0]).forEach(stat => {
          this.wotvEquipments[rType].stats[this.stats.unit[stat]] = {
            min: this.equipments[dataId].status[0][stat],
            max: this.equipments[dataId].status[1] ? this.equipments[dataId].status[1][stat] : this.equipments[dataId].status[0][stat]
          }
        })
      }

      let lastSkillId = [];
      let skills = [];
      for (let i = 1; i <= 5; i++) {
        if (this.equipments[dataId]["skl" + i]) {
          for (let j = 0; j < this.equipments[dataId]["skl" + i].length; j++) {
            if (lastSkillId[j] !== this.equipments[dataId]["skl" + i][j]) {
              let skill = {
                names: {en: this.names.skill[this.equipments[dataId]["skl" + i][j]]},
                dataId: this.equipments[dataId]["skl" + i][j],
                effects: [],
                slot: this.skills[this.equipments[dataId]["skl" + i][j]].s_buffs || this.skills[this.equipments[dataId]["skl" + i][j]].type === 6 ? 3 : 1
              }
              this.updateSkill(this.wotvEquipments[rType], skill, this.equipments[dataId]["skl" + i][j]);
              skills.push(skill)
              lastSkillId[j] = this.equipments[dataId]["skl" + i][j]
            }
          }
        }
      }
      this.wotvEquipments[rType].skills.push(skills)
    }
  }

  private cleanUnits() {
    let unitToDelete = [];

    Object.keys(this.wotvUnits).forEach(unitId => {
      if (this.wotvUnits[unitId].skills.length === 0) {
        unitToDelete.push(unitId)
      }
    })

    unitToDelete.forEach(unitId => {
      delete this.wotvUnits[unitId]
    })
  }
}


/*









      "ct_type": 1,
      "ct_lock": 1,
      "ct_spd": 120,
      "ct_spd1": 280

*/