import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { EsperService } from '../services/esper.service';
import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-builder-esper',
  templateUrl: './builder.esper.component.html',
  styleUrls: ['./builder.esper.component.css']
})
export class BuilderEsperComponent implements OnInit {
  espers;
  esper
  tableLevels
  stats
  grid
  buffs
  possibleBuffs

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
    private esperService: EsperService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private gridService: GridService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  ngOnInit(): void {
    this.getEspers();
  }

  private getEspers() {
    this.espers = this.esperService.getEspersForBuilder(this.translateService);
    this.translateEspers();
  }

  private translateEspers() {
    let lang = this.translateService.currentLang

    this.espers.forEach(esper => {
      esper.name = esper.names[lang]
    });

    this.espers = [...this.espers];
  }

  selectEsper() {
    let lang = this.translateService.currentLang
    this.esper.name = this.esper.names[lang]

    this.esper.star = 1;
    this.esper.level = 1;
    this.esper.maxSPs = 0;
    this.esper.usedSPs = 0;
    this.possibleBuffs = null;

    this.initiateSavedEsper()

    this.updateMaxLevel();
    this.changeLevels();
    this.updateUnitBuffs();
    this.grid = this.gridService.generateEsperGrid(this.esper)

    console.log(this.esper)
    console.log(this.buffs)
  }

  private initiateSavedEsper() {
    let savedEspers = this.esperService.getSavedEspers()
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

  private changeStar() {
    this.updateMaxLevel();
    this.changeLevels();
  }

  private updateMaxLevel() {
    this.esper.maxLevel = this.maxLevelPerStar[this.esper.star];

    if (this.esper.level > this.esper.maxLevel) {
      this.esper.level = this.esper.maxLevel
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.esper.maxLevel; i++) {
      this.tableLevels.push(i);
    }
  }

  private changeLevels() {
    this.stats = {}

    this.statsType.forEach(stat => {
      let min = 0
      let max = 0

      if (this.esper.stats[stat]) {
        min = this.esper.stats[stat][(this.esper.star - 1)].min
        max = this.esper.stats[stat][(this.esper.star - 1)].max
      }

      this.stats[stat] = {}
      let maxLevel = this.maxLevelPerStar[this.esper.star]
      this.stats[stat].base = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.esper.level - 1)))
    })

    this.calculateSPs()
  }

  private updateUnitBuffs() {
    this.buffs = {}

    this.unitBuffsAtkRes.forEach(stat => {
      if (this.esper.stats[stat] && this.esper.stats[stat][(this.esper.star - 1)].min) {
        this.buffs[stat + "_RES"] = {}
        this.buffs[stat + "_RES"].base = this.esper.stats[stat][(this.esper.star - 1)].min
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

    Object.keys(this.buffs).forEach(buff => {
      this.buffs[buff].total = this.buffs[buff].base + (this.buffs[buff].board ? this.buffs[buff].board : 0)
    })
  }

  private updateBuff(type, value, calc) {
    if (!this.buffs[type]) {
      this.buffs[type] = {}
      this.buffs[type].base = 0;
    }

    if (!this.buffs[type][calc]) {
      this.buffs[type][calc] = 0
    }

    this.buffs[type][calc] += value
  }

  private formatUnitBuffs() {
    let i = 0;
    let findedBuffs = []
    Object.keys(this.buffs).forEach(buffType => {
      findedBuffs.push(buffType)
    })

    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      this.esper.board.nodes[nodeId].skill.effects.forEach(effect => {
        if (findedBuffs.indexOf(effect.type) === -1) {
          if (this.unitBuffsAtkRes.indexOf(effect.type) !== -1) {
            if (effect.calcType === "resistance") {
              if (!this.buffs[effect.type + "_RES"]) {
                this.buffs[effect.type + "_RES"] = {}
              }
              findedBuffs.push(effect.type + "_RES")
            } else if (effect.calcType === "fixe") {
              if (!this.buffs[effect.type + "_ATK"]) {
                this.buffs[effect.type + "_ATK"] = {}
              }
              findedBuffs.push(effect.type + "_ATK")
            }
          } else {
            if (!this.buffs[effect.type]) {
              this.buffs[effect.type] = {}
            }

            if (effect.calcType === "percent" && !this.buffs[effect.type].percent) {
              this.buffs[effect.type].percent = 0;
            }

            findedBuffs.push(effect.type)
          }
        }
      })
    })

    if (!this.possibleBuffs) {
      this.possibleBuffs = [[]];
      let addedBuffs = []
      this.unitBuffsOrder.forEach(buffType => {
        if (findedBuffs.indexOf(buffType) !== -1) {
          if (this.possibleBuffs[i].length == 8) {
            this.possibleBuffs.push([])
            i++;
          }

          this.possibleBuffs[i].push(buffType)
          addedBuffs.push(buffType)
        }
      })

      Object.keys(this.buffs).forEach(buffType => {
        if (addedBuffs.indexOf(buffType) === -1) {
          if (this.possibleBuffs[i].length == 8) {
            this.possibleBuffs.push([])
            i++;
          }

          this.possibleBuffs[i].push(buffType)
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
      if (!this.esper.board.nodes[node].activated || this.grid.nodesForGrid[node].subType == "skill") {
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



  consoleLog() {
    this.esperService.saveEsper(this.esper)
  }
}
