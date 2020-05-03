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
  savedUnits
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
    this.savedUnits = this.localStorageService.get('units') ? this.localStorageService.get('units') : {};
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

    if (this.savedUnits[this.unit.dataId]) {
      this.unit = this.savedUnits[this.unit.dataId]

      this.unit.jobsData.forEach(job => {
        job.name = job.names[lang]
      })
    } else {
      this.unit.star = 1;
      this.unit.lb = 0;
      this.unit.level = 1;

      this.unit.jobsData = []
      this.unit.jobs.forEach((jobId, jobIndex) => {
        let job = this.jobService.getJob(jobId)
        job.name = job.names[lang]
        job.level = 1;
        this.unit.jobsData.push(job)
      })
    }

    let lang = this.translateService.currentLang
    this.unit.name = this.unit.names[lang]

    this.updateMaxLevel();
    this.updateMaxJobLevel();
    this.changeLevels();
    this.grid = this.gridService.generateUnitGrid(this.unit)

    console.log(this.unit)
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

      if (job.level > this.unit.maxJobLevel) {
        job.level = this.unit.maxJobLevel
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
  }

  private calculateTotalStats() {
    let statsPerStatue = this.guildService.getStats()

    Object.keys(this.unit.stats).forEach(stat => {
      this.stats[stat].total = this.stats[stat].baseTotal;
      if (statsPerStatue[stat]) {
        this.stats[stat].total += Math.floor(this.stats[stat].baseTotal * this.guild[statsPerStatue[stat]] / 100)
      }
    });
  }

  rightClickNode(node) {
    if (node !== 0) {
      this.hideNode(node)
    }
  }

  clickNode(node) {
    if (node !== 0) {
      if (!this.unit.board.nodes[node].activated || this.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
    }
  }

  showNode(node) {
    if (node !== 0) {
      if (!this.unit.board.nodes[node].activated) {
        this.unit.board.nodes[node].activated = true;
        this.showNode(this.unit.board.nodes[node].parent)
      }

      this.updateSkill(node, true)
    }
  }

  hideNode(node) {
    if (node !== 0) {
      let level = this.updateSkill(node, false)
      if (level === 0) {
        this.unit.board.nodes[node].activated = false;
        this.unit.board.nodes[node].children.forEach(childNode => {
          this.hideNode(childNode)
        })
      }
    }
  }

  private updateSkill(node, increase) {
    console.log(this.unit.board.nodes[node].dataId)

    if (this.grid.nodesForGrid[node].subType == "buff") {
      let skill = this.unit.buffs.find(buff => buff.dataId === this.unit.board.nodes[node].dataId)
      skill.level = increase ? 1 : 0;

    } else {
      let skill = this.unit.skills.find(skill => skill.dataId === this.unit.board.nodes[node].dataId)
      console.log(typeof(skill.level) == "number")
      if (increase) {
        skill.level = typeof(skill.level) == "number" ? (skill.level == 20 ? 20 : skill.level + 1) : 1
      } else {
        skill.level = typeof(skill.level) == "number" ? (skill.level == 0 ? 0 : skill.level - 1) : 0
      }
    }

    console.log(skill.level)
    return skill.level
  }

  getSkillLevel(skillId) {
    return this.unit.skills.find(skill => skill.dataId === skillId).level
  }



  private consoleLog() {
    this.savedUnits[this.unit.dataId] = this.unit
    this.localStorageService.set('units', this.savedUnits);
    this.guildService.saveGuild()

    console.log(this.savedUnits)
  }
}
