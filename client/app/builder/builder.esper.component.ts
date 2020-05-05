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

  private statsType = ["HP", "TP", "AP", "ATK", "DEF", "SPR", "MAG", "DEX", "AGI", "LUCK", "INITIAL_AP", "ACCURACY", "CRITIC_RATE", "CRITIC_AVOID", "EVADE", "POISON", "BLIND", "SLEEP", "SILENCE", "PARALYZE", "CONFUSION", "PETRIFY", "TOAD", "CHARM", "SLOW", "STOP", "IMMOBILIZE", "DISABLE", "BERSERK", "DOOM", "MOVE", "JUMP", "RANGE"]
  private statsAtkRes = ["FIRE", "ICE", "EARTH", "WIND", "LIGHTNING", "WATER", "LIGHT", "DARK", "SLASH", "PIERCE", "STRIKE", "MISSILE", "MAGIC"]

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

    this.initiateSavedEsper()

    this.updateMaxLevel();
    this.changeLevels();
    this.grid = this.gridService.generateEsperGrid(this.esper)

    console.log(this.esper)
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
    let levelPerStar = {
      1: 50,
      2: 80
    }

    this.esper.maxLevel = levelPerStar[this.esper.star];

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
        min = this.esper.stats[stat].min
        max = this.esper.stats[stat].max
      }

      this.stats[stat] = {}
      this.stats[stat].base = Math.floor(min + ((max - min) / (99 - 1) * (this.esper.level - 1)))
      this.stats[stat].baseTotal = this.stats[stat].base
    })

    this.statsAtkRes.forEach(stat => {
      let min = 0
      let max = 0

      if (this.esper.stats[stat]) {
        min = this.esper.stats[stat].min ? this.esper.stats[stat].min : 0
        max = this.esper.stats[stat].max ? this.esper.stats[stat].max : 0
      }

      this.stats[stat + "_RES"] = {}
      this.stats[stat + "_RES"].base = Math.floor(min + ((max - min) / (99 - 1) * (this.esper.level - 1)))
      this.stats[stat + "_RES"].baseTotal = this.stats[stat + "_RES"].base

      this.stats[stat + "_ATK"] = {}
      this.stats[stat + "_ATK"].base = 0
      this.stats[stat + "_ATK"].baseTotal = 0
    })

    Object.keys(this.stats).forEach(stat => {
      this.stats[stat].baseTotal = Math.floor(this.stats[stat].baseTotal)
    })

    this.calculateTotalStats()
  }

  private calculateTotalStats() {
    this.statsType.forEach(stat => {
      this.stats[stat].board = 0;
    });

    this.statsAtkRes.forEach(stat => {
      this.stats[stat + "_RES"].board = 0;
      this.stats[stat + "_ATK"].board = 0;
    });

    Object.keys(this.esper.board.nodes).forEach(nodeId => {
      let node = this.esper.board.nodes[nodeId]
      if (node.type == "buff" && node.level) {
        node.skill.effects.forEach(effect => {
          if (this.statsType.indexOf(effect.type) !== -1 && effect.calcType === "fixe") {
            this.stats[effect.type].board += effect.minValue
          } else if (this.statsType.indexOf(effect.type) !== -1 && effect.calcType === "percent") {
            this.stats[effect.type].board += this.stats[effect.type].baseTotal * effect.minValue / 100
          } else if (this.statsAtkRes.indexOf(effect.type) !== -1) {
            if (effect.calcType === "resistance") {
              this.stats[effect.type + "_RES"].board += effect.minValue
            } else if (effect.calcType === "fixe") {
              this.stats[effect.type + "_ATK"].board += effect.minValue
            } else {
              console.log("not manage effect in board")
              console.log(node)
            }
          } else {
            console.log("not manage effect in board")
            console.log(node)
          }
        })
      }
    })

    this.statsType.forEach(stat => {
      this.stats[stat].total = this.stats[stat].baseTotal;
      this.stats[stat].board = Math.floor(this.stats[stat].board)

      this.stats[stat].total += this.stats[stat].board
    })

    this.statsAtkRes.forEach(stat => {
      ["RES", "ATK"].forEach(type => {
        this.stats[stat + "_" + type].total = this.stats[stat + "_" + type].baseTotal;
        this.stats[stat + "_" + type].board = Math.floor(this.stats[stat + "_" + type].board)

        this.stats[stat + "_" + type].total += this.stats[stat + "_" + type].board
      })
    })
  }

  rightClickNode(node) {
    if (node !== 0) {
      this.hideNode(node)
      this.changeLevels()
    }
  }

  clickNode(node) {
    if (node !== 0) {
      if (!this.esper.board.nodes[node].activated || this.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
      this.changeLevels()
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

    // TODO Check SP
    /*if (node !== 0) {
      if (nodeData.type == "buff") {
        return this.canActivateNode(nodeData.parent) && this.esper.star >= nodeData.skill.unlockStar && this.esper.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel
      } else {
        return !nodeData.skill.unlockStar || (this.canActivateNode(nodeData.parent) && this.esper.star >= nodeData.skill.unlockStar && this.esper.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel)
      }
    } else {*/
      return true
    //}
  }



  consoleLog() {
    this.esperService.saveEsper(this.esper)
  }
}
