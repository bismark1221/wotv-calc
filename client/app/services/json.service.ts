import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from './equipment.service'
import {Slug } from 'ng2-slugify';

// Translations
import { default as FR_UnitName } from       '../../../data/unitname.json';
import { default as FR_SkillName } from      '../../../data/skillname.json';
import { default as FR_BuffName } from       '../../../data/buffname.json';
import { default as FR_JobName } from        '../../../data/jobname.json';
import { default as FR_ArtifactName } from   '../../../data/artifactname.json';
import { default as FR_VisionCardName } from '../../../data/visioncardname.json';
import { default as FR_ItemOther } from      '../../../data/itemother.json';
import { default as FR_ArtifactGrow } from   '../../../data/artifactgrow.json';

@Injectable()
export class JsonService {
  slug = new Slug('default');

  wotvUnits = {};
  wotvVisionCards = {};
  wotvEspers = {};
  wotvEquipments = {};
  wotvJobs = {};

  units = {};
  skills = {};
  buffs = {};
  equipments = {};
  boards = {};
  jobs = {};
  visionCards = {};
  weathers = {};
  espersBoards = {};
  espersTbl = {};
  equipmentRecipes = {};
  equipementLots = {};
  grows = {};

  names = {
    en : {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {}
    },
    fr: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {}
    }
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
    27: "LUCK",
    28: "MOVE",
    29: "JUMP",
    42: "FIRE",
    43: "ICE",
    44: "WIND",
    45: "EARTH",
    46: "LIGHTNING",
    47: "WATER",
    48: "LIGHT",
    49: "DARK",
    50: "ALL_ELEMENTS",
    61: "SLASH",
    62: "PIERCE",
    63: "STRIKE",
    64: "MISSILE",
    65: "MAGIC",
    70: "ALL_ATTACKS",
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
    104: "DEMON",
    105: "DRAGON",
    106: "ELEMENTAL",
    107: "AVIAN",
    109: "AQUATIC",
    110: "MACHINA",
    111: "PLANT",
    112: "REAPER",
    113: "STONE",
    114: "METAL",
    204: "FENNES"
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
      "jmp": "JUMP",
      "lv": "MAX_LV"
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

  jobStats = [
    "hp",
    "mp",
    "ap",
    "atk",
    "mag",
    "dex",
    "spd",
    "luk",
    "iniap"
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

  slots = [
    "buff",
    "skill",
    "skill",
    "support",
    "counter",
    "esper",
    "limit",
    "master",
    "party"
  ]



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

  private jsonEsperLvTbls() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/NBeastLvTbl.json').toPromise();
  }

  private jsonArtifactRecipes() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/ArtifactRecipe.json').toPromise();
  }

  private jsonArtifactLot() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/ArtifactRandLot.json').toPromise();
  }

  private jsonGrows() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Grow.json').toPromise();
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

  private jsonVisionItemOthers() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ItemOther.json').toPromise();
  }

  private jsonEquipmentGrow() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ArtifactGrow.json').toPromise();
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
      this.jsonEsperLvTbls(),
      this.jsonArtifactRecipes(),
      this.jsonVisionItemOthers(),
      this.jsonArtifactLot(),
      this.jsonEquipmentGrow(),
      this.jsonGrows(),
    ]).then(responses => {
      this.units = this.formatJson(responses[0]);
      this.names.en.unit = this.formatNames(responses[1]);
      this.names.en.job = this.formatNames(responses[2]);
      this.boards = this.formatJson(responses[3]);
      this.skills = this.formatJson(responses[4]);
      this.names.en.skill = this.formatNames(responses[5]);
      this.buffs = this.formatJson(responses[6]);
      this.names.en.buff = this.formatNames(responses[7]);
      this.jobs = this.formatJson(responses[8]);
      this.equipments = this.formatJson(responses[9]);
      this.names.en.equipment = this.formatNames(responses[10]);
      this.visionCards = this.formatJson(responses[11]);
      this.names.en.visionCard = this.formatNames(responses[12]);
      this.espersBoards = this.formatJson(responses[13]);
      this.weathers = this.formatJson(responses[14]);
      this.espersTbl = this.formatJson(responses[15]);
      this.equipmentRecipes = this.formatJson(responses[16]);
      this.names.en.itemOther = this.formatNames(responses[17]);
      this.equipementLots = this.formatJson(responses[18]);
      this.names.en.equipmentGrow = this.formatNames(responses[19]);
      this.grows = this.formatJson(responses[20]);

      this.names.fr.unit = this.formatNames(FR_UnitName)
      this.names.fr.skill = this.formatNames(FR_SkillName)
      this.names.fr.job = this.formatNames(FR_JobName)
      this.names.fr.buff = this.formatNames(FR_BuffName)
      this.names.fr.equipment = this.formatNames(FR_ArtifactName)
      this.names.fr.visionCard = this.formatNames(FR_VisionCardName)
      this.names.fr.itemOther = this.formatNames(FR_ItemOther)
      this.names.fr.equipmentGrow = this.formatNames(FR_ArtifactGrow)

      this.formatJsons();

      return {
        units: this.wotvUnits,
        visionCards: this.wotvVisionCards,
        espers: this.wotvEspers,
        equipments: this.wotvEquipments,
        jobs: this.wotvJobs
      };
    });
  }

  private formatJson(data) {
    let formatted = {};
    data.items.forEach(item => {
      formatted[(item.iname ? item.iname : item.type)] = item;
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
    Object.keys(this.jobs).forEach(jobId => {
      this.addJob(this.jobs[jobId])
    })

    Object.keys(this.units).forEach(unitId => {
      if (this.units[unitId].type === 0) {
        this.addUnit(this.units[unitId]);
      }

      if (this.units[unitId].type === 1) {
        this.addEsper(this.units[unitId]);
      }
    });

    this.cleanUnits();

    Object.keys(this.visionCards).forEach(visionCardId => {
      this.addVisionCard(this.visionCards[visionCardId]);
    });

    Object.keys(this.equipments).forEach(equipmentId => {
      this.addEquipment(this.equipments[equipmentId]);
    });
  }

  private addJob(job) {
    let dataId = job.iname;
    this.wotvJobs[dataId] = {
      dataId: dataId,
      names: { en: this.names.en.job[dataId], fr: this.names.fr.job[dataId] },
      statsModifiers: [],
      image: job.mdl.toLowerCase(),
      subRate: job.sub_rate,
      equipments: {
        weapons: [],
        armors: []
      }
    };

    job.equips.forEach(equip => {
      if (this.equipmentService.isWeapon(this.jobEquip[equip])) {
        this.wotvJobs[dataId].equipments.weapons.push(this.jobEquip[equip])
      } else {
        this.wotvJobs[dataId].equipments.armors.push(this.jobEquip[equip])
      }
    });

    job.ranks.forEach(rank => {
      let rankModifiers = {};
      this.jobStats.forEach(stat => {
        rankModifiers[this.stats.unit[stat]] = rank[stat];
      })

      this.wotvJobs[dataId].statsModifiers.push(rankModifiers);
    })
  }

  private addUnit(unit) {
    let dataId = unit.iname;
    this.wotvUnits[dataId] = {
      dataId: dataId,
      names: {},
      rarity: this.rarity[unit.rare],
      jobs: unit.jobsets,
      stats: {},
      element: this.elements[unit.elem[0]],
      image: unit.charaId.toLowerCase(),
      equipments: {
        weapons: [],
        armors: []
      },
      board: {
        nodes: {},
        lines: []
      }
    };

    this.getNames(this.wotvUnits[dataId], 'unit');

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
        stats: {},
        image: visionCard.icon.toLowerCase()
      };

      this.getNames(this.wotvVisionCards[dataId], 'visionCard');
      this.getStats(this.wotvVisionCards[dataId], visionCard.status, 'visionCard')

      this.getVisionCardSkillsAndBuffs(this.wotvVisionCards[dataId], visionCard);
    }
  }

  private getNames(item, type) {
    if (this.names.en[type][item.dataId]) {
      item.names.en = this.names.en[type][item.dataId]
      item.names.fr = this.names.fr[type][item.dataId]
      item.slug = this.slug.slugify(item.names.en)
    } else {
      item.names.en = item.dataId;
      item.names.fr = item.dataId;
      item.slug = this.slug.slugify(item.names.en)
    }
  }

  private getSkillsAndBuffs(unit) {
    if (this.boards[unit.dataId]) {
      this.boards[unit.dataId].panels.forEach(item => {

        unit.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: item.panel_effect_type == 1 ? "skill" : "buff",
          skill: this.addSkill(unit, item)
        }
      });

      this.boards[unit.dataId].lines.forEach(line => {
        unit.board.lines.push(line.line_id)
      })
    }
  }


  private getVisionCardSkillsAndBuffs(visionCard, rawVisionCard) {
    // party
    if (rawVisionCard.card_skill) {
      visionCard.partyBuffsClassic = this.addSkill(visionCard, {slot: 0, value: rawVisionCard.card_skill})
    }

    if (rawVisionCard.add_card_skill_buff_awake) {
      visionCard.partyBuffsAwake = this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_card_skill_buff_awake})
    }

    if (rawVisionCard.add_card_skill_buff_lvmax) {
      visionCard.partyBuffsMax = this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_card_skill_buff_lvmax})
    }

    // self
    if (rawVisionCard.self_buff) {
      visionCard.unitBuffsClassic = this.addSkill(visionCard, {slot: 0, value: rawVisionCard.self_buff})
    }

    if (rawVisionCard.add_self_buff_awake) {
      visionCard.unitBuffsAwake = this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_self_buff_awake})
    }

    if (rawVisionCard.add_self_buff_lvmax) {
      visionCard.unitBuffsMax = this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_self_buff_lvmax})
    }
  }

  private addSkill(unit, panelSkill) {
    let skill = {
      unlockStar: panelSkill.unlock_value + 1,
      unlockJob: panelSkill.get_job,
      jobLevel: panelSkill.need_level,
      jp: panelSkill.jp,
      sp: panelSkill.sp,
      effects: [],
      dataId: panelSkill.value,
      type: this.slots[(this.skills[panelSkill.value] && this.skills[panelSkill.value].slot ? this.skills[panelSkill.value].slot : 0)],
      mainSkill: this.skills[panelSkill.value] && this.skills[panelSkill.value].slot == 1
    };

    this.updateSkill(unit, skill, panelSkill.value);

    if (skill.type !== "buff" && this.skills[panelSkill.value].wth) {
      this.addWeather(unit, skill, this.skills[panelSkill.value].wth.id);
    }

    return skill;
  }

  private updateSkill(unit, skill, skillId) {
    let dataSkill = {
      t_buffs: null,
      s_buffs: null,
      cost_type: null,
      cost_ap: null,
      cost_mp: null,
      hp_cost: null,
      count: null,
      range_h: null,
      range_l: null,
      range_m: null,
      range_mh: null,
      range_s: null,
      range_w: null,
      line: null,
      atk_type: null,
      eff_s: null,
      eff_l: null,
      eff_h: null,
      ct_spd: null,
      ct_spd1: null,
      hit: null,
      pierce: null,
      ctbreak: null,
      combo_num: null,
      combo_rate: null,
      vat: null,
      rate: null,
      dir: null,
      ds: null,
      eff_rate: null,
      eff_rate1: null,
      react_d_type: null,
      klsp: null,
      klspr: null,
      barrier: null,
      eff: null,
      chang: null,
      move: null,
      eff_val: null,
      eff_val1: null,
      eff_type: null,
      eff_dst: null,
      atk_det: null,
      elem: null
    };

    if (skill.type == "buff") {
      dataSkill.s_buffs = [skillId]
    } else {
      dataSkill = this.skills[skillId]
      skill.names = {
        en: this.names.en.skill[skillId],
        fr: this.names.fr.skill[skillId]
      }
    }

    if (typeof(dataSkill.cost_type) == "number") {
      skill.cost = {
        type: dataSkill.cost_type == 0 ? "AP" : "TP",
        value: dataSkill.cost_type == 0 ? dataSkill.cost_ap : dataSkill.cost_mp
      }
    }

    if (dataSkill.hp_cost) {
      skill.effects.push({
        type: "HP_COST",
        value: dataSkill.hp_cost,
        calcType: "percent"
      });
    }

    skill.count = dataSkill.count

    if (dataSkill.range_h || dataSkill.range_l || dataSkill.range_m || dataSkill.range_mh || dataSkill.range_s || dataSkill.range_w || dataSkill.line) {
      skill.range = {
        h: dataSkill.range_h,
        l: dataSkill.range_l,
        m: dataSkill.range_m,
        mh: dataSkill.range_mh,
        s: dataSkill.range_s,
        w: dataSkill.range_w,
        line: dataSkill.line
      }
    }

    if (dataSkill.atk_type) {
      skill.based = this.atkBased[dataSkill.atk_type]
    }

    if (dataSkill.eff_s || dataSkill.eff_l || dataSkill.eff_h) {
      skill.aoe = {
        s: dataSkill.eff_s,
        l: dataSkill.eff_l,
        h: dataSkill.eff_h
      }
    }

    if (dataSkill.ct_spd) {
      skill.time = {
        minValue: dataSkill.ct_spd,
        maxValue: dataSkill.ct_spd1
      }
    }

    skill.hit = dataSkill.hit
    skill.pierce = dataSkill.pierce
    skill.ctbreak = dataSkill.ctbreak // Cancel ability activation

    if (dataSkill.combo_num) {
      skill.combo = {
        num: dataSkill.combo_num,
        rate: dataSkill.combo_rate
      }
    }

    if (dataSkill.vat) {
      skill.knockback = {
        rate: dataSkill.rate,
        value: dataSkill.vat,
        direction: dataSkill.dir,
        ds: dataSkill.ds
      }
    }

    if (skill.type === "counter") {
      skill.counter = {
        minValue: dataSkill.eff_rate,
        maxValue: dataSkill.eff_rate1,
        reactDamage: this.reactCounter[dataSkill.react_d_type],
        calcType: "percent",
      }
    }

    if (dataSkill.klsp) {
      if (!this.killers[dataSkill.klsp[0]]) {
        console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KLSP : " + dataSkill.klsp[0])
      }

      dataSkill.klsp.forEach(killer => {
        skill.effects.push({
          type: this.killers[killer] + "_KILLER",
          minValue: dataSkill.klspr,
          maxValue: dataSkill.klspr,
          calcType: "unknow",
        });
      });
    }

    if (dataSkill.barrier) {
      skill.effects.push({
        type: dataSkill.eff === "ef_com_guard_02" ? "BARRIER" : "REDUCE_DAMAGE",
        minValue: dataSkill.barrier.scut,
        maxValue: dataSkill.barrier.ecut,
        calcType: "percent",
        turn: dataSkill.barrier.val,
        turnType: dataSkill.barrier.type !== 3 ? "TURNS" : "COUNT",
      });
    }

    if (dataSkill.chang) {
      skill.effects.push({
        type: "SWITCH_POS"
      });
    }

    if (dataSkill.move) {
      skill.effects.push({
        type: "MOVE_UNIT"
      });
    }


    if (typeof(dataSkill.eff_val) == "number" && dataSkill.eff_val !== 0
      && typeof(dataSkill.eff_val1) == "number" && dataSkill.eff_val1 !== 0
      && dataSkill.eff_type !== 10
    ) {
      skill.damage = {
        minValue: dataSkill.eff_val,
        maxValue: dataSkill.eff_val1,
        minSpeed: dataSkill.ct_spd,
        maxSpeed: dataSkill.ct_spd1,
        type: this.damageTypes[dataSkill.atk_det],
        pool: this.damagePool[dataSkill.eff_dst],
        effType: this.damageEffectType[dataSkill.eff_type],
      }

      if (dataSkill.eff_dst && !this.damagePool[dataSkill.eff_dst]) {
        console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- DST : " + dataSkill.eff_dst)
      }

      if (dataSkill.elem) {
        skill.elem = [];
        dataSkill.elem.forEach(elem => {
          skill.elem.push(this.elements[elem])
        });
      }
    }


    if (dataSkill.t_buffs || dataSkill.s_buffs) {
      let buffs = dataSkill.t_buffs ? dataSkill.t_buffs : dataSkill.s_buffs
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

              if (this.buffs[buff]["id" + i]) {
                buffs.push(this.buffs[this.buffs[buff]["id" + i]].iname);
              }

              if (this.buffs[buff]["tag" + i] && !this.killers[this.buffs[buff]["tag" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KILLER : " + this.buffs[buff]["tag" + i])
              }

              skill.effects.push({
                type: this.buffs[buff]["tag" + i] ? this.killers[this.buffs[buff]["tag" + i]] + "_KILLER" : this.buffTypes[this.buffs[buff]["type" + i]],
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
        names: { en: this.names.en.skill[lbId], fr: this.names.fr.skill[lbId]},
        effects: [],
        dataId: lbId
      };

      this.updateSkill(unit, limit, lbId);

      unit.limit = limit
    }
  }

  private getMasterSkill(unit, skillId) {
    if (skillId) {
      let masterSkill = {
        names: { en: this.names.en.skill[skillId], fr: this.names.fr.skill[skillId]},
        effects: [],
        dataId: skillId
      };

      this.updateSkill(unit, masterSkill, skillId);

      unit.masterSkill = masterSkill
    }
  }

  private getTMR(unit, tmrId) {
    if (tmrId) {
      let tmr = {
        names: { en: this.names.en.equipment[tmrId], fr: this.names.fr.equipment[tmrId]},
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
                names: { en: this.names.en.skill[this.equipments[tmrId]["skl" + i][j]], fr: this.names.fr.skill[this.equipments[tmrId]["skl" + i][j]]},
                dataId: this.equipments[tmrId]["skl" + i][j],
                effects: [],
                type: this.slots[this.skills[this.equipments[tmrId]["skl" + i][j]].s_buffs ? 3 : 1]
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
      skills: [
        this.addSkill(this.wotvEspers[dataId], {slot: 1, value: esper.atkskl})
      ],
      stats: {},
      SPs : [],
      element: this.elements[esper.elem[0]],
      image: esper.charaId.toLowerCase(),
      board: {
        nodes: {},
        lines: []
      }
    };

    this.getNames(this.wotvEspers[dataId], 'unit');

    this.getEsperStats(esper, 'esper')
    this.getEspersSkillsAndBuffs(this.wotvEspers[dataId]);
    this.getEspersSPs(this.wotvEspers[dataId], esper.nb_lv_tbl);
  }

  private getEsperStats(esper, type) {
    let maxUnit = esper;
    while (maxUnit.nb_awake_id) {
      maxUnit = this.units[maxUnit.nb_awake_id[0]]
    }

    Object.keys(this.stats[type]).forEach(stat => {
      this.wotvEspers[esper.iname].stats[this.stats[type][stat]] = [
        {
          min: esper.status[0][stat],
          max: esper.status[1][stat]
        },
        {
          min: maxUnit.status[0][stat],
          max: maxUnit.status[1][stat]
        }
      ]
    })
  }

  private getEspersSkillsAndBuffs(esper) {
    if (this.espersBoards[esper.dataId]) {
      this.espersBoards[esper.dataId].panels.forEach(item => {
        esper.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: "buff",
          skill: this.addSkill(esper, item)
        }
      });

      this.espersBoards[esper.dataId].lines.forEach(line => {
        esper.board.lines.push(line.line_id)
      })
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

  private getEspersSPs(esper, tblId) {
    for (let awake = 1; awake <= 2; awake++) {
      esper.SPs.push([]);

      this.espersTbl[tblId]["awake" + awake].forEach(SP => {
        esper.SPs[awake - 1].push(SP.sp)
      })
    }
  }

  private addEquipment(equipment) {
    let dataId = equipment.iname;
    let rType = equipment.rtype !=="AF_LOT_50" && equipment.rtype !=="AF_LOT_TRUST" ? equipment.rtype : dataId;

    if (this.names.en.equipment[dataId] && equipment.type !== -1) {
      if (!this.wotvEquipments[rType]) {
        this.wotvEquipments[rType] = {
          names: { en: this.names.en.equipment[dataId], fr: this.names.fr.equipment[dataId]},
          slug: this.slug.slugify(this.names.en.equipment[dataId]),
          stats: {},
          type: this.jobEquip[this.equipments[dataId].cat[0]],
          dataId: dataId,
          grows: {},
          skills: [],
          rarity: this.rarity[equipment.rare],
          image: this.equipments[dataId].asset.toLowerCase()
        }

        if (equipment.trust) {
          let unitId = null;
          let i = 0;
          let unitIds = Object.keys(this.wotvUnits);

          while(!unitId && i < unitIds.length) {
            if (this.wotvUnits[unitIds[i]].tmr.dataId === dataId) {
              unitId = unitIds[i]
            }

            i++;
          }

          this.wotvEquipments[rType].acquisition = {
            type: "tmr",
            unitId: unitId
          }
        } else if (this.equipmentRecipes[dataId]) {
          let recipe = this.equipmentRecipes[dataId].recipe;
          if (this.names.en.itemOther[recipe] != "") {
            this.wotvEquipments[rType].acquisition = {
              type: {
                en: this.names.en.itemOther[recipe],
                fr: this.names.fr.itemOther[recipe],
              }
            }
          }
        }

        if (!this.wotvEquipments[rType].acquisition) {
          this.wotvEquipments[rType].acquisition = {
            type: "Unknown"
          }
        }

        if (this.equipementLots[equipment.rtype]) {
          if (equipment.rtype == "AF_LOT_50") {
            console.log(this.equipementLots[equipment.rtype])
            console.log(this.equipementLots[equipment.rtype].lot[0])
            console.log(this.equipementLots[equipment.rtype].lot[0].grow1)
          }
          for (let i = 1; i <= 3; i++) {
            let growId = this.equipementLots[equipment.rtype].lot[0]["grow" + i]
            if (growId) {
              this.wotvEquipments[rType].grows[growId] = {
                names: { en: this.names.en.equipmentGrow[growId], fr: this.names.fr.equipmentGrow[growId] },
                curve: {}
              }

              Object.keys(this.grows[growId].curve[0]).forEach(stat => {
                if (this.stats.unit[stat]) {
                  this.wotvEquipments[rType].grows[growId].curve[this.stats.unit[stat]] = this.grows[growId].curve[0][stat]
                }
              })
            }
          }
        }

        Object.keys(this.equipments[dataId].status[0]).forEach(stat => {
          if (this.equipments[dataId].status[0][stat] !== 0
            || (this.equipments[dataId].status[1]
              && typeof(this.equipments[dataId].status[1][stat]) == "number"
              && this.equipments[dataId].status[1][stat] !== 0)
          ) {
            this.wotvEquipments[rType].stats[this.stats.unit[stat]] = {
              min: this.equipments[dataId].status[0][stat],
              max: this.equipments[dataId].status[1] ? this.equipments[dataId].status[1][stat] : this.equipments[dataId].status[0][stat]
            }
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
                names: {
                  en: this.names.en.skill[this.equipments[dataId]["skl" + i][j]],
                  fr: this.names.fr.skill[this.equipments[dataId]["skl" + i][j]]
                },
                dataId: this.equipments[dataId]["skl" + i][j],
                effects: [],
                type: this.slots[this.skills[this.equipments[dataId]["skl" + i][j]].s_buffs || this.skills[this.equipments[dataId]["skl" + i][j]].type === 6 ? 3 : 1]
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
      if (this.wotvUnits[unitId].board.lines.length === 0) {
        unitToDelete.push(unitId)
      }
    })

    unitToDelete.forEach(unitId => {
      delete this.wotvUnits[unitId]
    })
  }
}


/*









*/


