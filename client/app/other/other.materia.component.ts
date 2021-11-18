import { Component, OnInit } from '@angular/core';

import { MateriaService } from '../services/materia.service';
import { SkillService } from '../services/skill.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-other-materia',
  templateUrl: './other.materia.component.html',
  styleUrls: ['./other.materia.component.css']
})
export class OtherMateriaComponent implements OnInit {
  materia = [];
  materiaGroup = [];
  skills = [];

  slots = {
    I: 'left',
    F: 'left',
    W: 'left',
    H: 'right',
    O: 'right',
    S: 'right'
  }

  left = {
    mainStats: {},
    passives: {},
    I: {},
    F: {},
    W: {},
    groupSkills: []
  };

  right = {
    mainStats: {},
    passives: {},
    H: {},
    O: {},
    S: {},
    groupSkills: []
  };

  constructor(
    private materiaService: MateriaService,
    private skillService: SkillService,
    private navService: NavService
  ) {
  }

  async ngOnInit() {
    this.navService.setTitle('Materia');

    await this.getMateria();
  }

  async getMateria() {
    const result = await this.materiaService.getMateriaForListing();

    this.materia = result.materia;
    this.materiaGroup = result.materiaGroup;
    this.skills = result.skills;

    console.log(result)

    for (const materia of this.materia) {
      for (const type of materia.types) {
        this.manageMainStats(type.mainStat, materia);
        this.manageSubStats(type.subStats, materia);
        this.manageGroup(type.group, type.mainStat, materia);
        this.manageSkills(type.skills, materia);
      }
    }

    console.log(this.left);
    console.log(this.right);
  }

  manageMainStats(mainStats, materia) {
    mainStats.forEach(rawMainStat => {
      materia.slots.forEach(slot => {
        if (!this[this.slots[slot]].mainStats[materia.rarity]) {
          this[this.slots[slot]].mainStats[materia.rarity] = {};
        }

        if (!this[this.slots[slot]].mainStats[materia.rarity][rawMainStat.type]) {
          this[this.slots[slot]].mainStats[materia.rarity][rawMainStat.type] = {
            min: rawMainStat.min,
            max: rawMainStat.max
          }
        }
      });
    });
  }

  manageSubStats(subStats, materia) {
    subStats.forEach(rawSubStat => {
      rawSubStat.forEach(subStat => {
        materia.slots.forEach(slot => {
          if (!this[this.slots[slot]][slot][materia.rarity]) {
            this[this.slots[slot]][slot][materia.rarity] = {};
          }

          if (!this[this.slots[slot]][slot][materia.rarity][subStat.type]) {
            this[this.slots[slot]][slot][materia.rarity][subStat.type] = {
              min: subStat.min,
              max: subStat.max
            }
          }
        });
      });
    });
  }

  manageGroup(group, rawMainStat, materia) {
    materia.slots.forEach(slot => {
      const materiaGroup = this.materiaGroup.find(searchedGroup => searchedGroup.dataId === group);
      if (!this[this.slots[slot]].groupSkills[group] && materiaGroup) {
        let mainStat = '';
        rawMainStat.forEach((stat, statIndex) => {
          if (statIndex > 0) {
            mainStat += '_';
          }

          mainStat += stat.type;
        });

        const formattedGroup = {
          mainStat: mainStat,
          bonus: []
        }

        Object.keys(materiaGroup.bonus).forEach(bonusNumber => {
          const skill = this.skills.find(searchedSkill => searchedSkill.dataId === materiaGroup.bonus[bonusNumber]);

          if (skill) {
            formattedGroup.bonus.push({
              num: bonusNumber,
              formatedSkill: this.skillService.formatEffects(materia, skill)
            });
          }
        });

        this[this.slots[slot]].groupSkills[group] = formattedGroup;
      }
    });
  }

  manageSkills(skills, materia) {
    /*subStats.forEach(rawSubStat => {
      rawSubStat.forEach(subStat => {
        materia.slots.forEach(slot => {
          if (!this[this.slots[slot]][slot][materia.rarity]) {
            this[this.slots[slot]][slot][materia.rarity] = {};
          }

          if (!this[this.slots[slot]][slot][materia.rarity][subStat.type]) {
            this[this.slots[slot]][slot][materia.rarity][subStat.type] = {
              min: subStat.min,
              max: subStat.max
            }
          }
        });
      });
    });*/
  }
}
