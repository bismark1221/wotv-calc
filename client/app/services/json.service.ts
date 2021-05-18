import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Slug } from 'ng2-slugify';

import { JpTranslateService } from './jptranslate.service';
import { EsperService } from './esper.service';
import { EquipmentService } from './equipment.service';
import { UnitService } from './unit.service';
import { JobService } from './job.service';

@Injectable()
export class JsonService {
  slug = new Slug('default');
  version = null;

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
    wotvPlayerTitles: {},
    wotvGuildTitles: {},
    wotvQuests: {},
    wotvOtherUnits: {},
    wotvSkills: {},
    raid: {},
    raidBoss: {},
    raidMaps: {},
    wotvRaids: {},
    equipmentAwakes: {},
    items: {},
    cardConditions: {},
    masterRanks: {},
    masterRanksEffects: {},
    playerTitles : {},
    guildTitles : {},
    jobsTbl: {},
    jobsMaterials: {},
    unitsMaterials: {},
    unitClassChangeCondition: {},
    raidBonusUnit: {},
    raidBonusCard: {},
    quests: {},
    questMissions: {},
    grids: {},
    maps: {},
    towerRewards: {},
    towerFloors: {},
    skillExc: {}
  };

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
    wotvPlayerTitles: {},
    wotvGuildTitles: {},
    wotvQuests: {},
    wotvOtherUnits: {},
    wotvSkills: {},
    raid: {},
    raidBoss: {},
    raidMaps: {},
    wotvRaids: {},
    equipmentAwakes: {},
    items: {},
    cardConditions: {},
    masterRanks: {},
    masterRanksEffects: {},
    playerTitles : {},
    guildTitles : {},
    jobsTbl: {},
    jobsMaterials: {},
    unitsMaterials: {},
    unitClassChangeCondition: {},
    raidBonusUnit: {},
    raidBonusCard: {},
    quests: {},
    questMissions: {},
    grids: {},
    maps: {},
    towerRewards: {},
    towerFloors: {},
    skillExc: {}
  };

  jpRomaji = {};
  jpTitlesName = {};
  jpTitlesDesc = {};

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
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
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
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
    },
    es: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
    },
    de: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
    },
    ko: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
    },
    zh: {
      skill: {},
      unit: {},
      buff: {},
      job: {},
      equipment: {},
      visionCard: {},
      equipmentGrow: {},
      itemOther: {},
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
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
      item: {},
      playerTitleName: {},
      playerTitleDesc: {},
      guildTitleName: {},
      guildTitleDesc: {},
      questTitle: {},
      towerTitle: {},
      towerFloorTitle: {}
    }
  };

  rarity = [
    'N',
    'R',
    'SR',
    'MR',
    'UR'
  ];

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
    '',
    'Unknown',
    'Leonis',
    'Hourn',
    'Fenice',
    'Wezett',
    'CrystalFaith',
    'Allyare',
    'Rundall',
    'Cyga',
    'Guren',
    'Owis',
    'Hyndra',
    'FFBE',
    'FF1',
    'FF2',
    'FF3',
    'FF4',
    'FF5',
    'FF6',
    'FF7',
    'FF8',
    'FF9',
    'FF10',
    'FF11',
    'FF12',
    'FF13',
    'FF14',
    'FF15',
    'FFT',
  ];

  buffTypes = {
    1: 'HP',
    2: 'TP',
    3: 'AP',
    4: 'CT',
    21: 'ATK',
    22: 'DEF',
    23: 'MAG',
    24: 'SPR',
    25: 'DEX',
    26: 'AGI',
    27: 'LUCK',
    28: 'MOVE',
    29: 'JUMP',
    42: 'FIRE',
    43: 'ICE',
    44: 'WIND',
    45: 'EARTH',
    46: 'LIGHTNING',
    47: 'WATER',
    48: 'LIGHT',
    49: 'DARK',
    50: 'ALL_ELEMENTS',
    61: 'SLASH',
    62: 'PIERCE',
    63: 'STRIKE',
    64: 'MISSILE',
    65: 'MAGIC',
    70: 'ALL_ATTACKS',
    81: 'REGEN',
    82: 'TP_AUTO_RESTORE',
    83: 'AUTO_RESTORE',
    84: 'POISON',
    85: 'BLIND',
    86: 'SLEEP',
    87: 'SILENCE',
    88: 'PARALYZE',
    89: 'CONFUSION',
    90: 'CHARM',
    91: 'PETRIFY',
    92: 'TOAD',
    95: 'HASTE',
    96: 'SLOW',
    97: 'STOP',
    98: 'STUN',
    99: 'IMMOBILIZE',
    100: 'DISABLE',
    101: 'BERSERK',
    102: 'DOOM',
    103: 'REVIVE',
    104: 'RERAISE',
    105: 'PROTECT',
    106: 'SHELL',
    107: 'CONDITION_FOR_REFLECT',
    110: 'FLOAT',
    111: 'INSTANT_DEATH',
    112: 'QUICKEN',
    113: 'IGNORE_FATAL',
    114: 'PHYSIC_EVADE',
    115: 'MAGIC_EVADE',
    116: 'CRITIC_GUARENTED',
    117: 'CRITIC_GUARENTED',
    119: 'KILLER',
    120: 'KILLER',
    121: 'KILLER',
    122: 'KILLER',
    123: 'IMBUE',
    124: 'IMMUNE_CT_CHANGE',
    126: 'ON_PHYSIC_ATTACK',
    130: 'ON_MAGIC_ATTACK',
    134: 'KILLER',
    140: 'ALL_AILMENTS',
    142: 'MASS_DISPEL',
    144: 'IMBUE',
    148: 'GRADUAL_PETRIFY',
    151: 'INITIAL_AP',
    152: 'RANGE',
    155: 'ACCURACY',
    156: 'EVADE',
    157: 'CRITIC_DAMAGE',
    158: 'CRITIC_RATE',
    159: 'CRITIC_EVADE',
    180: 'PROVOKE',
    181: 'BRAVERY_FIGHT',
    182: 'FAITH_FIGHT',
    183: 'NON_ATTACK_ACTIVATION_TIME',
    184: 'ATTACK_ACTIVATION_TIME',
    190: 'ACQUIRED_AP',
    194: 'ACQUIRED_JP',
    191: 'EVOCATION_GAUGE_BOOST',
    192: 'BRAVERY',
    193: 'FAITH',
    200: 'DEBUFF_RES',
    201: 'MAX_HP_DOWN_RES',
    202: 'ATK_DEBUFF_RES',
    203: 'DEF_DEBUFF_RES',
    204: 'MAG_DEBUFF_RES',
    205: 'SPR_DEBUFF_RES',
    207: 'AGI_DEBUFF_RES',
    262: 'BRAVERY_DEBUFF_RES',
    272: 'RES_SLASH_DEBUFF_RES',
    278: 'RES_ALL_DEBUFF_RES',
    300: 'BUFFS_DURATION',
    301: 'DEBUFFS_DURATION',
    310: 'ATTACK_RES',
    311: 'AOE_RES',
    312: 'MAX_DAMAGE',
    313: 'EVOCATION_MAGIC',
    314: 'DEFENSE_PENETRATION',
    316: 'AP_CONSUMPTION',
    319: 'SPIRIT_PENETRATION',
    321: 'RES_SLASH_ATK_PENETRATION',
    323: 'RES_PIERCE_ATK_PENETRATION',
    325: 'RES_STRIKE_ATK_PENETRATION',
    327: 'RES_MISSILE_ATK_PENETRATION',
    329: 'RES_MAGIC_ATK_PENETRATION',
    341: 'RES_WATER_ATK_PENETRATION',
    347: 'HEAL_POWER',
    348: 'REDUCE_COUNTER_CHANCE',
    501: 'ABSORB_HP_ONTIME',
    502: 'FROSTBITE',
    503: 'CONDITION_FOR_UPGRADE_SKILL',
    509: 'CONDITION_FOR_GRANT_BUFF'
  };

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
    'metal',
    'arcana'
  ];

  timing = {
    0: 'QUEST_START',
    1: 'SKILL_BEFORE',
    2: 'SKILL_AFTER',
    3: 'SKILL_REACTION',
    4: 'ON_CRITICAL',
    10: 'WEATHER',
    14: 'MOVE'
  };

  killers = {
    2: 'FIRE',
    3: 'ICE',
    4: 'WIND',
    5: 'EARTH',
    6: 'LIGHTNING',
    7: 'WATER',
    8: 'LIGHT',
    9: 'DARK',
    101: 'HUMAN',
    102: 'ESPER',
    103: 'BEAST',
    104: 'DEMON',
    105: 'DRAGON',
    106: 'PLANT',
    107: 'AVIAN',
    108: 'INSECT',
    109: 'AQUATIC',
    110: 'MACHINA',
    111: 'FAIRY',
    112: 'REAPER',
    113: 'STONE',
    114: 'METAL',
    115: 'MAGICAL_CREATURE',
    204: 'FENNES',
    301: 'FLOAT',
    401: 'MALES'
  };

  conditions = {
    2: 'MALE',
    11: 'FIRE_ELEMENT',
    12: 'ICE_ELEMENT',
    13: 'WIND_ELEMENT',
    14: 'EARTH_ELEMENT',
    15: 'LIGHTNING_ELEMENT',
    16: 'WATER_ELEMENT',
    17: 'LIGHT_ELEMENT',
    18: 'DARK_ELEMENT',
    19: 'BEHIND',
    30: 'HUMAN',
    31: 'NETHERBEAST'
  };

  strengthType = {
    1: 'DEAD_UNITS',
    50: 'UNIT_ACTIONS',
    51: 'COUNT_DAMAGE_RECEIVED',
    53: 'UNIT_LEVEL',
    56: 'DESTROYED_PARTS', // Used just for units with multiple parts...
    72: 'HEIGHT',
    73: 'TARGET_LEVEL',
    99: 'MODIFY_ABSORB',
    100: 'EFFECT_CONDITION'
  };

  strengthFormulaCondition = {
    0: 'FIX',
    1: 'CURVE',
    2: 'FIX',
    5: 'MORE_THAN',
    6: 'LESS_THAN',
    7: 'MORE_AND_LESS_THAN',
    22: 'RATIO',
    40: 'AT_LEAST',
    50: 'PERCENT',
    1000: 'COUNT'
  };

  strengthModifier = {
    0: 'DAMAGE',
    1: 'COUNTER_CHANCE',
    7: 'EFFECT',
    8: 'CHANCE',
    9: 'ABSORB',
    20: 'TRIGGER'
  };

  damageEffectType = [
    '0',
    'DAMAGE',
    'DAMAGE',
    'ABSORB'
  ];

  damageTypes = [
    'all',
    'slash',
    'pierce',
    'strike',
    'missile',
    'magic'
  ];

  damagePool = [
    'HP',
    'TP',
    'AP'
  ];

  reactCounter = [
    'NULL',
    'ALL',
    'PHYSIC',
    'MAGIC'
  ];

  atkBased = [
    '0',
    'physic',
    'magic',
    'hybrid'
  ];

  targetTypes = {
    0:  'self',
    1:  'target',
    2:  'allyNotSelf',
    10: 'selfSide',
    11: 'ennemySide',
    12: 'all',
    20: 'deadAlly',
    21: 'deadEnnemy',
    22: 'deadAll',
    30: 'body',
    32: 'bodyAndTails',
    90: 'panel'
  };

  stats = {
    unit: {
      'hp': 'HP',
      'mp': 'TP',
      'ap': 'AP',
      'atk': 'ATK',
      'def': 'DEF',
      'mnd': 'SPR',
      'mag': 'MAG',
      'dex': 'DEX',
      'spd': 'AGI',
      'luk': 'LUCK',
      'iniap': 'INITIAL_AP',

      'hit' : 'ACCURACY',
      'crt' : 'CRITIC_RATE',
      'crta': 'CRITIC_AVOID',
      'avd' : 'EVADE',

      'efi': 'FIRE_RES',
      'eic': 'ICE_RES',
      'eea': 'EARTH_RES',
      'ewi': 'WIND_RES',
      'eth': 'LIGHTNING_RES',
      'ewa': 'WATER_RES',
      'esh': 'LIGHT_RES',
      'eda': 'DARK_RES',

      'asl': 'SLASH_RES',
      'api': 'PIERCE_RES',
      'abl': 'STRIKE_RES',
      'ash': 'MISSILE_RES',
      'ama': 'MAGIC_RES',

      'cpo': 'POISON_RES',
      'cbl': 'BLIND_RES',
      'csl': 'SLEEP_RES',
      'cmu': 'SILENCE_RES',
      'cpa': 'PARALYZE_RES',
      'ccf': 'CONFUSION_RES',
      'cpe': 'PETRIFY_RES',
      'cfr': 'TOAD_RES',
      'cch': 'CHARM_RES',
      'csw': 'SLOW_RES',
      'cst': 'STOP_RES',
      'cdm': 'IMMOBILIZE_RES',
      'cda': 'DISABLE_RES',
      'cbe': 'BERSERK_RES',
      'cdo': 'DOOM_RES',

      'mov': 'MOVE',
      'jmp': 'JUMP',
      'lv': 'MAX_LV'
    },
    visionCard: {
      'hp': 'HP',
      'mp': 'TP',
      'ap': 'AP',
      'atk': 'ATK',
      'def': 'DEF',
      'mnd': 'SPR',
      'mag': 'MAG',
      'dex': 'DEX',
      'spd': 'AGI',
      'luk': 'LUCK',
      'iniap': 'INITIAL_AP',

      'hit' : 'ACCURACY',
      'crt' : 'CRITIC_RATE',
      'crta': 'CRITIC_AVOID',
      'avd' : 'EVADE',

      'efi': 'FIRE_RES',
      'eic': 'ICE_RES',
      'eea': 'EARTH_RES',
      'ewi': 'WIND_RES',
      'eth': 'LIGHTNING_RES',
      'ewa': 'WATER_RES',
      'esh': 'LIGHT_RES',
      'eda': 'DARK_RES',

      'asl': 'SLASH_RES',
      'api': 'PIERCE_RES',
      'abl': 'STRIKE_RES',
      'ash': 'MISSILE_RES',
      'ama': 'MAGIC_RES',

      'cpo': 'POISON_RES',
      'cbl': 'BLIND_RES',
      'csl': 'SLEEP_RES',
      'cmu': 'SILENCE_RES',
      'cpa': 'PARALYZE_RES',
      'ccf': 'CONFUSION_RES',
      'cpe': 'PETRIFY_RES',
      'cfr': 'TOAD_RES',
      'cch': 'CHARM_RES',
      'csw': 'SLOW_RES',
      'cst': 'STOP_RES',
      'cdm': 'IMMOBILIZE_RES',
      'cda': 'DISABLE_RES',
      'cbe': 'BERSERK_RES',
      'cdo': 'DOOM_RES',

      'mov': 'MOVE',
      'jmp': 'JUMP'
    },
    esper: {
      'hp': 'HP',
      'mp': 'TP',
      'ap': 'AP',
      'atk': 'ATK',
      'def': 'DEF',
      'mnd': 'SPR',
      'mag': 'MAG',
      'dex': 'DEX',
      'spd': 'AGI',
      'luk': 'LUCK',
      'iniap': 'INITIAL_AP',

      'hit' : 'ACCURACY',
      'crt' : 'CRITIC_RATE',
      'crta': 'CRITIC_AVOID',
      'avd' : 'EVADE',

      'efi': 'FIRE_RES',
      'eic': 'ICE_RES',
      'eea': 'EARTH_RES',
      'ewi': 'WIND_RES',
      'eth': 'LIGHTNING_RES',
      'ewa': 'WATER_RES',
      'esh': 'LIGHT_RES',
      'eda': 'DARK_RES',

      'asl': 'SLASH_RES',
      'api': 'PIERCE_RES',
      'abl': 'STRIKE_RES',
      'ash': 'MISSILE_RES',
      'ama': 'MAGIC_RES',

      'cpo': 'POISON_RES',
      'cbl': 'BLIND_RES',
      'csl': 'SLEEP_RES',
      'cmu': 'SILENCE_RES',
      'cpa': 'PARALYZE_RES',
      'ccf': 'CONFUSION_RES',
      'cpe': 'PETRIFY_RES',
      'cfr': 'TOAD_RES',
      'cch': 'CHARM_RES',
      'csw': 'SLOW_RES',
      'cst': 'STOP_RES',
      'cdm': 'IMMOBILIZE_RES',
      'cda': 'DISABLE_RES',
      'cbe': 'BERSERK_RES',
      'cdo': 'DOOM_RES',

      'mov': 'MOVE',
      'jmp': 'JUMP'
    }
  };

  jobEquip = [
    '0',
    'DAGGER',
    'SWORD',
    'GREATSWORD',
    'KATANA',
    'ROD',
    'NINJABLADE',
    'BOW',
    'AXE',
    '9',
    'SPEAR',
    '11',
    '12',
    '13',
    'GUN',
    'MACE',
    'FIST',
    'SHIELD',
    'ARMOR',
    'HAT',
    'HELM',
    'CLOTH',
    'ACC',
    'GLOVE',
    'BOOK'
  ];

  jobStats = [
    'hp',
    'mp',
    'ap',
    'atk',
    'mag',
    'dex',
    'spd',
    'luk',
    'iniap'
  ];

  calcType = {
    1: 'fixe',
    2: 'percent',
    3: 'resistance',
    10: 'fixe',
    11: 'percent',
    20: 'decrease',
    22: 'decrease',
    30: 'percent',
    31: 'dispel',
    32: 'dispel',
    40: 'nullify'
  };

  slots = [
    'buff',
    'skill',
    'skill',
    'support',
    'counter',
    'esper',
    'limit',
    'master',
    'party',
    'ex_buff'
  ];

  skillTypes = {
    0: 'basic_attack',
    1 : 'unit_skill',
    2 : 'unit_counter',
    3 : 'unit_passive',
    4 : 'equipment_skill',
    5 : 'equipment_counter',
    6 : 'equipment_passive',
    7 : 'card_skill',
    8 : 'card_counter',
    9 : 'card_passive',
    10 : 'leader', // still not used ?
    11 : 'item',
    12 : 'status' // work like a passive
  };

  itemType = {
    0: 'usable_item',
    1: 'unit_shard',
    9: 'turtle',
    6: 'cube',
    7: 'burst_pot',
    10: 'tickets',
    12: 'equipment_xp',
    13: 'recipe',
    16: 'medal',
    18: 'esper_xp',
    19: 'hammer',
    20: 'equipment_pot',
    21: 'seal',
    22: 'compo_job',
    23: 'compo_unit_awake',
    24: 'compo_equipment',
    25: 'potion_nrg',
    26: 'egg',
    27: 'vc_orb_awake',
    28: 'compo_esper_awake',
    29: 'potion_rene',
    30: 'potion_raid',
    31: 'potion_class_match',
    32: 'guild_stuff',
    34: 'job_awake_orb',
    35: 'orb_awake',
    36: 'vc_shard',
    37: 'soul_medal',
    38: 'vision_medal',
    39: 'stamp',
    40: 'exjob_orb',
    41: 'potion_draft_match',
  };

  questType = {
    1: 'story',
    2: 'event',
    3: 'hard_quest_unit',
    4: 'multi',
    5: 'character_quest',
    6: 'esper_quest',
    7: 'arena',
    8: 'raid',
    9: 'rank_pvp',
    10: 'free_pvp',
    11: 'friend_pvp',
    12: 'gvg',
    20: 'tuto',
    21: 'beginner',
    25: 'guild_quest',
    26: 'selection',
    27: 'draft_pvp',
    28: 'hard_quest_vc'
  };

  questMissionCond = {
    0: 'COMPLETE_QUEST',
    1: 'ANNIHILATE',
    2: 'KO_UNITS_BUT_CONTINUE',
    3: 'KO_UNITS',
    4: 'MAX_DEAD_UNIT',
    5: 'SPECIFIC_UNIT_NOT_DEAD',
    10: 'ELEMENT',
    15: 'SPECIFIC_UNIT_IN_PARTY',
    17: 'MAX_PARTY_UNIT',
    23: 'MIN_SIM_DEAD_SPECIFIC_ENEMIES',
    31: 'MIN_BREAK_OBJECT',
    41: 'SPECIFIC_SKILL',
    42: 'MAX_SKILL',
    50: 'ACTIVATE',
    60: 'ITEMS',
    70: 'NO_COMPANION',
    71: 'GET_COMPANION',
    81: 'MIN_SIM_DEAD_ENEMIES',
    82: 'MAX_HEAL',
    83: 'MAX_ATTACK',
    84: 'MAX_DAMAGE',
    86: 'MIN_DAMAGE_ONE_ATTACK',
    100: 'MAX_CONTINUE',
    101: 'MIN_TREASURE',
    102: 'NAX_CRYSTAL',
    103: 'MIN_CRYSTAL',
    104: 'MIN_CHAIN',
    105: 'MIN_ELEMENT_CHAIN',
    200: 'NO_AUTO',
    201: 'ALL_MISSIONS',
    10000000: 'TOWER_FIRST_COMPLETE',
    10000001: 'TOWER_OTHER_COMPLETE'
  };

  questMissionReward = {
    0: 'item',
    1: 'equipment',
    3: 'visiores'
  };

  titleGrade = {
    1: 'brown',
    2: 'grey',
    3: 'red',
    4: 'blue',
    5: 'pink',
    6: 'image'
  };

  private statsAtkRes = [
    'FIRE',
    'ICE',
    'EARTH',
    'WIND',
    'LIGHTNING',
    'WATER',
    'LIGHT',
    'DARK',
    'SLASH',
    'PIERCE',
    'STRIKE',
    'MISSILE',
    'MAGIC',
    'ALL_ELEMENTS',
    'ALL_ATTACKS'
  ];

  private ailmentStatus = [
    'REGEN',
    'AUTO_RESTORE',
    'POISON',
    'BLIND',
    'SLEEP',
    'SILENCE',
    'PARALYZE',
    'CONFUSION',
    'CHARM',
    'PETRIFY',
    'GRADUAL_PETRIFY',
    'TOAD',
    'HASTE',
    'SLOW',
    'STOP',
    'STUN',
    'IMMOBILIZE',
    'DISABLE',
    'BERSERK',
    'DOOM',
    'REVIVE',
    'PROTECT',
    'SHELL',
    'FLOAT',
    'QUICKEN',
    'ALL_AILMENTS',
    'FROSTBITE',
    'EXPLOSIVE_FIST',
    'INSTANT_DEATH'
  ];

  constructor(
    private http: HttpClient,
    private equipmentService: EquipmentService,
    private esperService: EsperService,
    private jobService: JobService,
    private unitService: UnitService,
    private jpTranslateService: JpTranslateService
  ) {}

  private GLUnits() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Unit.json?t=' + date).toPromise();
  }

  private GLUnitsBoards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/UnitAbilityBoard.json?t=' + date).toPromise();
  }

  private GLSkills() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Skill.json?t=' + date).toPromise();
  }

  private GLBuffs() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Buff.json?t=' + date).toPromise();
  }

  private GLJobs() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Job.json?t=' + date).toPromise();
  }

  private GLEquipments() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Artifact.json?t=' + date).toPromise();
  }

  private GLVisionCards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/VisionCard.json?t=' + date).toPromise();
  }

  private GLEspersBoards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/NetherBeastAbilityBoard.json?t=' + date).toPromise();
  }

  private GLWeathers() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Weather.json?t=' + date).toPromise();
  }

  private GLEsperLvTbls() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/NBeastLvTbl.json?t=' + date).toPromise();
  }

  private GLArtifactRecipes() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/ArtifactRecipe.json?t=' + date).toPromise();
  }

  private GLArtifactLot() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/ArtifactRandLot.json?t=' + date).toPromise();
  }

  private GLGrows() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Grow.json?t=' + date).toPromise();
  }

  private GLUnitModels() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/UnitModel.json?t=' + date).toPromise();
  }

  private GLArtifactEquipCond() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/ArtifactEquipCondition.json?t=' + date).toPromise();
  }

  private GLRaid() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Raid.json?t=' + date).toPromise();
  }

  private GLRaidBoss() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/RaidBoss.json?t=' + date).toPromise();
  }

  private GLArtifactAwake() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/ArtifactAwake.json?t=' + date).toPromise();
  }

  private GLItem() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Item.json?t=' + date).toPromise();
  }

  private GLCardCond() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/VisionCardLimitedCondition.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLMasterRank() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/MasterRank.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLMasterRankEffect() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/MasterRankEffect.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLPlayersAward() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/PlayersAward.json?t=' + date).toPromise();
  }

  private GLGuildsAward() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/GuildsAward.json?t=' + date).toPromise();
  }

  private GLJobLvTbl() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/JobLvTbl.json?t=' + date).toPromise();
  }

  private GLJobMaterialItem() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/JobMaterialItem.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLUnitMaterialItem() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/UnitMaterialItem.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLUnitClassChangeCondition() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/UnitClassChangeCondition.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLRaidBonusUnit() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/RaidBonusUnit.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLRaidBonusCard() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/RaidBonusVisioncard.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLQuests() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/Quests.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLQuestMissions() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/QuestMission.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLTowerFloors() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/TowerFloor.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLTowerRewards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/TowerReward.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLSkillExc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/data/SkillExc.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }


  /* JP */
  private JPUnits() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Unit.json?t=' + date).toPromise();
  }

  private JPUnitsBoards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/UnitAbilityBoard.json?t=' + date).toPromise();
  }

  private JPSkills() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Skill.json?t=' + date).toPromise();
  }

  private JPBuffs() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Buff.json?t=' + date).toPromise();
  }

  private JPJobs() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Job.json?t=' + date).toPromise();
  }

  private JPEquipments() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Artifact.json?t=' + date).toPromise();
  }

  private JPVisionCards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/VisionCard.json?t=' + date).toPromise();
  }

  private JPEspersBoards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/NetherBeastAbilityBoard.json?t=' + date).toPromise();
  }

  private JPWeathers() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Weather.json?t=' + date).toPromise();
  }

  private JPEsperLvTbls() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/NBeastLvTbl.json?t=' + date).toPromise();
  }

  private JPArtifactRecipes() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/ArtifactRecipe.json?t=' + date).toPromise();
  }

  private JPArtifactLot() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/ArtifactRandLot.json?t=' + date).toPromise();
  }

  private JPGrows() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Grow.json?t=' + date).toPromise();
  }

  private JPUnitModels() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/UnitModel.json?t=' + date).toPromise();
  }

  private JPArtifactEquipCond() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/ArtifactEquipCondition.json?t=' + date).toPromise();
  }

  private JPRaid() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Raid.json?t=' + date).toPromise();
  }

  private JPRaidBoss() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/RaidBoss.json?t=' + date).toPromise();
  }

  private JPArtifactAwake() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/ArtifactAwake.json?t=' + date).toPromise();
  }

  private JPItem() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Item.json?t=' + date).toPromise();
  }

  private JPCardCond() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/VisionCardLimitedCondition.json?t=' + date).toPromise();
  }

  private JPMasterRank() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/MasterRank.json?t=' + date).toPromise();
  }

  private JPMasterRankEffect() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/MasterRankEffect.json?t=' + date).toPromise();
  }

  private JPPlayersAward() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/PlayersAward.json?t=' + date).toPromise();
  }

  private JPGuildsAward() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/GuildsAward.json?t=' + date).toPromise();
  }

  private JPJobLvTbl() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/JobLvTbl.json?t=' + date).toPromise();
  }

  private JPJobMaterialItem() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/JobMaterialItem.json?t=' + date).toPromise();
  }

  private JPUnitMaterialItem() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/UnitMaterialItem.json?t=' + date).toPromise();
  }

  private JPUnitClassChangeCondition() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/UnitClassChangeCondition.json?t=' + date).toPromise();
  }

  private JPRaidBonusUnit() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/RaidBonusUnit.json?t=' + date).toPromise();
  }

  private JPRaidBonusCard() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/RaidBonusVisioncard.json?t=' + date).toPromise();
  }

  private JPQuests() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/Quests.json?t=' + date).toPromise();
  }

  private JPQuestMissions() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/QuestMission.json?t=' + date).toPromise();
  }

  private JPTowerFloors() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/TowerFloor.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private JPTowerRewards() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/TowerReward.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private JPSkillExc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jpdata/SkillExc.json?t=' + date).toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }


  /* Translation */
  private TranslateUnitNames() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/unitname.json?t=' + date).toPromise();
  }

  private TranslateSkillNames() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/skillname.json?t=' + date).toPromise();
  }

  private TranslateBuffNames() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/buffname.json?t=' + date).toPromise();
  }

  private TranslateJobNames() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/jobname.json?t=' + date).toPromise();
  }

  private TranslateEquipmentNames() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/artifactname.json?t=' + date).toPromise();
  }

  private TranslateVisionCardNames() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/visioncardname.json?t=' + date).toPromise();
  }

  private TranslateVisionItemOthers() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/itemother.json?t=' + date).toPromise();
  }

  private TranslateEquipmentGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/artifactgrow.json?t=' + date).toPromise();
  }

  private TranslateItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/itemname.json?t=' + date).toPromise();
  }

  private TranslatePlayerAwardsName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/playerawardsname.json?t=' + date).toPromise();
  }

  private TranslatePlayerAwardsDescription() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/playerawardsdescription.json?t=' + date).toPromise();
  }

  private TranslateGuildAwardsName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/guildawardsname.json?t=' + date).toPromise();
  }

  private TranslateGuildAwardsDescription() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/guildawardsdescription.json?t=' + date).toPromise();
  }

  private TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/questtitle.json?t=' + date).toPromise();
  }

  private TranslateTowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/towertitle.json?t=' + date).toPromise();
  }

  private TranslateTowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/en/towerfloortitle.json?t=' + date).toPromise();
  }



  /* FR Local files */
  private FR_ArtifactGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/artifactgrow.json?t=' + date).toPromise();
  }

  private FR_ArtifactName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/artifactname.json?t=' + date).toPromise();
  }

  private FR_BuffName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/buffname.json?t=' + date).toPromise();
  }

  private FR_ItemOther() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/itemother.json?t=' + date).toPromise();
  }

  private FR_JobName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/jobname.json?t=' + date).toPromise();
  }

  private FR_SkillName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/skillname.json?t=' + date).toPromise();
  }

  private FR_UnitName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/unitname.json?t=' + date).toPromise();
  }

  private FR_VisionCardName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/visioncardname.json?t=' + date).toPromise();
  }

  private FR_ItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/itemname.json?t=' + date).toPromise();
  }

  private FR_PlayerTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/playerawardsname.json?t=' + date).toPromise();
  }

  private FR_PlayerTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/playerawardsdescription.json?t=' + date).toPromise();
  }

  private FR_GuildTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/guildawardsname.json?t=' + date).toPromise();
  }

  private FR_GuildTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/guildawardsdescription.json?t=' + date).toPromise();
  }

  private FR_TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/questtitle.json?t=' + date).toPromise();
  }

  private FR_TowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/towertitle.json?t=' + date).toPromise();
  }

  private FR_TowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/fr/towerfloortitle.json?t=' + date).toPromise();
  }

  /* DE Local files */
  private DE_ArtifactGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/artifactgrow.json?t=' + date).toPromise();
  }

  private DE_ArtifactName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/artifactname.json?t=' + date).toPromise();
  }

  private DE_BuffName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/buffname.json?t=' + date).toPromise();
  }

  private DE_ItemOther() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/itemother.json?t=' + date).toPromise();
  }

  private DE_JobName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/jobname.json?t=' + date).toPromise();
  }

  private DE_SkillName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/skillname.json?t=' + date).toPromise();
  }

  private DE_UnitName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/unitname.json?t=' + date).toPromise();
  }

  private DE_VisionCardName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/visioncardname.json?t=' + date).toPromise();
  }

  private DE_ItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/itemname.json?t=' + date).toPromise();
  }

  private DE_PlayerTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/playerawardsname.json?t=' + date).toPromise();
  }

  private DE_PlayerTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/playerawardsdescription.json?t=' + date).toPromise();
  }

  private DE_GuildTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/guildawardsname.json?t=' + date).toPromise();
  }

  private DE_GuildTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/guildawardsdescription.json?t=' + date).toPromise();
  }

  private DE_TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/questtitle.json?t=' + date).toPromise();
  }

  private DE_TowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/towertitle.json?t=' + date).toPromise();
  }

  private DE_TowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/de/towerfloortitle.json?t=' + date).toPromise();
  }

  /* ES Local files */
  private ES_ArtifactGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/artifactgrow.json?t=' + date).toPromise();
  }

  private ES_ArtifactName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/artifactname.json?t=' + date).toPromise();
  }

  private ES_BuffName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/buffname.json?t=' + date).toPromise();
  }

  private ES_ItemOther() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/itemother.json?t=' + date).toPromise();
  }

  private ES_JobName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/jobname.json?t=' + date).toPromise();
  }

  private ES_SkillName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/skillname.json?t=' + date).toPromise();
  }

  private ES_UnitName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/unitname.json?t=' + date).toPromise();
  }

  private ES_VisionCardName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/visioncardname.json?t=' + date).toPromise();
  }

  private ES_ItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/itemname.json?t=' + date).toPromise();
  }

  private ES_PlayerTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/playerawardsname.json?t=' + date).toPromise();
  }

  private ES_PlayerTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/playerawardsdescription.json?t=' + date).toPromise();
  }

  private ES_GuildTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/guildawardsname.json?t=' + date).toPromise();
  }

  private ES_GuildTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/guildawardsdescription.json?t=' + date).toPromise();
  }

  private ES_TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/questtitle.json?t=' + date).toPromise();
  }

  private ES_TowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/towertitle.json?t=' + date).toPromise();
  }

  private ES_TowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/es/towerfloortitle.json?t=' + date).toPromise();
  }

  /* KO Local files */
  private KO_ArtifactGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/artifactgrow.json?t=' + date).toPromise();
  }

  private KO_ArtifactName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/artifactname.json?t=' + date).toPromise();
  }

  private KO_BuffName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/buffname.json?t=' + date).toPromise();
  }

  private KO_ItemOther() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/itemother.json?t=' + date).toPromise();
  }

  private KO_JobName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/jobname.json?t=' + date).toPromise();
  }

  private KO_SkillName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/skillname.json?t=' + date).toPromise();
  }

  private KO_UnitName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/unitname.json?t=' + date).toPromise();
  }

  private KO_VisionCardName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/visioncardname.json?t=' + date).toPromise();
  }

  private KO_ItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/itemname.json?t=' + date).toPromise();
  }

  private KO_PlayerTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/playerawardsname.json?t=' + date).toPromise();
  }

  private KO_PlayerTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/playerawardsdescription.json?t=' + date).toPromise();
  }

  private KO_GuildTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/guildawardsname.json?t=' + date).toPromise();
  }

  private KO_GuildTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/guildawardsdescription.json?t=' + date).toPromise();
  }

  private KO_TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/questtitle.json?t=' + date).toPromise();
  }

  private KO_TowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/towertitle.json?t=' + date).toPromise();
  }

  private KO_TowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/ko/towerfloortitle.json?t=' + date).toPromise();
  }

  /* ZH Local files */
  private ZH_ArtifactGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/artifactgrow.json?t=' + date).toPromise();
  }

  private ZH_ArtifactName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/artifactname.json?t=' + date).toPromise();
  }

  private ZH_BuffName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/buffname.json?t=' + date).toPromise();
  }

  private ZH_ItemOther() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/itemother.json?t=' + date).toPromise();
  }

  private ZH_JobName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/jobname.json?t=' + date).toPromise();
  }

  private ZH_SkillName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/skillname.json?t=' + date).toPromise();
  }

  private ZH_UnitName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/unitname.json?t=' + date).toPromise();
  }

  private ZH_VisionCardName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/visioncardname.json?t=' + date).toPromise();
  }

  private ZH_ItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/itemname.json?t=' + date).toPromise();
  }

  private ZH_PlayerTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/playerawardsname.json?t=' + date).toPromise();
  }

  private ZH_PlayerTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/playerawardsdescription.json?t=' + date).toPromise();
  }

  private ZH_GuildTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/guildawardsname.json?t=' + date).toPromise();
  }

  private ZH_GuildTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/guildawardsdescription.json?t=' + date).toPromise();
  }

  private ZH_TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/questtitle.json?t=' + date).toPromise();
  }

  private ZH_TowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/towertitle.json?t=' + date).toPromise();
  }

  private ZH_TowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/zh/towerfloortitle.json?t=' + date).toPromise();
  }



  private JP_ArtifactGrow() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/artifactgrow.json?t=' + date).toPromise();
  }

  private JP_ArtifactName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/artifactname.json?t=' + date).toPromise();
  }

  private JP_BuffName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/buffname.json?t=' + date).toPromise();
  }

  private JP_ItemOther() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/itemother.json?t=' + date).toPromise();
  }

  private JP_JobName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/jobname.json?t=' + date).toPromise();
  }

  private JP_SkillName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/skillname.json?t=' + date).toPromise();
  }

  private JP_UnitName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/unitname.json?t=' + date).toPromise();
  }

  private JP_VisionCardName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/visioncardname.json?t=' + date).toPromise();
  }

  private JP_ItemName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/itemname.json?t=' + date).toPromise();
  }

  private JP_PlayerTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/playerawardsname.json?t=' + date).toPromise();
  }

  private JP_PlayerTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/playerawardsdescription.json?t=' + date).toPromise();
  }

  private JP_GuildTitleName() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/guildawardsname.json?t=' + date).toPromise();
  }

  private JP_GuildTitleDesc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/guildawardsdescription.json?t=' + date).toPromise();
  }

  private JP_TranslateQuestTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/questtitle.json?t=' + date).toPromise();
  }

  private JP_TowerTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/towertitle.json?t=' + date).toPromise();
  }

  private JP_TowerFloorTitle() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp/towerfloortitle.json?t=' + date).toPromise();
  }



  private JP_Romaji() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp_romaji.json?t=' + date).toPromise();
  }

  private JP_Titles_Name() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp_titles_name.json?t=' + date).toPromise();
  }

  private JP_Titles_Desc() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/jp_titles_desc.json?t=' + date).toPromise();
  }



  private GL_Maps() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/map/gl/maps.json?t=' + date).toPromise();
  }

  private JP_Maps() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/map/jp/maps.json?t=' + date).toPromise();
  }



  private GL_Grids() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/map/gl/grids.json?t=' + date).toPromise();
  }

  private JP_Grids() {
    const date = new Date();
    return this.http.get('http://data.local-wotv-chain.com/map/jp/grids.json?t=' + date).toPromise();
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

      this.GLPlayersAward(),
      this.GLGuildsAward(),
      this.JPPlayersAward(),
      this.JPGuildsAward(),
      this.TranslatePlayerAwardsName(),
      this.TranslatePlayerAwardsDescription(),
      this.TranslateGuildAwardsName(),
      this.TranslateGuildAwardsDescription(),

      this.GLJobLvTbl(),
      this.JPJobLvTbl(),

      this.GLJobMaterialItem(),
      this.JPJobMaterialItem(),

      this.GLUnitMaterialItem(),
      this.JPUnitMaterialItem(),

      this.GLUnitClassChangeCondition(),
      this.JPUnitClassChangeCondition(),

      this.GLRaidBonusUnit(),
      this.GLRaidBonusCard(),
      this.JPRaidBonusUnit(),
      this.JPRaidBonusCard(),

      this.GLQuests(),
      this.JPQuests(),

      this.FR_ArtifactGrow(),
      this.FR_ArtifactName(),
      this.FR_BuffName(),
      this.FR_ItemOther(),
      this.FR_JobName(),
      this.FR_SkillName(),
      this.FR_UnitName(),
      this.FR_VisionCardName(),
      this.FR_ItemName(),
      this.FR_PlayerTitleName(),
      this.FR_PlayerTitleDesc(),
      this.FR_GuildTitleName(),
      this.FR_GuildTitleDesc(),

      this.JP_ArtifactGrow(),
      this.JP_ArtifactName(),
      this.JP_BuffName(),
      this.JP_ItemOther(),
      this.JP_JobName(),
      this.JP_SkillName(),
      this.JP_UnitName(),
      this.JP_VisionCardName(),
      this.JP_ItemName(),
      this.JP_PlayerTitleName(),
      this.JP_PlayerTitleDesc(),
      this.JP_GuildTitleName(),
      this.JP_GuildTitleDesc(),

      this.JP_Romaji(),
      this.JP_Titles_Name(),
      this.JP_Titles_Desc(),
      this.GL_Maps(),

      this.TranslateQuestTitle(),
      this.FR_TranslateQuestTitle(),
      this.JP_TranslateQuestTitle(),

      this.GLQuestMissions(),
      this.JPQuestMissions(),

      this.GL_Grids(),
      this.JP_Grids(),

      this.JP_Maps(),

      this.GLTowerFloors(),
      this.GLTowerRewards(),
      this.JPTowerFloors(),
      this.JPTowerRewards(),
      this.TranslateTowerTitle(),
      this.TranslateTowerFloorTitle(),
      this.FR_TowerTitle(),
      this.FR_TowerFloorTitle(),
      this.JP_TowerTitle(),
      this.JP_TowerFloorTitle(),

      this.ZH_ArtifactGrow(),
      this.ZH_ArtifactName(),
      this.ZH_BuffName(),
      this.ZH_ItemOther(),
      this.ZH_JobName(),
      this.ZH_SkillName(),
      this.ZH_UnitName(),
      this.ZH_VisionCardName(),
      this.ZH_ItemName(),
      this.ZH_PlayerTitleName(),
      this.ZH_PlayerTitleDesc(),
      this.ZH_GuildTitleName(),
      this.ZH_GuildTitleDesc(),
      this.ZH_TranslateQuestTitle(),
      this.ZH_TowerTitle(),
      this.ZH_TowerFloorTitle(),

      this.KO_ArtifactGrow(),
      this.KO_ArtifactName(),
      this.KO_BuffName(),
      this.KO_ItemOther(),
      this.KO_JobName(),
      this.KO_SkillName(),
      this.KO_UnitName(),
      this.KO_VisionCardName(),
      this.KO_ItemName(),
      this.KO_PlayerTitleName(),
      this.KO_PlayerTitleDesc(),
      this.KO_GuildTitleName(),
      this.KO_GuildTitleDesc(),
      this.KO_TranslateQuestTitle(),
      this.KO_TowerTitle(),
      this.KO_TowerFloorTitle(),

      this.DE_ArtifactGrow(),
      this.DE_ArtifactName(),
      this.DE_BuffName(),
      this.DE_ItemOther(),
      this.DE_JobName(),
      this.DE_SkillName(),
      this.DE_UnitName(),
      this.DE_VisionCardName(),
      this.DE_ItemName(),
      this.DE_PlayerTitleName(),
      this.DE_PlayerTitleDesc(),
      this.DE_GuildTitleName(),
      this.DE_GuildTitleDesc(),
      this.DE_TranslateQuestTitle(),
      this.DE_TowerTitle(),
      this.DE_TowerFloorTitle(),

      this.ES_ArtifactGrow(),
      this.ES_ArtifactName(),
      this.ES_BuffName(),
      this.ES_ItemOther(),
      this.ES_JobName(),
      this.ES_SkillName(),
      this.ES_UnitName(),
      this.ES_VisionCardName(),
      this.ES_ItemName(),
      this.ES_PlayerTitleName(),
      this.ES_PlayerTitleDesc(),
      this.ES_GuildTitleName(),
      this.ES_GuildTitleDesc(),
      this.ES_TranslateQuestTitle(),
      this.ES_TowerTitle(),
      this.ES_TowerFloorTitle(),

      this.GLSkillExc(),
      this.JPSkillExc()
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
      this.gl.playerTitles = this.formatJson(responses[53]);
      this.gl.guildTitles = this.formatJson(responses[54]);
      this.gl.jobsTbl = this.formatJson(responses[61]);
      this.gl.jobsMaterials = this.formatJson(responses[63]);
      this.gl.unitsMaterials = this.formatJson(responses[65]);
      this.gl.unitClassChangeCondition = this.formatJson(responses[67]);
      this.gl.raidBonusUnit = this.formatJson(responses[69]);
      this.gl.raidBonusCard = this.formatJson(responses[70]);
      this.gl.quests = this.formatJson(responses[73]);
      this.gl.questMissions = this.formatJson(responses[108]);
      this.gl.grids = responses[110];
      this.gl.maps = responses[104];
      this.gl.towerFloors = this.formatJson(responses[113]);
      this.gl.towerRewards = this.formatJson(responses[114]);
      this.gl.skillExc = this.formatJson(responses[187]);

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
      this.jp.playerTitles = this.formatJson(responses[55]);
      this.jp.guildTitles = this.formatJson(responses[56]);
      this.jp.jobsTbl = this.formatJson(responses[62]);
      this.jp.jobsMaterials = this.formatJson(responses[64]);
      this.jp.unitsMaterials = this.formatJson(responses[66]);
      this.jp.unitClassChangeCondition = this.formatJson(responses[68]);
      this.jp.raidBonusUnit = this.formatJson(responses[71]);
      this.jp.raidBonusCard = this.formatJson(responses[72]);
      this.jp.quests = this.formatJson(responses[74]);
      this.jp.questMissions = this.formatJson(responses[109]);
      this.jp.grids = responses[111];
      this.jp.maps = responses[112];
      this.jp.towerFloors = this.formatJson(responses[115]);
      this.jp.towerRewards = this.formatJson(responses[116]);
      this.jp.skillExc = this.formatJson(responses[188]);

      this.names.en.unit = this.formatNames(responses[26]);
      this.names.en.job = this.formatNames(responses[27]);
      this.names.en.skill = this.formatNames(responses[28]);
      this.names.en.buff = this.formatNames(responses[29]);
      this.names.en.equipment = this.formatNames(responses[30]);
      this.names.en.visionCard = this.formatNames(responses[31]);
      this.names.en.itemOther = this.formatNames(responses[32]);
      this.names.en.equipmentGrow = this.formatNames(responses[33]);
      this.names.en.item = this.formatNames(responses[44]);
      this.names.en.playerTitleName = this.formatNames(responses[57]);
      this.names.en.playerTitleDesc = this.formatNames(responses[58]);
      this.names.en.guildTitleName = this.formatNames(responses[59]);
      this.names.en.guildTitleDesc = this.formatNames(responses[60]);
      this.names.en.questTitle = this.formatNames(responses[105]);
      this.names.en.towerTitle = this.formatNames(responses[117]);
      this.names.en.towerFloorTitle = this.formatNames(responses[118]);

      this.names.fr.equipmentGrow = this.formatNames(responses[75]);
      this.names.fr.equipment = this.formatNames(responses[76]);
      this.names.fr.buff = this.formatNames(responses[77]);
      this.names.fr.itemOther = this.formatNames(responses[78]);
      this.names.fr.job = this.formatNames(responses[79]);
      this.names.fr.skill = this.formatNames(responses[80]);
      this.names.fr.unit = this.formatNames(responses[81]);
      this.names.fr.visionCard = this.formatNames(responses[82]);
      this.names.fr.item = this.formatNames(responses[83]);
      this.names.fr.playerTitleName = this.formatNames(responses[84]);
      this.names.fr.playerTitleDesc = this.formatNames(responses[85]);
      this.names.fr.guildTitleName = this.formatNames(responses[86]);
      this.names.fr.guildTitleDesc = this.formatNames(responses[87]);
      this.names.fr.questTitle = this.formatNames(responses[106]);
      this.names.fr.towerTitle = this.formatNames(responses[119]);
      this.names.fr.towerFloorTitle = this.formatNames(responses[120]);

      this.names.zh.equipmentGrow = this.formatNames(responses[123]);
      this.names.zh.equipment = this.formatNames(responses[124]);
      this.names.zh.buff = this.formatNames(responses[125]);
      this.names.zh.itemOther = this.formatNames(responses[126]);
      this.names.zh.job = this.formatNames(responses[127]);
      this.names.zh.skill = this.formatNames(responses[128]);
      this.names.zh.unit = this.formatNames(responses[129]);
      this.names.zh.visionCard = this.formatNames(responses[130]);
      this.names.zh.item = this.formatNames(responses[131]);
      this.names.zh.playerTitleName = this.formatNames(responses[132]);
      this.names.zh.playerTitleDesc = this.formatNames(responses[133]);
      this.names.zh.guildTitleName = this.formatNames(responses[134]);
      this.names.zh.guildTitleDesc = this.formatNames(responses[135]);
      this.names.zh.questTitle = this.formatNames(responses[136]);
      this.names.zh.towerTitle = this.formatNames(responses[137]);
      this.names.zh.towerFloorTitle = this.formatNames(responses[138]);

      this.names.ko.equipmentGrow = this.formatNames(responses[139]);
      this.names.ko.equipment = this.formatNames(responses[140]);
      this.names.ko.buff = this.formatNames(responses[141]);
      this.names.ko.itemOther = this.formatNames(responses[142]);
      this.names.ko.job = this.formatNames(responses[143]);
      this.names.ko.skill = this.formatNames(responses[144]);
      this.names.ko.unit = this.formatNames(responses[145]);
      this.names.ko.visionCard = this.formatNames(responses[146]);
      this.names.ko.item = this.formatNames(responses[147]);
      this.names.ko.playerTitleName = this.formatNames(responses[148]);
      this.names.ko.playerTitleDesc = this.formatNames(responses[149]);
      this.names.ko.guildTitleName = this.formatNames(responses[150]);
      this.names.ko.guildTitleDesc = this.formatNames(responses[151]);
      this.names.ko.questTitle = this.formatNames(responses[152]);
      this.names.ko.towerTitle = this.formatNames(responses[153]);
      this.names.ko.towerFloorTitle = this.formatNames(responses[154]);

      this.names.de.equipmentGrow = this.formatNames(responses[155]);
      this.names.de.equipment = this.formatNames(responses[156]);
      this.names.de.buff = this.formatNames(responses[157]);
      this.names.de.itemOther = this.formatNames(responses[158]);
      this.names.de.job = this.formatNames(responses[159]);
      this.names.de.skill = this.formatNames(responses[160]);
      this.names.de.unit = this.formatNames(responses[161]);
      this.names.de.visionCard = this.formatNames(responses[162]);
      this.names.de.item = this.formatNames(responses[163]);
      this.names.de.playerTitleName = this.formatNames(responses[164]);
      this.names.de.playerTitleDesc = this.formatNames(responses[165]);
      this.names.de.guildTitleName = this.formatNames(responses[166]);
      this.names.de.guildTitleDesc = this.formatNames(responses[167]);
      this.names.de.questTitle = this.formatNames(responses[168]);
      this.names.de.towerTitle = this.formatNames(responses[169]);
      this.names.de.towerFloorTitle = this.formatNames(responses[170]);

      this.names.es.equipmentGrow = this.formatNames(responses[171]);
      this.names.es.equipment = this.formatNames(responses[172]);
      this.names.es.buff = this.formatNames(responses[173]);
      this.names.es.itemOther = this.formatNames(responses[174]);
      this.names.es.job = this.formatNames(responses[175]);
      this.names.es.skill = this.formatNames(responses[176]);
      this.names.es.unit = this.formatNames(responses[177]);
      this.names.es.visionCard = this.formatNames(responses[178]);
      this.names.es.item = this.formatNames(responses[179]);
      this.names.es.playerTitleName = this.formatNames(responses[180]);
      this.names.es.playerTitleDesc = this.formatNames(responses[181]);
      this.names.es.guildTitleName = this.formatNames(responses[182]);
      this.names.es.guildTitleDesc = this.formatNames(responses[183]);
      this.names.es.questTitle = this.formatNames(responses[184]);
      this.names.es.towerTitle = this.formatNames(responses[185]);
      this.names.es.towerFloorTitle = this.formatNames(responses[186]);

      this.names.jp.equipmentGrow = this.formatNames(responses[88]);
      this.names.jp.equipment = this.formatNames(responses[89]);
      this.names.jp.buff = this.formatNames(responses[90]);
      this.names.jp.itemOther = this.formatNames(responses[91]);
      this.names.jp.job = this.formatNames(responses[92]);
      this.names.jp.skill = this.formatNames(responses[93]);
      this.names.jp.unit = this.formatNames(responses[94]);
      this.names.jp.visionCard = this.formatNames(responses[95]);
      this.names.jp.item = this.formatNames(responses[96]);
      this.names.jp.playerTitleName = this.formatNames(responses[97]);
      this.names.jp.playerTitleDesc = this.formatNames(responses[98]);
      this.names.jp.guildTitleName = this.formatNames(responses[99]);
      this.names.jp.guildTitleDesc = this.formatNames(responses[100]);
      this.names.jp.questTitle = this.formatNames(responses[107]);
      this.names.jp.towerTitle = this.formatNames(responses[121]);
      this.names.jp.towerFloorTitle = this.formatNames(responses[122]);

      this.jpRomaji = responses[101];
      this.jpTitlesName = responses[102];
      this.jpTitlesDesc = responses[103];


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
          playerTitles: this.gl.wotvPlayerTitles,
          guildTitles: this.gl.wotvGuildTitles,
          dropRates: this.gl.wotvQuests,
          otherUnits: this.gl.wotvOtherUnits,
          skills: this.gl.wotvSkills
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
          playerTitles: this.jp.wotvPlayerTitles,
          guildTitles: this.jp.wotvGuildTitles,
          dropRates: this.jp.wotvQuests,
          otherUnits: this.jp.wotvOtherUnits,
          skills: this.jp.wotvSkills
        },
        translate: {
          jpRomaji: this.jpRomaji
        }
      };
    });
  }

  private formatJson(data) {
    const formatted = {};
    data.items.forEach(item => {
      formatted[(item.iname ? item.iname : item.type)] = item;
    });

    return formatted;
  }

  private formatNames(data) {
    const formatted = {};
    data.infos.forEach(item => {
      formatted[item.key] = item.value;
    });

    return formatted;
  }

  private formatJsons() {
    const versions = ['gl', 'jp'];
    for (let i = 0; i < versions.length; i ++) {
      this.version = versions[i];

     Object.keys(this[this.version].jobs).forEach(jobId => {
        this.addJob(this[this.version].jobs[jobId]);
      });

      Object.keys(this[this.version].units).forEach(unitId => {
        if (this[this.version].units[unitId].type === 0) {
          this.addUnit(this[this.version].units[unitId]);
        }

        if (this[this.version].units[unitId].type === 1 && unitId !== 'UN_FF10_S_VLFR') {
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

      Object.keys(this[this.version].items).forEach(itemId => {
        this.addItem(this[this.version].items[itemId]);
      });

      this.formatMasterRanks();

      this.formatTitles();

      this.formatQuests();
      this.formatTowers();

      this.formatRaid();

      this.exportGLexclusiveToJP();
    }
  }

  private addJob(job) {
    const dataId = job.iname;
    this[this.version].wotvJobs[dataId] = {
      dataId: dataId,
      names: {},
      statsModifiers: [],
      image: job.cc_icon ? job.cc_icon.toLowerCase() : job.mdl.toLowerCase(),
      subRate: job.sub_rate,
      equipments: {
        weapons: [],
        armors: []
      },
      materials: this.getJobMaterials(job)
    };

    this.getNames(this[this.version].wotvJobs[dataId], 'job', false);

    if (this.version === 'gl') {
      if (this.names.en['job'][dataId] || this.names.en['job'][dataId + '_FIRE']) {
        this[this.version].wotvJobs[dataId].names.en = this.names.en['job'][dataId] ? this.names.en['job'][dataId] : this.names.en['job'][dataId + '_FIRE'];
        this[this.version].wotvJobs[dataId].names.fr = this.names.fr['job'][dataId] ? this.names.fr['job'][dataId] : this.names.fr['job'][dataId + '_FIRE'];
        this[this.version].wotvJobs[dataId].names.es = this.names.es['job'][dataId] ? this.names.es['job'][dataId] : this.names.es['job'][dataId + '_FIRE'];
        this[this.version].wotvJobs[dataId].names.de = this.names.de['job'][dataId] ? this.names.de['job'][dataId] : this.names.de['job'][dataId + '_FIRE'];
        this[this.version].wotvJobs[dataId].names.ko = this.names.ko['job'][dataId] ? this.names.ko['job'][dataId] : this.names.ko['job'][dataId + '_FIRE'];
        this[this.version].wotvJobs[dataId].names.zh = this.names.zh['job'][dataId] ? this.names.zh['job'][dataId] : this.names.zh['job'][dataId + '_FIRE'];
      } else {
        this[this.version].wotvJobs[dataId].names.en = dataId;
        this[this.version].wotvJobs[dataId].names.fr = dataId;
        this[this.version].wotvJobs[dataId].names.es = dataId;
        this[this.version].wotvJobs[dataId].names.de = dataId;
        this[this.version].wotvJobs[dataId].names.ko = dataId;
        this[this.version].wotvJobs[dataId].names.zh = dataId;
      }
    } else {
      if (this.names.en['job'][dataId] || this.names.en['job'][dataId + '_FIRE']) {
        this[this.version].wotvJobs[dataId].names.en = this.names.en['job'][dataId] ? this.names.en['job'][dataId] : this.names.en['job'][dataId + '_FIRE'];
      } else if (this.names.jp['job'][dataId] || this.names.jp['job'][dataId + '_FIRE']) {
        this[this.version].wotvJobs[dataId].names.en = this.names.jp['job'][dataId] ? this.names.jp['job'][dataId] : this.names.jp['job'][dataId + '_FIRE'];
      } else {
        this[this.version].wotvJobs[dataId].names.en = dataId;
      }
    }

    job.equips.forEach(equip => {
      if (this.equipmentService.isWeapon(this.jobEquip[equip])) {
        this[this.version].wotvJobs[dataId].equipments.weapons.push(this.jobEquip[equip]);
      } else {
        this[this.version].wotvJobs[dataId].equipments.armors.push(this.jobEquip[equip]);
      }
    });

    let ranks = job.ranks;
    if (ranks.length < 10 && job.origin && this[this.version].jobs[job.origin]) {
      ranks = this[this.version].jobs[job.origin].ranks;
    }

    ranks.forEach(rank => {
      const rankModifiers = {};
      this.jobStats.forEach(stat => {
        rankModifiers[this.stats.unit[stat]] = rank[stat];
      });

      this[this.version].wotvJobs[dataId].statsModifiers.push(rankModifiers);
    });
  }

  private getJobMaterials(job) {
    const materials = [];
    const dataId = job.lvtbl_main;

    if (this[this.version].jobsTbl[dataId] && this[this.version].jobsTbl[dataId].items) {
      for (let i = 1; i <= 10; i++) {
        if (this[this.version].jobsTbl[dataId].items['m' + i]) {
          const materialTbl = this[this.version].jobsMaterials[this[this.version].jobsTbl[dataId].items['m' + i]];

          materialTbl.items.forEach((level, levelIndex) => {
            if (i === 1) {
              materials.push({});
            }

            if (levelIndex !== 0) {
              if (level['m1'].iname) {
                materials[levelIndex][level['m1'].iname] = level['m1'].num;
              }
            }
          });
        }
      }
    }

    if (this[this.version].unitClassChangeCondition[job.iname]) {
      const materialItemId = this[this.version].unitClassChangeCondition[job.iname].material_item_id;
      const unitMaterials = this[this.version].unitsMaterials[materialItemId];

      for (let j = 1; j <= 10; j++) {
        if (unitMaterials.items[0]['m' + j]) {
          if (!materials[0][unitMaterials.items[0]['m' + j].iname]) {
            materials[0][unitMaterials.items[0]['m' + j].iname] = unitMaterials.items[0]['m' + j].num;
          } else {
            materials[0][unitMaterials.items[0]['m' + j].iname] += unitMaterials.items[0]['m' + j].num;
          }
        }
      }
    }

    job.ranks.forEach((rank, rankIndex) => {
      if (rank.eqid1) {
        const material = rank.eqid1.split(',');
        if (!materials[rankIndex][material[0]]) {
          materials[rankIndex][material[0]] = parseInt(material[1], 10);
        } else {
          materials[rankIndex][material[0]] += parseInt(material[1], 10);
        }
      }
    });

    return materials;
  }

  private addUnit(rawUnit) {
    const dataId = rawUnit.iname;
    const unit = {
      dataId: dataId,
      names: {},
      rarity: this.rarity[rawUnit.rare],
      jobs: rawUnit.jobsets,
      exJobs: [],
      stats: {},
      cost: rawUnit.cost,
      element: this.elements[rawUnit.elem[0]],
      image: rawUnit.charaId.toLowerCase(),
      board: {
        nodes: {},
        lines: []
      },
      replacedSkills : {},
      tmr: null
    };

    if (rawUnit.ccsets) {
      rawUnit.ccsets.forEach(exJob => {
        unit.exJobs.push(exJob.m);
      });
    }

    if (rawUnit.trust) {
      unit.tmr = rawUnit.trust;
    }

    this.getUnitImage(unit);
    this.getNames(unit, 'unit');

    this.getStats(unit, rawUnit.status, 'unit');
    this.getMoveJumpUnit(unit);
    this.getLB(unit, rawUnit.limit);
    this.getAttackSkill(unit, rawUnit.atkskl);
    this.getMasterSkill(unit, rawUnit.mstskl);
    this.getSkillsAndBuffs(unit);

    this[this.version].wotvUnits[dataId] = unit;
  }

  private getUnitImage(unit, dataId = null) {
    if (this[this.version].unitModels[dataId ? dataId : unit.dataId] && this[this.version].unitModels[dataId ? dataId : unit.dataId].img) {
      unit.image = this[this.version].unitModels[dataId ? dataId : unit.dataId].img.toLowerCase();
    }
  }

  private addVisionCard(visionCard) {
    const dataId = visionCard.iname;

    if (visionCard.type === 0) {
      const card = {
        dataId: dataId,
        names: {},
        cost: visionCard.cost,
        rarity: this.rarity[visionCard.rare],
        stats: {},
        image: visionCard.icon.toLowerCase()
      };

      this.getNames(card, 'visionCard');
      this.getStats(card, visionCard.status, 'visionCard');

      this.getVisionCardSkillsAndBuffs(card, visionCard);

      this[this.version].wotvVisionCards[dataId] = card;
    }
  }

  private getNames(item, type, getSlug = true, overwriteType = null) {
    const id = item.dataId;

    if (this.version === 'gl') {
      if (this.names.en[type][id]) {
        item.names.en = this.names.en[type][id];
        item.names.fr = this.names.fr[type][id];
        item.names.de = this.names.de[type][id];
        item.names.es = this.names.es[type][id];
        item.names.ko = this.names.ko[type][id];
        item.names.zh = this.names.zh[type][id];
      } else {
        item.names.en = id;
        item.names.fr = id;
        item.names.de = id;
        item.names.es = id;
        item.names.ko = id;
        item.names.zh = id;
      }

      if (getSlug) {
        item.slug = this.slug.slugify(item.names.en);
      }
    } else {
      let slug = null;
      let slugJP = false;

      if (type === 'unit' && this.names.en[type][id]
        || type === 'visionCard' && this.names.en[type][id]
        || type === 'equipment' && this.names.en[type][id]
        || type === 'questTitle' && this.names.en[type][id]
        || type === 'item' && this.names.en[type][id]) {
        item.names.en = this.names.jp[type][id] + ' - ' + this.names.en[type][id];
        slug = this.names.en[type][id];
      } else if (type === 'job') {
        if (this.names.en[type][id]) {
          item.names.en = this.names.en[type][id];
          slug = this.names.en[type][id];
        } else {
          item.names.en = this.names.jp[type][id];
          slug = item.names.en;
          slugJP = true;
        }
      } else if (this.names.jp[type][id]) {
        item.names.en = this.names.jp[type][id];
        slug = item.names.en;
        slugJP = true;
      } else {
        item.names.en = id;
        slug = item.names.en;
      }

      if (getSlug) {
        if (slugJP) {
          if (!this.jpRomaji[slug]) {
            this.jpTranslateService.convert(slug).then(translatedText => {
              this.jpRomaji[slug] = translatedText;
              item.slug = this.slug.slugify(translatedText);
              console.log('New JP Translate for ' + type + ' ==> "' + slug + '": "' + translatedText + '",');
            });
          } else {
            item.slug = this.slug.slugify(this.jpRomaji[slug]);
          }
        } else {
          item.slug = this.slug.slugify(slug);
        }
      }
    }

    if (getSlug) {
      let i = 0;
      let finded = true;

      while (finded) {
        finded = false;

        Object.keys(this[this.version]['wotv' + this.upperCaseFirst(overwriteType ? overwriteType : type, false) + 's']).forEach(itemId => {
          if (!finded
            && (
              (i === 0 && this[this.version]['wotv' + this.upperCaseFirst(overwriteType ? overwriteType : type, false) + 's'][itemId].slug === item.slug)
            || this[this.version]['wotv' + this.upperCaseFirst(overwriteType ? overwriteType : type, false) + 's'][itemId].slug === item.slug + '-' + i)
          ) {
            i++;
            finded = true;
          }
        });
      }

      if (i > 0) {
        item.slug = item.slug + '-' + (i);
      }
    }
  }

  private getSkillsAndBuffs(unit) {
    if (this[this.version].boards[unit.dataId]) {
      this[this.version].boards[unit.dataId].panels.forEach(item => {

        unit.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: item.panel_effect_type === 1 ? 'skill' : 'buff',
          skill: this.OLDaddSkill(unit, item)
        };
      });

      this[this.version].boards[unit.dataId].lines.forEach(line => {
        unit.board.lines.push(line.line_id);
      });
    }

    let OldUpgrades = [];

    while (Object.keys(unit.replacedSkills).length > OldUpgrades.length) {
      OldUpgrades = Object.keys(unit.replacedSkills);

      Object.keys(unit.replacedSkills).forEach(replace => {
        unit.replacedSkills[replace].forEach(upgrade => {
          if (!upgrade.newSkill.dataId) {
            let previousSkillType = 'skill';
            Object.keys(unit.board.nodes).forEach(nodeId => {
              if (unit.board.nodes[nodeId].dataId === upgrade.oldSkill) {
                previousSkillType = unit.board.nodes[nodeId].type;
              }
            });

            const fakePanelSkill = {
              value: upgrade.newSkill,
              slot: this.slots.indexOf(previousSkillType)
            };

            if (!this[this.version].skills[upgrade.newSkill].slot) {
              this[this.version].skills[upgrade.newSkill].slot = this.slots.indexOf(previousSkillType);
            }

            upgrade.newSkill = this.OLDaddSkill(unit, fakePanelSkill);
          }
        });
      });
    }
  }

  private getVisionCardSkillsAndBuffs(visionCard, rawVisionCard) {
    if (rawVisionCard.card_buffs) {
      visionCard.partyBuffs = [];
      rawVisionCard.card_buffs.forEach(dataBuff => {
        const buff = {
          classic: dataBuff.card_skill ? this.OLDaddSkill(visionCard, {slot: 0, value: dataBuff.card_skill}) : null,
          awake: dataBuff.add_card_skill_buff_awake ? this.OLDaddSkill(visionCard, {slot: 0, value: dataBuff.add_card_skill_buff_awake}) : null,
          lvmax: dataBuff.add_card_skill_buff_lvmax ? this.OLDaddSkill(visionCard, {slot: 0, value: dataBuff.add_card_skill_buff_lvmax}) : null,
          cond : dataBuff.cnds_iname ? this.addCardCond(dataBuff.cnds_iname) : []
        };

        visionCard.partyBuffs.push(buff);
      });
    }

    if (rawVisionCard.self_buffs) {
      visionCard.unitBuffs = [];
      rawVisionCard.self_buffs.forEach(dataBuff => {
        const buff = {
          classic: dataBuff.self_buff ? this.OLDaddSkill(visionCard, {slot: 0, value: dataBuff.self_buff}) : null,
          awake: dataBuff.add_self_buff_awake ? this.OLDaddSkill(visionCard, {slot: 0, value: dataBuff.add_self_buff_awake}) : null,
          lvmax: dataBuff.add_self_buff_lvmax ? this.OLDaddSkill(visionCard, {slot: 0, value: dataBuff.add_self_buff_lvmax}) : null,
          cond : dataBuff.buff_cond ? this.addCardCond(dataBuff.buff_cond) : []
        };

        visionCard.unitBuffs.push(buff);
      });
    }
  }

  private addCardCond(cond) {
    const cardCond = this[this.version].cardConditions[cond];

    if (cardCond) {
      const formattedCond = [];

      if (cardCond.births) {
        const newCond = {
          type: 'birth',
          items: []
        };

        cardCond.births.forEach(birth => {
          newCond.items.push(this.births[birth]);
        });

        formattedCond.push(newCond);
      }

      if (cardCond.elem) {
        const newCond = {
          type: 'elem',
          items: []
        };

        cardCond.elem.forEach(elem => {
          newCond.items.push(this.elements[elem]);
        });

        formattedCond.push(newCond);
      }

      if (cardCond.mainjobs) {
        const newCond = {
          type: 'job',
          items: []
        };

        cardCond.mainjobs.forEach(job => {
          newCond.items.push(job);
        });

        formattedCond.push(newCond);
      }

      if (cardCond.units) {
        const newCond = {
          type: 'unit',
          items: []
        };

        cardCond.units.forEach(unit => {
          newCond.items.push(unit);
        });

        formattedCond.push(newCond);
      }

      if (formattedCond.length === 0) {
        console.log('7 @@@@@ ' + cond);
        return null;
      }

      return formattedCond;
    } else {
      return null;
    }
  }

  private OLDaddSkill(unit, panelSkill) {
    const skill = {
      unlockStar: panelSkill.unlock_value + 1,
      unlockJob: panelSkill.get_job,
      jobLevel: panelSkill.need_level,
      jp: panelSkill.jp,
      sp: panelSkill.sp,
      effects: [],
      dataId: panelSkill.value,
      type: this.slots[(this[this.version].skills[panelSkill.value] && this[this.version].skills[panelSkill.value].slot ? this[this.version].skills[panelSkill.value].slot : 0)],
      mainSkill: this[this.version].skills[panelSkill.value] && this[this.version].skills[panelSkill.value].slot === 1,
      increaseUnitLevel: panelSkill.ival
    };

    if (panelSkill.ival) {
      skill.effects.push({
        type: 'INCREASE_UNIT_LEVEL',
        value: panelSkill.ival,
        calcType: 'fixe'
      });
    }

    this.updateSkill(unit, skill, panelSkill.value);

    if (skill.type !== 'buff' && this[this.version].skills[panelSkill.value].wth) {
      this.addWeather(unit, skill, this[this.version].skills[panelSkill.value].wth.id);
    }

    return skill;
  }

  private addSkill(skillId, item) {
    if (!this[this.version].wotvSkills[skillId] && this[this.version].skills[skillId]) {
      const rawSkill = this[this.version].skills[skillId];

      if (!this.slots[rawSkill.slot]) {
        console.log('Unknown slot -- ' + item.dataId + ' -- ' + skillId + ' -- ' + rawSkill.slot);
      }

      const skill = {
        effects: [],
        dataId: skillId,
        type: this.slots[rawSkill.slot]
      };

      this.updateSkill(item, skill, skillId);

      if (rawSkill.wth) {
        this.addWeather(item, skill, rawSkill.wth.id);
      }

      this[this.version].wotvSkills[skillId] = skill;
    }
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
      reflec: null,
      timing: null,
      crt_value: null,

      // not used
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
      def_weps: null,
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
      reftar: null, // can be reflect or reflect target ?
      fdupli: null,
      yuragi: null,

      // managed not here
      iname: null,
      slot: null,
      type: null,
      movie: null,
      wth: null
    };
    const managedData = Object.keys(dataSkill);

    if (skill.type === 'buff') {
      dataSkill.s_buffs = [skillId];
    } else if (skill.type === 'MR') {
      dataSkill.s_buffs = skill.buffIds;
    } else {
      dataSkill = this[this.version].skills[skillId];
      skill.names = {};
      if (this.skillTypes[dataSkill.type] !== 'card_passive') {
        this.getNames(skill, 'skill', false);
      }

      dataSkill.names = skill.names;

      Object.keys(dataSkill).forEach(key => {
        if (managedData.indexOf(key) === -1) {
          console.log('NOT MANAGED KEY : ' + key);
        }
      });
    }

    if (dataSkill.range_buff && dataSkill.range_buff !== 1) {
      console.log('@@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- range buff !== 1');
    }

    if (dataSkill.eff_w && dataSkill.eff_w !== 1 && dataSkill.eff_w !== 2) {
      console.log('@@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- eff_w !== 1');
    }

    if (Number.isInteger(dataSkill.target)) {
      if (!this.targetTypes[dataSkill.target]) {
        console.log('@@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- target : ' + dataSkill.target);
      }

      skill.target = this.targetTypes[dataSkill.target];
    }

    if (typeof(dataSkill.cost_type) === 'number') {
      skill.cost = {
        type: dataSkill.cost_type === 0 ? 'AP' : 'TP',
        value: dataSkill.cost_type === 0 ? dataSkill.cost_ap : dataSkill.cost_mp
      };
    }

    if (dataSkill.hp_cost) {
      skill.effects.push({
        type: 'HP_COST',
        value: dataSkill.hp_cost,
        calcType: 'percent',
        timing: 'SKILL_BEFORE'
      });
    }

    if (dataSkill.bbrk) {
      let type = 'BREAK_BARRIER';
      switch (dataSkill.bbrk) {
        case 1:
          type = type + '_GENERAL';
          break;
        case 2:
          type = type + '_PHYSIC';
          break;
        case 3:
          type = type + '_MAGIC';
          break;
        default:
          console.log('6 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- barrier : ' + dataSkill.bbrk);
          break;
      }

      skill.effects.push({
        type: type,
        target: this.targetTypes[dataSkill.target],
        timing: 'SKILL_BEFORE'
      });
    }

    if (dataSkill.acbst) {
      skill.effects.push({
        type: 'STOP_CHAIN_INCREASE_DAMAGE',
        value: dataSkill.acbst,
        timing: 'SKILL_BEFORE'
      });
    }

    if (dataSkill.reflec) {
      skill.effects.push({
        type: 'REFLECT',
        value: dataSkill.reflec.type,
        turn: dataSkill.reflec.turn,
        target: this.targetTypes[dataSkill.target],
        timing: 'SKILL_BEFORE'
      });
    }

    skill.count = dataSkill.count;

    if (skill.grow) {
      skill.maxLevel = this[this.version].grows[skill.grow].curve[0].lv;
    } else {
      skill.maxLevel = dataSkill.cap;
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
      };
    }

    if (dataSkill.atk_type) {
      skill.based = this.atkBased[dataSkill.atk_type];
    }

    if (dataSkill.eff_s || dataSkill.eff_l || dataSkill.eff_h) {
      skill.aoe = {
        s: dataSkill.eff_s,
        l: dataSkill.eff_l,
        h: dataSkill.eff_h,
        w: dataSkill.eff_w
      };
    }

    if (dataSkill.ct_spd) {
      skill.time = {
        minValue: dataSkill.ct_spd,
        maxValue: dataSkill.ct_spd1
      };
    }

    skill.hit = dataSkill.hit;
    skill.crt_hit = dataSkill.crt_hit;
    skill.pierce = dataSkill.pierce;
    skill.ctbreak = dataSkill.ctbreak; // Cancel ability activation

    if (skill.crt_value) {
      skill.effects.push({
        type: 'INCREASE_MOD',
        value: skill.crt_value,
        calcType: 'fixe',
        condition: 'ON_CRITICAL',
        timing: 'SKILL_BEFORE'
      });
    }

    if (dataSkill.combo_num) {
      skill.combo = {
        num: dataSkill.combo_num,
        rate: dataSkill.combo_rate
      };
    }

    if (dataSkill.kback) {
      skill.knockback = {
        rate: dataSkill.kback.rate,
        value: dataSkill.kback.val,
        dir: dataSkill.kback.dir
      };
    }

    if (dataSkill.hp_bonus) {
      skill.increaseDamageOnDecreaseHp = dataSkill.hp_bonus;
    }

    if (skill.type === 'counter') {
      skill.counter = {
        minValue: dataSkill.eff_rate,
        maxValue: dataSkill.eff_rate1,
        reactDamage: this.reactCounter[dataSkill.react_d_type],
        calcType: 'percent',
      };
    }

    if (dataSkill.invtag) {
      dataSkill.invtag.forEach(ignore => {
        if (!this.killers[ignore] || ignore !== 301) {
          console.log('1 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- KLSP : ' + ignore);
        }

        skill.effects.push({
          type: 'IGNORE_' + this.killers[ignore],
          timing: 'SKILL_BEFORE'
        });
      });
    }

    if (dataSkill.klsp) {
      dataSkill.klsp.forEach(killer => {
        if (!this.killers[killer]) {
          console.log('1 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- KLSP : ' + killer);
        }

        skill.effects.push({
          type: this.killers[killer] + '_KILLER',
          minValue: dataSkill.klspr,
          maxValue: dataSkill.klspr,
          calcType: 'unknow',
          timing: 'SKILL_BEFORE'
        });
      });
    }

    if (dataSkill.barrier) {
      let type = dataSkill.eff === 'ef_com_guard_02' ? 'BARRIER' : 'REDUCE_DAMAGE';
      switch (dataSkill.barrier.tar) {
        case 1:
          type = type + '_GENERAL';
          break;
        case 2:
          type = type + '_PHYSIC';
          break;
        case 3:
          type = type + '_MAGIC';
          break;
        default:
          console.log('6 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- barrier : ' + dataSkill.barrier.tar);
          break;
      }

      skill.effects.push({
        type: type,
        minValue: dataSkill.barrier.scut,
        maxValue: dataSkill.barrier.ecut,
        calcType: 'percent',
        turn: dataSkill.barrier.val,
        turnType: dataSkill.barrier.type !== 3 ? 'TURNS' : 'COUNT',
        target: this.targetTypes[dataSkill.target],
        timing: 'SKILL_AFTER'
      });
    }

    if (dataSkill.chang) {
      skill.effects.push({
        type: 'SWITCH_POS',
        timing: 'SKILL_BEFORE'
      });
    }

    if (dataSkill.move) {
      skill.effects.push({
        type: 'MOVE_UNIT',
        timing: 'SKILL_BEFORE'
      });
    }

    if (dataSkill.ctave) {
      skill.effects.push({
        type: 'AVG_CT',
        target: this.targetTypes[dataSkill.target],
        timing: 'SKILL_AFTER'
      });
    }

    if (dataSkill.stl_val) {
      skill.effects.push({
        type: 'STEAL',
        minValue: dataSkill.stl_val,
        maxValue: dataSkill.stl_val1,
        calcType: 'unknow',
        target: this.targetTypes[dataSkill.target],
          timing: 'SKILL_AFTER'
      });
    }

    if (dataSkill.replace) {
      if (!unit.replacedSkills) {
        unit.replacedSkills = {};
      }

      if (!unit.replacedSkills[skillId]) {
        unit.replacedSkills[skillId] = [];
      }

      dataSkill.replace.forEach(change => {
        unit.replacedSkills[skillId].push({
          oldSkill: change.skill_base,
          newSkill: change.skill_after
        });
      });
    }

    if (dataSkill.strength) {
      skill.maths = [];

      dataSkill.strength.forEach(strength => {
        if (!this.strengthType[strength.type]) {
          console.log('10 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- STRENGTH TYPE : ' + strength.type);
        } else if (!this.strengthFormulaCondition[strength.formula]) {
          console.log('11 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- STRENGTH FORMULA : ' + strength.formula);
        } else if (!this.strengthModifier[strength.dst]) {
          console.log('11 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- STRENGTH DST : ' + strength.dst);
        } else {
          const math = {
            type: this.strengthType[strength.type],
            formula: this.strengthType[strength.type] === 'COUNT_DAMAGE_RECEIVED' ? this.strengthFormulaCondition[1000] : this.strengthFormulaCondition[strength.formula],
            condition : strength.val1,
            value: strength.rate1,
            dst: this.strengthModifier[strength.dst],
            effects: []
          };

          if (math.type === 'EFFECT_CONDITION') {
            if (this[this.version].skillExc[strength.exc]) {
              this[this.version].skillExc[strength.exc].strcnd.forEach(rawEffect => {
                math.effects.push(this.buffTypes[rawEffect.type]);
              });
            }
          } else {
            delete math.effects;
          }

          skill.maths.push(math);
        }
      });
    }

    if ((typeof(dataSkill.eff_val) === 'number' || typeof(dataSkill.eff_val1) === 'number')
      && (dataSkill.eff_type === 1 || dataSkill.eff_type === 2 || dataSkill.eff_type === 3)
    ) {
      skill.damage = {
        minValue: dataSkill.eff_val,
        maxValue: dataSkill.eff_val1,
        type: this.damageTypes[dataSkill.atk_det],
        pool: this.damagePool[dataSkill.eff_dst],
        effType: this.damageEffectType[dataSkill.eff_type],
        formula: {
          type: dataSkill.atk_formula
        }
      };

      if (dataSkill.atk_rev && dataSkill.atk_rev === 1) {
        skill.damage.fixedDamage = true;
      }

      if (dataSkill.eff_dst && !this.damagePool[dataSkill.eff_dst]) {
        console.log('2 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- DST : ' + dataSkill.eff_dst);
      }

      if (dataSkill.elem) {
        skill.elem = [];
        dataSkill.elem.forEach(elem => {
          skill.elem.push(this.elements[elem]);
        });
      }

      if (dataSkill.atk_formula_t1 > 0) {
        skill.damage.formula[1] = dataSkill.atk_formula_t1;
      }

      if (dataSkill.atk_formula_t2 > 0) {
        skill.damage.formula[2] = dataSkill.atk_formula_t2;
      }

      if (dataSkill.atk_formula_t3 > 0) {
        skill.damage.formula[3] = dataSkill.atk_formula_t3;
      }
    }


    if (dataSkill.t_buffs || dataSkill.s_buffs) {
      const alreadyAddedBuffs = [];
      const possibleBuffs = ['t_buffs', 's_buffs'];

      possibleBuffs.forEach((dataBuffs, dataBuffsIndex) => {
        if (dataSkill[dataBuffs]) {
          const buffs = JSON.parse(JSON.stringify(dataSkill[dataBuffs]));

          let buffIndex = 0;
          const fromImbue = [];
          while (buffIndex <= buffs.length - 1) {
            const buff = buffs[buffIndex];
            let finished = false;
            let i = 1;
            let duplicateFinded = false;
            let conditionToAdd = null;

            while (!finished && buff) {
              if (this[this.version].buffs[buff]['type' + i]) {
                if (duplicateFinded && this[this.version].buffs[buff]['type' + i] === 117) {} else {
                  if (!this.buffTypes[this[this.version].buffs[buff]['type' + i]]) {
                    console.log('3 @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- EFFECT : ' + this[this.version].buffs[buff]['type' + i]);
                  }

                  if (!this.timing[this[this.version].buffs[buff].timing]) {
                    console.log('A @@@@@ ' + unit.dataId + ' -- ' + skill.names.en + ' -- EFFECT : ' + this[this.version].buffs[buff].timing);
                  }

                  if (this[this.version].buffs[buff]['id' + i]) {
                    const futurBuffId = this[this.version].buffs[this[this.version].buffs[buff]['id' + i]].iname;
                    fromImbue.push(futurBuffId);
                    buffs.push(futurBuffId);
                  }

                  if (this[this.version].buffs[buff]['tag' + i] && !this.killers[this[this.version].buffs[buff]['tag' + i]]) {
                    console.log('4 @@@@@ ' + (unit.names ? unit.dataId : unit.dataId) + ' -- ' + (skill.names ? skill.names.en : skill.dataId) + ' -- KILLER : ' + this[this.version].buffs[buff]['tag' + i]);
                  }

                  let type = this.buffTypes[this[this.version].buffs[buff]['type' + i]];
                  if (this[this.version].buffs[buff]['tag' + i] && type !== 'WATER') {
                    if (type !== 'KILLER' && type !== 'IMBUE') {
                      conditionToAdd = type;
                    }

                    type = this.killers[this[this.version].buffs[buff]['tag' + i]] + '_KILLER';
                    this[this.version].buffs[buff]['calc' + i] = 1;

                    if (this.calcType[this[this.version].buffs[buff]['calc' + i]] === 'resistance') {
                      type = type + '_RES';
                    }
                  }


                  let nullifyOrDispel = false;
                  if (this.statsAtkRes.indexOf(type) !== -1) {
                    type = type + '_' + (this.calcType[this[this.version].buffs[buff]['calc' + i]] === 'resistance' ? 'RES' : 'ATK');
                  } else if (this.ailmentStatus.indexOf(type) !== -1) {
                    const calcType = this.calcType[this[this.version].buffs[buff]['calc' + i]];
                    if (calcType === 'nullify' || calcType === 'dispel') {
                      nullifyOrDispel = true;
                      let effect = this.findEffect(skill, calcType.toUpperCase(), dataBuffsIndex);
                      if (!effect) {
                        effect = {
                          type: calcType.toUpperCase(),
                          ailments: [],
                          target: dataBuffsIndex === 0 ? skill.target : 'self',
                          timing: this.timing[this[this.version].buffs[buff].timing]
                        };

                        skill.effects.push(effect);
                        alreadyAddedBuffs.push(buff);
                      }
                      effect.ailments.push(type);
                    } else {
                      type = type + '_' + (this.calcType[this[this.version].buffs[buff]['calc' + i]] === 'resistance' ? 'RES' : 'ATK');
                    }
                  }

                  if (!nullifyOrDispel && type !== 'IMBUE') {
                    const addedBuff = {
                      type: type,
                      minValue: this[this.version].buffs[buff]['val' + i],
                      maxValue: this[this.version].buffs[buff]['val' + i + '1'],
                      calcType: this.calcType[this[this.version].buffs[buff]['calc' + i]] ? this.calcType[this[this.version].buffs[buff]['calc' + i]] : 'unknow',
                      rate: this[this.version].buffs[buff].rate,
                      turn: this[this.version].buffs[buff].turn,
                      fromImbue: false,
                      condition: null,
                      increaseMax: false,
                      target: dataBuffsIndex === 0 ? skill.target : 'self',
                      timing: this.timing[this[this.version].buffs[buff].timing],
                      buffOnCondition: null
                    };

                    if (type === 'MASS_DISPEL') {
                      switch (this[this.version].buffs[buff]['calc' + i]) {
                        case 32 :
                          addedBuff.calcType = 'buffs';
                          break;
                        case 33 :
                          addedBuff.calcType = 'debuffs';
                          break;
                      }
                    }

                    if (fromImbue.indexOf(this[this.version].buffs[buff].iname) !== -1) {
                      addedBuff.fromImbue = true;
                    } else {
                      delete addedBuff.fromImbue;
                    }

                    if (this[this.version].buffs[buff].conds) {
                      addedBuff.condition = this.conditions[this[this.version].buffs[buff].conds[0]];
                    } else {
                      delete addedBuff.condition;
                    }

                    if (conditionToAdd) {
                      addedBuff.buffOnCondition = conditionToAdd;
                    }

                    if (addedBuff.timing === 'ON_CRITICAL') {
                      if (addedBuff.buffOnCondition !== null) {
                        console.log('ALERT 2 condition on same buff');
                        console.log(this[this.version].buffs[buff]);
                      }

                      addedBuff.buffOnCondition = 'ON_CRITICAL';
                      addedBuff.timing = 'SKILL_AFTER';
                    }

                    if (addedBuff.buffOnCondition === null) {
                      delete addedBuff.buffOnCondition;
                    }

                    if (this[this.version].buffs[buff]['calc' + i] === 2) {
                      addedBuff.increaseMax = true;
                    } else {
                      delete addedBuff.increaseMax;
                    }

                    if (skill.type === 'buff' || skill.type === 'masterSkill' || skill.type === 'support' || skill.type === 'party') {
                      delete addedBuff.timing;
                    }

                    /*if (skill.type === undefined) {
                      console.log('SKILL TYPE undefined');
                      console.log(skill);
                    }*/

                    if (type === 'CONDITION_FOR_REFLECT'
                      || type === 'CONDITION_FOR_UPGRADE_SKILL'
                      || type === 'CONDITION_FOR_GRANT_BUFF'
                    ) {
                      addedBuff.calcType = this.conditions[this[this.version].buffs[buff]['calc' + i]];
                    }

                    skill.effects.push(addedBuff);
                    alreadyAddedBuffs.push(buff);
                  }

                  if (this[this.version].buffs[buff]['type' + i] === 116) {
                    duplicateFinded = true;
                  }
                }

                i++;
              } else {
                finished = true;
              }
            }

            buffIndex++;
          }
        }
      });
    }
  }

  private findEffect(skill, type, buffIndex) {
    let findedEffect = null;

    skill.effects.forEach(effect => {
      if (effect.type === type &&
        ((buffIndex === 0 && effect.target !== 'self') || (buffIndex !== 0 && effect.target === 'self'))) {
        findedEffect = effect;
      }
    });

    return findedEffect;
  }

  private getStats(unit, stats, type) {
    Object.keys(this.stats[type]).forEach(stat => {
      unit.stats[this.stats[type][stat]] = {
        min: stats[0][stat],
        max: stats[1][stat]
      };

      if (stats[2]) {
        unit.stats[this.stats[type][stat]].ex = stats[2][stat];
      }
    });
  }

  private getMoveJumpUnit(unit) {
    unit.stats.JUMP = {
      'min': this[this.version].jobs[unit.jobs[0]].jump,
      'max': this[this.version].jobs[unit.jobs[0]].jump,
      'ex': this[this.version].jobs[unit.exJobs[0]] ? this[this.version].jobs[unit.exJobs[0]].jump : null
    };

    unit.stats.MOVE = {
      'min': this[this.version].jobs[unit.jobs[0]].move,
      'max': this[this.version].jobs[unit.jobs[0]].move,
      'ex': this[this.version].jobs[unit.exJobs[0]] ? this[this.version].jobs[unit.exJobs[0]].move : null
    };
  }

  private getLB(unit, lbId) {
    if (lbId) {
      const limit = {
        names: {},
        effects: [],
        dataId: lbId,
        type: 'limit'
      };
      this.updateSkill(unit, limit, lbId);

      unit.limit = limit;
    }
  }

  private getAttackSkill(unit, attackId) {
    if (attackId) {
      const attack = {
        names: {},
        effects: [],
        dataId: attackId,
        damage: {
          minValue: 0,
          maxValue: 0
        },
        elem: [],
        type: 'skill'
      };

      let modifiedAttack = false;
      if (!this[this.version].skills[attackId].eff_val) {
        this[this.version].skills[attackId].eff_val = 1;
        this[this.version].skills[attackId].eff_val1 = 1;
        modifiedAttack = true;
      }

      this.updateSkill(unit, attack, attackId);

      if (modifiedAttack) {
        attack.damage.minValue = 0;
        attack.damage.maxValue = 0;
        attack.elem = ['neutral'];
      }

      if (attack.elem.length === 0) {
        attack.elem = ['neutral'];
      }

      unit.attack = attack;
    }
  }

  private getMasterSkill(unit, skillId) {
    if (skillId) {
      if (Array.isArray(skillId)) {
        unit.masterSkill = [];

        skillId.forEach(id => {
          const masterSkill = {
            names: {},
            effects: [],
            dataId: id,
            type: 'masterSkill'
          };
          this.updateSkill(unit, masterSkill, id);

          unit.masterSkill.push(masterSkill);
        });
      } else {
        const masterSkill = {
          names: {},
          effects: [],
          dataId: skillId,
          type: 'masterSkill'
        };
        this.updateSkill(unit, masterSkill, skillId);

        unit.masterSkill =  [masterSkill];
      }
    }
  }

  private addEsper(esper) {
    const dataId = esper.iname;
    this[this.version].wotvEspers[dataId] = {
      dataId: dataId,
      names: {},
      rarity: this.esperService.findRarity(dataId),
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
      this.OLDaddSkill(this[this.version].wotvEspers[dataId], {slot: 1, value: esper.atkskl})
    ];
    this.getUnitImage(this[this.version].wotvEspers[dataId]);

    this.getNames(this[this.version].wotvEspers[dataId], 'unit');

    this.getEsperStats(esper, 'esper');
    this.getEspersSkillsAndBuffs(this[this.version].wotvEspers[dataId]);
    this.getEspersSPs(this[this.version].wotvEspers[dataId], esper, esper.nb_lv_tbl);
  }

  private getEsperStats(esper, type) {
    let maxUnit = esper;
    if (maxUnit.nb_awake_id) {
      maxUnit = this[this.version].units[maxUnit.nb_awake_id[maxUnit.nb_awake_id.length - 1]];
    }

    Object.keys(this.stats[type]).forEach(stat => {
      this[this.version].wotvEspers[esper.iname].stats[this.stats[type][stat]] = [
        {
          min: esper.status[0][stat],
          max: esper.status[1][stat]
        }
      ];

      esper.nb_awake_id.forEach(esperId => {
        this[this.version].wotvEspers[esper.iname].stats[this.stats[type][stat]].push({
          min: this[this.version].units[esperId].status[0][stat],
          max: this[this.version].units[esperId].status[1][stat]
        });
      });
    });
  }

  private getEspersSkillsAndBuffs(esper) {
    if (this[this.version].espersBoards[esper.dataId]) {
      this[this.version].espersBoards[esper.dataId].panels.forEach(item => {
        esper.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: 'buff',
          skill: this.OLDaddSkill(esper, item)
        };
      });

      this[this.version].espersBoards[esper.dataId].lines.forEach(line => {
        esper.board.lines.push(line.line_id);
      });
    }
  }

  private addWeather(unit, skill, weatherId) {
    const alreadyAddedBuffs = [];

    this[this.version].weathers[weatherId].buffs.forEach(buff => {
      let weatherFinished = false;
      let j = 1;
      while (!weatherFinished) {
        if (buff['buff' + j]) {
          if (alreadyAddedBuffs.indexOf(buff['buff' + j]) === -1) {
            let finished = false;
            let i = 1;
            while (!finished) {
              if (this[this.version].buffs[buff['buff' + j]]['type' + i]) {

                if (!this.buffTypes[this[this.version].buffs[buff['buff' + j]]['type' + i]]) {
                  console.log('5 @@@@@ ' + unit.names.en + ' -- EFFECT : ' + this[this.version].buffs[buff['buff' + j]]['type' + i]);
                }

                let type = this.buffTypes[this[this.version].buffs[buff['buff' + j]]['type' + i]];
                if (this.statsAtkRes.indexOf(type) !== -1) {
                  type = type + '_' + (this.calcType[this[this.version].buffs[buff['buff' + j]]['calc' + i]] === 'resistance' ? 'RES' : 'ATK');
                }

                const formattedBuff = {
                  side: buff.side === 1 ? 'TEAM' : 'ENNEMIES',
                  type: type,
                  minValue: this[this.version].buffs[buff['buff' + j]]['val' + i],
                  maxValue: this[this.version].buffs[buff['buff' + j]]['val' + i + '1'],
                  calcType: this.calcType[this[this.version].buffs[buff['buff' + j]]['calc' + i]] ? this.calcType[this[this.version].buffs[buff['buff' + j]]['calc' + i]] : 'unknow',
                  dataId: buff['buff' + j],
                  clock: this[this.version].weathers[weatherId].clock_time,
                  timing: 'WEATHER'
                };

                if (buff.elem) {
                  // @ts-ignore
                  formattedBuff.elements = [];
                  buff.elem.forEach(element => {
                    // @ts-ignore
                    formattedBuff.elements.push(this.elements[element]);
                  });
                }

                skill.effects.push(formattedBuff);
                alreadyAddedBuffs.push(buff['buff' + j]);

                i++;
              } else {
                finished = true;
              }
            }
          } else {
            if (buff.elem) {
              skill.effects.forEach(effect => {
                if (effect.dataId === buff['buff' + j]) {
                  buff.elem.forEach(element => {
                    if (!effect.elements) {
                      effect.elements = [this.elements[element]];
                    } else if (effect.elements.indexOf(this.elements[element]) === -1) {
                      effect.elements.push(this.elements[element]);
                    }
                  });
                }
              });
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

      this[this.version].espersTbl[tblId]['awake' + awake].forEach(SP => {
        esper.SPs[awake - 1].push(SP.sp);
      });
    }
  }

  private addEquipment(rawEquipment) {
    const dataId = rawEquipment.iname;
    let rType = rawEquipment.rtype !== 'AF_LOT_50' && rawEquipment.rtype !== 'AF_LOT_TRUST' ? rawEquipment.rtype : dataId;

    // @TODO Manage via recipe !!

    if (rType === 'AF_LOT_LW_HLM_005' || rType === 'AF_LOT_LW_RNG_007') {
      const splitDataId = dataId.split('_');
      rType = dataId;
      if (splitDataId[splitDataId.length - 1] === '1' || splitDataId[splitDataId.length - 1] === '2' || splitDataId[splitDataId.length - 1] === '3' || splitDataId[splitDataId.length - 1] === '4' || splitDataId[splitDataId.length - 1] === '5') {
        splitDataId.pop();
        rType = splitDataId.join('_');
      }
    }

    if (!this[this.version].wotvEquipments[rType]) {
      const equipment = {
        names: {},
        slug: this.slug.slugify(this.names.en.equipment[dataId]),
        stats: {},
        type: this.jobEquip[this[this.version].equipments[dataId].cat[0]],
        dataId: dataId,
        grows: {},
        skills: [],
        rarity: this.rarity[rawEquipment.rare],
        image: this[this.version].equipments[dataId].asset.toLowerCase(),
        equippableJobs: [],
        equippableUnits: [],
        materials: [],
        acquisition: null
      };

      this.getNames(equipment, 'equipment');

      if (rawEquipment.equip) {
        if (this[this.version].EquipmentCond[rawEquipment.equip]) {
          if (this[this.version].EquipmentCond[rawEquipment.equip].jobs) {
            this[this.version].EquipmentCond[rawEquipment.equip].jobs.forEach(job => {
              equipment.equippableJobs.push(job);
            });
          }

          if (this[this.version].EquipmentCond[rawEquipment.equip].units) {
            this[this.version].EquipmentCond[rawEquipment.equip].units.forEach(unit => {
              equipment.equippableUnits.push(unit);
            });
          }
        } else {
          const uniqJobs = [];
          Object.keys(this[this.version].wotvJobs).forEach(jobId => {
            const tableJob = jobId.split('_');
            const genericDataId = tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2];

            if (uniqJobs.indexOf(genericDataId) === -1) {
              uniqJobs.push(genericDataId);
              equipment.equippableJobs.push(jobId);
            }
          });
        }
      }

      if (rawEquipment.trust) {
        let unitId = null;
        let i = 0;
        const unitIds = Object.keys(this[this.version].wotvUnits);

        while (!unitId && i < unitIds.length) {
          if (this[this.version].wotvUnits[unitIds[i]].tmr === dataId) {
            unitId = unitIds[i];
          }

          i++;
        }

        if (unitId) {
          equipment.acquisition = {
            type: 'tmr',
            unitId: unitId
          };
        } else {
          equipment.acquisition = {
            type: 'Unknown'
          };
        }
      } else if (this[this.version].equipmentRecipes[dataId]) {
        const recipe = this[this.version].equipmentRecipes[dataId];
        if (this.names.en.itemOther[recipe.recipe] && this.names.en.itemOther[recipe.recipe] !== '') {
          equipment.acquisition = {
            type: {
              en: this.names.en.itemOther[recipe.recipe],
              fr: this.names.fr.itemOther[recipe.recipe],
              es: this.names.es.itemOther[recipe.recipe],
              de: this.names.de.itemOther[recipe.recipe],
              ko: this.names.ko.itemOther[recipe.recipe],
              zh: this.names.zh.itemOther[recipe.recipe]
            }
          };
        }
      } else {
        // console.log("NO RECEIPE !!!")
        // console.log(equipment)
      }

      if (!equipment.acquisition) {
        equipment.acquisition = {
          type: 'Unknown'
        };
      }

      if (this[this.version].equipementLots[rawEquipment.rtype]) {
        for (let i = 1; i <= 3; i++) {
          const growId = this[this.version].equipementLots[rawEquipment.rtype].lot[0]['grow' + i];
          if (growId) {
            equipment.grows[growId] = {
              dataId: growId,
              names: {},
              curve: {}
            };
            this.getNames(equipment.grows[growId], 'equipmentGrow', false);

            Object.keys(this[this.version].grows[growId].curve[0]).forEach(stat => {
              if (this.stats.unit[stat]) {
                equipment.grows[growId].curve[this.stats.unit[stat]] = this[this.version].grows[growId].curve[0][stat];
              }
            });
          }
        }
      }

      Object.keys(this[this.version].equipments[dataId].status[0]).forEach(stat => {
        if (this[this.version].equipments[dataId].status[0][stat] !== 0
          || (this[this.version].equipments[dataId].status[1]
            && typeof(this[this.version].equipments[dataId].status[1][stat]) === 'number'
            && this[this.version].equipments[dataId].status[1][stat] !== 0)
        ) {
          equipment.stats[this.stats.unit[stat]] = {
            min: this[this.version].equipments[dataId].status[0][stat],
            max: this[this.version].equipments[dataId].status[1] ? this[this.version].equipments[dataId].status[1][stat] : this[this.version].equipments[dataId].status[0][stat]
          };
        }
      });

      this[this.version].wotvEquipments[rType] = equipment;
    }

    this[this.version].wotvEquipments[rType].materials.push(this.getEquipmentMaterials(dataId));

    const skills = [];
    let countSkill = 0;
    const skillsPos = {};
    for (let i = 1; i <= 5; i++) {
      if (this[this.version].equipments[dataId]['skl' + i]) {
        this[this.version].equipments[dataId]['skl' + i].forEach(skillId => {
          if (typeof(skillsPos[skillId]) !== 'number') {
            const skill = {
              names: {},
              dataId: skillId,
              effects: [],
              type: this.slots[this[this.version].skills[skillId].slot === 1 ? 1 : 3],
              upgrade: [i],
              grow: this[this.version].skills[skillId].grow
            };
            this.updateSkill(this[this.version].wotvEquipments[rType], skill, skillId);
            skills.push(skill);
            skillsPos[skillId] = countSkill;
            countSkill++;
          } else {
            skills[skillsPos[skillId]].upgrade.push(i);
          }
        });
      }
    }

    this[this.version].wotvEquipments[rType].skills.push(skills);
  }

  private getEquipmentMaterials(dataId, level = 50) {
    const materials = {};

    const recipe = this[this.version].equipmentRecipes[dataId];
    if (recipe) {
      recipe.craft.forEach(material => {
        if (material.type === 0) {
          if (materials[material.id]) {
            materials[material.id] += material.num;
          } else {
            materials[material.id] = material.num;
          }
        } else {
          const previousUpgradeMaterials = this.getEquipmentMaterials(material.id, material.lv);

          Object.keys(previousUpgradeMaterials).forEach(materialId => {
            if (materials[materialId]) {
              materials[materialId] += previousUpgradeMaterials[materialId];
            } else {
              materials[materialId] = previousUpgradeMaterials[materialId];
            }
          });
        }
      });
    }

    const dataAwake = this[this.version].equipmentAwakes[dataId];
    if (dataAwake) {
      dataAwake.awakes.forEach(awake => {
        if (awake.lv <= level) {
          let index = 1;
          while (awake['mat' + index] && index <= 9) {
            const mat = awake['mat' + index].split(',');
            const id = mat[0];
            const count = mat[1];

            if (materials[id]) {
              materials[id] += parseInt(count, 10);
            } else {
              materials[id] = parseInt(count, 10);
            }

            index++;
          }
        }
      });
    }



    return materials;
  }

  private cleanUnits() {
    const unitToDelete = [];

    Object.keys(this[this.version].wotvUnits).forEach(unitId => {
      if (this[this.version].wotvUnits[unitId].board.lines.length === 0) {
        unitToDelete.push(unitId);
      }
    });

    unitToDelete.forEach(unitId => {
      delete this[this.version].wotvUnits[unitId];
    });
  }

  private formatRaid() {
    Object.keys(this[this.version].raid).forEach(raidId => {
      const raid = this[this.version].raid[raidId];

      if (raid.home_tex !== 'LAPS_RD_0001' && (raid.home_tex !== 'LAPS_RD_FF14_01' || raidId === 'RAID_ID_11' || raidId === 'RAID_GL_07')) {
        this[this.version].wotvRaids[raidId] = {
          dataId: raidId,
          names: {},
          bosses: [],
          bonus: {
            units: [],
            cards: []
          }
        };

        raid.prob.forEach((boss, bossIndex) => {
          this.addRaidBoss(this[this.version].wotvRaids[raidId], boss.boss_id);
        });

        if (raid.bonus_unit && this[this.version].raidBonusUnit[raid.bonus_unit]) {
          this[this.version].raidBonusUnit[raid.bonus_unit].bonuses.forEach(unit => {
            this[this.version].wotvRaids[raidId].bonus.units.push({
              unitId: unit.iname,
              value: unit.rate
            });
          });
        }

        if (raid.bonus_visioncard && this[this.version].raidBonusCard[raid.bonus_visioncard]) {
          this[this.version].raidBonusCard[raid.bonus_visioncard].bonuses.forEach(card => {
            this[this.version].wotvRaids[raidId].bonus.cards.push({
              cardId: card.iname,
              value: card.rate
            });
          });
        }
      }
    });
  }

  private addRaidBoss(raid, bossId) {
    const bossUnit = this[this.version].units[this[this.version].raidBoss[bossId].unit_id];
    const dataId = bossUnit.iname;
    const boss = {
      dataId: dataId,
      names: {},
      stats: {},
      species: bossUnit.species ? this.species[bossUnit.species[0]] : '',
      element: this.elements[bossUnit.elem[0]],
      image: bossUnit.charaId.toLowerCase(),
      skills: {},
      slug: ''
    };

    this.getUnitImage(boss);
    this.getNames(boss, 'unit');
    this.getStats(boss, bossUnit.status, 'unit');
    this.getAttackSkill(boss, bossUnit.atkskl);

    if (!raid.names.en) {
      raid.names = boss.names;
      raid.slug = boss.slug;
    }

    this[this.version].raidBoss[bossId].param.forEach(quest => {
      this.addBossSkill(boss, quest.quest_id, quest.lv_min, quest.lv_max);
      this.updateRaidQuest(quest);

      if (raid.maxLevel < quest.lv_max) {
        raid.maxLevel = quest.lv_max;
      }
    });

    raid.bosses.push(boss);
  }

  private addBossSkill(boss, questId, lvMin, lvMax) {
    const quest = this[this.version].quests[questId];
    if (quest) {
      const map = this[this.version].maps[quest.map.set.split('/')[1]];

      if (map) {
        map.enemy.forEach(enemy => {
          if (enemy.iname === boss.dataId) {
            enemy.skills.forEach(skill => {
              const skillId = skill.iname;

              if (!boss.skills[skillId]) {
                if (!this.slots[this[this.version].skills[skillId].slot]) {
                  this[this.version].skills[skillId].slot = 3;
                }

                boss.skills[skillId] = {
                  dataId: skillId,
                  rate: skill.rate
                };

                boss.skills[skillId].minLevel = lvMin;
                boss.skills[skillId].maxLevel = lvMax;

                this.addSkill(skillId, boss);
              } else if (boss.skills[skillId].maxLevel < lvMax) {
                boss.skills[skillId].maxLevel = lvMax;
              } else if (boss.skills[skillId].minLevel > lvMin) {
                boss.skills[skillId].minLevel = lvMin;
              }
            });
          }
        });
      }
    }
  }

  updateRaidQuest(quest) {
    if (this[this.version].wotvQuests[quest.quest_id]) {
      this[this.version].wotvQuests[quest.quest_id].enemies.forEach(enemy => {
        enemy.minLevel = quest.lv_min;
        enemy.maxLevel = quest.lv_max;
      });
    }
  }

  private addItem(item) {
    const dataId = item.iname;
    this[this.version].wotvItems[dataId] = {
      dataId: dataId,
      names: {}
    };

    this.getNames(this[this.version].wotvItems[dataId], 'item', false);

    if (item.type === undefined) {
      this[this.version].wotvItems[dataId].type = 'expe_ticket';
    } else if (this.itemType[item.type]) {
      this[this.version].wotvItems[dataId].type = this.itemType[item.type];
    } else {
      console.log('unknow item type -- ' + this[this.version].wotvItems[dataId].dataId + ' -- ' + this[this.version].wotvItems[dataId].names.en);
    }

    if (item.icon) {
      this[this.version].wotvItems[dataId].icon = item.icon;
    }
  }

  formatMasterRanks() {
    Object.keys(this[this.version].masterRanks).forEach(mrId => {
      const mr = this[this.version].masterRanks[mrId];

      this[this.version].wotvMasterRanks[this.elements[mr.condition.elems[0]]] = {
        dataId: mrId,
        condition: this.elements[mr.condition.elems[0]],
        ranks: []
      };

      let i = 0;
      mr.ranks.forEach(dataRank => {
        const rank = {
          images: {
            emblem: dataRank.emblem_img.toLowerCase(),
            background: dataRank.back_img.toLowerCase(),
            stars: i
          },
          effects: []
        };

        if (dataRank.mr_effect_id) {
          const fakeSkill = {
            type: 'MR',
            buffIds: [],
            effects: []
          };

          this[this.version].masterRanksEffects[dataRank.mr_effect_id].effects.forEach(effect => {
            fakeSkill.buffIds.push(effect.effect_id);
          });

          this.updateSkill(rank, fakeSkill, dataRank.mr_effect_id);
          rank.effects = fakeSkill.effects;
        }

        this[this.version].wotvMasterRanks[this.elements[mr.condition.elems[0]]].ranks.push(rank);

        i++;
        if (i > 4) {
          i = 0;
        }
      });
    });
  }

  private upperCaseFirst(text, fullLowerCase = true) {
    if (text) {
      return text[0].toUpperCase() + (fullLowerCase ? text.slice(1).toLowerCase() : text.slice(1));
    }

    return '';
  }

  formatTitles() {
    Object.keys(this[this.version].playerTitles).forEach(titleId => {
      this.addTitle('player', titleId);
    });

    Object.keys(this[this.version].guildTitles).forEach(titleId => {
      this.addTitle('guild', titleId);
    });
  }

  addTitle(type, titleId) {
    const titleData = this[this.version][type + 'Titles'][titleId];

    this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId] = {
      dataId: titleId,
      names: {},
      grade: this.titleGrade[titleData.grade]
    };

    this.getNames(this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId], type + 'TitleName', false);

    if (this.version === 'gl') {
      if (!this.names.en[type + 'TitleDesc'][titleId]) {
        this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
          en: titleId,
          fr: titleId,
          es: titleId,
          de: titleId,
          ko: titleId,
          zh: titleId
        };
      } else {
        this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
          en: this.names.en[type + 'TitleDesc'][titleId],
          fr: this.names.fr[type + 'TitleDesc'][titleId] ? this.names.fr[type + 'TitleDesc'][titleId] : this.names.fr[type + 'TitleDesc'][titleId],
          es: this.names.es[type + 'TitleDesc'][titleId] ? this.names.es[type + 'TitleDesc'][titleId] : this.names.es[type + 'TitleDesc'][titleId],
          de: this.names.de[type + 'TitleDesc'][titleId] ? this.names.de[type + 'TitleDesc'][titleId] : this.names.de[type + 'TitleDesc'][titleId],
          ko: this.names.ko[type + 'TitleDesc'][titleId] ? this.names.ko[type + 'TitleDesc'][titleId] : this.names.ko[type + 'TitleDesc'][titleId],
          zh: this.names.zh[type + 'TitleDesc'][titleId] ? this.names.zh[type + 'TitleDesc'][titleId] : this.names.zh[type + 'TitleDesc'][titleId]
        };
      }
    } else {
      if (!this.names.jp[type + 'TitleDesc'][titleId]) {
        this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
          en: titleId
        };
      } else {
        if (this.names.en[type + 'TitleDesc'][titleId]) {
          this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
            en: this.names.en[type + 'TitleDesc'][titleId]
          };
        } else if (!this.jpTitlesDesc[titleId]) {
          console.log('Need Google Translate for "' + titleId + '" ==> "' + this.names.jp[type + 'TitleDesc'][titleId] + '"');
        } else {
          this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
            en: this.jpTitlesDesc[titleId]
          };
        }

        if (this.names.en[type + 'TitleName'][titleId]) {
          this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].names.en = this.names.en[type + 'TitleName'][titleId];
        } else if (!this.jpTitlesName[titleId]) {
          console.log('Need Google Translate for "' + titleId + '" ==> "' + this.names.jp[type + 'TitleName'][titleId] + '"');
        } else {
          this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].names.en = this.jpTitlesName[titleId];
        }
      }
    }
  }

  exportGLexclusiveToJP() {
    if (this.version === 'jp') {
      this.jobService.getGLExclusiveJobIds().forEach(jobId => {
        this.jp.wotvJobs[jobId] = this.gl.wotvJobs[jobId];

        Object.keys(this.gl.wotvEquipments).forEach(equipmentId => {
          if (this.gl.wotvEquipments[equipmentId].equippableJobs
            && this.gl.wotvEquipments[equipmentId].equippableJobs.indexOf(jobId) !== -1
            && this.jp.wotvEquipments[equipmentId]) {
            this.jp.wotvEquipments[equipmentId].equippableJobs.push(jobId);
          }
        });

        this.jp.wotvJobs[jobId].materials.forEach(material => {
          Object.keys(material).forEach(itemId => {
            if (!this.jp.wotvItems[itemId]) {
              this.jp.wotvItems[itemId] = this.gl.wotvItems[itemId];
            }
          });
        });
      });

      this.unitService.getGLExclusiveUnitIds().forEach(unitId => {
        this.jp.wotvUnits[unitId] = this.gl.wotvUnits[unitId];
        const tmrId = this.jp.wotvUnits[unitId].tmr;
        this.jp.wotvEquipments[tmrId] = this.gl.wotvEquipments[tmrId];
      });
    }

    // Search in whole units
    Object.keys(this[this.version].wotvVisionCards).forEach(unitId => {
      // console.log(this[this.version].wotvVisionCards[unitId].dataId + ': ' + this[this.version].wotvVisionCards[unitId].slug + ',');
      /*const unitSkills = [];
      Object.keys(this[this.version].wotvUnits[unitId].board.nodes).forEach(nodeId => {
        unitSkills.push(this[this.version].wotvUnits[unitId].board.nodes[nodeId].skill);
      });

      unitSkills.push(this[this.version].wotvUnits[unitId].attack);

      if (this[this.version].wotvUnits[unitId].limit) {
        unitSkills.push(this[this.version].wotvUnits[unitId].limit);
      }

      unitSkills.forEach(skill => {
        if (skill.damage) {
          skill.effects.forEach(effect => {
            if (effect.timing === 'SKILL_AFTER') {
              // console.log(skill);
            }
          });
        }
      });*/
    });
  }

  formatQuests() {
    Object.keys(this[this.version].quests).forEach((questId, questIndex) => {
      const quest = this[this.version].quests[questId];

      const formattedQuest = {
        dataId: questId,
        items: {},
        names: {},
        slug: '',
        exp: quest.uexp,
        nrg: quest.ap,
        jp: quest.jp,
        gils: quest.gold,
        enemies: [],
        chests: [],
        allies: [],
        objects: [],
        switchs: [],
        type: this.questType[quest.type],
        missions: [],
        grid: [],
        buffs: [],
        drops: []
      };

      if (!this.questType[quest.type]) {
        console.log('Quest type not found -- ' + questId + ' -- type : ' + quest.type);
      }

      this.getNames(formattedQuest, 'questTitle', true, 'quest');

      this.getCompletionReward(formattedQuest, quest.c_rewards);
      this.getMissions(formattedQuest, quest.missions);
      this.getQuestSkills(formattedQuest, quest.map.buffs);

      if (formattedQuest.type === 'story') {
        const storyNumber = questId.split('_')[2];
        Object.keys(formattedQuest.names).forEach(lang => {
          formattedQuest.names[lang] = Number(storyNumber.substring(0, 2)) + ':' + Number(storyNumber.substring(2, 4)) + ':' + Number(storyNumber.substring(4, 6)) + ':' + Number(storyNumber.substring(6, 8)) + ' ' + formattedQuest.names[lang];
        });
      }

      if (formattedQuest.type === 'multi') {
        Object.keys(formattedQuest.names).forEach(lang => {
          formattedQuest.names[lang] = 'Multi: ' + formattedQuest.names[lang];
        });
      }

      if (formattedQuest.type === 'character_quest') {
        Object.keys(formattedQuest.names).forEach(lang => {
          formattedQuest.names[lang] = 'Character quest: ' + formattedQuest.names[lang];
        });
      }

      this.formatGrid(formattedQuest, quest.map.scn);
      this.formatMap(formattedQuest, quest.map.set);

      this[this.version].wotvQuests[questId] = formattedQuest;
    });
  }

  formatTowers() {
    Object.keys(this[this.version].towerFloors).forEach(questId => {
      const quest = this[this.version].towerFloors[questId];

      const formattedQuest = {
        dataId: questId,
        items: {},
        names: {},
        slug: '',
        exp: 0,
        nrg: quest.ap,
        jp: 0,
        gils: 0,
        enemies: [],
        chests: [],
        allies: [],
        objects: [],
        switchs: [],
        type: 'tower',
        missions: [],
        grid: [],
        buffs: [],
        drops: []
      };

      const questTranslation = this.getTowerFloorName(questId, quest.tower_iname, quest.ex);
      formattedQuest.names = questTranslation.names;
      formattedQuest.slug = questTranslation.slug;

      this.getTowerReward(formattedQuest, quest.reward_id);

      this.getQuestSkills(formattedQuest, quest.map.buffs);

      this.formatGrid(formattedQuest, quest.map.scn);
      this.formatMap(formattedQuest, quest.map.set);

      this[this.version].wotvQuests[questId] = formattedQuest;
    });
  }

  getMissions(quest, missions) {
    if (missions) {
      missions.forEach(missionId => {
        if (this[this.version].questMissions[missionId]) {
          const rawMission = this[this.version].questMissions[missionId];

          if (!this.questMissionCond[rawMission.type]) {
            console.log('Mission condition not found -- ' + quest.names.en + ' -- ' + rawMission.type);
          }

          const newMission = {
            type: this.questMissionCond[rawMission.type],
            value: rawMission.value1 !== undefined ? rawMission.value1 : rawMission.value2 !== undefined ? rawMission.value2 : null,
            rewards: []
          };

          if (this.questMissionCond[rawMission.type] === 'ELEMENT') {
            newMission.value.forEach(element => {
              element = this.elements[element];
            });
          }

          if (rawMission.rewards) {
            rawMission.rewards.forEach(reward => {
              newMission.rewards.push({
                type: this.questMissionReward[reward.type],
                rewardId: reward.item,
                value: reward.num
              });
            });
          }

          quest.missions.push(newMission);
        }
      });
    }
  }

  getCompletionReward(quest, rewards) {
    if (rewards && rewards.length > 0) {
      const newMission = {
        type: this.questMissionCond[0],
        value: null,
        rewards: []
      };

      rewards.forEach(reward => {
        newMission.rewards.push({
          type: this.questMissionReward[reward.type],
          rewardId: reward.item,
          value: reward.num
        });
      });

      quest.missions.push(newMission);
    }
  }

  getTowerReward(quest, rewardId) {
    if (this[this.version].towerRewards[rewardId]) {
      const newMissionFirst = {
        type: this.questMissionCond[10000000],
        value: null,
        rewards: []
      };

      const newMissionSecond = {
        type: this.questMissionCond[10000001],
        value: null,
        rewards: []
      };

      this[this.version].towerRewards[rewardId].rewards.forEach(reward => {
        if (reward.round === 0) {
          newMissionFirst.rewards.push({
            type: this.questMissionReward[reward.type],
            rewardId: reward.iname,
            value: reward.num
          });
        } else {
          newMissionSecond.rewards.push({
            type: this.questMissionReward[reward.type],
            rewardId: reward.iname,
            value: reward.num
          });
        }
      });

      quest.missions.push(newMissionFirst);
      quest.missions.push(newMissionSecond);
    }
  }

  getQuestSkills(quest, buffs) {
    if (buffs) {
      buffs.forEach(buffId => {
        const fakeSkill = {type: 'buff', effects: []};
        this.updateSkill(quest, fakeSkill, buffId);

        fakeSkill.effects.forEach(buff => {
          quest.buffs.push(buff);
        });
      });
    }
  }

  formatMap(quest, mapId) {
    if (this[this.version].maps[mapId.split('/')[1]]) {
      const map = this[this.version].maps[mapId.split('/')[1]];
      if (map.drop_table_list) {
        Object.keys(map.drop_table_list).forEach(dropTable => {
          if (dropTable !== 'steal') {
            map.drop_table_list[dropTable].totalRate = this.getDropTotalRate(map.drop_table_list[dropTable].drop_list);
          }
        });
      }

      // @TODO ADD ENTRY CONDITION !!!

      if (map.enemy) {
        map.enemy.forEach(enemy => {
          this.checkIfTileExist(quest, enemy);

          if (enemy.side === 0 && enemy.iname.split('_')[1] !== 'GM') {
            quest.grid[enemy.x][enemy.y].ally = quest.allies.length;
            quest.allies.push(this.formatEnemyForQuest(enemy));
            this.addOtherUnit(enemy);
          } else {
            if (enemy.iname === 'UN_GM_TREASURE') {
              quest.grid[enemy.x][enemy.y].chest = quest.chests.length;
              quest.chests.push(this.formatEnemyForQuest(enemy));
              this.addOtherUnit(enemy, true);
            } else if (enemy.iname === 'UN_GM_SWITCH' || enemy.iname === 'UN_GM_SWITCH_01' || enemy.iname === 'UN_GM_SWITCH_02' || enemy.iname === 'UN_GM_SWITCH_03') {
              quest.grid[enemy.x][enemy.y].switch = quest.switchs.length;
              quest.switchs.push(this.formatEnemyForQuest(enemy));
              this.addOtherUnit(enemy, true);
            } else if (enemy.iname.split('_')[1] === 'GM') {
              quest.grid[enemy.x][enemy.y].object = quest.objects.length;
              quest.objects.push(this.formatEnemyForQuest(enemy));
              this.addOtherUnit(enemy, true);
            } else {
              if (!enemy.hasBody) {
                quest.grid[enemy.x][enemy.y].enemy = quest.enemies.length;
              }
              quest.enemies.push(this.formatEnemyForQuest(enemy));
              this.addOtherUnit(enemy);
            }
          }
        });
      }

      if (map.arena) {
        map.arena.forEach((arena, arenaIndex) => {
          this.checkIfTileExist(quest, arena);
          quest.grid[arena.x][arena.y].enemy = arenaIndex;
        });
      }

      if (map.party) {
        map.party.forEach((party, partyIndex) => {
          this.checkIfTileExist(quest, party);
          quest.grid[party.x][party.y].party = partyIndex;
        });
      }

      if (map.drop_table_list) {
        Object.keys(map.drop_table_list).forEach(dropId => {
          const dropList = {
            dataId: dropId,
            items: {}
          };

          map.drop_table_list[dropId].drop_list.forEach(item => {
            if (!dropList.items[item.drop_data.iname]) {
              dropList.items[item.drop_data.iname] = {};
            }

            dropList.items[item.drop_data.iname][item.drop_data.num] = item.weight * 100 / map.drop_table_list[dropId].totalRate;
          });

          quest.drops.push(dropList);
        });

        if (map.enemy) {
          map.enemy.forEach(enemy => {
            if (enemy.drop && map.drop_table_list[enemy.drop]) {
              const dropTable = map.drop_table_list[enemy.drop];
              dropTable.drop_list.forEach(item => {
                this.addDroppedItem(quest, 'drop', item.drop_data.iname, item.weight, dropTable.totalRate, item.drop_data.num);
              });
            }
          });
        }

        if (map.drop_table_list['HOST']) {
          const hostDropTable = map.drop_table_list['HOST'];
          hostDropTable.drop_list.forEach(item => {
            if (this[this.version].wotvItems[item.drop_data.iname]) {
              this.addDroppedItem(quest, 'host', item.drop_data.iname, item.weight, hostDropTable.totalRate, item.drop_data.num);
            }
          });
        }
      }
    }
  }

  formatEnemyForQuest(enemy) {
    const formattedEnemy = JSON.parse(JSON.stringify(enemy));

    formattedEnemy.dataId = formattedEnemy.iname;

    delete formattedEnemy.iname;
    delete formattedEnemy.x;
    delete formattedEnemy.y;

    if (formattedEnemy.elem !== 0) {
      formattedEnemy.element = this.elements[formattedEnemy.elem];
    }

    delete formattedEnemy.elem;

    return formattedEnemy;
  }

  checkIfTileExist(quest, item) {
    if (!quest.grid[item.x]) {
      quest.grid[item.x] = [];
      for (let i = 0; i <= quest.grid[0].length - 1; i++) {
        quest.grid[item.x][i] = {
          h: 0,
          t: 'TILE_NOT_IN_GRID'
        };
      }
    }

    if (!quest.grid[0][item.y]) {
      quest.grid.forEach(line => {
        for (let i = 0; i <= item.y; i++) {
          if (!line[i]) {
            line[i] = {
              h: 0,
              t: 'TILE_NOT_IN_GRID'
            };
          }
        }
      });
    }
  }

  addDroppedItem(map, type, itemId, rate, totalRate, num) {
    if (!map.items[itemId]) {
      map.items[itemId] = {};
      map.items[itemId][type] = {
        value: rate * 100 / totalRate,
        minNum: num,
        maxNum: num
      };
    } else if (!map.items[itemId][type]) {
      map.items[itemId][type] = {
        value: rate * 100 / totalRate,
        minNum: num,
        maxNum: num
      };
    } else if (map.items[itemId][type].value !== '100.0') { // To rework maybe...
      map.items[itemId][type] = {
        value: map.items[itemId][type].value + ((100 - map.items[itemId][type].value) * (rate * 100 / totalRate) / 100),
        minNum: num < map.items[itemId][type].minNum ? num : map.items[itemId][type].minNum,
        maxNum: num > map.items[itemId][type].maxNum ? num : map.items[itemId][type].maxNum
      };
    }
  }

  getDropTotalRate(items) {
    let totalRate = 0;

    items.forEach(item => {
      totalRate += item.weight;
    });

    return totalRate;
  }

  formatGrid(quest, gridId) {
    if (this[this.version].grids[gridId.split('/')[1]]) {
      const rawGrid = this[this.version].grids[gridId.split('/')[1]];
      rawGrid.forEach(tile => {
        if (!quest.grid[tile.x]) {
          quest.grid[tile.x] = [];
        }

        quest.grid[tile.x][tile.y] = {
          h: tile.h
        };

        if (tile.t !== '') {
          quest.grid[tile.x][tile.y].t = tile.t;
        }
      });
    }
  }

  private addOtherUnit(otherUnit, object = false) {
    const dataId = otherUnit.iname;

    if (this[this.version].units[dataId] && !this[this.version].wotvOtherUnits[dataId]) {
      const rawUnit = this[this.version].units[dataId];
      const unit = {
        dataId: dataId,
        names: {},
        rarity: this.rarity[rawUnit.rare],
        jobs: rawUnit.jobsets,
        exJobs: [],
        stats: {},
        element: rawUnit.elem ? this.elements[rawUnit.elem[0]] : null,
        image: null,
        species: '',
        size: rawUnit.size ? rawUnit.size : 0,
        realMaxLevel: 99
      };

      if (this[this.version].grows[rawUnit.grow]) {
        unit.realMaxLevel = this[this.version].grows[rawUnit.grow].curve[0].lv;
      }

      if (rawUnit.base_unit_iname && this[this.version].units[rawUnit.base_unit_iname]) {
        const baseUnit = this[this.version].units[rawUnit.base_unit_iname];
        if (baseUnit.charaId) {
          unit.image = baseUnit.charaId.toLowerCase();
          this.getUnitImage(unit, rawUnit.base_unit_iname);
        } else if (baseUnit.base_unit_iname && this[this.version].units[baseUnit.base_unit_iname]) {
          unit.image = this[this.version].units[baseUnit.base_unit_iname].charaId.toLowerCase();
          this.getUnitImage(unit, baseUnit.base_unit_iname);
        }

        if (baseUnit.species) {
          rawUnit.species = baseUnit.species;
        } else if (baseUnit.base_unit_iname && this[this.version].units[baseUnit.base_unit_iname]) {
          rawUnit.species = this[this.version].units[baseUnit.base_unit_iname].species;
        }
      } else if (rawUnit.charaId) {
        unit.image = rawUnit.charaId.toLowerCase();
        this.getUnitImage(unit);
      }

      if (rawUnit.species) {
        rawUnit.species.forEach((specie, speciesIndex) => {
          if (speciesIndex > 0) {
            unit.species += ', ';
          }

          if (!this.species[specie]) {
            console.log('Unknown species -- ' + dataId + ' -- ' + specie);
          }

          unit.species += this.species[specie];
        });
      }

      if (rawUnit.ccsets) {
        rawUnit.ccsets.forEach(exJob => {
          unit.exJobs.push(exJob.m);
        });
      }

      this.getNames(unit, 'unit');

      if (!object) {
        this.getStats(unit, rawUnit.status, 'unit');
        if (unit.jobs) {
          this.getMoveJumpUnit(unit);
        }

        this.getLB(unit, rawUnit.limit);
        this.getAttackSkill(unit, rawUnit.atkskl);
        this.getMasterSkill(unit, rawUnit.mstskl);
      }

      this[this.version].wotvOtherUnits[dataId] = unit;


      otherUnit.skills.forEach(skill => {

        if (!this[this.version].skills[skill.iname].slot) {
          if (this.skillTypes[this[this.version].skills[skill.iname].type] === 'unit_passive'
            || this.skillTypes[this[this.version].skills[skill.iname].type] === 'equipment_passive'
            || this.skillTypes[this[this.version].skills[skill.iname].type] === 'status') {
            this[this.version].skills[skill.iname].slot = 3;
          } else if (this.skillTypes[this[this.version].skills[skill.iname].type] === 'basic_attack'
            || this.skillTypes[this[this.version].skills[skill.iname].type] === 'unit_skill') {
            this[this.version].skills[skill.iname].slot = 1;
          } else {
            console.log(this.skillTypes[this[this.version].skills[skill.iname].type]);
          }
        }

        this.addSkill(skill.iname, unit);
      });
    }
  }

  private getTowerFloorName(floorId, towerId, ex) {
    const towerNames = {
      en: '',
      fr: '',
      es: '',
      de: '',
      ko: '',
      zh: ''
    };
    const towerSlug = '';

    if (this.version === 'gl') {
      if (this.names.en.towerTitle[towerId]) {
        towerNames.en = this.names.en.towerTitle[towerId];
        towerNames.fr = this.names.fr.towerTitle[towerId];
        towerNames.es = this.names.es.towerTitle[towerId];
        towerNames.de = this.names.de.towerTitle[towerId];
        towerNames.ko = this.names.ko.towerTitle[towerId];
        towerNames.zh = this.names.zh.towerTitle[towerId];

        let countTowerTitle = 1;
        Object.keys(this.names.en.towerTitle).forEach((towerTitleId, towerTitleIndex) => {
          if (this.names.en.towerTitle[towerTitleId] === towerNames.en) {
            if (towerTitleId !== towerId) {
              countTowerTitle++;
            } else if (countTowerTitle > 1) {
              towerNames.en = towerNames.en + ' (' + countTowerTitle + ')';
              towerNames.fr = towerNames.fr + ' (' + countTowerTitle + ')';
              towerNames.es = towerNames.es + ' (' + countTowerTitle + ')';
              towerNames.de = towerNames.de + ' (' + countTowerTitle + ')';
              towerNames.ko = towerNames.ko + ' (' + countTowerTitle + ')';
              towerNames.zh = towerNames.zh + ' (' + countTowerTitle + ')';
            }
          }
        });
      } else {
        towerNames.en = towerId;
        towerNames.fr = towerId;
        towerNames.es = towerId;
        towerNames.de = towerId;
        towerNames.ko = towerId;
        towerNames.zh = towerId;
      }
    } else {
      if (this.names.en.towerTitle[towerId]) {
        towerNames.en = this.names.en.towerTitle[towerId];

        let countTowerTitle = 1;
        Object.keys(this.names.en.towerTitle).forEach((towerTitleId, towerTitleIndex) => {
          if (this.names.en.towerTitle[towerTitleId] === this.names.en.towerTitle[towerId]) {
            if (towerTitleId !== towerId) {
              countTowerTitle++;
            } else if (countTowerTitle > 1) {
              towerNames.en = towerNames.en + ' (' + countTowerTitle + ')';
            }
          }
        });
      } else if (this.names.jp.towerTitle[towerId]) {
        towerNames.en = this.names.jp.towerTitle[towerId];

        let countTowerTitle = 1;
        Object.keys(this.names.en.towerTitle).forEach((towerTitleId, towerTitleIndex) => {
          if (this.names.jp.towerTitle[towerTitleId] === this.names.jp.towerTitle[towerId]) {
            if (towerTitleId !== towerId) {
              countTowerTitle++;
            } else if (countTowerTitle > 1) {
              towerNames.en = towerNames.en + ' (' + countTowerTitle + ')';
            }
          }
        });
      } else {
        towerNames.en = towerId;
      }
    }

    const floorNames = {
      en: ''
    };
    let floorSlug = '';

    if (this.version === 'gl') {
      if (this.names.en.towerFloorTitle[floorId]) {
        floorNames.en = towerNames.en + ' - ' + (ex ? 'EX ' : '') + this.names.en.towerFloorTitle[floorId];
        // @ts-ignore
        floorNames.fr = towerNames.fr + ' - ' + (ex ? 'EX ' : '') + this.names.fr.towerFloorTitle[floorId];
        // @ts-ignore
        floorNames.de = towerNames.de + ' - ' + (ex ? 'EX ' : '') + this.names.de.towerFloorTitle[floorId];
        // @ts-ignore
        floorNames.es = towerNames.es + ' - ' + (ex ? 'EX ' : '') + this.names.es.towerFloorTitle[floorId];
        // @ts-ignore
        floorNames.ko = towerNames.ko + ' - ' + (ex ? 'EX ' : '') + this.names.ko.towerFloorTitle[floorId];
        // @ts-ignore
        floorNames.zh = towerNames.zh + ' - ' + (ex ? 'EX ' : '') + this.names.zh.towerFloorTitle[floorId];
      } else {
        floorNames.en = towerNames.en + ' - ' + (ex ? 'EX ' : '') + floorId;
        // @ts-ignore
        floorNames.fr = towerNames.fr + ' - ' + (ex ? 'EX ' : '') + floorId;
        // @ts-ignore
        floorNames.es = towerNames.es + ' - ' + (ex ? 'EX ' : '') + floorId;
        // @ts-ignore
        floorNames.de = towerNames.de + ' - ' + (ex ? 'EX ' : '') + floorId;
        // @ts-ignore
        floorNames.ko = towerNames.ko + ' - ' + (ex ? 'EX ' : '') + floorId;
        // @ts-ignore
        floorNames.zh = towerNames.zh + ' - ' + (ex ? 'EX ' : '') + floorId;
      }

      floorSlug = this.slug.slugify(floorNames.en);
    } else {
      let slugJP = false;

      if (this.names.en.towerFloorTitle[floorId]) {
        floorNames.en = towerNames.en + ' - ' + (ex ? 'EX ' : '') + this.names.en.towerFloorTitle[floorId];
        floorSlug = this.slug.slugify(floorNames.en);
      } else if (this.names.jp.towerFloorTitle[floorId]) {
        floorNames.en = towerNames.en + ' - ' + (ex ? 'EX ' : '') + this.names.jp.towerFloorTitle[floorId];
        slugJP = true;
      } else {
        floorNames.en = towerNames.en + ' - ' + (ex ? 'EX ' : '') + floorId;
        floorSlug = this.slug.slugify(floorNames.en);
      }

      if (slugJP) {
        if (!this.jpRomaji[floorNames.en]) {
          this.jpTranslateService.convert(floorNames.en).then(translatedText => {
            this.jpRomaji[floorNames.en] = translatedText;
            floorSlug = this.slug.slugify(translatedText);
            console.log('New JP Translate for tower ==> "' + floorNames.en + '": "' + translatedText + '",');
          });
        } else {
          floorSlug = this.slug.slugify(this.jpRomaji[floorNames.en]);
        }
      }
    }

    return {
      names: floorNames,
      slug: floorSlug
    };
  }
}
