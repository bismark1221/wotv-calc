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
    "AP": {
      total: 0
    },
    "ATK": {},
    "DEF": {},
    "SPR": {},
    "MAG": {},
    "DEX": {},
    "AGI": {},
    "LUCK": {},
    "INITIAL_AP": {
      base: 0,
      baseTotal: 0
    },
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
    "JUMP": {},
    "COST": {}
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

  // Only for builder
  star
  lb
  maxLevel
  level
  tableLevels
  maxJobLevel
  jobsData
  tableJobLevels
  masterSkillLevel
  masterSkillActivated
  activatedCounter
  activatedSupport
  activeSkills
  subjob
  esper
  card
  equipments
  grid
  imbue
  guild
  teamCards = []
  cost
  calcCost
  replacedSkills


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
    this.cost = unit.cost;
    this.replacedSkills = unit.replacedSkills;
  }

  getName(translateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  updateStar(value, autoGetSkills = false) {
    this.star = value

    if (autoGetSkills) {
      this.maxNodes()
    }

    this.updateMaxLevel()
  }

  updateLB(value, autoGetSkills = false) {
    this.lb = value

    if (autoGetSkills) {
      this.maxNodes()
    }

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

        if (this.subjob == jobIndex) {
          this.subjob = 0
        }
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

  changeLevel(autoGetSkills = false) {
    this.calculateBaseStats()

    if (autoGetSkills) {
      this.activateMasterSkill()
      this.disableNotAvailableNodes()
      this.maxNodes()
    }

    this.calculateTotalStats()
  }

  private activateMasterSkill() {
    if (this.level >= 80 && this.masterSkillLevel[this.masterSkillLevel.length - 1] == 1) {
      this.masterSkillActivated = 1
    } else if (this.level >= 40) {
      this.masterSkillActivated = 0
    } else {
      this.masterSkillActivated = -1
    }
  }

  private calculateBaseStats() {
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
  }

  private calculateGuildStats() {
    if (this.guild.data) {
      Object.keys(this.guild.data).forEach(statue => {
        if (this.guild.data[statue] > 0) {
          this.guild.statues[statue][this.guild.data[statue] - 1].forEach(stat => {
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
        let elements = [
          "FIRE",
          "ICE",
          "EARTH",
          "WIND",
          "LIGHTNING",
          "WATER",
          "LIGHT",
          "DARK"
        ]

        elements.forEach(element => {
          this.updateStat(element + "_RES", value, statType, calc)
        })
      break

      case "ALL_ATTACKS_RES" :
        let atks = [
          "SLASH",
          "PIERCE",
          "STRIKE",
          "MISSILE",
          "MAGIC"
        ]

        atks.forEach(atk => {
          this.updateStat(atk + "_RES", value, statType, calc)
        })
      break

      case "ALL_AILMENTS_RES" :
        let ailments = [
          "POISON",
          "BLIND",
          "SLEEP",
          "SILENCE",
          "PARALYZE",
          "CONFUSION",
          "PETRIFY",
          "TOAD",
          "CHARM",
          "SLOW",
          "STOP",
          "IMMOBILIZE",
          "DISABLE",
          "BERSERK",
          "DOOM",
        ]

        ailments.forEach(ailment => {
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
            console.log("not manage effect in support percent/fixe -- " + this.dataId)
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
          let calc = "fixe"
          if (effect.calcType === "percent" && !effect.type.includes("KILLER")) {
            calc = "percent"
          }

          this.updateStat(effect.type, effect.minValue, "masterSkill", calc)
        } else {
          console.log("not manage effect in masterSkill percent/fixe")
          console.log(masterSkill)
        }
      })
    }
  }

  private calculateEsperStats() {
    let statsType = [
      "HP",
      "TP",
      "AP",
      "ATK",
      "DEF",
      "SPR",
      "MAG",
      "DEX",
      "AGI",
      "LUCK",
      "MOVE",
      "JUMP"
    ]

    statsType.forEach(statType => {
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
          if (statsType.indexOf(statType) !== -1) {
            value = Math.floor(baseTotal * this.esper.buffs[statType].percent / 100)
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
    let statsType = [
      "HP",
      "TP",
      "AP",
      "ATK",
      "DEF",
      "SPR",
      "MAG",
      "DEX",
      "AGI",
      "LUCK",
      "MOVE",
      "JUMP"
    ]

    this.card.statsType.forEach(statType => {
      this.updateStat(statType, this.card.stats[statType].total, "card", "fixe")
    })

    Object.keys(this.card.buffs.self).forEach(statType => {
      let value = this.card.buffs.self[statType].value

      if (statsType.indexOf(statType) !== -1) {
        if (this.card.buffs.self[statType].calcType === "percent") {
          value = Math.floor(this.stats[statType].baseTotal * value / 100)
        }
      }

      this.updateStat(statType, value, "card", "fixe")
    })

    Object.keys(this.card.buffs.party).forEach(statType => {
      let value = this.card.buffs.party[statType].value

      if (statsType.indexOf(statType) !== -1) {
        if (this.card.buffs.party[statType].calcType === "percent") {
          value = Math.floor(this.stats[statType].baseTotal * value / 100)
        }
      }

      this.updateStat(statType, value, "cardParty", "fixe")
    })
  }

  private calculatePartyCardsStats() {
    let statsType = [
      "HP",
      "TP",
      "AP",
      "ATK",
      "DEF",
      "SPR",
      "MAG",
      "DEX",
      "AGI",
      "LUCK",
      "MOVE",
      "JUMP"
    ]

    let teamBuffs = {}

    this.teamCards.forEach(card => {
      if (card) {
        Object.keys(card.buffs.party).forEach(statType => {
          let value = card.buffs.party[statType].value

          if (statsType.indexOf(statType) !== -1) {
            if (card.buffs.party[statType].calcType === "percent") {
              value = Math.floor(this.stats[statType].baseTotal * value / 100)
            }
          }

          if ((!teamBuffs[statType] || value > teamBuffs[statType])
            && (!this.stats[statType] || !this.stats[statType].cardParty || value > this.stats[statType].cardParty)
          ) {
            teamBuffs[statType] = value
          }
        })
      }
    })

    Object.keys(teamBuffs).forEach(statType => {
      this.updateStat(statType, 0, "cardParty", "fixe", true)
      this.updateStat(statType, teamBuffs[statType], "cardParty", "fixe")
    })
  }

  private calculateEquipmentsStats() {
    let statsType = [];
    this.imbue = null;

    let cumulativeRatio = {
      HP:           [100, 50, 30],
      TP:           [100, 50, 30],
      AP:           [100, 50, 30],
      ATK:          [100, 50, 30],
      MAG:          [100, 50, 30],
      DEF:          [100, 20, 10],
      SPR:          [100, 20, 10],
      AGI:          [100, 50, 30],
      DEX:          [100, 50, 30],
      ACCURACY:     [100, 50, 30],
      EVADE:        [100, 40, 20],
      CRITIC_RATE:  [100, 50, 30],
      CRITIC_AVOID: [100, 50, 30]
    }

    for (let i = 0; i <= 2; i++) {
      if (this.equipments[i]) {
        Object.keys(this.equipments[i].stats).forEach(statType => {
          let value = parseInt(this.equipments[i].stats[statType].selected)

          if (!this.stats[statType]) {
            this.stats[statType] = {
              base: 0,
              baseTotal: 0
            }
          }

          if (!this.stats[statType].equipments) {
            this.stats[statType].equipments = {
              0: 0,
              1: 0,
              2: 0,
              total: {
                positive: 0,
                negative: 0
              }
            }
          }

          this.stats[statType].equipments[i] = value

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

                this.updateStat(effect.type, value, 'equipment' + i + "_buff", "fixe", true)

                if (!this.stats[effect.type]) { // Needed for all_res, ...
                  this.stats[effect.type] = {};
                }

                if (!this.stats[effect.type].equipmentBuff) {
                  this.stats[effect.type].equipmentBuff = {
                    positive: 0,
                    negative: 0
                  }
                }

                if (value > 0 && value > this.stats[effect.type].equipmentBuff.positive) {
                  this.stats[effect.type].equipmentBuff.positive = value
                } else if (value <= 0 && value < this.stats[effect.type].equipmentBuff.negative) {
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
      this.updateStat(statType, 0, "totalEquipment", "fixe", true)
      if (this.stats[statType].equipments) {
        if (cumulativeRatio[statType]) {
          let statOrder = {
            positive: [],
            negative: []
          }

          for (let i = 0; i < 3; i++) {
            if (!this.stats[statType].equipments[i]) {
              statOrder.positive.push(0)
              statOrder.negative.push(0)
            } else if (this.stats[statType].equipments[i] >= 0) {
              statOrder.positive.push(this.stats[statType].equipments[i])
              statOrder.negative.push(0)
            } else {
              statOrder.negative.push(this.stats[statType].equipments[i])
              statOrder.positive.push(0)
            }
          }

          statOrder.positive.sort(function(a, b) {return b - a});
          statOrder.negative.sort(function(a, b) {return a - b});

          let value = 0
          for (let i = 0; i < 3; i++) {
            value += statOrder.positive[i] != 0 && statOrder.positive[i] * cumulativeRatio[statType][i] / 100 < 1 ? 1 : Math.floor(statOrder.positive[i] * cumulativeRatio[statType][i] / 100)
            value += statOrder.negative[i] != 0 && statOrder.negative[i] * cumulativeRatio[statType][i] / 100 > -1 ? -1 : Math.floor(statOrder.negative[i] * cumulativeRatio[statType][i] / 100)
          }

          this.updateStat(statType, value, "totalEquipment", "fixe", true)
        } else {
          for (let i = 0; i < 3; i++) {
            if (this.stats[statType].equipments[i] > 0 && this.stats[statType].equipments[i] > this.stats[statType].equipments.total.positive) {
              this.stats[statType].equipments.total.positive = this.stats[statType].equipments[i]
            } else if (this.stats[statType].equipments[i] <= 0 && this.stats[statType].equipments[i] < this.stats[statType].equipments.total.negative) {
              this.stats[statType].equipments.total.negative = this.stats[statType].equipments[i]
            }
          }

          this.updateStat(statType, this.stats[statType].equipments.total.positive + this.stats[statType].equipments.total.negative, "totalEquipment", "fixe", true)
        }
      }

      if (this.stats[statType].equipmentBuff) {
        this.updateStat(statType, this.stats[statType].equipmentBuff.positive + this.stats[statType].equipmentBuff.negative, "totalEquipment", "fixe")
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

    this.calculatePartyCardsStats()
    this.updateCost()

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
        if (this.board.nodes[parentNode] && !this.board.nodes[parentNode].activated) {
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

    this.updateSupportAndCounterSkills()
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
    this.updateStar(6)
    this.changeLevel(true)
  }

  maxLevelAndJobs() {
    this.level = this.maxLevel;

    this.jobsData.forEach(job => {
      job.level = this.maxJobLevel
    })

    this.maxNodes()
    this.changeLevel()
  }

  resetUnit() {
    this.star = 1;
    this.lb = 0;
    this.level = 1;
    this.masterSkillActivated = -1;

    this.esper = null
    this.card = null
    for (let i = 0; i <= 2; i++) {
      this.equipments[i] = null
    }

    Object.keys(this.guild.data).forEach(statue => {
      this.guild.data[statue] = 0
    })

    this.jobsData.forEach(job => {
      job.level = 1
    })

    if (this.limit) {
      this.limit.level = 1
    }

    this.resetNodes()
    this.updateStar(1)
    this.changeLevel()
  }

  resetLevel() {
    this.level = 1;
    this.disableNotAvailableNodes()
    this.changeLevel()
  }

  resetJob() {
    this.jobsData.forEach(job => {
      job.level = 1
    })
    this.disableNotAvailableNodes()
    this.changeLevel()
  }

  resetNodes() {
    Object.keys(this.board.nodes).forEach(node => {
      if (this.board.nodes[node].activated) {
        this.hideNode(node, true)
      }
    })

    this.updateSupportAndCounterSkills()
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

  getActiveSkills(formatHtml = false, nameService = null, skillService = null) {
    this.activeSkills = []

    Object.keys(this.board.nodes).forEach(nodeId => {
      let node = this.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "skill" &&
        (node.skill.mainSkill || node.skill.unlockJob == this.subjob + 1)
      ) {
        node.skill.level = node.level

        this.activeSkills.push(formatHtml ? this.formatActiveSkill(node.skill, nameService, skillService) : node.skill)
      }
    })

    if (this.limit && formatHtml) {
      this.limit = this.formatActiveSkill(this.limit, nameService, skillService)
    }

    this.activatedSupport.forEach(supportNode => {
      if (supportNode !== "0") {
        this.board.nodes[supportNode].skill.level = this.board.nodes[supportNode].level
        if (formatHtml) {
          this.board.nodes[supportNode].skill = this.formatActiveSkill(this.board.nodes[supportNode].skill, nameService, skillService)
        }
      }
    })

    if (this.activatedCounter !== "0") {
      this.board.nodes[this.activatedCounter].skill.level = this.board.nodes[this.activatedCounter].level
      if (formatHtml) {
        this.board.nodes[this.activatedCounter].skill = this.formatActiveSkill(this.board.nodes[this.activatedCounter].skill, nameService, skillService)
      }
    }
  }

  private formatActiveSkill(skill, nameService = null, skillService = null) {
    skill.name = nameService.getName(skill)

    skill.effects.forEach(effect => {
      effect.formatHtml = skillService.formatEffect(this, skill, effect);
    });

    skill.damageHtml = skillService.formatDamage(this, skill, skill.damage);

    skillService.formatRange(this, skill);

    return skill
  }

  getAvailableSupportNodes(pos, nameService) {
    let nodes = []

    Object.keys(this.board.nodes).forEach(nodeId => {
      let node = this.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "support" && this.activatedSupport[(pos == 0 ? 1 : 0)] !== nodeId) {
        nodes.push({
          nodeId: nodeId.toString(),
          name: nameService.getName(node.skill)
        })
      }
    })

    return nodes
  }

  getAvailableCounterNodes(nameService) {
    let nodes = []

    Object.keys(this.board.nodes).forEach(nodeId => {
      let node = this.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "counter") {
        nodes.push({
          nodeId: nodeId.toString(),
          name: nameService.getName(node.skill)
        })
      }
    })

    return nodes
  }

  private updateSupportAndCounterSkills() {
    this.activatedSupport.forEach((supportNode, supportIndex) => {
      if (!this.board.nodes[supportNode] || this.board.nodes[supportNode].level == 0) {
        this.activatedSupport[supportIndex] = "0"
      }
    })

    if (!this.board.nodes[this.activatedCounter] || this.board.nodes[this.activatedCounter].level == 0) {
      this.activatedCounter = "0"
    }
  }

  getAvailableStatType() {
    let statsAtkRes = [
      "FIRE",
      "ICE",
      "EARTH",
      "WIND",
      "LIGHTNING",
      "WATER",
      "LIGHT",
      "DARK",
      "SLASH",
      "PIERCE",
      "STRIKE",
      "MISSILE",
      "MAGIC"
    ]

    let statsType = [
      "HP",
      "TP",
      "AP",
      "ATK",
      "DEF",
      "SPR",
      "MAG",
      "DEX",
      "AGI",
      "LUCK",
      "MOVE",
      "JUMP"
    ]

    let filteredStats = [
      "INITIAL_AP"
    ]

    let statsOrder = [
      "FIRE_RES",
      "ICE_RES",
      "EARTH_RES",
      "WIND_RES",
      "LIGHTNING_RES",
      "WATER_RES",
      "LIGHT_RES",
      "DARK_RES",
      "SLASH_RES",
      "PIERCE_RES",
      "STRIKE_RES",
      "MISSILE_RES",
      "MAGIC_RES",
      "FIRE_ATK",
      "ICE_ATK",
      "EARTH_ATK",
      "WIND_ATK",
      "LIGHTNING_ATK",
      "WATER_ATK",
      "LIGHT_ATK",
      "DARK_ATK",
      "SLASH_ATK",
      "PIERCE_ATK",
      "STRIKE_ATK",
      "MISSILE_ATK",
      "MAGIC_ATK",
      "ACCURACY",
      "CRITIC_RATE",
      "CRITIC_AVOID",
      "EVADE",
      "POISON",
      "BLIND",
      "SLEEP",
      "SILENCE",
      "PARALYZE",
      "CONFUSION",
      "PETRIFY",
      "TOAD",
      "CHARM",
      "SLOW",
      "STOP",
      "IMMOBILIZE",
      "DISABLE",
      "BERSERK",
      "DOOM",
    ]

    let findedStats = []
    Object.keys(this.stats).forEach(statType => {
      if (statsAtkRes.indexOf(statType) === -1 && statsType.indexOf(statType) === -1) {
        findedStats.push(statType)
      }
    })

    Object.keys(this.board.nodes).forEach(nodeId => {
      let skill = this.board.nodes[nodeId].skill
      this.board.nodes[nodeId].skill.effects.forEach(effect => {
        if (findedStats.indexOf(effect.type) === -1) {
          if (skill.type === "buff" || (skill.type === "support" && this.activatedSupport.indexOf(nodeId) != -1)) {
            if (statsType.indexOf(effect.type) === -1) {
              if (!this.stats[effect.type]) {
                this.stats[effect.type] = {}
              }

              findedStats.push(effect.type)
            }
          }
        }
      })
    })

    let availableStats = [];
    let addedStats = []
    let i = 0;

    statsOrder.forEach(statType => {
      if (findedStats.indexOf(statType) !== -1) {
        availableStats.push(statType)
        addedStats.push(statType)
      }
    })

    Object.keys(this.stats).forEach(statType => {
      if (addedStats.indexOf(statType) === -1
        && statsAtkRes.indexOf(statType) === -1
        && statsType.indexOf(statType) === -1
        && filteredStats.indexOf(statType) === -1
      ) {
        availableStats.push(statType)
      }
    })

    return availableStats;
  }

  getAvailableEquipments(pos, equipmentService) {
    let armorTypes = []

    this.jobsData[0].equipments.armors.forEach(type => {
      if (type !== "ACC") {
        armorTypes.push(type)
      }
    })

    let weaponsTypes = []
    this.jobsData[0].equipments.weapons.forEach(type => {
      weaponsTypes.push(type)
    })

    let hasArmor = false
    let hasWeapon = false
    let countAcc = 0
    let hasTmr = false;
    for (let i = 0; i <= 2; i++) {
      if (i !== pos && this.equipments && this.equipments[i]) {
        if (this.equipments[i].type === "ACC") {
          countAcc++
        } else if (equipmentService.isArmor(this.equipments[i].type)) {
          hasArmor = true
        } else {
          hasWeapon = true
        }

        if (this.equipments[i].acquisition && this.equipments[i].acquisition.type === "tmr") {
          hasTmr = true
        }
      }
    }

    let equipments = equipmentService.getEquipmentsForUnitBuilder()
    let availableEquipments = []
    let mainJob = this.jobs[0].split("_")
    mainJob = mainJob[0] + "_" + mainJob[1] + "_" + mainJob[2]
    equipments.forEach(equipment => {
      if (((countAcc < 3 && equipment.type === "ACC")
        || (!hasArmor && armorTypes.indexOf(equipment.type) !== -1)
        || (!hasWeapon && weaponsTypes.indexOf(equipment.type) !== -1))
        && (
          (!hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr" || (equipment.acquisition.type === "tmr" && this.lb >= 4))
          || (hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr"))))
      ) {
        let jobs = []
        equipment.equippableJobs.forEach(job => {
          let tableJob = job.split("_")
          jobs.push(tableJob[0] + "_" + tableJob[1] + "_" + tableJob[2])
        })

        if (jobs.indexOf(mainJob) != -1 || equipment.equippableUnits.indexOf(this.dataId) != -1) {
          availableEquipments.push(equipment)
        }
      }
    })

    return availableEquipments
  }

  updateCost() {
    this.calcCost = {
      baseTotal: this.cost,
      esper: this.esper ? this.esper.cost : 0,
      card: this.card ? this.card.cost : 0
    }

    this.calcCost.total = this.calcCost.baseTotal + this.calcCost.esper + this.calcCost.card
  }
}
