import { Skill } from './skill';
import { TranslateService } from '../services/translate.service';

export class Card {
  dataId?;
  rarity = 'N';
  names: any = {
    en: 'New Vision Card'
  };
  name = 'New Vision Card';

  descriptions: any = {
    en: ''
  };
  description = '';

  stats = {
    HP: {},
    ATK: {},
    MAG: {}
  };

  image = 'ITEMcrst';

  unitBuffs = [];
  partyBuffs;
  slug;
  cost;
  releaseDate;
  updatedDate;
  fromOtherVersion = false;

  // For builder
  buffs;
  buff;
  maxLevel;
  star;
  level;
  tableLevels;
  statsType;
  skills;
  formattedUnitBuffs;
  formattedPartyBuffs;


  constructFromJson(card: Card, translateService: TranslateService): void {
    this.dataId = card.dataId;
    this.rarity = card.rarity;
    this.names = card.names;
    this.descriptions = card.descriptions;
    this.stats = card.stats;
    this.image = card.image;
    this.unitBuffs = card.unitBuffs;
    this.partyBuffs = card.partyBuffs;
    this.slug = card.slug;
    this.cost = card.cost;
    this.releaseDate = card.releaseDate;
    this.updatedDate = card.updatedDate;
    this.fromOtherVersion = card.fromOtherVersion;

    this.name = this.getName(translateService);
  }

  getName(translateService: TranslateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  getDescription(translateService: TranslateService): string {
    if (!this.descriptions[translateService.currentLang]) {
      this.description = this.descriptions[translateService.getDefaultLang()];
    } else {
      this.description = this.descriptions[translateService.currentLang];
    }

    return this.description;
  }

  resetCard(toolService, skillService, rangeService) {
    this.star = 0;
    this.level = 1;

    this.updateMaxLevel();
    this.changeLevel(toolService, skillService, rangeService);
  }

  private getLevelPerStar(rarity, star) {
    const levelPerStar = {
      UR : {
        0: 40,
        1: 55,
        2: 70,
        3: 85,
        4: 99
      },
      MR : {
        0: 30,
        1: 40,
        2: 50,
        3: 60,
        4: 70
      },
      SR : {
        0: 20,
        1: 30,
        2: 40,
        3: 50,
        4: 60
      },
      R : {
        0: 20,
        1: 25,
        2: 30,
        3: 35,
        4: 40
      },
      N : {
        0: 10,
        1: 15,
        2: 20,
        3: 25,
        4: 30
      }
    };

    if (levelPerStar[rarity]) {
      if (levelPerStar[rarity][star]) {
        return levelPerStar[rarity][star];
      } else {
        return levelPerStar[rarity][0];
      }
    }

    return 1;
  }

  private updateMaxLevel() {
    this.maxLevel = this.getLevelPerStar(this.rarity, this.star);

    if (this.level > this.maxLevel) {
      this.level = this.maxLevel;
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.maxLevel; i++) {
      this.tableLevels.push(i);
    }
  }

  changeLevel(toolService, skillService, rangeService) {
    this.statsType.forEach(stat => {
      const min = this.stats[stat].min;
      const max = this.stats[stat].max;

      if (Number.isInteger(min) && Number.isInteger(max)) {
        this.stats[stat].total = Math.floor(min + ((max - min) / (this.getLevelPerStar(this.rarity, 4) - 1) * (this.level - 1)));
      }
    });

    const buffs = {
      self: {},
      party: {}
    };

    this.skills = [];

    this.formattedUnitBuffs.forEach(buff => {
      if (buff.classic.type === 'support') {
        buff.classic.effects.forEach(effect => {
          if (!buffs.self[effect.type]) {
            buffs.self[effect.type] = [];
          }

          const newBuff = {
            value: Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (this.getLevelPerStar(this.rarity, 4) - 1) * (this.level - 1))),
            calcType: effect.calcType
          };

          if (buff.cond) {
            // @ts-ignore
            newBuff.cond = buff.cond;
          }

          if (effect.buffOnCondition) {
          // @ts-ignore
            newBuff.buffOnCondition = effect.buffOnCondition;
          }

          buffs.self[effect.type].push(newBuff);
        });

        if (buff.awake && this.star > 0) {
          buff.awake.effects.forEach(effect => {
            buffs.self[effect.type][buffs.self[effect.type].length - 1].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.star - 1)));
          });
        }

        if (buff.lvmax && this.level === this.getLevelPerStar(this.rarity, 4)) {
          buff.lvmax.effects.forEach(effect => {
            buffs.self[effect.type][buffs.self[effect.type].length - 1].value += effect.minValue;
          });
        }
      } else {
        const skill = buff.classic;
        skill.level = this.level;
        skill.name = toolService.getName(skill);

        skill.effectsHtml = skillService.formatEffects(this, skill);

        skill.damageHtml = skillService.formatDamage(this, skill, skill.damage);

        if (skill.counter) {
          skill.counterHtml = skillService.formatCounter(this, skill, skill.counter);
        }

        rangeService.formatRange(this, skill);

        if (buff.cond) {
          skill.cond = buff.cond;
        }

        this.skills.push(skill);
      }
    });

    this.formattedPartyBuffs.forEach(buff => {
      buff.classic.effects.forEach(effect => {
        if (!buffs.party[effect.type]) {
          buffs.party[effect.type] = [];
        }

        const newBuff = {
          value: Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (this.getLevelPerStar(this.rarity, 4) - 1) * (this.level - 1))),
          calcType: effect.calcType
        };

        if (buff.cond) {
          // @ts-ignore
          newBuff.cond = buff.cond;
        }

        if (effect.buffOnCondition) {
          // @ts-ignore
          newBuff.buffOnCondition = effect.buffOnCondition;
        }

        buffs.party[effect.type].push(newBuff);
      });

      if (buff.awake && this.star > 0) {
        buff.awake.effects.forEach(effect => {
          buffs.party[effect.type][buffs.party[effect.type].length - 1].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.star - 1)));
        });
      }

      if (buff.lvmax && this.level === this.getLevelPerStar(this.rarity, 4)) {
        buff.lvmax.effects.forEach(effect => {
          buffs.party[effect.type][buffs.party[effect.type].length - 1].value += effect.minValue;
        });
      }
    });

    this.buffs = buffs;
  }

  maxCard(toolService, skillService, rangeService) {
    this.star = 4;
    this.level = this.getLevelPerStar(this.rarity, this.star);

    this.updateMaxLevel();
    this.changeLevel(toolService, skillService, rangeService);
  }

  getAvailableStats() {
    const availableStats = [];

    Object.keys(this.stats).forEach(stat => {
      if (Number.isInteger(this.stats[stat].min) && Number.isInteger(this.stats[stat].max)) {
        availableStats.push(stat);
      }
    });

    return availableStats;
  }
}
