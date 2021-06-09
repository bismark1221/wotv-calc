import { Slug } from 'ng2-slugify';

import { JpTranslateService } from './jptranslate.service';

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
    skillExc: {},
    oldUnits: {},
    oldCards: {},
    oldEspers: {},
    oldEquipments: {}
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
    skillExc: {},
    oldUnits: {},
    oldCards: {},
    oldEspers: {},
    oldEquipments: {}
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
    107: 'REFLECT',
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
    277: 'RES_ALL_ATTACKS_DEBUFF_RES',
    278: 'RES_ALL_ELEMENTS_DEBUFF_RES',
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
    335: 'RES_WIND_ATK_PENETRATION',
    337: 'RES_EARTH_ATK_PENETRATION',
    341: 'RES_WATER_ATK_PENETRATION',
    343: 'RES_LIGHT_ATK_PENETRATION',
    345: 'RES_DARK_ATK_PENETRATION',
    347: 'HEAL_POWER',
    348: 'REDUCE_COUNTER_CHANCE',
    501: 'ABSORB_HP_ONTIME',
    502: 'FROSTBITE',
    503: 'UPGRADE_SKILL',
    509: 'GRANT_BUFF'
  };


  statusParam = {
    1: "HP",
    2: "TP",
    3: "AP",
    4: "ATK",
    5: "DEF",
    6: "MAG",
    7: "SPR",
    8: "DEX",
    9: "AGI",
    10: "LUCK",
    11: "MOVE",
    12: "JUMP",

    // 100: "ElemNoneAssist",
    101: "FIRE_ATK",
    102: "ICE_ATK",
    103: "WIND_ATK",
    104: "EARTH_ATK",
    105: "LIGHTNING_ATK",
    106: "WATER_ATK",
    107: "LIGHT_ATK",
    108: "DARK_ATK",

    // 150: "ElemNoneResist",
    151: "FIRE_RES",
    152: "ICE_RES",
    153: "WIND_RES",
    154: "EARTH_RES",
    155: "LIGHTNING_RES",
    156: "WATER_RES",
    157: "LIGHT_RES",
    158: "DARK_RES",

    200: "SLASH_ATK",
    201: "PIERCE_ATK",
    202: "STRIKE_ATK",
    203: "MISSILE_ATK",
    204: "MAGIC_ATK",
    // 205: "AttackJumpAssist",

    250: "SLASH_RES",
    251: "PIERCE_RES",
    252: "STRIKE_RES",
    253: "MISSILE_RES",
    254: "MAGIC_RES",
    // 255: "AttackJumpResist",

    // 300: "CondHealHpAssist",
    // 301: "CondHealMpAssist",
    // 302: "CondHealApAssist",
    303: "POISON_ATK",
    304: "BLIND_ATK",
    305: "SLEEP_ATK",
    306: "SILENCE_ATK",
    307: "PARALYZE_ATK",
    308: "CONFUSION_ATK",
    309: "CHARM_ATK",
    310: "PETRIFY_ATK",
    311: "GRADUAL_PETRIFY_ATK",
    312: "FROSTBITE_ATK",
    313: "TOAD_ATK",
    // 314: "CondSneakAssist",
    // 315: "CondHasteAssist",
    316: "SLOW_ATK",
    317: "STOP_ATK",
    318: "IMMOBILIZE_ATK",
    319: "DISABLE_ATK",
    320: "BERSERK_ATK",
    321: "DOOM_ATK",
    // 322: "CondRaiseAssist",
    // 323: "CondReraiseAssist",
    // 324: "CondProtectAssist",
    // 325: "CondShellAssist",
    // 326: "CondReflecAssist",
    // 327: "CondFaithAssist",
    // 328: "CondInnocenAssist",
    // 329: "CondLevitateAssist",
    330: "INSTANT_DEATH_ATK",
    // 331: "CondQuickAssist",
    // 332: "CondGutsAssist",
    // 333: "CondPhyPerfectAvoidAssist",
    // 334: "CondMagPerfectAvoidAssist",
    // 335: "CondPerfectHitAssist",
    // 336: "CondPerfectCriticalAssist",
    // 337: "CondUnitTagAssist",
    // 338: "CondKillerElementAssist",
    // 339: "CondKillerSpeciesAssist",
    // 340: "CondKillerBirthAssist",
    // 341: "CondKillerTagAssist",
    342: "STUN_ATK",
    // 343: "CondChangeCtAssist",

    // 400: "CondHealHpResist",
    // 401: "CondHealMpResist",
    // 402: "CondHealApResist",
    403: "POISON_RES",
    404: "BLIND_RES",
    405: "SLEEP_RES",
    406: "SILENCE_RES",
    407: "PARALYZE_RES",
    408: "CONFUSION_RES",
    409: "CHARM_RES",
    410: "PETRIFY_RES",
    411: "GRADUAL_PETRIFY_RES",
    412: "FROSTBITE_RES",
    413: "TOAD_RES",
    // 414: "CondSneakResist",
    // 415: "CondHasteResist",
    416: "SLOW_RES",
    417: "STOP_RES",
    418: "IMMOBILIZE_RES",
    419: "DISABLE_RES",
    420: "BERSERK_RES",
    421: "DOOM_RES",
    /*422: "CondRaiseResist",
    423: "CondReraiseResist",
    424: "CondProtectResist",
    425: "CondShellResist",
    426: "CondReflecResist",
    427: "CondFaithResist",
    428: "CondInnocenResist",*/
    429: "FLOAT_RES",
    430: "INSTANT_DEATH_RES",
    /*431: "CondQuickResist",
    432: "CondGutsResist",
    433: "CondPhyPerfectAvoidResist",
    434: "CondMagPerfectAvoidResist",
    435: "CondPerfectHitResist",
    436: "CondPerfectCriticalResist",
    437: "CondUnitTagResist",
    438: "CondKillerElementResist",
    439: "CondKillerSpeciesResist",
    440: "CondKillerBirthResist",
    441: "CondKillerTagResist",*/
    442: "STUN_RES",
    443: "IMMUNE_CT_CHANGE",

    500: "INITIAL_AP",
    501: "RANGE",
    // 502: "OtherEffectScope",
    // 503: "OtherEffectHeight",
    504: "ACCURACY",
    505: "EVADE",
    506: "CRITIC_RATE",
    507: "CRITIC_DAMAGE",
    508: "CRITIC_AVOID",
    // 509: "OtherKillerElement",
    // 510: "OtherKillerSpecies",
    // 511: "OtherKillerBirth",
    // 512: "OtherKillerTag",
    // 513: "OtherKillerSex",
    514: "PROVOKE",
    515: "BRAVERY",
    516: "FAITH",
    517: "NON_ATTACK_ACTIVATION_TIME",
    518: "ATTACK_ACTIVATION_TIME",

    600: "DEBUFF_RES",
    601: "MAX_HP_DOWN_RES",
    602: "ATK_DEBUFF_RES",
    603: "DEF_DEBUFF_RES",
    604: "MAG_DEBUFF_RES",
    605: "SPR_DEBUFF_RES",
    606: "DEX_DEBUFF_RES",
    607: "AGI_DEBUFF_RES",
    608: "LUCK_DEBUFF_RES",

    // 609: "OtherDebuffResistSlash",
    // 610: "OtherDebuffResistPierce",
    // 611: "OtherDebuffResistBlow",
    // 612: "OtherDebuffResistShot",
    // 613: "OtherDebuffResistMagic",

    614: "ACCURACY_DEBUFF_RES",
    615: "EVADE_DEBUFF_RES",

    616: "BRAVERY_DEBUFF_RES",
    617: "FAITH_DEBUFF_RES",

    618: "RES_FIRE_DEBUFF_RES",
    619: "RES_ICE_DEBUFF_RES",
    620: "RES_WIND_DEBUFF_RES",
    621: "RES_EARTH_DEBUFF_RES",
    622: "RES_LIGHTNING_DEBUFF_RES",
    623: "RES_WATER_DEBUFF_RES",
    624: "RES_LIGHT_DEBUFF_RES",
    625: "RES_DARK_DEBUFF_RES",

    626: "RES_SLASH_DEBUFF_RES",
    627: "RES_PIERCE_DEBUFF_RES",
    628: "RES_STRIKE_DEBUFF_RES",
    629: "RES_MISSILE_DEBUFF_RES",
    630: "RES_MAGIC_DEBUFF_RES",

    631: "RES_ALL_ATTACKS_DEBUFF_RES",
    632: "RES_ALL_ELEMENTS_DEBUFF_RES",

    700: "DEFENSE_PENETRATION",
    // 701: "OtherNegDefIgnore",
    702: "SPIRIT_PENETRATION",
    // 703: "OtherNegMndIgnore",
    704: "RES_SLASH_ATK_PENETRATION",
    705: "RES_PIERCE_ATK_PENETRATION",
    706: "RES_STRIKE_ATK_PENETRATION",
    707: "RES_MISSILE_ATK_PENETRATION",
    708: "RES_MAGIC_ATK_PENETRATION",
    // 709: "OtherNegSlashIgnore",
    // 710: "OtherNegPierceIgnore",
    // 711: "OtherNegBlowIgnore",
    // 712: "OtherNegShotIgnore",
    // 713: "OtherNegMagicIgnore",
    714: "RES_FIRE_ATK_PENETRATION",
    715: "RES_ICE_ATK_PENETRATION",
    716: "RES_WIND_ATK_PENETRATION",
    717: "RES_EARTH_ATK_PENETRATION",
    718: "RES_LIGHTNING_ATK_PENETRATION",
    719: "RES_WATER_ATK_PENETRATION",
    720: "RES_LIGHT_ATK_PENETRATION",
    721: "RES_DARK_ATK_PENETRATION",
    // 722: "OtherNegFireIgnore",
    // 723: "OtherNegIceIgnore",
    // 724: "OtherNegWindIgnore",
    // 725: "OtherNegEarthIgnore",
    // 726: "OtherNegThunderIgnore",
    // 727: "OtherNegWaterIgnore",
    // 728: "OtherNegShineIgnore",
    // 729: "OtherNegDarkIgnore",

    // 800: "OtherBuffTurn",
    // 801: "OtherDebuffTurn",
    802: "ATTACK_RES",
    803: "AOE_RES",
    804: "MAX_DAMAGE",
    // 805: "OtherAttackSkillRank",
    806: "AP_CONSUMPTION",
    // 807: "OtherTpDmgAvoid",
    // 808: "OtherApDmgAvoid",
    809: "HEAL_POWER",
    810: "COUNTER_CHANCE",
    // 811: "OtherIgnReactResist"
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
    102: 'NETHERBEAST',
    103: 'BEAST',
    104: 'DEMON',
    105: 'DRAGON',
    106: 'PLANT',
    107: 'BIRD',
    108: 'INSECT',
    109: 'AQUATIC',
    110: 'MACHINE',
    111: 'FAIRY',
    112: 'UNDEAD',
    113: 'STONE',
    114: 'METAL',
    115: 'ARCANA',
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
      'frz': 'FROSTBITE_RES',
      'stn': 'STUN_RES',

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
      'frz': 'FROSTBITE_RES',
      'stn': 'STUN_RES',

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
      'frz': 'FROSTBITE_RES',
      'stn': 'STUN_RES',

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
    30: 'apply',
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
    'masterSkill',
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

  private weaponTypes = [
    'DAGGER',
    'SWORD',
    'GREATSWORD',
    'KATANA',
    'ROD',
    'NINJABLADE',
    'BOW',
    'AXE',
    'SPEAR',
    'GUN',
    'MACE',
    'FIST',
    'GLOVE',
    'BOOK'
  ];

  private enemyEntryCond = {
    1: 'ONEDEAD',
    2: 'ALLDEADEXPECTTAG',
    3: 'ALLDEAD',
    4: 'ALIVE',
    7: 'STATCOND',
    8: 'TURNCOUNT',
    10: 'POSITION',
    15: 'CAST',
    19: 'COUNTDEAD'
  };

  fs = require('fs').promises;
  fsSync = require('fs');
  path = require('path');


  constructor() {}


  private GLUnits() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Unit.json'), 'utf8');
  }

  private GLUnitsBoards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/UnitAbilityBoard.json'), 'utf8');
  }

  private GLSkills() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Skill.json'), 'utf8');
  }

  private GLBuffs() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Buff.json'), 'utf8');
  }

  private GLJobs() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Job.json'), 'utf8');
  }

  private GLEquipments() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Artifact.json'), 'utf8');
  }

  private GLVisionCards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/VisionCard.json'), 'utf8');
  }

  private GLEspersBoards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/NetherBeastAbilityBoard.json'), 'utf8');
  }

  private GLWeathers() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Weather.json'), 'utf8');
  }

  private GLEsperLvTbls() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/NBeastLvTbl.json'), 'utf8');
  }

  private GLArtifactRecipes() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/ArtifactRecipe.json'), 'utf8');
  }

  private GLArtifactLot() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/ArtifactRandLot.json'), 'utf8');
  }

  private GLGrows() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Grow.json'), 'utf8');
  }

  private GLUnitModels() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/UnitModel.json'), 'utf8');
  }

  private GLArtifactEquipCond() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/ArtifactEquipCondition.json'), 'utf8');
  }

  private GLRaid() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Raid.json'), 'utf8');
  }

  private GLRaidBoss() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/RaidBoss.json'), 'utf8');
  }

  private GLArtifactAwake() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/ArtifactAwake.json'), 'utf8');
  }

  private GLItem() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Item.json'), 'utf8');
  }

  private GLCardCond() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/VisionCardLimitedCondition.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLMasterRank() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/MasterRank.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLMasterRankEffect() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/MasterRankEffect.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLPlayersAward() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/PlayersAward.json'), 'utf8');
  }

  private GLGuildsAward() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/GuildsAward.json'), 'utf8');
  }

  private GLJobLvTbl() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/JobLvTbl.json'), 'utf8');
  }

  private GLJobMaterialItem() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/JobMaterialItem.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLUnitMaterialItem() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/UnitMaterialItem.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLUnitClassChangeCondition() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/UnitClassChangeCondition.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLRaidBonusUnit() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/RaidBonusUnit.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLRaidBonusCard() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/RaidBonusVisioncard.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLQuests() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/Quests.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLQuestMissions() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/QuestMission.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLTowerFloors() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/TowerFloor.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLTowerRewards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/TowerReward.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private GLSkillExc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/data/SkillExc.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }


  /* JP */
  private JPUnits() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Unit.json'), 'utf8');
  }

  private JPUnitsBoards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/UnitAbilityBoard.json'), 'utf8');
  }

  private JPSkills() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Skill.json'), 'utf8');
  }

  private JPBuffs() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Buff.json'), 'utf8');
  }

  private JPJobs() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Job.json'), 'utf8');
  }

  private JPEquipments() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Artifact.json'), 'utf8');
  }

  private JPVisionCards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/VisionCard.json'), 'utf8');
  }

  private JPEspersBoards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/NetherBeastAbilityBoard.json'), 'utf8');
  }

  private JPWeathers() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Weather.json'), 'utf8');
  }

  private JPEsperLvTbls() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/NBeastLvTbl.json'), 'utf8');
  }

  private JPArtifactRecipes() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/ArtifactRecipe.json'), 'utf8');
  }

  private JPArtifactLot() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/ArtifactRandLot.json'), 'utf8');
  }

  private JPGrows() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Grow.json'), 'utf8');
  }

  private JPUnitModels() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/UnitModel.json'), 'utf8');
  }

  private JPArtifactEquipCond() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/ArtifactEquipCondition.json'), 'utf8');
  }

  private JPRaid() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Raid.json'), 'utf8');
  }

  private JPRaidBoss() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/RaidBoss.json'), 'utf8');
  }

  private JPArtifactAwake() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/ArtifactAwake.json'), 'utf8');
  }

  private JPItem() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Item.json'), 'utf8');
  }

  private JPCardCond() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/VisionCardLimitedCondition.json'), 'utf8');
  }

  private JPMasterRank() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/MasterRank.json'), 'utf8');
  }

  private JPMasterRankEffect() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/MasterRankEffect.json'), 'utf8');
  }

  private JPPlayersAward() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/PlayersAward.json'), 'utf8');
  }

  private JPGuildsAward() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/GuildsAward.json'), 'utf8');
  }

  private JPJobLvTbl() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/JobLvTbl.json'), 'utf8');
  }

  private JPJobMaterialItem() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/JobMaterialItem.json'), 'utf8');
  }

  private JPUnitMaterialItem() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/UnitMaterialItem.json'), 'utf8');
  }

  private JPUnitClassChangeCondition() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/UnitClassChangeCondition.json'), 'utf8');
  }

  private JPRaidBonusUnit() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/RaidBonusUnit.json'), 'utf8');
  }

  private JPRaidBonusCard() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/RaidBonusVisioncard.json'), 'utf8');
  }

  private JPQuests() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/Quests.json'), 'utf8');
  }

  private JPQuestMissions() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/QuestMission.json'), 'utf8');
  }

  private JPTowerFloors() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/TowerFloor.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private JPTowerRewards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/TowerReward.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }

  private JPSkillExc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jpdata/SkillExc.json'), 'utf8')
      .then(data => {
        return data;
      }).catch(function(error) {
        return '{"items": []}';
      });
  }


  /* Translation */
  private TranslateUnitNames() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/unitname.json'), 'utf8');
  }

  private TranslateSkillNames() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/skillname.json'), 'utf8');
  }

  private TranslateBuffNames() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/buffname.json'), 'utf8');
  }

  private TranslateJobNames() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/jobname.json'), 'utf8');
  }

  private TranslateEquipmentNames() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/artifactname.json'), 'utf8');
  }

  private TranslateVisionCardNames() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/visioncardname.json'), 'utf8');
  }

  private TranslateVisionItemOthers() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/itemother.json'), 'utf8');
  }

  private TranslateEquipmentGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/artifactgrow.json'), 'utf8');
  }

  private TranslateItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/itemname.json'), 'utf8');
  }

  private TranslatePlayerAwardsName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/playerawardsname.json'), 'utf8');
  }

  private TranslatePlayerAwardsDescription() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/playerawardsdescription.json'), 'utf8');
  }

  private TranslateGuildAwardsName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/guildawardsname.json'), 'utf8');
  }

  private TranslateGuildAwardsDescription() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/guildawardsdescription.json'), 'utf8');
  }

  private TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/questtitle.json'), 'utf8');
  }

  private TranslateTowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/towertitle.json'), 'utf8');
  }

  private TranslateTowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/en/towerfloortitle.json'), 'utf8');
  }



  /* FR Local files */
  private FR_ArtifactGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/artifactgrow.json'), 'utf8');
  }

  private FR_ArtifactName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/artifactname.json'), 'utf8');
  }

  private FR_BuffName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/buffname.json'), 'utf8');
  }

  private FR_ItemOther() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/itemother.json'), 'utf8');
  }

  private FR_JobName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/jobname.json'), 'utf8');
  }

  private FR_SkillName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/skillname.json'), 'utf8');
  }

  private FR_UnitName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/unitname.json'), 'utf8');
  }

  private FR_VisionCardName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/visioncardname.json'), 'utf8');
  }

  private FR_ItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/itemname.json'), 'utf8');
  }

  private FR_PlayerTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/playerawardsname.json'), 'utf8');
  }

  private FR_PlayerTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/playerawardsdescription.json'), 'utf8');
  }

  private FR_GuildTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/guildawardsname.json'), 'utf8');
  }

  private FR_GuildTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/guildawardsdescription.json'), 'utf8');
  }

  private FR_TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/questtitle.json'), 'utf8');
  }

  private FR_TowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/towertitle.json'), 'utf8');
  }

  private FR_TowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/fr/towerfloortitle.json'), 'utf8');
  }

  /* DE Local files */
  private DE_ArtifactGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/artifactgrow.json'), 'utf8');
  }

  private DE_ArtifactName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/artifactname.json'), 'utf8');
  }

  private DE_BuffName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/buffname.json'), 'utf8');
  }

  private DE_ItemOther() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/itemother.json'), 'utf8');
  }

  private DE_JobName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/jobname.json'), 'utf8');
  }

  private DE_SkillName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/skillname.json'), 'utf8');
  }

  private DE_UnitName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/unitname.json'), 'utf8');
  }

  private DE_VisionCardName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/visioncardname.json'), 'utf8');
  }

  private DE_ItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/itemname.json'), 'utf8');
  }

  private DE_PlayerTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/playerawardsname.json'), 'utf8');
  }

  private DE_PlayerTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/playerawardsdescription.json'), 'utf8');
  }

  private DE_GuildTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/guildawardsname.json'), 'utf8');
  }

  private DE_GuildTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/guildawardsdescription.json'), 'utf8');
  }

  private DE_TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/questtitle.json'), 'utf8');
  }

  private DE_TowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/towertitle.json'), 'utf8');
  }

  private DE_TowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/de/towerfloortitle.json'), 'utf8');
  }

  /* ES Local files */
  private ES_ArtifactGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/artifactgrow.json'), 'utf8');
  }

  private ES_ArtifactName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/artifactname.json'), 'utf8');
  }

  private ES_BuffName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/buffname.json'), 'utf8');
  }

  private ES_ItemOther() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/itemother.json'), 'utf8');
  }

  private ES_JobName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/jobname.json'), 'utf8');
  }

  private ES_SkillName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/skillname.json'), 'utf8');
  }

  private ES_UnitName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/unitname.json'), 'utf8');
  }

  private ES_VisionCardName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/visioncardname.json'), 'utf8');
  }

  private ES_ItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/itemname.json'), 'utf8');
  }

  private ES_PlayerTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/playerawardsname.json'), 'utf8');
  }

  private ES_PlayerTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/playerawardsdescription.json'), 'utf8');
  }

  private ES_GuildTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/guildawardsname.json'), 'utf8');
  }

  private ES_GuildTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/guildawardsdescription.json'), 'utf8');
  }

  private ES_TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/questtitle.json'), 'utf8');
  }

  private ES_TowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/towertitle.json'), 'utf8');
  }

  private ES_TowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/es/towerfloortitle.json'), 'utf8');
  }

  /* KO Local files */
  private KO_ArtifactGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/artifactgrow.json'), 'utf8');
  }

  private KO_ArtifactName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/artifactname.json'), 'utf8');
  }

  private KO_BuffName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/buffname.json'), 'utf8');
  }

  private KO_ItemOther() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/itemother.json'), 'utf8');
  }

  private KO_JobName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/jobname.json'), 'utf8');
  }

  private KO_SkillName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/skillname.json'), 'utf8');
  }

  private KO_UnitName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/unitname.json'), 'utf8');
  }

  private KO_VisionCardName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/visioncardname.json'), 'utf8');
  }

  private KO_ItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/itemname.json'), 'utf8');
  }

  private KO_PlayerTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/playerawardsname.json'), 'utf8');
  }

  private KO_PlayerTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/playerawardsdescription.json'), 'utf8');
  }

  private KO_GuildTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/guildawardsname.json'), 'utf8');
  }

  private KO_GuildTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/guildawardsdescription.json'), 'utf8');
  }

  private KO_TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/questtitle.json'), 'utf8');
  }

  private KO_TowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/towertitle.json'), 'utf8');
  }

  private KO_TowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/ko/towerfloortitle.json'), 'utf8');
  }

  /* ZH Local files */
  private ZH_ArtifactGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/artifactgrow.json'), 'utf8');
  }

  private ZH_ArtifactName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/artifactname.json'), 'utf8');
  }

  private ZH_BuffName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/buffname.json'), 'utf8');
  }

  private ZH_ItemOther() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/itemother.json'), 'utf8');
  }

  private ZH_JobName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/jobname.json'), 'utf8');
  }

  private ZH_SkillName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/skillname.json'), 'utf8');
  }

  private ZH_UnitName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/unitname.json'), 'utf8');
  }

  private ZH_VisionCardName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/visioncardname.json'), 'utf8');
  }

  private ZH_ItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/itemname.json'), 'utf8');
  }

  private ZH_PlayerTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/playerawardsname.json'), 'utf8');
  }

  private ZH_PlayerTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/playerawardsdescription.json'), 'utf8');
  }

  private ZH_GuildTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/guildawardsname.json'), 'utf8');
  }

  private ZH_GuildTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/guildawardsdescription.json'), 'utf8');
  }

  private ZH_TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/questtitle.json'), 'utf8');
  }

  private ZH_TowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/towertitle.json'), 'utf8');
  }

  private ZH_TowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/zh/towerfloortitle.json'), 'utf8');
  }



  private JP_ArtifactGrow() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/artifactgrow.json'), 'utf8');
  }

  private JP_ArtifactName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/artifactname.json'), 'utf8');
  }

  private JP_BuffName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/buffname.json'), 'utf8');
  }

  private JP_ItemOther() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/itemother.json'), 'utf8');
  }

  private JP_JobName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/jobname.json'), 'utf8');
  }

  private JP_SkillName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/skillname.json'), 'utf8');
  }

  private JP_UnitName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/unitname.json'), 'utf8');
  }

  private JP_VisionCardName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/visioncardname.json'), 'utf8');
  }

  private JP_ItemName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/itemname.json'), 'utf8');
  }

  private JP_PlayerTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/playerawardsname.json'), 'utf8');
  }

  private JP_PlayerTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/playerawardsdescription.json'), 'utf8');
  }

  private JP_GuildTitleName() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/guildawardsname.json'), 'utf8');
  }

  private JP_GuildTitleDesc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/guildawardsdescription.json'), 'utf8');
  }

  private JP_TranslateQuestTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/questtitle.json'), 'utf8');
  }

  private JP_TowerTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/towertitle.json'), 'utf8');
  }

  private JP_TowerFloorTitle() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp/towerfloortitle.json'), 'utf8');
  }



  private JP_Romaji() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp_romaji.json'), 'utf8');
  }

  private JP_Titles_Name() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp_titles_name.json'), 'utf8');
  }

  private JP_Titles_Desc() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/jp_titles_desc.json'), 'utf8');
  }



  private GL_Maps() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/map/gl/maps.json'), 'utf8');
  }

  private JP_Maps() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/map/jp/maps.json'), 'utf8');
  }



  private GL_Grids() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/map/gl/grids.json'), 'utf8');
  }

  private JP_Grids() {
    return this.fs.readFile(this.path.resolve(__dirname, 'data/map/jp/grids.json'), 'utf8');
  }



  private GL_OldUnits() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/gl/units.json'), 'utf8');
  }

  private GL_OldCards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/gl/cards.json'), 'utf8');
  }

  private GL_OldEspers() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/gl/espers.json'), 'utf8');
  }

  private GL_OldEquipments() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/gl/equipments.json'), 'utf8');
  }

  private JP_OldUnits() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/jp/units.json'), 'utf8');
  }

  private JP_OldCards() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/jp/cards.json'), 'utf8');
  }

  private JP_OldEspers() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/jp/espers.json'), 'utf8');
  }

  private JP_OldEquipments() {
    return this.fs.readFile(this.path.resolve(__dirname, 'client/assets/data/jp/equipments.json'), 'utf8');
  }

  ignoredAssets = [
    "Thumbs.db@SynoEAStream",
    "Thumbs.db",
    ".DS_Store",
    ".DS_Store@SynoResource",
    "@eaDir"
  ];

  async getLastAssets() {
    await this.getItemAssets();
    await this.getCardAssets();
    await this.getEquipmentAssets();
    await this.getJobAssets();
    await this.getUnitAssets();
    await this.getTitleAssets();
    this.getGrids();
    this.getMaps();
    this.getLocales();
  }

  async getItemAssets() {
    console.log('### Get Items assets');
    const itemFolders = [
      '../wotv-assets/japan/itemicon/lapis/m',
      '../wotv-assets/japan/itemicon/lapis/s',
      '../wotv-assets/japan/itemicon/collabo/m',
      '../wotv-assets/japan/itemicon/collabo/s',
      '../wotv-assets/global/itemicon/lapis/m',
      '../wotv-assets/global/itemicon/lapis/s',
      '../wotv-assets/global/itemicon/lapisww/m',
      '../wotv-assets/global/itemicon/lapisww/s',
      '../wotv-assets/global/itemicon/collabo/m',
      '../wotv-assets/global/itemicon/collabo/s'
    ];

    for (const folder of itemFolders) {
      for (const fileName of this.fsSync.readdirSync(folder)) {
        if (this.ignoredAssets.indexOf(fileName) === -1 && !this.fsSync.existsSync('client/assets/items/' + fileName)) {
          console.log(fileName);
          await this.importAndCropImage(folder + '/' + fileName, 'client/assets/items/' + fileName);
        }
      }
    }
  }

  async getCardAssets() {
    console.log('### Get Cards assets');
    const cardFolders = [
      '../wotv-assets/japan/vision/lapis',
      '../wotv-assets/japan/vision/collabo',
      '../wotv-assets/global/vision/lapis',
      '../wotv-assets/global/vision/lapisww',
      '../wotv-assets/global/vision/collabo'
    ];

    for (const folder of cardFolders) {
      for (const subDirName of this.fsSync.readdirSync(folder)) {
        const subFolder = folder + '/' + subDirName;
        if (this.fsSync.lstatSync(subFolder).isDirectory() ) {
          for (const fileName of this.fsSync.readdirSync(subFolder)) {
            if (this.ignoredAssets.indexOf(fileName) === -1 && !this.fsSync.existsSync('client/assets/cards/' + fileName)) {
              console.log(fileName);
              await this.importAndCropImage(subFolder + '/' + fileName, 'client/assets/cards/' + fileName);
            }
          }
        }
      }
    }
  }

  async getEquipmentAssets() {
    console.log('### Get Equipment assets');
    const equipmentFolders = [
      '../wotv-assets/japan/artifact/lapis',
      '../wotv-assets/japan/artifact/collabo',
      '../wotv-assets/global/artifact/lapis',
      '../wotv-assets/global/artifact/lapisww',
      '../wotv-assets/global/artifact/collabo'
    ];

    for (const folder of equipmentFolders) {
      for (const subDirName of this.fsSync.readdirSync(folder)) {
        const subFolder = folder + '/' + subDirName + '/icon';
        if (this.ignoredAssets.indexOf(subDirName) === -1 && this.fsSync.lstatSync(subFolder).isDirectory() ) {
          for (const fileName of this.fsSync.readdirSync(subFolder)) {
            if (this.ignoredAssets.indexOf(fileName) === -1 && !this.fsSync.existsSync('client/assets/equipments/' + fileName)) {
              console.log(fileName);
              await this.importAndCropImage(subFolder + '/' + fileName, 'client/assets/equipments/' + fileName);
            }
          }
        }
      }
    }
  }

  async getJobAssets() {
    console.log('### Get Job assets');
    const jobFolders = [
      '../wotv-assets/japan/unit/collabo/job',
      '../wotv-assets/japan/unit/lapis/job',
      '../wotv-assets/global/unit/collabo/job',
      '../wotv-assets/global/unit/lapis/job',
      '../wotv-assets/global/unit/lapisww/job'
    ];

    for (const folder of jobFolders) {
      for (const subDirName of this.fsSync.readdirSync(folder)) {
        const subFolder = folder + '/' + subDirName + '/icon';
        if (this.ignoredAssets.indexOf(subDirName) === -1 && this.fsSync.lstatSync(subFolder).isDirectory() ) {
          for (const fileName of this.fsSync.readdirSync(subFolder)) {
            if (this.ignoredAssets.indexOf(subDirName) === -1 && this.fsSync.lstatSync(subFolder + '/' + fileName).isDirectory() ) {
              for (const subFileName of this.fsSync.readdirSync(subFolder + '/' + fileName)) {
                if (this.ignoredAssets.indexOf(subFileName) === -1
                  && subFileName.split('_')[subFileName.split('_').length - 1] != 'm.png'
                  && subFileName.split('_')[subFileName.split('_').length - 1] != 'item.png'
                  && !this.fsSync.existsSync('client/assets/jobs/' + subFileName)
                ) {
                  console.log(subFileName);
                  await this.importAndCropImage(subFolder + '/' + fileName + '/' + subFileName, 'client/assets/jobs/' + subFileName);
                }
              }
            } else if (this.ignoredAssets.indexOf(fileName) === -1
              && fileName.split('_')[fileName.split('_').length - 1] != 'm.png'
              && fileName.split('_')[fileName.split('_').length - 1] != 'item.png'
              && !this.fsSync.existsSync('client/assets/jobs/' + fileName)
            ) {
              console.log(fileName.split('_')[fileName.split('_').length - 1]);
              await this.importAndCropImage(subFolder + '/' + fileName, 'client/assets/jobs/' + fileName);
            }
          }
        }
      }
    }
  }

  async getUnitAssets() {
    console.log('### Get Units assets');
    const unitFolders = [
      '../wotv-assets/japan/unit/collabo/unit',
      '../wotv-assets/japan/unit/lapis/unit',
      '../wotv-assets/global/unit/collabo/unit',
      '../wotv-assets/global/unit/lapis/unit',
      '../wotv-assets/global/unit/lapisww/unit'
    ];

    for (const folder of unitFolders) {
      for (const subDirName of this.fsSync.readdirSync(folder)) {
        const iconPath = [folder, subDirName, 'icon'].join('/');
        if (this.fsSync.existsSync(iconPath) && this.fsSync.lstatSync(iconPath).isDirectory() ) {
          for (const fileName of this.fsSync.readdirSync(iconPath)) {
            if (this.ignoredAssets.indexOf(fileName) === -1
              && (fileName.split('_').length === 1
                || (
                  fileName.split('_')[fileName.split('_').length - 1] != 'angry.png'
                  && fileName.split('_')[fileName.split('_').length - 1] != 'sad.png'
                  && fileName.split('_')[fileName.split('_').length - 1] != 'smile.png'
                  && fileName.split('_')[fileName.split('_').length - 1] != 'surprised.png'
                  && fileName.split('_')[fileName.split('_').length - 1] != 'surprosed.png'
                  && fileName.split('_')[fileName.split('_').length - 1] != 'setting.txt'
                )
              )
              && !this.fsSync.existsSync('client/assets/units/' + fileName)
            ) {
              console.log(fileName);
              await this.importAndCropImage(iconPath + '/' + fileName, 'client/assets/units/' + fileName);
            }
          }
        }
      }
    }
  }

  async getTitleAssets() {
    console.log('### Get Titles assets');
    const titleFolders = [
      '../wotv-assets/japan/localize/ja/texture/award/guild/collabo',
      '../wotv-assets/japan/localize/ja/texture/award/guild/lapis',
      '../wotv-assets/japan/localize/ja/texture/award/player/collabo',
      '../wotv-assets/japan/localize/ja/texture/award/player/lapis',
      '../wotv-assets/global/localize/en/texture/award/guild/collabo',
      '../wotv-assets/global/localize/en/texture/award/guild/lapis',
      '../wotv-assets/global/localize/en/texture/award/player/collabo',
      '../wotv-assets/global/localize/en/texture/award/player/lapis'
    ];

    for (const folder of titleFolders) {
      for (const fileName of this.fsSync.readdirSync(folder)) {
        if (this.ignoredAssets.indexOf(fileName) === -1 && fileName.split('_').length > 1 && fileName.split('_')[1] === 'special') {
          const croppedFileNameTab = fileName.split('_').splice(2, fileName.split('_').length - 2).join('_');

          await this.importAndCropImage(folder + '/' + fileName, 'client/assets/titles/' + croppedFileNameTab);
        }
      }
    }
  }

  getGrids() {
    console.log('### Import Grids');
    const gridData = {
      global: {},
      japan: {}
    };
    const gridFolders = [
      '../wotv-assets/global/map/lapis/grid',
      '../wotv-assets/global/map/collabo/grid',
      '../wotv-assets/japan/map/lapis/grid',
      '../wotv-assets/japan/map/collabo/grid',
    ];

    for (const folder of gridFolders) {
      for (const subFolderName of this.fsSync.readdirSync(folder)) {
        const subFolder = folder + '/' + subFolderName;
        for (const subSubFolderName of this.fsSync.readdirSync(subFolder)) {
          const subSubFolder = subFolder + '/' + subSubFolderName;
          for (const fileName of this.fsSync.readdirSync(subSubFolder)) {
            const splittedFileName = fileName.split('_');
            if (splittedFileName[splittedFileName.length - 1] === 'Default.txt' || splittedFileName[splittedFileName.length - 1] === 'Default.json') {
              const gridName = fileName.split('_').splice(0, fileName.split('_').length - 1).join('_');

              gridData[subSubFolder.split('/')[2]][gridName] = this.extract_map_grid(subSubFolder + '/' + fileName);
            }
          }
        }
      }
    }

    this.fsSync.writeFileSync(this.path.resolve(__dirname, 'data/map/gl/grids.json'), JSON.stringify(gridData.global, null, 2));
    this.fsSync.writeFileSync(this.path.resolve(__dirname, 'data/map/jp/grids.json'), JSON.stringify(gridData.japan, null, 2));
  }

  extract_map_grid(fileName) {
    const struct = require('python-struct');
    const file = this.fsSync.readFileSync(fileName)
    const mapGrid = [];
    const tileCount = struct.unpack("<I", this.getBufferBits(file, 4, 4))

    let textCount = 0;
    for (let i = 0; i < tileCount[0]; i++) {
      const tailDetail = struct.unpack("<IIIH", this.getBufferBits(file, 8 + textCount + (i * 14), 14));

      let text = '';
      if (tailDetail[3] != 0) {
        text = this.getBufferBits(file, 8 + textCount + ((i + 1) * 14), tailDetail[3]).toString('utf8')
        textCount += tailDetail[3];
      }

      mapGrid.push({
        x: tailDetail[0],
        y: tailDetail[1],
        h: tailDetail[2],
        t: text
      });
    }

    return mapGrid;
  }

  getBufferBits(buffer, start, count) {
    let temporaryBuffer = new Buffer(count);
    for (let i = 0; i < count; i++) {
      temporaryBuffer[i] = buffer[i + start];
    }

    return temporaryBuffer;
  }

  getLocales() {
    console.log('### Import Locales');
    const localeFolders = [
      {
        'srcFolder': '../wotv-assets/global/localize/fr/text/masterparam',
        'destFolder': 'data/fr'
      },
      {
        'srcFolder': '../wotv-assets/global/localize/en/text/masterparam',
        'destFolder': 'data/en'
      },
      {
        'srcFolder': '../wotv-assets/global/localize/de/text/masterparam',
        'destFolder': 'data/de'
      },
      {
        'srcFolder': '../wotv-assets/global/localize/es/text/masterparam',
        'destFolder': 'data/es'
      },
      {
        'srcFolder': '../wotv-assets/global/localize/ko/text/masterparam',
        'destFolder': 'data/ko'
      },
      {
        'srcFolder': '../wotv-assets/global/localize/zh/text/masterparam',
        'destFolder': 'data/zh'
      },
      {
        'srcFolder': '../wotv-assets/japan/localize/ja/text/masterparam',
        'destFolder': 'data/jp'
      }
    ];
    const localeFiles = [
      'artifactgrow',
      'artifactname',
      'buffname',
      'guildawardsname',
      'guildawardsdescription',
      'itemname',
      'itemother',
      'jobname',
      'playerawardsname',
      'playerawardsdescription',
      'quest/questtitle',
      'skillname',
      'unitname',
      'visioncardname',
      'towertitle',
      'towerfloortitle'
    ];

    for (const localeFolder of localeFolders) {
      for (const localeFile of localeFiles) {
        if (localeFile.split('/').length > 1) {
          if (this.fsSync.existsSync(localeFolder['destFolder'] + '/' + localeFile.split('/')[1] + '.json')) {
            this.fsSync.unlinkSync(localeFolder['destFolder'] + '/' + localeFile.split('/')[1] + '.json');
          }

          this.fsSync.copyFileSync(
            localeFolder['srcFolder'] + '/' + localeFile + '.txt',
            localeFolder['destFolder'] + '/' + localeFile.split('/')[1] + '.json',
            this.fsSync.constants.COPYFILE_FICLONE_FORCE
          )
        } else {
          if (this.fsSync.existsSync(localeFolder['destFolder'] + '/' + localeFile + '.json')) {
            this.fsSync.unlinkSync(localeFolder['destFolder'] + '/' + localeFile + '.json');
          }

          this.fsSync.copyFileSync(
            localeFolder['srcFolder'] + '/' + localeFile + '.txt',
            localeFolder['destFolder'] + '/' + localeFile + '.json',
            this.fsSync.constants.COPYFILE_FICLONE_FORCE
          )
        }
      }
    }
  }

  getMaps() {
    console.log('### Import maps')
    const mapData = {
      map: {},
      jp_map: {}
    };
    const mapFolders = [
      '../wotv-dump/map',
      '../wotv-dump/jp_map'
    ];

    for (const folder of mapFolders) {
      for (const fileName of this.fsSync.readdirSync(folder)) {
        const rawData = JSON.parse(this.fsSync.readFileSync(this.path.resolve(__dirname, folder + '/' + fileName), 'utf8'));
        const mapName = fileName.split('.')[0];

        mapData[folder.split('/')[2]][mapName] = {}
        if (rawData['drop_table_list']) {
          mapData[folder.split('/')[2]][mapName]['drop_table_list'] = {};
          rawData['drop_table_list'].forEach(dropTable => {
            if (dropTable['iname'] !== 'CRYSTAL_00') {
              mapData[folder.split('/')[2]][mapName]['drop_table_list'][dropTable['iname']] = dropTable;
            }
          });
        }

        if (rawData['enemy']) {
          const enemy = []
          for (const rawEnemy of rawData['enemy']) {
            const reducedEnemy = {
              iname: rawEnemy['iname'],
              x: rawEnemy['x'],
              y: rawEnemy['y'],
              lv: rawEnemy['lv'],
              elem: rawEnemy['elem'],
              brave: rawEnemy['brave'],
              faith: rawEnemy['faith'],
              skills: rawEnemy['skills'],
              drop: rawEnemy['drop'],
              side: rawEnemy['side'],
              status: rawEnemy['status'],
              tag: rawEnemy['name'],
              entryCond: []
            };

            if (rawEnemy['part'] && rawEnemy['part']['body'] && rawEnemy['part']['body'] !== '') {
              reducedEnemy.hasBody = true;
            }

            if (rawEnemy['nrmSkl'] && rawEnemy['nrmSkl']['iname'] !== "") {
              reducedEnemy.nrmSkl = rawEnemy['nrmSkl']['iname'];
            }

            if (rawEnemy.entry_cond && rawEnemy.entry_cond.list && rawEnemy.entry_cond.list.length > 0) {
              rawEnemy.entry_cond.list.forEach(li =>{
                if (!this.enemyEntryCond[String(li.self.type)] && mapName.split('_')[0] !== 'debug') {
                  console.log("Enemy entry cond not known (" + li.self.type + "): " + mapName);
                }

                const entryCond = [{
                  type: this.enemyEntryCond[String(li.self.type)],
                  value: li.self.json
                }];

                li.childs.forEach(child => {
                  if (!this.enemyEntryCond[String(child.type)] && mapName.split('_')[0] !== 'debug') {
                    console.log("Child Enemy entry cond not known (" + child.type + "): " + mapName);
                  }

                  entryCond.push({
                    type: this.enemyEntryCond[String(child.type)],
                    value: child.json
                  });
                });

                reducedEnemy.entryCond.push(entryCond);
              })
            }

            enemy.push(reducedEnemy);
          }

          mapData[folder.split('/')[2]][mapName]['enemy'] = enemy;
        }

        if (rawData['party']) {
          const party = [];
          for (const rawParty of rawData['party']) {
            party.push({
              x: rawParty['x'],
              y: rawParty['y']
            });
          }

          mapData[folder.split('/')[2]][mapName]['party'] = party;
        }

        if (rawData['arena']) {
          const arena = []
          for (const rawArena of rawData['arena']) {
            arena.push({
              x: rawArena['x'],
              y: rawArena['y']
            });
          }

          mapData[folder.split('/')[2]][mapName].arena = arena;
        }

        if (rawData['wcond']) {
          mapData[folder.split('/')[2]][mapName].winCond = [];

          rawData['wcond'].list.forEach(li =>{
            if (!this.enemyEntryCond[String(li.self.type)] && mapName.split('_')[0] !== 'debug') {
              console.log("Win cond not known (" + li.self.type + "): " + mapName);
            }

            const winCond = [{
              type: this.enemyEntryCond[String(li.self.type)],
              value: li.self.json
            }];

            li.childs.forEach(child => {
              if (!this.enemyEntryCond[String(child.type)] && mapName.split('_')[0] !== 'debug') {
                console.log("Child Enemy entry cond not known (" + child.type + "): " + mapName);
              }

              winCond.push({
                type: this.enemyEntryCond[String(child.type)],
                value: child.json
              });
            });

            mapData[folder.split('/')[2]][mapName].winCond.push(winCond);
          });
        }

        if (rawData['lcond']) {
          mapData[folder.split('/')[2]][mapName].looseCond = [];

          rawData['lcond'].list.forEach(li =>{
            if (!this.enemyEntryCond[String(li.self.type)] && mapName.split('_')[0] !== 'debug') {
              console.log("Win cond not known (" + li.self.type + "): " + mapName);
            }

            const looseCond = [{
              type: this.enemyEntryCond[String(li.self.type)],
              value: li.self.json
            }];

            li.childs.forEach(child => {
              if (!this.enemyEntryCond[String(child.type)] && mapName.split('_')[0] !== 'debug') {
                console.log("Child Enemy entry cond not known (" + child.type + "): " + mapName);
              }

              looseCond.push({
                type: this.enemyEntryCond[String(child.type)],
                value: child.json
              });
            });

            mapData[folder.split('/')[2]][mapName].looseCond.push(looseCond);
          });

        }
      }
    }

    this.fsSync.writeFileSync(this.path.resolve(__dirname, 'data/map/gl/maps.json'), JSON.stringify(mapData.map, null, 2));
    this.fsSync.writeFileSync(this.path.resolve(__dirname, 'data/map/jp/maps.json'), JSON.stringify(mapData.jp_map, null, 2));
  }

  async importAndCropImage(src, dst) {
    const getPixels = require('get-pixels');

    await new Promise(function(resolve, reject) {
      getPixels(src, (err, pixels) => {
        if (err) {
          console.log('image not found for trim : ' + src);
          resolve('file not found')
        }

        const w = pixels.shape[0];
        const h = pixels.shape[1];

        let i, j, a;

        let cropData = {
          top: 0,
          right: w,
          bottom: h,
          left: 0,
        };

        top:
        for (j = 0; j < h; j++) {
          cropData.top = j;

          for (i = 0; i < w; i++) {
            a = pixels.get(i, j, 3);

            if (a !== 0) break top;
          }
        }

        right:
        for (i = w - 1; i >= 0; i--) {
          for (j = h - 1; j >= 0; j--) {
            a = pixels.get(i, j, 3);

            if (a !== 0) break right;
          }

          cropData.right = i;
        }

        bottom:
        for (j = h - 1; j >= 0; j--) {
          for (i = w - 1; i >= 0; i--) {
            a = pixels.get(i, j, 3);

            if (a !== 0) break bottom;
          }

          cropData.bottom = j;
        }

        left:
        for (i = 0; i < w; i++) {
          cropData.left = i;

          for (j = 0; j < h; j++) {
            a = pixels.get(i, j, 3);

            if (a !== 0) break left;
          }
        }

        // Check error
        if ((cropData.left > cropData.right) || (cropData.top > cropData.bottom)) {
          console.log('Crop coordinates overflow: ' + src);
          resolve('Crop coordinates overflow: ' + src);
        } else {
          const savePixels = require('save-pixels');
          const mkdirp = require('mkdirp');
          const path = require('path');
          const fs = require('fs');

          const dirname = path.dirname(dst);

          if (!fs.existsSync(dirname)) {
            mkdirp(dirname, function (err) {
              if (err) console.error(err);
            });
          }

          savePixels(pixels.hi(cropData.right, cropData.bottom).lo(cropData.left, cropData.top), 'png').pipe(fs.createWriteStream(dst));
          resolve(null);
        }
      });
    });
  }

  async getJsons() {
    await this.getLastAssets();

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
      this.JPSkillExc(),
    ]).then(async responses => {
      this.gl.units = this.formatJson(JSON.parse(responses[0]));
      this.gl.boards = this.formatJson(JSON.parse(responses[1]));
      this.gl.skills = this.formatJson(JSON.parse(responses[2]));
      this.gl.buffs = this.formatJson(JSON.parse(responses[3]));
      this.gl.jobs = this.formatJson(JSON.parse(responses[4]));
      this.gl.equipments = this.formatJson(JSON.parse(responses[5]));
      this.gl.visionCards = this.formatJson(JSON.parse(responses[6]));
      this.gl.espersBoards = this.formatJson(JSON.parse(responses[7]));
      this.gl.weathers = this.formatJson(JSON.parse(responses[8]));
      this.gl.espersTbl = this.formatJson(JSON.parse(responses[9]));
      this.gl.equipmentRecipes = this.formatJson(JSON.parse(responses[10]));
      this.gl.equipementLots = this.formatJson(JSON.parse(responses[11]));
      this.gl.grows = this.formatJson(JSON.parse(responses[12]));
      this.gl.unitModels = this.formatJson(JSON.parse(responses[34]));
      this.gl.EquipmentCond = this.formatJson(JSON.parse(responses[36]));
      this.gl.raid = this.formatJson(JSON.parse(responses[38]));
      this.gl.raidBoss = this.formatJson(JSON.parse(responses[39]));
      this.gl.equipmentAwakes = this.formatJson(JSON.parse(responses[42]));
      this.gl.items = this.formatJson(JSON.parse(responses[45]));
      this.gl.cardConditions = this.formatJson(JSON.parse(responses[47]));
      this.gl.masterRanks = this.formatJson(JSON.parse(responses[49]));
      this.gl.masterRanksEffects = this.formatJson(JSON.parse(responses[50]));
      this.gl.playerTitles = this.formatJson(JSON.parse(responses[53]));
      this.gl.guildTitles = this.formatJson(JSON.parse(responses[54]));
      this.gl.jobsTbl = this.formatJson(JSON.parse(responses[61]));
      this.gl.jobsMaterials = this.formatJson(JSON.parse(responses[63]));
      this.gl.unitsMaterials = this.formatJson(JSON.parse(responses[65]));
      this.gl.unitClassChangeCondition = this.formatJson(JSON.parse(responses[67]));
      this.gl.raidBonusUnit = this.formatJson(JSON.parse(responses[69]));
      this.gl.raidBonusCard = this.formatJson(JSON.parse(responses[70]));
      this.gl.quests = this.formatJson(JSON.parse(responses[73]));
      this.gl.questMissions = this.formatJson(JSON.parse(responses[108]));
      this.gl.grids = JSON.parse(responses[110]);
      this.gl.maps = JSON.parse(responses[104]);
      this.gl.towerFloors = this.formatJson(JSON.parse(responses[113]));
      this.gl.towerRewards = this.formatJson(JSON.parse(responses[114]));
      this.gl.skillExc = this.formatJson(JSON.parse(responses[187]));

      this.jp.units = this.formatJson(JSON.parse(responses[13]));
      this.jp.boards = this.formatJson(JSON.parse(responses[14]));
      this.jp.skills = this.formatJson(JSON.parse(responses[15]));
      this.jp.buffs = this.formatJson(JSON.parse(responses[16]));
      this.jp.jobs = this.formatJson(JSON.parse(responses[17]));
      this.jp.equipments = this.formatJson(JSON.parse(responses[18]));
      this.jp.visionCards = this.formatJson(JSON.parse(responses[19]));
      this.jp.espersBoards = this.formatJson(JSON.parse(responses[20]));
      this.jp.weathers = this.formatJson(JSON.parse(responses[21]));
      this.jp.espersTbl = this.formatJson(JSON.parse(responses[22]));
      this.jp.equipmentRecipes = this.formatJson(JSON.parse(responses[23]));
      this.jp.equipementLots = this.formatJson(JSON.parse(responses[24]));
      this.jp.grows = this.formatJson(JSON.parse(responses[25]));
      this.jp.unitModels = this.formatJson(JSON.parse(responses[35]));
      this.jp.EquipmentCond = this.formatJson(JSON.parse(responses[37]));
      this.jp.raid = this.formatJson(JSON.parse(responses[40]));
      this.jp.raidBoss = this.formatJson(JSON.parse(responses[41]));
      this.jp.equipmentAwakes = this.formatJson(JSON.parse(responses[43]));
      this.jp.items = this.formatJson(JSON.parse(responses[46]));
      this.jp.cardConditions = this.formatJson(JSON.parse(responses[48]));
      this.jp.masterRanks = this.formatJson(JSON.parse(responses[51]));
      this.jp.masterRanksEffects = this.formatJson(JSON.parse(responses[52]));
      this.jp.playerTitles = this.formatJson(JSON.parse(responses[55]));
      this.jp.guildTitles = this.formatJson(JSON.parse(responses[56]));
      this.jp.jobsTbl = this.formatJson(JSON.parse(responses[62]));
      this.jp.jobsMaterials = this.formatJson(JSON.parse(responses[64]));
      this.jp.unitsMaterials = this.formatJson(JSON.parse(responses[66]));
      this.jp.unitClassChangeCondition = this.formatJson(JSON.parse(responses[68]));
      this.jp.raidBonusUnit = this.formatJson(JSON.parse(responses[71]));
      this.jp.raidBonusCard = this.formatJson(JSON.parse(responses[72]));
      this.jp.quests = this.formatJson(JSON.parse(responses[74]));
      this.jp.questMissions = this.formatJson(JSON.parse(responses[109]));
      this.jp.grids = JSON.parse(responses[111]);
      this.jp.maps = JSON.parse(responses[112]);
      this.jp.towerFloors = this.formatJson(JSON.parse(responses[115]));
      this.jp.towerRewards = this.formatJson(JSON.parse(responses[116]));
      this.jp.skillExc = this.formatJson(JSON.parse(responses[188]));

      this.names.en.unit = this.formatNames(JSON.parse(responses[26]));
      this.names.en.job = this.formatNames(JSON.parse(responses[27]));
      this.names.en.skill = this.formatNames(JSON.parse(responses[28]));
      this.names.en.buff = this.formatNames(JSON.parse(responses[29]));
      this.names.en.equipment = this.formatNames(JSON.parse(responses[30]));
      this.names.en.visionCard = this.formatNames(JSON.parse(responses[31]));
      this.names.en.itemOther = this.formatNames(JSON.parse(responses[32]));
      this.names.en.equipmentGrow = this.formatNames(JSON.parse(responses[33]));
      this.names.en.item = this.formatNames(JSON.parse(responses[44]));
      this.names.en.playerTitleName = this.formatNames(JSON.parse(responses[57]));
      this.names.en.playerTitleDesc = this.formatNames(JSON.parse(responses[58]));
      this.names.en.guildTitleName = this.formatNames(JSON.parse(responses[59]));
      this.names.en.guildTitleDesc = this.formatNames(JSON.parse(responses[60]));
      this.names.en.questTitle = this.formatNames(JSON.parse(responses[105]));
      this.names.en.towerTitle = this.formatNames(JSON.parse(responses[117]));
      this.names.en.towerFloorTitle = this.formatNames(JSON.parse(responses[118]));

      this.names.fr.equipmentGrow = this.formatNames(JSON.parse(responses[75]));
      this.names.fr.equipment = this.formatNames(JSON.parse(responses[76]));
      this.names.fr.buff = this.formatNames(JSON.parse(responses[77]));
      this.names.fr.itemOther = this.formatNames(JSON.parse(responses[78]));
      this.names.fr.job = this.formatNames(JSON.parse(responses[79]));
      this.names.fr.skill = this.formatNames(JSON.parse(responses[80]));
      this.names.fr.unit = this.formatNames(JSON.parse(responses[81]));
      this.names.fr.visionCard = this.formatNames(JSON.parse(responses[82]));
      this.names.fr.item = this.formatNames(JSON.parse(responses[83]));
      this.names.fr.playerTitleName = this.formatNames(JSON.parse(responses[84]));
      this.names.fr.playerTitleDesc = this.formatNames(JSON.parse(responses[85]));
      this.names.fr.guildTitleName = this.formatNames(JSON.parse(responses[86]));
      this.names.fr.guildTitleDesc = this.formatNames(JSON.parse(responses[87]));
      this.names.fr.questTitle = this.formatNames(JSON.parse(responses[106]));
      this.names.fr.towerTitle = this.formatNames(JSON.parse(responses[119]));
      this.names.fr.towerFloorTitle = this.formatNames(JSON.parse(responses[120]));

      this.names.zh.equipmentGrow = this.formatNames(JSON.parse(responses[123]));
      this.names.zh.equipment = this.formatNames(JSON.parse(responses[124]));
      this.names.zh.buff = this.formatNames(JSON.parse(responses[125]));
      this.names.zh.itemOther = this.formatNames(JSON.parse(responses[126]));
      this.names.zh.job = this.formatNames(JSON.parse(responses[127]));
      this.names.zh.skill = this.formatNames(JSON.parse(responses[128]));
      this.names.zh.unit = this.formatNames(JSON.parse(responses[129]));
      this.names.zh.visionCard = this.formatNames(JSON.parse(responses[130]));
      this.names.zh.item = this.formatNames(JSON.parse(responses[131]));
      this.names.zh.playerTitleName = this.formatNames(JSON.parse(responses[132]));
      this.names.zh.playerTitleDesc = this.formatNames(JSON.parse(responses[133]));
      this.names.zh.guildTitleName = this.formatNames(JSON.parse(responses[134]));
      this.names.zh.guildTitleDesc = this.formatNames(JSON.parse(responses[135]));
      this.names.zh.questTitle = this.formatNames(JSON.parse(responses[136]));
      this.names.zh.towerTitle = this.formatNames(JSON.parse(responses[137]));
      this.names.zh.towerFloorTitle = this.formatNames(JSON.parse(responses[138]));

      this.names.ko.equipmentGrow = this.formatNames(JSON.parse(responses[139]));
      this.names.ko.equipment = this.formatNames(JSON.parse(responses[140]));
      this.names.ko.buff = this.formatNames(JSON.parse(responses[141]));
      this.names.ko.itemOther = this.formatNames(JSON.parse(responses[142]));
      this.names.ko.job = this.formatNames(JSON.parse(responses[143]));
      this.names.ko.skill = this.formatNames(JSON.parse(responses[144]));
      this.names.ko.unit = this.formatNames(JSON.parse(responses[145]));
      this.names.ko.visionCard = this.formatNames(JSON.parse(responses[146]));
      this.names.ko.item = this.formatNames(JSON.parse(responses[147]));
      this.names.ko.playerTitleName = this.formatNames(JSON.parse(responses[148]));
      this.names.ko.playerTitleDesc = this.formatNames(JSON.parse(responses[149]));
      this.names.ko.guildTitleName = this.formatNames(JSON.parse(responses[150]));
      this.names.ko.guildTitleDesc = this.formatNames(JSON.parse(responses[151]));
      this.names.ko.questTitle = this.formatNames(JSON.parse(responses[152]));
      this.names.ko.towerTitle = this.formatNames(JSON.parse(responses[153]));
      this.names.ko.towerFloorTitle = this.formatNames(JSON.parse(responses[154]));

      this.names.de.equipmentGrow = this.formatNames(JSON.parse(responses[155]));
      this.names.de.equipment = this.formatNames(JSON.parse(responses[156]));
      this.names.de.buff = this.formatNames(JSON.parse(responses[157]));
      this.names.de.itemOther = this.formatNames(JSON.parse(responses[158]));
      this.names.de.job = this.formatNames(JSON.parse(responses[159]));
      this.names.de.skill = this.formatNames(JSON.parse(responses[160]));
      this.names.de.unit = this.formatNames(JSON.parse(responses[161]));
      this.names.de.visionCard = this.formatNames(JSON.parse(responses[162]));
      this.names.de.item = this.formatNames(JSON.parse(responses[163]));
      this.names.de.playerTitleName = this.formatNames(JSON.parse(responses[164]));
      this.names.de.playerTitleDesc = this.formatNames(JSON.parse(responses[165]));
      this.names.de.guildTitleName = this.formatNames(JSON.parse(responses[166]));
      this.names.de.guildTitleDesc = this.formatNames(JSON.parse(responses[167]));
      this.names.de.questTitle = this.formatNames(JSON.parse(responses[168]));
      this.names.de.towerTitle = this.formatNames(JSON.parse(responses[169]));
      this.names.de.towerFloorTitle = this.formatNames(JSON.parse(responses[170]));

      this.names.es.equipmentGrow = this.formatNames(JSON.parse(responses[171]));
      this.names.es.equipment = this.formatNames(JSON.parse(responses[172]));
      this.names.es.buff = this.formatNames(JSON.parse(responses[173]));
      this.names.es.itemOther = this.formatNames(JSON.parse(responses[174]));
      this.names.es.job = this.formatNames(JSON.parse(responses[175]));
      this.names.es.skill = this.formatNames(JSON.parse(responses[176]));
      this.names.es.unit = this.formatNames(JSON.parse(responses[177]));
      this.names.es.visionCard = this.formatNames(JSON.parse(responses[178]));
      this.names.es.item = this.formatNames(JSON.parse(responses[179]));
      this.names.es.playerTitleName = this.formatNames(JSON.parse(responses[180]));
      this.names.es.playerTitleDesc = this.formatNames(JSON.parse(responses[181]));
      this.names.es.guildTitleName = this.formatNames(JSON.parse(responses[182]));
      this.names.es.guildTitleDesc = this.formatNames(JSON.parse(responses[183]));
      this.names.es.questTitle = this.formatNames(JSON.parse(responses[184]));
      this.names.es.towerTitle = this.formatNames(JSON.parse(responses[185]));
      this.names.es.towerFloorTitle = this.formatNames(JSON.parse(responses[186]));

      this.names.jp.equipmentGrow = this.formatNames(JSON.parse(responses[88]));
      this.names.jp.equipment = this.formatNames(JSON.parse(responses[89]));
      this.names.jp.buff = this.formatNames(JSON.parse(responses[90]));
      this.names.jp.itemOther = this.formatNames(JSON.parse(responses[91]));
      this.names.jp.job = this.formatNames(JSON.parse(responses[92]));
      this.names.jp.skill = this.formatNames(JSON.parse(responses[93]));
      this.names.jp.unit = this.formatNames(JSON.parse(responses[94]));
      this.names.jp.visionCard = this.formatNames(JSON.parse(responses[95]));
      this.names.jp.item = this.formatNames(JSON.parse(responses[96]));
      this.names.jp.playerTitleName = this.formatNames(JSON.parse(responses[97]));
      this.names.jp.playerTitleDesc = this.formatNames(JSON.parse(responses[98]));
      this.names.jp.guildTitleName = this.formatNames(JSON.parse(responses[99]));
      this.names.jp.guildTitleDesc = this.formatNames(JSON.parse(responses[100]));
      this.names.jp.questTitle = this.formatNames(JSON.parse(responses[107]));
      this.names.jp.towerTitle = this.formatNames(JSON.parse(responses[121]));
      this.names.jp.towerFloorTitle = this.formatNames(JSON.parse(responses[122]));

      this.jpRomaji = JSON.parse(responses[101]);
      this.jpTitlesName = JSON.parse(responses[102]);
      this.jpTitlesDesc = JSON.parse(responses[103]);

      Promise.all([
        this.GL_OldUnits(),
        this.GL_OldEspers(),
        this.GL_OldCards(),
        this.GL_OldEquipments(),
        this.JP_OldUnits(),
        this.JP_OldEspers(),
        this.JP_OldCards(),
        this.JP_OldEquipments()
      ]).then(async responsesRound2 => {
        this.gl.oldUnits = JSON.parse(responsesRound2[0]);
        this.gl.oldEspers = JSON.parse(responsesRound2[1]);
        this.gl.oldCards = JSON.parse(responsesRound2[2]);
        this.gl.oldEquipments = JSON.parse(responsesRound2[3]);
        this.jp.oldUnits = JSON.parse(responsesRound2[4]);
        this.jp.oldEspers = JSON.parse(responsesRound2[5]);
        this.jp.oldCards = JSON.parse(responsesRound2[6]);
        this.jp.oldEquipments = JSON.parse(responsesRound2[7]);

        await this.formatJsons();

        console.log('==== GL RESULT ====');
        console.log('Units : ' + Object.keys(this.gl.wotvUnits).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/units.json'), JSON.stringify(this.gl.wotvUnits, null, 2));

        console.log('VisionCards : ' + Object.keys(this.gl.wotvVisionCards).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/cards.json'), JSON.stringify(this.gl.wotvVisionCards, null, 2));

        console.log('Espers : ' + Object.keys(this.gl.wotvEspers).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/espers.json'), JSON.stringify(this.gl.wotvEspers, null, 2));

        console.log('Equipments : ' + Object.keys(this.gl.wotvEquipments).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/equipments.json'), JSON.stringify(this.gl.wotvEquipments, null, 2));

        console.log('Jobs : ' + Object.keys(this.gl.wotvJobs).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/jobs.json'), JSON.stringify(this.gl.wotvJobs, null, 2));

        console.log('Raids : ' + Object.keys(this.gl.wotvRaids).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/raids.json'), JSON.stringify(this.gl.wotvRaids, null, 2));

        console.log('Items : ' + Object.keys(this.gl.wotvItems).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/items.json'), JSON.stringify(this.gl.wotvItems, null, 2));

        console.log('MasterRanks : ' + Object.keys(this.gl.wotvMasterRanks).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/masterRanks.json'), JSON.stringify(this.gl.wotvMasterRanks, null, 2));

        console.log('PlayerTitles : ' + Object.keys(this.gl.wotvPlayerTitles).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/playerTitles.json'), JSON.stringify(this.gl.wotvPlayerTitles, null, 2));

        console.log('GuildTitles : ' + Object.keys(this.gl.wotvGuildTitles).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/guildTitles.json'), JSON.stringify(this.gl.wotvGuildTitles, null, 2));

        console.log('Quests : ' + Object.keys(this.gl.wotvQuests).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/quests.json'), JSON.stringify(this.gl.wotvQuests, null, 2));

        console.log('OtherUnits : ' + Object.keys(this.gl.wotvOtherUnits).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/otherUnits.json'), JSON.stringify(this.gl.wotvOtherUnits, null, 2));

        console.log('Skills : ' + Object.keys(this.gl.wotvSkills).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/gl/skills.json'), JSON.stringify(this.gl.wotvSkills, null, 2));


        console.log('==== JP RESULT ====');
        console.log('Units : ' + Object.keys(this.jp.wotvUnits).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/units.json'), JSON.stringify(this.jp.wotvUnits, null, 2));

        console.log('VisionCards : ' + Object.keys(this.jp.wotvVisionCards).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/cards.json'), JSON.stringify(this.jp.wotvVisionCards, null, 2));

        console.log('Espers : ' + Object.keys(this.jp.wotvEspers).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/espers.json'), JSON.stringify(this.jp.wotvEspers, null, 2));

        console.log('Equipments : ' + Object.keys(this.jp.wotvEquipments).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/equipments.json'), JSON.stringify(this.jp.wotvEquipments, null, 2));

        console.log('Jobs : ' + Object.keys(this.jp.wotvJobs).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/jobs.json'), JSON.stringify(this.jp.wotvJobs, null, 2));

        console.log('Raids : ' + Object.keys(this.jp.wotvRaids).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/raids.json'), JSON.stringify(this.jp.wotvRaids, null, 2));

        console.log('Items : ' + Object.keys(this.jp.wotvItems).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/items.json'), JSON.stringify(this.jp.wotvItems, null, 2));

        console.log('MasterRanks : ' + Object.keys(this.jp.wotvMasterRanks).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/masterRanks.json'), JSON.stringify(this.jp.wotvMasterRanks, null, 2));

        console.log('PlayerTitles : ' + Object.keys(this.jp.wotvPlayerTitles).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/playerTitles.json'), JSON.stringify(this.jp.wotvPlayerTitles, null, 2));

        console.log('GuildTitles : ' + Object.keys(this.jp.wotvGuildTitles).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/guildTitles.json'), JSON.stringify(this.jp.wotvGuildTitles, null, 2));

        console.log('Quests : ' + Object.keys(this.jp.wotvQuests).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/quests.json'), JSON.stringify(this.jp.wotvQuests, null, 2));

        console.log('OtherUnits : ' + Object.keys(this.jp.wotvOtherUnits).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/otherUnits.json'), JSON.stringify(this.jp.wotvOtherUnits, null, 2));

        console.log('Skills : ' + Object.keys(this.jp.wotvSkills).length);
        this.fs.writeFile(this.path.resolve(__dirname, 'client/assets/data/jp/skills.json'), JSON.stringify(this.jp.wotvSkills, null, 2));

        console.log('==== JP ROMAJI ====');
        console.log(Object.keys(this.jpRomaji).length)
        this.fs.writeFile(this.path.resolve(__dirname, 'data/jp_romaji.json'), JSON.stringify(this.jpRomaji, null, 2));
      });
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

  private async formatJsons() {
    const versions = ['gl', 'jp'];
    for (let i = 0; i < versions.length; i ++) {
      this.version = versions[i];

      console.log('Start Work : ' + this.version.toUpperCase());

      Object.keys(this[this.version].jobs).forEach(jobId => {
        this.addJob(this[this.version].jobs[jobId]);
      });

      for (const unitId of Object.keys(this[this.version].units)) {
        if (this[this.version].units[unitId].type === 0) {
          await this.addUnit(this[this.version].units[unitId]);
        }

        if (this[this.version].units[unitId].type === 1 && unitId !== 'UN_FF10_S_VLFR') {
          await this.addEsper(this[this.version].units[unitId]);
        }
      }

      this.cleanUnits();

      for (const visionCardId of Object.keys(this[this.version].visionCards)) {
        await this.addVisionCard(this[this.version].visionCards[visionCardId]);
      }

      for (const equipmentId of Object.keys(this[this.version].equipments)) {
        await this.addEquipment(this[this.version].equipments[equipmentId]);
      }

      Object.keys(this[this.version].items).forEach(itemId => {
        this.addItem(this[this.version].items[itemId]);
      });

      this.formatMasterRanks();

      this.formatTitles();

      await this.formatQuests();
      await this.formatTowers();

      await this.formatRaid();

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
      if (this.isWeapon(this.jobEquip[equip])) {
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

  isWeapon(type) {
    return this.weaponTypes.indexOf(type) !== -1 ? true : false;
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

  private async addUnit(rawUnit) {
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
      tmr: null,
      releaseDate: ''
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
    await this.getNames(unit, 'unit');

    this.getStats(unit, rawUnit.status, 'unit');
    this.getMoveJumpUnit(unit);
    this.getLB(unit, rawUnit.limit);
    this.getAttackSkill(unit, rawUnit.atkskl);
    this.getMasterSkill(unit, rawUnit.mstskl);
    this.getSkillsAndBuffs(unit);

    this.addReleaseDate(unit, 'oldUnits')

    this[this.version].wotvUnits[dataId] = unit;
  }

  addReleaseDate(item, type) {
    let releaseDateFound = false;

    if (this[this.version][type][item.dataId] && type !== 'oldEquipments') {
      item.releaseDate = this[this.version][type][item.dataId].releaseDate;
      releaseDateFound = true;
    }

    if (type === 'oldEquipments') {
      Object.keys(this[this.version][type]).forEach(equipmentId => {
        if (this[this.version][type][equipmentId].dataId === item.dataId) {
          item.releaseDate = this[this.version][type][equipmentId].releaseDate;
          releaseDateFound = true;
        }
      });
    }

    if (!releaseDateFound) {
      const date = new Date();
      let day = String(date.getDate());
      let month = String(date.getMonth() + 1);
      const year = date.getFullYear();

      if (day.length < 2) {
        day = '0' + day;
      }

      if (month.length < 2) {
        month = '0' + month;
      }

      item.releaseDate = day + '/' + month + '/' + year;

      console.log('New ' + type.substring(3, type.length - 1) + ' : ' + item.dataId);
    }
  }

  private getUnitImage(unit, dataId = null) {
    if (this[this.version].unitModels[dataId ? dataId : unit.dataId] && this[this.version].unitModels[dataId ? dataId : unit.dataId].img) {
      unit.image = this[this.version].unitModels[dataId ? dataId : unit.dataId].img.toLowerCase();
    }
  }

  private async addVisionCard(visionCard) {
    const dataId = visionCard.iname;

    if (visionCard.type === 0) {
      const card = {
        dataId: dataId,
        names: {},
        cost: visionCard.cost,
        rarity: this.rarity[visionCard.rare],
        stats: {},
        image: visionCard.icon.toLowerCase(),
        releaseDate: ''
      };

      await this.getNames(card, 'visionCard');
      this.getStats(card, visionCard.status, 'visionCard');

      this.getVisionCardSkillsAndBuffs(card, visionCard);

      this.addReleaseDate(card, 'oldCards')

      this[this.version].wotvVisionCards[dataId] = card;

      if (visionCard.first_bonus_unit && this[this.version].wotvEspers[visionCard.first_bonus_unit]) {
        this[this.version].wotvEspers[visionCard.first_bonus_unit].rarity = card.rarity;
      }
    }
  }

  private async getNames(item, type, getSlug = true, overwriteType = null) {
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
            const jpTranslateService = new JpTranslateService();
            await jpTranslateService.convert(slug).then(translatedText => {
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
          unlockStar: item.unlock_value + 1,
          unlockJob: item.get_job,
          jobLevel: item.need_level,
          jp: item.jp,
          mainSkill: this[this.version].skills[item.value] && this[this.version].skills[item.value].slot === 1
        };

        this.addSkill(item.value, unit);

        if (item.ival) {
          unit.board.nodes[item.panel_id].skill = {
            effects: [
              {
                type: "INCREASE_UNIT_LEVEL",
                value: item.ival,
                calcType: "fixe"
              }
            ],
            type: "buff"
          };
        }
      });

      this[this.version].boards[unit.dataId].lines.forEach(line => {
        unit.board.lines.push(line.line_id);
      });
    }

    let OldUpgrades = [];

    if (unit.replacedSkills) {
      while (Object.keys(unit.replacedSkills).length > OldUpgrades.length) {
        OldUpgrades = Object.keys(unit.replacedSkills);

        Object.keys(unit.replacedSkills).forEach(replace => {
          unit.replacedSkills[replace].forEach(upgrade => {
            if (!this[this.version].skills[upgrade.newSkill].slot) {
              let previousSkillType = 'skill';
              if (this[this.version].wotvSkills[upgrade.oldSkill]) {
                previousSkillType = this[this.version].wotvSkills[upgrade.oldSkill].type;
              }

              this[this.version].skills[upgrade.newSkill].slot = this.slots.indexOf(previousSkillType);
            }

            this.addSkill(upgrade.newSkill, unit);
          });
        });
      }
    }
  }

  private getVisionCardSkillsAndBuffs(visionCard, rawVisionCard) {
    if (rawVisionCard.card_buffs) {
      visionCard.partyBuffs = [];
      rawVisionCard.card_buffs.forEach(dataBuff => {
        const buff = {
          classic: dataBuff.card_skill,
          awake: dataBuff.add_card_skill_buff_awake,
          lvmax: dataBuff.add_card_skill_buff_lvmax,
          cond : dataBuff.cnds_iname ? this.addCardCond(dataBuff.cnds_iname) : []
        };

        if (dataBuff.card_skill) {
          this.addSkill(dataBuff.card_skill, visionCard);
        }

        if (dataBuff.add_card_skill_buff_awake) {
          this.addSkill(dataBuff.add_card_skill_buff_awake, visionCard);
        }

        if (dataBuff.add_card_skill_buff_lvmax) {
          this.addSkill(dataBuff.add_card_skill_buff_lvmax, visionCard);
        }

        visionCard.partyBuffs.push(buff);
      });
    }

    if (rawVisionCard.self_buffs) {
      visionCard.unitBuffs = [];
      rawVisionCard.self_buffs.forEach(dataBuff => {
        const buff = {
          classic: dataBuff.self_buff,
          awake: dataBuff.add_self_buff_awake,
          lvmax: dataBuff.add_self_buff_lvmax,
          cond : dataBuff.buff_cond ? this.addCardCond(dataBuff.buff_cond) : []
        };

        if (dataBuff.self_buff) {
          this.addSkill(dataBuff.self_buff, visionCard);
        }

        if (dataBuff.add_self_buff_awake) {
          this.addSkill(dataBuff.add_self_buff_awake, visionCard);
        }

        if (dataBuff.add_self_buff_lvmax) {
          this.addSkill(dataBuff.add_self_buff_lvmax, visionCard);
        }

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
          type: 'mainJob',
          items: []
        };

        cardCond.mainjobs.forEach(job => {
          newCond.items.push(job);
        });

        formattedCond.push(newCond);
      }

      if (cardCond.jobs) {
        const newCond = {
          type: 'job',
          items: []
        };

        cardCond.jobs.forEach(job => {
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

  private addSkill(skillId, item) {
    if (!this[this.version].wotvSkills[skillId] && (this[this.version].skills[skillId] || this[this.version].buffs[skillId])) {
      let rawSkill = this[this.version].skills[skillId];
      if (!rawSkill) {
        rawSkill = this[this.version].buffs[skillId];
        rawSkill.slot = 0;
      }

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

    if (this[this.version].skills[skillId] || this[this.version].buffs[skillId]) {
      let rawSkill = this[this.version].skills[skillId];
      if (!rawSkill) {
        rawSkill = this[this.version].buffs[skillId];
      }

      if (rawSkill.replace) {
        if (!item.replacedSkills) {
          item.replacedSkills = {};
        }

        if (!item.replacedSkills[skillId]) {
          item.replacedSkills[skillId] = [];
        }

        rawSkill.replace.forEach(change => {
          item.replacedSkills[skillId].push({
            oldSkill: change.skill_base,
            newSkill: change.skill_after
          });
        });
      }
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
    skill.maxLevel = dataSkill.cap;

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
        minValue: dataSkill.barrier.scut ? dataSkill.barrier.scut : dataSkill.barrier.slife,
        maxValue: dataSkill.barrier.ecut ? dataSkill.barrier.ecut : dataSkill.barrier.elife,
        calcType: dataSkill.barrier.elife ? 'hp' : 'percent',
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
      this.addSkill(lbId, unit);

      unit.limit = lbId;
    }
  }

  private getAttackSkill(unit, attackId) {
    if (attackId) {
      this[this.version].skills[attackId].elem = [0];
      this[this.version].skills[attackId].slot = 1;
      if (!this[this.version].skills[attackId].eff_val) {
        this[this.version].skills[attackId].eff_val = 0;
        this[this.version].skills[attackId].eff_val1 = 0;
      }

      this.addSkill(attackId, unit);

      unit.attack = attackId;
    }
  }

  private getMasterSkill(unit, skillId) {
    if (skillId) {
      if (Array.isArray(skillId)) {
        unit.masterSkill = [];

        skillId.forEach(id => {
          this.addSkill(id, unit);

          unit.masterSkill.push(id);
        });
      } else {
        this.addSkill(skillId, unit);

        unit.masterSkill =  [skillId];
      }
    }
  }

  private async addEsper(esper) {
    const dataId = esper.iname;

    this[this.version].wotvEspers[dataId] = {
      dataId: dataId,
      names: {},
      rarity: '',
      cost: esper.cost,
      skill: esper.atkskl,
      stats: {},
      SPs : [],
      element: this.elements[esper.elem[0]],
      image: esper.charaId.toLowerCase(),
      board: {
        nodes: {},
        lines: []
      }
    };

    this.addSkill(esper.atkskl, esper);
    this.getUnitImage(this[this.version].wotvEspers[dataId]);

    await this.getNames(this[this.version].wotvEspers[dataId], 'unit');

    this.addReleaseDate(this[this.version].wotvEspers[dataId], 'oldEspers')

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
          sp: item.sp,
          unlockStar: item.unlock_value + 1
        };

        this.addSkill(item.value, esper);
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

  private async addEquipment(rawEquipment) {
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
        acquisition: null,
        releaseDate: ''
      };

      await this.getNames(equipment, 'equipment');

      this.addReleaseDate(equipment, 'oldEquipments');

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
              dataId: skillId,
              upgrade: [i],
              grow: this[this.version].skills[skillId].grow,
              maxLevel: this[this.version].grows[this[this.version].skills[skillId].grow].curve[0].lv
            };

            if (!this[this.version].skills[skillId].slot) {
              this[this.version].skills[skillId].slot = 3;
            }

            this.addSkill(skillId, this[this.version].wotvEquipments[rType]);
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

  private async formatRaid() {
    for (const raidId of Object.keys(this[this.version].raid)) {
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

        let bossIndex = 0;
        for (const boss of raid.prob) {
          await this.addRaidBoss(this[this.version].wotvRaids[raidId], boss.boss_id);
          bossIndex++;
        }

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
    }
  }

  private async addRaidBoss(raid, bossId) {
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
    await this.getNames(boss, 'unit');
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
            emblem: dataRank.emblem_img.toLowerCase() === 'attribute_warter' ? 'attribute_water' : dataRank.emblem_img.toLowerCase(),
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

  private glExcluUnits = [
    'UN_LW_P_FRVA'
  ];

  private glExcluJobs = [
  ];

  getGLExclusiveUnitIds() {
    return this.glExcluUnits;
  }

  getGLExclusiveJobIds() {
    return this.glExcluJobs;
  }

  exportGLexclusiveToJP() {
    if (this.version === 'jp') {
      this.getGLExclusiveJobIds().forEach(jobId => {
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

      this.getGLExclusiveUnitIds().forEach(unitId => {
        this.jp.wotvUnits[unitId] = this.gl.wotvUnits[unitId];
        const tmrId = this.jp.wotvUnits[unitId].tmr;
        this.jp.wotvEquipments[tmrId] = this.gl.wotvEquipments[tmrId];

        const skillToAdd = [];
        if (this.jp.wotvUnits[unitId].limit) {
          skillToAdd.push(this.jp.wotvUnits[unitId].limit);
        }

        skillToAdd.push(this.jp.wotvUnits[unitId].attack);

        this.jp.wotvUnits[unitId].masterSkill.forEach(skillId => {
          skillToAdd.push(skillId);
        });

        if (this.jp.wotvUnits[unitId].replacedSkills) {
          Object.keys(this.jp.wotvUnits[unitId].replacedSkills).forEach(upgradeId => {
            this.jp.wotvUnits[unitId].replacedSkills[upgradeId].forEach(upgrade => {
              skillToAdd.push(upgrade.newSkill);
            });
          });
        }

        Object.keys(this.jp.wotvUnits[unitId].board.nodes).forEach(nodeId => {
          skillToAdd.push(this.jp.wotvUnits[unitId].board.nodes[nodeId].dataId);
        });

        skillToAdd.forEach(skillId => {
          if (!this.jp.wotvSkills[skillId] && this.gl.wotvSkills[skillId]) {
            this.jp.wotvSkills[skillId] = this.gl.wotvSkills[skillId];
          }
        });
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

  async formatQuests() {
    let questIndex = 0;
    for (const questId of Object.keys(this[this.version].quests)) {
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

      await this.getNames(formattedQuest, 'questTitle', true, 'quest');

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
      await this.formatMap(formattedQuest, quest.map.set);

      this[this.version].wotvQuests[questId] = formattedQuest;
      questIndex++;
    }
  }

  async formatTowers() {
    for (const questId of Object.keys(this[this.version].towerFloors)) {
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

      const questTranslation = await this.getTowerFloorName(questId, quest.tower_iname, quest.ex);
      formattedQuest.names = questTranslation.names;
      formattedQuest.slug = questTranslation.slug;

      this.getTowerReward(formattedQuest, quest.reward_id);

      this.getQuestSkills(formattedQuest, quest.map.buffs);

      this.formatGrid(formattedQuest, quest.map.scn);
      await this.formatMap(formattedQuest, quest.map.set);

      this[this.version].wotvQuests[questId] = formattedQuest;
    }
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

  async formatMap(quest, mapId) {
    if (this[this.version].maps[mapId.split('/')[1]]) {
      const map = this[this.version].maps[mapId.split('/')[1]];
      if (map.drop_table_list) {
        Object.keys(map.drop_table_list).forEach(dropTable => {
          if (dropTable !== 'steal') {
            map.drop_table_list[dropTable].totalRate = this.getDropTotalRate(map.drop_table_list[dropTable].drop_list);
          }
        });
      }

      if (map.winCond) {
        map.winCond.forEach(entry => {
          entry.forEach(condition => {
            if (condition.value) {
              condition.condition = JSON.parse(condition.value);
              delete condition.value;
            }
          });
        });

        quest.winCond = map.winCond;
      }

      if (map.looseCond) {
        map.looseCond.forEach(entry => {
          entry.forEach(condition => {
            if (condition.value) {
              condition.condition = JSON.parse(condition.value);
              delete condition.value;
            }
          });
        });

        quest.looseCond = map.looseCond;
      }

      if (map.enemy) {
        for (const enemy of map.enemy) {
          this.checkIfTileExist(quest, enemy);

          if (enemy.side === 0 && enemy.iname.split('_')[1] !== 'GM') {
            quest.grid[enemy.x][enemy.y].ally = quest.allies.length;
            quest.allies.push(this.formatEnemyForQuest(enemy));
            await this.addOtherUnit(enemy, false, 'ally');
          } else {
            if (enemy.iname === 'UN_GM_TREASURE') {
              quest.grid[enemy.x][enemy.y].chest = quest.chests.length;
              quest.chests.push(this.formatEnemyForQuest(enemy));
              await this.addOtherUnit(enemy, true, 'chest');
            } else if (enemy.iname === 'UN_GM_SWITCH' || enemy.iname === 'UN_GM_SWITCH_01' || enemy.iname === 'UN_GM_SWITCH_02' || enemy.iname === 'UN_GM_SWITCH_03') {
              quest.grid[enemy.x][enemy.y].switch = quest.switchs.length;
              quest.switchs.push(this.formatEnemyForQuest(enemy));
              await this.addOtherUnit(enemy, true, 'switch');
            } else if (enemy.iname.split('_')[1] === 'GM') {
              quest.grid[enemy.x][enemy.y].object = quest.objects.length;
              quest.objects.push(this.formatEnemyForQuest(enemy));
              await this.addOtherUnit(enemy, true, 'object');
            } else {
              if (!enemy.hasBody) {
                quest.grid[enemy.x][enemy.y].enemy = quest.enemies.length;
              }
              quest.enemies.push(this.formatEnemyForQuest(enemy));
              await this.addOtherUnit(enemy, false, 'enemy');
            }
          }
        }
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

    if (formattedEnemy.status) {
      const rawStatus = JSON.parse(formattedEnemy.status);
      if (Object.keys(rawStatus).length > 0) {
        formattedEnemy.status = [];
        rawStatus.list.forEach(status => {
          if (!this.statusParam[status.type]) {
            console.log("Unknow statusParam : " + status.type);
          }

          status.type = this.statusParam[status.type];

          formattedEnemy.status.push(status);
        });
      } else {
        delete formattedEnemy.status;
      }
    }

    formattedEnemy.entryCond.forEach(entry => {
      entry.forEach(condition => {
        condition.condition = JSON.parse(condition.value);
        delete condition.value;
      });
    });

    if (formattedEnemy.status === '') {
      delete formattedEnemy.status;
    }

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

  private async addOtherUnit(otherUnit, object, type) {
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
        realMaxLevel: 99,
        type: type
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

      await this.getNames(unit, 'unit');

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

  private async getTowerFloorName(floorId, towerId, ex) {
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
          const jpTranslateService = new JpTranslateService();
          await jpTranslateService.convert(floorNames.en).then(translatedText => {
            this.jpRomaji[floorNames.en] = translatedText;
            floorSlug = this.slug.slugify(translatedText);
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

const jsonService = new JsonService();
jsonService.getJsons();
