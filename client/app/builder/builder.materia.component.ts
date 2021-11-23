import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { MateriaService } from '../services/materia.service';
import { NavService } from '../services/nav.service';
import { AuthService } from '../services/auth.service';
import { ToolService } from '../services/tool.service';
import { SkillService } from '../services/skill.service';

import { Materia } from '../entities/materia';

import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';
import { ModalDeleteComponent } from './modal/modal.delete.component';

@Component({
  selector: 'app-builder-materia',
  templateUrl: './builder.materia.component.html',
  styleUrls: ['./builder.materia.component.css']
})
export class BuilderMateriaComponent implements OnInit {
  materias = [];
  materiaGroups = [];
  materiaSkills = [];

  savedMateriasWithoutFilters = {};
  savedMaterias = [];
  materia;

  step = 'list';

  initialLoad = false;
  loadingBuild = false;
  loadingData = true;
  showSave = false;
  selectedMateriaId = null;

  searchText = '';
  sort = 'rarity';
  order = 'desc';
  filters = {
    rarity: [],
    type: []
  };
  version = 'GL';

  isFilterChecked = {
    rarity: [],
    type: []
  };
  collapsed = {
    rarity: false,
    type: false
  };

  rarities = [
    'UR',
    'MR',
    'SR',
    'R',
    'N'
  ];

  types = [
    'I',
    'F',
    'W',
    'H',
    'O',
    'S'
  ];

  mainStatTranslate = {
    CRITIC_RATE: 'Critic Rate',
    CRITIC_EVADE: 'Critic Evade',
    ACCURACY: 'Accuracy',
    EVADE: 'Evade'
  };

  changeSkill = [
    false
  ];

  constructor(
    private materiaService: MateriaService,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private skillService: SkillService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    this.navService.setTitle('Materia Builder');

    if (sessionStorage.getItem('materiasFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('materiasFilters'));
    }

    if (sessionStorage.getItem('materiasCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('materiasCollapsed'));
    }

    this.filterChecked();
    this.filterMaterias();
  }

  ngAfterViewInit() {
    this.loadingData = true;

    setTimeout(() => {
      this.authService.$load.subscribe(async load => {
        await this.getMaterias();
        this.loadingData = false;
        this.savedMateriasWithoutFilters = this.materiaService.getSavedMaterias();

        this.filterMaterias();

        this.activatedRoute.paramMap.subscribe(async (params: Params) => {
          const data = params.get('data');
          if (data && !this.initialLoad) {
            this.loadingBuild = true;
            this.initialLoad = true;

            this.materiaService.getStoredMateria(data).subscribe(async (materiaData: any) => {
              if (materiaData && this.materias.length > 0) {
                const materia = new Materia();
                this.materiaService.buildMateriaFromData(materia, materiaData, this.materias, this.materiaSkills);
                this.selectMateria(materia);
              }
              this.loadingBuild = false;
            });
          }
        });
      });
    });

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      });
    });
  }

  async getMaterias() {
    const result = await this.materiaService.getMateriaForListing(this.filters, this.sort, this.order);
    this.materias = result.materia;
    this.materiaGroups = result.materiaGroup;
    this.materiaSkills = result.skills;
  }

  filterMaterias() {
    if (this.materias.length > 0) {
      this.savedMaterias = this.materiaService.filterMaterias(this.savedMateriasWithoutFilters, this.filters, this.sort, this.order, this.materias, this.materiaSkills);
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredMaterias() {
    return this.savedMaterias;
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('materiasFilters', JSON.stringify(this.filters));

    this.filterMaterias();
  }

  filterChecked() {
    this.rarities.forEach(rarity => {
      if (this.filters.rarity.indexOf(rarity) === -1) {
        this.isFilterChecked.rarity[rarity] = false;
      } else {
        this.isFilterChecked.rarity[rarity] = true;
      }
    });

    this.types.forEach(type => {
      if (this.filters.type.indexOf(type) === -1) {
        this.isFilterChecked.type[type] = false;
      } else {
        this.isFilterChecked.type[type] = true;
      }
    });
  }

  /***********/
  /* BUILDER */
  /***********/
  backToMateriaList() {
    this.step = 'list';
  }

  buildNewMateria() {
    if (this.materias[0]) {
      this.materia = new Materia();
      this.materia.constructFromJson(this.materias[0]);
      this.materia.slot = this.materia.slots[0];
      this.materia.level = 20;
      this.materia.mainStat = '';

      this.materia.types[0].mainStat.forEach((rawMainStat, rawMainStatIndex) => {
        if (rawMainStatIndex > 0) {
          this.materia.mainStat += '_';
        }

        this.materia.mainStat += rawMainStat.type;
      });

      this.updateMateria();

      this.step = 'build';
    }
  }

  selectMateria(materia) {
    this.materia = this.materiaService.copyMateriaFromData(materia) ;
    this.materia.initialDataId = materia.dataId;

    this.step = 'build';
  }

  resetMateria() {
    this.materia.resetMateria(this.materiaSkills, this.skillService);
  }

  maxMateria() {
    this.materia.maxMateria(this.materiaSkills, this.skillService);
  }

  randomSubStats() {
    this.materia.subStats.forEach(subStat => {
      subStat.value = subStat.tableLevels[Math.floor(Math.random() * subStat.tableLevels.length)];
    });
  }

  randomSkill(skillPos) {
    this.materia.skills[skillPos] = this.materia.availableSkills[Math.floor(Math.random() * this.materia.availableSkills.length)].dataId;
    this.updateSkill(skillPos);
  }

  toogleChangeSkill(skillPos, forceHide = false) {
    if (!this.changeSkill[skillPos] && !forceHide) {
      this.changeSkill[skillPos] = true;
    } else {
      this.changeSkill[skillPos] = false;
    }
  }

  updateMateria() {
    this.materiaService.getAvailableMainStats(this.materia, this.materias);
    this.materiaService.getMateriaFromCharacteristics(this.materia, this.materias, this.materiaSkills);

    this.updateLevel();
    this.updateSkill(0);
  }

  updateLevel() {
    this.materia.updateLevel();
  }

  updateSkill(skillPos) {
    this.materia.updateSkill(skillPos, this.materiaSkills, this.skillService);
    this.toogleChangeSkill(skillPos, true);
  }

  removeSkill(skillPos) {
    this.materia.skills.splice(skillPos, 1);
    this.updateSkill(skillPos);
  }

  openSaveModal() {
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'materia';
    modalRef.componentInstance.item = this.materia;

    modalRef.result.then(result => {
      this.savedMateriasWithoutFilters = this.materiaService.getSavedMaterias();
      this.filterMaterias();
    }, (reason) => {
    });
  }

  openDeleteModal() {
    const modalRef = this.modalService.open(ModalDeleteComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'materia';
    modalRef.componentInstance.item = this.materia;

    modalRef.result.then(result => {
      this.step = 'list';
      this.materia = null;
      this.savedMateriasWithoutFilters = this.materiaService.getSavedMaterias();
      this.filterMaterias();
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'materia';
    modalRef.componentInstance.item = this.materia;
  }
}
