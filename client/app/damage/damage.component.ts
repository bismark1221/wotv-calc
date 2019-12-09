import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { ChainingModalComponent } from '../chaining-modal/chaining-modal.component';

import { Unit } from '../entities/unit';
import { Monster } from '../entities/monster';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { MonsterService } from '../services/monster.service';
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
  private lastCreatedId: number = 100000000;
  private positionIds: any = {};
  private positionIdsInChain: any = {};
  private units: Unit[];
  private monsters: Monster[];

  availableRarities = [];
  rounds = [];
  result = {};
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
  observableMonsters: Array<Select2OptionData> = [];
  select2Options: Select2.Options = {
    theme: 'bootstrap'
  }

  labels = {
    units: 'Units',
    myunits: 'My Units'
  }

  constructor(
    private unitService: UnitService,
    private monsterService: MonsterService,
    private chainService: ChainService,
    private findBestService: FindBestService,
    private localStorageService: LocalStorageService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private ratingService: NgbRatingConfig,
    private navService: NavService,
    private weaponService: WeaponService,
    private elementsService: ElementsService,
    private raceService: RaceService,
    private damageService: DamageService
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.reloadUnitList();
      this.reloadMonsterList();
    });
  }

  ngOnInit(): void {
    this.unit = {id: 'unselect'};
    this.monster = new Monster();
    this.onChangeUnit('unselect');

    this.getUnits();
    this.getMonsters();
    this.getElements();
    this.weaponTypes = this.weaponService.getWeaponTypes();
    this.races = this.raceService.getRaces();
    this.onChangeMonster();
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
    let multiElements = this.elementsService.getGameOrderElements();

    multiElements.forEach(element => {
      this.translateService.get('elements.' + element).subscribe((res: string) => {
        this.elements.push({id: element, name: res});
      });
    });
  }

  private getUnits() {
    this.units = this.unitService.getUnits(true);
    this.createdUnits = this.localStorageService.get<any[]>('units') ? this.localStorageService.get<any[]>('units') : [];
    this.reloadUnitList();
  }

  private getMonsters() {
    this.monsters = this.monsterService.getMonsters();
    this.reloadMonsterList();
  }

  private sortUnits() {
    this.unitService.sort(this.units, this.translateService);
    this.unitService.sort(this.createdUnits, null);

    this.createdUnits.forEach((unit, index) => {
      this.lastCreatedId = unit.id >= this.lastCreatedId ? unit.id : this.lastCreatedId;
      this.positionIds[unit.id] = index;

      unit.selfCreated = true;

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

  private reloadMonsterList() {
    this.monsterService.sort(this.monsters, this.translateService);

    let typeTable = {
      'vengeful': 1,
      'indignant': 2,
      'fallen': 3,
      'arms': 4,
      'esper': 5,
      'madam': 6
    }

    this.observableMonsters = [
      {
        id: 'unselect',
        text: this.labels.units,
        children: []
      },
      {
        id: 'vengeful',
        text: 'vengeful',
        children: []
      },
      {
        id: 'indignant',
        text: 'indignant',
        children: []
      },
      {
        id: 'fallen',
        text: 'fallen',
        children: []
      },
      {
        id: 'arms',
        text: 'arms',
        children: []
      },
      {
        id: 'esper',
        text: 'esper',
        children: []
      },
      {
        id: 'madam',
        text: 'madam',
        children: []
      }
    ];

    this.monsters.forEach(monster => {

      if (monster.type === "wooden") {
        this.observableMonsters[0] = {
          id:  monster.id.toString(),
          text: monster.getName(this.translateService)
        }
      } else {
        this.observableMonsters[typeTable[monster.type]].children.push({
          id: monster.id.toString(),
          text: monster.getName(this.translateService)
        });
      }
    });

    delete this.observableMonsters[0].children;
  }


  private reloadUnitList() {
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

    this.ratingService.max = this.unit.rarity.max;

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
        framesGap: 0
      };
    } else if (this.unit.id !== unitId) {
      this.unit = this.unitService.getUnit(parseInt(unitId));
      if (this.unit === undefined) {
        this.unit = this.createdUnits.find(unit => unit.id === parseInt(unitId));
      }

      this.updateChangedUnit();
    }
  }

  onChangeMonster(monsterId: any = '0') {
    this.monster = JSON.parse(JSON.stringify(this.monsterService.getMonster(parseInt(monsterId))));
  }

  onChangePot(type: string) {
    if (this.unit.stats[type].potted === "none") {
      this.unit.stats[type].potValue = this.unit.dataStats[this.unit.rarity.value][type].pot;
      this.unit.stats[type].potted = "pot";
    } else if (this.unit.stats[type].potted === "pot") {
      this.unit.stats[type].potValue = this.unit.dataStats[this.unit.rarity.value][type].pot * 1.5;
      this.unit.stats[type].potted = "door"
    } else {
      this.unit.stats[type].potValue = 0;
      this.unit.stats[type].potted = "none"
    }
  }

  onChangeLevel() {
    this.unit.stats.atk.base = this.unit.dataStats[this.unit.rarity.value].atk.base;
    this.unit.stats.mag.base = this.unit.dataStats[this.unit.rarity.value].mag.base;
    this.unit.stats.atk.potValue = this.unit.dataStats[this.unit.rarity.value].atk.pot;
    this.unit.stats.mag.potValue = this.unit.dataStats[this.unit.rarity.value].mag.pot;
    this.unit.stats.atk.potted = "pot";
    this.unit.stats.mag.potted = "pot";
  }

  onChangeRarity(rarity = -1) {
    if (rarity !== -1) {
      if (rarity < this.unit.rarity.min) {
        this.unit.rarity.value = this.unit.rarity.min;
      } else {
        this.unit.rarity.value = rarity;
      }
    }

    this.unit.stats = {
      atk: {},
      mag: {}
    };

    this.unit.stats.atk.base = this.unit.dataStats[this.unit.rarity.value].atk.base;
    this.unit.stats.atk.potValue = this.unit.dataStats[this.unit.rarity.value].atk.pot * 1.5;
    this.unit.stats.atk.potted = "door";
    this.unit.stats.mag.base = this.unit.dataStats[this.unit.rarity.value].mag.base;
    this.unit.stats.mag.potValue = this.unit.dataStats[this.unit.rarity.value].mag.pot * 1.5;
    this.unit.stats.mag.potted = "door";

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

  isElementOnWeapon(element: string, index: number) {
    let find = false;
    this.unit.damageWeapons[index].elements.forEach(weaponElement => {
      if (weaponElement === element) {
        find = true;
      }
    })

    return find;
  }

  onMonsterRace(race: string) {
    let indexRace = this.monster.races.indexOf(race, 0);
    if (indexRace > -1) {
      this.monster.races.splice(indexRace, 1);
    } else {
      this.monster.races.push(race);
    }
  }

  isRaceOnMonster(race: string) {
    let find = false;
    this.monster.races.forEach(monsterRace => {
      if (monsterRace === race) {
        find = true;
      }
    })

    return find;
  }

  addRound(roundIndex = -1, land = false) {
    let round = {
      availableAbilities: [],
      selectedAbilities: [],
      castNumber: [0],
      land: land
    };

    if (roundIndex > -1 && roundIndex <= this.rounds.length - 1) {
      this.rounds.splice(roundIndex, 0, round);
    } else {
      this.rounds.push(round);
    }

    this.calculateTotalDamage();
  }

  getAvailableAbilities(roundIndex: number, abilityPosition: number) {
    if (this.rounds[roundIndex].land) {
      let lastJump = this.getLastJump(roundIndex);
      let landAbility = {
        id: 0,
        names: lastJump.names,
        name: null
      };

      let flyOrLand = "fly";
      if (!this.rounds[roundIndex + 1] || !this.rounds[roundIndex + 1].land) {
        flyOrLand = "land"
      }

      landAbility.name = flyOrLand + " - " + lastJump.name;
      Object.keys(landAbility.names).forEach(lang => {
        landAbility.names[lang] = flyOrLand + " - " + landAbility.names[lang];
      });

      return [landAbility];
    } else if (this.rounds[roundIndex].selectedAbilities.length === 0 || abilityPosition === 0) {
      return this.unit.abilities;
    } else {
      this.updateMultipleSkill(roundIndex);

      let abilities = this.rounds[roundIndex].availableAbilities;
      let ability = null;

      this.rounds[roundIndex].selectedAbilities.forEach(abilityId => {
        ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
        if (ability.canDualSkill === false) {
          abilities.splice(this.rounds[roundIndex].availableAbilities.findIndex(x => x === ability.id), 1);
        }
      });

      return abilities;
    }
  }

  private getLastJump(roundIndex: number) {
    let jump = null;
    let i = 1;

    while (jump == null && roundIndex - i >= 0) {
      this.rounds[roundIndex - i].selectedAbilities.forEach(abilityId => {
        let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
        if (ability && ability.jump) {
          jump = ability;
        }
      })
      i++;
    }

    return jump;
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
      if (!this.rounds[roundIndex].selectedAbilities[i] && ability.canDualSkill) {
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

    this.verifyJumpRound(roundIndex);
    this.onChangeChain(roundIndex);
  }

  private verifyJumpRound(roundIndex: number) {
    let jumpRounds = 0;
    let roundToRemove = [];

    this.rounds[roundIndex].selectedAbilities.forEach(abilityId => {
      let positionInList = this.unitService.findPositionOfAbilityById(this.unit, abilityId);
      if (this.unit.abilities[positionInList].jump) {
        jumpRounds = this.unit.abilities[positionInList].jump.round;
      }
    });

    if (jumpRounds === 0) {
      let i = 1;
      while (this.rounds[roundIndex + i] && this.rounds[roundIndex + i].land) {
        roundToRemove.push(roundIndex + i);
        i++;
      }

      for (let i = roundToRemove.length - 1; i >= 0; i--) {
        this.rounds.splice(roundToRemove[i], 1);
      }
    } else {
      for (let i = 1; i <= jumpRounds; i++){
        if (!this.rounds[roundIndex + i] || !this.rounds[roundIndex + i].land) {
          this.addRound(roundIndex + i, true);
          this.rounds[roundIndex + i].selectedAbilities = [0];
        }
      }
    }
  }

  onChangeChain(roundIndex: number): void {
    // console.log("chain change")

    this.calculateTotalDamage();
  }

  calculateTotalDamage() {
    console.log(this.unit)
    console.log(this.rounds)
    this.result = this.damageService.calculateTotalDamage(this.unit, this.monster, this.rounds);

    console.log("UNIT :")
    console.log(this.unit)
    console.log("MONSTER :")
    console.log(this.monster)
    console.log("ROUNDS :");
    console.log(this.rounds);
    console.log("RESULT :");
    console.log(this.result);
  }

  getPassiveKiller(race) {
    let killer = 0;

    this.unit.passiveKillers.forEach(unitKiller => {
      if (unitKiller.race === race) {
        killer = unitKiller.physic;
      }
    });

    return killer;
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
