import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { ChainingModalComponent } from '../chaining-modal/chaining-modal.component';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ChainService } from '../services/chain.service';
import { FindBestService } from '../services/find-best.service';
import { NavService } from '../services/nav.service';


@Component({
  selector: 'app-chaining',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.css']
})
export class DamageComponent implements OnInit {
  private lastCreatedId: number = 10000;
  private positionIds: any = {};
  private positionIdsInChain: any = {};
  private units: Unit[];

  unit: any= {};
  createdUnits: any[] = [];
  multiAbilities: any = {};
  abilityTypes: string[] = ['chain', 'finish'];
  observableUnits: Array<Select2OptionData> = [];
  select2Options: Select2.Options = {
    theme: 'bootstrap'
  }

  labels = {
    units: 'Units',
    myunits: 'My Units'
  }

  constructor(
    private unitService: UnitService,
    private chainService: ChainService,
    private findBestService: FindBestService,
    private localStorageService: LocalStorageService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private navService: NavService,
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.reloadList();
    });
  }

  ngOnInit(): void {
    this.unit = {id: 'unselect', selectedIds: []};
    this.onChangeUnit('unselect');

    this.getUnits();
  }

  private getTranslation() {
    this.translateService.get('chain.label.units').subscribe((res: string) => {
      this.labels.units = res;
    });

    this.translateService.get('chain.label.my-units').subscribe((res: string) => {
      this.labels.myunits = res;
    });
  }

  private getUnits(): void {
    this.units = this.unitService.getUnits();
    this.createdUnits = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];
    this.reloadList();
  }

  private sortUnits() {
    this.unitService.sort(this.units, this.translateService);
    this.unitService.sort(this.createdUnits, null);

    this.createdUnits.forEach((unit, index) => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = index;

      if (!unit.multiCasts) {
        unit.multiCasts = [{
          count: 1,
          abilities: []
        }];
      }

      // Needed to correct old createdUnits
      unit.abilities.forEach((ability, abilityIndex) => {
        if (this.abilityTypes.findIndex(x => x === ability.type) === -1) {
          ability.damage = ability.type === 'LB' ? 'physic' : ability.type;
          ability.type = 'chain';
        }

        if (!ability.range) {
          ability.range = {
            min: 0,
            max: 20
          }
        }

        if (!ability.debuffs) {
          ability.debuffs = [];
          if (ability.debuff) {
            Object.keys(ability.debuff).forEach(debuffIndex => {
              ability.debuffs.push({type: debuffIndex, value: ability.debuff[debuffIndex]});
            });
          }
        }

        if (!Array.isArray(ability.framesList)) {
          let frames = ability.framesList.split('-');
          frames[0] = ability.firstHit;
          ability.framesList = frames;
        }

        if (!ability.hitDamage) {
          ability.hitDamage = [];
          ability.framesList.forEach(hit => {
            ability.hitDamage.push(100 / ability.framesList.length);
          });
        }

        if (!ability.id) {
          ability.id = abilityIndex + 1000000000
        }
      });
    });
  }

  private localSaveUnits() {
    if (this.unit.id !== 'unselect') {
      this.unit.activeRename = false;
      this.unit.showChainMod = false;
      this.unit.selectedAbilities.forEach(ability => {
        ability.activeRename = false;
      });
    }
    this.sortUnits();
    this.localStorageService.set('units', this.createdUnits);
  }

  private findPositionOfAbility(unit: any, searchAbility: any) {
    let i = 0;
    let position = 0;
    unit.abilities.forEach(ability => {
      if (ability.name === searchAbility.name) {
        position = i;
      }
      i++;
    });

    return position;
  }

  private findPositionOfAbilityById(unit: any, id: any) {
    let i = 0;
    let position = null;

    unit.abilities.forEach(ability => {
      if (ability.id === id) {
        position = i;
      }
      i++;
    });

    return position;
  }

  private reloadList() {
    this.sortUnits();

    this.observableUnits = [
      {
        id: 'unselect',
        text: this.labels.units,
        children: []
      },
      {
        id: '0',
        text: this.labels.units,
        children: []
      },
      {
        id: '0',
        text: this.labels.myunits,
        children: []
      }
    ];

    this.units.forEach(unit => {
      this.observableUnits[1].children.push({
        id: unit.id.toString(),
        text: unit.getName(this.translateService)
      });

      unit.abilities.forEach(ability => {
        ability.getName(this.translateService)
      })
    });

    this.createdUnits.forEach(unit => {
      this.observableUnits[2].children.push({
        id: unit.id.toString(),
        text: unit.name
      });
    });

    delete this.observableUnits[0].children;
  }

  private updateChangedUnit(abilitiesIds: any = []) {
    this.unit = JSON.parse(JSON.stringify(this.unit));
    let ids = JSON.parse(JSON.stringify(abilitiesIds));

    this.unit.selectedAbilities = [];
    this.unit.selectedIds = ids;

    if (ids.length === 0) {
      ids.push(this.unit.abilities[0].id)
      this.unit.selectedIds = [ids[0]];
    }

    ids.forEach((id, index) => {
      this.unit.selectedAbilities[index] = JSON.parse(JSON.stringify(this.unit.abilities[this.findPositionOfAbilityById(this.unit, id)]));
      this.unit.selectedAbilities[index].activeRename = false;
    });

    this.updateMultiplePossibleAbilities();
  }

  private updateMultiplePossibleAbilities() {
    this.multiAbilities = {};
    if (this.unit.multiCasts.length !== 0) {
      this.unit.multiCasts.forEach(multiCast => {
        this.multiAbilities[multiCast.count] = [];
        this.unit.abilities.forEach(ability => {
          if (ability.magicType !== "black" && ability.magicType !== "white") {
            this.multiAbilities[multiCast.count].push({
              id: ability.id,
              name: ability.name
            });
          }
        });
      });
    }
  }

  private updateMultipleSkill(unit: any, autoAssign: boolean = true): any {
    if (unit.id !== 'unselect' && unit.selectedAbilities && unit.selectedAbilities[0]) {
      unit.possibleMultiple = [{id: 0}];
      let castNumber = 1;
      let ability = unit.selectedAbilities[0];

      if (ability.magicType) {
        if (unit.multipleBlack > 1) {
          unit = this.multipleMagic("black", unit);
          castNumber = unit.multipleBlack;
        }
        if (unit.multipleWhite > 1) {
          unit = this.multipleMagic("white", unit);
          castNumber = castNumber < unit.multipleWhite ? unit.multipleWhite : castNumber;
        }
      } else {
        castNumber = this.multipleAbility(unit);
      }

      unit.castNumber = [];
      for (let i = 0; i < castNumber; i++) {
        unit.castNumber.push(i);
        if (i > 0) {

        }
      }

      if (autoAssign) {
        unit = this.assignMultipleSkill(unit);
      }
    }

    return unit;
  }

  private multipleMagic(magicType: string, unit: any): any {
    unit.abilities.forEach(ability => {
      if (ability.magicType && ability.magicType === magicType) {
        unit.possibleMultiple.push(ability);
      }
    });

    return unit;
  }

  private multipleAbility(unit: any) :number {
    let ability = unit.selectedAbilities[0];
    let castNumber = 1;

    unit.multiCasts.forEach(multiCast => {
      if (castNumber <= multiCast.count) {
        if (multiCast.abilities.indexOf(ability.id) !== -1) {
          castNumber = multiCast.count;

          multiCast.abilities.forEach(abilityId => {
            let tempAbility = unit.abilities[this.findPositionOfAbilityById(unit, abilityId)];
            if (tempAbility) {
              unit.possibleMultiple.push(tempAbility);
            }
          });
        }
      }
    });

    return castNumber;
  }

  private assignMultipleSkill(unit: any) {
    let ability = unit.selectedAbilities[0];

    for(let i = 1; i < unit.castNumber.length; i++) {
      if (!unit.selectedIds[i]) {
        unit.selectedIds[i] = ability.id;
        unit.selectedAbilities[i] = JSON.parse(JSON.stringify(ability));
      }
    }

    return unit;
  }

  private isFirstAbilityMultiple() :number {
    let ability = this.unit.selectedAbilities[0]
    if (this.unit.multiCasts[ability.id]) {
      return this.unit.multiCasts[ability.id]
    } else if (ability.magicType) {
      let possibleMultiple = 1;
      if (ability.magicType === "black" && this.unit.multipleBlack > 1) {
        possibleMultiple = this.unit.multipleBlack;
      } else if (ability.magicType === "white" && this.unit.multipleWhite > 1) {
        possibleMultiple = this.unit.multipleBlack;
      }
      return possibleMultiple;
    } else {
      return 1;
    }
  }

  unselectUnit() {
    if (this.unit.id !== 'unselect') {
      this.onChangeUnit('unselect');
    }
  }

  prepareUnit() {
    this.unit.weapons = [
      {
        atk: 0
      },
      {
        atk: 0
      }
    ];
  }

  onChangeUnit(unitId: any = 'unselect', abilitiesIds: number[] = [], launchChain: boolean = true) {
    if (unitId === 'unselect') {
      this.unit = {
        id: 'unselect',
        framesGap: 0,
        selectedIds: [],
        selectedAbilities: []
      };
    } else if (this.unit.id !== unitId) {
      if (unitId < 10000) {
        this.unit = this.unitService.getUnit(parseInt(unitId));
      } else if (unitId >= 10000) {
        this.unit = this.createdUnits.find(unit => unit.id === parseInt(unitId));
      }

      this.prepareUnit();
      this.updateChangedUnit(abilitiesIds);
      this.unit = this.updateMultipleSkill(this.unit);
    }

    if (launchChain) {
      this.onChangeChain();
    }
  }

  onChangeSkill(abilityPosition: any) {
    let positionInList = this.findPositionOfAbilityById(this.unit, this.unit.selectedIds[abilityPosition]);
    if (positionInList !== null) {
      let ability = JSON.parse(JSON.stringify(this.unit.abilities[positionInList]));

      if (abilityPosition === 0) {
        this.unit.selectedAbilities = [ability];
        this.unit.selectedIds = [this.unit.selectedIds[0]];
        this.unit = this.updateMultipleSkill(this.unit);
      } else {
        this.unit.selectedAbilities[abilityPosition] = ability;
      }
    } else {
      for (let i = this.unit.castNumber.length; i >= abilityPosition; i--) {
        this.unit.selectedIds.splice(i, 1);
        this.unit.selectedAbilities.splice(i, 1);
      }
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    console.log("chain change")
  }

  selectUnit(unit: any, abilities: any, framesGaps: any, launchChain: boolean = true) {
     this.unit = unit;
    let selectedIds = [];
    abilities.forEach(ability => {
      selectedIds.push(ability.id);
    })
    this.onChangeUnit(unit.id, selectedIds, launchChain);
  }

  getAvailableAbilities(abilityPosition: number) {
    if (this.unit.selectedAbilities.length === 0 || abilityPosition === 0) {
      return this.unit.abilities;
    } else {
      return this.unit.possibleMultiple;
    }
  }
}
