import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UnitService } from '../services/unit.service';
import { ElementsService } from '../services/elements.service';
import { BackService } from '../services/back.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  ffbeChainUnits = [];
  isCollapsed = [];
  isCollapsedRaw = true;
  units = {};
  skills = {};
  lbs = {};
  summons = {};
  upgrades = {};
  debuffElement = [
    'fire',
    'ice',
    'lightning',
    'water',
    'wind',
    'earth',
    'light',
    'dark'
  ];

  constructor(
    private http: HttpClient,
    private unitService: UnitService,
    private elementsService: ElementsService,
    private backService: BackService
  ) {
  }

  ngOnInit(): void {
    this.getJsons();
  }

  private getUnits() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/units.json').toPromise();
  }

  private getSkills() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/skills.json').toPromise();
  }

  private getLBs() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/limitbursts.json').toPromise();
  }

  private getSummons() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/summons.json').toPromise();
  }

  private getUpgrades() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/enhancements.json').toPromise();
  }

  private getJsons() {
    Promise.all([
      this.getUnits(),
      this.getSkills(),
      this.getLBs(),
      this.getSummons(),
      this.getUpgrades(),
    ]).then(responses => {
      this.units = responses[0];
      this.skills = responses[1];
      this.lbs = responses[2];
      this.summons = responses[3];
      this.upgrades = responses[4];

      this.formatJsons();
    });
  }

  private formatJsons() {
    Object.keys(this.units).forEach(unitId => {
      let id = this.addUnit(this.units[unitId]);

      if (id && this.units[unitId].skills) {
        this.units[unitId].skills.forEach((ability, index) => {
          this.addSkill(id, this.skills[ability.id], ability.id);
        });
      }

      if (this.units[unitId].entries) {
        let entries = Object.keys(this.units[unitId].entries);
        if (this.lbs[entries[entries.length - 1]]){
          this.addSkill(id, this.lbs[entries[entries.length - 1]], entries[entries.length - 1]);
        }
      }
    });

    Object.keys(this.upgrades).forEach(upgradeId => {
      this.upgrades[upgradeId].units.forEach(unitId => {
        let unitIndex = this.getUnitIdFromDataId(unitId);
        if (unitIndex) {
          this.addSkill(unitIndex, this.skills[this.upgrades[upgradeId].skill_id_new], this.upgrades[upgradeId].skill_id_new);
        }
      });
    });

    Object.keys(this.summons).forEach(summonId => {
      this.addSummon(this.summons[summonId], summonId);
    });
  }

  private addUnit(unit) {
    if (unit.entries && unit.names) {
      let entries = Object.keys(unit.entries);
      let id = this.ffbeChainUnits.length;

      this.ffbeChainUnits[id] = {
        dataId: Number(entries[0]),
        names: {
          en: unit.names[0],
          tw: unit.names[1],
          kr: unit.names[2],
          fr: unit.names[3],
          de: unit.names[4],
          es: unit.names[5]
        },
        abilities: [],
        multiSkills: {},
        multipleBlack: 1,
        multipleWhite: 1,
        multipleGreen: 1
      };

      this.isCollapsed.push(true);

      return id;
    }
  }

  private addSkill(unitId, ability, dataId) {
    let exist = false;
    this.ffbeChainUnits[unitId].abilities.forEach(skill => {
      if (skill.dataId == dataId) {
        exist = true;
      }
    })

    if (exist) {
      return;
    }

    let id = this.ffbeChainUnits[unitId].abilities.length;

    this.ffbeChainUnits[unitId].abilities[id] = {
      dataId: Number(dataId),
      names: this.getNames(ability),
      hitDamage: ability.attack_damage[0],
      castTime: ability.effect_frames[0][0],
      damage: null,
      magicType: ability.magic_type ? ability.magic_type.toLowerCase() : null,
      elements: [],
      debuff: {},
      dualable: false
    };

    if (ability.element_inflict) {
      ability.element_inflict.forEach(element => {
        this.ffbeChainUnits[unitId].abilities[id].elements.push(element.toLowerCase());
      });
    }

    if (ability.type === "ABILITY" && ability.attack_type === "Physical") {
      this.ffbeChainUnits[unitId].abilities[id].dualable = true;
    }

    this.updateFrames(unitId, id, ability);
    this.updateOffset(unitId, id, ability);
    this.updateDamage(unitId, id, ability);
    this.updateDebuff(unitId, id, ability);
    this.unlockSkill(unitId, ability, dataId);
    this.isMultipleCastAbility(unitId, ability);

    if (ability.attack_frames[0].length === 1) {
      this.ffbeChainUnits[unitId].abilities[id].type = 'finish';
    }
  }

  private updateFrames(unitId, id, ability) {
    let framesList = '';
    let firstHit = -1;

    for (let i = 0; i < ability.attack_frames[0].length; i++) {
      if (i === 0) {
        firstHit = ability.attack_frames[0][i];
        framesList += '0';
      } else {
        framesList += ability.attack_frames[0][i] - ability.attack_frames[0][i - 1];
      }

      if (i !== ability.attack_frames[0].length - 1) {
        framesList += '-';
      }
    }

    this.ffbeChainUnits[unitId].abilities[id].firstHit = firstHit;
    this.ffbeChainUnits[unitId].abilities[id].framesList = framesList;
  }

  private updateOffset(unitId, id, ability) {
    if (this.ffbeChainUnits[unitId].abilities[id].castTime === 0) {
      this.ffbeChainUnits[unitId].abilities[id].offset = 8;
    } else {
      this.ffbeChainUnits[unitId].abilities[id].offset = 16;
    }
  }

  private updateDamage(unitId, id, ability) {
    // physic damage : [1, 1, 1, [0,  0,  0,  0,  0,  0,  100]]
    // & ignore : [1, 1, 21, [0,  0,  500,  -50]]
    let effect = this.findEffect(ability, 1, 1, 1);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[6];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, 2, 1, 1);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[6];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, 1, 1, 21);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, 2, 1, 21);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    // "effects": ["3 physical attacks (1.6x each, 4.8x total, ATK) to all enemies"],
    // "effects_raw": [[2, 1, 42, [0,  0,  3,  3,  160]]]
    effect = this.findEffect(ability, 2, 1, 42);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[3] * effect[4];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    // "effects": ["Critical physical damage (4.95x, ATK) to all enemies"],
    // "effects_raw": [[2, 1, 43, [0,  0,  495,  0]]]},
    effect = this.findEffect(ability, 2, 1, 43);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2] * 1.5;
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }
    // [1, 1, 43, [0,  0,  700,  0]]
    effect = this.findEffect(ability, 1, 1, 43);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2] * 1.5;
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }



    // magic damage : [1, 1, 15, [0,  0,  0,  0,  0,  180,  0]
    // & ignore : [2, 1, 70, [0,  0,  180,  50]]
    effect = this.findEffect(ability, 1, 1, 15);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    effect = this.findEffect(ability, 2, 1, 15);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    effect = this.findEffect(ability, 2, 1, 70);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    // magic with upgrade : [2, 1, 72, [0,  0,  150,  100,  100,  5]]
    effect = this.findEffect(ability, 2, 1, 72);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2] + effect[4] * effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    // magic damage with SPR scalling : [2, 1, 103, [100,  99999,  250]]
    effect = this.findEffect(ability, 2, 1, 103);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    // magic damage with EVO damage : [2, 1, 124, [0, 0, 0, 0, 0, 0, 0, 900, 900, [50,  50]]
    effect = this.findEffect(ability, 2, 1, 124);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[7];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    effect = this.findEffect(ability, 1, 1, 124);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[7];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }



    // hybrid damage : [1, 1, 40, [0,  0,  0,  0,  0,  0,  0,  0,  180,  180]]
    effect = this.findEffect(ability, 1, 1, 40);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[8];
      this.ffbeChainUnits[unitId].abilities[id].damage = "hybrid";
      return;
    }

    effect = this.findEffect(ability, 2, 1, 40);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[8];
      this.ffbeChainUnits[unitId].abilities[id].damage = "hybrid";
      return;
    }
  }

  private updateDebuff(unitId, id, ability) {
    // [2, 1, 33, [-50,  0,  0,  0,  0,  0,  0,  0,  1,  5]]
    // [1, 1, 33, [0,  0,  -60,  0,  0,  0,  0,  0,  1,  5]]
    // fire, ice, lightning, water, wind, earth, light, dark, nbEnemy, nbTurn
    let effect = this.findEffect(ability, 2, 1, 33);
    if (!effect) {
      effect = this.findEffect(ability, 1, 1, 33);
    }

    if (effect) {
      for (let i = 0; i <= 7; i++) {
        if (effect[i] !== 0) {
          this.ffbeChainUnits[unitId].abilities[id].debuff[this.debuffElement[i]] = Math.abs(effect[i]);
        }
      }
    }
  }

  private isMultipleCastAbility(unitId, ability) {
    // ==> full dualcast ==> "effects_raw": [0, 3, 45, ["none"]]
    let effect = this.findEffect(ability, 0, 3, 45);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleBlack = 2;
      this.ffbeChainUnits[unitId].multipleWhite = 2;
      this.ffbeChainUnits[unitId].multipleGreen = 2;
    }

    // ==> dual black ==> [0, 3, 44, ["none"]]
    effect = this.findEffect(ability, 0, 3, 44);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleBlack = 2;
    }

    // ==> white magic ==> [0, 3, 52, [2,  2,  XXX]]  &&  [0, 3, 52, [2,  3,  XXX]]  &&  [0, 3, 97, ...]
    effect = this.findEffect(ability, 0, 3, 52);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleWhite = effect[1];
    }

    effect = this.findEffect(ability, 0, 3, 97);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleWhite = 2;
    }

    // ==> "effects_raw": [0, 3, 1006, [2, [ListSkillIds, ..., ..., ...]]]
    effect = this.findEffect(ability, 0, 3, 1006);
    if (effect) {
      effect[1].forEach(skillId => {
        this.ffbeChainUnits[unitId].multiSkills[skillId] = effect[0];
      });
    }

    // ???? "effects_raw": [[0, 3, 98, [2, 504560, -1, [910652,  910654], 4, 1, 1]]], ???? && mp_cost === 0
    // gagne l'accès à un spell qui donne 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    // Son vrai 5 cast :                           [0, 3, 98, [5,  704290,  1,  704140,  9999,  1,  0]]
    effect = this.findEffect(ability, 0, 3, 98);

    if (effect && ability.mp_cost === 0) {
      // check if 1 is array
      if (Array.isArray(effect[3])) {
        effect[3].forEach(skillId => {
          this.ffbeChainUnits[unitId].multiSkills[skillId] = effect[0];
        })
      } else {
        this.ffbeChainUnits[unitId].multiSkills[effect[3]] = effect[0];
      }
    }
  }

  private unlockSkill(unitId, ability, dataId) {
    // gagne l'accès à un spell qui donne 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    let effect = this.findEffect(ability, 0, 3, 98);
    if (effect) {
      if (Array.isArray(effect[3])) {
        effect[3].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId);
        })
      } else if (this.skills[effect[3]]) {
        this.addSkill(unitId, this.skills[effect[3]], effect[3]);
      }

      if (ability.mp_cost !== 0) {
        this.addSkill(unitId, this.skills[effect[1]], effect[1]);
      }
    }

    // [1, 1, 99, [[2,  2], [503890,  503910], 2, 503900, 2, 503890]]
    effect = this.findEffect(ability, 1, 1, 99);
    if (effect) {
      for (let i = 2; i < effect.length; i++) {
        if (effect[i] !== 2) {
          this.addSkill(unitId, this.skills[effect[i]], effect[i]);
        }
      }
    }

    // [2, 1, 99, [[2,  2,  2], [208240,  704460,  704470], 2, 500590, 2, 500580]]]
    effect = this.findEffect(ability, 2, 1, 99);
    if (effect) {
      for (let i = 2; i < effect.length; i++) {
        if (effect[i] !== 2) {
          this.addSkill(unitId, this.skills[effect[i]], effect[i]);
        }
      }
    }

    // [1, 3, 100, [[2,  2,  2], [502050,  502060,  502070], 99999, 4, 1]]
    effect = this.findEffect(ability, 1, 3, 100);
    if (effect) {
      if (Array.isArray(effect[1])) {
        effect[1].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId);
        });
      } else {
        this.addSkill(unitId, this.skills[effect[1]], effect[1]);
      }
    }

    // [0, 3, 100, [[2,  2,  2], [910944,  910945,  910946], 99999, 2, 1]]
    effect = this.findEffect(ability, 0, 3, 100);
    if (effect) {
      if (Array.isArray(effect[1])) {
        effect[1].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId);
        });
      } else {
        this.addSkill(unitId, this.skills[effect[1]], effect[1]);
      }
    }

    // [0, 3, 50, [30,  3,  910947,  1]]
    effect = this.findEffect(ability, 0, 3, 50);
    if (effect) {
      this.addSkill(unitId, this.skills[effect[2]], effect[2]);
    }

    // Random use skill : [2, 1, 29, [[504100,  30], [504110,  30], [504120,  40], [0,  0], [0,  0]]]
    effect = this.findEffect(ability, 2, 1, 29);
    if (effect) {
      for (let i = 0; i < effect.length; i++) {
        if (Array.isArray(effect[i]) && effect[i][0] !== 0) {
          this.addSkill(unitId, this.skills[effect[i][0]], effect[i][0]);
        }
      }
    }

    // Random use skill : [1, 1, 29, [[504130,  25], [504140,  25], [504150,  25], [504160,  25], [0,  0]]]
    effect = this.findEffect(ability, 1, 1, 29);
    if (effect) {
      for (let i = 0; i < effect.length; i++) {
        if (Array.isArray(effect[i]) && effect[i][0] !== 0) {
          this.addSkill(unitId, this.skills[effect[i][0]], effect[i][0]);
        }
      }
    }
  }

  private getDamageType(ability) {
    let type = 'physical';

    if (ability.attack_type) {
      type = ability.attack_type.toLowerCase();
    } else if (ability.damage_type) {
      type = ability.damage_type.toLowerCase();
    }

    return type;
  }

  private getNames(ability) {
    let names = {};

    if (Array.isArray(ability.strings.name)) {
      names = {
        en: ability.strings.name[0],
        tw: ability.strings.name[1],
        kr: ability.strings.name[2],
        fr: ability.strings.name[3],
        de: ability.strings.name[4],
        es: ability.strings.name[5]
      };
    }

    return names;
  }

  private addSummon(summon, summonId) {
    let id = this.ffbeChainUnits.length;

    this.ffbeChainUnits[id] = {
      dataId: Number(summonId),
      names: {
        en: summon.names[0],
        tw: summon.names[1],
        kr: summon.names[2],
        fr: summon.names[3],
        de: summon.names[4],
        es: summon.names[5]
      },
      abilities: [],
      multiSkills: {},
      multipleBlack: 1,
      multipleWhite: 1,
      multipleGreen: 1
    };

    Object.keys(summon.skill).forEach(skillId => {
      this.addSummonSkill(id, summon.skill[skillId], skillId);
    });

    this.isCollapsed.push(true);
  }

  private addSummonSkill(summonId, ability, dataId) {
    let id = this.ffbeChainUnits[summonId].abilities.length;
    let base = 0;
    let names = {};

    if (Array.isArray(ability.strings.name)) {
      names = {
        en: ability.strings.name[0] + ' (' + (id + 1) + ')',
        tw: ability.strings.name[1] + ' (' + (id + 1) + ')',
        kr: ability.strings.name[2] + ' (' + (id + 1) + ')',
        fr: ability.strings.name[3] + ' (' + (id + 1) + ')',
        de: ability.strings.name[4] + ' (' + (id + 1) + ')',
        es: ability.strings.name[5] + ' (' + (id + 1) + ')'
      };
    }

    this.ffbeChainUnits[summonId].abilities[id] = {
      dataId: Number(dataId),
      names: names,
      hitDamage: ability.attack_damage[0],
      castTime: ability.effect_frames[0][0],
      elements: [],
      debuff: {},
      dualable: false,
      ignore: 0,
      type: 'finish',
      damage: 'physic'
    };

    let effect = this.findEffect(ability, 2, 1, 80);
    if (effect) {
      base = effect[6];
      this.ffbeChainUnits[summonId].abilities[id].damage = 'magic';
    }

    effect = this.findEffect(ability, 2, 1, 79);
    if (effect) {
      base = effect[7];
    }

    effect = this.findEffect(ability, 2, 1, 94);
    if (effect) {
      base = effect[0];
    }

    this.ffbeChainUnits[summonId].abilities[id].base = base;

    this.updateFrames(summonId, id, ability);
    this.updateOffset(summonId, id, ability);
  }

  private getUnitIdFromDataId(dataId) {
    let find = null;

    this.ffbeChainUnits.forEach((unit, index) => {
      if (Number(unit.dataId) === Number(dataId)) {
        find = index;
        return;
      }
    })

    return find;
  }

  private findEffect(ability, one, two, three) {
    let find = null;
    let effects = [];

    if (ability.effects_raw) {
      effects = ability.effects_raw;
    } else if (ability.max_level) {
      effects = ability.max_level.effects_raw;
    }

    effects.forEach(effect => {
      if (effect[0] == one && effect[1] == two && effect[2] == three) {
        find = effect[3];
        return;
      }
    });

    return find;
  }
}
