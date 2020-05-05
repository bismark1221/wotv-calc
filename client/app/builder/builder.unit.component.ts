import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-builder-unit',
  templateUrl: './builder.unit.component.html',
  styleUrls: ['./builder.unit.component.css']
})
export class BuilderUnitComponent implements OnInit {
  private units;
  unit
  tableLevels
  tableJobLevels
  guild
  stats
  grid

  constructor(
    private unitService: UnitService,
    private jobService: JobService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private guildService: GuildService,
    private gridService: GridService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateUnits();
    });
  }

  ngOnInit(): void {
    this.getUnits();
    this.getGuild();
  }

  private getGuild() {
    this.guild = this.guildService.getGuild()
  }

  private getUnits() {
    this.units = this.unitService.getUnitsForBuilder(this.translateService);
    this.translateUnits();
  }

  private translateUnits() {
    let lang = this.translateService.currentLang

    this.units.forEach(unit => {
      unit.name = unit.names[lang]
    });

    this.units = [...this.units];
  }

  private selectUnit() {
    let lang = this.translateService.currentLang
    this.unit.name = this.unit.names[lang]

    this.unit.jobsData = []
    this.unit.jobs.forEach((jobId, jobIndex) => {
      let job = this.jobService.getJob(jobId)
      job.name = job.names[lang]
      job.level = 1;
      this.unit.jobsData.push(job)
    })

    this.unit.star = 1;
    this.unit.lb = 0;
    this.unit.level = 1;
    this.unit.activatedSupport = [
      "0",
      "0"
    ]
    this.unit.masterSkill.activated = false;
    this.unit.masterSkill.name = this.unit.masterSkill.names[lang]

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.unlockStar === null) {
        this.unit.board.nodes[nodeId].activated = true
        this.unit.board.nodes[nodeId].level = 1
      }
    })

    this.initiateSavedUnit()

    this.updateMaxLevel();
    this.updateMaxJobLevel();
    this.changeLevels();
    this.grid = this.gridService.generateUnitGrid(this.unit)

    console.log(this.unit)
  }

  private initiateSavedUnit() {
    let savedUnits = this.unitService.getSavedUnits()
    let unit = savedUnits[this.unit.dataId]

    if (unit) {
      let lang = this.translateService.currentLang

      this.unit.star = unit.star;
      this.unit.lb = unit.lb;
      this.unit.level = unit.level;

      this.unit.jobs.forEach((jobId, jobIndex) => {
        this.unit.jobsData[jobIndex].level = unit.jobs[jobIndex]
      })

      let activatedSkills = [];

      Object.keys(unit.nodes).forEach(nodeId => {
        if (unit.nodes[nodeId]) {
          this.unit.board.nodes[nodeId].level = unit.nodes[nodeId]
          this.unit.board.nodes[nodeId].activated = true
        }
      })

      this.unit.masterSkill.activated = unit.masterSkill
      this.unit.activatedSupport = [
        unit.activatedSupport[0],
        unit.activatedSupport[1]
      ]
    }
  }

  private changeStar() {
    this.updateMaxLevel();
  }

  private changeLB() {
    this.updateMaxLevel();
    this.updateMaxJobLevel();
  }

  private updateMaxLevel() {
    let levelPerStar = {
      1: 0,
      2: 5,
      3: 10,
      4: 15,
      5: 20,
      6: 34
    }

    let levelPerLB = {
      0: 0,
      1: 5,
      2: 10,
      3: 15,
      4: 25,
      5: 35
    }

    this.unit.maxLevel = 30 + levelPerStar[this.unit.star] + levelPerLB[this.unit.lb];

    if (this.unit.level > this.unit.maxLevel) {
      this.unit.level = this.unit.maxLevel
      this.changeLevels()
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.unit.maxLevel; i++) {
      this.tableLevels.push(i);
    }

    this.updateMaxJobLevel()
  }

  private updateMaxJobLevel() {
    let levelPerLB = {
      0: 0,
      1: 3,
      2: 3,
      3: 6,
      4: 6,
      5: 9
    }

    let starToUnlock = [
      1,
      2,
      4
    ]

    this.unit.maxJobLevel = 6 + levelPerLB[this.unit.lb];

    let updated = false;
    this.unit.jobsData.forEach((job, jobIndex) => {
      job.unlocked = this.unit.star >= starToUnlock[jobIndex]

      if (job.unlocked) {
        if (job.level > this.unit.maxJobLevel) {
          job.level = this.unit.maxJobLevel
          updated = true
        }
      } else {
        job.level = 1;
        updated = true
      }
    })

    if (updated) {
      this.changeLevels()
    }

    this.tableJobLevels = [];
    for (let i = 1; i <= this.unit.maxJobLevel; i++) {
      this.tableJobLevels.push(i);
    }
  }

  private changeLevels() {
    this.stats = {}

    Object.keys(this.unit.stats).forEach(stat => {
      let min = this.unit.stats[stat].min
      let max = this.unit.stats[stat].max

      this.stats[stat] = {}
      this.stats[stat].base = Math.floor(min + ((max - min) / (99 - 1) * (this.unit.level - 1)))
      this.stats[stat].baseTotal = this.stats[stat].base
    })

    this.unit.jobsData.forEach((job, jobIndex) => {
      let subJob = jobIndex !== 0
      Object.keys(job.statsModifiers[job.level - 1]).forEach(statType => {
        let stat = this.stats[statType].base * (job.statsModifiers[job.level - 1][statType] / 10000) * (subJob ? 0.5 : 1)

        this.stats[statType].baseTotal += stat
      });
    })

    Object.keys(this.stats).forEach(stat => {
      this.stats[stat].baseTotal = Math.floor(this.stats[stat].baseTotal)
    })

    this.calculateTotalStats()
    console.log(this.unit.activatedSupport)
  }

  private calculateTotalStats() {
    let statsPerStatue = this.guildService.getStats()

    Object.keys(this.unit.stats).forEach(stat => {
      this.stats[stat].board = 0;
      this.stats[stat].masterSkill = 0;
      this.stats[stat].support = 0;
      if (statsPerStatue[stat]) {
        this.stats[stat].guild = Math.floor(this.stats[stat].baseTotal * this.guild[statsPerStatue[stat]] / 100)
      }
    });

    let statsType = ["HP", "TP", "AP", "ATK", "MAG", "DEX", "AGI", "LUCK", "MOVE", "JUMP"]

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let node = this.unit.board.nodes[nodeId]
      if (node.type == "buff" && node.level) {
        node.skill.effects.forEach(effect => {
          if (statsType.indexOf(effect.type) !== -1 && effect.calcType === "fixe") {
            this.stats[effect.type].board += effect.minValue
          } else if (statsType.indexOf(effect.type) !== -1 && effect.calcType === "percent") {
            this.stats[effect.type].board += Math.floor(this.stats[effect.type].baseTotal * effect.minValue / 100)
          } else {
            console.log("not manage effect in board")
            console.log(node)
          }
        })
      }
    })

    this.unit.activatedSupport.forEach(supportNode => {
      if (supportNode != "0") {
        this.unit.board.nodes[supportNode].skill.effects.forEach(effect => {
          let value = effect.minValue + ((effect.maxValue - effect.minValue) / (20 - 1) * (this.unit.board.nodes[supportNode].level - 1))
          if (statsType.indexOf(effect.type) !== -1 && effect.calcType === "fixe") {
            this.stats[effect.type].support += value
          } else if (statsType.indexOf(effect.type) !== -1 && effect.calcType === "percent") {
            this.stats[effect.type].support += this.stats[effect.type].baseTotal * value / 100
          } else {
            console.log("not manage effect in support")
            console.log(this.unit.board.nodes[supportNode].skill)
          }
        })
      }
    })

    if (this.unit.masterSkill.activated) {
      this.unit.masterSkill.effects.forEach(effect => {
        if (statsType.indexOf(effect.type) !== -1 && effect.calcType === "fixe") {
          this.stats[effect.type].masterSkill += effect.minValue
        } else if (statsType.indexOf(effect.type) !== -1 && effect.calcType === "percent") {
          this.stats[effect.type].masterSkill += Math.floor(this.stats[effect.type].baseTotal * effect.minValue / 100)
        } else {
          console.log("not manage effect in masterSkill")
          console.log(this.unit.masterSkill)
        }
      })
    }

    Object.keys(this.unit.stats).forEach(stat => {
      this.stats[stat].support = Math.floor(this.stats[stat].support)

      this.stats[stat].total = this.stats[stat].baseTotal;
      this.stats[stat].total += this.stats[stat].guild ? this.stats[stat].guild : 0
      this.stats[stat].total += this.stats[stat].board
      this.stats[stat].total += this.stats[stat].support
      this.stats[stat].total += this.stats[stat].masterSkill
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
      if (!this.unit.board.nodes[node].activated || this.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
      this.changeLevels()
    }
  }

  showNode(node) {
    if (node !== 0 && this.canActivateNode(node)) {
      if (!this.unit.board.nodes[node].activated) {
        this.unit.board.nodes[node].activated = true;
        this.showNode(this.unit.board.nodes[node].parent)
      }

      this.updateSkill(node, true)
    }
  }

  hideNode(node, fullHide = false) {
    if (node !== 0) {
      let level = this.updateSkill(node, false, fullHide)
      if (level === 0) {
        this.unit.board.nodes[node].activated = false;
        this.unit.board.nodes[node].children.forEach(childNode => {
          this.hideNode(childNode, true)
        })
      }
    }
  }

  private updateSkill(nodeId, increase, fullHide = false) {
    let node = this.unit.board.nodes[nodeId]

    if (this.grid.nodesForGrid[nodeId].subType == "buff") {
      node.level = increase ? 1 : 0;
    } else {
      if (increase) {
        node.level = typeof(node.level) == "number" ? (node.level == 20 ? 20 : node.level + 1) : 1
      } else {
        node.level = typeof(node.level) == "number" ? (node.level == 0 || fullHide ? 0 : node.level - 1) : 0
      }
    }

    return node.level
  }

  canActivateNode(node) {
    let nodeData = this.unit.board.nodes[node]

    if (node !== 0) {
      if (nodeData.type == "buff") {
        return this.canActivateNode(nodeData.parent) && this.unit.star >= nodeData.skill.unlockStar && this.unit.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel
      } else {
        return !nodeData.skill.unlockStar || (this.canActivateNode(nodeData.parent) && this.unit.star >= nodeData.skill.unlockStar && this.unit.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel)
      }
    } else {
      return true
    }
  }

  getAvailableSupportNodes(pos) {
    let nodes = []
    let lang = this.translateService.currentLang

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let node = this.unit.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "support" && this.unit.activatedSupport[(pos == 0 ? 1 : 0)] !== nodeId) {
        nodes.push({
          nodeId: nodeId.toString(),
          name: node.skill.names[lang]
        })
      }
    })

    return nodes
  }



  private consoleLog() {
    this.unitService.saveUnit(this.unit)
    this.guildService.saveGuild()
  }
}
