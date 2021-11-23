import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { Materia } from '../entities/materia';

import { SkillService } from './skill.service';
import { ApiService } from './api.service';
import { NavService } from './nav.service';
import { AuthService } from './auth.service';
import { ToolService } from './tool.service';

@Injectable()
export class MateriaService {
  private sre = /^\s+|\s+$/g;
  materia;

  constructor(
    private skillService: SkillService,
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private authService: AuthService,
    private apiService: ApiService,
    private toolService: ToolService,
    private firestore: AngularFirestore
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

  getSavableData(materia, onlyMateria = true) {
    const data = {
      dataId: materia.dataId,
      level: materia.level,
      rarity: materia.rarity,
      mainStat: materia.mainStat,
      subStats: [],
      skills: materia.skills,
      slot: materia.slot,
      skillsLevel: [],
      storeId: materia.storeId
    };

    materia.subStats.forEach(subStat => {
      data.subStats.push({
        type: subStat.type,
        value: subStat.value
      });
    });

    materia.skillsDetail.forEach(skillDetail => {
      data.skillsLevel.push(skillDetail.level);
    });

    if (!data.storeId) {
      delete data.storeId;
    }

    if (onlyMateria) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;
      // @ts-ignore
      data.customName = Date.now();
    }

    return data;
  }

  materiaAlreadyExists(materia) {
    const savedMaterias = this.getSavedMaterias();
    let materiaFinded = false;

    if (materia.storeId) {
      materiaFinded = true;
    }

    return materiaFinded;
  }

  saveMateria(materia, method) {
    const savableData = this.getSavableData(materia);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        // @ts-ignore
        delete savableData.user;
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method === 'new') {
          // @ts-ignore
          savableData.storeId = data.id;
          const savedMaterias = this.getSavedMaterias();

          if (savedMaterias[materia.dataId]) {
            savedMaterias[materia.dataId].push(savableData);
          } else {
            savedMaterias[materia.dataId] = [savableData];
          }

          this.localStorageService.set(this.getLocalStorage(), savedMaterias);
        }
        materia.storeId = data.id;

        return data.id;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(materia.storeId).set(savableData).then(data => {
        const savedMaterias = this.getSavedMaterias();

        if (materia.initialDataId !== materia.dataId) {
          savedMaterias[materia.initialDataId].splice(savedMaterias[materia.initialDataId].findIndex(searchedMateria => searchedMateria.storeId === materia.storeId), 1);

          if (!savedMaterias[materia.dataId]) {
            savedMaterias[materia.dataId] = [];
          }
          savedMaterias[materia.dataId].push(savableData);
        } else {
          savedMaterias[materia.dataId].forEach((savedMateria, materiaIndex) => {
            if (savedMateria.storeId === materia.storeId) {
              savedMaterias[materia.dataId][materiaIndex] = savableData;
              savedMaterias[materia.dataId][materiaIndex].storeId = materia.storeId;
            }
          });
        }

        this.localStorageService.set(this.getLocalStorage(), savedMaterias);

        return materia.storeId;
      });
    }
  }

  getExportableLink(materia) {
    if (!materia.storeId || this.hasChangeBeenMade(materia)) {
      return this.saveMateria(materia, 'share');
    }

    return new Promise((resolve, reject) => {
      resolve(materia.storeId);
    });
  }

  hasChangeBeenMade(materia) {
    if (materia.storeId) {
      const newData = this.getSavableData(materia);
      let oldData = null;

      if (this.getSavedMaterias()[materia.dataId]) {
        this.getSavedMaterias()[materia.dataId].forEach(savedMateria => {
          if (savedMateria.storeId === materia.storeId) {
            oldData = savedMateria;
            delete oldData.customName;
          }
        });

        // @ts-ignore
        delete newData.customName;

        return !this.toolService.equal(oldData, newData);
      }
    }

    return true;
  }

  getStoredMateria(dataId) {
    const document = this.firestore.collection(this.getLocalStorage()).doc(dataId);

    return document.valueChanges();
  }

  deleteMateria(materia) {
    this.firestore.collection(this.getLocalStorage()).doc(materia.storeId).delete();

    const savedMaterias = this.getSavedMaterias();

    savedMaterias[materia.dataId].forEach((savedMateria, savedMateriaIndex) => {
      if (savedMateria.storeId === materia.storeId) {
        savedMaterias[materia.dataId].splice(savedMateriaIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedMaterias);
  }

  filterMaterias(materias, filters, sort = 'rarity', order = 'desc', rawMaterias, rawSkills) {
    if (filters) {
      const filteredMaterias = [];

      for (const materiaId of Object.keys(materias)) {
        const materiaDataByMateria = materias[materiaId];
        for (const materiaData of materiaDataByMateria) {
          const materia = new Materia();
          this.buildMateriaFromData(materia, materiaData, rawMaterias, rawSkills);

          if ((filters.rarity.length === 0 || filters.rarity.indexOf(materia.rarity) !== -1)) {
            let needToAddMateria = false;
            if ((!filters.type || filters.type.length === 0)) {
              needToAddMateria = true;
            } else {
              if (filters.type && filters.type.length > 0) {
                if (filters.type.indexOf(materia.slot) !== -1) {
                  needToAddMateria = true;
                }
              }
            }

            if (needToAddMateria) {
              filteredMaterias.push(materia);
            }
          }
        }
      }

      return this.sortMaterias(filteredMaterias, sort, order);
    } else {
      return this.sortMaterias(materias, sort, order);
    }
  }

  private sortMaterias(materias, sort = 'rarity', order = 'desc') {
    switch (sort) {
      case 'rarity' :
        return this.toolService.sortByRarity(materias, order);
      break;
      default :
        console.log('not managed sort');
        return materias;
      break;
    }
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
    let foundedMateria = false;

    for (const rawMateria of rawMaterias) {
      if (rawMateria.slots.indexOf(materia.slot) !== -1 && rawMateria.rarity === materia.rarity) {
        for (const type of rawMateria.types) {
          let mainStat = '';
          let rawMainStatIndex = 0;
          for (const rawMainStat of type.mainStat) {
            if (rawMainStatIndex > 0) {
              mainStat += '_';
            }

            mainStat += rawMainStat.type;
            rawMainStatIndex++;
          }

          if (mainStat === materia.mainStat) {
            this.updateMateriaForBuilder(materia, rawMateria, rawSkills, type, mainStat);
            foundedMateria = true;
            return;
          }
        }
      }
    }

    if (!foundedMateria) {
      for (const rawMateria of rawMaterias) {
        if (rawMateria.slots.indexOf(materia.slot) !== -1 && rawMateria.rarity === materia.rarity) {
          this.updateMateriaForBuilder(materia, rawMateria, rawSkills, rawMateria.types[0]);
          return;
        }
      }
    }
  }

  private updateMateriaForBuilder(materia, rawMateria, rawSkills, type, mainStat = '') {
    if (mainStat === '') {
      type.mainStat.forEach((rawMainStat, rawMainStatIndex) => {
        if (rawMainStatIndex > 0) {
          mainStat += '_';
        }

        mainStat += rawMainStat.type;
      });
    }

    materia.dataId = rawMateria.dataId;
    materia.maxSkill = rawMateria.maxSkill;
    materia.mainStat = mainStat;
    materia.image = rawMateria.image;
    materia.subStats = type.subStats[0];
    materia.availableSkills = [];

    type.skills.forEach(skillId => {
      let formattedEffect = '';
      const formattedEffects = this.skillService.formatEffects(materia, rawSkills.find(searchedSkill => searchedSkill.dataId === skillId), false);
      formattedEffects.before.forEach(beforeEffect => {
        formattedEffect += (formattedEffect !== '' ? ', ' : '') + beforeEffect;
      });

      formattedEffects.after.forEach(afterEffect => {
        formattedEffect += (formattedEffect !== '' ? ', ' : '') + afterEffect;
      });

      materia.availableSkills.push({
        dataId: skillId,
        formattedEffect: formattedEffect
      });
    });
    materia.availableSkills = this.sortAvailableSkillsByName(materia.availableSkills);

    materia.skills = [
      materia.availableSkills[0].dataId
    ];

    materia.skillsDetail = [{
      level: 1,
      formattedEffect: '',
        shortEffect: ''
    }];

    materia.skillsNumTable = [];
    for (let i = 0; i < materia.maxSkill; i++) {
      materia.skillsNumTable.push(i);
    }
  }

  buildMateriaFromData(materia, materiaData, rawMaterias, rawSkills) {
    const rawMateria = JSON.parse(JSON.stringify(rawMaterias.find(searchedMateria => searchedMateria.dataId === materiaData.dataId)));

    materia.dataId = rawMateria.dataId;
    materia.image = rawMateria.image;
    materia.rarity = rawMateria.rarity;
    materia.slot = materiaData.slot;
    materia.maxSkill = rawMateria.maxSkill;

    materia.skills = materiaData.skills;
    materia.level = materiaData.level;
    materia.storeId = materiaData.storeId;
    materia.mainStat = materiaData.mainStat;

    materia.skillsNumTable = [];
    for (let i = 0; i < materia.maxSkill; i++) {
      materia.skillsNumTable.push(i);
    }

    materia.availableSkills = [];
    rawMateria.types.forEach(type => {
      let mainStat = '';
      type.mainStat.forEach((rawMainStat, rawMainStatIndex) => {
        if (rawMainStatIndex > 0) {
          mainStat += '_';
        }

        mainStat += rawMainStat.type;
      });

      if (mainStat === materia.mainStat) {
        materia.subStats = type.subStats[0];
        type.skills.forEach(skillId => {
          let formattedEffect = '';
          const formattedEffects = this.skillService.formatEffects(materia, rawSkills.find(searchedSkill => searchedSkill.dataId === skillId), false);
          formattedEffects.before.forEach(beforeEffect => {
            formattedEffect += (formattedEffect !== '' ? ', ' : '') + beforeEffect;
          });

          formattedEffects.after.forEach(afterEffect => {
            formattedEffect += (formattedEffect !== '' ? ', ' : '') + afterEffect;
          });

          materia.availableSkills.push({
            dataId: skillId,
            formattedEffect: formattedEffect
          });
        });

        materia.availableSkills = this.sortAvailableSkillsByName(materia.availableSkills);
      }
    });

    materiaData.subStats.forEach(subStatValues => {
      const subStat = materia.subStats.find(searchedStat => searchedStat.type === subStatValues.type);

      subStat.value = subStatValues.value;
    });

    materia.skillsDetail = [];
    materiaData.skillsLevel.forEach((skillLevel, skillLevelIndex) => {
      materia.skillsDetail.push({
        level: skillLevel,
        formattedEffect: '',
        shortEffect: ''
      });
      materia.updateSkill(skillLevelIndex, rawSkills, this.skillService);
    });

    materia.updateLevel();
  }

  copyMateriaFromData(materiaData) {
    const materia = new Materia();
    materiaData = JSON.parse(JSON.stringify(materiaData));

    Object.keys(materiaData).forEach(materiaKey => {
      materia[materiaKey] = materiaData[materiaKey];
    });

    return materia;
  }

  private reduceString(s: any) {
    return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  sortAvailableSkillsByName(skills) {
    skills.sort((a: any, b: any) => {
      const x = this.reduceString(a.dataId);
      const y = this.reduceString(b.dataId);

      return x.localeCompare(y, 'ja');
    });

    return skills;
  }
}
