import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Materia } from '../entities/materia';

import { SkillService } from './skill.service';
import { ApiService } from './api.service';
import { NavService } from './nav.service';

@Injectable()
export class MateriaService {
  materia;

  constructor(
    private skillService: SkillService,
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private apiService: ApiService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('materia', param, extraQuery)));
  }

  async getMateriaForListing(filters = null, sort = 'name', order = 'asc') {
    const materias: Materia[] = [];
    const result = await this.getApi();

    result.materia.forEach(rawMateria => {
      const materia = new Materia();
      materia.constructFromJson(rawMateria);
      materias.push(materia);
    });

    return {
      materia: materias,
      materiaGroup: result.materiaGroup,
      skills: result.skills
    };
  }

  private getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_materia' : 'materia';
  }

  getSavedMaterias() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getAvailableMainStats(materia, rawMaterias) {
    materia.mainStasAvailable = [];

    rawMaterias.forEach(rawMateria => {
      if (rawMateria.slots.indexOf(materia.slot) !== -1 && rawMateria.rarity === materia.rarity) {
        rawMateria.types.forEach(type => {
          let mainStat = '';
          type.mainStat.forEach((rawMainStat, rawMainStatIndex) => {
            if (rawMainStatIndex > 0) {
              mainStat += '_';
            }

            mainStat += rawMainStat.type;
          });

          if (materia.mainStasAvailable.indexOf(mainStat) === -1) {
            materia.mainStasAvailable.push(mainStat);
          }
        });
      }
    });
  }

  getMateriaFromCharacteristics(materia, rawMaterias, rawSkills) {
    rawMaterias.forEach(rawMateria => {
      if (rawMateria.slots.indexOf(materia.slot) !== -1 && rawMateria.rarity === materia.rarity) {
        rawMateria.types.forEach(type => {
          let mainStat = '';
          type.mainStat.forEach((rawMainStat, rawMainStatIndex) => {
            if (rawMainStatIndex > 0) {
              mainStat += '_';
            }

            mainStat += rawMainStat.type;
          });

          if (mainStat === materia.mainStat) {
            materia.image = rawMateria.image;
            materia.subStats = type.subStats[0];
            materia.availableSkills = [];

            type.skills.forEach(skillId => {
              materia.availableSkills.push({
                dataId: skillId,
                formattedEffect: this.skillService.formatEffects(materia, rawSkills.find(searchedSkill => searchedSkill.dataId === skillId))
              });
            });

            materia.skills = [
              materia.availableSkills[0].dataId
            ];
          }
        });
      }
    });


  }
}
