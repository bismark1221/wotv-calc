import { Injectable } from '@angular/core';

import { Materia } from '../entities/materia';

import { SkillService } from './skill.service';
import { ApiService } from './api.service';

@Injectable()
export class MateriaService {
  materia;

  constructor(
    private skillService: SkillService,
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
}
