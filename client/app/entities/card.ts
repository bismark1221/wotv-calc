import { Skill } from './skill';
import { TranslateService } from '@ngx-translate/core';

export class Card {
  dataId?;
  rarity = "N";
  names: any = {
    en: 'New Vision Card'
  };
  name = "New Vision Card";

  stats = {
    "HP": {},
    "ATK": {},
    "MAG": {}
  }

  image = "ITEMcrst";

  unitBuffs = [];
  partyBuffs;
  slug;
  cost;

  // For builder
  buffs
  buff
  maxLevel
  star
  level
  tableLevels
  statsType
  skills


  constructFromJson(card: Card, translateService: TranslateService): void {
    this.dataId = card.dataId;
    this.rarity = card.rarity;
    this.names = card.names;
    this.stats = card.stats;
    this.image = card.image;
    this.unitBuffs = card.unitBuffs;
    this.partyBuffs = card.partyBuffs;
    this.slug = card.slug;
    this.cost = card.cost;
  }

  getName(translateService: TranslateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  resetCard(nameService, skillService) {
    this.star = 0;
    this.level = 1;

    this.updateMaxLevel()
    this.changeLevel(nameService, skillService)
  }

  private getLevelPerStar(rarity, star) {
    let levelPerStar = {
      'UR' : {
        0: 40,
        1: 55,
        2: 70,
        3: 85,
        4: 99
      },
      'MR' : {
        0: 30,
        1: 40,
        2: 50,
        3: 60,
        4: 70
      },
      'SR' : {
        0: 20,
        1: 30,
        2: 40,
        3: 50,
        4: 60
      },
      'R' : {
        0: 20,
        1: 25,
        2: 30,
        3: 35,
        4: 40
      },
      'N' : {
        0: 10,
        1: 15,
        2: 20,
        3: 25,
        4: 30
      }
    }

    return star ? levelPerStar[rarity][star] : levelPerStar[rarity][0]
  }

  private updateMaxLevel() {
    this.maxLevel = this.getLevelPerStar(this.rarity, this.star)

    if (this.level > this.maxLevel) {
      this.level = this.maxLevel
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.maxLevel; i++) {
      this.tableLevels.push(i);
    }
  }

  changeLevel(nameService, skillService) {
    this.statsType.forEach(stat => {
      let min = this.stats[stat].min
      let max = this.stats[stat].max

      this.stats[stat].total = Math.floor(min + ((max - min) / (this.getLevelPerStar(this.rarity, 4) - 1) * (this.level - 1)))
    })

    let buffs = {
      self: {},
      party: {}
    }

    this.skills = []

    this.unitBuffs.forEach(buff => {
      if (buff.classic.type == 'support') {
        buff.classic.effects.forEach(effect => {
          buffs.self[effect.type] = {}
          buffs.self[effect.type].value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (this.getLevelPerStar(this.rarity, 4) - 1) * (this.level - 1)))
          buffs.self[effect.type].calcType = effect.calcType

          if (buff.cond) {
            buffs.self[effect.type].cond = buff.cond
          }
        })

        if (buff.awake && this.star > 0) {
          buff.awake.effects.forEach(effect => {
            buffs.self[effect.type].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.star - 1)))
          })
        }

        if (buff.lvmax && this.level == this.getLevelPerStar(this.rarity, 4)) {
          buff.lvmax.effects.forEach(effect => {
            buffs.self[effect.type].value += effect.minValue
          })
        }
      } else {
        let skill = buff.classic
        skill.level = this.level
        skill.name = nameService.getName(skill)

        skill.effects.forEach(effect => {
          effect.formatHtml = skillService.formatEffect(this, skill, effect);
        });

        skill.damageHtml = skillService.formatDamage(this, skill, skill.damage);

        if (skill.counter) {
          skill.counterHtml = skillService.formatCounter(this, skill, skill.counter);
        }

        skillService.formatRange(this, skill);

        if (buff.cond) {
          skill.cond = buff.cond
        }

        this.skills.push(skill)
      }
    })

    this.partyBuffs.forEach(buff => {
      buff.classic.effects.forEach(effect => {
        buffs.party[effect.type] = {}
        buffs.party[effect.type].value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (this.getLevelPerStar(this.rarity, 4) - 1) * (this.level - 1)))
        buffs.party[effect.type].calcType = effect.calcType

        if (buff.cond) {
          buffs.party[effect.type].cond = buff.cond
        }
      })

      if (buff.awake && this.star > 0) {
        buff.awake.effects.forEach(effect => {
          buffs.party[effect.type].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.star - 1)))
        })
      }

      if (buff.lvmax && this.level == this.getLevelPerStar(this.rarity, 4)) {
        buff.lvmax.effects.forEach(effect => {
          buffs.party[effect.type].value += effect.minValue
        })
      }
    })

    this.buffs = buffs

    this.buff = {}
    let types = ['self', 'party']
    types.forEach(type => {
      this.buff[type] = [];
      Object.keys(buffs[type]).forEach(effect => {
        let formattedEffect = {
          type: effect,
          value: buffs[type][effect].value,
          calcType: buffs[type][effect].calcType
        }
        this.buff[type].push(skillService.formatEffect(this, {}, formattedEffect));
      })
    })
  }

  maxCard(nameService, skillService) {
    this.star = 4
    this.level = this.getLevelPerStar(this.rarity, this.star)

    this.updateMaxLevel()
    this.changeLevel(nameService, skillService)
  }

  getAvailableStats() {
    let availableStats = []

    Object.keys(this.stats).forEach(stat => {
      if (typeof(this.stats[stat].min) == "number") {
        availableStats.push(stat)
      }
    })

    return availableStats
  }
}
