import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from './equipment.service'
import { Slug } from 'ng2-slugify';
import { transliterate as tr, slugify } from 'transliteration';

// Translations
import { default as FR_ArtifactGrow } from   '../../../data/fr/artifactgrow.json';
import { default as FR_ArtifactName } from   '../../../data/fr/artifactname.json';
import { default as FR_BuffName } from       '../../../data/fr/buffname.json';
import { default as FR_ItemOther } from      '../../../data/fr/itemother.json';
import { default as FR_JobName } from        '../../../data/fr/jobname.json';
import { default as FR_SkillName } from      '../../../data/fr/skillname.json';
import { default as FR_UnitName } from       '../../../data/fr/unitname.json';
import { default as FR_VisionCardName } from '../../../data/fr/visioncardname.json';


import { default as JP_ArtifactGrow } from   '../../../data/jp/artifactgrow.json';
import { default as JP_ArtifactName } from   '../../../data/jp/artifactname.json';
import { default as JP_BuffName } from       '../../../data/jp/buffname.json';
import { default as JP_ItemOther } from      '../../../data/jp/itemother.json';
import { default as JP_JobName } from        '../../../data/jp/jobname.json';
import { default as JP_SkillName } from      '../../../data/jp/skillname.json';
import { default as JP_UnitName } from       '../../../data/jp/unitname.json';
import { default as JP_VisionCardName } from '../../../data/jp/visioncardname.json';



@Injectable()
export class JsonService {
  slug = new Slug('default');
  version = null

  gl = {
    units: {},
    skills: {},
    buffs: {},
    equipments: {},
    boards: {},
    jobs: {},
    visionCards: {},
    weathers: {},
    espersBoards: {},
    espersTbl: {},
    equipmentRecipes: {},
    equipementLots: {},
    grows: {},
    wotvUnits: {},
    wotvVisionCards: {},
    wotvEspers: {},
    wotvEquipments: {},
    wotvJobs: {}
  }

  jp = {
    units: {},
    skills: {},
    buffs: {},
    equipments: {},
    boards: {},
    jobs: {},
    visionCards: {},
    weathers: {},
    espersBoards: {},
    espersTbl: {},
    equipmentRecipes: {},
    equipementLots: {},
    grows: {},
    wotvUnits: {},
    wotvVisionCards: {},
    wotvEspers: {},
    wotvEquipments: {},
    wotvJobs: {}
  }

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
    },
    jp: {
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

      "efi": "FIRE_RES",
      "eic": "ICE_RES",
      "eea": "EARTH_RES",
      "ewi": "WIND_RES",
      "eth": "LIGHTNING_RES",
      "ewa": "WATER_RES",
      "esh": "LIGHT_RES",
      "eda": "DARK_RES",

      "asl": "SLASH_RES",
      "api": "PIERCE_RES",
      "abl": "STRIKE_RES",
      "ash": "MISSILE_RES",
      "ama": "MAGIC_RES",

      "cpo": "POISON_RES",
      "cbl": "BLIND_RES",
      "csl": "SLEEP_RES",
      "cmu": "SILENCE_RES",
      "cpa": "PARALYZE_RES",
      "ccf": "CONFUSION_RES",
      "cpe": "PETRIFY_RES",
      "cfr": "TOAD_RES",
      "cch": "CHARM_RES",
      "csw": "SLOW_RES",
      "cst": "STOP_RES",
      "cdm": "IMMOBILIZE_RES",
      "cda": "DISABLE_RES",
      "cbe": "BERSERK_RES",
      "cdo": "DOOM_RES",

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

      "efi": "FIRE_RES",
      "eic": "ICE_RES",
      "eea": "EARTH_RES",
      "ewi": "WIND_RES",
      "eth": "LIGHTNING_RES",
      "ewa": "WATER_RES",
      "esh": "LIGHT_RES",
      "eda": "DARK_RES",

      "asl": "SLASH_RES",
      "api": "PIERCE_RES",
      "abl": "STRIKE_RES",
      "ash": "MISSILE_RES",
      "ama": "MAGIC_RES",

      "cpo": "POISON_RES",
      "cbl": "BLIND_RES",
      "csl": "SLEEP_RES",
      "cmu": "SILENCE_RES",
      "cpa": "PARALYZE_RES",
      "ccf": "CONFUSION_RES",
      "cpe": "PETRIFY_RES",
      "cfr": "TOAD_RES",
      "cch": "CHARM_RES",
      "csw": "SLOW_RES",
      "cst": "STOP_RES",
      "cdm": "IMMOBILIZE_RES",
      "cda": "DISABLE_RES",
      "cbe": "BERSERK_RES",
      "cdo": "DOOM_RES",

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
    32: "dispel",
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

  private statsAtkRes = [
    "FIRE",
    "ICE",
    "EARTH",
    "WIND",
    "LIGHTNING",
    "WATER",
    "LIGHT",
    "DARK",
    "SLASH",
    "PIERCE",
    "STRIKE",
    "MISSILE",
    "MAGIC",
    "ALL_ELEMENTS",
    "ALL_ATTACKS"
  ]

  private ailmentStatus = [
    "REGEN",
    "AUTO_RESTORE",
    "POISON",
    "BLIND",
    "SLEEP",
    "SILENCE",
    "PARALYZE",
    "CONFUSION",
    "CHARM",
    "PETRIFY",
    "TOAD",
    "HASTE",
    "SLOW",
    "STOP",
    "STUN",
    "IMMOBILIZE",
    "DISABLE",
    "BERSERK",
    "DOOM",
    "REVIVE",
    "PROTECT",
    "SHELL",
    "FLOAT",
    "QUICKEN",
    "ALL_AILMENTS",
    "ALL_DEBUFFS"
  ]


  constructor(private http: HttpClient, private equipmentService: EquipmentService) {}

  private GLUnits() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Unit.json').toPromise();
  }

  private GLUnitsBoards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/UnitAbilityBoard.json').toPromise();
  }

  private GLSkills() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Skill.json').toPromise();
  }

  private GLBuffs() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Buff.json').toPromise();
  }

  private GLJobs() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Job.json').toPromise();
  }

  private GLEquipments() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Artifact.json').toPromise();
  }

  private GLVisionCards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/VisionCard.json').toPromise();
  }

  private GLEspersBoards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/NetherBeastAbilityBoard.json').toPromise();
  }

  private GLWeathers() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Weather.json').toPromise();
  }

  private GLEsperLvTbls() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/NBeastLvTbl.json').toPromise();
  }

  private GLArtifactRecipes() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/ArtifactRecipe.json').toPromise();
  }

  private GLArtifactLot() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/ArtifactRandLot.json').toPromise();
  }

  private GLGrows() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Grow.json').toPromise();
  }

  /* JP */
  private JPUnits() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Unit.json').toPromise();
  }

  private JPUnitsBoards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/UnitAbilityBoard.json').toPromise();
  }

  private JPSkills() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Skill.json').toPromise();
  }

  private JPBuffs() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Buff.json').toPromise();
  }

  private JPJobs() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Job.json').toPromise();
  }

  private JPEquipments() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Artifact.json').toPromise();
  }

  private JPVisionCards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/VisionCard.json').toPromise();
  }

  private JPEspersBoards() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/NetherBeastAbilityBoard.json').toPromise();
  }

  private JPWeathers() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Weather.json').toPromise();
  }

  private JPEsperLvTbls() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/NBeastLvTbl.json').toPromise();
  }

  private JPArtifactRecipes() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/ArtifactRecipe.json').toPromise();
  }

  private JPArtifactLot() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/ArtifactRandLot.json').toPromise();
  }

  private JPGrows() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Grow.json').toPromise();
  }

  /* Translation */
  private TranslateUnitNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/UnitName.json').toPromise();
  }

  private TranslateSkillNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/SkillName.json').toPromise();
  }

  private TranslateBuffNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/BuffName.json').toPromise();
  }

  private TranslateJobNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/JobName.json').toPromise();
  }

  private TranslateEquipmentNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ArtifactName.json').toPromise();
  }

  private TranslateVisionCardNames() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/VisionCardName.json').toPromise();
  }

  private TranslateVisionItemOthers() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ItemOther.json').toPromise();
  }

  private TranslateEquipmentGrow() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ArtifactGrow.json').toPromise();
  }


  getJsons(): Promise<any[]> {
    // @ts-ignore
    return Promise.all([
      this.GLUnits(),
      this.GLUnitsBoards(),
      this.GLSkills(),
      this.GLBuffs(),
      this.GLJobs(),
      this.GLEquipments(),
      this.GLVisionCards(),
      this.GLEspersBoards(),
      this.GLWeathers(),
      this.GLEsperLvTbls(),
      this.GLArtifactRecipes(),
      this.GLArtifactLot(),
      this.GLGrows(),

      this.JPUnits(),
      this.JPUnitsBoards(),
      this.JPSkills(),
      this.JPBuffs(),
      this.JPJobs(),
      this.JPEquipments(),
      this.JPVisionCards(),
      this.JPEspersBoards(),
      this.JPWeathers(),
      this.JPEsperLvTbls(),
      this.JPArtifactRecipes(),
      this.JPArtifactLot(),
      this.JPGrows(),

      this.TranslateUnitNames(),
      this.TranslateJobNames(),
      this.TranslateSkillNames(),
      this.TranslateBuffNames(),
      this.TranslateEquipmentNames(),
      this.TranslateVisionCardNames(),
      this.TranslateVisionItemOthers(),
      this.TranslateEquipmentGrow(),
    ]).then(responses => {
      this.gl.units = this.formatJson(responses[0]);
      this.gl.boards = this.formatJson(responses[1]);
      this.gl.skills = this.formatJson(responses[2]);
      this.gl.buffs = this.formatJson(responses[3]);
      this.gl.jobs = this.formatJson(responses[4]);
      this.gl.equipments = this.formatJson(responses[5]);
      this.gl.visionCards = this.formatJson(responses[6]);
      this.gl.espersBoards = this.formatJson(responses[7]);
      this.gl.weathers = this.formatJson(responses[8]);
      this.gl.espersTbl = this.formatJson(responses[9]);
      this.gl.equipmentRecipes = this.formatJson(responses[10]);
      this.gl.equipementLots = this.formatJson(responses[11]);
      this.gl.grows = this.formatJson(responses[12]);

      this.jp.units = this.formatJson(responses[13]);
      this.jp.boards = this.formatJson(responses[14]);
      this.jp.skills = this.formatJson(responses[15]);
      this.jp.buffs = this.formatJson(responses[16]);
      this.jp.jobs = this.formatJson(responses[17]);
      this.jp.equipments = this.formatJson(responses[18]);
      this.jp.visionCards = this.formatJson(responses[19]);
      this.jp.espersBoards = this.formatJson(responses[20]);
      this.jp.weathers = this.formatJson(responses[21]);
      this.jp.espersTbl = this.formatJson(responses[22]);
      this.jp.equipmentRecipes = this.formatJson(responses[23]);
      this.jp.equipementLots = this.formatJson(responses[24]);
      this.jp.grows = this.formatJson(responses[25]);

      this.names.en.unit = this.formatNames(responses[26]);
      this.names.en.job = this.formatNames(responses[27]);
      this.names.en.skill = this.formatNames(responses[28]);
      this.names.en.buff = this.formatNames(responses[29]);
      this.names.en.equipment = this.formatNames(responses[30]);
      this.names.en.visionCard = this.formatNames(responses[31]);
      this.names.en.itemOther = this.formatNames(responses[32]);
      this.names.en.equipmentGrow = this.formatNames(responses[33]);

      this.names.fr.unit = this.formatNames(FR_UnitName)
      this.names.fr.skill = this.formatNames(FR_SkillName)
      this.names.fr.job = this.formatNames(FR_JobName)
      this.names.fr.buff = this.formatNames(FR_BuffName)
      this.names.fr.equipment = this.formatNames(FR_ArtifactName)
      this.names.fr.visionCard = this.formatNames(FR_VisionCardName)
      this.names.fr.itemOther = this.formatNames(FR_ItemOther)
      this.names.fr.equipmentGrow = this.formatNames(FR_ArtifactGrow)

      this.names.jp.unit = this.formatNames(JP_UnitName)
      this.names.jp.skill = this.formatNames(JP_SkillName)
      this.names.jp.job = this.formatNames(JP_JobName)
      this.names.jp.buff = this.formatNames(JP_BuffName)
      this.names.jp.equipment = this.formatNames(JP_ArtifactName)
      this.names.jp.visionCard = this.formatNames(JP_VisionCardName)
      this.names.jp.itemOther = this.formatNames(JP_ItemOther)
      this.names.jp.equipmentGrow = this.formatNames(JP_ArtifactGrow)

      this.formatJsons();

      return {
        gl: {
          units: this.gl.wotvUnits,
          visionCards: this.gl.wotvVisionCards,
          espers: this.gl.wotvEspers,
          equipments: this.gl.wotvEquipments,
          jobs: this.gl.wotvJobs
        },
        jp: {
          units: this.jp.wotvUnits,
          visionCards: this.jp.wotvVisionCards,
          espers: this.jp.wotvEspers,
          equipments: this.jp.wotvEquipments,
          jobs: this.jp.wotvJobs
        }
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
    let versions = ["gl", "jp"]
    for(let i = 0; i < versions.length; i ++) {
      this.version = versions[i]

      Object.keys(this[this.version].jobs).forEach(jobId => {
        this.addJob(this[this.version].jobs[jobId])
      })

      Object.keys(this[this.version].units).forEach(unitId => {
        if (this[this.version].units[unitId].type === 0) {
          this.addUnit(this[this.version].units[unitId]);
        }

        if (this[this.version].units[unitId].type === 1) {
          this.addEsper(this[this.version].units[unitId]);
        }
      });

      this.cleanUnits();

      Object.keys(this[this.version].visionCards).forEach(visionCardId => {
        this.addVisionCard(this[this.version].visionCards[visionCardId]);
      });

      Object.keys(this[this.version].equipments).forEach(equipmentId => {
        this.addEquipment(this[this.version].equipments[equipmentId]);
      });
    }
  }

  private addJob(job) {
    let dataId = job.iname;
    this[this.version].wotvJobs[dataId] = {
      dataId: dataId,
      names: {},
      statsModifiers: [],
      image: job.mdl.toLowerCase(),
      subRate: job.sub_rate,
      equipments: {
        weapons: [],
        armors: []
      }
    };

    this.getNames(this[this.version].wotvJobs[dataId], 'job');

    job.equips.forEach(equip => {
      if (this.equipmentService.isWeapon(this.jobEquip[equip])) {
        this[this.version].wotvJobs[dataId].equipments.weapons.push(this.jobEquip[equip])
      } else {
        this[this.version].wotvJobs[dataId].equipments.armors.push(this.jobEquip[equip])
      }
    });

    job.ranks.forEach(rank => {
      let rankModifiers = {};
      this.jobStats.forEach(stat => {
        rankModifiers[this.stats.unit[stat]] = rank[stat];
      })

      this[this.version].wotvJobs[dataId].statsModifiers.push(rankModifiers);
    })
  }

  private addUnit(unit) {
    let dataId = unit.iname;
    this[this.version].wotvUnits[dataId] = {
      dataId: dataId,
      names: {},
      rarity: this.rarity[unit.rare],
      jobs: unit.jobsets,
      stats: {},
      element: this.elements[unit.elem[0]],
      image: unit.charaId.toLowerCase(),
      board: {
        nodes: {},
        lines: []
      }
    };

    this.getNames(this[this.version].wotvUnits[dataId], 'unit');

    this.getStats(this[this.version].wotvUnits[dataId], unit.status, 'unit')
    this.getLB(this[this.version].wotvUnits[dataId], unit.limit)
    this.getMasterSkill(this[this.version].wotvUnits[dataId], unit.mstskl)
    this.getTMR(this[this.version].wotvUnits[dataId], unit.trust)
    this.getSkillsAndBuffs(this[this.version].wotvUnits[dataId]);
  }

  private addVisionCard(visionCard) {
    let dataId = visionCard.iname;

    if (visionCard.type === 0) {
      this[this.version].wotvVisionCards[dataId] = {
        dataId: dataId,
        names: {},
        rarity: this.rarity[visionCard.rare],
        stats: {},
        image: visionCard.icon.toLowerCase()
      };

      this.getNames(this[this.version].wotvVisionCards[dataId], 'visionCard');
      this.getStats(this[this.version].wotvVisionCards[dataId], visionCard.status, 'visionCard')

      this.getVisionCardSkillsAndBuffs(this[this.version].wotvVisionCards[dataId], visionCard);
    }
  }

  private getNames(item, type) {
    if (this.version == "gl") {
      if (this.names.en[type][item.dataId]) {
        item.names.en = this.names.en[type][item.dataId]
        item.names.fr = this.names.fr[type][item.dataId]
        item.slug = this.slug.slugify(item.names.en)
      } else {
        item.names.en = item.dataId;
        item.names.fr = item.dataId;
        item.slug = this.slug.slugify(item.names.en)
      }
    } else {
      if (type == "unit" && this.names.en[type][item.dataId]
        || type == "visionCard" && this.names.en[type][item.dataId]
        || type == "equipment" && this.names.en[type][item.dataId]) {
        item.names.en = this.names.en[type][item.dataId] + " - " + this.names.jp[type][item.dataId]
        item.slug = this.slug.slugify(this.names.en[type][item.dataId])
      } else if (this.names.jp[type][item.dataId]) {
        item.names.en = this.names.jp[type][item.dataId]
        item.slug = slugify(item.names.en)
      } else {
        item.names.en = item.dataId;
        item.slug = this.slug.slugify(item.names.en)
      }
    }
  }

  private getSkillsAndBuffs(unit) {
    if (this[this.version].boards[unit.dataId]) {
      this[this.version].boards[unit.dataId].panels.forEach(item => {

        unit.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: item.panel_effect_type == 1 ? "skill" : "buff",
          skill: this.addSkill(unit, item)
        }
      });

      this[this.version].boards[unit.dataId].lines.forEach(line => {
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
      type: this.slots[(this[this.version].skills[panelSkill.value] && this[this.version].skills[panelSkill.value].slot ? this[this.version].skills[panelSkill.value].slot : 0)],
      mainSkill: this[this.version].skills[panelSkill.value] && this[this.version].skills[panelSkill.value].slot == 1
    };

    this.updateSkill(unit, skill, panelSkill.value);

    if (skill.type !== "buff" && this[this.version].skills[panelSkill.value].wth) {
      this.addWeather(unit, skill, this[this.version].skills[panelSkill.value].wth.id);
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
      elem: null,
      cap: null,
      stl_val: null,
      stl_val1 : null
    };

    if (skill.type == "buff") {
      dataSkill.s_buffs = [skillId]
    } else {
      dataSkill = this[this.version].skills[skillId]
      skill.names = {}
      this.getNames(skill, 'skill')
      dataSkill.names = skill.names
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
    skill.maxLevel = dataSkill.cap

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

    if (dataSkill.stl_val) {
      skill.effects.push({
        type: "STEAL",
        minValue: dataSkill.stl_val,
        maxValue: dataSkill.stl_val1,
        calcType: "unknow"
      });
    }


    if (((typeof(dataSkill.eff_val) == "number" && dataSkill.eff_val !== 0)
      || (typeof(dataSkill.eff_val1) == "number" && dataSkill.eff_val1 !== 0))
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
      let buffs = JSON.parse(JSON.stringify(dataSkill.t_buffs ? dataSkill.t_buffs : dataSkill.s_buffs))

      let buffIndex = 0
      while (buffIndex <= buffs.length - 1) {
        let buff = buffs[buffIndex]
        let finished = false;
        let i = 1;
        let duplicateFinded = false;

        while (!finished) {
          if (this[this.version].buffs[buff]["type" + i]) {
            if (duplicateFinded && this[this.version].buffs[buff]["type" + i] === 117) {} else {
              if (!this.buffTypes[this[this.version].buffs[buff]["type" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- EFFECT : " + this[this.version].buffs[buff]["type" + i])
              }

              if (this[this.version].buffs[buff]["id" + i]) {
                buffs.push(this[this.version].buffs[this[this.version].buffs[buff]["id" + i]].iname);
              }

              if (this[this.version].buffs[buff]["tag" + i] && !this.killers[this[this.version].buffs[buff]["tag" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KILLER : " + this[this.version].buffs[buff]["tag" + i])
              }

              let type = this[this.version].buffs[buff]["tag" + i] ? this.killers[this[this.version].buffs[buff]["tag" + i]] + "_KILLER" : this.buffTypes[this[this.version].buffs[buff]["type" + i]]
              let nullifyOrDispel = false;
              if (this.statsAtkRes.indexOf(type) !== -1) {
                type = type + "_" + (this.calcType[this[this.version].buffs[buff]["calc" + i]] == "resistance" ? "RES" : "ATK")
              } else if (this.ailmentStatus.indexOf(type) !== -1) {
                let calcType = this.calcType[this[this.version].buffs[buff]["calc" + i]]
                if (calcType == "nullify" || calcType == "dispel") {
                  nullifyOrDispel = true
                  let effect = this.findEffect(skill, calcType.toUpperCase())
                  if (!effect) {
                    effect = {
                      type: calcType.toUpperCase(),
                      ailments: []
                    }
                    skill.effects.push(effect)
                  }
                  effect.ailments.push(type)
                } else {
                  type = type + "_" + (this.calcType[this[this.version].buffs[buff]["calc" + i]] == "resistance" ? "RES" : "ATK")
                }
              }

              if (!nullifyOrDispel && type !== "IMBUE") {
                skill.effects.push({
                  type: type,
                  minValue: this[this.version].buffs[buff]["val" + i],
                  maxValue: this[this.version].buffs[buff]["val" + i + "1"],
                  calcType: this.calcType[this[this.version].buffs[buff]["calc" + i]] ? this.calcType[this[this.version].buffs[buff]["calc" + i]] : "unknow",
                  rate: this[this.version].buffs[buff].rate,
                  turn: this[this.version].buffs[buff].turn
                });
              }

              if (this[this.version].buffs[buff]["type" + i] === 116) {
                duplicateFinded = true;
              }
            }

            i++;
          } else {
            finished = true;
          }
        }
        buffIndex++
      }
    }
  }

  private findEffect(skill, type) {
    let findedEffect = null

    skill.effects.forEach(effect => {
      if (effect.type == type) {
        findedEffect = effect
      }
    })

    return findedEffect
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
        names: {},
        effects: [],
        dataId: lbId
      };
      this.updateSkill(unit, limit, lbId);

      unit.limit = limit
    }
  }

  private getMasterSkill(unit, skillId) {
    if (skillId) {
      if (Array.isArray(skillId)) {
        unit.masterSkill = []
        let masterSkill = null

        skillId.forEach(id => {
          let masterSkill = {
            names: {},
            effects: [],
            dataId: id
          };
          this.updateSkill(unit, masterSkill, id);

          unit.masterSkill.push(masterSkill)
        })
      } else {
        let masterSkill = {
          names: {},
          effects: [],
          dataId: skillId
        };
        this.updateSkill(unit, masterSkill, skillId);

        unit.masterSkill =  [masterSkill]
      }
    }
  }

  private getTMR(unit, tmrId) {
    if (tmrId) {
      let tmr = {
        names: {},
        stats: {},
        type: this.jobEquip[this[this.version].equipments[tmrId].cat[0]],
        dataId: tmrId,
        skills: [],
        image: this[this.version].equipments[tmrId].asset.toLowerCase()
      }

      this.getNames(tmr, "equipment")

      Object.keys(this[this.version].equipments[tmrId].status[0]).forEach(stat => {
        tmr.stats[this.stats.unit[stat]] = this[this.version].equipments[tmrId].status[0][stat]
      })

      let lastSkillId = [];
      for (let i = 1; i <= 5; i++) {
        if (this[this.version].equipments[tmrId]["skl" + i]) {
          for (let j = 0; j < this[this.version].equipments[tmrId]["skl" + i].length; j++) {
            if (lastSkillId[j] !== this[this.version].equipments[tmrId]["skl" + i][j]) {
              let skill = {
                dataId: this[this.version].equipments[tmrId]["skl" + i][j],
                names: {},
                effects: [],
                type: this.slots[this[this.version].skills[this[this.version].equipments[tmrId]["skl" + i][j]].s_buffs ? 3 : 1]
              }
              this.updateSkill(unit, skill, this[this.version].equipments[tmrId]["skl" + i][j]);
              tmr.skills.push(skill)
              lastSkillId[j] = this[this.version].equipments[tmrId]["skl" + i][j]
            }
          }
        }
      }

      unit.tmr = tmr
    }
  }

  private addEsper(esper) {
    let dataId = esper.iname;
    this[this.version].wotvEspers[dataId] = {
      dataId: dataId,
      names: {},
      rarity: this.rarity[esper.rare],
      skills: [],
      stats: {},
      SPs : [],
      element: this.elements[esper.elem[0]],
      image: esper.charaId.toLowerCase(),
      board: {
        nodes: {},
        lines: []
      }
    };

    this[this.version].wotvEspers[dataId].skills = [
      this.addSkill(this[this.version].wotvEspers[dataId], {slot: 1, value: esper.atkskl})
    ]

    this.getNames(this[this.version].wotvEspers[dataId], 'unit');

    this.getEsperStats(esper, 'esper')
    this.getEspersSkillsAndBuffs(this[this.version].wotvEspers[dataId]);
    this.getEspersSPs(this[this.version].wotvEspers[dataId], esper.nb_lv_tbl);
  }

  private getEsperStats(esper, type) {
    let maxUnit = esper;
    while (maxUnit.nb_awake_id) {
      maxUnit = this[this.version].units[maxUnit.nb_awake_id[0]]
    }

    Object.keys(this.stats[type]).forEach(stat => {
      this[this.version].wotvEspers[esper.iname].stats[this.stats[type][stat]] = [
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
    if (this[this.version].espersBoards[esper.dataId]) {
      this[this.version].espersBoards[esper.dataId].panels.forEach(item => {
        esper.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: "buff",
          skill: this.addSkill(esper, item)
        }
      });

      this[this.version].espersBoards[esper.dataId].lines.forEach(line => {
        esper.board.lines.push(line.line_id)
      })
    }
  }

  private addWeather(unit, skill, weatherId) {
    this[this.version].weathers[weatherId].buffs.forEach(buff => {
      let weatherFinished = false;
      let j = 1;
      while (!weatherFinished) {
        if (buff["buff" + j]) {
          let finished = false;
          let i = 1;
          while (!finished) {
            if (this[this.version].buffs[buff["buff" + j]]["type" + i]) {

              if (!this.buffTypes[this[this.version].buffs[buff["buff" + j]]["type" + i]]) {
                console.log("@@@@@ " + unit.names.en + " -- EFFECT : " + this[this.version].buffs[buff["buff" + j]]["type" + i])
              }

              let type = this.buffTypes[this[this.version].buffs[buff["buff" + j]]["type" + i]]
              if (this.statsAtkRes.indexOf(type) !== -1) {
                type = type + "_" + (this.calcType[this[this.version].buffs[buff["buff" + j]]["calc" + i]] == "resistance" ? "RES" : "ATK")
              }

              skill.effects.push({
                side: buff.side === 1 ? "TEAM" : "ENNEMIES",
                type: type,
                minValue: this[this.version].buffs[buff["buff" + j]]["val" + i],
                maxValue: this[this.version].buffs[buff["buff" + j]]["val" + i + "1"],
                calcType: this.calcType[this[this.version].buffs[buff["buff" + j]]["calc" + i]] ? this.calcType[this[this.version].buffs[buff["buff" + j]]["calc" + i]] : "unknow",
                turn: this[this.version].buffs[buff["buff" + j]].turn
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

      this[this.version].espersTbl[tblId]["awake" + awake].forEach(SP => {
        esper.SPs[awake - 1].push(SP.sp)
      })
    }
  }

  private addEquipment(equipment) {
    let dataId = equipment.iname;
    let rType = equipment.rtype !=="AF_LOT_50" && equipment.rtype !=="AF_LOT_TRUST" ? equipment.rtype : dataId;

    if (this.names.en.equipment[dataId] && equipment.type !== -1) {
      if (!this[this.version].wotvEquipments[rType]) {
        this[this.version].wotvEquipments[rType] = {
          names: {},
          slug: this.slug.slugify(this.names.en.equipment[dataId]),
          stats: {},
          type: this.jobEquip[this[this.version].equipments[dataId].cat[0]],
          dataId: dataId,
          grows: {},
          skills: [],
          rarity: this.rarity[equipment.rare],
          image: this[this.version].equipments[dataId].asset.toLowerCase()
        }

        this.getNames(this[this.version].wotvEquipments[rType], "equipment")

        if (equipment.trust) {
          let unitId = null;
          let i = 0;
          let unitIds = Object.keys(this[this.version].wotvUnits);

          while(!unitId && i < unitIds.length) {
            if (this[this.version].wotvUnits[unitIds[i]].tmr.dataId === dataId) {
              unitId = unitIds[i]
            }

            i++;
          }

          this[this.version].wotvEquipments[rType].acquisition = {
            type: "tmr",
            unitId: unitId
          }
        } else if (this[this.version].equipmentRecipes[dataId]) {
          let recipe = this[this.version].equipmentRecipes[dataId].recipe;
          if (this.names.en.itemOther[recipe] != "") {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: {
                en: this.names.en.itemOther[recipe],
                fr: this.names.fr.itemOther[recipe],
              } // @TODO
            }
          }
        }

        if (!this[this.version].wotvEquipments[rType].acquisition) {
          this[this.version].wotvEquipments[rType].acquisition = {
            type: "Unknown"
          }
        }

        if (this[this.version].equipementLots[equipment.rtype]) {
          for (let i = 1; i <= 3; i++) {
            let growId = this[this.version].equipementLots[equipment.rtype].lot[0]["grow" + i]
            if (growId) {
              this[this.version].wotvEquipments[rType].grows[growId] = {
                dataId: growId,
                names: {},
                curve: {}
              }
              this.getNames(this[this.version].wotvEquipments[rType].grows[growId], "equipmentGrow")

              Object.keys(this[this.version].grows[growId].curve[0]).forEach(stat => {
                if (this.stats.unit[stat]) {
                  this[this.version].wotvEquipments[rType].grows[growId].curve[this.stats.unit[stat]] = this[this.version].grows[growId].curve[0][stat]
                }
              })
            }
          }
        }

        Object.keys(this[this.version].equipments[dataId].status[0]).forEach(stat => {
          if (this[this.version].equipments[dataId].status[0][stat] !== 0
            || (this[this.version].equipments[dataId].status[1]
              && typeof(this[this.version].equipments[dataId].status[1][stat]) == "number"
              && this[this.version].equipments[dataId].status[1][stat] !== 0)
          ) {
            this[this.version].wotvEquipments[rType].stats[this.stats.unit[stat]] = {
              min: this[this.version].equipments[dataId].status[0][stat],
              max: this[this.version].equipments[dataId].status[1] ? this[this.version].equipments[dataId].status[1][stat] : this[this.version].equipments[dataId].status[0][stat]
            }
          }
        })
      }

      let lastSkillId = [];
      let skills = [];
      if (this[this.version].equipments[dataId].skl1) {
        for (let j = 0; j < this[this.version].equipments[dataId].skl1.length; j++) {
          if (lastSkillId[j] !== this[this.version].equipments[dataId].skl1[j]) {
            let skill = {
              names: {},
              dataId: this[this.version].equipments[dataId].skl1[j],
              effects: [],
              type: this.slots[this[this.version].skills[this[this.version].equipments[dataId].skl1[j]].s_buffs || this[this.version].skills[this[this.version].equipments[dataId].skl1[j]].type === 6 ? 3 : 1]
            }
            this.updateSkill(this[this.version].wotvEquipments[rType], skill, this[this.version].equipments[dataId].skl1[j]);
            skills.push(skill)
            lastSkillId[j] = this[this.version].equipments[dataId].skl1[j]
          }
        }
      }

      this[this.version].wotvEquipments[rType].skills.push(skills)
    }
  }

  private cleanUnits() {
    let unitToDelete = [];

    Object.keys(this[this.version].wotvUnits).forEach(unitId => {
      if (this[this.version].wotvUnits[unitId].board.lines.length === 0) {
        unitToDelete.push(unitId)
      }
    })

    unitToDelete.forEach(unitId => {
      delete this[this.version].wotvUnits[unitId]
    })
  }
}
