import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';

import { Esper } from '../entities/esper';
import { default as ESPERS } from '../data/espers.json';
import { GridService } from './grid.service'

@Injectable()
export class EsperService {
  private espers: Esper[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;
  private savedEspers = {};
  private esper

  private espersRarity = {
    N: [],
    R: [],
    SR: [
      "UN_LW_S_BOMB",
      "UN_LW_S_CACT",
      "UN_LW_S_ARMN_01",
      "UN_LW_S_OGRE",
      "UN_LW_S_ZUUU"
    ],
    MR: [
      "UN_LW_S_BHMT",
      "UN_LW_S_IGNT",
      "UN_LW_S_MABR"
    ],
    UR: [
      "UN_LW_S_IFRT",
      "UN_LW_S_GLEM",
      "UN_LW_S_RAMU",
      "UN_LW_S_SHIV",
      "UN_LW_S_SIRE"
    ]
  }

  private statsType = [
    "HP",
    "TP",
    "AP",
    "ATK",
    "DEF",
    "SPR",
    "MAG",
    "DEX",
    "AGI",
    "LUCK"
  ]

  private unitBuffsAtkRes = [
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
    "MAGIC"
  ]

  private unitBuffsOrder = [
    "HP",
    "TP",
    "AP",
    "ATK",
    "DEF",
    "SPR",
    "MAG",
    "DEX",
    "AGI",
    "LUCK",
    "FIRE_RES",
    "ICE_RES",
    "EARTH_RES",
    "WIND_RES",
    "LIGHTNING_RES",
    "WATER_RES",
    "LIGHT_RES",
    "DARK_RES",
    "SLASH_RES",
    "PIERCE_RES",
    "STRIKE_RES",
    "MISSILE_RES",
    "MAGIC_RES",
    "FIRE_ATK",
    "ICE_ATK",
    "EARTH_ATK",
    "WIND_ATK",
    "LIGHTNING_ATK",
    "WATER_ATK",
    "LIGHT_ATK",
    "DARK_ATK",
    "SLASH_ATK",
    "PIERCE_ATK",
    "STRIKE_ATK",
    "MISSILE_ATK",
    "MAGIC_ATK",
    "INITIAL_AP",
    "ACCURACY",
    "CRITIC_RATE",
    "CRITIC_AVOID",
    "EVADE",
    "POISON",
    "BLIND",
    "SLEEP",
    "SILENCE",
    "PARALYZE",
    "CONFUSION",
    "PETRIFY",
    "TOAD",
    "CHARM",
    "SLOW",
    "STOP",
    "IMMOBILIZE",
    "DISABLE",
    "BERSERK",
    "DOOM",
    "MOVE",
    "JUMP",
    "RANGE"
  ]

  private maxLevelPerStar = {
    1: 50,
    2: 80
  }

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private gridService: GridService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortByName(espers: Esper[], translate: any): Esper[] {
    espers.sort((a: any, b: any) => {
      let x = this.i(a.name);
      let y = this.i(b.name);

      if (translate) {
        x = this.i(a.getName(translate));
        y = this.i(b.getName(translate));
      }

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
          if (xD < yD) { return -1; }
          else if (xD > yD) { return 1; }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
          this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
          this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
          if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
              return isNaN(this.oFxNcL) ? 1 : -1;
          }
          if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
              var comp = this.oFxNcL.localeCompare(this.oFyNcL);
              return comp / Math.abs(comp);
          }
          if (this.oFxNcL < this.oFyNcL) { return -1; }
          else if (this.oFxNcL > this.oFyNcL) { return 1; }
      }
    });

    return espers;
  }

  getEspers(): Esper[] {
    let espers: Esper[] = [];

    Object.keys(JSON.parse(JSON.stringify(ESPERS))).forEach(esperId => {
      let esper = new Esper();
      esper.constructFromJson(ESPERS[esperId], this.translateService);
      espers.push(esper);
    });

    this.espers = espers;
    return espers;
  }

  getEspersForListing() {
    let espers = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };

    Object.keys(JSON.parse(JSON.stringify(ESPERS))).forEach(esperId => {
      let esper = new Esper();
      esper.constructFromJson(ESPERS[esperId], this.translateService);
      espers[this.findRarity(esper)].push(esper);
    });

    return espers;
  }

  findRarity(esper) {
    let rarity = "N";
    Object.keys(this.espersRarity).forEach(rarityType => {
      if (this.espersRarity[rarityType].indexOf(esper.dataId) !== -1) {
        rarity = rarityType
      }
    })

    return rarity;
  }

  getEsperBySlug(slug: string): Esper {
    if (!this.espers || this.espers.length === 0) {
      this.getEspers();
    }

    return this.espers.find(esper => esper.slug === slug);
  }

  getEsper(id: string): Esper {
    if (!this.espers || this.espers.length === 0) {
      this.getEspers();
    }

    return this.espers.find(esper => esper.dataId === id);
  }


  getEspersForBuilder(translate) {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    let espers = this.getEspersForListing();

    Object.keys(espers).forEach(rarity => {
      this.sortByName(espers[rarity], translate)
    });

    let formattedEspersForBuilder = []
    rarityOrder.forEach(rarity => {
      espers[rarity].forEach(esper => {
        esper.rarity = this.findRarity(esper)
        formattedEspersForBuilder.push({
          id: esper.dataId,
          name: esper.getName(this.translateService),
          rarity: esper.rarity
        })
      })
    })

    return formattedEspersForBuilder;
  }


  getSavedEspers() {
    this.savedEspers = this.localStorageService.get('espers') ? this.localStorageService.get('espers') : {};
    return this.savedEspers;
  }

  saveEsper(esper) {
    if (!this.savedEspers) {
      this.getSavedEspers()
    }

    this.savedEspers[esper.dataId] = {
      star: esper.star,
      level: esper.level,
      nodes: {}
    }

    Object.keys(esper.board.nodes).forEach(nodeId => {
      this.savedEspers[esper.dataId].nodes[nodeId] = esper.board.nodes[nodeId].level
    })

    this.localStorageService.set('espers', this.savedEspers);
  }











  selectEsperForBuilder(esperId) {
    this.esper = this.getEsper(esperId)
    this.esper.name = this.esper.getName(this.translateService)

    this.esper.star = 1;
    this.esper.level = 1;
    this.esper.maxSPs = 0;
    this.esper.usedSPs = 0;
    this.esper.possibleBuffs = null;

    this.initiateSavedEsper()

    this.updateMaxLevel();
    this.changeLevel();
    this.updateUnitBuffs();
    this.esper.grid = this.gridService.generateEsperGrid(this.esper)

    return this.esper
  }

  private initiateSavedEsper() {
    let savedEspers = this.getSavedEspers()
    let esper = savedEspers[this.esper.dataId]

    if (esper) {
      let lang = this.translateService.currentLang

      this.esper.star = esper.star;
      this.esper.level = esper.level;

      Object.keys(esper.nodes).forEach(nodeId => {
        if (esper.nodes[nodeId]) {
          this.esper.board.nodes[nodeId].level = esper.nodes[nodeId]
          this.esper.board.nodes[nodeId].activated = true
        }
      })
    }
  }

  changeStar() {
    this.updateMaxLevel();
    this.changeLevel();
  }

  private updateMaxLevel() {
    this.esper.maxLevel = this.maxLevelPerStar[this.esper.star];

    if (this.esper.level > this.esper.maxLevel) {
      this.esper.level = this.esper.maxLevel
    }

    this.esper.tableLevels = [];
    for (let i = 1; i <= this.esper.maxLevel; i++) {
      this.esper.tableLevels.push(i);
    }
  }

  changeLevel() {
    this.statsType.forEach(stat => {
      let min = 0
      let max = 0

      if (this.esper.stats[stat]) {
        min = this.esper.stats[stat][(this.esper.star - 1)].min
        max = this.esper.stats[stat][(this.esper.star - 1)].max
      }

      let maxLevel = this.maxLevelPerStar[this.esper.star]
      this.esper.stats[stat].base = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.esper.level - 1)))
    })

    this.calculateSPs()
  }

  private updateUnitBuffs() {
    this.esper.buffs = {}

    this.unitBuffsAtkRes.forEach(stat => {
      if (this.esper.stats[stat] && this.esper.stats[stat][(this.esper.star - 1)].min) {
        this.esper.buffs[stat + "_RES"] = {}
        this.esper.buffs[stat + "_RES"].base = this.esper.stats[stat][(this.esper.star - 1)].min
      }
    })

    this.calculateTotalBuffs()
    this.formatUnitBuffs()
    this.calculateSPs()
  }

  private calculateTotalBuffs() {
    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      let node = this.esper.board.nodes[nodeId]
      if (node.type == "buff" && node.level) {
        node.skill.effects.forEach(effect => {

          if (this.unitBuffsAtkRes.indexOf(effect.type) !== -1) {
            if (effect.calcType === "resistance") {
              this.updateBuff(effect.type + "_RES", effect.minValue, "board")
            } else if (effect.calcType === "fixe") {
              this.updateBuff(effect.type + "_ATK", effect.minValue, "board")
            } else {
              console.log("not manage effect in board AtkRes")
              console.log(node)
            }

          } else {
            if (effect.calcType === "percent" || effect.calcType === "fixe") {
              this.updateBuff(effect.type, effect.minValue, effect.calcType === "fixe" ? "board" : "percent")
            } else {
              console.log("not manage effect in board percent/fixe")
              console.log(node)
            }
          }
        })
      }
    })

    Object.keys(this.esper.buffs).forEach(buff => {
      this.esper.buffs[buff].total = this.esper.buffs[buff].base + (this.esper.buffs[buff].board ? this.esper.buffs[buff].board : 0)
    })
  }

  private updateBuff(type, value, calc) {
    if (!this.esper.buffs[type]) {
      this.esper.buffs[type] = {}
      this.esper.buffs[type].base = 0;
    }

    if (!this.esper.buffs[type][calc]) {
      this.esper.buffs[type][calc] = 0
    }

    this.esper.buffs[type][calc] += value
  }

  private formatUnitBuffs() {
    let findedBuffs = []
    Object.keys(this.esper.buffs).forEach(buffType => {
      findedBuffs.push(buffType)
    })

    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      this.esper.board.nodes[nodeId].skill.effects.forEach(effect => {
        if (findedBuffs.indexOf(effect.type) === -1) {
          if (this.unitBuffsAtkRes.indexOf(effect.type) !== -1) {
            if (effect.calcType === "resistance") {
              if (!this.esper.buffs[effect.type + "_RES"]) {
                this.esper.buffs[effect.type + "_RES"] = {}
              }
              findedBuffs.push(effect.type + "_RES")
            } else if (effect.calcType === "fixe") {
              if (!this.esper.buffs[effect.type + "_ATK"]) {
                this.esper.buffs[effect.type + "_ATK"] = {}
              }
              findedBuffs.push(effect.type + "_ATK")
            }
          } else {
            if (!this.esper.buffs[effect.type]) {
              this.esper.buffs[effect.type] = {}
            }

            if (effect.calcType === "percent" && !this.esper.buffs[effect.type].percent) {
              this.esper.buffs[effect.type].percent = 0;
            }

            findedBuffs.push(effect.type)
          }
        }
      })
    })

    if (!this.esper.possibleBuffs) {
      this.esper.possibleBuffs = [[]];
      let addedBuffs = []
      let i = 0;

      this.unitBuffsOrder.forEach(buffType => {
        if (findedBuffs.indexOf(buffType) !== -1) {
          if (this.esper.possibleBuffs[i].length == 8) {
            this.esper.possibleBuffs.push([])
            i++;
          }

          this.esper.possibleBuffs[i].push(buffType)
          addedBuffs.push(buffType)
        }
      })

      Object.keys(this.esper.buffs).forEach(buffType => {
        if (addedBuffs.indexOf(buffType) === -1) {
          if (this.esper.possibleBuffs[i].length == 8) {
            this.esper.possibleBuffs.push([])
            i++;
          }

          this.esper.possibleBuffs[i].push(buffType)
        }
      })
    }
  }

  private calculateSPs() {
    this.esper.maxSPs = 0;
    for (let i = 1; i <= this.esper.star; i++) {
      let level = this.esper.star == 2 && i == 1 ? 50 : this.esper.level
      for (let j = 0; j <= level - 1; j++) {
        this.esper.maxSPs += this.esper.SPs[i - 1][j]
      }
    }

    this.esper.usedSPs = 0
    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      if (this.esper.board.nodes[nodeId].activated) {
        this.esper.usedSPs += this.esper.board.nodes[nodeId].skill.sp
      }
    })
  }

  rightClickNode(node) {
    if (node !== 0) {
      this.hideNode(node)
      this.updateUnitBuffs()
    }
  }

  clickNode(node) {
    if (node !== 0) {
      if (!this.esper.board.nodes[node].activated || this.esper.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
      this.updateUnitBuffs()
    }
  }

  showNode(node) {
    if (node !== 0 && this.canActivateNode(node)) {
      if (!this.esper.board.nodes[node].activated) {
        this.esper.board.nodes[node].activated = true;
        this.showNode(this.esper.board.nodes[node].parent)
      }

      this.updateSkill(node, true)
    }
  }

  hideNode(node, fullHide = false) {
    if (node !== 0) {
      let level = this.updateSkill(node, false, fullHide)
      if (level === 0) {
        this.esper.board.nodes[node].activated = false;
        this.esper.board.nodes[node].children.forEach(childNode => {
          this.hideNode(childNode, true)
        })
      }
    }
  }

  private updateSkill(nodeId, increase, fullHide = false) {
    let node = this.esper.board.nodes[nodeId]
    node.level = increase ? 1 : 0;

    return node.level
  }

  canActivateNode(node) {
    let nodeData = this.esper.board.nodes[node]

    if (node !== 0) {
      return (this.esper.maxSPs - this.esper.usedSPs - this.countSPsNeededForParents(node)) >= 0
    } else {
      return true
    }
  }

  private countSPsNeededForParents(node) {
    if (node !== 0 && !this.esper.board.nodes[node].activated) {
      return this.esper.board.nodes[node].skill.sp + this.countSPsNeededForParents(this.esper.board.nodes[node].parent)
    } else {
      return 0
    }
  }
}
