export const MONSTERS: any[] = [
  {
    id: 0,
    names:{
      en: "Calculator"
    },
    stats: {
      def: {
        breakable: 1
      },
      spr: {
        breakable: 1
      }
    },
    races: [],
    breaks: {
      def: true,
      spr: true
    },
    type: "wooden"
  },
  {
    id: 1,
    names:{
      en: "Abominable Wooden Soldier"
    },
    stats: {
      def: {
        breakable: 25
      },
      spr: {
        breakable: 25
      }
    },
    races: [
      "human"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "wooden"
  },
  {
    id: 100,
    names: {
      en: "Eggsecutioner Eggstraordinaire"
    },
    stats: {
      def: {
        breakable: 2000
      },
      spr: {
        breakable: 5000
      }
    },
    races: [
      "stone"
    ],
    resistances: {
      fire: 100,
      ice: 100,
      lightning: 50,
      water: 100,
      earth: 100,
      wind: 100,
      light: 100,
      dark: 100
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "vengeful"
  },
  {
    id: 2,
    names:{
      en: "Lich P3"
    },
    stats: {
      def: {
        breakable: 360,
        unbreakable: 216
      },
      spr: {
        breakable: 300,
        unbreakable: 180
      }
    },
    races:[
      "undead"
    ],
    resistances: {
      fire: -30,
      earth: 999,
      light: -30,
      dark: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 3,
    names:{
      en: "Orthros (First Wave)"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 250
      }
    },
    races:[
      "aquatic"
    ],
    resistances: {
      water: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 4,
    names:{
      en: "Orthros (Second Wave)"
    },
    stats: {
      def: {
        breakable: 360
      },
      spr: {
        breakable: 350
      }
    },
    races:[
      "aquatic"
    ],
    resistances: {
      water: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 5,
    names:{
      en: "Typhon (Second Wave)"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 450
      }
    },
    races:[
      "demon"
    ],
    resistances: {
      fire: 999,
      ice: -50,
      water: -50
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 6,
    names:{
      en: "Dark Siren"
    },
    stats: {
      def: {
        breakable: 430,
        unbreakable: 258
      },
      spr: {
        breakable: 400,
        unbreakable: 240
      }
    },
    races:[
      "bird"
    ],
    resistances: {
      lightning: -300,
      water: 999,
      dark: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 7,
    names:{
      en: "Dark Ifrit"
    },
    stats: {
      def: {
        breakable: 380,
        unbreakable: 228
      },
      spr: {
        breakable: 360,
        unbreakable: 216
      }
    },
    races:[
      "beast"
    ],
    resistances: {
      fire: 999,
      water: -300,
      dark: 999
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "indignant"
  },
  {
    id: 8,
    names:{
      en: "Gilgamesh"
    },
    stats: {
      def: {
        breakable: 370
      },
      spr: {
        breakable: 375
      }
    },
    races:[
      "human"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 9,
    names:{
      en: "Europa"
    },
    stats: {
      def: {
        breakable: 230
      },
      spr: {
        breakable: 210
      }
    },
    races:[
      "machine"
    ],
    resistances: {
      ice: 999,
      water: 999,
      wind: 999,
      light: 999,
      dark: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 10,
    names:{
      en: "Two-Headed Dragon"
    },
    stats: {
      def: {
        breakable: 105
      },
      spr: {
        breakable: 105
      }
    },
    races:[
      "dragon"
    ],
    resistances: {
      fire: 300,
      ice: 300,
      lightning: 300,
      water: 300,
      earth: 300,
      wind: 300,
      light: 300,
      dark: 300
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 11,
    names:{
      en: "Antenolla A (Flower)"
    },
    stats: {
      def: {
        breakable: 80
      },
      spr: {
        breakable: 50
      }
    },
    races:[
      "plant"
    ],
    resistances: {
      fire: 100,
      ice: -50,
      lightning: 100,
      water: 999,
      earth: 999,
      wind: 100,
      light: 100
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 12,
    names:{
      en: "Antenolla B (Ivy)"
    },
    stats: {
      def: {
        breakable: 110
      },
      spr: {
        breakable: 40
      }
    },
    races:[
      "plant"],
    resistances: {
      fire: -50,
      ice: 100,
      lightning: 300,
      water: 999,
      earth: 999,
      wind: 100
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "indignant"
  },
  {
    id: 13,
    names:{
      en: "Antenolla C (Root)"
    },
    stats: {
      def: {
        breakable: 65
      },
      spr: {
        breakable: 60
      }
    },
    races:[
      "plant"],
    resistances: {
      fire: 100,
      ice: 100,
      water: 999,
      earth: 999,
      wind: -50,
      dark: 300
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "indignant"
  },
  {
    id: 14,
    names:{
      en: "Antenolla D (Leaves)"
    },
    stats: {
      def: {
        breakable: 60
      },
      spr: {
        breakable: 30
      }
    },
    races:[
      "plant"
    ],
    resistances: {
      ice: 100,
      lightning: 100,
      water: 999,
      earth: 999,
      wind: 300,
      light: 100,
      dark: -50
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 15,
    names:{
      en: "Greater Demon lv. 99"
    },
    stats: {
      def: {
        breakable: 115
      },
      spr: {
        breakable: 60
      }
    },
    races:[
      "demon"
    ],
    resistances: {
      light: -50,
      dark: 100
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 16,
    names:{
      en: "Intangir"
    },
    stats: {
      def: {
        breakable: 80
      },
      spr: {
        breakable: 35
      }
    },
    races:[
      "beast"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 17,
    names:{
      en: "Brachiosaur"
    },
    stats: {
      def: {
        breakable: 560
      },
      spr: {
        breakable: 448
      },
    },
    races:[
      "dragon"
    ],
    resistances: {
      ice: -50
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "indignant"
  },
  {
    id: 18,
    names:{
      en: "Demon Chimera"
    },
    stats: {
      def: {
        breakable: 400
      },
      spr: {
        breakable: 352
      },
    },
    races:[
      "beast"
    ],
    resistances: {
      fire: 300,
      ice: 300,
      lightning: 300,
      light: 300,
      dark: 300
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "indignant"
  },
  {
    id: 19,
    names:{
      en: "White Dragon"
    },
    stats: {
      def: {
        breakable: 375
      },
      spr: {
        breakable: 330
      }
    },
    races: [
      "dragon"
    ],
    resistances: {
      light: 300,
      dark: 300
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "indignant"
  },
  {
    id: 20,
    names:{
      en: "Dark Shiva"
    },
    stats: {
      def: {
        breakable: 200,
        unbreakable: 60
      },
      spr: {
        breakable: 2000,
        unbreakable: 600
      }
    },
    races:[
      "human"
    ],
    resistances: {
      fire: -700,
      ice: 999,
      dark: 999
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 21,
    names:{
      en: "Dark Golem"
    },
    stats: {
      def: {
        breakable: 600,
        unbreakable: 180
      },
      spr: {
        breakable: 100,
        unbreakable: 30
      }
    },
    races:[
      "stone"
    ],
    resistances: {
      wind: -700,
      earth: 999,
      dark: 999
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 22,
    names:{
      en: "Calcabrina"
    },
    stats: {
      def: {
        breakable: 100,
        unbreakable: 30
      },
      spr: {
        breakable: 2000,
        unbreakable: 600
      }
    },
    races:[
      "demon",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 23,
    names:{
      en: "Calca"
    },
    stats: {
      def: {
        breakable: 2000
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "demon",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 24,
    names:{
      en: "Brina"
    },
    stats: {
      def: {
        breakable: 2000
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "demon",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 25,
    names:{
      en: "Great Malboro"
    },
    stats: {
      def: {
        breakable: 2000
      },
      spr: {
        breakable: 200
      },
    },
    races:[
      "plant"
    ],
    resistances: {
      fire: -100,
      ice: 300,
      water: 999,
      earth: 999,
      light: 300,
      dark: 300
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 26,
    names:{
      en: "Malboro Queen"
    },
    stats: {
      def: {
        breakable: 200
      },
      spr: {
        breakable: 2000
      },
    },
    races:[
      "plant"
    ],
    resistances: {
      fire: -100,
      ice: 300,
      water: 999,
      earth: 999,
      light: 300,
      dark: 300
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 27,
    names:{
      en: "Omega"
    },
    stats: {
      def: {
        breakable: 250
      },
      spr: {
        breakable: 150
      },
    },
    races:[
      "machine"
    ],
    resistances: {
      fire: 999,
      ice: 999,
      lightning: -300,
      water: 999,
      earth: 999,
      wind: 999,
      light: 999,
      dark: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 28,
    names:{
      en: "Mom Bomb"
    },
    stats: {
      def: {
        breakable: 60
      },
      spr: {
        breakable: 60
      }
    },
    races:[
      "demon"],
    resistances: {
      fire: 999,
      ice: -750,
      lightning: 300,
      water: 300,
      earth: 300,
      wind: 300,
      light: 300,
      dark: 300
    },
    breaks: {
     def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 29,
    names:{
      en: "Dad Bomb"
    },
    stats: {
      def: {
        breakable: 60
      },
      spr: {
        breakable: 60
      },
    },
    races:[
      "demon"
    ],
    resistances: {
      fire: -750,
      ice: 999,
      lightning: 300,
      water: 300,
      earth: 300,
      wind: 300,
      light: 300,
      dark: 300
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 30,
    names:{
      en: "Iron Giant"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 35
      },
    },
    races:[
      "human"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 31,
    names:{
      en: "Elafikeras"
    },
    stats: {
      def: {
        breakable: 45
      },
      spr: {
        breakable: 15,
      }
    },
    races: [
      "beast",
      "stone"
    ],
    resistances: {
      earth: 300,
      wind: -50
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 32,
    names:{
      en: "Glacial"
    },
    stats: {
      def: {
        breakable: 15
      },
      spr: {
        breakable: 15
      }
    },
    races: [
      "bird",
      "spirit"
    ],
    resistances: {
      fire: -1000,
      ice: 300,
      water: 300
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 33,
    names:{
      en: "Bloody Moon"
    },
    stats: {
      def: {
        breakable: 999
      },
      spr: {
        breakable: 150
      }
    },
    races: [
      "demon",
      "spirit"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "fallen"
  },
  {
    id: 34,
    names:{
      en: "Great Malboro"
    },
    stats: {
      def: {
        breakable: 20000
      },
      spr: {
        breakable: 20000,
      }
    },
    races: [
      "demon",
      "plant"
    ],
    resistances: {
      light: 50,
      dark: 50
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 35,
    names:{
      en: "Malboro"
    },
    stats: {
      def: {
        breakable: 175
      },
      spr: {
        breakable: 175
      }
    },
    races: [
      "demon",
      "plant"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 36,
    names:{
      en: "Aigaion"
    },
    stats: {
      def: {
        breakable: 150
      },
      spr: {
        breakable: 150
      }
    },
    races: [
      "machine"
    ],
    resistances: {
      lightning: 50,
      wind: 50,
      light: 100,
      dark: 100
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 37,
    names:{
      en: "Aigaion Left Arm"
    },
    stats: {
      def: {
        breakable: 150
      },
      spr: {
        breakable: 150
      }
    },
    races: [
      "machine"
    ],
    resistances: {
      ice: 50,
      lightning: -50,
      wind: 50,
      light: 100,
      dark: 100
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 38,
    names:{
      en: "Aigaion Right Arm"
    },
    stats: {
      def: {
        breakable: 150
      },
      spr: {
        breakable: 150
      }
    },
    races: [
      "machine"
    ],
    resistances: {
      ice: 50,
      lightning: 50,
      wind: -50,
      light: 100,
      dark: 100
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 39,
    names:{
      en: "Orthros P1"
    },
    stats: {
      def: {
        breakable: 450
      },
      spr: {
        breakable: 120
      }
    },
    races: [
      "aquatic"
    ],
    resistances: {
      fire: -50,
      lightning: -50,
      water: 200
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 40,
    names:{
      en: "Orthros P2"
    },
    stats: {
      def: {
        breakable: 600
      },
      spr: {
        breakable: 120
      }
    },
    races: [
      "aquatic"
    ],
    resistances: {
      fire: -50,
      lightning: -50,
      water: 200
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 41,
    names:{
      en: "Typhon"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 600
      }
    },
    races: [
      "demon"
    ],
    resistances: {
      fire: 200,
      ice: -50,
      water: -50
    },
    type: "fallen"
  },
  {
    id: 42,
    names:{
      en: "Echidna"
    },
    stats: {
      def: {
        breakable: 50
      },
      spr: {
        breakable: 50
      }
    },
    races: [
      "demon"
    ],
    resistances: {
      wind: 50,
      earth: 50,
      light: 50,
      dark: 50
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 43,
    names:{
      en: "Dark Siren"
    },
    stats: {
      def: {
        breakable: 280
      },
      spr: {
        breakable: 205
      }
    },
    races: [
      "bird"
    ],
    resistances: {
      fire: -50,
      ice: 200,
      water: 200,
      dark: 200
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 44,
    names:{
      en: "Dark Ifrit"
    },
    stats: {
      def: {
        breakable: 280
      },
      spr: {
        breakable: 205
      }
    },
    races: [
      "beast"
    ],
    resistances: {
      fire: 200,
      ice: -50,
      dark: 200
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 45,
    names:{
      en: "Gilgamesh"
    },
    stats: {
      def: {
        breakable: 270
      },
      spr: {
        breakable: 240
      }
    },
    races: [
      "human"
    ],
    resistances: {
      fire: -10,
      lightning: -10,
      water: -10,
      wind: -10,
      earth: -10,
      light: -10
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "fallen"
  },
  {
    id: 46,
    names:{
      en: "Warden Welter"
    },
    stats: {
      def: {
        breakable: 500,
        unbreakable: 250
      },
      spr: {
        breakable: 300,
        unbreakable: 150
      }
    },
    races:[
      "demon",
      "human"
    ],
    resistances: {
      light: 999,
      dark: 999
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 47,
    names:{
      en: "Nunki"
    },
    stats: {
      def: {
        breakable: 1400
      },
      spr: {
        breakable: 1400
      }
    },
    races:[
      "human",
      "dragon"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 48,
    names:{
      en: "Dabih"
    },
    stats: {
      def: {
        breakable: 200
      },
      spr: {
        breakable: 200
      }
    },
    races:[
      "human",
      "undead"
    ],
    resistances: {
      fire: 999,
      ice: -100,
      light: -100,
      dark: 999
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 49,
    names:{
      en: "Dabih Cultist A"
    },
    stats: {
      def: {
        breakable: 1200
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "human",
      "undead"
    ],
    resistances: {
      fire: 99,
      ice: 99,
      lightning: 99,
      water: 99,
      earth: 99,
      wind: 99,
      light: 99,
      dark: 99
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 50,
    names:{
      en: "Dabih Shaman A"
    },
    stats: {
      def: {
        breakable: 200
      },
      spr: {
        breakable: 1200
      }
    },
    races:[
      "human",
      "undead"
    ],
    resistances: {
      fire: 99,
      ice: 99,
      lightning: 99,
      water: 99,
      earth: 99,
      wind: 99,
      light: 99,
      dark: 99
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 51,
    names:{
      en: "Dabih Cultist B"
    },
    stats: {
      def: {
        breakable: 1200
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "human",
      "undead"
    ],
    resistances: {
      fire: 99,
      ice: 99,
      lightning: 99,
      water: 99,
      earth: 99,
      wind: 99,
      light: 99,
      dark: 99
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 52,
    names:{
      en: "Dabih Shaman B"
    },
    stats: {
      def: {
        breakable: 200
      },
      spr: {
        breakable: 1200
      }
    },
    races:[
      "human",
      "undead"
    ],
    resistances: {
      fire: 99,
      ice: 99,
      lightning: 99,
      water: 99,
      earth: 99,
      wind: 99,
      light: 99,
      dark: 99
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 53,
    names:{
      en: "Sadalsuud"
    },
    stats: {
      def: {
        breakable: 550
      },
      spr: {
        breakable: 550
      }
    },
    races:[
      "bird",
      "demon"
    ],
    resistances: {
      fire: -200,
      ice: -200,
      lightning: -200,
      water: -200,
      earth: -200,
      wind: -200,
      light: -200,
      dark: -200
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 54,
    names:{
      en: "Red Wing"
    },
    stats: {
      def: {
        breakable: 1200
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "bird",
      "demon"
    ],
    resistances: {
      fire: 999
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "arms"
  },
  {
    id: 55,
    names:{
      en: "Orange Wing"
    },
    stats: {
      def: {
        breakable: 1200
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "bird",
      "demon"
    ],
    resistances: {
      earth: 999
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "arms"
  },
  {
    id: 56,
    names:{
      en: "Blue Wing"
    },
    stats: {
      def: {
        breakable: 1200
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "bird",
      "demon"
    ],
    resistances: {
      water: 999
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "arms"
  },
  {
    id: 57,
    names:{
      en: "Green Wing"
    },
    stats: {
      def: {
        breakable: 1200
      },
      spr: {
        breakable: 150
      }
    },
    races:[
      "bird",
      "demon"
    ],
    resistances: {
      wind: 999
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "arms"
  },
  {
    id: 58,
    names:{
      en: "Alpherg"
    },
    stats: {
      def: {
        breakable: 500
      },
      spr: {
        breakable: 300
      }
    },
    races:[
      "aquatic",
      "stone"
    ],
    resistances: {
      water: 999,
      earth: 50,
      dark: 50
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 59,
    names:{
      en: "Shaula"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 300
      }
    },
    races:[
      "bug",
      "spirit"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 60,
    names:{
      en: "Shaula's Right Arm"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 300
      }
    },
    races:[
      "bug",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 61,
    names:{
      en: "Shaula's Left Arm"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 300
      }
    },
    races:[
      "bug",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 62,
    names:{
      en: "Brachium"
    },
    stats: {
      def: {
        breakable: 300
      },
      spr: {
        breakable: 300
      }
    },
    races:[
      "demon",
      "human"
    ],
    resistances: {
      dark: 300
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 63,
    names:{
      en: "Vindemiatrix"
    },
    stats: {
      def: {
        breakable: 340
      },
      spr: {
        breakable: 240
      }
    },
    races:[
      "beast",
      "undead"
    ],
    resistances: {
      light: 300
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 64,
    names:{
      en: "Aldhafera"
    },
    stats: {
      def: {
        breakable: 340
      },
      spr: {
        breakable: 350
      }
    },
    races:[
      "beast",
      "human"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 65,
    names:{
      en: "Tegmine"
    },
    stats: {
      def: {
        breakable: 400
      },
      spr: {
        breakable: 240
      }
    },
    races:[
      "stone",
      "undead"
    ],
    resistances: {
      fire: -100,
      ice: -100,
      lightning: -100,
      water: 999,
      earth: -100,
      wind: -100,
      light: 999,
      dark: -100
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "arms"
  },
  {
    id: 66,
    names:{
      en: "Alhena"
    },
    stats: {
      def: {
        breakable: 170
      },
      spr: {
        breakable: 120
      }
    },
    races:[
      "human",
      "undead"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 67,
    names:{
      en: "Elnath"
    },
    stats: {
      def: {
        breakable: 170
      },
      spr: {
        breakable: 120
      }
    },
    races: [
      "human",
      "machine"
    ],
    resistances: {
      lightning: -50
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 68,
    names:{
      en: "Elnath - Left Arm"
    },
    stats: {
      def: {
        breakable: 999
      },
      spr: {
        breakable: 75
      }
    },
    races: [
      "human",
      "machine"
    ],
    resistances: {
      lightning: -50
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "arms"
  },
  {
    id: 69,
    names:{
      en: "Elnath - Right Arm"
    },
    stats: {
      def: {
        breakable: 130
      },
      spr: {
        breakable: 999
      }
    },
    races: [
      "human",
      "machine"
    ],
    resistances: {
      lightning: -50
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "arms"
  },
  {
    id: 70,
    names:{
      en: "Sheratan"
    },
    stats: {
      def: {
        breakable: 170
      },
      spr: {
        breakable: 120
      }
    },
    races: [
      "human",
      "plant"
    ],
    resistances: {
      earth: 100,
      dark: 100
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "arms"
  },
  {
    id: 71,
    names:{
      en: "Fruit of Tenacity"
    },
    stats: {
      def: {
        breakable: 130
      },
      spr: {
        breakable: 75
      }
    },
    races: [
      "plant"
    ],
    resistances: {
      fire: -50,
      light: -50
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 72,
    names:{
      en: "Fruit of Anger"
    },
    stats: {
      def: {
        breakable: 130
      },
      spr: {
        breakable: 75
      }
    },
    races: [
      "plant"
    ],
    resistances: {
      fire: -50,
      wind: -50
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "arms"
  },
  {
    id: 73,
    names:{
      en: "Asura"
    },
    stats: {
      def: {
        breakable: 100
      },
      spr: {
        breakable: 100
      },
    },
    races:[
      "human"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "esper"
  },
  {
    id: 74,
    names:{
      en: "Anime 2*"
    },
    stats: {
      def: {
        breakable: 100
      },
      spr: {
        breakable: 100
      },
    },
    races:[
      "undead"
    ],
    resistances: {
      lightning: -25,
      water: 25,
      light: -50,
      dark: 50
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "esper"
  },
  {
    id: 75,
    names:{
      en: "Alexander 3*"
    },
    stats: {
      def: {
        breakable: 100
      },
      spr: {
        breakable: 100
      },
    },
    races:[
      "machine"
    ],
    resistances: {
      lightning: 999,
      water: -300,
      light: 999,
      dark: -300
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "esper"
  },
  {
    id: 76,
    names:{
      en: "Phoenix 3*"
    },
    stats: {
      def: {
        breakable: 100
      },
      spr: {
        breakable: 100
      },
    },
    races:[
      "bird"
    ],
    resistances: {
      fire: 999,
      ice: -300,
      wind: -300,
      earth: 999
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "esper"
  },
  {
    id: 77,
    names:{
      en: "Leviathan 3★"
    },
    stats: {
      def: {
        breakable: 250
      },
      spr: {
        breakable: 250
      },
    },
    races:[
      "aquatic"
    ],
    resistances: {
      lightning: -100,
      water: 999
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "esper"
  },
  {
    id: 78,
    names:{
      en: "Odin 3★"
    },
    stats: {
      def: {
        breakable: 350
      },
      spr: {
        breakable: 300
      },
    },
    races:[
      "human"
    ],
    resistances: {
      lightning: -100
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "esper"
  },
  {
    id: 79,
    names:{
      en: "Diabolos 3★"
    },
    stats: {
      def: {
        breakable: 170
      },
      spr: {
        breakable: 30
      },
    },
    races:[
      "demon"
    ],
    resistances: {
      light: -100,
      dark: 999
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "esper"
  },
  {
    id: 80,
    names:{
      en: "Tetra Sylphid 3★"
    },
    stats: {
      def: {
        breakable: 50
      },
      spr: {
        breakable: 25
      },
    },
    races:[
      "spirit"
    ],
    resistances: {
      earth: -100,
      wind: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "esper"
  },
  {
    id: 81,
    names:{
      en: "Carbuncle 3★"
    },
    stats: {
      def: {
        breakable: 9999
      },
      spr: {
        breakable: 3000
      },
    },
    races:[
      "beast"
    ],
    resistances: {
      light: 999,
      dark: -100
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "esper"
  },
  {
    id: 82,
    names:{
      en: "Golem 3★"
    },
    stats: {
      def: {
        breakable: 100
      },
      spr: {
        breakable: 25
      },
    },
    races:[
      "stone"
    ],
    resistances: {
      wind: -100,
      earth: 999
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "esper"
  },
  {
    id: 83,
    names:{
      en: "Ramuh 3★"
    },
    stats: {
      def: {
        breakable: 30
      },
      spr: {
        breakable: 30
      },
    },
    races:[
      "human"
    ],
    resistances: {
      lightning: 999,
      water: -100
    },
    breaks: {
      def: true,
      spr: false
    },
    type: "esper"
  },
  {
    id: 84,
    names:{
      en: "Shiva 3★"
    },
    stats: {
      def: {
        breakable: 30
      },
      spr: {
        breakable: 30
      },
    },
    races:[
      "human"
    ],
    resistances: {
      fire: -100,
      ice: 999
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "esper"
  },
  {
    id: 85,
    names:{
      en: "Ifrit 3★"
    },
    stats: {
      def: {
        breakable: 30
      },
      spr: {
        breakable: 30
      },
    },
    races: [
      "beast"
    ],
    resistances: {
      fire: 1000,
      ice: -100
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "esper"
  },
  {
    id: 86,
    names:{
      en: "Siren 3★"
    },
    stats: {
      def: {
        breakable: 250
      },
      spr: {
        breakable: 220
      },
    },
    races: [
      "bird"
    ],
    resistances: {
      lightning: -100,
      water: 1000
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "esper"
  },
  {
    id: 87,
    names:{
      en: "Bahamut"
    },
    stats: {
      def: {
        breakable: 50
      },
      spr: {
        breakable: 25
      },
    },
    races: [
      "dragon"
    ],
    resistances: {
      fire: 50,
      ice: 50,
      lightning: 50,
      water: 50,
      wind: 50,
      earth: 50,
      light: 50,
      dark: 50
    },
    breaks: {
      def: false,
      spr: true
    },
    type: "esper"
  },
  {
    id: 88,
    names:{
      en: "Bennu"
    },
    stats: {
      def: {
        breakable: 63,
        unbreakable: 31
      },
      spr: {
        breakable: 48,
        unbreakable: 24
      },
    },
    races:[
      "bird"
    ],
    breaks: {
      def: true,
      spr: true
    },
    type: "madam"
  },
  {
    id: 89,
    names:{
      en: "Undine"
    },
    stats: {
      def: {
        breakable: 55
      },
      spr: {
        breakable: 44
      },
    },
    races: [
      "spirit"
    ],
    resistances: {
      lightning: -300,
      water: 999
    },
    breaks: {
      def: false,
      spr: false
    },
    type: "madam"
  },
  {
    id: 90,
    names:{
      en: "Delanbo"
    },
    stats: {
      def: {
        breakable: 100
      },
      spr: {
        breakable: 100
      },
    },
    races: [
      "human"
    ],
    resistances: {
      lightning: 300
    },
    breaks: {
      def: true,
      spr: true
    },
    type: "madam"
  }
];
