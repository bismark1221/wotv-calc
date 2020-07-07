import { Skill } from './skill';
import { Buff } from './buff';
import { Equipment } from './equipment';

export class Unit {
  dataId?;
  rarity = "N";
  names: any = {
    en: 'New Unit'
  };
  name = "New Unit";
  jobs: any = [
    {
      en: 'Job 1'
    },
    {
      en: 'Job 2'
    },
    {
      en: 'Job 3'
    }
  ];

  skills: Skill[] = [new Skill()];
  buffs: Buff[] = [new Buff()];
  stats = {
    "HP": {},
    "TP": {},
    "AP": {},
    "ATK": {},
    "DEF": {},
    "SPR": {},
    "MAG": {},
    "DEX": {},
    "AGI": {},
    "LUCK": {},
    "INITIAL_AP": {},
    "ACCURACY": {},
    "CRITIC_RATE": {},
    "CRITIC_AVOID": {},
    "EVADE": {},
    "FIRE": {},
    "ICE": {},
    "EARTH": {},
    "WIND": {},
    "LIGHTNING": {},
    "WATER": {},
    "LIGHT": {},
    "DARK": {},
    "SLASH": {},
    "PIERCE": {},
    "STRIKE": {},
    "MISSILE": {},
    "MAGIC": {},
    "POISION": {},
    "BLIND": {},
    "SLEEP": {},
    "SILENCE": {},
    "PARALYZE": {},
    "CONFUSION": {},
    "PETRIFY": {},
    "TOAD": {},
    "CHARM": {},
    "SLOW": {},
    "STOP": {},
    "IMMOBILIZE": {},
    "DISABLE": {},
    "BERSERK": {},
    "DOOM": {},
    "MOVE": {},
    "JUMP": {}
  }

  element = "fire";
  image = "ITEMcrst";

  limit = new Skill();
  tmr = new Equipment();
  masterSkill = new Skill();
  totalBuffs = {
    HP: 0,
    TP: 0,
    INITIAL_AP: 0,
    ATK: 0,
    DEF: 0,
    MAG: 0,
    SPR: 0,
    DEX: 0,
    AGI: 0,
    LUCK: 0,
    CRITIC_RATE: 0,
  };
  remainingBuffs = [];
  slug;
  board;
  attack;

  constructFromJson(unit: Unit, translateService): void {
    this.dataId = unit.dataId;
    this.rarity = unit.rarity;
    this.names = unit.names;
    this.jobs = unit.jobs;
    this.skills = unit.skills;
    this.buffs = unit.buffs;
    this.stats = unit.stats;
    this.element = unit.element;
    this.image = unit.image;
    this.limit = unit.limit;
    this.tmr = unit.tmr;
    this.masterSkill = unit.masterSkill;
    this.slug = unit.slug;
    this.board = unit.board;
    this.attack = unit.attack;
  }

  getName(translateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  updateStar(value) {
    this.star = value

    this.updateMaxLevel()
  }

  updateLB(value) {
    this.lb = value

    this.updateMaxLevel();
    this.updateMaxJobLevel();
  }






  private updateMaxLevel() {
    let levelPerStar = {
      1: 0,
      2: 5,
      3: 10,
      4: 15,
      5: 20,
      6: 34
    }

    let levelPerLB = {
      0: 0,
      1: 5,
      2: 10,
      3: 15,
      4: 25,
      5: 35
    }

    this.maxLevel = 30 + levelPerStar[this.star] + levelPerLB[this.lb ? this.lb : 0];

    if (this.level > this.maxLevel) {
      this.level = this.maxLevel
      this.changeLevel()
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.maxLevel; i++) {
      this.tableLevels.push(i);
    }

    this.updateMaxJobLevel()
  }

  private updateMaxJobLevel() {
    let levelPerLB = {
      0: 0,
      1: 3,
      2: 3,
      3: 6,
      4: 6,
      5: 9
    }

    let starToUnlock = [
      1,
      2,
      4
    ]

    this.maxJobLevel = 6 + levelPerLB[this.lb ? this.lb : 0];

    let updated = false;
    this.jobsData.forEach((job, jobIndex) => {
      job.unlocked = this.star >= starToUnlock[jobIndex]

      if (job.unlocked) {
        if (job.level > this.maxJobLevel) {
          job.level = this.maxJobLevel
          updated = true
        }
      } else {
        job.level = 1;
        updated = true
      }
    })

    if (updated) {
      this.changeLevel()
    }

    this.tableJobLevels = [];
    for (let i = 1; i <= this.maxJobLevel; i++) {
      this.tableJobLevels.push(i);
    }

    this.disableNotAvailableNodes()
  }

  changeLevel() {
    if (this) {
      Object.keys(this.stats).forEach(stat => {
        if (typeof(this.stats[stat].min) == "number") {
          this.stats[stat] = {
            min: this.stats[stat].min,
            max: this.stats[stat].max
          }
        } else {
          delete this.stats[stat]
        }
      })

      Object.keys(this.stats).forEach(stat => {
        let min = this.stats[stat].min
        let max = this.stats[stat].max

        this.stats[stat].base = Math.floor(min + ((max - min) / (99 - 1) * (this.level - 1)))
        this.stats[stat].baseTotal = this.stats[stat].base
      })

      this.jobsData.forEach((job, jobIndex) => {
        let subJob = jobIndex !== 0
        Object.keys(job.statsModifiers[job.level - 1]).forEach(statType => {
          if (!this.stats[statType]) {
            this.stats[statType] = {
              base: 0
            }
          }
          let stat = this.stats[statType].base * (job.statsModifiers[job.level - 1][statType] / 10000) * (subJob ? 0.5 : 1)

          this.stats[statType].baseTotal += stat
        });
      })

      Object.keys(this.stats).forEach(stat => {
        if (!this.stats[stat].baseTotal) {
          this.stats[stat].base = this.stats[stat].min
          this.stats[stat].baseTotal = this.stats[stat].min
        } else {
          this.stats[stat].baseTotal = Math.floor(this.stats[stat].baseTotal)
        }
      })

      this.calculateTotalStats()
    }
  }

  private calculateGuildStats() {
    let guild = this.guild
    if (guild) {
      let statues = this.guildService.getStatues()

      Object.keys(guild).forEach(statue => {
        if (guild[statue] > 0) {
          statues[statue][guild[statue] - 1].forEach(stat => {
            let value = stat.value;
            if (stat.calcType == "percent") {
              value = Math.floor(this.stats[stat.type].baseTotal * value / 100)
            }

            this.updateStat(stat.type, value, "guild", "fixe")
          })
        }
      });
    }
  }

  private updateStat(type, value, statType, calc = "fixe", reset = false) {
    switch (type) {
      case "ALL_ELEMENTS_RES" :
        this.elements.forEach(element => {
          this.updateStat(element + "_RES", value, statType, calc)
        })
      break

      case "ALL_ATTACKS_RES" :
        this.atks.forEach(atk => {
          this.updateStat(atk + "_RES", value, statType, calc)
        })
      break

      case "ALL_AILMENTS_RES" :
        this.ailments.forEach(ailment => {
          this.updateStat(ailment + "_RES", value, statType, calc)
        })
      break

      default:
        if (!this.stats[type]) {
          this.stats[type] = {}
          this.stats[type].base = 0;
          this.stats[type].baseTotal = 0;
        }

        if (!this.stats[type][statType]) {
          this.stats[type][statType] = 0
        }

        if (calc == "percent") {
          this.stats[type][statType] = (reset ? 0 : this.stats[type][statType]) + this.stats[type].baseTotal * value / 100
        } else {
          this.stats[type][statType] = (reset ? 0 : this.stats[type][statType]) + value
        }
      break
    }
  }

  private calculateBoardStats() {
    Object.keys(this.board.nodes).forEach(nodeId => {
      let node = this.board.nodes[nodeId]
      if (node.type == "buff" && node.level) {
        node.skill.effects.forEach(effect => {
          if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
            this.updateStat(effect.type, effect.minValue, "board", effect.calcType === "percent" ? "percent" : "fixe")
          } else {
            console.log("not manage effect in board percent/fixe")
            console.log(node)
          }
        })
      }
    })
  }

  private calculateSupportStats() {
    this.activatedSupport.forEach(supportNode => {
      if (supportNode != "0") {
        this.board.nodes[supportNode].skill.effects.forEach(effect => {
          let value = effect.minValue + ((effect.maxValue - effect.minValue) / (20 - 1) * (this.board.nodes[supportNode].level - 1))
          if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
            this.updateStat(effect.type, value, "support", effect.calcType === "percent" ? "percent" : "fixe")
          } else {
            console.log("not manage effect in support percent/fixe")
            console.log(supportNode)
          }
        })
      }
    })
  }

  private calculateMasterSkillStats() {
    if (this.masterSkillActivated >= 0) {
      let masterSkill = this.masterSkill[this.masterSkillActivated]
      masterSkill.effects.forEach(effect => {
        if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
          this.updateStat(effect.type, effect.minValue, "masterSkill", effect.calcType === "percent" ? "percent" : "fixe")
        } else {
          console.log("not manage effect in masterSkill percent/fixe")
          console.log(masterSkill)
        }
      })
    }
  }

  private calculateEsperStats() {
    this.statsType.forEach(statType => {
      if (this.esper.stats[statType].base) {
        this.stats[statType].esper = Math.ceil(this.esper.stats[statType].base * parseInt(this.esper.resonance) / 10)
      }
    })

    Object.keys(this.esper.buffs).forEach(statType => {
      if (typeof(this.esper.buffs[statType].total) == "number") {
        this.updateStat(statType, 0, "esper", "fixe")
        let baseTotal = this.stats[statType].baseTotal ? this.stats[statType].baseTotal : 0
        let value = 0;

        if (typeof(this.esper.buffs[statType].percent) == "number"
          && this.esper.buffs[statType].percent != 0
        ) {
          if (this.statsType.indexOf(statType) !== -1) {
            value = Math.floor((this.stats[statType].esper ? this.stats[statType].esper : 0) + (baseTotal * this.esper.buffs[statType].percent / 100))
          } else {
            value = this.esper.buffs[statType].percent
          }
        } else {
          value = this.esper.buffs[statType].total
        }

        this.updateStat(statType, value, "esper", "fixe")
      }
    })
  }

  private calculateCardStats() {
    this.card.statsType.forEach(statType => {
      this.stats[statType].card = this.card.stats[statType].total
    })

    Object.keys(this.card.buffs.self).forEach(statType => {
      let value = this.card.buffs.self[statType].value

      if (this.statsType.indexOf(statType) !== -1) {
        if (this.card.buffs.self[statType].calcType === "percent") {
          value = Math.floor(this.stats[statType].baseTotal * value / 100)
        }

        if (this.stats[statType].card) {
          value += this.stats[statType].card
        }
      }

      this.updateStat(statType, value, "card", "fixe")
    })

    Object.keys(this.card.buffs.party).forEach(statType => {
      let value = this.card.buffs.party[statType].value

      if (this.statsType.indexOf(statType) !== -1) {
        if (this.card.buffs.party[statType].calcType === "percent") {
          value = Math.floor(this.stats[statType].baseTotal * value / 100)
        }

        if (this.stats[statType].cardParty) {
          value += this.stats[statType].cardParty
        }
      }

      this.updateStat(statType, value, "cardParty", "fixe")
    })
  }

  private calculateEquipmentsStats() {
    let statsType = [];
    this.imbue = null;

    for (let i = 0; i <= 2; i++) {
      if (this.equipments[i]) {
        Object.keys(this.equipments[i].stats).forEach(statType => {
          let value = parseInt(this.equipments[i].stats[statType].selected)

          this.updateStat(statType, value, 'equipment' + i, "fixe", true)

          if (!this.stats[statType].equipment) {
            this.stats[statType].equipment = {
              positive: 0,
              negative: -100000000
            }
          }

          if (value > 0 && value > this.stats[statType].equipment.positive) {
            this.stats[statType].equipment.positive = value
          } else if (value <= 0 && value > this.stats[statType].equipment.negative) {
            this.stats[statType].equipment.negative = value
          }

          statsType.push(statType)
        })

        this.equipments[i].passiveSkills.forEach(skill => {
          if (skill.type !== "skill") {
            skill.level = this.equipments[i].level

            skill.effects.forEach(effect => {
              if (!effect.fromImbue) {
                let value = effect.minValue
                if (skill.level >= skill.maxLevel) {
                  value = effect.maxValue
                } else if (skill.maxLevel !== 1 || skill.level !== 1) {
                  value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)))
                }

                this.updateStat(effect.type, value, 'equipment' + i, "fixe")

                if (!this.stats[effect.type]) {
                  this.stats[effect.type] = {};
                }

                if (!this.stats[effect.type].equipmentBuff) {
                  this.stats[effect.type].equipmentBuff = {
                    positive: 0,
                    negative: -100000000
                  }
                }

                if (value > 0 && value > this.stats[effect.type].equipmentBuff.positive) {
                  this.stats[effect.type].equipmentBuff.positive = value
                } else if (value <= 0 && value > this.stats[effect.type].equipmentBuff.negative) {
                  this.stats[effect.type].equipmentBuff.negative = value
                }

                statsType.push(effect.type)
              } else {
                this.imbue = effect
              }
            })
          }
        })
      }
    }

    statsType.forEach(statType => {
      if (this.stats[statType].equipment) {
        let negativeValue = this.stats[statType].equipment.negative !== -100000000 ? this.stats[statType].equipment.negative : 0
        this.updateStat(statType, this.stats[statType].equipment.positive + negativeValue, "totalEquipment", "fixe", true)
      }

      if (this.stats[statType].equipmentBuff) {
        let negativeBuffValue = this.stats[statType].equipmentBuff.negative !== -100000000 ? this.stats[statType].equipmentBuff.negative : 0
        let total = 0
        if (this.stats[statType].totalEquipment) {
          total = this.stats[statType].totalEquipment
        }
        this.updateStat(statType, total + this.stats[statType].equipmentBuff.positive + negativeBuffValue, "totalEquipment", "fixe", true)
      }
    })
  }


  private calculateTotalStats() {
    this.calculateGuildStats()
    this.calculateBoardStats()
    this.calculateSupportStats()
    this.calculateMasterSkillStats()

    if (this.esper) {
      this.calculateEsperStats()
    }

    if (this.card) {
      this.calculateCardStats()
    }

    if (this.equipments) {
      this.calculateEquipmentsStats()
    }

    let statsToRemove = [];
    Object.keys(this.stats).forEach(stat => {
      if (stat == "INITIAL_AP") {
        let initialAPModifier = 100 + this.jobsData[0].statsModifiers[this.jobsData[0].level - 1]["INITIAL_AP"]
        let initialAP = this.stats["AP"].total * initialAPModifier / 100

        this.stats["INITIAL_AP"].base = Math.floor(initialAP)
        this.stats["INITIAL_AP"].baseTotal = Math.floor(initialAP)
      }
      this.stats[stat].total = this.stats[stat].baseTotal;

      if (this.stats[stat].board) {
        this.stats[stat].board = Math.floor(this.stats[stat].board)
        this.stats[stat].total += this.stats[stat].board
      }

      if (this.stats[stat].support) {
        this.stats[stat].support = Math.floor(this.stats[stat].support)
        this.stats[stat].total += this.stats[stat].support
      }

      if (this.stats[stat].masterSkill) {
        this.stats[stat].masterSkill = Math.floor(this.stats[stat].masterSkill)
        this.stats[stat].total += this.stats[stat].masterSkill
      }

      if (this.stats[stat].esper) {
        this.stats[stat].total += this.stats[stat].esper
      }

      if (this.stats[stat].card) {
        this.stats[stat].total += this.stats[stat].card
      }

      if (this.stats[stat].cardParty) {
        this.stats[stat].total += this.stats[stat].cardParty
      }

      if (this.stats[stat].totalEquipment) {
        this.stats[stat].total += this.stats[stat].totalEquipment
      }

      this.stats[stat].total += this.stats[stat].guild ? this.stats[stat].guild : 0

      if (!Number.isInteger(this.stats[stat].total)) {
        statsToRemove.push(stat)
      }
    })

    statsToRemove.forEach(stat => {
      delete this.stats[stat]
    })
  }

  rightClickNode(node) {
    if (node !== 0) {
      this.hideNode(node)
      this.changeLevel()
    }
  }

  clickNode(node) {
    if (node !== 0) {
      if (!this.board.nodes[node].activated || this.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
      this.changeLevel()
    }
  }

  showNode(node) {
    if (node !== 0 && this.canActivateNode(node)) {
      if (!this.board.nodes[node].activated) {
        this.board.nodes[node].activated = true;
        let parentNode = this.board.nodes[node].parent
        if (!this.board.nodes[parentNode].activated) {
          this.showNode(parentNode)
        }
      }

      this.updateSkill(node, true)
    }
  }

  hideNode(node, fullHide = false) {
    if (node !== 0) {
      let level = this.updateSkill(node, false, fullHide)
      if (level === 0) {
        this.board.nodes[node].activated = false;
        this.board.nodes[node].children.forEach(childNode => {
          this.hideNode(childNode, true)
        })
      }
    }
  }

  disableNotAvailableNodes() {
    Object.keys(this.board.nodes).forEach(node => {
      if (this.board.nodes[node].activated && !this.canActivateNode(node)) {
        this.hideNode(node, true)
      }
    })
  }

  private updateSkill(nodeId, increase, fullHide = false) {
    let node = this.board.nodes[nodeId]

    if (this.grid.nodesForGrid[nodeId].subType == "buff") {
      node.level = increase ? 1 : 0;
    } else {
      if (increase) {
        node.level = typeof(node.level) == "number" ? (node.level == node.skill.maxLevel ? node.skill.maxLevel : node.level + 1) : 1
      } else {
        node.level = typeof(node.level) == "number" ? (node.level == 0 || fullHide ? 0 : node.level - 1) : 0
      }
    }

    return node.level
  }

  canActivateNode(node) {
    let nodeData = this.board.nodes[node]

    if (node !== 0) {
      if (nodeData && nodeData.type == "buff") {
        return this.canActivateNode(nodeData.parent) && this.star >= nodeData.skill.unlockStar && this.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel
      } else {
        return !nodeData || !nodeData.skill.unlockStar || (this.canActivateNode(nodeData.parent) && this.star >= nodeData.skill.unlockStar && this.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel)
      }
    } else {
      return true
    }
  }

  maxUnit() {
    this.star = 6;
    this.lb = 5;
    this.level = 99;

    this.jobsData.forEach(job => {
      job.level = 15
    })

    this.maxNodes()
    this.changeStar()
    this.changeLevel()
  }

  maxLevelAndJobs() {
    this.level = this.maxLevel;

    this.jobsData.forEach(job => {
      job.level = this.maxJobLevel
    })

    this.maxNodes()
    this.changeLevel()
  }

  maxNodes() {
    Object.keys(this.board.nodes).forEach(node => {
      if (this.canActivateNode(node)) {
        this.showNode(node)
        if (this.board.nodes[node].skill && this.board.nodes[node].skill.maxLevel) {
          this.board.nodes[node].level = this.board.nodes[node].skill.maxLevel
        }
      }
    })
  }
}
