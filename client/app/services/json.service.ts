import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EquipmentService } from './equipment.service'
import { Slug } from 'ng2-slugify';

import { JpTranslateService } from './jptranslate.service'

// Translations
import { default as FR_ArtifactGrow } from   '../../../data/fr/artifactgrow.json';
import { default as FR_ArtifactName } from   '../../../data/fr/artifactname.json';
import { default as FR_BuffName } from       '../../../data/fr/buffname.json';
import { default as FR_ItemOther } from      '../../../data/fr/itemother.json';
import { default as FR_JobName } from        '../../../data/fr/jobname.json';
import { default as FR_SkillName } from      '../../../data/fr/skillname.json';
import { default as FR_UnitName } from       '../../../data/fr/unitname.json';
import { default as FR_VisionCardName } from '../../../data/fr/visioncardname.json';
import { default as FR_ItemName } from       '../../../data/fr/itemname.json';


import { default as JP_ArtifactGrow } from   '../../../data/jp/artifactgrow.json';
import { default as JP_ArtifactName } from   '../../../data/jp/artifactname.json';
import { default as JP_BuffName } from       '../../../data/jp/buffname.json';
import { default as JP_ItemOther } from      '../../../data/jp/itemother.json';
import { default as JP_JobName } from        '../../../data/jp/jobname.json';
import { default as JP_SkillName } from      '../../../data/jp/skillname.json';
import { default as JP_UnitName } from       '../../../data/jp/unitname.json';
import { default as JP_VisionCardName } from '../../../data/jp/visioncardname.json';
import { default as JP_ItemName } from       '../../../data/jp/itemname.json';

import { default as JP_Romaji } from         '../../../data/jp_romaji.json';


import { default as gl_raid_1 } from         '../../../data/raid/gl/raid_ev_06_01_set.json';
import { default as gl_raid_2 } from         '../../../data/raid/gl/raid_ev_06_02_set.json';
import { default as gl_raid_3 } from         '../../../data/raid/gl/raid_ev_06_03_set.json';
import { default as gl_raid_4 } from         '../../../data/raid/gl/raid_ev_06_04_set.json';
import { default as gl_raid_5 } from         '../../../data/raid/gl/raid_ev_07_01_set.json';
import { default as gl_raid_6 } from         '../../../data/raid/gl/raid_ev_07_02_set.json';
import { default as gl_raid_7 } from         '../../../data/raid/gl/raid_ev_07_03_set.json';
import { default as gl_raid_8 } from         '../../../data/raid/gl/raid_ev_07_04_set.json';
import { default as gl_raid_9 } from         '../../../data/raid/gl/raid_ev_08_01_set.json';
import { default as gl_raid_10 } from         '../../../data/raid/gl/raid_ev_08_02_set.json';
import { default as gl_raid_11 } from         '../../../data/raid/gl/raid_ev_08_03_set.json';
import { default as gl_raid_12 } from         '../../../data/raid/gl/raid_ev_09_01_set.json';
import { default as gl_raid_13 } from         '../../../data/raid/gl/raid_ev_09_02_set.json';
import { default as gl_raid_14 } from         '../../../data/raid/gl/raid_ev_09_03_set.json';
import { default as gl_raid_15 } from         '../../../data/raid/gl/raid_ev_09_04_set.json';
import { default as gl_raid_16 } from         '../../../data/raid/gl/raid_ev_09_05_set.json';
import { default as gl_raid_17 } from         '../../../data/raid/gl/raid_ev_09_06_set.json';
import { default as gl_raid_18 } from         '../../../data/raid/gl/raid_ev_10_01_set.json';
import { default as gl_raid_19 } from         '../../../data/raid/gl/raid_ev_10_02_set.json';
import { default as gl_raid_20 } from         '../../../data/raid/gl/raid_ev_10_03_set.json';
import { default as gl_raid_21 } from         '../../../data/raid/gl/raid_ev_10_04_set.json';
import { default as gl_raid_22 } from         '../../../data/raid/gl/raid_ev_10_05_set.json';
import { default as gl_raid_23 } from         '../../../data/raid/gl/raid_ev_10_06_set.json';
import { default as gl_raid_24 } from         '../../../data/raid/gl/raid_ff14_01_set.json';
import { default as gl_raid_25 } from         '../../../data/raid/gl/raid_ff14_2_01_set.json';
import { default as gl_raid_26 } from         '../../../data/raid/gl/raid_ff14_2_02_set.json';
import { default as gl_raid_27 } from         '../../../data/raid/gl/raid_ff14_2_03_set.json';
import { default as gl_raid_28 } from         '../../../data/raid/gl/raid_ff14_02_set.json';
import { default as gl_raid_29 } from         '../../../data/raid/gl/raid_ff14_03_set.json';
import { default as gl_raid_30 } from         '../../../data/raid/gl/raid_ff14_04_set.json';
import { default as gl_raid_31 } from         '../../../data/raid/gl/raid_ff14_05_set.json';
import { default as gl_raid_32 } from         '../../../data/raid/gl/raid_ignt_01_set.json';
import { default as gl_raid_33 } from         '../../../data/raid/gl/raid_ignt_02_set.json';
import { default as gl_raid_34 } from         '../../../data/raid/gl/raid_ignt_03_set.json';
import { default as gl_raid_35 } from         '../../../data/raid/gl/raid_ignt01_01_set.json';
import { default as gl_raid_36 } from         '../../../data/raid/gl/raid_ignt01_02_set.json';
import { default as gl_raid_37 } from         '../../../data/raid/gl/raid_ignt01_03_set.json';



import { default as jp_raid_1 } from         '../../../data/raid/jp/raid_ev_06_01_set.json';
import { default as jp_raid_2 } from         '../../../data/raid/jp/raid_ev_06_02_set.json';
import { default as jp_raid_3 } from         '../../../data/raid/jp/raid_ev_06_03_set.json';
import { default as jp_raid_4 } from         '../../../data/raid/jp/raid_ev_06_04_set.json';
import { default as jp_raid_5 } from         '../../../data/raid/jp/raid_ev_07_01_set.json';
import { default as jp_raid_6 } from         '../../../data/raid/jp/raid_ev_07_02_set.json';
import { default as jp_raid_7 } from         '../../../data/raid/jp/raid_ev_07_03_set.json';
import { default as jp_raid_8 } from         '../../../data/raid/jp/raid_ev_07_04_set.json';
import { default as jp_raid_9 } from         '../../../data/raid/gl/raid_ev_08_01_set.json';
import { default as jp_raid_10 } from         '../../../data/raid/gl/raid_ev_08_02_set.json';
import { default as jp_raid_11 } from         '../../../data/raid/gl/raid_ev_08_03_set.json';
import { default as jp_raid_12 } from         '../../../data/raid/gl/raid_ev_09_01_set.json';
import { default as jp_raid_13 } from         '../../../data/raid/gl/raid_ev_09_02_set.json';
import { default as jp_raid_14 } from         '../../../data/raid/gl/raid_ev_09_03_set.json';
import { default as jp_raid_15 } from         '../../../data/raid/gl/raid_ev_09_04_set.json';
import { default as jp_raid_16 } from         '../../../data/raid/gl/raid_ev_09_05_set.json';
import { default as jp_raid_17 } from         '../../../data/raid/gl/raid_ev_09_06_set.json';
import { default as jp_raid_18 } from         '../../../data/raid/gl/raid_ev_10_01_set.json';
import { default as jp_raid_19 } from         '../../../data/raid/gl/raid_ev_10_02_set.json';
import { default as jp_raid_20 } from         '../../../data/raid/gl/raid_ev_10_03_set.json';
import { default as jp_raid_21 } from         '../../../data/raid/gl/raid_ev_10_04_set.json';
import { default as jp_raid_22 } from         '../../../data/raid/gl/raid_ev_10_05_set.json';
import { default as jp_raid_23 } from         '../../../data/raid/gl/raid_ev_10_06_set.json';

@Injectable()
export class JsonService {
  slug = new Slug('default');
  version = null

  gl = {
    units: {},
    unitModels: {},
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
    EquipmentCond: {},
    wotvUnits: {},
    wotvVisionCards: {},
    wotvEspers: {},
    wotvEquipments: {},
    wotvJobs: {},
    wotvItems: {},
    wotvMasterRanks: {},
    raid: {},
    raidBoss: {},
    raidMaps: {},
    wotvRaids: {},
    equipmentAwakes: {},
    items: {},
    cardConditions: {},
    masterRanks: {},
    masterRanksEffects: {},
  }

  jp = {
    units: {},
    unitModels: {},
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
    EquipmentCond: {},
    wotvUnits: {},
    wotvVisionCards: {},
    wotvEspers: {},
    wotvEquipments: {},
    wotvJobs: {},
    wotvItems: {},
    wotvMasterRanks: {},
    raid: {},
    raidBoss: {},
    raidMaps: {},
    wotvRaids: {},
    equipmentAwakes: {},
    items: {},
    cardConditions: {},
    masterRanks: {},
    masterRanksEffects: {},
  }

  jpRomaji = {}

  names = {
    en : {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {}
    },
    fr: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {}
    },
    jp: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {}
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

  births = [
    "",
    "Unknown",
    "Leonis",
    "Hourn",
    "Fenice",
    "Wezett",
    "CrystalFaith",
    "Allyare",
    "Rundall",
    "Cyga",
    "Guren",
    "Owis",
    "Hyndra",
    "FFBE",
    "FF1",
    "FF2",
    "FF3",
    "FF4",
    "FF5",
    "FF6",
    "FF7",
    "FF8",
    "FF9",
    "FF10",
    "FF11",
    "FF12",
    "FF13",
    "FF14",
    "FF15",
    "FFT",
  ]

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
    82: "TP_AUTO_RESTORE",
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
    104: "RERAISE",
    105: "PROTECT",
    106: "SHELL",
    110: "FLOAT",
    112: "QUICKEN",
    113: "IGNORE_FATAL",
    114: "PHYSIC_EVADE",
    115: "MAGIC_EVADE",
    116: "CRITIC_GUARENTED",
    117: "CRITIC_GUARENTED",
    119: "KILLER",
    120: "KILLER",
    121: "KILLER",
    122: "KILLER",
    123: "IMBUE",
    124: "IMMUNE_CT_CHANGE",
    126: "ON_PHYSIC_ATTACK",
    130: "ON_MAGIC_ATTACK",
    134: "KILLER",
    140: "ALL_AILMENTS",
    142: "ALL_DEBUFFS",
    144: "IMBUE",
    148: "GRADUAL_PETRIFY",
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
    183: "ACTIVATION_TIME",
    190: "ACQUIRED_AP",
    194: "ACQUIRED_JP",
    191: "EVOCATION_GAUGE_BOOST",
    192: "BRAVERY",
    193: "FAITH",
    200: "DEBUFF_RES",
    201: "MAX_HP_DOWN_RES",
    202: "ATK_DEBUFF_RES",
    203: "DEF_DEBUFF_RES",
    204: "MAG_DEBUFF_RES",
    205: "SPR_DEBUFF_RES",
    207: "AGI_DEBUFF_RES",
    300: "BUFFS_DURATION",
    301: "DEBUFFS_DURATION",
    310: "ATTACK_RES",
    311: "AOE_RES",
    312: "MAX_DAMAGE",
    313: "EVOCATION_MAGIC",
    314: "DEFENSE_PENETRATION",
    316: "AP_CONSUMPTION",
    319: "SPIRIT_PENETRATION",
    321: "RES_SLASH_ATK_PENETRATION",
    323: "RES_PIERCE_ATK_PENETRATION",
    325: "RES_STRIKE_ATK_PENETRATION",
    327: "RES_MISSILE_ATK_PENETRATION",
    329: "RES_MAGIC_ATK_PENETRATION",
    347: "HEAL_POWER"
  }
  species = [
    '',
    'human',
    'netherBeast',
    'beast',
    'demon',
    'dragon',
    'plant',
    'bird',
    'insect',
    'aquatic',
    'machine',
    'fairy',
    'undead',
    'stone',
    'metal'
  ]

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
    102: "ESPER",
    103: "BEAST",
    104: "DEMON",
    105: "DRAGON",
    106: "PLANT",
    107: "AVIAN",
    108: "INSECT",
    109: "AQUATIC",
    110: "MACHINA",
    111: "FAIRY",
    112: "REAPER",
    113: "STONE",
    114: "METAL",
    204: "FENNES",
    301: "FLOAT",
    401: "MALES"
  }

  conditions = {
    2: "MALE",
    11: "FIRE_ELEMENT",
    12: "ICE_ELEMENT",
    13: "WIND_ELEMENT",
    14: "EARTH_ELEMENT",
    15: "LIGHTNING_ELEMENT",
    16: "WATER_ELEMENT",
    17: "LIGHT_ELEMENT",
    18: "DARK_ELEMENT",
    19: "BEHIND"
  }

  strengthType = {
    1: "DEAD_UNITS",
    50: "UNIT_ACTIONS",
    51: "COUNT_DAMAGE_RECEIVED",
    53: "UNIT_LEVEL",
    72: "HEIGHT",
    73: "TARGET_LEVEL",
    99: "MODIFY_ABSORB"
  }

  strengthFormulaCondition = {
    0: "COUNT",
    1: "CURVE",
    22: "RATIO",
    50: "PERCENT"
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

  targetTypes = {
    0:  "self",
    1:  "target",
    2:  "allyNotSelf",
    10: "selfSide",
    11: "ennemySide",
    12: "all",
    20: "deadAlly",
    21: "deadEnnemy",
    22: "deadAll",
    90: "panel"
  }

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
    "ACC",
    "GLOVE"
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
    22: "decrease",
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
    "party",
    "ex_buff"
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
    "GRADUAL_PETRIFY",
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


  constructor(
    private http: HttpClient,
    private equipmentService: EquipmentService,
    private jpTranslateService: JpTranslateService
  ) {}

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

  private GLUnitModels() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/UnitModel.json').toPromise();
  }

  private GLArtifactEquipCond() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/ArtifactEquipCondition.json').toPromise();
  }

  private GLRaid() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Raid.json').toPromise();
  }

  private GLRaidBoss() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/RaidBoss.json').toPromise();
  }

  private GLArtifactAwake() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/ArtifactAwake.json').toPromise();
  }

  private GLItem() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Item.json').toPromise();
  }

  private GLCardCond() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/VisionCardLimitedCondition.json').toPromise()
      .then(data => {
        return data
      }).catch(function(error) {
        return {items:[]}
      });
  }

  private GLMasterRank() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/MasterRank.json').toPromise()
      .then(data => {
        return data
      }).catch(function(error) {
        return {items:[]}
      });
  }

  private GLMasterRankEffect() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/MasterRankEffect.json').toPromise()
      .then(data => {
        return data
      }).catch(function(error) {
        return {items:[]}
      });
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

  private JPUnitModels() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/UnitModel.json').toPromise();
  }

  private JPArtifactEquipCond() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/ArtifactEquipCondition.json').toPromise();
  }

  private JPRaid() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Raid.json').toPromise();
  }

  private JPRaidBoss() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/RaidBoss.json').toPromise();
  }

  private JPArtifactAwake() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/ArtifactAwake.json').toPromise();
  }

  private JPItem() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Item.json').toPromise();
  }

  private JPCardCond() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/VisionCardLimitedCondition.json').toPromise();
  }

  private JPMasterRank() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/MasterRank.json').toPromise();
  }

  private JPMasterRankEffect() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/MasterRankEffect.json').toPromise();
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

  private TranslateItemName() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/ItemName.json').toPromise();
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

      this.GLUnitModels(),
      this.JPUnitModels(),

      this.GLArtifactEquipCond(),
      this.JPArtifactEquipCond(),

      this.GLRaid(),
      this.GLRaidBoss(),
      this.JPRaid(),
      this.JPRaidBoss(),

      this.GLArtifactAwake(),
      this.JPArtifactAwake(),

      this.TranslateItemName(),

      this.GLItem(),
      this.JPItem(),

      this.GLCardCond(),
      this.JPCardCond(),

      this.GLMasterRank(),
      this.GLMasterRankEffect(),
      this.JPMasterRank(),
      this.JPMasterRankEffect(),
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
      this.gl.unitModels = this.formatJson(responses[34]);
      this.gl.EquipmentCond = this.formatJson(responses[36]);
      this.gl.raid = this.formatJson(responses[38]);
      this.gl.raidBoss = this.formatJson(responses[39]);
      this.gl.equipmentAwakes = this.formatJson(responses[42]);
      this.gl.items = this.formatJson(responses[45]);
      this.gl.cardConditions = this.formatJson(responses[47]);
      this.gl.masterRanks = this.formatJson(responses[49]);
      this.gl.masterRanksEffects = this.formatJson(responses[50]);

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
      this.jp.unitModels = this.formatJson(responses[35]);
      this.jp.EquipmentCond = this.formatJson(responses[37]);
      this.jp.raid = this.formatJson(responses[40]);
      this.jp.raidBoss = this.formatJson(responses[41]);
      this.jp.equipmentAwakes = this.formatJson(responses[43]);
      this.jp.items = this.formatJson(responses[46]);
      this.jp.cardConditions = this.formatJson(responses[48]);
      this.jp.masterRanks = this.formatJson(responses[51]);
      this.jp.masterRanksEffects = this.formatJson(responses[52]);

      this.names.en.unit = this.formatNames(responses[26]);
      this.names.en.job = this.formatNames(responses[27]);
      this.names.en.skill = this.formatNames(responses[28]);
      this.names.en.buff = this.formatNames(responses[29]);
      this.names.en.equipment = this.formatNames(responses[30]);
      this.names.en.visionCard = this.formatNames(responses[31]);
      this.names.en.itemOther = this.formatNames(responses[32]);
      this.names.en.equipmentGrow = this.formatNames(responses[33]);
      this.names.en.item = this.formatNames(responses[44]);

      this.names.fr.unit = this.formatNames(FR_UnitName)
      this.names.fr.skill = this.formatNames(FR_SkillName)
      this.names.fr.job = this.formatNames(FR_JobName)
      this.names.fr.buff = this.formatNames(FR_BuffName)
      this.names.fr.equipment = this.formatNames(FR_ArtifactName)
      this.names.fr.visionCard = this.formatNames(FR_VisionCardName)
      this.names.fr.itemOther = this.formatNames(FR_ItemOther)
      this.names.fr.equipmentGrow = this.formatNames(FR_ArtifactGrow)
      this.names.fr.item = this.formatNames(FR_ItemName)

      this.names.jp.unit = this.formatNames(JP_UnitName)
      this.names.jp.skill = this.formatNames(JP_SkillName)
      this.names.jp.job = this.formatNames(JP_JobName)
      this.names.jp.buff = this.formatNames(JP_BuffName)
      this.names.jp.equipment = this.formatNames(JP_ArtifactName)
      this.names.jp.visionCard = this.formatNames(JP_VisionCardName)
      this.names.jp.itemOther = this.formatNames(JP_ItemOther)
      this.names.jp.equipmentGrow = this.formatNames(JP_ArtifactGrow)
      this.names.jp.item = this.formatNames(JP_ItemName)

      this.jpRomaji = JP_Romaji

      this.formatJsons();

      return {
        gl: {
          units: this.gl.wotvUnits,
          visionCards: this.gl.wotvVisionCards,
          espers: this.gl.wotvEspers,
          equipments: this.gl.wotvEquipments,
          jobs: this.gl.wotvJobs,
          raids: this.gl.wotvRaids,
          items: this.gl.wotvItems,
          masterRanks: this.gl.wotvMasterRanks,
        },
        jp: {
          units: this.jp.wotvUnits,
          visionCards: this.jp.wotvVisionCards,
          espers: this.jp.wotvEspers,
          equipments: this.jp.wotvEquipments,
          jobs: this.jp.wotvJobs,
          raids: this.jp.wotvRaids,
          items: this.jp.wotvItems,
          masterRanks: this.jp.wotvMasterRanks,
        },
        translate : {
          jpRomaji : this.jpRomaji
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

        if (this[this.version].units[unitId].type === 1 && unitId != "UN_FF10_S_VLFR") {
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

      this.formatRaid();

      Object.keys(this[this.version].items).forEach(itemId => {
        this.addItem(this[this.version].items[itemId]);
      });

      this.formatMasterRanks();
    }
  }

  private addJob(job) {
    let dataId = job.iname;
    this[this.version].wotvJobs[dataId] = {
      dataId: dataId,
      names: {},
      statsModifiers: [],
      image: job.cc_icon ? job.cc_icon.toLowerCase() : job.mdl.toLowerCase(),
      subRate: job.sub_rate,
      equipments: {
        weapons: [],
        armors: []
      }
    };

    this.getNames(this[this.version].wotvJobs[dataId], 'job', false);

    if (this.version == "gl") {
      if (this.names.en['job'][dataId] || this.names.en['job'][dataId + "_FIRE"]) {
        this[this.version].wotvJobs[dataId].names.en = this.names.en['job'][dataId] ? this.names.en['job'][dataId] : this.names.en['job'][dataId + "_FIRE"]
        this[this.version].wotvJobs[dataId].names.fr = this.names.fr['job'][dataId] ? this.names.fr['job'][dataId] : this.names.fr['job'][dataId + "_FIRE"]
      } else {
        this[this.version].wotvJobs[dataId].names.en = dataId;
        this[this.version].wotvJobs[dataId].names.fr = dataId;
      }
    } else {
      if (this.names.en['job'][dataId] || this.names.en['job'][dataId + "_FIRE"]) {
        this[this.version].wotvJobs[dataId].names.en = this.names.en['job'][dataId] ? this.names.en['job'][dataId] : this.names.en['job'][dataId + "_FIRE"]
      } else if (this.names.jp['job'][dataId] || this.names.jp['job'][dataId + "_FIRE"]) {
        this[this.version].wotvJobs[dataId].names.en = this.names.jp['job'][dataId] ? this.names.jp['job'][dataId] : this.names.jp['job'][dataId + "_FIRE"]
      } else {
        this[this.version].wotvJobs[dataId].names.en = dataId;
      }
    }

    job.equips.forEach(equip => {
      if (this.equipmentService.isWeapon(this.jobEquip[equip])) {
        this[this.version].wotvJobs[dataId].equipments.weapons.push(this.jobEquip[equip])
      } else {
        this[this.version].wotvJobs[dataId].equipments.armors.push(this.jobEquip[equip])
      }
    });

    let ranks = job.ranks
    if (ranks.length < 10 && job.origin && this[this.version].jobs[job.origin]) {
      ranks = this[this.version].jobs[job.origin].ranks
    }

    ranks.forEach(rank => {
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
      exJobs: [],
      stats: {},
      cost: unit.cost,
      element: this.elements[unit.elem[0]],
      image: unit.charaId.toLowerCase(),
      board: {
        nodes: {},
        lines: []
      },
      replacedSkills : {}
    };

    if (unit.ccsets) {
      unit.ccsets.forEach(exJob => {
        this[this.version].wotvUnits[dataId].exJobs.push(exJob.m)
      })
    }

    this.getUnitImage(this[this.version].wotvUnits[dataId])
    this.getNames(this[this.version].wotvUnits[dataId], 'unit');

    this.getStats(this[this.version].wotvUnits[dataId], unit.status, 'unit')
    this.getMoveJumpUnit(this[this.version].wotvUnits[dataId])
    this.getLB(this[this.version].wotvUnits[dataId], unit.limit)
    this.getAttackSkill(this[this.version].wotvUnits[dataId], unit.atkskl)
    this.getMasterSkill(this[this.version].wotvUnits[dataId], unit.mstskl)
    this.getTMR(this[this.version].wotvUnits[dataId], unit.trust)
    this.getSkillsAndBuffs(this[this.version].wotvUnits[dataId])
  }

  private getUnitImage(unit) {
    if (this[this.version].unitModels[unit.dataId] && this[this.version].unitModels[unit.dataId].img) {
      unit.image = this[this.version].unitModels[unit.dataId].img.toLowerCase()
    }
  }

  private addVisionCard(visionCard) {
    let dataId = visionCard.iname;

    if (visionCard.type === 0) {
      this[this.version].wotvVisionCards[dataId] = {
        dataId: dataId,
        names: {},
        cost: visionCard.cost,
        rarity: this.rarity[visionCard.rare],
        stats: {},
        image: visionCard.icon.toLowerCase()
      };

      this.getNames(this[this.version].wotvVisionCards[dataId], 'visionCard');
      this.getStats(this[this.version].wotvVisionCards[dataId], visionCard.status, 'visionCard')

      this.getVisionCardSkillsAndBuffs(this[this.version].wotvVisionCards[dataId], visionCard);
    }
  }

  private getNames(item, type, getSlug = true) {
    let id = item.dataId

    if (this.version == "gl") {
      if (this.names.en[type][id]) {
        item.names.en = this.names.en[type][id]
        item.names.fr = this.names.fr[type][id]
      } else {
        item.names.en = id;
        item.names.fr = id;
      }

      if (getSlug) {
        item.slug = this.slug.slugify(item.names.en)
      }
    } else {
      let slug = null
      let slugJP = false

      if (type == "unit" && this.names.en[type][id]
        || type == "visionCard" && this.names.en[type][id]
        || type == "equipment" && this.names.en[type][id]) {
        item.names.en = this.names.jp[type][id] + " - " + this.names.en[type][id]
        slug = this.names.en[type][id]
      } else if (type == "job") {
        if (this.names.en[type][id]) {
          item.names.en = this.names.en[type][id]
          slug = this.names.en[type][id]
        } else {
          item.names.en = this.names.jp[type][id]
          slug = item.names.en
          slugJP = true
        }
      } else if (this.names.jp[type][id]) {
        item.names.en = this.names.jp[type][id]
        slug = item.names.en
        slugJP = true
      } else {
        item.names.en = id;
        slug = item.names.en
      }

      if (getSlug) {
        if (slugJP) {
          if (!this.jpRomaji[slug]) {
            this.jpTranslateService.convert(slug).then(translatedText => {
              this.jpRomaji[slug] = translatedText
              item.slug = this.slug.slugify(translatedText)
              console.log('New JP Translate ==> "' + slug + '": "' + translatedText + '",')
            })
          } else {
            item.slug = this.slug.slugify(this.jpRomaji[slug])
          }
        } else {
          item.slug = this.slug.slugify(slug)
        }
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

    Object.keys(unit.replacedSkills).forEach(replace => {
      unit.replacedSkills[replace].forEach(upgrade => {
        let previousSkillType = "skill"
        Object.keys(unit.board.nodes).forEach(nodeId => {
          if (unit.board.nodes[nodeId].dataId == upgrade.oldSkill) {
            previousSkillType = unit.board.nodes[nodeId].type
          }
        })

        let fakePanelSkill = {
          value: upgrade.newSkill,
          slot: this.slots.indexOf(previousSkillType)
        }

        upgrade.newSkill = this.addSkill(unit, fakePanelSkill)
      })
    })
  }

  private getVisionCardSkillsAndBuffs(visionCard, rawVisionCard) {
    // party GL
    if (rawVisionCard.card_skill) {
      visionCard.partyBuffs = [{
        classic: this.addSkill(visionCard, {slot: 0, value: rawVisionCard.card_skill}),
        awake: rawVisionCard.add_card_skill_buff_awake ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_card_skill_buff_awake}) : null,
        lvmax: rawVisionCard.add_card_skill_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_card_skill_buff_lvmax}) : null
      }]
    }

    // party JP
    if (rawVisionCard.card_buffs) {
      visionCard.partyBuffs = []
      rawVisionCard.card_buffs.forEach(dataBuff => {
        let buff = {
          classic: dataBuff.card_skill ? this.addSkill(visionCard, {slot: 0, value: dataBuff.card_skill}) : null,
          awake: dataBuff.add_card_skill_buff_awake ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_card_skill_buff_awake}) : null,
          lvmax: dataBuff.add_card_skill_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_card_skill_buff_lvmax}) : null,
          cond : dataBuff.cnds_iname ? this.addCardCond(dataBuff.cnds_iname) : []
        }

        visionCard.partyBuffs.push(buff)
      })
    }

    // self GL
    if (rawVisionCard.self_buff) {
      visionCard.unitBuffs = [{
        classic: this.addSkill(visionCard, {slot: 0, value: rawVisionCard.self_buff}),
        awake: rawVisionCard.add_self_buff_awake ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_self_buff_awake}) : null,
        lvmax: rawVisionCard.add_self_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_self_buff_lvmax}) : null
      }]
    }

    // self JP
    if (rawVisionCard.self_buffs) {
      visionCard.unitBuffs = []
      rawVisionCard.self_buffs.forEach(dataBuff => {
        let buff = {
          classic: dataBuff.self_buff ? this.addSkill(visionCard, {slot: 0, value: dataBuff.self_buff}) : null,
          awake: dataBuff.add_self_buff_awake ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_self_buff_awake}) : null,
          lvmax: dataBuff.add_self_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_self_buff_lvmax}) : null,
          cond : dataBuff.buff_cond ? this.addCardCond(dataBuff.buff_cond) : []
        }

        visionCard.unitBuffs.push(buff)
      })
    }
  }

  private addCardCond(cond) {
    let cardCond = this[this.version].cardConditions[cond]

    if (cardCond) {
      let formattedCond = []

      if (cardCond.births) {
        let newCond = {
          type: "birth",
          items: []
        }

        cardCond.births.forEach(birth => {
          newCond.items.push(this.births[birth])
        })

        formattedCond.push(newCond)
      }

      if (cardCond.elem) {
        let newCond = {
          type: "elem",
          items: []
        }

        cardCond.elem.forEach(elem => {
          newCond.items.push(this.elements[elem])
        })

        formattedCond.push(newCond)
      }

      if (cardCond.mainjobs) {
        let newCond = {
          type: "job",
          items: []
        }

        cardCond.mainjobs.forEach(job => {
          newCond.items.push(job)
        })

        formattedCond.push(newCond)
      }

      if (cardCond.units) {
        let newCond = {
          type: "unit",
          items: []
        }

        cardCond.units.forEach(unit => {
          newCond.items.push(unit)
        })

        formattedCond.push(newCond)
      }

      if (formattedCond.length == 0) {
        console.log("7 @@@@@ " + cond)
        return null
      }

      return formattedCond
    } else {
      return null
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
      mainSkill: this[this.version].skills[panelSkill.value] && this[this.version].skills[panelSkill.value].slot == 1,
      increaseUnitLevel: panelSkill.ival
    };

    if (panelSkill.ival) {
      skill.effects.push({
        type: "INCREASE_UNIT_LEVEL",
        value: panelSkill.ival,
        calcType: "fixe"
      });
    }

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
      eff_w: null,
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
      stl_val1 : null,
      names: null,
      atk_rev: null,
      grow: null,
      replace: null,
      strength: null,
      ctave: null,
      crt_hit: null,
      kback: null,
      target: null,
      hp_bonus: null,
      invtag: null,
      acbst: null,
      bbrk: null,

      // not used
      timing: null,
      atk_base: null,
      elem_pri: null,
      lvup_cost_rate: null,
      motnm: null,
      effnm: null,
      collaboType: null,
      cam_dir: null,
      gdupli: null,
      atk_formula: null,
      atk_formula_t1: null,
      atk_formula_t2: null,
      atk_formula_t3: null,
      selfsel: null,
      hp_cost_rate: null,
      def_wep: null,
      ischa: null,
      ct_type: null,
      ct_lock: null,
      exp: null,
      dupli: null,
      scn: null,
      force_eq: null,
      range_bns: null,
      def_shi: null,
      range_buff: null,

      // managed not here
      iname: null,
      slot: null,
      type: null,
      movie: null,
      wth: null
    };
    let managedData = Object.keys(dataSkill)

    if (skill.type == "buff") {
      dataSkill.s_buffs = [skillId]
    } else if (skill.type == "MR") {
      dataSkill.s_buffs = skill.buffIds
    } else {
      dataSkill = this[this.version].skills[skillId]
      skill.names = {}
      this.getNames(skill, 'skill', false)
      dataSkill.names = skill.names

      Object.keys(dataSkill).forEach(key => {
        if (managedData.indexOf(key) == -1) {
          console.log("NOT MANAGED KEY : " + key)
        }
      })
    }

    if (dataSkill.range_buff && dataSkill.range_buff != 1) {
      console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- range buff != 1")
    }

    if (dataSkill.eff_w && dataSkill.eff_w != 1 && dataSkill.eff_w != 2) {
      console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- eff_w != 1")
    }

    if (Number.isInteger(dataSkill.target)) {
      if (!this.targetTypes[dataSkill.target]) {
        console.log("@@@@@ " + unit.names.en + " -- " + skill.names.en + " -- target : " + dataSkill.target)
      }

      skill.target = this.targetTypes[dataSkill.target]
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

    if (dataSkill.bbrk) {
      let type = "BREAK_BARRIER"
      switch (dataSkill.bbrk) {
        case 1:
          type = type + "_GENERAL"
          break;
        case 2:
          type = type + "_PHYSIC"
          break;
        case 3:
          type = type + "_MAGIC"
          break;
        default:
          console.log("6 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- barrier : " + dataSkill.bbrk)
          break;
      }

      skill.effects.push({
        type: type,
        target: this.targetTypes[dataSkill.target]
      })
    }

    if (dataSkill.acbst) {
      skill.effects.push({
        type: "STOP_CHAIN_INCREASE_DAMAGE",
        value: dataSkill.acbst
      });
    }

    skill.count = dataSkill.count

    if (skill.grow) {
      skill.maxLevel = this[this.version].grows[skill.grow].curve[0].lv
    } else {
      skill.maxLevel = dataSkill.cap
    }

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
        h: dataSkill.eff_h,
        w: dataSkill.eff_w
      }
    }

    if (dataSkill.ct_spd) {
      skill.time = {
        minValue: dataSkill.ct_spd,
        maxValue: dataSkill.ct_spd1
      }
    }

    skill.hit = dataSkill.hit
    skill.crt_hit = dataSkill.crt_hit
    skill.pierce = dataSkill.pierce
    skill.ctbreak = dataSkill.ctbreak // Cancel ability activation

    if (dataSkill.combo_num) {
      skill.combo = {
        num: dataSkill.combo_num,
        rate: dataSkill.combo_rate
      }
    }

    if (dataSkill.kback) {
      skill.knockback = {
        rate: dataSkill.kback.rate,
        value: dataSkill.kback.val
      }
    }

    if (dataSkill.hp_bonus) {
      skill.increaseDamageOnDecreaseHp = dataSkill.hp_bonus
    }

    if (skill.type === "counter") {
      skill.counter = {
        minValue: dataSkill.eff_rate,
        maxValue: dataSkill.eff_rate1,
        reactDamage: this.reactCounter[dataSkill.react_d_type],
        calcType: "percent",
      }
    }

    if (dataSkill.invtag) {
      dataSkill.invtag.forEach(ignore => {
        if (!this.killers[ignore] || ignore != 301) {
          console.log("1 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KLSP : " + ignore)
        }

        skill.effects.push({
          type: "IGNORE_" + this.killers[ignore],
        });
      });
    }

    if (dataSkill.klsp) {
      dataSkill.klsp.forEach(killer => {
        if (!this.killers[killer]) {
          console.log("1 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- KLSP : " + killer)
        }

        skill.effects.push({
          type: this.killers[killer] + "_KILLER",
          minValue: dataSkill.klspr,
          maxValue: dataSkill.klspr,
          calcType: "unknow"
        });
      });
    }

    if (dataSkill.barrier) {
      let type = dataSkill.eff === "ef_com_guard_02" ? "BARRIER" : "REDUCE_DAMAGE"
      switch (dataSkill.barrier.tar) {
        case 1:
          type = type + "_GENERAL"
          break;
        case 2:
          type = type + "_PHYSIC"
          break;
        case 3:
          type = type + "_MAGIC"
          break;
        default:
          console.log("6 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- barrier : " + dataSkill.barrier.tar)
          break;
      }

      skill.effects.push({
        type: type,
        minValue: dataSkill.barrier.scut,
        maxValue: dataSkill.barrier.ecut,
        calcType: "percent",
        turn: dataSkill.barrier.val,
        turnType: dataSkill.barrier.type !== 3 ? "TURNS" : "COUNT",
        target: this.targetTypes[dataSkill.target]
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

    if (dataSkill.ctave) {
      skill.effects.push({
        type: "AVG_CT",
        target: this.targetTypes[dataSkill.target]
      });
    }

    if (dataSkill.stl_val) {
      skill.effects.push({
        type: "STEAL",
        minValue: dataSkill.stl_val,
        maxValue: dataSkill.stl_val1,
        calcType: "unknow",
        target: this.targetTypes[dataSkill.target]
      });
    }

    if (dataSkill.replace) {
      if (!unit.replacedSkills[skillId]) {
        unit.replacedSkills[skillId] = []
      }

      dataSkill.replace.forEach(change => {
        unit.replacedSkills[skillId].push({
          oldSkill: change.skill_base,
          newSkill: change.skill_after
        })
      })
    }

    if (dataSkill.strength) {
      skill.maths = []

      dataSkill.strength.forEach(strength => {
        if (!this.strengthType[strength.type]) {
          console.log("10 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- STRENGTH TYPE : " + strength.type)
        } else if (!this.strengthFormulaCondition[strength.formula]) {
          console.log("11 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- STRENGTH FORMULA : " + strength.formula)
        } else {
          let math = {
            type: this.strengthType[strength.type],
            formula: this.strengthFormulaCondition[strength.formula],
            condition : strength.val1,
            value: strength.rate1
          }

          skill.maths.push(math)
        }
      })
    }


    if (((typeof(dataSkill.eff_val) == "number" && dataSkill.eff_val != 0)
      || (typeof(dataSkill.eff_val1) == "number" && dataSkill.eff_val1 != 0))
      && dataSkill.eff_type !== 10
    ) {
      skill.damage = {
        minValue: dataSkill.eff_val,
        maxValue: dataSkill.eff_val1,
        type: this.damageTypes[dataSkill.atk_det],
        pool: this.damagePool[dataSkill.eff_dst],
        effType: this.damageEffectType[dataSkill.eff_type]
      }

      if (dataSkill.atk_rev && dataSkill.atk_rev == 1) {
        skill.damage.fixedDamage = true
      }

      if (dataSkill.eff_dst && !this.damagePool[dataSkill.eff_dst]) {
        console.log("2 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- DST : " + dataSkill.eff_dst)
      }

      if (dataSkill.elem) {
        skill.elem = [];
        dataSkill.elem.forEach(elem => {
          skill.elem.push(this.elements[elem])
        });
      }
    }


    if (dataSkill.t_buffs || dataSkill.s_buffs) {
      let alreadyAddedBuffs = []
      let possibleBuffs = ["t_buffs", "s_buffs"]

      possibleBuffs.forEach((dataBuffs, dataBuffsIndex) => {
        if (dataSkill[dataBuffs]) {
          let buffs = JSON.parse(JSON.stringify(dataSkill[dataBuffs]))

          let buffIndex = 0
          let fromImbue = []
          while (buffIndex <= buffs.length - 1) {
            let buff = buffs[buffIndex]
            let finished = false;
            let i = 1;
            let duplicateFinded = false;
            let needToAddKiller = false;

            if (alreadyAddedBuffs.indexOf(buff) == -1) {
              while (!finished && buff) {
                if (this[this.version].buffs[buff]["type" + i]) {
                  if (duplicateFinded && this[this.version].buffs[buff]["type" + i] === 117) {} else {
                    if (!this.buffTypes[this[this.version].buffs[buff]["type" + i]]) {
                      console.log("3 @@@@@ " + unit.names.en + " -- " + skill.names.en + " -- EFFECT : " + this[this.version].buffs[buff]["type" + i])
                    }

                    if (this[this.version].buffs[buff]["id" + i]) {
                      let futurBuffId = this[this.version].buffs[this[this.version].buffs[buff]["id" + i]].iname
                      fromImbue.push(futurBuffId)
                      buffs.push(futurBuffId);
                    }

                    if (this[this.version].buffs[buff]["tag" + i] && !this.killers[this[this.version].buffs[buff]["tag" + i]]) {
                      console.log("4 @@@@@ " + (unit.names ? unit.names.en : unit.dataId) + " -- " + (skill.names ? skill.names.en : skill.dataId) + " -- KILLER : " + this[this.version].buffs[buff]["tag" + i])
                    }

                    let type = this.buffTypes[this[this.version].buffs[buff]["type" + i]]
                    if (this[this.version].buffs[buff]["tag" + i]) {
                      if (type !== "KILLER" && type !== "IMBUE" && type !== "WATER") {
                        skill.effects.push({
                          type: type
                        })
                        alreadyAddedBuffs.push(buff)
                      }

                      type = this.killers[this[this.version].buffs[buff]["tag" + i]] + "_KILLER"

                      if (this.calcType[this[this.version].buffs[buff]["calc" + i]] == "resistance") {
                        type = type + "_RES"
                      }
                    }


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
                            ailments: [],
                            target: dataBuffsIndex == 0 ? skill.target : "self"
                          }
                          skill.effects.push(effect)
                          alreadyAddedBuffs.push(buff)
                        }
                        effect.ailments.push(type)
                      } else {
                        type = type + "_" + (this.calcType[this[this.version].buffs[buff]["calc" + i]] == "resistance" ? "RES" : "ATK")
                      }
                    }

                    if (!nullifyOrDispel && type !== "IMBUE") {
                      let addedBuff = {
                        type: type,
                        minValue: this[this.version].buffs[buff]["val" + i],
                        maxValue: this[this.version].buffs[buff]["val" + i + "1"],
                        calcType: this.calcType[this[this.version].buffs[buff]["calc" + i]] ? this.calcType[this[this.version].buffs[buff]["calc" + i]] : "unknow",
                        rate: this[this.version].buffs[buff].rate,
                        turn: this[this.version].buffs[buff].turn,
                        fromImbue: false,
                        condition: null,
                        increaseMax: false,
                        target: dataBuffsIndex == 0 ? skill.target : "self"
                      };

                      if (fromImbue.indexOf(this[this.version].buffs[buff].iname) !== -1) {
                        addedBuff.fromImbue = true;
                      } else {
                        delete addedBuff.fromImbue
                      }

                      if (this[this.version].buffs[buff].conds) {
                        addedBuff.condition = this.conditions[this[this.version].buffs[buff].conds[0]]
                      } else {
                        delete addedBuff.condition
                      }

                      if (this[this.version].buffs[buff]["calc" + i] == 2) {
                        addedBuff.increaseMax = true
                      } else {
                        delete addedBuff.increaseMax
                      }

                      skill.effects.push(addedBuff)
                      alreadyAddedBuffs.push(buff)
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
            }
            buffIndex++
          }
        }
      })
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

      if (stats[2]) {
        unit.stats[this.stats[type][stat]].ex = stats[2][stat]
      }
    })
  }

  private getMoveJumpUnit(unit) {
    unit.stats.JUMP = {
      "min": this[this.version].jobs[unit.jobs[0]].jump,
      "max": this[this.version].jobs[unit.jobs[0]].jump,
      "ex": this[this.version].jobs[unit.exJobs[0]] ? this[this.version].jobs[unit.exJobs[0]].jump : null
    }

    unit.stats.MOVE = {
      "min": this[this.version].jobs[unit.jobs[0]].move,
      "max": this[this.version].jobs[unit.jobs[0]].move,
      "ex": this[this.version].jobs[unit.exJobs[0]] ? this[this.version].jobs[unit.exJobs[0]].move : null
    }
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

  private getAttackSkill(unit, attackId) {
    if (attackId) {
      let attack = {
        names: {},
        effects: [],
        dataId: attackId,
        damage: {
          minValue: 0,
          maxValue: 0
        },
        elem: []
      };

      let modifiedAttack = false
      if (!this[this.version].skills[attackId].eff_val) {
        this[this.version].skills[attackId].eff_val = 1
        this[this.version].skills[attackId].eff_val1 = 1
        modifiedAttack = true
      }

      this.updateSkill(unit, attack, attackId);

      if (modifiedAttack) {
        attack.damage.minValue = 0
        attack.damage.maxValue = 0
        attack.elem = ["neutral"]
      }

      if (attack.elem.length == 0) {
        attack.elem = ["neutral"]
      }

      unit.attack = attack
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

      this.getNames(tmr, "equipment", false)

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
                type: this.slots[this[this.version].skills[this[this.version].equipments[tmrId]["skl" + i][j]].slot == 1 ? 1 : 3]
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
      cost: esper.cost,
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
    this.getEspersSPs(this[this.version].wotvEspers[dataId], esper, esper.nb_lv_tbl);
  }

  private getEsperStats(esper, type) {
    let maxUnit = esper;
    if (maxUnit.nb_awake_id) {
      maxUnit = this[this.version].units[maxUnit.nb_awake_id[maxUnit.nb_awake_id.length - 1]]
    }

    Object.keys(this.stats[type]).forEach(stat => {
      this[this.version].wotvEspers[esper.iname].stats[this.stats[type][stat]] = [
        {
          min: esper.status[0][stat],
          max: esper.status[1][stat]
        }
      ]

      esper.nb_awake_id.forEach(esperId => {
        this[this.version].wotvEspers[esper.iname].stats[this.stats[type][stat]].push({
          min: this[this.version].units[esperId].status[0][stat],
          max: this[this.version].units[esperId].status[1][stat]
        })
      })
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
    let alreadyAddedBuffs = []

    this[this.version].weathers[weatherId].buffs.forEach(buff => {
      let weatherFinished = false;
      let j = 1;
      while (!weatherFinished) {
        if (buff["buff" + j]) {
          if (alreadyAddedBuffs.indexOf(buff["buff" + j]) == -1) {
            let finished = false;
            let i = 1;
            while (!finished) {
              if (this[this.version].buffs[buff["buff" + j]]["type" + i]) {

                if (!this.buffTypes[this[this.version].buffs[buff["buff" + j]]["type" + i]]) {
                  console.log("5 @@@@@ " + unit.names.en + " -- EFFECT : " + this[this.version].buffs[buff["buff" + j]]["type" + i])
                }

                let type = this.buffTypes[this[this.version].buffs[buff["buff" + j]]["type" + i]]
                if (this.statsAtkRes.indexOf(type) !== -1) {
                  type = type + "_" + (this.calcType[this[this.version].buffs[buff["buff" + j]]["calc" + i]] == "resistance" ? "RES" : "ATK")
                }

                let formattedBuff = {
                  side: buff.side === 1 ? "TEAM" : "ENNEMIES",
                  type: type,
                  minValue: this[this.version].buffs[buff["buff" + j]]["val" + i],
                  maxValue: this[this.version].buffs[buff["buff" + j]]["val" + i + "1"],
                  calcType: this.calcType[this[this.version].buffs[buff["buff" + j]]["calc" + i]] ? this.calcType[this[this.version].buffs[buff["buff" + j]]["calc" + i]] : "unknow",
                  turn: this[this.version].buffs[buff["buff" + j]].turn,
                  dataId: buff["buff" + j]
                }

                if (buff.elem) {
                  // @ts-ignore
                  formattedBuff.elements = []
                  buff.elem.forEach(element => {
                    // @ts-ignore
                    formattedBuff.elements.push(this.elements[element])
                  })
                }

                skill.effects.push(formattedBuff)
                alreadyAddedBuffs.push(buff["buff" + j])

                i++;
              } else {
                finished = true;
              }
            }
          } else {
            if (buff.elem) {
              skill.effects.forEach(effect => {
                if (effect.dataId == buff["buff" + j]) {
                  buff.elem.forEach(element => {
                    if (!effect.elements) {
                      effect.elements = [this.elements[element]]
                    } else if (effect.elements.indexOf(this.elements[element]) == -1) {
                      effect.elements.push(this.elements[element])
                    }
                  })
                }
              })
            }
          }
          j++;
        } else {
          weatherFinished = true;
        }
      }
    });
  }

  private getEspersSPs(esper, dataEsper, tblId) {
    for (let awake = 1; awake <= dataEsper.nb_awake_id.length + 1; awake++) {
      esper.SPs.push([]);

      this[this.version].espersTbl[tblId]["awake" + awake].forEach(SP => {
        esper.SPs[awake - 1].push(SP.sp)
      })
    }
  }

  private addEquipment(equipment) {
    let dataId = equipment.iname;
    let rType = equipment.rtype !=="AF_LOT_50" && equipment.rtype !=="AF_LOT_TRUST" ? equipment.rtype : dataId;

    // @TODO Manage via recipe !!

    if (rType == "AF_LOT_LW_HLM_005" || rType == "AF_LOT_LW_RNG_007") {
      let splitDataId = dataId.split("_")
      rType = dataId
      if (splitDataId[splitDataId.length - 1] === "1" || splitDataId[splitDataId.length - 1] === "2" || splitDataId[splitDataId.length - 1] === "3" || splitDataId[splitDataId.length - 1] === "4" || splitDataId[splitDataId.length - 1] === "5") {
        splitDataId.pop()
        rType = splitDataId.join("_")
      }
    }

    if ((this.version == "jp" || this.names.en.equipment[dataId]) && equipment.type !== -1) {
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
          image: this[this.version].equipments[dataId].asset.toLowerCase(),
          equippableJobs: [],
          equippableUnits: [],
          materials: []
        }

        this.getNames(this[this.version].wotvEquipments[rType], "equipment")

        if (equipment.equip) {
          if (this[this.version].EquipmentCond[equipment.equip]) {
            if (this[this.version].EquipmentCond[equipment.equip].jobs) {
              this[this.version].EquipmentCond[equipment.equip].jobs.forEach(job => {
                this[this.version].wotvEquipments[rType].equippableJobs.push(job)
              })
            }

            if (this[this.version].EquipmentCond[equipment.equip].units) {
              this[this.version].EquipmentCond[equipment.equip].units.forEach(unit => {
                this[this.version].wotvEquipments[rType].equippableUnits.push(unit)
              })
            }
          } else {
            let uniqJobs = []
            Object.keys(this[this.version].wotvJobs).forEach(jobId => {
              let tableJob = jobId.split("_")
              let genericDataId = tableJob[0] + "_" + tableJob[1] + "_" + tableJob[2]

              if (uniqJobs.indexOf(genericDataId) == -1) {
                uniqJobs.push(genericDataId)
                this[this.version].wotvEquipments[rType].equippableJobs.push(jobId)
              }
            });
          }
        }

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

          if (unitId) {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: "tmr",
              unitId: unitId
            }
          } else {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: "Unknown"
            }
          }
        } else if (this[this.version].equipmentRecipes[dataId]) {
          let recipe = this[this.version].equipmentRecipes[dataId];
          if (this.names.en.itemOther[recipe.recipe] && this.names.en.itemOther[recipe.recipe] != "") {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: {
                en: this.names.en.itemOther[recipe.recipe],
                fr: this.names.fr.itemOther[recipe.recipe]
              }
            }
          }
        } else {
          //console.log("NO RECEIPE !!!")
          //console.log(this[this.version].wotvEquipments[rType])
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
              this.getNames(this[this.version].wotvEquipments[rType].grows[growId], "equipmentGrow", false)

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

      this[this.version].wotvEquipments[rType].materials.push(this.getEquipmentMaterials(dataId))

      let skills = [];
      let countSkill = 0;
      let skillsPos = {};
      for (let i = 1; i <= 5; i++) {
        if (this[this.version].equipments[dataId]['skl' + i]) {
          this[this.version].equipments[dataId]['skl' + i].forEach(skillId => {
            if (typeof(skillsPos[skillId]) !== "number") {
              let skill = {
                names: {},
                dataId: skillId,
                effects: [],
                type: this.slots[this[this.version].skills[skillId].slot === 1 ? 1 : 3],
                upgrade: [i],
                grow: this[this.version].skills[skillId].grow
              }
              this.updateSkill(this[this.version].wotvEquipments[rType], skill, skillId);
              skills.push(skill)
              skillsPos[skillId] = countSkill
              countSkill++
            } else {
              skills[skillsPos[skillId]].upgrade.push(i)
            }
          })
        }
      }

      this[this.version].wotvEquipments[rType].skills.push(skills)
    }
  }

  private getEquipmentMaterials(dataId, level = 50) {
    let materials = {}

    let recipe = this[this.version].equipmentRecipes[dataId]
    if (recipe) {
      recipe.craft.forEach(material => {
        if (material.type == 0) {
          if (materials[material.id]) {
            materials[material.id] += material.num
          } else {
            materials[material.id] = material.num
          }
        } else {
          let previousUpgradeMaterials = this.getEquipmentMaterials(material.id, material.lv)

          Object.keys(previousUpgradeMaterials).forEach(materialId => {
            if (materials[materialId]) {
              materials[materialId] += previousUpgradeMaterials[materialId]
            } else {
              materials[materialId] = previousUpgradeMaterials[materialId]
            }
          })
        }
      })
    }

    let awake = this[this.version].equipmentAwakes[dataId]
    if (awake) {
      awake.awakes.forEach(awake => {
        if (awake.lv <= level) {
          let index = 1;
          while (awake['mat' + index] && index <= 9) {
            let mat = awake['mat' + index].split(',');
            let id = mat[0]
            let count = mat[1]

            if (materials[id]) {
              materials[id] += parseInt(count)
            } else {
              materials[id] = parseInt(count)
            }

            index++;
          }
        }
      });
    }



    return materials
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

  private formatRaid() {
    if (this.version == "gl") {
      this[this.version].raidMaps[gl_raid_1.wcond.expr] = gl_raid_1
      this[this.version].raidMaps[gl_raid_2.wcond.expr] = gl_raid_2
      this[this.version].raidMaps[gl_raid_3.wcond.expr] = gl_raid_3
      this[this.version].raidMaps[gl_raid_4.wcond.expr] = gl_raid_4
      this[this.version].raidMaps[gl_raid_5.wcond.expr] = gl_raid_5
      this[this.version].raidMaps[gl_raid_6.wcond.expr] = gl_raid_6
      this[this.version].raidMaps[gl_raid_7.wcond.expr] = gl_raid_7
      this[this.version].raidMaps[gl_raid_8.wcond.expr] = gl_raid_8
      this[this.version].raidMaps[gl_raid_9.wcond.expr] = gl_raid_9
      this[this.version].raidMaps[gl_raid_10.wcond.expr] = gl_raid_10
      this[this.version].raidMaps[gl_raid_11.wcond.expr] = gl_raid_11
      this[this.version].raidMaps[gl_raid_12.wcond.expr] = gl_raid_12
      this[this.version].raidMaps[gl_raid_13.wcond.expr] = gl_raid_13
      this[this.version].raidMaps[gl_raid_14.wcond.expr] = gl_raid_14
      this[this.version].raidMaps[gl_raid_15.wcond.expr] = gl_raid_15
      this[this.version].raidMaps[gl_raid_16.wcond.expr] = gl_raid_16
      this[this.version].raidMaps[gl_raid_17.wcond.expr] = gl_raid_17
      this[this.version].raidMaps[gl_raid_18.wcond.expr] = gl_raid_18
      this[this.version].raidMaps[gl_raid_19.wcond.expr] = gl_raid_19
      this[this.version].raidMaps[gl_raid_20.wcond.expr] = gl_raid_20
      this[this.version].raidMaps[gl_raid_21.wcond.expr] = gl_raid_21
      this[this.version].raidMaps[gl_raid_22.wcond.expr] = gl_raid_22
      this[this.version].raidMaps[gl_raid_23.wcond.expr] = gl_raid_23
      this[this.version].raidMaps[gl_raid_24.wcond.expr] = gl_raid_24
      this[this.version].raidMaps[gl_raid_25.wcond.expr] = gl_raid_25
      this[this.version].raidMaps[gl_raid_26.wcond.expr] = gl_raid_26
      this[this.version].raidMaps[gl_raid_27.wcond.expr] = gl_raid_27
      this[this.version].raidMaps[gl_raid_28.wcond.expr] = gl_raid_28
      this[this.version].raidMaps[gl_raid_29.wcond.expr] = gl_raid_29
      this[this.version].raidMaps[gl_raid_30.wcond.expr] = gl_raid_30
      this[this.version].raidMaps[gl_raid_31.wcond.expr] = gl_raid_31
      this[this.version].raidMaps[gl_raid_32.wcond.expr] = gl_raid_32
      this[this.version].raidMaps[gl_raid_33.wcond.expr] = gl_raid_33
      this[this.version].raidMaps[gl_raid_34.wcond.expr] = gl_raid_34
      this[this.version].raidMaps[gl_raid_35.wcond.expr] = gl_raid_35
      this[this.version].raidMaps[gl_raid_36.wcond.expr] = gl_raid_36
      this[this.version].raidMaps[gl_raid_37.wcond.expr] = gl_raid_37
    } else {
      this[this.version].raidMaps[jp_raid_1.wcond.expr] = jp_raid_1
      this[this.version].raidMaps[jp_raid_2.wcond.expr] = jp_raid_2
      this[this.version].raidMaps[jp_raid_3.wcond.expr] = jp_raid_3
      this[this.version].raidMaps[jp_raid_4.wcond.expr] = jp_raid_4
      this[this.version].raidMaps[jp_raid_5.wcond.expr] = jp_raid_5
      this[this.version].raidMaps[jp_raid_6.wcond.expr] = jp_raid_6
      this[this.version].raidMaps[jp_raid_7.wcond.expr] = jp_raid_7
      this[this.version].raidMaps[jp_raid_8.wcond.expr] = jp_raid_8
      this[this.version].raidMaps[jp_raid_9.wcond.expr] = jp_raid_9
      this[this.version].raidMaps[jp_raid_10.wcond.expr] = jp_raid_10
      this[this.version].raidMaps[jp_raid_11.wcond.expr] = jp_raid_11
      this[this.version].raidMaps[gl_raid_12.wcond.expr] = gl_raid_12
      this[this.version].raidMaps[gl_raid_13.wcond.expr] = gl_raid_13
      this[this.version].raidMaps[gl_raid_14.wcond.expr] = gl_raid_14
      this[this.version].raidMaps[gl_raid_15.wcond.expr] = gl_raid_15
      this[this.version].raidMaps[gl_raid_16.wcond.expr] = gl_raid_16
      this[this.version].raidMaps[gl_raid_17.wcond.expr] = gl_raid_17
      this[this.version].raidMaps[gl_raid_18.wcond.expr] = gl_raid_18
      this[this.version].raidMaps[gl_raid_19.wcond.expr] = gl_raid_19
      this[this.version].raidMaps[gl_raid_20.wcond.expr] = gl_raid_20
      this[this.version].raidMaps[gl_raid_21.wcond.expr] = gl_raid_21
      this[this.version].raidMaps[gl_raid_22.wcond.expr] = gl_raid_22
      this[this.version].raidMaps[gl_raid_23.wcond.expr] = gl_raid_23
      this[this.version].raidMaps[gl_raid_24.wcond.expr] = gl_raid_24
      this[this.version].raidMaps[gl_raid_25.wcond.expr] = gl_raid_25
      this[this.version].raidMaps[gl_raid_26.wcond.expr] = gl_raid_26
      this[this.version].raidMaps[gl_raid_27.wcond.expr] = gl_raid_27
      this[this.version].raidMaps[gl_raid_28.wcond.expr] = gl_raid_28
      this[this.version].raidMaps[gl_raid_29.wcond.expr] = gl_raid_29
      this[this.version].raidMaps[gl_raid_30.wcond.expr] = gl_raid_30
      this[this.version].raidMaps[gl_raid_31.wcond.expr] = gl_raid_31
      this[this.version].raidMaps[gl_raid_32.wcond.expr] = gl_raid_32
      this[this.version].raidMaps[gl_raid_33.wcond.expr] = gl_raid_33
      this[this.version].raidMaps[gl_raid_34.wcond.expr] = gl_raid_34
      this[this.version].raidMaps[gl_raid_35.wcond.expr] = gl_raid_35
      this[this.version].raidMaps[gl_raid_36.wcond.expr] = gl_raid_36
      this[this.version].raidMaps[gl_raid_37.wcond.expr] = gl_raid_37
    }

    Object.keys(this[this.version].raid).forEach(raidId => {
      let raid = this[this.version].raid[raidId]

      if (raid.home_tex !== "LAPS_RD_0001" && (raid.home_tex !== "LAPS_RD_FF14_01" || raidId == "RAID_ID_11")) {
        this[this.version].wotvRaids[raidId] = {
          dataId: raidId,
          names: {},
          bosses: []
        }

        raid.prob.forEach((boss, bossIndex) => {
          this.addRaidBoss(this[this.version].wotvRaids[raidId], boss.boss_id)
        })
      }
    })
  }

  private addRaidBoss(raid, bossId) {
    let bossUnit = this[this.version].units[this[this.version].raidBoss[bossId].unit_id]
    let dataId = bossUnit.iname
    let boss = {
      dataId: dataId,
      names: {},
      stats: {},
      species: bossUnit.species ? this.species[bossUnit.species[0]] : "",
      element: this.elements[bossUnit.elem[0]],
      image: bossUnit.charaId.toLowerCase(),
      skills: {},
      slug: ""
    }

    this.getUnitImage(boss)
    this.getNames(boss, 'unit');
    this.getStats(boss, bossUnit.status, 'unit')
    this.getAttackSkill(boss, bossUnit.atkskl)

    if (!raid.names.en) {
      raid.names = boss.names
      raid.slug = boss.slug
    }

    this[this.version].raidBoss[bossId].param.forEach(quest => {
      this.addBossSkill(boss, quest.quest_id, quest.lv_min, quest.lv_max)

      if (raid.maxLevel < quest.lv_max) {
        raid.maxLevel = quest.lv_max
      }
    })

    raid.bosses.push(boss)
  }

  private addBossSkill(boss, questId, lvMin, lvMax) {
    let quest = this[this.version].raidMaps[questId]
    if (quest) {
      quest.enemy.forEach(enemy => {
        if (enemy.iname == boss.dataId) {
          enemy.skills.forEach(skill => {
            let skillId = skill.iname
            if (!boss.skills[skillId]) {
              boss.skills[skillId] = {
                effects: [],
                dataId: skillId,
                rate: skill.rate
              }
              this.updateSkill(boss, boss.skills[skillId], skillId);
              boss.skills[skillId].minLevel = lvMin
              boss.skills[skillId].maxLevel = lvMax
            } else if (boss.skills[skillId].maxLevel < lvMax) {
              boss.skills[skillId].maxLevel = lvMax
            } else if (boss.skills[skillId].minLevel > lvMin) {
              boss.skills[skillId].minLevel = lvMin
            }
          })
        }
      })
    }
  }

  private addItem(item) {
    let dataId = item.iname;
    this[this.version].wotvItems[dataId] = {
      dataId: dataId,
      names: {},
      recipe: false
    };

    if (item.type == 13) {
      this[this.version].wotvItems[dataId].recipe = true
    } else {
      delete this[this.version].wotvItems[dataId].recipe
    }

    this.getNames(this[this.version].wotvItems[dataId], 'item', false);
  }

  formatMasterRanks() {
    Object.keys(this[this.version].masterRanks).forEach(mrId => {
      let mr = this[this.version].masterRanks[mrId]

      this[this.version].wotvMasterRanks[this.elements[mr.condition.elems[0]]] = {
        dataId: mrId,
        condition: this.elements[mr.condition.elems[0]],
        ranks: []
      }

      let i = 0
      mr.ranks.forEach(dataRank => {
        let rank = {
          images: {
            emblem: dataRank.emblem_img.toLowerCase(),
            background: dataRank.back_img.toLowerCase(),
            stars: i
          },
          effects: []
        }

        if (dataRank.mr_effect_id) {
          let fakeSkill = {
            type: "MR",
            buffIds: [],
            effects: []
          }

          this[this.version].masterRanksEffects[dataRank.mr_effect_id].effects.forEach(effect => {
            fakeSkill.buffIds.push(effect.effect_id)
          })

          this.updateSkill(rank, fakeSkill, dataRank.mr_effect_id)
          rank.effects = fakeSkill.effects
        }

        this[this.version].wotvMasterRanks[this.elements[mr.condition.elems[0]]].ranks.push(rank)

        i++;
        if (i > 4) {
          i = 0
        }
      })
    })
  }
}
