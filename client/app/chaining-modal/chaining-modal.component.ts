import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { Angulartics2 } from 'angulartics2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Ability } from '../entities/ability';
import { ElementsService } from '../services/elements.service';


@Component({
  selector: 'app-chaining-modal',
  templateUrl: './chaining-modal.component.html',
  styleUrls: ['./chaining-modal.component.css']
})
export class ChainingModalComponent implements OnInit {
  @Input() public unit;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  selectedAbilities: any[] = [];
  errors: any[] = [];

  elements: string[];
  requiredElements: string[];
  multiElements: IMultiSelectOption[] = [];
  multiAbilities: any = {};
  abilityDamages: string[] = ['physic', 'magic', 'hybrid'];
  abilityTypes: string[] = ['chain', 'finish'];

  framesPattern: string = "^([0-9]+-?)*(?<!-)$";
  hitsPattern: string = "^([0-9]+([.|,][0-9]{1,99}){0,1}-)*([0-9]+([.|,][0-9]{1,99}){0,1})?(?<!-)$";

  multiElementsTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability element(s)'
  };

  multiAbilitiesTexts: IMultiSelectTexts = {
    defaultTitle: 'Select ability(ies)'
  };

  multiElementsSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 8,
    buttonClasses: 'btn btn-default btn-secondary multi-abilities-select',
  };

  multiAbilitiesSettings: IMultiSelectSettings = {
    checkedStyle: 'fontawesome',
    dynamicTitleMaxItems: 3,
    buttonClasses: 'btn btn-default btn-secondary multi-abilities-select',
  };

  constructor(
    private elementsService: ElementsService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private activeModal: NgbActiveModal
  ) {
    this.getTranslation();
  }

  ngOnInit(): void {
    this.getElements();
    this.unit.selectedAbilities.forEach((ability, index) => {
      ability.flatFrames = ability.framesList.join('-');
      ability.flatHitDamage = ability.hitDamage.join('-');
      this.errors[index] = {"frames" : null, "hits" : null};
    });
  }

  private getTranslation() {
    this.translateService.get('chain.label.multiElements').subscribe((res: string) => {
      this.multiElementsTexts = {
        defaultTitle: res
      };
    });
  }

  private getElements(): void {
    this.elements = this.elementsService.getElements();
    this.requiredElements = JSON.parse(JSON.stringify(this.elements));
    this.requiredElements.splice(0, 1);
    this.multiElements = [];

    this.requiredElements.forEach(element => {
      this.translateService.get('elements.' + element).subscribe((res: string) => {
        if (!this.isElementTranslated(element)) {
          this.multiElements.push({id: element, name: res});
        }
      });
    });
  }

  private isElementTranslated(element: string): boolean {
    let result = false;

    this.multiElements.forEach(data => {
      if (data.id === element) {
        result = true
      }
    });

    return result;
  }

  private findPositionOfAbility(searchAbility: any) {
    let i = 0;
    let position = 0;
    this.unit.abilities.forEach(ability => {
      if (ability.name === searchAbility.name) {
        position = i;
      }
      i++;
    });

    return position;
  }

  private findPositionOfAbilityById(id: any) {
    let i = 0;
    let position = null;

    this.unit.abilities.forEach(ability => {
      if (ability.id === id) {
        position = i;
      }
      i++;
    });

    return position;
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

  private updateMultipleSkill(autoAssign: boolean = true): any {
    if (this.unit.selectedAbilities && this.unit.selectedAbilities[0]) {
      this.unit.possibleMultiple = [{id: 0}];
      let castNumber = 1;
      let ability = this.unit.selectedAbilities[0];

      if (ability.magicType) {
        if (this.unit.multipleBlack > 1) {
          this.unit = this.multipleMagic("black", this.unit);
          castNumber = this.unit.multipleBlack;
        }
        if (this.unit.multipleWhite > 1) {
          this.unit = this.multipleMagic("white", this.unit);
          castNumber = castNumber < this.unit.multipleWhite ? this.unit.multipleWhite : castNumber;
        }
      } else {
        castNumber = this.multipleAbility(this.unit);
      }

      this.unit.castNumber = [];
      for (let i = 0; i < castNumber; i++) {
        this.unit.castNumber.push(i);
      }

      if (autoAssign) {
        this.unit = this.assignMultipleSkill(this.unit);
      }
    }

    return this.unit;
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
            unit.possibleMultiple.push(unit.abilities[this.findPositionOfAbilityById(abilityId)]);
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

  addImperil(abilityPosition: number) {
    this.getAbility(abilityPosition).imperils.push({type: 'dark', value: 1});
  }

  removeImperil(abilityPosition: number, imperil: number) {
    this.getAbility(abilityPosition).imperils.splice(imperil, 1);
  }

  onChangeDual() {
    this.unit.weapons[1] = '';
  }

  onChangeSkill(abilityPosition: any) {
    let positionInList = this.findPositionOfAbilityById(this.unit.selectedIds[abilityPosition]);
    if (positionInList !== null) {
      let ability = JSON.parse(JSON.stringify(this.unit.abilities[positionInList]));

      if (abilityPosition === 0) {
        this.unit.selectedAbilities = [ability];
        this.unit.selectedIds = [this.unit.selectedIds[0]];
        this.unit = this.updateMultipleSkill();
      } else {
        this.unit.selectedAbilities[abilityPosition] = ability;
      }
    } else {
      for (let i = this.unit.castNumber.length; i >= abilityPosition; i--) {
        this.unit.selectedIds.splice(i, 1);
        this.unit.selectedAbilities.splice(i, 1);
      }
    }

    this.errors = [];

    this.unit.selectedIds.forEach((id, index) => {
      this.unit.selectedAbilities[index].flatFrames = this.unit.selectedAbilities[index].framesList.join('-');
      this.unit.selectedAbilities[index].flatHitDamage = this.unit.selectedAbilities[index].hitDamage.join('-');
      this.errors[index] = {"frames" : null, "hits" : null};
    });
  }

  addAbility(abilityPosition: number) {
    this.unit.abilities.push(new Ability());
    let newAbilityPosition = this.unit.abilities.length - 1;
    let newId = this.unit.abilities.length + 1000000000
    this.unit.abilities[newAbilityPosition].id = newId;

    if (this.isFirstAbilityMultiple() > 1) {
      this.unit.multiCasts[newId] = this.isFirstAbilityMultiple();
    }

    this.unit.selectedAbilities[abilityPosition] = this.unit.abilities[newAbilityPosition];
    this.unit.selectedAbilities[abilityPosition].name = 'Ability ' + this.unit.abilities.length;
    this.unit.selectedAbilities[abilityPosition].activeRename = false;
    this.unit.selectedIds[abilityPosition] = newId;

    this.unit = this.updateMultipleSkill();
  }

  removeAbility(abilityPosition: number) {
    let abilityId = this.unit.selectedIds[abilityPosition];
    this.unit.abilities.splice(this.findPositionOfAbilityById(abilityId), 1);

    let indexToRemove = [];
    this.unit.selectedAbilities.forEach((ability, index) => {
      if (ability.id === abilityId) {
        if (index === 0) {
          this.unit.selectedAbilities[0] = this.unit.abilities[0];
          this.unit.selectedIds[0] = this.unit.abilities[0].id;
        } else {
          indexToRemove.unshift(index);
        }
      }
    });

    indexToRemove.forEach(index => {
      this.unit.selectedIds.splice(index, 1);
      this.unit.selectedAbilities.splice(index, 1);
    });

    this.unit = this.updateMultipleSkill();
  }

  renameAbility(abilityPosition: number) {
    this.unit.selectedAbilities[abilityPosition].activeRename = !this.unit.selectedAbilities[abilityPosition].activeRename;
  }

  getAbility(abilityPosition: number) {
    return this.unit.selectedAbilities[abilityPosition];
  }

  getAvailableAbilities(abilityPosition: number) {
    if (this.unit.selectedAbilities.length === 0 || abilityPosition === 0) {
      return this.unit.abilities;
    } else {
      return this.unit.possibleMultiple;
    }
  }

  validateRegex(abilityPosition: number) {
    let types: string[] = ['frames', 'hits'];

    types.forEach(type => {
      let regexp = new RegExp(this[type + 'Pattern']);
      this.errors[abilityPosition][type] = null;

      if (!regexp.test(type === 'frames' ? this.getAbility(abilityPosition).flatFrames : this.getAbility(abilityPosition).flatHitDamage)) {
        this.errors[abilityPosition][type] = 'regex';
      }
    });


    if (this.errors[abilityPosition].frames === null && this.errors[abilityPosition].hits === null) {
      let frames = this.getAbility(abilityPosition).flatFrames.split('-');
      let hits = this.getAbility(abilityPosition).flatHitDamage.split('-');

      if(this.validateFramesAndHits(abilityPosition, frames, hits)) {
        this.getAbility(abilityPosition).framesList = frames;
        this.getAbility(abilityPosition).hitDamage = hits;
      }
    }
  }

  private validateFramesAndHits(abilityPosition: number, frames, hits) {
    let valid = true;
    let totalHit = 0;
    this.errors[abilityPosition].frames = null;
    this.errors[abilityPosition].hits = null;

    hits.forEach(hit => {
      hit = hit.replace(/,/g, '.');
      if (isNaN(hit) || hit == 0) {
        valid = false;
      } else {
        totalHit += Number(hit);
      }
    });

    if (hits.length !== frames.length) {
      this.errors[abilityPosition].frames = 'diff_length';
      this.errors[abilityPosition].hits = 'diff_length';
      return false;
    }

    if (Math.round(totalHit) !== 100) {
      this.errors[abilityPosition].hits = 'not_hundred';
      return false;
    }

    return true;
  }

  adjustHitDamageFromFrames(abilityPosition: number) {
    this.getAbility(abilityPosition).hitDamage = [];
    let frames = this.getAbility(abilityPosition).flatFrames.split('-');
    let hitCount = frames.length;
    for (let i = 0; i < hitCount; i++) {
      this.getAbility(abilityPosition).hitDamage[i] = 100 / hitCount;
    }
    this.getAbility(abilityPosition).flatHitDamage = this.getAbility(abilityPosition).hitDamage.join('-');
    this.validateRegex(abilityPosition)
  }

  getActiveRename(abilityPosition: number) {
    if (this.getAbility(abilityPosition)) {
      return this.getAbility(abilityPosition).activeRename;
    } else {
      return false;
    }
  }

  updateMultiCast() {
    let min = 1;
    let unitMultiCast = null;

    this.unit.multiCasts.forEach(multiCast => {
      if (multiCast.count < min) {
        multiCast.count = min;
      }

      if (multiCast.count === this.unit.castNumber.length) {
        unitMultiCast = multiCast;
      }
    });

    if (unitMultiCast) {
      let indexToRemove = [];
      this.unit.selectedAbilities.forEach((ability, index) => {
        if (unitMultiCast.abilities.indexOf(ability.id) === -1) {
          if (index === 0) {
            this.unit.selectedAbilities[0] = this.unit.abilities[0];
            this.unit.selectedIds[0] = this.unit.abilities[0].id;
          } else {
            indexToRemove.unshift(index);
          }
        }
      });

      indexToRemove.forEach(index => {
        this.unit.selectedIds.splice(index, 1);
        this.unit.selectedAbilities.splice(index, 1);
      });
    }

    this.updateMagicMultiCast();
    this.updateMultiplePossibleAbilities();
  }

  updateMagicMultiCast() {
    this.updateMultipleSkill();
  }

  close() {
    this.activeModal.close();
  }
}
