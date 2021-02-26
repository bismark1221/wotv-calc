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
    wotvDropRates: {},
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
    quests: {}
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
    wotvDropRates: {},
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
    quests: {}
  };

  jpRomaji = {};
  jpTitlesName = {};
  jpTitlesDesc = {};

  maps = {};

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
      questTitle: {}
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
      questTitle: {}
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
      questTitle: {}
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
    110: 'FLOAT',
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
    183: 'ACTIVATION_TIME',
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
    347: 'HEAL_POWER',
    501: 'ABSORB_HP_ONTIME',
    502: 'FROSTBITE'
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
    'metal'
  ];

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
    19: 'BEHIND'
  };

  strengthType = {
    1: 'DEAD_UNITS',
    50: 'UNIT_ACTIONS',
    51: 'COUNT_DAMAGE_RECEIVED',
    53: 'UNIT_LEVEL',
    72: 'HEIGHT',
    73: 'TARGET_LEVEL',
    99: 'MODIFY_ABSORB'
  };

  strengthFormulaCondition = {
    0: 'FIX',
    1: 'CURVE',
    22: 'RATIO',
    50: 'PERCENT',
    1000: 'COUNT'
  };

  strengthModifier = {
    0: 'DAMAGE',
    7: 'EFFECT',
    8: 'CHANCE',
    9: 'ABSORB'
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
  }

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
    'FROSTBITE'
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
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLMasterRank() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/MasterRank.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLMasterRankEffect() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/MasterRankEffect.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLPlayersAward() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/PlayersAward.json').toPromise();
  }

  private GLGuildsAward() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/GuildsAward.json').toPromise();
  }

  private GLJobLvTbl() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/JobLvTbl.json').toPromise();
  }

  private GLJobMaterialItem() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/JobMaterialItem.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLUnitMaterialItem() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/UnitMaterialItem.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLUnitClassChangeCondition() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/UnitClassChangeCondition.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLRaidBonusUnit() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/RaidBonusUnit.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLRaidBonusCard() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/RaidBonusVisioncard.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
      });
  }

  private GLQuests() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/data/Quests.json').toPromise()
      .then(data => {
        return data;
      }).catch(function(error) {
        return {items: []};
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

  private JPPlayersAward() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/PlayersAward.json').toPromise();
  }

  private JPGuildsAward() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/GuildsAward.json').toPromise();
  }

  private JPJobLvTbl() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/JobLvTbl.json').toPromise();
  }

  private JPJobMaterialItem() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/JobMaterialItem.json').toPromise();
  }

  private JPUnitMaterialItem() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/UnitMaterialItem.json').toPromise();
  }

  private JPUnitClassChangeCondition() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/UnitClassChangeCondition.json').toPromise();
  }

  private JPRaidBonusUnit() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/RaidBonusUnit.json').toPromise();
  }

  private JPRaidBonusCard() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/RaidBonusVisioncard.json').toPromise();
  }

  private JPQuests() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/jpdata/Quests.json').toPromise();
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

  private TranslatePlayerAwardsName() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/PlayerAwardsName.json').toPromise();
  }

  private TranslatePlayerAwardsDescription() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/PlayerAwardsDescription.json').toPromise();
  }

  private TranslateGuildAwardsName() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/GuildAwardsName.json').toPromise();
  }

  private TranslateGuildAwardsDescription() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/GuildAwardsDescription.json').toPromise();
  }

  private TranslateQuestTitle() {
    return this.http.get('https://raw.githubusercontent.com/shalzuth/wotv-ffbe-dump/master/en/QuestTitle.json').toPromise();
  }



  /* Local files */
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

      this.jpRomaji = responses[101];
      this.jpTitlesName = responses[102];
      this.jpTitlesDesc = responses[103];

      this.maps = responses[104];

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
          dropRates: this.gl.wotvDropRates
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
          dropRates: this.jp.wotvDropRates
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

      this.formatRaid();

      Object.keys(this[this.version].items).forEach(itemId => {
        this.addItem(this[this.version].items[itemId]);
      });

      this.formatMasterRanks();

      this.formatTitles();

      this.formatDropTables();

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
      } else {
        this[this.version].wotvJobs[dataId].names.en = dataId;
        this[this.version].wotvJobs[dataId].names.fr = dataId;
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
      if (this.version === 'gl') {
        this[this.version].jobsTbl[dataId].items.forEach((level, levelIndex) => {
          const levelMaterials = {};

          if (levelIndex !== 0) {
            for (let i = 1; i <= 10; i++) {
              if (level['eq' + i]) {
                levelMaterials[level['eq' + i].iname] = level['eq' + i].num;
              }
            }
          }

          materials.push(levelMaterials);
        });
      } else {
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

        if (this[this.version].unitClassChangeCondition[job.iname]) {
          const materialItemId = this[this.version].unitClassChangeCondition[job.iname].material_item_id;
          const unitMaterials = this[this.version].unitsMaterials[materialItemId];

          for (let i = 1; i <= 10; i++) {
            if (unitMaterials.items[0]['m' + i]) {
              if (!materials[0][unitMaterials.items[0]['m' + i].iname]) {
                materials[0][unitMaterials.items[0]['m' + i].iname] = unitMaterials.items[0]['m' + i].num;
              } else {
                materials[0][unitMaterials.items[0]['m' + i].iname] += unitMaterials.items[0]['m' + i].num;
              }
            }
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

  private addUnit(unit) {
    const dataId = unit.iname;
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
        this[this.version].wotvUnits[dataId].exJobs.push(exJob.m);
      });
    }

    this.getUnitImage(this[this.version].wotvUnits[dataId]);
    this.getNames(this[this.version].wotvUnits[dataId], 'unit');

    this.getStats(this[this.version].wotvUnits[dataId], unit.status, 'unit');
    this.getMoveJumpUnit(this[this.version].wotvUnits[dataId]);
    this.getLB(this[this.version].wotvUnits[dataId], unit.limit);
    this.getAttackSkill(this[this.version].wotvUnits[dataId], unit.atkskl);
    this.getMasterSkill(this[this.version].wotvUnits[dataId], unit.mstskl);
    this.getTMR(this[this.version].wotvUnits[dataId], unit.trust);
    this.getSkillsAndBuffs(this[this.version].wotvUnits[dataId]);
  }

  private getUnitImage(unit) {
    if (this[this.version].unitModels[unit.dataId] && this[this.version].unitModels[unit.dataId].img) {
      unit.image = this[this.version].unitModels[unit.dataId].img.toLowerCase();
    }
  }

  private addVisionCard(visionCard) {
    const dataId = visionCard.iname;

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
      this.getStats(this[this.version].wotvVisionCards[dataId], visionCard.status, 'visionCard');

      this.getVisionCardSkillsAndBuffs(this[this.version].wotvVisionCards[dataId], visionCard);
    }
  }

  private getNames(item, type, getSlug = true) {
    const id = item.dataId;

    if (this.version === 'gl') {
      if (this.names.en[type][id]) {
        item.names.en = this.names.en[type][id];
        item.names.fr = this.names.fr[type][id];
      } else {
        item.names.en = id;
        item.names.fr = id;
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
        || type === 'questTitle' && this.names.en[type][id]) {
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

      Object.keys(this[this.version]['wotv' + this.upperCaseFirst(type, false) + 's']).forEach(itemId => {
        if (this[this.version]['wotv' + this.upperCaseFirst(type, false) + 's'][itemId].slug === item.slug
          || this[this.version]['wotv' + this.upperCaseFirst(type, false) + 's'][itemId].slug === item.slug + '-' + i
        ) {
          i++;
        }
      });

      if (i > 1) {
        item.slug =  item.slug + '-' + (i - 1);
      }
      }
  }

  private getSkillsAndBuffs(unit) {
    if (this[this.version].boards[unit.dataId]) {
      this[this.version].boards[unit.dataId].panels.forEach(item => {

        unit.board.nodes[item.panel_id] = {
          dataId: item.value,
          type: item.panel_effect_type === 1 ? 'skill' : 'buff',
          skill: this.addSkill(unit, item)
        };
      });

      this[this.version].boards[unit.dataId].lines.forEach(line => {
        unit.board.lines.push(line.line_id);
      });
    }

    Object.keys(unit.replacedSkills).forEach(replace => {
      unit.replacedSkills[replace].forEach(upgrade => {
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

        upgrade.newSkill = this.addSkill(unit, fakePanelSkill);
      });
    });
  }

  private getVisionCardSkillsAndBuffs(visionCard, rawVisionCard) {
    // party GL
    if (rawVisionCard.card_skill) {
      visionCard.partyBuffs = [{
        classic: this.addSkill(visionCard, {slot: 0, value: rawVisionCard.card_skill}),
        awake: rawVisionCard.add_card_skill_buff_awake ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_card_skill_buff_awake}) : null,
        lvmax: rawVisionCard.add_card_skill_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_card_skill_buff_lvmax}) : null
      }];
    }

    // party JP
    if (rawVisionCard.card_buffs) {
      visionCard.partyBuffs = [];
      rawVisionCard.card_buffs.forEach(dataBuff => {
        const buff = {
          classic: dataBuff.card_skill ? this.addSkill(visionCard, {slot: 0, value: dataBuff.card_skill}) : null,
          awake: dataBuff.add_card_skill_buff_awake ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_card_skill_buff_awake}) : null,
          lvmax: dataBuff.add_card_skill_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_card_skill_buff_lvmax}) : null,
          cond : dataBuff.cnds_iname ? this.addCardCond(dataBuff.cnds_iname) : []
        };

        visionCard.partyBuffs.push(buff);
      });
    }

    // self GL
    if (rawVisionCard.self_buff) {
      visionCard.unitBuffs = [{
        classic: this.addSkill(visionCard, {slot: 0, value: rawVisionCard.self_buff}),
        awake: rawVisionCard.add_self_buff_awake ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_self_buff_awake}) : null,
        lvmax: rawVisionCard.add_self_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: rawVisionCard.add_self_buff_lvmax}) : null
      }];
    }

    // self JP
    if (rawVisionCard.self_buffs) {
      visionCard.unitBuffs = [];
      rawVisionCard.self_buffs.forEach(dataBuff => {
        const buff = {
          classic: dataBuff.self_buff ? this.addSkill(visionCard, {slot: 0, value: dataBuff.self_buff}) : null,
          awake: dataBuff.add_self_buff_awake ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_self_buff_awake}) : null,
          lvmax: dataBuff.add_self_buff_lvmax ? this.addSkill(visionCard, {slot: 0, value: dataBuff.add_self_buff_lvmax}) : null,
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

  private addSkill(unit, panelSkill) {
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
      reftar: null, // can be reflect or reflect target ?

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
      this.getNames(skill, 'skill', false);
      dataSkill.names = skill.names;

      Object.keys(dataSkill).forEach(key => {
        if (managedData.indexOf(key) === -1) {
          console.log('NOT MANAGED KEY : ' + key);
        }
      });
    }

    if (dataSkill.range_buff && dataSkill.range_buff !== 1) {
      console.log('@@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- range buff !== 1');
    }

    if (dataSkill.eff_w && dataSkill.eff_w !== 1 && dataSkill.eff_w !== 2) {
      console.log('@@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- eff_w !== 1');
    }

    if (Number.isInteger(dataSkill.target)) {
      if (!this.targetTypes[dataSkill.target]) {
        console.log('@@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- target : ' + dataSkill.target);
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
        calcType: 'percent'
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
          console.log('6 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- barrier : ' + dataSkill.bbrk);
          break;
      }

      skill.effects.push({
        type: type,
        target: this.targetTypes[dataSkill.target]
      });
    }

    if (dataSkill.acbst) {
      skill.effects.push({
        type: 'STOP_CHAIN_INCREASE_DAMAGE',
        value: dataSkill.acbst
      });
    }

    if (dataSkill.reflec) {
      skill.effects.push({
        type: 'REFLECT',
        value: dataSkill.reflec.type,
        turn: dataSkill.reflec.turn,
        target: this.targetTypes[dataSkill.target]
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
          console.log('1 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- KLSP : ' + ignore);
        }

        skill.effects.push({
          type: 'IGNORE_' + this.killers[ignore],
        });
      });
    }

    if (dataSkill.klsp) {
      dataSkill.klsp.forEach(killer => {
        if (!this.killers[killer]) {
          console.log('1 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- KLSP : ' + killer);
        }

        skill.effects.push({
          type: this.killers[killer] + '_KILLER',
          minValue: dataSkill.klspr,
          maxValue: dataSkill.klspr,
          calcType: 'unknow'
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
          console.log('6 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- barrier : ' + dataSkill.barrier.tar);
          break;
      }

      skill.effects.push({
        type: type,
        minValue: dataSkill.barrier.scut,
        maxValue: dataSkill.barrier.ecut,
        calcType: 'percent',
        turn: dataSkill.barrier.val,
        turnType: dataSkill.barrier.type !== 3 ? 'TURNS' : 'COUNT',
        target: this.targetTypes[dataSkill.target]
      });
    }

    if (dataSkill.chang) {
      skill.effects.push({
        type: 'SWITCH_POS'
      });
    }

    if (dataSkill.move) {
      skill.effects.push({
        type: 'MOVE_UNIT'
      });
    }

    if (dataSkill.ctave) {
      skill.effects.push({
        type: 'AVG_CT',
        target: this.targetTypes[dataSkill.target]
      });
    }

    if (dataSkill.stl_val) {
      skill.effects.push({
        type: 'STEAL',
        minValue: dataSkill.stl_val,
        maxValue: dataSkill.stl_val1,
        calcType: 'unknow',
        target: this.targetTypes[dataSkill.target]
      });
    }

    if (dataSkill.replace) {
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
          console.log('10 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- STRENGTH TYPE : ' + strength.type);
        } else if (!this.strengthFormulaCondition[strength.formula]) {
          console.log('11 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- STRENGTH FORMULA : ' + strength.formula);
        } else if (!this.strengthModifier[strength.dst]) {
          console.log('11 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- STRENGTH DST : ' + strength.dst);
        } else {
          const math = {
            type: this.strengthType[strength.type],
            formula: this.strengthType[strength.type] === 'COUNT_DAMAGE_RECEIVED' ? this.strengthFormulaCondition[1000] : this.strengthFormulaCondition[strength.formula],
            condition : strength.val1,
            value: strength.rate1,
            dst: this.strengthModifier[strength.dst]
          };

          skill.maths.push(math);
        }
      });
    }

    if (((typeof(dataSkill.eff_val) === 'number' && dataSkill.eff_val !== 0)
      || (typeof(dataSkill.eff_val1) === 'number' && dataSkill.eff_val1 !== 0))
      && dataSkill.eff_type !== 10
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
        console.log('2 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- DST : ' + dataSkill.eff_dst);
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
            const needToAddKiller = false;

            while (!finished && buff) {
              if (this[this.version].buffs[buff]['type' + i]) {
                if (duplicateFinded && this[this.version].buffs[buff]['type' + i] === 117) {} else {
                  if (!this.buffTypes[this[this.version].buffs[buff]['type' + i]]) {
                    console.log('3 @@@@@ ' + unit.names.en + ' -- ' + skill.names.en + ' -- EFFECT : ' + this[this.version].buffs[buff]['type' + i]);
                  }

                  if (this[this.version].buffs[buff]['id' + i]) {
                    const futurBuffId = this[this.version].buffs[this[this.version].buffs[buff]['id' + i]].iname;
                    fromImbue.push(futurBuffId);
                    buffs.push(futurBuffId);
                  }

                  if (this[this.version].buffs[buff]['tag' + i] && !this.killers[this[this.version].buffs[buff]['tag' + i]]) {
                    console.log('4 @@@@@ ' + (unit.names ? unit.names.en : unit.dataId) + ' -- ' + (skill.names ? skill.names.en : skill.dataId) + ' -- KILLER : ' + this[this.version].buffs[buff]['tag' + i]);
                  }

                  let type = this.buffTypes[this[this.version].buffs[buff]['type' + i]];
                  if (this[this.version].buffs[buff]['tag' + i]) {
                    if (type !== 'KILLER' && type !== 'IMBUE' && type !== 'WATER') {
                      skill.effects.push({
                        type: type
                      });
                      alreadyAddedBuffs.push(buff);
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
                          target: dataBuffsIndex === 0 ? skill.target : 'self'
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
                      target: dataBuffsIndex === 0 ? skill.target : 'self'
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

                    if (this[this.version].buffs[buff]['calc' + i] === 2) {
                      addedBuff.increaseMax = true;
                    } else {
                      delete addedBuff.increaseMax;
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
        dataId: lbId
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
        elem: []
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
            dataId: id
          };
          this.updateSkill(unit, masterSkill, id);

          unit.masterSkill.push(masterSkill);
        });
      } else {
        const masterSkill = {
          names: {},
          effects: [],
          dataId: skillId
        };
        this.updateSkill(unit, masterSkill, skillId);

        unit.masterSkill =  [masterSkill];
      }
    }
  }

  private getTMR(unit, tmrId) {
    if (tmrId) {
      const tmr = {
        names: {},
        stats: {},
        type: this.jobEquip[this[this.version].equipments[tmrId].cat[0]],
        dataId: tmrId,
        skills: [],
        image: this[this.version].equipments[tmrId].asset.toLowerCase()
      };

      this.getNames(tmr, 'equipment', false);

      Object.keys(this[this.version].equipments[tmrId].status[0]).forEach(stat => {
        tmr.stats[this.stats.unit[stat]] = this[this.version].equipments[tmrId].status[0][stat];
      });

      const lastSkillId = [];
      for (let i = 1; i <= 5; i++) {
        if (this[this.version].equipments[tmrId]['skl' + i]) {
          for (let j = 0; j < this[this.version].equipments[tmrId]['skl' + i].length; j++) {
            if (lastSkillId[j] !== this[this.version].equipments[tmrId]['skl' + i][j]) {
              const skill = {
                dataId: this[this.version].equipments[tmrId]['skl' + i][j],
                names: {},
                effects: [],
                type: this.slots[this[this.version].skills[this[this.version].equipments[tmrId]['skl' + i][j]].slot === 1 ? 1 : 3]
              };

              this.updateSkill(unit, skill, this[this.version].equipments[tmrId]['skl' + i][j]);
              tmr.skills.push(skill);
              lastSkillId[j] = this[this.version].equipments[tmrId]['skl' + i][j];
            }
          }
        }
      }

      unit.tmr = tmr;
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
      this.addSkill(this[this.version].wotvEspers[dataId], {slot: 1, value: esper.atkskl})
    ];

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
          skill: this.addSkill(esper, item)
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

  private addEquipment(equipment) {
    const dataId = equipment.iname;
    let rType = equipment.rtype !== 'AF_LOT_50' && equipment.rtype !== 'AF_LOT_TRUST' ? equipment.rtype : dataId;

    // @TODO Manage via recipe !!

    if (rType === 'AF_LOT_LW_HLM_005' || rType === 'AF_LOT_LW_RNG_007') {
      const splitDataId = dataId.split('_');
      rType = dataId;
      if (splitDataId[splitDataId.length - 1] === '1' || splitDataId[splitDataId.length - 1] === '2' || splitDataId[splitDataId.length - 1] === '3' || splitDataId[splitDataId.length - 1] === '4' || splitDataId[splitDataId.length - 1] === '5') {
        splitDataId.pop();
        rType = splitDataId.join('_');
      }
    }

    if ((this.version === 'jp' || this.names.en.equipment[dataId]) && equipment.type !== -1) {
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
        };

        this.getNames(this[this.version].wotvEquipments[rType], 'equipment');

        if (equipment.equip) {
          if (this[this.version].EquipmentCond[equipment.equip]) {
            if (this[this.version].EquipmentCond[equipment.equip].jobs) {
              this[this.version].EquipmentCond[equipment.equip].jobs.forEach(job => {
                this[this.version].wotvEquipments[rType].equippableJobs.push(job);
              });
            }

            if (this[this.version].EquipmentCond[equipment.equip].units) {
              this[this.version].EquipmentCond[equipment.equip].units.forEach(unit => {
                this[this.version].wotvEquipments[rType].equippableUnits.push(unit);
              });
            }
          } else {
            const uniqJobs = [];
            Object.keys(this[this.version].wotvJobs).forEach(jobId => {
              const tableJob = jobId.split('_');
              const genericDataId = tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2];

              if (uniqJobs.indexOf(genericDataId) === -1) {
                uniqJobs.push(genericDataId);
                this[this.version].wotvEquipments[rType].equippableJobs.push(jobId);
              }
            });
          }
        }

        if (equipment.trust) {
          let unitId = null;
          let i = 0;
          const unitIds = Object.keys(this[this.version].wotvUnits);

          while (!unitId && i < unitIds.length) {
            if (this[this.version].wotvUnits[unitIds[i]].tmr.dataId === dataId) {
              unitId = unitIds[i];
            }

            i++;
          }

          if (unitId) {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: 'tmr',
              unitId: unitId
            };
          } else {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: 'Unknown'
            };
          }
        } else if (this[this.version].equipmentRecipes[dataId]) {
          const recipe = this[this.version].equipmentRecipes[dataId];
          if (this.names.en.itemOther[recipe.recipe] && this.names.en.itemOther[recipe.recipe] !== '') {
            this[this.version].wotvEquipments[rType].acquisition = {
              type: {
                en: this.names.en.itemOther[recipe.recipe],
                fr: this.names.fr.itemOther[recipe.recipe]
              }
            };
          }
        } else {
          // console.log("NO RECEIPE !!!")
          // console.log(this[this.version].wotvEquipments[rType])
        }

        if (!this[this.version].wotvEquipments[rType].acquisition) {
          this[this.version].wotvEquipments[rType].acquisition = {
            type: 'Unknown'
          };
        }

        if (this[this.version].equipementLots[equipment.rtype]) {
          for (let i = 1; i <= 3; i++) {
            const growId = this[this.version].equipementLots[equipment.rtype].lot[0]['grow' + i];
            if (growId) {
              this[this.version].wotvEquipments[rType].grows[growId] = {
                dataId: growId,
                names: {},
                curve: {}
              };
              this.getNames(this[this.version].wotvEquipments[rType].grows[growId], 'equipmentGrow', false);

              Object.keys(this[this.version].grows[growId].curve[0]).forEach(stat => {
                if (this.stats.unit[stat]) {
                  this[this.version].wotvEquipments[rType].grows[growId].curve[this.stats.unit[stat]] = this[this.version].grows[growId].curve[0][stat];
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
            this[this.version].wotvEquipments[rType].stats[this.stats.unit[stat]] = {
              min: this[this.version].equipments[dataId].status[0][stat],
              max: this[this.version].equipments[dataId].status[1] ? this[this.version].equipments[dataId].status[1][stat] : this[this.version].equipments[dataId].status[0][stat]
            };
          }
        });
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

      if (raid.maxLevel < quest.lv_max) {
        raid.maxLevel = quest.lv_max;
      }
    });

    raid.bosses.push(boss);
  }

  private addBossSkill(boss, questId, lvMin, lvMax) {
    const quest = this[this.version].quests[questId];
    if (quest) {
      const map = this.maps[quest.map.set.split('/')[1]];

      if (map) {
        map.enemy.forEach(enemy => {
          if (enemy.iname === boss.dataId) {
            enemy.skills.forEach(skill => {
              const skillId = skill.iname;

              if (!boss.skills[skillId]) {
                boss.skills[skillId] = {
                  effects: [],
                  dataId: skillId,
                  rate: skill.rate
                };
                this.updateSkill(boss, boss.skills[skillId], skillId);
                boss.skills[skillId].minLevel = lvMin;
                boss.skills[skillId].maxLevel = lvMax;
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
      names: {}
    };

    this.getNames(this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId], type + 'TitleName', false);

    if (this.version === 'gl') {
      if (!this.names.en[type + 'TitleDesc'][titleId]) {
        this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
          en: titleId,
          fr: titleId
        };
      } else {
        this[this.version]['wotv' + this.upperCaseFirst(type) + 'Titles'][titleId].howToGet = {
          en: this.names.en[type + 'TitleDesc'][titleId],
          fr: this.names.fr[type + 'TitleDesc'][titleId] ? this.names.fr[type + 'TitleDesc'][titleId] : this.names.fr[type + 'TitleDesc'][titleId]
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
        const tmrId = this.jp.wotvUnits[unitId].tmr.dataId;
        this.jp.wotvEquipments[tmrId] = this.gl.wotvEquipments[tmrId];
      });
    }
  }

  formatDropTables() {
    const formattedQuests = {};

    Object.keys(this[this.version].quests).forEach(questId => {
      const quest = this[this.version].quests[questId];

      formattedQuests[questId] = {
        dataId: questId,
        items: {},
        names: {},
        exp: quest.uexp,
        nrg: quest.ap,
        jp: quest.jp,
        enemies: 0,
        gils: quest.gold,
        chests: 0
      };

      this.getNames(formattedQuests[questId], 'questTitle', false);

      if (questId.split('_')[1] === 'ST') {
        const storyNumber = questId.split('_')[2];
        Object.keys(formattedQuests[questId].names).forEach(lang => {
          formattedQuests[questId].names[lang] = Number(storyNumber.substring(0, 2)) + ':' + Number(storyNumber.substring(2, 4)) + ':' + Number(storyNumber.substring(4, 6)) + ':' + Number(storyNumber.substring(6, 8)) + ' ' + formattedQuests[questId].names[lang];
        });
      }

      if (this.maps[quest.map.set.split('/')[1]]) {
        const map = this.maps[quest.map.set.split('/')[1]];
        if (map.drop_table_list) {
          Object.keys(map.drop_table_list).forEach(dropTable => {
            if (dropTable !== 'steal') {
              map.drop_table_list[dropTable].totalRate = this.getDropTotalRate(map.drop_table_list[dropTable].drop_list);
            }
          });
        }

        if (map.enemy) {
          map.enemy.forEach(enemy => {
            if (enemy.iname === 'UN_GM_TREASURE') {
              formattedQuests[questId].chests += 1;
            } else {
              formattedQuests[questId].enemies += 1;
            }
          });
        }

        if (map.drop_table_list && map.enemy) {
          map.enemy.forEach(enemy => {
            if (enemy.drop && map.drop_table_list[enemy.drop]) {
              const dropTable = map.drop_table_list[enemy.drop];
              dropTable.drop_list.forEach(item => {
                this.addDroppedItem(formattedQuests[questId], 'drop', item.drop_data.iname, item.weight, dropTable.totalRate);
              });
            }
          });
        }

        if (map.drop_table_list && map.drop_table_list['HOST']) {
          const hostDropTable = map.drop_table_list['HOST'];
          hostDropTable.drop_list.forEach(item => {
            if (this[this.version].wotvItems[item.drop_data.iname]) {
              this.addDroppedItem(formattedQuests[questId], 'host', item.drop_data.iname, item.weight, hostDropTable.totalRate);
            }
          });
        }
      }
    });

    this[this.version].wotvDropRates = formattedQuests;

    console.log(this[this.version].wotvDropRates);
  }

  addDroppedItem(map, type, itemId, rate, totalRate) {
    if (!map.items[itemId]) {
      map.items[itemId] = {};
      map.items[itemId][type] = rate * 100 / totalRate;
    } else if (!map.items[itemId][type]) {
      map.items[itemId][type] = rate * 100 / totalRate;
    } else if (map.items[itemId][type] !== '100.0') { // To rework maybe...
      map.items[itemId][type] = map.items[itemId][type] + ((100 - map.items[itemId][type]) * (rate * 100 / totalRate) / 100);
    }
  }

  getDropTotalRate(items) {
    let totalRate = 0;

    items.forEach(item => {
      totalRate += item.weight;
    });

    return totalRate;
  }
}
