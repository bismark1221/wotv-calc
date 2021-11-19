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

  loadingBuild = false;
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

    await this.getMaterias();

    if (sessionStorage.getItem('materiasFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('materiasFilters'));
    }

    if (sessionStorage.getItem('materiasCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('materiasCollapsed'));
    }

    this.filterChecked();
    this.filterMaterias();

    /*console.log("=== INIT ===")
    console.log(this.materias)
    console.log(this.materiaGroups)
    console.log(this.materiaSkills)*/
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedMateriasWithoutFilters = this.materiaService.getSavedMaterias();
        console.log('=== SAVED ===');
        console.log(this.savedMateriasWithoutFilters);
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
    // Filter on saved Materias
    // this.savedMaterias = this.materiaService.filterMaterias(this.savedMateriasWithoutFilters, this.filters, this.sort, this.order);
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

  buildNewMateria() {
    this.materia = new Materia();
    this.materia.constructFromJson(this.materias[0]);
    this.materia.slot = this.materia.slots[0];
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

  resetMateria() {

  }

  maxMateria() {

  }

  updateMateria() {
    this.materiaService.getAvailableMainStats(this.materia, this.materias);
    this.materiaService.getMateriaFromCharacteristics(this.materia, this.materias, this.materiaSkills);
    console.log(this.materia);
  }
}
