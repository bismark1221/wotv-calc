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

      if (id !== null && this.units[unitId].skills) {
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

    return null;
  }

  private addSkill(unitId, ability, dataId, level = 0, lb = false) {
    let exist = false;
    this.ffbeChainUnits[unitId].abilities.forEach(skill => {
      if (skill.dataId == dataId) {
        exist = true;
        if (level > 0) {
          skill.names = this.getNames(ability, level);
        }
      }
    })

    if (exist || !ability) {
      return;
    }

    let id = this.ffbeChainUnits[unitId].abilities.length;

    this.ffbeChainUnits[unitId].abilities[id] = {
      dataId: Number(dataId),
      names: this.getNames(ability, level),
      damage: null,
      base: 0,
      hitDamage: []
    };

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

    this.updateOffset(unitId, id, ability);
    this.checkEffects(unitId, id, ability, dataId, level);
  }

  private checkEffects(unitId, id, ability, dataId, level = 0) {
    let damageEffects = [];
    let effects = [];

    if (ability.effects_raw) {
      effects = ability.effects_raw;
    } else if (ability.max_level) {
      effects = ability.max_level.effects_raw;
    }

    effects.forEach((effect, index) => {
      let find = this.updateDamage(effect, unitId, id);
      if (find) {
        if (!find.combo) {
          find.combo = 1;
        }

        for(let i = 1; i <= find.combo; i++) {
          this.ffbeChainUnits[unitId].abilities[id].base += find.damage;
          find.index = index;
          find.hitDamage = ability.attack_damage[index];
          damageEffects.push(find);
        };
      }

      this.unlockSkill(effect, unitId, level);
      this.isMultipleCastAbility(effect, unitId);
      this.updateDebuffs(effect, unitId, id);
    });

    this.calculateDamage(damageEffects, unitId, id, ability);
    this.updateFrames(damageEffects, unitId, id, ability);

    return;
  }


  private unlockSkill(rawEffect, unitId, level = 0) {
    // gagne l'accès à un spell qui donne 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    let find = this.findEffect(rawEffect, [98]);
    if (find) {
      if (Array.isArray(find.effect[3])) {
        find.effect[3].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId, level);
        });
      } else if (this.skills[find.effect[3]]) {
        this.addSkill(unitId, this.skills[find.effect[3]], find.effect[3], level);
      }

      this.addSkill(unitId, this.skills[find.effect[1]], find.effect[1], level);
    }

    // [1, 1, 99, [[2,  2], [503890,  503910], 2, 503900, 2, 503890]]
    find = this.findEffect(rawEffect, [99]);
    if (find) {
      for (let i = 2; i < find.effect.length; i++) {
        if (find.effect[i] !== 2) {
          this.addSkill(unitId, this.skills[find.effect[i]], find.effect[i], level);
        }
      }
    }

    // [1, 3, 100, [[2,  2,  2], [502050,  502060,  502070], 99999, 4, 1]]
    find = this.findEffect(rawEffect, [100]);
    if (find) {
      if (Array.isArray(find.effect[1])) {
        find.effect[1].forEach(skillId => {
          this.addSkill(unitId, this.skills[skillId], skillId, level);
        });
      } else {
        this.addSkill(unitId, this.skills[find.effect[1]], find.effect[1], level);
      }
    }

    // [0, 3, 50, [30,  3,  910947,  1]]
    find = this.findEffect(rawEffect, [50]);
    if (find) {
      this.addSkill(unitId, this.skills[find.effect[2]], find.effect[2], level);
    }

    // Random use skill : [2, 1, 29, [[504100,  30], [504110,  30], [504120,  40], [0,  0], [0,  0]]]
    find = this.findEffect(rawEffect, [29]);
    if (find) {
      for (let i = 0; i < find.effect.length; i++) {
        if (Array.isArray(find.effect[i]) && find.effect[i][0] !== 0) {
          this.addSkill(unitId, this.skills[find.effect[i][0]], find.effect[i][0], level);
        }
      }
    }

    find = this.findEffect(rawEffect, [130]);
    if (find) {
      this.addSkill(unitId, this.skills[find.effect[0]], find.effect[0], level);
    }

    find = this.findEffect(rawEffect, [72]);
    if (find) {
      this.addSkill(unitId, this.lbs[find.effect[0]], find.effect[0], 1, true);
    }
  }

  private updateFrames(effects, unitId, id, ability) {
    let framesList = [];
    let frames = [];
    let combo = 1
    let frameBetweenCombo = 0;

    effects.forEach(effect => {
      if (effect.combo > 1) {
        combo = effect.combo;
      }
    });

    for (let i = 1; i <= combo; i++) {
      ability.attack_frames.forEach(attackFrame => {
        attackFrame.forEach(frame => {
          frames.push(frame + frameBetweenCombo);
        });
      });

      frameBetweenCombo += this.ffbeChainUnits[unitId].abilities[id].castTime + this.ffbeChainUnits[unitId].abilities[id].offset;
    }

    frames = frames.sort((n1, n2) => n1 - n2);

    for (let i = 0; i < frames.length; i++) {
      if (i === 0) {
        framesList.push(frames[i]);
      } else {
        framesList.push(Math.abs(frames[i] - frames[i - 1]));
      }
    }

    this.ffbeChainUnits[unitId].abilities[id].framesList = framesList;
    if (this.ffbeChainUnits[unitId].abilities[id].castTime) {
      this.ffbeChainUnits[unitId].abilities[id].castTime = this.ffbeChainUnits[unitId].abilities[id].castTime * combo;
      this.ffbeChainUnits[unitId].abilities[id].offset = this.ffbeChainUnits[unitId].abilities[id].offset * combo;
    }
  }

  private calculateDamage(effects, unitId, id, ability) {
    effects.forEach(effect => {
      let ratioNewDamage = effect.damage * 100 / this.ffbeChainUnits[unitId].abilities[id].base;

      if (effect.hitDamage) {
        effect.hitDamage.forEach(hitDamage => {
          this.ffbeChainUnits[unitId].abilities[id].hitDamage.push(hitDamage * ratioNewDamage / 100);
        });
      }
    });
  }

  private findEffect(effect, tables) {
    let find = null;

    tables.forEach(table => {
      if (effect[2] == table) {
        find = {
          effect: effect[3]
        };
      }
    })

    return find;
  }

  private updateDamage(rawEffect, unitId, id) {
    // physic damage : [1, 1, 1, [0,  0,  0,  0,  0,  0,  100]]
    // & ignore : [1, 1, 21, [0,  0,  500,  -50]]
    let find = this.findEffect(rawEffect, [1, 81]);
    if (find) {
      find.damage = find.effect[6];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    find = this.findEffect(rawEffect, [134]);
    if (find) {
      find.damage = find.effect[4];
      this.ffbeChainUnits[unitId].abilities[id].dualable = false;
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    find = this.findEffect(rawEffect, [41, 112]);
    if (find) {
      find.damage = find.effect[0];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    find = this.findEffect(rawEffect, [22]);
    if (find) {
      find.damage = find.effect[3];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    find = this.findEffect(rawEffect, [25]);
    if (find) {
      find.damage = find.effect[1];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    find = this.findEffect(rawEffect, [21]);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(find.effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    // "effects": ["3 physical attacks (1.6x each, 4.8x total, ATK) to all enemies"],
    // "effects_raw": [[2, 1, 42, [0,  0,  3,  3,  160]]]
    find = this.findEffect(rawEffect, [42]);
    if (find) {
      find.damage = find.effect[4];
      find.combo = find.effect[3];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    find = this.findEffect(rawEffect, [126]);
    if (find) {
      find.damage = find.effect[4] + find.effect[5] * find.effect[6];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    // "effects": ["Critical physical damage (4.95x, ATK) to all enemies"],
    // "effects_raw": [[2, 1, 43, [0,  0,  495,  0]]]},
    find = this.findEffect(rawEffect, [43]);
    if (find) {
      find.damage = find.effect[2] * 1.5;
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }

    // 1, 1, 102, [100,  99999,  400]
    find = this.findEffect(rawEffect, [102]);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].damage = "physic";
      return find;
    }


    // magic damage : [1, 1, 15, [0,  0,  0,  0,  0,  180,  0]
    // & ignore : [2, 1, 70, [0,  0,  180,  50]]
    find = this.findEffect(rawEffect, [15]);
    if (find) {
      find.damage = find.effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }

    find = this.findEffect(rawEffect, [70]);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(find.effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }

    // magic with upgrade : [2, 1, 72, [0,  0,  150,  100,  100,  5]]
    find = this.findEffect(rawEffect, [72]);
    if (find) {
      find.damage = find.effect[2] + find.effect[4] * find.effect[5];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }

    // magic damage with SPR scalling : [2, 1, 103, [100,  99999,  250]]
    find = this.findEffect(rawEffect, [103]);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }

    // magic damage with EVO damage : [2, 1, 124, [0, 0, 0, 0, 0, 0, 0, 900, 900, [50,  50]]
    find = this.findEffect(rawEffect, [124]);
    if (find) {
      find.damage = find.effect[7];
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }


    // hybrid damage : [1, 1, 40, [0,  0,  0,  0,  0,  0,  0,  0,  180,  180]]
    find = this.findEffect(rawEffect, [40]);
    if (find) {
      find.damage = find.effect[8];
      this.ffbeChainUnits[unitId].abilities[id].damage = "hybrid";
      return find;
    }
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

  private updateDebuffs(rawEffect, unitId, id) {
    // [2, 1, 33, [-50,  0,  0,  0,  0,  0,  0,  0,  1,  5]]
    // [1, 1, 33, [0,  0,  -60,  0,  0,  0,  0,  0,  1,  5]]
    // fire, ice, lightning, water, wind, earth, light, dark, nbEnemy, nbTurn
    let find = this.findEffect(rawEffect, [33]);

    if (find) {
      for (let i = 0; i <= 7; i++) {
        if (find.effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].debuffs) {
            this.ffbeChainUnits[unitId].abilities[id].debuffs = [];
          }
          this.ffbeChainUnits[unitId].abilities[id].debuffs.push({
            type: this.debuffElement[i],
            value: Math.abs(find.effect[i])
          });
        }
      }
    }
  }

  private isMultipleCastAbility(rawEffect, unitId) {
    // ==> full dualcast ==> "effects_raw": [0, 3, 45, ["none"]]
    let find = this.findEffect(rawEffect, [45]);
    if (find) {
      this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || 2 >= this.ffbeChainUnits[unitId].multipleBlack ? 2 : this.ffbeChainUnits[unitId].multipleBlack;
      this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || 2 >= this.ffbeChainUnits[unitId].multipleWhite ? 2 : this.ffbeChainUnits[unitId].multipleWhite;
      this.ffbeChainUnits[unitId].multipleGreen = !this.ffbeChainUnits[unitId].multipleGreen || 2 >= this.ffbeChainUnits[unitId].multipleGreen ? 2 : this.ffbeChainUnits[unitId].multipleGreen;
    }

    // ==> dual black ==> [0, 3, 44, ["none"]]
    find = this.findEffect(rawEffect, [44]);
    if (find) {
      this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || 2 >= this.ffbeChainUnits[unitId].multipleBlack ? 2 : this.ffbeChainUnits[unitId].multipleBlack;
    }

    // ==> white magic ==> [0, 3, 52, [2,  2,  XXX]]  &&  [0, 3, 52, [2,  3,  XXX]]  &&  [0, 3, 97, ...]
    find = this.findEffect(rawEffect, [52]);
    if (find) {
      this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || find.effect[1] >= this.ffbeChainUnits[unitId].multipleWhite ? find.effect[1] : this.ffbeChainUnits[unitId].multipleWhite;
      this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || find.effect[1] >= this.ffbeChainUnits[unitId].multipleBlack ? find.effect[1] : this.ffbeChainUnits[unitId].multipleBlack;
      this.ffbeChainUnits[unitId].multipleGreen = !this.ffbeChainUnits[unitId].multipleGreen || find.effect[1] >= this.ffbeChainUnits[unitId].multipleGreen ? find.effect[1] : this.ffbeChainUnits[unitId].multipleGreen;
    }

    find = this.findEffect(rawEffect, [97]);
    if (find) {
      if (find.effect[0] === 2) {
        this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || 2 >= this.ffbeChainUnits[unitId].multipleWhite ? 2 : this.ffbeChainUnits[unitId].multipleWhite;
      } else if (find.effect[0] === 0) {
        this.ffbeChainUnits[unitId].multipleBlack = !this.ffbeChainUnits[unitId].multipleBlack || 3 >= this.ffbeChainUnits[unitId].multipleBlack ? 3 : this.ffbeChainUnits[unitId].multipleBlack;
        this.ffbeChainUnits[unitId].multipleWhite = !this.ffbeChainUnits[unitId].multipleWhite || 3 >= this.ffbeChainUnits[unitId].multipleWhite ? 3 : this.ffbeChainUnits[unitId].multipleWhite;
        this.ffbeChainUnits[unitId].multipleGreen = !this.ffbeChainUnits[unitId].multipleGreen || 3 >= this.ffbeChainUnits[unitId].multipleGreen ? 3 : this.ffbeChainUnits[unitId].multipleGreen;
      } else {
        console.log("effect not known ==> ");
        console.log(rawEffect);
      }
    }

    // ==> "effects_raw": [0, 3, 1006, [2, [ListSkillIds, ..., ..., ...]]]
    find = this.findEffect(rawEffect, [1006]);
    if (find) {
      find.effect[1].forEach(skillId => {
        let multiCastPosition = this.findMultiCastByCount(unitId, find.effect[0]);
        this.saveMultiCast(unitId, multiCastPosition, skillId);
      });
    }

    // ???? "effects_raw": [[0, 3, 98, [2, 504560, -1, [910652,  910654], 4, 1, 1]]], ???? && mp_cost === 0
    // gagne l'accès à un spell qui donne 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    // Son vrai 5 cast :                           [0, 3, 98, [5,  704290,  1,  704140,  9999,  1,  0]]
    find = this.findEffect(rawEffect, [98, 53]);
    if (find ) {                   // && ability.mp_cost === 0
      let multiCastPosition = this.findMultiCastByCount(unitId, find.effect[0]);

      if (Array.isArray(find.effect[3])) {
        find.effect[3].forEach(skillId => {
          this.saveMultiCast(unitId, multiCastPosition, skillId);
        });
      } else {
        this.saveMultiCast(unitId, multiCastPosition, find.effect[3]);
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

    ability.effects_raw.forEach(effect => {
      let find = this.findEffect(effect, [80]);
      if (find) {
        base = find.effect[6];
        this.ffbeChainUnits[summonId].abilities[id].damage = 'magic';
      }

      find = this.findEffect(effect, [79]);
      if (find) {
        base = find.effect[7];
      }

      find = this.findEffect(effect, [94]);
      if (find) {
        base = find.effect[0];
      }
    });

    this.ffbeChainUnits[summonId].abilities[id].base = base;
    this.updateOffset(summonId, id, ability);
    this.updateFrames([{combo:1}], summonId, id, ability);
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
        if (!this.ffbeChainUnits[i].abilities[j].damage || !this.ffbeChainUnits[i].abilities[j].base || this.ffbeChainUnits[i].abilities[j].names.en == "null") {
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
