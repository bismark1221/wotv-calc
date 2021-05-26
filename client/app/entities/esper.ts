import { Skill } from './skill';
import { Buff } from './buff';
import { Equipment } from './equipment';
import { TranslateService } from '@ngx-translate/core';

export class Esper {
  dataId?;
  rarity = 'N';
  names: any = {
    en: 'New Esper'
  };
  name = 'New Esper';

  skills: Skill[] = [new Skill()];
  stats = {
    'HP': {},
    'TP': {},
    'AP': {},
    'ATK': {},
    'DEF': {},
    'SPR': {},
    'MAG': {},
    'DEX': {},
    'AGI': {},
    'LUCK': {},
    'INITIAL_AP': {},
    'ACCURACY': {},
    'CRITIC_RATE': {},
    'CRITIC_AVOID': {},
    'EVADE': {},
    'FIRE': {},
    'ICE': {},
    'EARTH': {},
    'WIND': {},
    'LIGHTNING': {},
    'WATER': {},
    'LIGHT': {},
    'DARK': {},
    'SLASH': {},
    'PIERCE': {},
    'STRIKE': {},
    'MISSILE': {},
    'MAGIC': {},
    'POISION': {},
    'BLIND': {},
    'SLEEP': {},
    'SILENCE': {},
    'PARALYZE': {},
    'CONFUSION': {},
    'PETRIFY': {},
    'TOAD': {},
    'CHARM': {},
    'SLOW': {},
    'STOP': {},
    'IMMOBILIZE': {},
    'DISABLE': {},
    'BERSERK': {},
    'DOOM': {},
    'MOVE': {},
    'JUMP': {}
  };

  element = 'fire';
  image = 'ITEMcrst';

  effectBuffs;
  slug;
  SPs;
  board;
  cost;
  releaseDate;

  // For builder
  usedSPs;
  maxSPs;
  star;
  level;
  possibleBuffs;
  grid;
  buffs;
  tableLevels;
  maxLevel;

  constructFromJson(esper: Esper, translateService: TranslateService): void {
    this.dataId = esper.dataId;
    this.rarity = esper.rarity;
    this.names = esper.names;
    this.skills = esper.skills;
    this.stats = esper.stats;
    this.element = esper.element;
    this.image = esper.image;
    this.slug = esper.slug;
    this.SPs = esper.SPs;
    this.board = esper.board;
    this.cost = esper.cost;
    this.releaseDate = esper.releaseDate;
  }

  getName(translateService: TranslateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  updateMaxLevel() {
    const maxLevelPerStar = {
      1: 50,
      2: 80,
      3: 99
    };

    this.maxLevel = maxLevelPerStar[this.star];

    if (this.level > this.maxLevel) {
      this.level = this.maxLevel;
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.maxLevel; i++) {
      this.tableLevels.push(i);
    }
    this.disableNotAvailableNodes();
  }

  changeLevel() {
    const maxLevelPerStar = {
      1: 50,
      2: 80,
      3: 99
    };

    const statsType = [
      'HP',
      'TP',
      'AP',
      'ATK',
      'DEF',
      'SPR',
      'MAG',
      'DEX',
      'AGI',
      'LUCK',
      'POISON_RES',
      'FROSTBITE_RES',
      'BLIND_RES',
      'SLEEP_RES',
      'SILENCE_RES',
      'PARALYZE_RES',
      'CONFUSION_RES',
      'CHARM_RES',
      'PETRIFY_RES',
      'TOAD_RES',
      'HASTE_RES',
      'SLOW_RES',
      'STOP_RES',
      'STUN_RES',
      'IMMOBILIZE_RES',
      'DISABLE_RES',
      'BERSERK_RES',
      'DOOM_RES',
      'STUN_RES'
    ];

    statsType.forEach(stat => {
      if (this.stats[stat]) {
        let min = 0;
        let max = 0;

        min = this.stats[stat][(this.star - 1)].min;
        max = this.stats[stat][(this.star - 1)].max;

        const maxLevel = maxLevelPerStar[this.star];
        this.stats[stat].base = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.level - 1)));
      }
    });

    this.updateEsperBuffs();
  }

  updateEsperBuffs() {
    const statsType = [
      'HP',
      'TP',
      'AP',
      'ATK',
      'DEF',
      'SPR',
      'MAG',
      'DEX',
      'AGI',
      'LUCK',
    ];

    this.buffs = {};

    Object.keys(this.stats).forEach(stat => {
      if (statsType.indexOf(stat) === -1 && this.stats[stat][(this.star - 1)].min) {
        this.buffs[stat] = {};
        this.buffs[stat].base = this.stats[stat] && this.stats[stat].base ? this.stats[stat].base : this.stats[stat][(this.star - 1)].min;
      }
    });

    this.calculateTotalBuffs();
    this.formatEsperBuffs();
    this.calculateSPs();
  }

  private calculateTotalBuffs() {
    Object.keys(this.board.nodes).forEach(nodeId => {
      const node = this.board.nodes[nodeId];
      if (node.type === 'buff' && node.level) {
        node.skill.effects.forEach(effect => {
          if (effect.calcType === 'percent' || effect.calcType === 'fixe' ||  effect.calcType === 'resistance') {
            this.updateBuff(effect.type, effect.minValue, effect.calcType === 'percent' ? 'percent' : 'board');
          } else {
            console.log('not manage effect in board percent/fixe');
            console.log(node);
          }
        });
      }
    });

    Object.keys(this.buffs).forEach(buff => {
      this.buffs[buff].total = this.buffs[buff].base + (this.buffs[buff].board ? this.buffs[buff].board : 0);
    });
  }

  private updateBuff(type, value, calc) {
    if (!this.buffs[type]) {
      this.buffs[type] = {};
      this.buffs[type].base = 0;
    }

    if (!this.buffs[type][calc]) {
      this.buffs[type][calc] = 0;
    }

    this.buffs[type][calc] += value;
  }

  private formatEsperBuffs() {
    const esperBuffsOrder = [
      'HP',
      'TP',
      'AP',
      'ATK',
      'DEF',
      'SPR',
      'MAG',
      'DEX',
      'AGI',
      'LUCK',
      'FIRE_RES',
      'ICE_RES',
      'EARTH_RES',
      'WIND_RES',
      'LIGHTNING_RES',
      'WATER_RES',
      'LIGHT_RES',
      'DARK_RES',
      'SLASH_RES',
      'PIERCE_RES',
      'STRIKE_RES',
      'MISSILE_RES',
      'MAGIC_RES',
      'FIRE_ATK',
      'ICE_ATK',
      'EARTH_ATK',
      'WIND_ATK',
      'LIGHTNING_ATK',
      'WATER_ATK',
      'LIGHT_ATK',
      'DARK_ATK',
      'SLASH_ATK',
      'PIERCE_ATK',
      'STRIKE_ATK',
      'MISSILE_ATK',
      'MAGIC_ATK',
      'INITIAL_AP',
      'ACCURACY',
      'CRITIC_RATE',
      'CRITIC_AVOID',
      'EVADE',
      'POISON',
      'FROSTBITE',
      'BLIND',
      'SLEEP',
      'SILENCE',
      'PARALYZE',
      'CONFUSION',
      'PETRIFY',
      'TOAD',
      'CHARM',
      'SLOW',
      'STOP',
      'IMMOBILIZE',
      'DISABLE',
      'BERSERK',
      'DOOM',
      'STUN',
      'MOVE',
      'JUMP',
      'RANGE'
    ];

    const findedBuffs = [];
    Object.keys(this.buffs).forEach(buffType => {
      findedBuffs.push(buffType);
    });

    Object.keys(this.board.nodes).forEach(nodeId => {
      this.board.nodes[nodeId].skill.effects.forEach(effect => {
        if (findedBuffs.indexOf(effect.type) === -1) {
          if (!this.buffs[effect.type]) {
            this.buffs[effect.type] = {};
          }

          if (effect.calcType === 'percent' && !this.buffs[effect.type].percent) {
            this.buffs[effect.type].percent = 0;
          }

          findedBuffs.push(effect.type);
        }
      });
    });

    if (!this.possibleBuffs) {
      this.possibleBuffs = [[]];
      const addedBuffs = [];
      let i = 0;

      esperBuffsOrder.forEach(buffType => {
        if (findedBuffs.indexOf(buffType) !== -1) {
          if (this.possibleBuffs[i].length === 8) {
            this.possibleBuffs.push([]);
            i++;
          }

          this.possibleBuffs[i].push(buffType);
          addedBuffs.push(buffType);
        }
      });

      Object.keys(this.buffs).forEach(buffType => {
        if (addedBuffs.indexOf(buffType) === -1) {
          if (this.possibleBuffs[i].length === 8) {
            this.possibleBuffs.push([]);
            i++;
          }

          this.possibleBuffs[i].push(buffType);
        }
      });
    }
  }

  private calculateSPs() {
    const maxLevelPerStar = {
      1: 50,
      2: 80,
      3: 99
    };
    this.maxSPs = 0;

    for (let i = 1; i <= this.star; i++) {
      let level = this.level;
      if (i < this.star) {
        level = maxLevelPerStar[i];
      }

      for (let j = 0; j <= level - 1; j++) {
        this.maxSPs += this.SPs[i - 1][j];
      }
    }

    this.usedSPs = 0;
    Object.keys(this.board.nodes).forEach(nodeId => {
      if (this.board.nodes[nodeId].activated) {
        this.usedSPs += this.board.nodes[nodeId].skill.sp;
      }
    });

    this.disableNotAvailableNodes();
  }

  rightClickNode(node) {
    if (node !== 0) {
      this.hideNode(node);
      this.updateEsperBuffs();
    }
  }

  clickNode(node) {
    if (node !== 0) {
      if (!this.board.nodes[node].activated || this.grid.nodesForGrid[node].subType === 'skill') {
        this.showNode(node);
      } else {
        this.hideNode(node);
      }
      this.updateEsperBuffs();
    }
  }

  showNode(node) {
    if (node !== 0 && this.canActivateNode(node)) {
      if (!this.board.nodes[node].activated) {
        this.board.nodes[node].activated = true;
        this.showNode(this.board.nodes[node].parent);
      }

      this.updateSkill(node, true);
    }
  }

  hideNode(node, fullHide = false) {
    if (node !== 0) {
      const level = this.updateSkill(node, false, fullHide);
      if (level === 0) {
        this.board.nodes[node].activated = false;
        if (this.board.nodes[node].children) {
          this.board.nodes[node].children.forEach(childNode => {
            this.hideNode(childNode, true);
          });
        }
      }
    }
  }

  private updateSkill(nodeId, increase, fullHide = false) {
    const node = this.board.nodes[nodeId];
    node.level = increase ? 1 : 0;

    return node.level;
  }

  canActivateNode(node) {
    const nodeData = this.board.nodes[node];

    if (node !== 0) {
      return (this.maxSPs - this.usedSPs - this.countSPsNeededForParents(node)) >= 0;
    } else {
      return true;
    }
  }

  private countSPsNeededForParents(node) {
    if (node !== 0 && !this.board.nodes[node].activated) {
      return this.board.nodes[node].skill.sp + this.countSPsNeededForParents(this.board.nodes[node].parent);
    } else {
      return 0;
    }
  }

  changeStar() {
    this.updateMaxLevel();
    this.changeLevel();
  }

  maxEsper() {
    const maxLevelPerStar = {
      1: 50,
      2: 80,
      3: 99
    };

    this.star = this.SPs.length;
    this.level = maxLevelPerStar[this.star];

    this.changeStar();
    this.changeLevel();
  }

  resetEsper() {
    this.star = 1;
    this.level = 1;

    this.changeStar();
    this.changeLevel();
  }

  disableNotAvailableNodes() {
    Object.keys(this.board.nodes).forEach(node => {
      if (this.board.nodes[node].activated && !this.canActivateNode(node)) {
        this.hideNode(node, true);
      }
    });
  }
}
