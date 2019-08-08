import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { ChainingModalComponent } from '../chaining-modal/chaining-modal.component';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ChainService } from '../services/chain.service';
// import { BackService } from '../services/back.service';
import { FindBestService } from '../services/find-best.service';
import { NavService } from '../services/nav.service';


@Component({
  selector: 'app-chaining',
  templateUrl: './chaining.component.html',
  styleUrls: ['./chaining.component.css']
})
export class ChainingComponent implements OnInit {
  private lastCreatedId: number = 10000;
  private positionIds: any = {};
  private positionIdsInChain: any = {};
  private units: Unit[];

  chain: any[] = [];
  idSelected: string[] = [];
  idCreated: string[] = [];
  selectedUnits: any[] = [];
  selectedAbilities: any[] = [];
  availableDuplicate: any[] = [];
  chainers: any[] = [];
  finishers: any[] = [];
  firstHits: any[] = [];

  averageChainMultiplier: number = 1;

  createdUnits: any[] = [];
  multiAbilities: any[] = [];
  abilityTypes: string[] = ['chain', 'finish'];

  viewOptions: number = -1;
  bestChainers: any[] = [];
  duplicatePosition: number[] = [];
  viewBestChainers: number = -1;
  // requestPosition: number = -1;
  // requestAlreadyDone: boolean = false;
  // requestResult: any[] = [];

  sliderConfig: any[] = [];

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
    // private backService: BackService,
    // private activatedRoute: ActivatedRoute
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.reloadList();
    });
  }

  ngOnInit(): void {
    for (let i = 0; i <= 5; i++) {
      this.chain[i] = {id: 'unselect', selectedIds: [], showChainMod: false};
      this.selectedUnits[i] = '';
      this.idSelected[i] = 'unselect';
      this.idCreated[i] = 'unselect';
      this.sliderConfig[i] = {
        start: 1,
        step: 1,
        range: {
          min: 0,
          max: 20
        },
        pips: {
          mode: 'count',
          values: 11,
          density: 6
        }
      };
      this.onChangeUnit(i, 'unselect');
    }

    this.getUnits();

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   if (params.request && params.type) {
    //     this.loadRequest(params);
    //   }
    // });
  }

  // private loadRequest(params: any) {
  //   let requests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];
  //   let request = requests.find(request => request.id === params.request);
  //   let framesGap = [];
  //   let i = 0;

  //   request.units.forEach((requestUnit, index) => {
  //     framesGap.push(0);
  //     if (requestUnit) {
  //       let unit = this.unitService.getUnit(requestUnit.id);
  //       framesGap[index] = request.chain[params.type].frames[i];
  //       this.selectUnit(index, unit, requestUnit.ability.id - 1, framesGap); // Adapt to multiple casts
  //       i++;
  //     }
  //   });

  //   this.onChangeChain();
  // }

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

        if (!ability.imperils) {
          ability.imperils = [];
          if (ability.debuff) {
            Object.keys(ability.debuff).forEach(imperilIndex => {
              ability.imperils.push({type: imperilIndex, value: ability.debuff[imperilIndex]});
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
    this.chain.forEach(unit => {
      if (unit.id !== 'unselect') {
        unit.activeRename = false;
        unit.showChainMod = false;
        unit.selectedAbilities.forEach(ability => {
          ability.activeRename = false;
        });
      }
    })
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

  private updateDuplicatePossibilities() {
    this.availableDuplicate = [];
    this.chainers = [];
    this.finishers = [];
    this.positionIdsInChain = {};

    this.chain.forEach(unit => {
      if (unit.id !== 'unselect') {
        if (this.availableDuplicate.findIndex(x => x.id === unit.id)) {
          this.availableDuplicate.push(unit);
        }

        if (unit.selectedAbilities[0] && unit.selectedAbilities[0].type === 'chain') {
          this.chainers.push(unit);
        } else {
          this.finishers.push(unit);
        }
      }
    });

    this.chain.forEach((unit, index) => {
      this.positionIdsInChain[unit.id] = index;
      if (this.availableDuplicate[0]) {
        this.duplicatePosition[index] = this.availableDuplicate[0].id;
      }
    });
  }

  private updateChangedUnit(position: number, abilitiesIds: any = [], framesGap: number = 0) {
    this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
    this.chainService.units[position] = this.chain[position];

    let ids = JSON.parse(JSON.stringify(abilitiesIds));

    this.chain[position].selectedAbilities = [];
    this.chain[position].selectedIds = ids;

    if (ids.length === 0) {
      ids.push(this.chain[position].abilities[0].id)
      this.chain[position].selectedIds = [ids[0]];
    }

    ids.forEach((id, index) => {
      this.chain[position].selectedAbilities[index] = JSON.parse(JSON.stringify(this.chain[position].abilities[this.findPositionOfAbilityById(this.chain[position], id)]));
      this.chain[position].selectedAbilities[index].activeRename = false;
    });

    this.chain[position].activeRename = false;
    this.chain[position].framesGap = (!this.chain[position].framesGap || framesGap !== 0 ? framesGap : this.chain[position].framesGap);

    this.updateMultiplePossibleAbilities(position);
  }

  private updateMultiplePossibleAbilities(position: number) {
    this.multiAbilities[position] = {};
    if (this.chain[position].multiCasts.length !== 0) {
      this.chain[position].multiCasts.forEach(multiCast => {
        this.multiAbilities[position][multiCast.count] = [];
        this.chain[position].abilities.forEach(ability => {
          if (ability.magicType !== "black" && ability.magicType !== "white") {
            this.multiAbilities[position][multiCast.count].push({
              id: ability.id,
              name: ability.name
            });
          }
        });
      });
    }
  }

  private calculateMaxFramesGap() {
    let hits = this.chainService.getHits();
    let maxHitForChain = this.chainService.findHighestChainHit();
    this.chain.forEach((unit, position) => {
      if (unit.id !== 'unselect') {
        let min = 0;
        let max = 20;
        let abilitiesType = "finish";

        unit.selectedAbilities.forEach(ability => {
          if (ability.type === "chain") {
            abilitiesType = "chain";
          }
        });

        unit.selectedAbilities.forEach(ability => {
          min = ability.range.min < min ? ability.range.min : min;

          if (abilitiesType === "chain") {
            max = ability.range.max > max ? ability.range.max : max;
          } else {
            let maxFinish = maxHitForChain > ability.range.max ? maxHitForChain : ability.range.max;
            max = maxFinish > max ? maxFinish : max;
          }
        });

        this.sliderConfig[position].range.min = min;
        this.sliderConfig[position].range.max = max;
      }
    });
  }

  private countNumberOfHighRangeChainer() :number {
    let count = 0;
    this.chain.forEach((unit, index) => {
      if (unit.id !== 'unselect') {
        if (unit.selectedAbilities[0].range.max - unit.selectedAbilities[0].range.min > 50)
          count++;
      }
    });

    return count;
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

  private isFirstAbilityMultiple(position: number) :number {
    let ability = this.chain[position].selectedAbilities[0]
    if (this.chain[position].multiCasts[ability.id]) {
      return this.chain[position].multiCasts[ability.id]
    } else if (ability.magicType) {
      let possibleMultiple = 1;
      if (ability.magicType === "black" && this.chain[position].multipleBlack > 1) {
        possibleMultiple = this.chain[position].multipleBlack;
      } else if (ability.magicType === "white" && this.chain[position].multipleWhite > 1) {
        possibleMultiple = this.chain[position].multipleBlack;
      }
      return possibleMultiple;
    } else {
      return 1;
    }
  }

  createNewUnit(position: number) {
    this.selectedUnits[position] = new Unit();
    this.selectedUnits[position].name = 'Unit ' + (this.createdUnits.length + 1);
    this.selectedUnits[position].activeRename = true;

    this.chain[position] = JSON.parse(JSON.stringify(this.selectedUnits[position]));
    this.chain[position].selectedIds = [this.chain[position].abilities[0].id]
    this.chain[position].selectedAbilities = [this.chain[position].abilities[0]];
    this.chain[position].castNumber = [0];

    this.saveUnit(position);
    this.idSelected[position] = this.selectedUnits[position].id;

    this.updateChangedUnit(position, [this.chain[position].abilities[0].id], 0);
    this.chain[position] = this.updateMultipleSkill(this.chain[position]);

    this.angulartics.eventTrack.next({ action: 'createNewUnit', properties: { category: 'chain' }});
  }

  saveUnit(position: number) {
    if (!this.chain[position].id || this.chain[position].id > 10000) {
      let positionCreated = this.positionIds[this.chain[position].id];
      if (positionCreated >= 0) {
        this.createdUnits[positionCreated] = this.chain[position];
      } else {
        this.lastCreatedId++;
        this.chain[position].id = this.lastCreatedId;
        this.createdUnits.push(this.chain[position]);
        this.reloadList();
      }

      this.selectedUnits[position] = this.chain[position];

      this.localSaveUnits();
    }

    // if (this.chain[position].id) {
    //   this.chain[position].abilities.forEach(ability => {
    //     if (ability.framesList.length !== ability.hitDamage.length) {
    //       let hitCount = ability.framesList.length;
    //       for (let i = 0; i < hitCount; i++) {
    //         ability.hitDamage[i] = 100 / hitCount;
    //       }
    //     }
    //   });
    // }

    this.onChangeChain();
  }

  removeUnit(position: number) {
    this.createdUnits.splice(this.positionIds[this.chain[position].id], 1);
    this.localSaveUnits();
    this.selectedUnits[position] = '';
    this.onChangeUnit(position, 'unselect');
    this.reloadList();
  }

  duplicateUnit(position: number) {
    let id = this.duplicatePosition[position];
    let unit;

    if (id < 10000) {
      unit = this.unitService.getUnit(this.duplicatePosition[position]);
    } else {
      unit = this.createdUnits.find(unit => unit.id === id);
    }

    if (unit.id) {
      this.selectedUnits[position] = unit;
      this.onChangeUnit(
        position,
        unit.id,
        this.chain[this.positionIdsInChain[this.duplicatePosition[position]]].selectedIds,
        this.chain[this.positionIdsInChain[this.duplicatePosition[position]]].framesGap
      );
    }
  }

  unselectUnit(position: number) {
    if (this.chain[position].id !== 'unselect') {
      this.selectedUnits[position] = '';
      this.onChangeUnit(position, 'unselect');
    }
    this.viewBestChainers = -1;
    this.bestChainers = [];
  }

  onChangeUnit(position: number, unitId: any = 'unselect', abilitiesIds: number[] = [], framesGap: number = 0, launchChain: boolean = true) {
    this.idSelected[position] = unitId;

    if (unitId === 'unselect') {
      this.chain[position] = {
        id: 'unselect',
        framesGap: 0,
        selectedIds: [],
        selectedAbilities: []
      };
      this.chainService.units[position] = null;
    } else if (this.chain[position].id !== unitId) {
      this.viewBestChainers = -1;
      if (unitId < 10000) {
        this.selectedUnits[position] = this.unitService.getUnit(parseInt(unitId));
      } else if (unitId >= 10000) {
        this.selectedUnits[position] = this.createdUnits.find(unit => unit.id === parseInt(unitId));
      }

      this.updateChangedUnit(position, abilitiesIds, framesGap);
      this.chain[position] = this.updateMultipleSkill(this.chain[position]);
    }

    this.updateDuplicatePossibilities();

    if (launchChain) {
      this.onChangeChain();
    }
  }

  onChangeSkill(unitPosition: number, abilityPosition: any) {
    let positionInList = this.findPositionOfAbilityById(this.chain[unitPosition], this.chain[unitPosition].selectedIds[abilityPosition]);
    if (positionInList !== null) {
      let ability = JSON.parse(JSON.stringify(this.chain[unitPosition].abilities[positionInList]));

      if (abilityPosition === 0) {
        this.chain[unitPosition].selectedAbilities = [ability];
        this.chain[unitPosition].selectedIds = [this.chain[unitPosition].selectedIds[0]];
        this.chain[unitPosition] = this.updateMultipleSkill(this.chain[unitPosition]);
      } else {
        this.chain[unitPosition].selectedAbilities[abilityPosition] = ability;
      }
    } else {
      for (let i = this.chain[unitPosition].castNumber.length; i >= abilityPosition; i--) {
        this.chain[unitPosition].selectedIds.splice(i, 1);
        this.chain[unitPosition].selectedAbilities.splice(i, 1);
      }
    }

    this.onChangeChain();
  }

  renameUnit(position: number) {
    this.chain[position].activeRename = !this.chain[position].activeRename;
  }

  showOptions(position: number) {
    this.viewOptions = position;
    this.navService.updateMenu(true);

    const modalRef = this.modalService.open(ChainingModalComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.unit = this.chain[position];

    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.viewOptions = -1;
      this.navService.updateMenu(false);
      this.chain[position] = receivedEntry;
      this.saveUnit(position);
    })

    this.angulartics.eventTrack.next({ action: 'showOptions', properties: { category: 'chain' }});
  }

  updateFramesGap(position: number, minusPlus: boolean) {
    minusPlus ? this.chain[position].framesGap++ : this.chain[position].framesGap--;

    if (this.chain[position].framesGap <= 0) {
      this.chain[position].framesGap = 0;
    } else if (this.chain[position].framesGap >= this.sliderConfig[position].range.max) {
      this.chain[position].framesGap = this.sliderConfig[position].range.max;
    }

    this.onChangeChain();
  }

  onChangeChain(): void {
    // this.requestPosition = -1;
    // this.requestAlreadyDone = false;
    // this.requestResult = [];
    if (this.availableDuplicate.length > 0) {
      this.chainService.getChain();
      this.firstHits = this.chainService.calculateFramesDiffForFirstHits();
      this.calculateMaxFramesGap();

      let totalMultiplier = 0;
      let unitMultiplier = [];
      let multiplierList = this.chainService.getMultiplierList();
      let totalHits = 0;

      multiplierList.forEach(multiplier => {
        if (!unitMultiplier[multiplier.unit]) {
          unitMultiplier[multiplier.unit] = {baseDamage: 0, totalDamage: 0, abilities: []};
        }
        if (!unitMultiplier[multiplier.unit].abilities[multiplier.ability]) {
          unitMultiplier[multiplier.unit].abilities[multiplier.ability] = 0;
        }

        let damageHit = this.chain[multiplier.unit].selectedAbilities[multiplier.ability].base * (multiplier.weight / 100) * multiplier.multi;
        unitMultiplier[multiplier.unit].totalDamage += damageHit;
        unitMultiplier[multiplier.unit].abilities[multiplier.ability] += damageHit;
        totalMultiplier += multiplier.multi;
        totalHits += 1;
      });

      unitMultiplier.forEach((unitMulti, indexUnit) => {
        unitMulti.abilities.forEach((abilityMulti, indexAbility) => {
          this.chain[indexUnit].selectedAbilities[indexAbility].averageChainMultiplier = 0;
          let dual = this.chain[indexUnit].dual && this.chain[indexUnit].selectedAbilities[indexAbility].dualable && this.chain[indexUnit].selectedAbilities.length === 1;
          this.chain[indexUnit].selectedAbilities[indexAbility].averageChainMultiplier = (abilityMulti / this.chain[indexUnit].selectedAbilities[indexAbility].base) / (dual ? 2 : 1);
          unitMulti.baseDamage += this.chain[indexUnit].selectedAbilities[indexAbility].base * (dual ? 2 : 1);
        });

        this.chain[indexUnit].averageChainMultiplier = unitMulti.totalDamage / unitMulti.baseDamage;
      });

      this.averageChainMultiplier = totalMultiplier / totalHits;
    }
  }

  findBestFrames(type: string) {
    let result;

    this.findBestService.units = this.chainService.units;
    result = this.findBestService.findBestFrames();

    this.chain.forEach((unit, index) => {
      unit.framesGap = result[type].frames[index];
    });
    this.onChangeChain();

    this.angulartics.eventTrack.next({ action: 'findBestFrames_' + type, properties: { category: 'chain' }});
  }

  findBestChainers(position: number) {
    let chainers = [];
    let allUnits = this.units.concat(this.createdUnits);

    this.viewBestChainers = position;
    this.bestChainers = [];
    this.findBestService.units = JSON.parse(JSON.stringify(this.chainService.units));

    allUnits.forEach(unit => {
      this.findBestService.units[position] = JSON.parse(JSON.stringify(unit));

      unit.abilities.forEach(ability => {
        if (ability.type === 'chain') {
          this.findBestService.units[position].selectedAbilities = [ability];
          this.findBestService.units[position].selectedIds = [ability.id];
          this.findBestService.units[position] = this.updateMultipleSkill(this.findBestService.units[position]);

          let result = this.findBestService.findBestFrames();
          chainers.push({
            unit: unit,
            abilities: this.findBestService.units[position].selectedAbilities,
            frames: result.modifier.frames,
            modifier: result.modifier.max
          });
        }
      });
    });

    chainers.sort((a: any, b: any) => {
      if (a.modifier > b.modifier) {
        return -1
      } else if (a.modifier < b.modifier) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < 5; i++) {
      if (chainers[i]) {
        this.bestChainers.push(chainers[i]);
      }
    }

    this.angulartics.eventTrack.next({ action: 'findBestChainers', properties: { category: 'chain' }});
  }

  findBestCombos(position: number) {
    let chainers = [];
    let allUnits = this.units.concat(this.createdUnits);

    this.viewBestChainers = position;
    this.bestChainers = [];
    this.findBestService.units = JSON.parse(JSON.stringify(this.chainService.units));

    allUnits.forEach(unit => {
      this.findBestService.units[position] = JSON.parse(JSON.stringify(unit));

      unit.abilities.forEach(ability => {
        if (ability.type === 'chain') {
          this.findBestService.units[position].selectedAbilities = [ability];
          this.findBestService.units[position].selectedIds = [ability.id];
          this.findBestService.units[position] = this.updateMultipleSkill(this.findBestService.units[position]);

          let result = this.findBestService.findBestFrames();
          chainers.push({
            unit: unit,
            abilities: this.findBestService.units[position].selectedAbilities,
            frames: result.combo.frames,
            combo: result.combo.max
          });
        }
      });
    });

    chainers.sort((a: any, b: any) => {
      if (a.combo > b.combo) {
        return -1
      } else if (a.combo < b.combo) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < 5; i++) {
      if (chainers[i]) {
        this.bestChainers.push(chainers[i]);
      }
    }

    this.angulartics.eventTrack.next({ action: 'findBestChainers', properties: { category: 'chain' }});
  }

  selectUnit(position: number, unit: any, abilities: any, framesGaps: any, launchChain: boolean = true) {
    this.chain.forEach((chainer, index) => {
      chainer.framesGap = framesGaps[index];
    })
    unit.framesGap = framesGaps[position]

    this.selectedUnits[position] = unit;
    let selectedIds = [];
    abilities.forEach(ability => {
      selectedIds.push(ability.id);
    })
    this.onChangeUnit(position, unit.id, selectedIds, framesGaps[position], launchChain);
  }

  canFindBestChainers(position: number) :boolean {
    let highRangeChainer = this.countNumberOfHighRangeChainer();
    if (
      this.chain[position].id !== 'unselect' ||
      this.availableDuplicate.length === 0 ||
      this.chainers.length > 2 ||
      highRangeChainer > 1 ||
      this.finishers.length > 1 ||
      (highRangeChainer === 1 && this.chainers.length > 1)
    ) {
      return false;
    }

    return true;
  }

  canFindBestChain() :boolean {
    let highRangeChainer = this.countNumberOfHighRangeChainer();
    if (
      highRangeChainer > 2 ||
      this.chainers.length > 4 ||
      this.finishers.length > 3 ||
      ((highRangeChainer === 1 || highRangeChainer === 2) && this.finishers.length > 2) ||
      (highRangeChainer === 2 && this.chainers.length > 3)
    ) {
      return false;
    }

    return true;
  }

  getAvailableAbilities(unitPosition: number, abilityPosition: number) {
    if (this.chain[unitPosition].selectedAbilities.length === 0 || abilityPosition === 0) {
      return this.chain[unitPosition].abilities;
    } else {
      return this.chain[unitPosition].possibleMultiple;
    }
  }

  showChainMod(unitPosition: number) {
    this.chain[unitPosition].showChainMod = !this.chain[unitPosition].showChainMod;
  }

  // showResult(type: string) {
  //   let i = 0;

  //   this.chain.forEach((unit, index) => {
  //     if (unit && unit.id !== 'unselect') {
  //       unit.framesGap = this.requestResult[type].frames[i];
  //       i++;
  //     }
  //   });
  //   this.onChangeChain();

  //   this.angulartics.eventTrack.next({ action: 'showResult_' + type, properties: { category: 'chain' }});
  // }

  // async saveRequest() {
  //   let request = await this.backService.saveRequest(this.chain, false);
  //   let savedRequests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];
  //   savedRequests.unshift(request);
  //   this.localStorageService.set('requests', savedRequests);

  //   if (request.status === 'done') {
  //     this.requestAlreadyDone = true;
  //     this.requestResult = request.chain;
  //   } else {
  //     this.requestPosition = request.number;
  //   }

  //   this.angulartics.eventTrack.next({ action: 'saveRequest', properties: { category: 'chain' }});
  // }
}
