import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnitService } from './unit.service'

@Injectable()
export class JsonService {
  ffbeChainUnits = [];
  isCollapsed = [];
  isCollapsedRaw = true;
  units = {};
  abilitySkills = {};
  magicSkills = {};
  passiveSkills = {};
  lbs = {};
  summons = {};
  upgrades = {};
  materias = {};
  equipments = {};
  latentSkills = {};

  names = {
    ability: {},
    magic: {},
    lb: {},
    unit: {},
    summon: {},
    summonAbility: {}
  }

  minimumHit = 1;
  imperilsElement = [
    'fire',
    'ice',
    'lightning',
    'water',
    'wind',
    'earth',
    'light',
    'dark'
  ];

  moveTypes = {
    0: "none",
    1: "walk",
    2: "walk",
    3: "wrap",
    4: "none",
    5: "run",
    6: "dash"
  };

  motionTypes = {
    1: "default",
    2: "orb",
    3: "none",
    5: "crouch",
    6: "dance",
    8: "default"
  };

  stats = [
    "atk",
    "def",
    "mag",
    "spr"
  ];

  killerRaces = [
    "",
    "beast",
    "bird",
    "aquatic",
    "demon",
    "human",
    "machine",
    "dragon",
    "undead",
    "insect",
    "stone",
    "plant",
    "spirit"
  ];

  constructor(private http: HttpClient, private unitService: UnitService) {}

  private getUnits() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/units.json').toPromise();
  }

  private getAbilitySkills() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/skills_ability.json').toPromise();
  }

  private getMagicSkills() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/skills_magic.json').toPromise();
  }

  private getPassiveSkills() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/skills_passive.json').toPromise();
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

  private getLatentSkills() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe/master/unit_latent_skills.json').toPromise();
  }

  private getUnitNames() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/MST_UNIT_NAME.json').toPromise();
  }

  private getAbilityNames() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/MST_ABILITY_NAME.json').toPromise();
  }

  private getMagicNames() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/MST_MAGIC_NAME.json').toPromise();
  }

  private getLBNames() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/MST_LIMITBURST_NAME.json').toPromise();
  }

  private getSummonNames() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/MST_BEAST_NAME.json').toPromise();
  }

  private getSummonAbilityNames() {
    return this.http.get('https://raw.githubusercontent.com/aEnigmatic/ffbe-gl-strings/master/MST_BEASTSKILL_NAME.json').toPromise();
  }


  getJsons(): Promise<any[]> {
    return Promise.all([
      this.getUnits(),
      this.getAbilitySkills(),
      this.getMagicSkills(),
      this.getPassiveSkills(),
      this.getLBs(),
      this.getSummons(),
      this.getUpgrades(),
      this.getEquipments(),
      this.getMaterias(),
      this.getLatentSkills(),
      this.getUnitNames(),
      this.getAbilityNames(),
      this.getMagicNames(),
      this.getLBNames(),
      this.getSummonNames(),
      this.getSummonAbilityNames(),
    ]).then(responses => {
      this.units = responses[0];
      this.abilitySkills = responses[1];
      this.magicSkills = responses[2];
      this.passiveSkills = responses[3];
      this.lbs = responses[4];
      this.summons = responses[5];
      this.upgrades = responses[6];
      this.equipments = responses[7];
      this.materias = responses[8];
      this.latentSkills = responses[9];

      this.names.unit = responses[10];
      this.names.ability = responses[11];
      this.names.magic = responses[12];
      this.names.lb = responses[13];
      this.names.summon = responses[14];
      this.names.summonAbility = responses[15];

      this.formatJsons();

      return this.ffbeChainUnits;
    });
  }

  private formatJsons() {
    Object.keys(this.units).forEach(unitId => {
      let id = this.addUnit(this.units[unitId]);

      if (id !== null && this.units[unitId].skills) {
        this.units[unitId].skills.forEach((ability, index) => {
          this.addSkill(id, this.getSkill(ability.id), ability.id, ability.rarity);
        });
      }

      if (this.units[unitId].entries) {
        let entries = Object.keys(this.units[unitId].entries);
        if (this.lbs[entries[entries.length - 1]]){
          this.addSkill(id, this.lbs[entries[entries.length - 1]], entries[entries.length - 1], this.units[unitId].rarity_max, 0, true);
        }
      }
    });

    Object.keys(this.upgrades).forEach(upgradeId => {
      this.upgrades[upgradeId].units.forEach(unitId => {
        let unitIndex = this.getUnitIdFromDataId(unitId);
        if (unitIndex) {
          this.addSkill(unitIndex, this.getSkill(this.upgrades[upgradeId].skill_id_new), this.upgrades[upgradeId].skill_id_new, this.getUpgradeRarity(unitId, upgradeId), this.getUpgradeLevel(unitId, upgradeId));
        }
      });
    });

    Object.keys(this.latentSkills).forEach(latentSkillId => {
      this.latentSkills[latentSkillId].units.forEach(unitId => {
        let unitIndex = this.getUnitIdFromDataId(unitId);
        if (unitIndex) {
          this.addSkill(unitIndex, this.getSkill(this.latentSkills[latentSkillId].skill_id), this.latentSkills[latentSkillId].skill_id, this.units[unitId].rarity_min);
        }
      });
    });

    Object.keys(this.summons).forEach(summonId => {
      this.addSummon(this.summons[summonId], summonId);
    });

    Object.keys(this.equipments).forEach(equipmentId => {
      if (this.equipments[equipmentId].skills) {
        // this.addEquipment(equipmentId);
      }
    });

    Object.keys(this.materias).forEach(materiaId => {
      if (this.materias[materiaId].skills) {
        // this.addMateria(materiaId);
      }
    });

    this.filterRealUsableSkills();
  }

  private getUpgradeRarity(unitId, upgrade) {
    let skillIdOld = this.upgrades[upgrade].skill_id_old;
    let rarity = 0;

    Object.keys(this.upgrades).forEach(upgradeId => {
      if (this.upgrades[upgradeId].skill_id_new == skillIdOld && this.upgrades[upgradeId].units.indexOf(unitId) !== -1) {
        skillIdOld = this.upgrades[upgradeId].skill_id_old;
      }
    });

    this.units[unitId].skills.forEach(skill => {
      if (skill.id === skillIdOld) {
        rarity = skill.rarity;
      }
    });

    return rarity;
  }

  private getUpgradeLevel(unitId, upgrade) {
    let skillIdOld = this.upgrades[upgrade].skill_id_old;
    let level = 1;

    Object.keys(this.upgrades).forEach(upgradeId => {
      if (this.upgrades[upgradeId].skill_id_new == skillIdOld && this.upgrades[upgradeId].units.indexOf(unitId) !== -1) {
        level = 2;
      }
    });

    return level;
  }

  private addUnit(unit) {
    if (unit.entries && unit.names) {
      let entries = Object.keys(unit.entries);
      let id = this.ffbeChainUnits.length;
      let dataId = Number(entries[0]);

      this.ffbeChainUnits[id] = {
        dataId: dataId,
        names: {},
        rarity: {
          min: unit.rarity_min,
          max: unit.rarity_max
        },
        dataStats: {},
        abilities: []
      };

      if (this.names.unit[dataId]) {
        ['en', 'tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
          if (this.names.unit[dataId][index] !== this.ffbeChainUnits[id].names.en) {
            this.ffbeChainUnits[id].names[lang] = this.names.unit[dataId][index];
          }
        });
      } else {
        this.ffbeChainUnits[id].names.en = dataId;
      }

      Object.keys(unit.entries).forEach(entryId => {
        let entry = unit.entries[entryId];
        this.ffbeChainUnits[id].dataStats[entry.rarity] = {
          atk: {
            base: entry.stats.ATK[1],
            pot: entry.stats.ATK[2],
          },
          mag: {
            base: entry.stats.MAG[1],
            pot: entry.stats.MAG[2],
          }
        };
      })

      this.isCollapsed.push(true);

      return id;
    }

    return null;
  }

  private addSkill(unitId, ability, dataId, rarity, level = 0, lb = false, canDualSkill = true) {
    let returnSkill = null;
    this.ffbeChainUnits[unitId].abilities.forEach(skill => {
      if (skill.dataId == dataId) {
        if (level > 0) {
          skill.names = this.getNames(dataId, level, lb);
        }
        returnSkill = skill;
      }
    });

    if (!ability) {
      return;
    }

    if (returnSkill === null) {
      let id = this.ffbeChainUnits[unitId].abilities.length;

      this.ffbeChainUnits[unitId].abilities[id] = {
        dataId: Number(dataId),
        names: this.getNames(dataId, level, lb),
        damage: null,
        base: 0,
        hitDamage: []
        // move: this.moveTypes[ability.move_type],
        // motion : this.motionTypes[ability.motion_type]
      };

      if (!canDualSkill) {
        this.ffbeChainUnits[unitId].abilities[id].canDualSkill = false;
      }

      if (!lb && ability.effect_frames) {
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

      if (lb) {
        this.ffbeChainUnits[unitId].abilities[id].isLB = true;
      }

      this.updateOffset(unitId, id, ability);
      this.checkEffects(unitId, id, ability, dataId, rarity, level);

      returnSkill = this.ffbeChainUnits[unitId].abilities[id];
    }

    return returnSkill;
  }

  private checkEffects(unitId, id, ability, dataId, rarity, level = 0) {
    let damageEffects = [];
    let effects = [];
    let hitEffect = 0;

    if (ability.effects_raw) {
      effects = ability.effects_raw;
    } else if (ability.levels) {
      effects = ability.levels[ability.levels.length - 1][1];
    }

    this.ffbeChainUnits[unitId].abilities[id].effectOrder = [];

    effects.forEach((effect, index) => {
      if (ability.type !== "PASSIVE") {
        let find = this.updateDamage(effect, unitId, id);
        if (find) {
          if (!find.combo) {
            find.combo = 1;
          }

          for(let i = 1; i <= find.combo; i++) {
            this.ffbeChainUnits[unitId].abilities[id].base += find.damage;
            find.index = index;

            if (find.type !== "jump" && find.type !== "delayAttack" && find.type !== "dot") {
              find.hitDamage = ability.attack_damage[hitEffect];
              damageEffects.push(find);
            } else {
              this.ffbeChainUnits[unitId].abilities[id][find.type].hitDamage = ability.attack_damage[hitEffect];

              if ((find.type === "jump" || find.type === "delayAttack") && ability.attack_frames[hitEffect]) {
                let frames = ability.attack_frames[hitEffect].sort((n1, n2) => n1 - n2);
                let framesList = [];

                for (let i = 0; i < frames.length; i++) {
                  if (i === 0) {
                    framesList.push(frames[i]);
                  } else if (frames[i] - frames[i - 1] !== 0) {
                    framesList.push(Math.abs(frames[i] - frames[i - 1]));
                  }
                }

                this.ffbeChainUnits[unitId].abilities[id][find.type].framesList = framesList;
              }
            }
          };

          hitEffect++;
          this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = find.type ? find.type : "damage";
        }

        this.updateBuffs(effect, unitId, id, index);
        this.updateBreaks(effect, unitId, id, index);
        this.updateImperils(effect, unitId, id, index);
        this.updateImbues(effect, unitId, id, index);
      }

      this.unlockSkill(effect, unitId, rarity, dataId, level);
      this.isMultipleCastAbility(effect, unitId);
      this.updateChainCapModifier(effect, unitId, id, rarity);

      this.updateBoostModifier(effect, unitId, id, index, rarity);
      this.updateKillers(effect, unitId, id, index, rarity);
      this.updateLBDamage(effect, unitId, id, index, rarity);
    });

    let effectOrder = [];
    this.ffbeChainUnits[unitId].abilities[id].effectOrder.forEach(effect => {
      if (effect !== null) {
        effectOrder.push(effect);
      }
    });
    this.ffbeChainUnits[unitId].abilities[id].effectOrder = effectOrder;

    this.calculateDamage(damageEffects, unitId, id, ability);
    this.updateFrames(damageEffects, unitId, id, ability);

    return;
  }

  private unlockSkill(rawEffect, unitId, rarity, dataId, level = 0) {
    let newSkill = null;
    let unlockTurns = 0;

    // unlock X-Cast 5 cast : [0, 3, 98, [5,  704330,  -1,  704320,  2,  1,  0]]
    let find = this.findEffect(rawEffect, [98]);
    if (find) {
      // if (Array.isArray(find.effect[3])) { => Just to be sure every spell are in the character, let's try whithout it
      //   find.effect[3].forEach(skillId => {
      //     this.addSkill(unitId, this.getSkill(skillId), skillId, rarity, null, level);
      //   });
      // } else if (this.getSkill(find.effect[3])) {
      //   this.addSkill(unitId, this.getSkill(find.effect[3]), find.effect[3], rarity, null, level);
      // }

      this.addSkill(unitId, this.getSkill(find.effect[1]), find.effect[1], rarity, level);
    }

    // [1, 1, 99, [[2,  2], [503890,  503910], 2, 503900, 2, 503890]]
    find = this.findEffect(rawEffect, [99]);
    if (find) {
      newSkill = this.addSkill(unitId, this.getSkill(find.effect[3]), find.effect[3], rarity, level);

      if (Array.isArray(find.effect[1])) {
        find.effect[1].forEach(skillId => {
          this.updateMethodUnlockSkill(newSkill, skillId, 1, 1, find.effect[5]);
        });
      } else {
        this.updateMethodUnlockSkill(newSkill, find.effect[1], 1, 1, find.effect[5]);
      }

      this.addSkill(unitId, this.getSkill(find.effect[5]), find.effect[5], rarity, level);
    }

    // [1, 3, 100, [[2,  2,  2], [502050,  502060,  502070], 99999, 4, 1]]
    find = this.findEffect(rawEffect, [100]);
    if (find) {
      if (Array.isArray(find.effect[1])) {
        find.effect[1].forEach(skillId => {
          newSkill = this.addSkill(unitId, this.getSkill(skillId), skillId, rarity, level);
          this.updateMethodUnlockSkill(newSkill, dataId, find.effect[3]);
        });
      } else {
        newSkill = this.addSkill(unitId, this.getSkill(find.effect[1]), find.effect[1], rarity, level);
        this.updateMethodUnlockSkill(newSkill, dataId, find.effect[3]);
      }
    }

    // [0, 3, 50, [30,  3,  910947,  1]] ==> Counters
    // find = this.findEffect(rawEffect, [50]);
    // if (find) {
    //   this.addSkill(unitId, this.getSkill(find.effect[2]), find.effect[2], rarity, level);
    // }

    // Random use skill : [2, 1, 29, [[504100,  30], [504110,  30], [504120,  40], [0,  0], [0,  0]]]
    find = this.findEffect(rawEffect, [29]);
    if (find) {
      for (let i = 0; i < find.effect.length; i++) {
        if (Array.isArray(find.effect[i]) && find.effect[i][0] !== 0) {
          this.addSkill(unitId, this.getSkill(find.effect[i][0]), find.effect[i][0], rarity, level);
        }
      }
    }

    // 132 => autocast next turn
    // 56 => autocast start battle
    find = this.findEffect(rawEffect, [132, 56]);
    if (find) {
      this.addSkill(unitId, this.getSkill(find.effect[0]), find.effect[0], rarity, level);
    }

    // LB upgrade
    find = this.findEffect(rawEffect, [72]);
    if (find) {
      this.addSkill(unitId, this.lbs[find.effect[0]], find.effect[0], this.units[this.ffbeChainUnits[unitId].dataId].rarity_max, 1, true);
    }

    // Cooldown : 0, 3, 130, [911493, 0, [2,  0], 1]
    find = this.findEffect(rawEffect, [130]);
    if (find) {
      newSkill = this.addSkill(unitId, this.getSkill(find.effect[0]), find.effect[0], rarity, level, false, false);
      this.manageCooldown(newSkill, find.effect[2]);
    }
  }

  private updateMethodUnlockSkill(skill, dataId, turns, nbUse = null, insteadOf = null) {
    if (!skill.unlockBy) {
      skill.unlockBy = {};
    }

    skill.unlockBy[dataId] = {
      turns: turns,
      nbUse: nbUse,
      insteadOf: insteadOf
    }
  }

  private manageCooldown(skill, turns) {
    if (skill) {
      skill.cooldown = {
        unlock: turns[0] - turns[1] + 1,
        wait: turns[0] + 1
      };
    }
  }

  private updateFrames(effects, unitId, id, ability) {
    let combo = 1

    if (effects && effects.length > 0) {
      let framesList = [];
      let frames = [];
      let frameBetweenCombo = 0;

      effects.forEach(effect => {
        if (effect.combo > 1) {
          combo = effect.combo;
        }
      });

      if (ability.attack_frames) {
        for (let i = 1; i <= combo; i++) {
          ability.attack_frames.forEach(attackFrame => {
            attackFrame.forEach(frame => {
              frames.push(frame + frameBetweenCombo);
            });
          });

          frameBetweenCombo += this.ffbeChainUnits[unitId].abilities[id].castTime + this.ffbeChainUnits[unitId].abilities[id].offset;
        }
      }

      frames = frames.sort((n1, n2) => n1 - n2);

      for (let i = 0; i < frames.length; i++) {
        if (i === 0) {
          framesList.push(frames[i]);
        } else if (frames[i] - frames[i - 1] !== 0) {
          framesList.push(Math.abs(frames[i] - frames[i - 1]));
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].framesList = framesList;
    }

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

  private findEffect(effect, tables, secondParameter = null) {
    let find = null;

    tables.forEach(table => {
      if (effect[2] == table && (secondParameter === null || effect[1] === secondParameter)) {
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

    find = this.findEffect(rawEffect, [134]); // Timed jump
    if (find) {
      this.ffbeChainUnits[unitId].abilities[id].jump = {
        type: 'timed',
        round: find.effect[3],
        base: find.effect[4],
        damageType: "physic"
      };
      find.type = "jump";
      return find;
    }

    find = this.findEffect(rawEffect, [52]); // auto jump
    if (find) {
      this.ffbeChainUnits[unitId].abilities[id].jump = {
        type: 'auto',
        round: find.effect[3],
        base: find.effect[4],
        damageType: "physic"
      };
      find.type = "jump";
      return find;
    }

    find = this.findEffect(rawEffect, [13]); // delay attack
    if (find) {
      this.ffbeChainUnits[unitId].abilities[id].delayAttack = {
        type: 'auto',
        round: find.effect[3],
        base: find.effect[5],
        damageType: "physic"
      };
      find.type = "delayAttack";
      return find;
    }

    find = this.findEffect(rawEffect, [13]); // DoT
    if (find) {
      this.ffbeChainUnits[unitId].abilities[id].dot = {
        rounds: find.effect[4],
        base: find.effect[2],
        damageType: "physic"
      };
      find.type = "dot";
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

    find = this.findEffect(rawEffect, [70], 1);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(find.effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }

    find = this.findEffect(rawEffect, [105]);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].ignore = Math.abs(find.effect[3]);
      this.ffbeChainUnits[unitId].abilities[id].damage = "magic";
      return find;
    }

    // magic with upgrade : [2, 1, 72, [0,  0,  150,  100,  100,  5]]
    find = this.findEffect(rawEffect, [72]);
    if (find) {
      find.damage = find.effect[2];
      this.ffbeChainUnits[unitId].abilities[id].consecutive = {
        "turns": find.effect[5],
        "value": find.effect[4]
      };
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
      find.damage = (find.effect[7] + find.effect[8]) / 2;
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

  private updateBreaks(rawEffect, unitId, id, index) {
    let find = this.findEffect(rawEffect, [24]);

    if (find) {
      for (let i = 0; i < 4; i++) {
        if (find.effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].breaks) {
            this.ffbeChainUnits[unitId].abilities[id].breaks = [];
          }

          this.ffbeChainUnits[unitId].abilities[id].breaks.push({
            stat: this.stats[i],
            value: Math.abs(find.effect[i]),
            turn: find.effect[4]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "break";
    }
  }

  private updateBuffs(rawEffect, unitId, id, index) {
    // "Increase ATK and MAG by 120% for 3 turns to all allies",
    // "effects_raw": [[2, 2, 3, [120,  0,  120,  0,  3,  1,  0]]
    let find = this.findEffect(rawEffect, [3]);

    if (find) {
      for (let i = 0; i < 4; i++) {
        if (find.effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].buffs) {
            this.ffbeChainUnits[unitId].abilities[id].buffs = [];
          }

          this.ffbeChainUnits[unitId].abilities[id].buffs.push({
            stat: this.stats[i],
            value: Math.abs(find.effect[i]),
            turn: find.effect[4]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "buff";
    }

    // 0, 3, 3, [250,  0,  250,  0,  3,  1,  0]
    find = this.findEffect(rawEffect, [3], 3);
    if (find) {
      for (let i = 0; i < 4; i++) {
        if (find.effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].buffs) {
            this.ffbeChainUnits[unitId].abilities[id].buffs = [];
          }

          this.ffbeChainUnits[unitId].abilities[id].buffs.push({
            stat: this.stats[i],
            value: Math.abs(find.effect[i]),
            turn: find.effect[4]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "buff";
    }
  }

  private updateImbues(rawEffect, unitId, id, index) {
    let find = this.findEffect(rawEffect, [95]);

    if (find) {
      for (let i = 0; i <= 7; i++) {
        if (find.effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].imbues) {
            this.ffbeChainUnits[unitId].abilities[id].imbues = [];
          }
          this.ffbeChainUnits[unitId].abilities[id].imbues.push({
            element: this.imperilsElement[i],
            turn: find.effect[8]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "imbue";
    }
  }

  private updateOffset(unitId, id, ability) {
    if (this.ffbeChainUnits[unitId].abilities[id].castTime) {
      if (this.ffbeChainUnits[unitId].abilities[id].castTime === 0) {
        this.ffbeChainUnits[unitId].abilities[id].offset = 14;
      } else {
        this.ffbeChainUnits[unitId].abilities[id].offset = 14;
      }
    } else {
      this.ffbeChainUnits[unitId].abilities[id].offset = 14;
    }
  }

  private updateImperils(rawEffect, unitId, id, index) {
    // [2, 1, 33, [-50,  0,  0,  0,  0,  0,  0,  0,  1,  5]]
    // [1, 1, 33, [0,  0,  -60,  0,  0,  0,  0,  0,  1,  5]]
    // fire, ice, lightning, water, wind, earth, light, dark, nbEnemy, nbTurn
    let find = this.findEffect(rawEffect, [33], 1);

    if (find) {
      for (let i = 0; i <= 7; i++) {
        if (find.effect[i] !== 0) {
          if (!this.ffbeChainUnits[unitId].abilities[id].imperils) {
            this.ffbeChainUnits[unitId].abilities[id].imperils = [];
          }
          this.ffbeChainUnits[unitId].abilities[id].imperils.push({
            type: this.imperilsElement[i],
            value: Math.abs(find.effect[i]),
            turn: find.effect[9]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "imperil";
    }
  }

  private updateBoostModifier(rawEffect, unitId, id, index, rarity) {
    //[0, 3, 136, [[912569,  912580,  912581], 0, 0, 800, 4, 1, 912584]]
    //[2, 2, 136, [912570,  0,  0,  600,  3,  1,  912587]
    let find = this.findEffect(rawEffect, [136]);

    if (find) {
      if (!Array.isArray(find.effect[0])) {
        find.effect[0] = [find.effect[0]];
      }

      find.effect[0].forEach(skillId => {
        if (!this.ffbeChainUnits[unitId].abilities[id].boostModifiers) {
          this.ffbeChainUnits[unitId].abilities[id].boostModifiers = [];
        }

        this.ffbeChainUnits[unitId].abilities[id].boostModifiers.push({
          id: skillId,
          value: find.effect[3],
          turn: find.effect[4],
          uniqueIdentifier: find.effect[6]
        });
      });

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "boostModifier";
    }

    //[0, 3, 73, [[912569,  912571,  912570,  912572,  912592,  912577,  912578,  912580,  912581], 0, 0, 800]]
    find = this.findEffect(rawEffect, [73]);

    if (find) {
      let skillId = this.ffbeChainUnits[unitId].abilities[id].dataId;

      if (!Array.isArray(find.effect[0])) {
        find.effect[0] = [find.effect[0]];
      }

      find.effect[0].forEach(skillId => {
        if (!this.ffbeChainUnits[unitId].passiveBoostModifiers) {
          this.ffbeChainUnits[unitId].passiveBoostModifiers = [];
        }

        this.ffbeChainUnits[unitId].passiveBoostModifiers.push({
          id: skillId,
          value: find.effect[3],
          rarity: rarity
        });
      });
    }
  }

  private updateLBDamage(rawEffect, unitId, id, index, rarity) {
    //[0, 3, 120, [40,  3,  1,  1]]
    let find = this.findEffect(rawEffect, [120]);

    if (find) {
      if (!this.ffbeChainUnits[unitId].abilities[id].boostLB) {
        this.ffbeChainUnits[unitId].abilities[id].boostLB = [];
      }

      this.ffbeChainUnits[unitId].abilities[id].boostLB.push({
        value: find.effect[0],
        turn: find.effect[1]
      });

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "boostLB";
    }

    //[0, 3, 68, [25]]]
    find = this.findEffect(rawEffect, [68]);

    if (find) {
      if (!this.ffbeChainUnits[unitId].passiveLBDamage) {
        this.ffbeChainUnits[unitId].passiveLBDamage = [];
      }

      this.ffbeChainUnits[unitId].passiveLBDamage.push({
        value: find.effect[0],
        rarity: rarity
      });
    }
  }

  private updateKillers(rawEffect, unitId, id, index, rarity) {
    //0, 3, 92, [[1,  100], [6,  100], -1, -1, -1, -1, -1, -1, 5, 1
    let find = this.findEffect(rawEffect, [92]);

    if (find) {
      if (!this.ffbeChainUnits[unitId].abilities[id].killers) {
        this.ffbeChainUnits[unitId].abilities[id].killers = [];
      }

      for (let i = 0; i <= 7; i++) {
        if (find.effect[i][1] > 0) {
          this.ffbeChainUnits[unitId].abilities[id].killers.push({
            race: this.killerRaces[find.effect[i][0]],
            physic: find.effect[i][1],
            magic: 0,
            turn: find.effect[8]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "killer";
    }

    //0, 3, 93, [[5,  100], -1, -1, -1, -1, -1, -1, -1, 2, 1]
    find = this.findEffect(rawEffect, [93]);

    if (find) {
      if (!this.ffbeChainUnits[unitId].abilities[id].killers) {
        this.ffbeChainUnits[unitId].abilities[id].killers = [];
      }

      for (let i = 0; i <= 7; i++) {
        if (find.effect[i][1] > 0) {
          this.ffbeChainUnits[unitId].abilities[id].killers.push({
            race: this.killerRaces[find.effect[i][0]],
            physic: 0,
            magic: find.effect[i][1],
            turn: find.effect[8]
          });
        }
      }

      this.ffbeChainUnits[unitId].abilities[id].effectOrder[index] = "killer";
    }

    //[0, 3, 11, [4,  50,  50]
    find = this.findEffect(rawEffect, [11]);

    if (find) {
      if (!this.ffbeChainUnits[unitId].passiveKillers) {
        this.ffbeChainUnits[unitId].passiveKillers = [];
      }

      this.ffbeChainUnits[unitId].passiveKillers.push({
        race: this.killerRaces[find.effect[0]],
        physic: find.effect[1],
        magic: find.effect[2],
        rarity: rarity
      });
    }
  }

  private updateChainCapModifier(rawEffect, unitId, id, rarity) {
    let find = this.findEffect(rawEffect, [81]);

    if (find) {
      this.ffbeChainUnits[unitId].maxChainCap = 6;
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

  private getNames(abilityId, level = 0, lb = false) {
    let formattedNames = {
      en: "unknown ability name -- " + abilityId
    };
    let names = null;

    if (lb) {
      names = this.names.lb[abilityId];
    } else {
      if (this.names.ability[abilityId]) {
        names = this.names.ability[abilityId];
      } else if (this.names.magic[abilityId]) {
        names = this.names.magic[abilityId];
      }
    }

    if (names) {
      let englishName = names[0];
      formattedNames['en'] = names[0] + (level > 0 ? ' + ' + level : '');

      ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
        if (names[index + 1] !== englishName) {
          formattedNames[lang] = names[index + 1] + (level > 0 ? ' + ' + level : '');
        }
      });
    }

    return formattedNames;
  }

  private addSummon(summon, summonId) {
    let id = this.ffbeChainUnits.length;

    this.ffbeChainUnits[id] = {
      dataId: Number(summonId),
      names: {},
      abilities: []
    };

    ['en', 'tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
      if (this.names.summon[summonId]) {
        this.ffbeChainUnits[id].names[lang] = this.names.summon[summonId][index];
      }
    });

    if (this.ffbeChainUnits[id].names === {}) {
      this.ffbeChainUnits[id].names.en = "unknown summon name -- " + summonId;
    }

    if (summon.skill) {
      Object.keys(summon.skill).forEach(skillId => {
        this.addSummonSkill(id, summon.skill[skillId], skillId);
      });
    }

    this.isCollapsed.push(true);
  }

  private addSummonSkill(summonId, ability, dataId) {
    let id = this.ffbeChainUnits[summonId].abilities.length;
    let base = 0;
    let names = {};

    if (this.names.summonAbility[dataId]) {
      names['en'] = this.names.summonAbility[dataId][0] + ' (' + (id + 1) + ')';

      ['tw', 'kr', 'fr', 'de', 'es'].forEach((lang, index) => {
        if (this.names.summonAbility[dataId][index + 1] !== this.names.summonAbility[dataId][0]) {
          names[lang] = this.names.summonAbility[dataId][index + 1] + ' (' + (id + 1) + ')';
        }
      });
    } else {
      names['en'] = "unknown ability name";
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
      this.addSkill(id, this.getSkill(skillId), skillId, 0);
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
      this.addSkill(id, this.getSkill(skillId), skillId, 0);
    });
  }

  private filterRealUsableSkills() {
    for (let i = this.ffbeChainUnits.length - 1; i >= 0; i--) {
      for (let j = this.ffbeChainUnits[i].abilities.length - 1; j >= 0; j--) {
        if ((!this.ffbeChainUnits[i].abilities[j].damage
          || !this.ffbeChainUnits[i].abilities[j].base
          || this.ffbeChainUnits[i].abilities[j].names.en == "null")
          && !this.ffbeChainUnits[i].abilities[j].breaks
          && !this.ffbeChainUnits[i].abilities[j].imperils
          && !this.ffbeChainUnits[i].abilities[j].buffs
          && !this.ffbeChainUnits[i].abilities[j].imbues
          && !this.ffbeChainUnits[i].abilities[j].boostModifiers
          && !this.ffbeChainUnits[i].abilities[j].killers
          && !this.ffbeChainUnits[i].abilities[j].jump
          && !this.ffbeChainUnits[i].abilities[j].delayAttack
          && !this.ffbeChainUnits[i].abilities[j].dot
          && !this.ffbeChainUnits[i].abilities[j].boostLB
          && !this.ffbeChainUnits[i].abilities[j].passiveLBDamage
        ) {
          this.ffbeChainUnits[i].abilities.splice(j, 1);
        } else  {
          if (this.ffbeChainUnits[i].abilities[j].damage === "physic") {
            delete this.ffbeChainUnits[i].abilities[j].damage;
          }

          if (this.ffbeChainUnits[i].abilities[j].damage === null) {
            delete this.ffbeChainUnits[i].abilities[j].damage;
            delete this.ffbeChainUnits[i].abilities[j].base;
            delete this.ffbeChainUnits[i].abilities[j].hitDamage;
          }

          if (this.ffbeChainUnits[i].abilities[j].castTime === 0) {
            if (this.ffbeChainUnits[i].abilities[j].magicType) {
              this.ffbeChainUnits[i].abilities[j].castTime = 40;
            } else {
              this.ffbeChainUnits[i].abilities[j].castTime = 10;
            }
          }

          if (!this.ffbeChainUnits[i].abilities[j].framesList || this.ffbeChainUnits[i].abilities[j].framesList.length === 0) {
            this.ffbeChainUnits[i].abilities[j].framesList = [0];
          } else if (this.ffbeChainUnits[i].abilities[j].framesList.length === 0) {
            this.ffbeChainUnits[i].abilities[j].framesList.push(0);
          }
        }
      }

      if (this.ffbeChainUnits[i].abilities.length === 0) {
        this.ffbeChainUnits.splice(i, 1);
      }
    }
  }

  private getSkill(skillId) {
    if (this.abilitySkills[skillId]) {
      this.abilitySkills[skillId].type = "ABILITY";
      return this.abilitySkills[skillId];

    } else if (this.magicSkills[skillId]) {
      this.magicSkills[skillId].type = "MAGIC";
      return this.magicSkills[skillId];

    } else if (this.passiveSkills[skillId]) {
      this.passiveSkills[skillId].type = "PASSIVE";
      return this.passiveSkills[skillId];

    } else {
      return null;
    }
  }
}
