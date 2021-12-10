import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { MateriaService } from '../../services/materia.service';
import { NavService } from '../../services/nav.service';
import { AuthService } from '../../services/auth.service';
import { ToolService } from '../../services/tool.service';
import { SkillService } from '../../services/skill.service';

import { Materia } from '../../entities/materia';

@Component({
  selector: 'app-modal-materia',
  templateUrl: './modal.materia.component.html',
  styleUrls: ['./modal.materia.component.css']
})
export class ModalMateriaComponent implements OnInit, AfterViewInit {
  materias = [];
  materiaGroups = [];
  materiaSkills = [];

  savedMateriasWithoutFilters = {};
  savedMaterias = [];

  initialLoad = false;
  loadingBuild = false;
  loadingData = true;
  showSave = false;
  selectedMateriaId = null;

  @Input() public equipment;
  @Input() public modalStep = 'select';
  @Input() public materia;
  @Input() public materiaType;

  searchText = '';
  sort = 'rarity';
  order = 'desc';
  filters = {
    rarity: [],
    type: []
  };
  version = 'GL';

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
    private modal: NgbActiveModal
  ) {
    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    if (this.materia) {
      this.materia = this.materiaService.copyMateriaFromData(this.materia);
    }
  }

  ngAfterViewInit() {
    this.loadingData = true;

    setTimeout(() => {
      this.authService.$load.subscribe(async load => {
        await this.getMaterias();
        this.loadingData = false;
        this.savedMateriasWithoutFilters = this.materiaService.getSavedMaterias();

        this.filterMaterias();
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
      this.filters.type[0] = this.materiaType;
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

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      return false;
    } else {
      return true;
    }
  }

  /***********/
  /* BUILDER */
  /***********/
  backToMateriaList() {
    this.modalStep = 'select';
  }

  buildNewMateria() {
    if (this.materias[0]) {
      this.materia = new Materia();
      this.materia.constructFromJson(this.materias[0]);
      this.materia.slot = this.materiaType;
      this.materia.level = 20;
      this.materia.mainStat = '';

      this.materia.types[0].mainStat.forEach((rawMainStat, rawMainStatIndex) => {
        if (rawMainStatIndex > 0) {
          this.materia.mainStat += '_';
        }

        this.materia.mainStat += rawMainStat.type;
      });

      this.updateMateria();

      this.modalStep = 'custom';
    }
  }

  selectMateria(materia) {
    this.materia = this.materiaService.copyMateriaFromData(materia) ;
    this.materia.initialDataId = materia.dataId;
    this.materiaService.getAvailableMainStats(this.materia, this.materias);

    this.modalStep = 'custom';
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

  close() {
    this.modal.dismiss();
  }

  save() {
    this.modal.close(this.materia);
  }

  removeMateria() {
    this.modal.close(null);
  }
}
