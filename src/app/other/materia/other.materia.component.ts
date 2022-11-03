import { Component, OnInit } from '@angular/core';

import { MateriaService } from '../../services/materia.service';
import { SkillService } from '../../services/skill.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-other-materia',
  templateUrl: './other.materia.component.html',
  styleUrls: ['./other.materia.component.css']
})
export class OtherMateriaComponent implements OnInit {
  materia = [];
  materiaGroup = [];
  skills = [];

  version = 'GL';

  slots = {
    I: 'left',
    F: 'left',
    W: 'left',
    H: 'right',
    O: 'right',
    S: 'right'
  };

  groups = {
    left: {
      mainStats: {},
      passives: {},
      I: {},
      F: {},
      W: {},
      groupSkills: []
    },
    right: {
      mainStats: {},
      passives: {},
      H: {},
      O: {},
      S: {},
      groupSkills: []
    }
  };

  formattedGroups = {
    GL: {
      I: 'I',
      F: 'J',
      W: 'P',
      H: 'A',
      O: 'T',
      S: 'G'
    },
    JP: {
      I: 'I',
      F: 'F',
      W: 'W',
      H: 'H',
      O: 'O',
      S: 'S'
    }
  };

  constructor(
    private materiaService: MateriaService,
    private skillService: SkillService,
    private toolService: ToolService,
    private navService: NavService
  ) {
    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    this.navService.setSEO('Materia', 'Ugly page but you have every info for materia (aka Trust Stone). Min and max stats, skills, ... Well every possibilities.');

    await this.getMateria();
  }

  async getMateria() {
    const result = await this.materiaService.getMateriaForListing();

    this.materia = result.materia;
    this.materiaGroup = result.materiaGroup;
    this.skills = result.skills;

    for (const materia of this.materia) {
      for (const type of materia.types) {
        this.manageMainStats(type.mainStat, materia);
        this.manageSubStats(type.subStats, materia);
        this.manageGroup(type.group, type.mainStat, materia);
        this.manageSkills(type.skills, materia);
      }
    }

    this.sortSkills();
  }

  manageMainStats(mainStats, materia) {
    mainStats.forEach(rawMainStat => {
      materia.slots.forEach(slot => {
        if (!this.groups[this.slots[slot]].mainStats[materia.rarity]) {
          this.groups[this.slots[slot]].mainStats[materia.rarity] = [];
        }

        if (!this.groups[this.slots[slot]].mainStats[materia.rarity].find(searchedMainStat => searchedMainStat.type === rawMainStat.type)) {
          this.groups[this.slots[slot]].mainStats[materia.rarity].push({
            type: rawMainStat.type,
            min: rawMainStat.min,
            max: rawMainStat.max
          });
        }
      });
    });
  }

  manageSubStats(subStats, materia) {
    subStats.forEach(rawSubStat => {
      rawSubStat.forEach(subStat => {
        materia.slots.forEach(slot => {
          if (!this.groups[this.slots[slot]][slot][materia.rarity]) {
            this.groups[this.slots[slot]][slot][materia.rarity] = [];
          }

          if (!this.groups[this.slots[slot]][slot][materia.rarity].find(searchedType => searchedType.type === subStat.type)) {
            this.groups[this.slots[slot]][slot][materia.rarity].push({
              type: subStat.type,
              min: subStat.min,
              max: subStat.max
            });
          }
        });
      });
    });
  }

  manageGroup(group, rawMainStat, materia) {
    materia.slots.forEach(slot => {
      const materiaGroup = this.materiaGroup.find(searchedGroup => searchedGroup.dataId === group);
      if (!this.groups[this.slots[slot]].groupSkills.find(searchedFormattedGroup => searchedFormattedGroup.dataId === group) && materiaGroup) {
        let mainStat = '';
        rawMainStat.forEach((stat, statIndex) => {
          if (statIndex > 0) {
            mainStat += '_';
          }

          mainStat += stat.type;
        });

        const formattedGroup = {
          dataId: group,
          mainStat: mainStat,
          bonus: []
        };

        Object.keys(materiaGroup.bonus).forEach(bonusNumber => {
          const skill = this.skills.find(searchedSkill => searchedSkill.dataId === materiaGroup.bonus[bonusNumber]);

          if (skill) {
            formattedGroup.bonus.push({
              num: bonusNumber,
              formattedSkill: this.skillService.formatEffects(materia, skill)
            });
          }
        });

        this.groups[this.slots[slot]].groupSkills.push(formattedGroup);
      }
    });
  }

  manageSkills(skills, materia) {
    skills.forEach(skillId => {
      const skill = this.skills.find(searchedSkill => searchedSkill.dataId === skillId);

      if (skill) {
        materia.slots.forEach(slot => {
          if (!this.groups[this.slots[slot]].passives[materia.rarity]) {
            this.groups[this.slots[slot]].passives[materia.rarity] = [];
          }

          if (!this.groups[this.slots[slot]].passives[materia.rarity].find(searchedPassive => searchedPassive.dataId === skillId)) {
            this.groups[this.slots[slot]].passives[materia.rarity].push({
              dataId: skillId,
              formattedSkill: this.skillService.formatEffects(materia, skill)
            });
          }
        });
      }
    });
  }

  sortSkills() {
    ['left', 'right'].forEach(group => {
      ['UR', 'MR', 'SR', 'R', 'N'].forEach(rarity => {
        const formattedSkills = [];

        this.groups[group].passives[rarity].forEach(skill => {
          formattedSkills.push(skill.formattedSkill);
        });

        this.toolService.sortByName(formattedSkills, 'asc', 'after');

        this.groups[group].passives[rarity] = formattedSkills;
      });
    });
  }
}
