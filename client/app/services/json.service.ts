import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JsonService {
  ffbeChainUnits = [];
  isCollapsed = [];
  isCollapsedRaw = true;
  units = {};
  skills = {};
  lbs = {};
  summons = {};
  upgrades = {};
  materias = {};
  equipments = {};
  minimumHit = 1;
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

  constructor(private http: HttpClient) {}

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

  private getEquipments() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/equipment.json').toPromise();
  }

  private getMaterias() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/materia.json').toPromise();
  }

  getJsons(): Promise<any[]> {
    return Promise.all([
      this.getUnits(),
      this.getSkills(),
      this.getLBs(),
      this.getSummons(),
      this.getUpgrades(),
      this.getEquipments(),
      this.getMaterias()
    ]).then(responses => {
      this.units = responses[0];
      this.skills = responses[1];
      this.lbs = responses[2];
      this.summons = responses[3];
      this.upgrades = responses[4];
      this.equipments = responses[5];
      this.materias = responses[6];

      this.formatJsons();

      return this.ffbeChainUnits;
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
          this.addSkill(id, this.lbs[entries[entries.length - 1]], entries[entries.length - 1], 0, true);
        }
      }
    });

    Object.keys(this.upgrades).forEach(upgradeId => {
      this.upgrades[upgradeId].units.forEach(unitId => {
        let unitIndex = this.getUnitIdFromDataId(unitId);
        if (unitIndex) {
          this.addSkill(unitIndex, this.skills[this.upgrades[upgradeId].skill_id_new], this.upgrades[upgradeId].skill_id_new, this.getUpgradeLevel(unitId, upgradeId));
        }
      });
    });

    Object.keys(this.summons).forEach(summonId => {
      this.addSummon(this.summons[summonId], summonId);
    });

    Object.keys(this.equipments).forEach(equipmentId => {
      if (this.equipments[equipmentId].skills) {
        this.addEquipment(equipmentId);
      }
    });

    Object.keys(this.materias).forEach(materiaId => {
      if (this.materias[materiaId].skills) {
        this.addMateria(materiaId);
      }
    });

    this.filterRealUsableSkills();
  }

  private getUpgradeLevel(unitId, upgrade) {
    let skill_id_old = this.upgrades[upgrade].skill_id_old;
    let level = 1;

    Object.keys(this.upgrades).forEach(upgradeId => {
      if (this.upgrades[upgradeId].skill_id_new == skill_id_old && this.upgrades[upgradeId].units.indexOf(unitId) !== -1) {
        level = 2;
      }
    });

    return level;
  }

  private addUnit(unit) {
    if (unit.entries && unit.names) {
      let entries = Object.keys(unit.entries);
      let id = this.ffbeChainUnits.length;

      this.ffbeChainUnits[id] = {
        dataId: Number(entries[0]),
        names: {
          en: unit.names[0]
        },
        abilities: []
      };

      ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
        if (unit.names[index + 1] !== this.ffbeChainUnits[id].names.en) {
          this.ffbeChainUnits[id].names[lang] = unit.names[index + 1];
        }
      });

      this.isCollapsed.push(true);

      return id;
    }
  }

  private addSkill(unitId, ability, dataId, level = 0, lb = false) {
    let exist = false;
    this.ffbeChainUnits[unitId].abilities.forEach(skill => {
      if (skill.dataId == dataId) {
        exist = true;
      }
    })

    if (exist || !ability) {
      return;
    }

    let id = this.ffbeChainUnits[unitId].abilities.length;

    this.ffbeChainUnits[unitId].abilities[id] = {
      dataId: Number(dataId),
      names: this.getNames(ability, level),
      damage: null
    };

    if (ability.attack_damage[0].length > 1) {
      this.ffbeChainUnits[unitId].abilities[id].hitDamage = ability.attack_damage[0];
    }

    if (!lb) {
      this.ffbeChainUnits[unitId].abilities[id].castTime = ability.effect_frames[0][0];
    }

    if (ability.magic_type) {
      this.ffbeChainUnits[unitId].abilities[id].magicType = ability.magic_type.toLowerCase();
    }

    if (ability.element_inflict) {
      ability.element_inflict.forEach(element => {
        if (!this.ffbeChainUnits[unitId].abilities[id].elements) {
          this.ffbeChainUnits[unitId].abilities[id].elements = [];
        }
        this.ffbeChainUnits[unitId].abilities[id].elements.push(element.toLowerCase());
      });
    }

    if (!(ability.type === "ABILITY" && (ability.attack_type === "Physical" || ability.attack_type === "Hybrid"))) {
      this.ffbeChainUnits[unitId].abilities[id].dualable = false;
    }

    this.updateFrames(unitId, id, ability);
    this.updateOffset(unitId, id, ability);
    this.updateDamage(unitId, id, ability);
    this.updateDebuffs(unitId, id, ability);
    this.unlockSkill(unitId, ability, dataId, level);
    this.isMultipleCastAbility(unitId, ability);
  }

  private updateFrames(unitId, id, ability) {
    let framesList = [];

    let frames = ability.attack_frames[0].sort((n1, n2) => n1 - n2);

    for (let i = 0; i < frames.length; i++) {
      if (i === 0) {
        framesList.push(frames[i]);
      } else {
        framesList.push(Math.abs(frames[i] - frames[i - 1]));
      }
    }

    this.ffbeChainUnits[unitId].abilities[id].framesList = framesList;
  }

  private updateOffset(unitId, id, ability) {
    if (this.ffbeChainUnits[unitId].abilities[id].castTime) {
      if (this.ffbeChainUnits[unitId].abilities[id].castTime === 0) {
        this.ffbeChainUnits[unitId].abilities[id].offset = 8;
      } else {
        this.ffbeChainUnits[unitId].abilities[id].offset = 16;
      }
    } else {
      this.ffbeChainUnits[unitId].abilities[id].offset = 8;
    }
  }

  private updateDamage(unitId, id, ability) {
    // physic damage : [1, 1, 1, [0,  0,  0,  0,  0,  0,  100]]
    // & ignore : [1, 1, 21, [0,  0,  500,  -50]]
    let effect = this.findEffect(ability, [[1, 1, 1], [2, 1, 1], [1, 1, 81], [2, 1, 81], [2, 4, 1]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[6];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, [[1, 1, 41], [1, 1, 112], [2, 1, 112]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[0];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, [[1, 1, 25], [2, 1, 25]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[1];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, [[1, 1, 21], [2, 1, 21]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    // "effects": ["3 physical attacks (1.6x each, 4.8x total, ATK) to all enemies"],
    // "effects_raw": [[2, 1, 42, [0,  0,  3,  3,  160]]]
    effect = this.findEffect(ability, [[2, 1, 42]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[3] * effect[4];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    effect = this.findEffect(ability, [[1, 1, 126]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[4] + effect[5] * effect[6];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    // "effects": ["Critical physical damage (4.95x, ATK) to all enemies"],
    // "effects_raw": [[2, 1, 43, [0,  0,  495,  0]]]},
    effect = this.findEffect(ability, [[1, 1, 43], [2, 1, 43]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2] * 1.5;
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }

    // 1, 1, 102, [100,  99999,  400]
    effect = this.findEffect(ability, [[1, 1, 102], [2, 1, 102]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return;
    }


    // magic damage : [1, 1, 15, [0,  0,  0,  0,  0,  180,  0]
    // & ignore : [2, 1, 70, [0,  0,  180,  50]]
    effect = this.findEffect(ability, [[1, 1, 15], [2, 1, 15]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    effect = this.findEffect(ability, [[1, 1, 70], [2, 1, 70]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    // magic with upgrade : [2, 1, 72, [0,  0,  150,  100,  100,  5]]
    effect = this.findEffect(ability, [[1, 1, 72], [2, 1, 72]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2] + effect[4] * effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    // magic damage with SPR scalling : [2, 1, 103, [100,  99999,  250]]
    effect = this.findEffect(ability, [[1, 1, 103], [2, 1, 103]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[2];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }

    // magic damage with EVO damage : [2, 1, 124, [0, 0, 0, 0, 0, 0, 0, 900, 900, [50,  50]]
    effect = this.findEffect(ability, [[1, 1, 124], [2, 1, 124]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[7];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return;
    }



    // hybrid damage : [1, 1, 40, [0,  0,  0,  0,  0,  0,  0,  0,  180,  180]]
    effect = this.findEffect(ability, [[1, 1, 40], [2, 1, 40]]);
    if (effect) {
      this.ffbeChainUnits[unitId].abilities[id].base = effect[8];
      this.ffbeChainUnits[unitId].abilities[id].damage = "hybrid";
      return;
    }
  }

  private updateDebuffs(unitId, id, ability) {
    // [2, 1, 33, [-50,  0,  0,  0,  0,  0,  0,  0,  1,  5]]
    // [1, 1, 33, [0,  0,  -60,  0,  0,  0,  0,  0,  1,  5]]
    // fire, ice, lightning, water, wind, earth, light, dark, nbEnemy, nbTurn
    let effect = this.findEffect(ability, [[1, 1, 33], [2, 1, 33]]);

    if (effect) {
      for (let i = 0; i <= 7; i++) {
        if (effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].debuffs) {
            this.ffbeChainUnits[unitId].abilities[id].debuffs = [];
          }
          this.ffbeChainUnits[unitId].abilities[id].debuffs.push({
            type: this.debuffElement[i],
            value: Math.abs(effect[i])
          });
        }
      }
    }
  }

  private isMultipleCastAbility(unitId, ability) {
    // ==> full dualcast ==> "effects_raw": [0, 3, 45, ["none"]]
    let effect = this.findEffect(ability, [[0, 3, 45]]);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || 2 >= this.ffbeChainUnits[unitId].multipleBlack ? 2 : this.ffbeChainUnits[unitId].multipleBlack;
      this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || 2 >= this.ffbeChainUnits[unitId].multipleWhite ? 2 : this.ffbeChainUnits[unitId].multipleWhite;
      this.ffbeChainUnits[unitId].multipleGreen = !this.ffbeChainUnits[unitId].multipleGreen || 2 >= this.ffbeChainUnits[unitId].multipleGreen ? 2 : this.ffbeChainUnits[unitId].multipleGreen;
    }

    // ==> dual black ==> [0, 3, 44, ["none"]]
    effect = this.findEffect(ability, [[0, 3, 44]]);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || 2 >= this.ffbeChainUnits[unitId].multipleBlack ? 2 : this.ffbeChainUnits[unitId].multipleBlack;
    }

    // ==> white magic ==> [0, 3, 52, [2,  2,  XXX]]  &&  [0, 3, 52, [2,  3,  XXX]]  &&  [0, 3, 97, ...]
    effect = this.findEffect(ability, [[0, 3, 52]]);
    if (effect) {
      this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || effect[1] >= this.ffbeChainUnits[unitId].multipleWhite ? effect[1] : this.ffbeChainUnits[unitId].multipleWhite;
      this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || effect[1] >= this.ffbeChainUnits[unitId].multipleBlack ? effect[1] : this.ffbeChainUnits[unitId].multipleBlack;
      this.ffbeChainUnits[unitId].multipleGreen = !this.ffbeChainUnits[unitId].multipleGreen || effect[1] >= this.ffbeChainUnits[unitId].multipleGreen ? effect[1] : this.ffbeChainUnits[unitId].multipleGreen;
    }

    effect = this.findEffect(ability, [[0, 3, 97]]);
    if (effect) {
      if (effect[0] === 2) {
        this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || 2 >= this.ffbeChainUnits[unitId].multipleWhite ? 2 : this.ffbeChainUnits[unitId].multipleWhite;
      } else if (effect[0] === 0) {
        this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || 3 >= this.ffbeChainUnits[unitId].multipleBlack ? 3 : this.ffbeChainUnits[unitId].multipleBlack;
        this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || 3 >= this.ffbeChainUnits[unitId].multipleWhite ? 3 : this.ffbeChainUnits[unitId].multipleWhite;
        this.ffbeChainUnits[unitId].multipleGreen = !this.ffbeChainUnits[unitId].multipleGreen || 3 >= this.ffbeChainUnits[unitId].multipleGreen ? 3 : this.ffbeChainUnits[unitId].multipleGreen;
      } else {
        console.log("effect not known ==> ");
        console.log(ability);
      }
    }

    // ==> "effects_raw": [0, 3, 1006, [2, [ListSkillIds, ..., ..., ...]]]
    effect = this.findEffect(ability, [[0, 3, 1006]]);
    if (effect) {
      effect[1].forEach(skillId => {
        let multiCastPosition = this.findMultiCastByCount(unitId, effect[0]);
        this.saveMultiCast(unitId, multiCastPosition, skillId);
      });
    }

    // ???? "effects_raw": [[0, 3, 98, [2, 504560, -1, [910652,  910654], 4, 1, 1]]], ???? && mp_cost === 0
    // gagne l'accès à un spell qui donne 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    // Son vrai 5 cast :                           [0, 3, 98, [5,  704290,  1,  704140,  9999,  1,  0]]
    effect = this.findEffect(ability, [[0, 3, 98], [0, 3, 53]]);
    if (effect ) {                   // && ability.mp_cost === 0
      let multiCastPosition = this.findMultiCastByCount(unitId, effect[0]);

      if (Array.isArray(effect[3])) {
        effect[3].forEach(skillId => {
          this.saveMultiCast(unitId, multiCastPosition, skillId);
        });
      } else {
        this.saveMultiCast(unitId, multiCastPosition, effect[3]);
      }
    }
  }

  private saveMultiCast(unitId, multiCastPosition, abilityId) {
    let exist = false;

    this.ffbeChainUnits[unitId].multiCasts[multiCastPosition].abilities.forEach(ability => {
      if (ability == abilityId) {
        exist = true;
      }
    });

    if (!exist) {
      this.ffbeChainUnits[unitId].multiCasts[multiCastPosition].abilities.push(abilityId);
    }
  }

  private findMultiCastByCount(unitId, count) {
    let position = -1;

    if (this.ffbeChainUnits[unitId].multiCasts) {
      this.ffbeChainUnits[unitId].multiCasts.forEach((multiCast, index) => {
        if (multiCast.count === count) {
          position = index;
          return position;
        }
      });
    }

    if (position === -1) {
      if (!this.ffbeChainUnits[unitId].multiCasts) {
        this.ffbeChainUnits[unitId].multiCasts = [];
        position = 0;
      } else {
        position = this.ffbeChainUnits[unitId].multiCasts.length;
      }

      this.ffbeChainUnits[unitId].multiCasts.push({
        count: count,
        abilities: []
      });
    }

    return position;
  }

  private unlockSkill(unitId, ability, dataId, level = 0) {
    // gagne l'accès à un spell qui donne 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    let effect = this.findEffect(ability, [[0, 3, 98]]);
    if (effect) {
      if (Array.isArray(effect[3])) {
        effect[3].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId, level);
        });
      } else if (this.skills[effect[3]]) {
        this.addSkill(unitId, this.skills[effect[3]], effect[3], level);
      }

      this.addSkill(unitId, this.skills[effect[1]], effect[1], level);
    }

    // [1, 1, 99, [[2,  2], [503890,  503910], 2, 503900, 2, 503890]]
    effect = this.findEffect(ability, [[1, 1, 99], [0, 3, 99], [2, 1, 99]]);
    if (effect) {
      for (let i = 2; i < effect.length; i++) {
        if (effect[i] !== 2) {
          this.addSkill(unitId, this.skills[effect[i]], effect[i], level);
        }
      }
    }

    // [1, 3, 100, [[2,  2,  2], [502050,  502060,  502070], 99999, 4, 1]]
    effect = this.findEffect(ability, [[1, 3, 100], [0, 3, 100]]);
    if (effect) {
      if (Array.isArray(effect[1])) {
        effect[1].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId, level);
        });
      } else {
        this.addSkill(unitId, this.skills[effect[1]], effect[1], level);
      }
    }

    // [0, 3, 50, [30,  3,  910947,  1]]
    effect = this.findEffect(ability, [[0, 3, 50]]);
    if (effect) {
      this.addSkill(unitId, this.skills[effect[2]], effect[2], level);
    }

    // Random use skill : [2, 1, 29, [[504100,  30], [504110,  30], [504120,  40], [0,  0], [0,  0]]]
    effect = this.findEffect(ability, [[2, 1, 29], [1, 1, 29], [0, 3, 29], [0, 0, 29]]);
    if (effect) {
      for (let i = 0; i < effect.length; i++) {
        if (Array.isArray(effect[i]) && effect[i][0] !== 0) {
          this.addSkill(unitId, this.skills[effect[i][0]], effect[i][0], level);
        }
      }
    }

    effect = this.findEffect(ability, [[0, 3, 130], [1, 1, 130], [2, 1, 130]]);
    if (effect) {
      this.addSkill(unitId, this.skills[effect[0]], effect[0], level);
    }

    effect = this.findEffect(ability, [[0, 3, 72]]);
    if (effect) {
      this.addSkill(unitId, this.lbs[effect[0]], effect[0], 1, true);
    }
  }

  private getNames(ability, level = 0) {
    let names = {};

    if (Array.isArray(ability.strings.name)) {
      let englishName = ability.strings.name[0];
      names['en'] = ability.strings.name[0] + (level > 0 ? ' + ' + level : '');

      ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
        if (ability.strings.name[index + 1] !== englishName) {
          names[lang] = ability.strings.name[index + 1] + (level > 0 ? ' + ' + level : '');
        }
      });
    }

    return names;
  }

  private addSummon(summon, summonId) {
    let id = this.ffbeChainUnits.length;

    this.ffbeChainUnits[id] = {
      dataId: Number(summonId),
      names: {
        en: summon.names[0]
      },
      abilities: []
    };

    ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
      if (summon.names[index + 1] !== this.ffbeChainUnits[id].names.en) {
        this.ffbeChainUnits[id].names[lang] = summon.names[index + 1];
      }
    });

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
      names['en'] = ability.strings.name[0] + ' (' + (id + 1) + ')';

      ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
        if (ability.strings.name[index + 1] !== ability.strings.name[0]) {
          names[lang] = ability.strings.name[index + 1] + ' (' + (id + 1) + ')';
        }
      });
    }

    this.ffbeChainUnits[summonId].abilities[id] = {
      dataId: Number(dataId),
      names: names,
      castTime: ability.effect_frames[0][0],
      elements: [],
      dualable: false,
      damage: 'physic'
    };

    if (ability.attack_damage[0].length > 1) {
      this.ffbeChainUnits[summonId].abilities[id].hitDamage = ability.attack_damage[0];
    }

    let effect = this.findEffect(ability, [[2, 1, 80]]);
    if (effect) {
      base = effect[6];
      this.ffbeChainUnits[summonId].abilities[id].damage = 'magic';
    }

    effect = this.findEffect(ability, [[2, 1, 79]]);
    if (effect) {
      base = effect[7];
    }

    effect = this.findEffect(ability, [[2, 1, 94]]);
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

  private findEffect(ability, numbers) {
    let find = null;

    numbers.forEach(number => {
      let effects = [];

      if (ability.effects_raw) {
        effects = ability.effects_raw;
      } else if (ability.max_level) {
        effects = ability.max_level.effects_raw;
      }

      effects.forEach(effect => {
        if (effect[0] == number[0] && effect[1] == number[1] && effect[2] == number[2]) {
          find = effect[3];
          return;
        }
      });
    });

    return find;
  }

  private addEquipment(equipmentId) {
    let equipment = this.equipments[equipmentId];
    let id = this.ffbeChainUnits.length;

    this.ffbeChainUnits[id] = {
      dataId: Number(equipmentId),
      names: {
        en: equipment.strings.name ? equipment.strings.name[0]: ''
      },
      abilities: []
    };

    ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
      if (equipment.strings.name[index + 1] !== this.ffbeChainUnits[id].names.en) {
        this.ffbeChainUnits[id].names[lang] = equipment.strings.name[index + 1];
      }
    });

    equipment.skills.forEach(skillId => {
      this.addSkill(id, this.skills[skillId], skillId);
    });
  }

  private addMateria(materiaId) {
    let materia = this.materias[materiaId];
    let id = this.ffbeChainUnits.length;

    this.ffbeChainUnits[id] = {
      dataId: Number(materiaId),
      names: {
        en: materia.strings.names ? materia.strings.names[0]: ''
      },
      abilities: []
    };

    ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
      if (materia.strings.names[index + 1] !== this.ffbeChainUnits[id].names.en) {
        this.ffbeChainUnits[id].names[lang] = materia.strings.names[index + 1];
      }
    });

    materia.skills.forEach(skillId => {
      this.addSkill(id, this.skills[skillId], skillId);
    });
  }

  private filterRealUsableSkills() {
    for (let i = this.ffbeChainUnits.length - 1; i >= 0; i--) {
      for (let j = this.ffbeChainUnits[i].abilities.length - 1; j >= 0; j--) {
        if (!this.ffbeChainUnits[i].abilities[j].damage || this.ffbeChainUnits[i].abilities[j].names.en == "null") { //this.ffbeChainUnits[i].abilities[j].firstHit === -1 TODO !!!!!
          this.ffbeChainUnits[i].abilities.splice(j, 1);
        } else  {
          if (this.ffbeChainUnits[i].abilities[j].damage === "physic") {
            delete this.ffbeChainUnits[i].abilities[j].damage;
          }

          if (this.ffbeChainUnits[i].abilities[j].castTime === 0) {
            delete this.ffbeChainUnits[i].abilities[j].castTime;
          }
        }
      }

      if (this.ffbeChainUnits[i].abilities.length === 0) {
        this.ffbeChainUnits.splice(i, 1);
      }
    }
  }
}
