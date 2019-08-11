import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { ChainingModalComponent } from '../chaining-modal/chaining-modal.component';

import { Unit } from '../entities/unit';
import { Monster } from '../entities/monster';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ChainService } from '../services/chain.service';
import { FindBestService } from '../services/find-best.service';
import { NavService } from '../services/nav.service';
import { WeaponService } from '../services/weapon.service';
import { ElementsService } from '../services/elements.service';
import { RaceService } from '../services/race.service';
import { DamageService } from '../services/damage.service';

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
  private monsters: Monster[];

  availableRarities = [];
  rounds = [];
  objectKeys = Object.keys;
  unit: any = {};
  monster: any = {};
  createdUnits: any[] = [];
  multiAbilities: any = {};
  weaponTypes: any = {};
  races: string[] = [];
  elements: any[] = [];
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
    private weaponService: WeaponService,
    private elementsService: ElementsService,
    private raceService: RaceService,
    private damageService: DamageService
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.reloadList();
    });
  }

  ngOnInit(): void {
    this.unit = {id: 'unselect', selectedIds: []};
    this.monster = new Monster();
    console.log("MONSTER")
    console.log(this.monster)
    this.onChangeUnit('unselect');

    this.getUnits();
    this.getElements();
    this.weaponTypes = this.weaponService.getWeaponTypes();
    this.races = this.raceService.getRaces();
  }

  private getTranslation() {
    this.translateService.get('chain.label.units').subscribe((res: string) => {
      this.labels.units = res;
    });

    this.translateService.get('chain.label.my-units').subscribe((res: string) => {
      this.labels.myunits = res;
    });
  }

  private getElements(): void {
    let multiElements = this.elementsService.getElements();
    multiElements.splice(0, 1);

    multiElements.forEach(element => {
      this.translateService.get('elements.' + element).subscribe((res: string) => {
        this.elements.push({id: element, name: res});
      });
    });
  }

  private getUnits() {
    this.units = this.unitService.getUnits(true);
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

        if (!ability.imperils) {
          ability.imperils = [];
          if (ability.debuff) {
            Object.keys(ability.debuff).forEach(imperilsIndex => {
              ability.imperils.push({type: imperilsIndex, value: ability.debuff[imperilsIndex]});
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

  private updateChangedUnit() {
    this.unit = JSON.parse(JSON.stringify(this.unit));

    for (let i = this.unit.rarity.min; i < this.unit.rarity.max; i++) {
      this.availableRarities.push(i);
    }
    this.unit.killers = {};
    this.unit.imperils = {};
    this.races.forEach(race => {
      this.unit.killers[race] = {
        passive: 0,
        buff: 0
      }
    });
    this.onChangeRarity();

    this.rounds = [];
    this.addRound();
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

  onChangeUnit(unitId: any = 'unselect') {
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

      this.updateChangedUnit();
    }
    console.log("UNIT")
    console.log(this.unit)
  }

  onChangePot(type: string) {
    if (this.unit.stats[type].maxPot) {
      this.unit.stats[type].potValue = this.unit.dataStats[this.unit.rarity.value][type].pot;
    } else {
      this.unit.stats[type].potValue = 0;
    }
  }

  onChangeLevel() {
    this.unit.stats.atk.base = this.unit.dataStats[this.unit.rarity.value].atk.base;
    this.unit.stats.mag.base = this.unit.dataStats[this.unit.rarity.value].mag.base;
    this.unit.stats.atk.potValue = this.unit.stats.atk.maxPot ? this.unit.dataStats[this.unit.rarity.value].atk.pot : 0;
    this.unit.stats.mag.potValue = this.unit.stats.mag.maxPot ? this.unit.dataStats[this.unit.rarity.value].mag.pot : 0;
  }

  onChangeRarity() {
    this.unit.stats = {
      atk: {},
      mag: {}
    };

    this.unit.stats.atk.base = this.unit.dataStats[this.unit.rarity.value].atk.base;
    this.unit.stats.atk.potValue = this.unit.dataStats[this.unit.rarity.value].atk.pot;
    this.unit.stats.atk.maxPot = true;
    this.unit.stats.mag.base = this.unit.dataStats[this.unit.rarity.value].mag.base;
    this.unit.stats.mag.potValue = this.unit.dataStats[this.unit.rarity.value].mag.pot;
    this.unit.stats.mag.maxPot = true;

    this.unit.level = this.unitService.getLevelsByRarity(this.unit.rarity.value);

    this.onChangeLevel();
  }

  onChangeWeapon(index: number) {
    this.unit.damageWeapons[index].varianceMin = this.weaponTypes[this.unit.damageWeapons[index].type].varianceMin;
    this.unit.damageWeapons[index].varianceMax = this.weaponTypes[this.unit.damageWeapons[index].type].varianceMax;
  }

  onChangeWeaponElement(element: string, index: number) {
    let indexElement = this.unit.damageWeapons[index].elements.indexOf(element, 0);
    if (indexElement > -1) {
      this.unit.damageWeapons[index].elements.splice(indexElement, 1);
    } else {
      this.unit.damageWeapons[index].elements.push(element);
    }
  }

  onMonsterRace(race: string) {
    let indexRace = this.monster.races.indexOf(race, 0);
    if (indexRace > -1) {
      this.monster.races.splice(indexRace, 1);
    } else {
      this.monster.races.push(race);
    }
  }

  addRound() {
    console.log("===== ADD ROUNDS =====")

    this.rounds.push({
      availableAbilities: [],
      selectedAbilities: [],
      castNumber: [0]
    });


    console.log(this.damageService.calculateTotalDamage(this.unit, this.monster, this.rounds))

    /*

    let ids = JSON.parse(JSON.stringify(abilitiesIds));

    this.unit.selectedAbilities = [];
    this.unit.selectedIds = ids;

    if (ids.length === 0) {
      ids.push(this.unit.abilities[0].id)
      this.unit.selectedIds = [ids[0]];
    }

    ids.forEach((id, index) => {
      this.unit.selectedAbilities[index] = JSON.parse(JSON.stringify(this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, id)]));
      this.unit.selectedAbilities[index].activeRename = false;
    });

    this.updateMultiplePossibleAbilities();


    */
  }

  getAvailableAbilities(roundIndex: number, abilityPosition: number) {
    if (this.rounds[roundIndex].selectedAbilities.length === 0 || abilityPosition === 0) {
      return this.unit.abilities;
    } else {
      this.updateMultipleSkill(roundIndex);

      let abilities = this.rounds[roundIndex].availableAbilities;
      let ability = null;
      // console.log("######")
      // console.log(JSON.parse(JSON.stringify(this.rounds)))

      this.rounds[roundIndex].selectedAbilities.forEach(abilityId => {
        ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
        if (ability.canDualSkill === false) {
          abilities.splice(this.rounds[roundIndex].availableAbilities.findIndex(x => x === ability.id), 1);
        }
      });
      // console.log(JSON.parse(JSON.stringify(this.rounds)))

      return abilities;
    }
  }

  private updateMultipleSkill(roundIndex: number, autoAssign: boolean = true): any {
    this.rounds[roundIndex].availableAbilities = [];

    let castNumber = 1;
    let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, this.rounds[roundIndex].selectedAbilities[0])];

    if (ability.magicType) {
      if (this.unit.multipleBlack > 1) {
        this.multipleMagic("black", roundIndex);
        castNumber = this.unit.multipleBlack;
      }
      if (this.unit.multipleWhite > 1) {
        this.multipleMagic("white", roundIndex);
        castNumber = castNumber < this.unit.multipleWhite ? this.unit.multipleWhite : castNumber;
      }
    } else {
      castNumber = this.multipleAbility(roundIndex);
    }

    this.rounds[roundIndex].castNumber = [];
    for (let i = 0; i < castNumber; i++) {
      this.rounds[roundIndex].castNumber.push(i);
    }

    if (autoAssign) {
      this.assignMultipleSkill(roundIndex);
    }
  }

  private multipleMagic(magicType: string, roundIndex: number): any {
    this.unit.abilities.forEach(ability => {
      if (ability.magicType && ability.magicType === magicType) {
        this.rounds[roundIndex].availableAbilities.push(ability);
      }
    });
  }

  private multipleAbility(roundIndex: number) :number {
    let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, this.rounds[roundIndex].selectedAbilities[0])]
    let castNumber = 1;

    this.unit.multiCasts.forEach(multiCast => {
      if (castNumber <= multiCast.count) {
        if (multiCast.abilities.indexOf(ability.id) !== -1) {
          castNumber = multiCast.count;

          multiCast.abilities.forEach(abilityId => {
            let tempAbility = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
            if (tempAbility) {
              this.rounds[roundIndex].availableAbilities.push(tempAbility);
            }
          });
        }
      }
    });

    return castNumber;
  }

  private assignMultipleSkill(roundIndex: number) {
    let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, this.rounds[roundIndex].selectedAbilities[0])];

    for(let i = 1; i < this.rounds[roundIndex].castNumber.length; i++) {
      if (!this.rounds[roundIndex].selectedAbilities[i]) {
        this.rounds[roundIndex].selectedAbilities[i] = ability.id;
      }
    }
  }

  onChangeSkill(roundIndex: number, abilityPosition: any) {
    let positionInList = this.unitService.findPositionOfAbilityById(this.unit, this.rounds[roundIndex].selectedAbilities[abilityPosition]);
    if (positionInList !== null) {
      let ability = JSON.parse(JSON.stringify(this.unit.abilities[positionInList]));

      if (abilityPosition === 0) {
        this.rounds[roundIndex].selectedAbilities = [ability.id];
        this.updateMultipleSkill(roundIndex);
      } else {
        this.rounds[roundIndex].selectedAbilities[abilityPosition] = ability.id;
      }
    } else {
      for (let i = this.rounds[roundIndex].castNumber.length; i >= abilityPosition; i--) {
        this.rounds[roundIndex].selectedAbilities.splice(i, 1);
      }
    }

    this.onChangeChain(roundIndex);
  }

  onChangeChain(roundIndex: number): void {
    // console.log("chain change")

    this.calculateTotalDamage();
  }

  calculateTotalDamage() {
    console.log(this.damageService.calculateTotalDamage(this.unit, this.monster, this.rounds));
  }

  // private isFirstAbilityMultiple() :number {
  //   let ability = this.unit.selectedAbilities[0]
  //   if (this.unit.multiCasts[ability.id]) {
  //     return this.unit.multiCasts[ability.id]
  //   } else if (ability.magicType) {
  //     let possibleMultiple = 1;
  //     if (ability.magicType === "black" && this.unit.multipleBlack > 1) {
  //       possibleMultiple = this.unit.multipleBlack;
  //     } else if (ability.magicType === "white" && this.unit.multipleWhite > 1) {
  //       possibleMultiple = this.unit.multipleBlack;
  //     }
  //     return possibleMultiple;
  //   } else {
  //     return 1;
  //   }
  // }
}
