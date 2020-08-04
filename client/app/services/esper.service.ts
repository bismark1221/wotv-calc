import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';

import { Esper } from '../entities/esper';
import { default as GL_ESPERS } from '../data/gl/espers.json';
import { default as JP_ESPERS } from '../data/jp/espers.json';
import { GridService } from './grid.service'
import { NavService } from './nav.service'

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
      "UN_LW_S_MABR",
      "UN_LW_S_MOGL",
      "UN_LW_S_OCHU",
      "UN_FFT_S_CHCB_01",
      "UN_LW_S_MDFY",
      "UN_LW_S_LAMA_01",
      "UN_LW_S_BLMN",
      "UN_LW_S_CHCB1"
    ],
    UR: [
      "UN_LW_S_IFRT",
      "UN_LW_S_GLEM",
      "UN_LW_S_RAMU",
      "UN_LW_S_SHIV",
      "UN_LW_S_SIRE",
      "UN_LW_S_ODIN",
      "UN_LW_S_TSLP",
      "UN_LW_S_THDG",
      "UN_FF01_S_WRMC",
      "UN_LW_S_DABL",
      "UN_LW_S_FNRR",
      "UN_LW_S_TITN",
      "UN_LW_S_AGON",
      "UN_FF4_S_DMNW"
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

  private esperBuffsOrder = [
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
    private gridService: GridService,
    private navService: NavService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  private getRaw() {
    if (this.navService.getVersion() == "GL") {
      return GL_ESPERS
    } else {
      return JP_ESPERS
    }
  }

  getEspers(): Esper[] {
    let espers: Esper[] = [];
    let rawEspers = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawEspers).forEach(esperId => {
      let esper = new Esper();
      esper.constructFromJson(rawEspers[esperId], this.translateService);
      esper.rarity = this.findRarity(esper)
      espers.push(esper);
    });

    this.espers = espers;
    return espers;
  }

  sortByName(espers, order = "asc") {
    espers.sort((a: any, b: any) => {
      let x = this.i(a.getName(this.translateService));
      let y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
        if (xD < yD) {
          return order == "asc" ? -1 : 1;
        } else if (xD > yD) {
          return order == "asc" ? 1 : -1;
        }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
        this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
        if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
          if (isNaN(this.oFxNcL)) {
            return order == "asc" ? 1 : -1;
          } else {
            return order == "asc" ? -1 : 1;
          }
        }

        if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
          var comp = this.oFxNcL.localeCompare(this.oFyNcL);
          return comp / Math.abs(comp);
        }

        if (this.oFxNcL < this.oFyNcL) {
          return order == "asc" ? -1 : 1;
        } else if (this.oFxNcL > this.oFyNcL) {
          return order == "asc" ? 1 : -1;
        }
      }
    });

    return espers;
  }

  sortByRarity(espers, order = "asc") {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    if (order == "desc") {
      rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    }

    espers.sort((a: any, b: any) => {
      if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
        return -1
      } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
        return 1
      } else {
        let x = this.i(a.getName(this.translateService));
        let y = this.i(b.getName(this.translateService));

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
      }
    })

    return espers
  }

  getEspersForListing(filters, sort, order = "asc") {
    this.getEspers();
    this.espers = this.filterEspers(this.espers, filters);

    switch (sort) {
      case "rarity" :
        this.sortByRarity(this.espers, order)
      break
      case "name" :
        this.sortByName(this.espers, order)
      break
      default :
        console.log("not managed sort")
      break
    }

    return this.espers;
  }

  filterEspers(espers, filters) {
    if (filters) {
      let filteredEspers = []

      espers.forEach(esper => {
        if ((filters.element.length == 0 || filters.element.indexOf(esper.element) != -1)
          && (filters.rarity.length == 0 || filters.rarity.indexOf(esper.rarity) != -1)
        ) {
          filteredEspers.push(esper)
        }
      })

      return filteredEspers
    } else {
      return espers
    }
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
    this.getEspers();

    return this.espers.find(esper => esper.slug === slug);
  }

  getEsper(id: string): Esper {
    this.getEspers();

    return this.espers.find(esper => esper.dataId === id);
  }


  getEspersForBuilder() {
    let espers = this.getEspersForListing(null, "rarity", "asc");

    let formattedEspersForBuilder = []
    espers.forEach(esper => {
      formattedEspersForBuilder.push({
        id: esper.dataId,
        name: esper.getName(this.translateService),
        rarity: esper.rarity
      })
    })

    return formattedEspersForBuilder;
  }

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_espers" : "espers"
  }

  getSavedEspers() {
    this.savedEspers = this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
    return this.savedEspers;
  }

  getSavableData(esper) {
    let data = {
      dataId: esper.dataId,
      star: esper.star,
      level: esper.level,
      nodes: {},
      resonance: 1
    }

    Object.keys(esper.board.nodes).forEach(nodeId => {
      data.nodes[nodeId] = esper.board.nodes[nodeId].level ? esper.board.nodes[nodeId].level : 0
    })

    return data
  }

  saveEsper(esper) {
    if (!this.savedEspers) {
      this.getSavedEspers()
    }

    this.savedEspers[esper.dataId] = this.getSavableData(esper)

    this.localStorageService.set(this.getLocalStorage(), this.savedEspers);
  }

  selectEsperForBuilder(esperId, customData = null) {
    this.esper = this.getEsper(esperId)
    this.esper.name = this.esper.getName(this.translateService)

    this.esper.star = 1;
    this.esper.level = 1;
    this.esper.maxSPs = 0;
    this.esper.usedSPs = 0;
    this.esper.resonance = 1;
    this.esper.possibleBuffs = null;

    this.initiateSavedEsper(customData)

    this.updateMaxLevel();
    this.changeLevel();
    this.updateEsperBuffs();
    this.esper.grid = this.gridService.generateEsperGrid(this.esper, 1000)

    return this.esper
  }

  private initiateSavedEsper(customData = null) {
    let esper = customData
    if (!esper) {
      let savedEspers = this.getSavedEspers()
      esper = savedEspers[this.esper.dataId]
    }

    if (esper) {
      this.esper.star = esper.star ? esper.star : 1;
      this.esper.level = esper.level ? esper.level : 1;
      this.esper.resonance = esper.resonance ? esper.resonance : 1;

      if (esper.nodes) {
        Object.keys(esper.nodes).forEach(nodeId => {
          if (esper.nodes[nodeId]) {
            this.esper.board.nodes[nodeId].level = esper.nodes[nodeId]
            this.esper.board.nodes[nodeId].activated = true
          }
        })
      }
    }
  }

  changeStar(esper = null) {
    if (esper) {
      this.esper = esper
    }

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
    this.disableNotAvailableNodes()
  }

  changeLevel(esper = null) {
    if (esper) {
      this.esper = esper
    }

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

  private updateEsperBuffs() {
    this.esper.buffs = {}

    Object.keys(this.esper.stats).forEach(stat => {
      if (this.statsType.indexOf(stat) === -1 && this.esper.stats[stat][(this.esper.star - 1)].min) {
        this.esper.buffs[stat] = {}
        this.esper.buffs[stat].base = this.esper.stats[stat][(this.esper.star - 1)].min
      }
    })

    this.calculateTotalBuffs()
    this.formatEsperBuffs()
    this.calculateSPs()
  }

  private calculateTotalBuffs() {
    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      let node = this.esper.board.nodes[nodeId]
      if (node.type == "buff" && node.level) {
        node.skill.effects.forEach(effect => {
          if (effect.calcType === "percent" || effect.calcType === "fixe" ||  effect.calcType === "resistance") {
            this.updateBuff(effect.type, effect.minValue, effect.calcType === "percent" ? "percent" : "board")
          } else {
            console.log("not manage effect in board percent/fixe")
            console.log(node)
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

  private formatEsperBuffs() {
    let findedBuffs = []
    Object.keys(this.esper.buffs).forEach(buffType => {
      findedBuffs.push(buffType)
    })

    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      this.esper.board.nodes[nodeId].skill.effects.forEach(effect => {
        if (findedBuffs.indexOf(effect.type) === -1) {
          if (!this.esper.buffs[effect.type]) {
            this.esper.buffs[effect.type] = {}
          }

          if (effect.calcType === "percent" && !this.esper.buffs[effect.type].percent) {
            this.esper.buffs[effect.type].percent = 0;
          }

          findedBuffs.push(effect.type)
        }
      })
    })

    if (!this.esper.possibleBuffs) {
      this.esper.possibleBuffs = [[]];
      let addedBuffs = []
      let i = 0;

      this.esperBuffsOrder.forEach(buffType => {
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

    this.disableNotAvailableNodes()
  }

  rightClickNode(node, esper = null) {
    if (esper) {
      this.esper = esper
    }

    if (node !== 0) {
      this.hideNode(node)
      this.updateEsperBuffs()
    }
  }

  clickNode(node, esper = null) {
    if (esper) {
      this.esper = esper
    }

    if (node !== 0) {
      if (!this.esper.board.nodes[node].activated || this.esper.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
      this.updateEsperBuffs()
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

  canActivateNode(node, esper = null) {
    if (esper) {
      this.esper = esper
    }

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

  maxEsper(esper = null) {
    if (esper) {
      this.esper = esper
    }

    this.esper.star = 2;
    this.esper.level = 80;

    this.changeStar()
    this.changeLevel()
  }

  disableNotAvailableNodes() {
    Object.keys(this.esper.board.nodes).forEach(node => {
      if (this.esper.board.nodes[node].activated && !this.canActivateNode(node)) {
        this.hideNode(node, true)
      }
    })
  }
}
