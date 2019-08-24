export const MONSTERS: any[] = [
  {
    id: 1,
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
    id: 96,
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
    breaks: {
      def: false,
      spr: false
    },
    type: "indignant"
  },
  {
    id: 15,
    names:{
      en: "Intangir"
    },
    stats: {
      def: {
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
    id: 16,
    names:{
      en: "Brachiosaur"
    },
    stats: {
      def: {
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
    id: 17,
    names:{
      en: "Demon Chimera"
    },
    stats: {
      def: {
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
    id: 18,
    names:{
      en: "White Dragon+"
    },
    stats: {
      def: {
        breakable:375
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
    id: 19,
    names:{
      en: "Dark Shiva"
    },
    stats: {
      def: {
        breakable: 30 ,spr:2000,"spr%":30
      },
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
    }
  },
  {
    id: 20,
    names:{
      en: "Dark Golem"
    },
    stats: {
      def: {
        breakable: 30 ,spr:100,"spr%":30
      },
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
    }
  },
  {
    id: 21,
    names:{
      en: "Calcabrina"
    },
    stats: {
      def: {
        breakable: 2000
      }
    },
    races:[
      "demon",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 22,
    names:{
      en: "Calca"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 23,
    names:{
      en: "Brina"
    },
    stats: {
      def: {
        breakable: 150
      },
    },
    races:[
      "demon",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 24,
    names:{
      en: "Great Malboro"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 25,
    names:{
      en: "Malboro Queen"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 26,
    names:{
      en: "Omega"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 27,
    names:{
      en: "Mom Bomb"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 28,
    names:{
      en: "Dad Bomb"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 29,
    names:{
      en: "Iron Giant"
    },
    stats: {
      def: {
        breakable: 35
      },
    },
    races:[
      "human"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 30,
    names:{
      en: "Elafikeras"
    },
    stats: {
      def: {
        breakable: 45, "mag":500, spr:15,
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
    }
  },
  {
    id: 31,
    names:{
      en: "Glacial"
    },
    stats: {
      def: {
        breakable: 15, "mag":450, spr:15
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
      },"special":["Resistant to ATK/DEF/SPR break (50%)"]},
  {
    id: 32,
    names:{
      en: "Glacon"
    },
    stats: {
      def: {
        breakable: 3, "mag":400, spr:15
      }
    },
    races: [
      "spirit"
    ],
    resistances: {
      fire: -1000,
      ice: 300,
      water: 300
    },
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 33,
    names:{
      en: "Bloody Moon"
    },
    stats: {
      def: {
        breakable: 199, "mag":450, spr:150
      }
    },
    races: [
      "demon",
      "spirit"
    ]
  },
  {
    id: 34,
    names:{
      en: "Great Malboro"
    },
    stats: {
      def: {
        breakable: 20000, "mag":405, spr:20000
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
    }
  },
  {
    id: 35,
    names:{
      en: "Malboro"
    },
    stats: {
      def: {
        breakable: 175, "mag":400, spr:175
      }
    },
    races: [
      "demon",
      "plant"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 36,
    names:{
      en: "Aigaion"
    },
    stats: {
      def: {
        breakable: 150, "mag":400, spr:150
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
    }
  },
  {
    id: 37,
    names:{
      en: "Aigaion Left Arm"
    },
    stats: {
      def: {
        breakable: 150, "mag":400, spr:150
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
    }
  },
  {
    id: 38,
    names:{
      en: "Aigaion Right Arm"
    },
    stats: {
      def: {
        breakable: 150, "mag":400, spr:150
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
    }
  },
  {
    id: 39,
    names:{
      en: "Orthros P1"
    },
    stats: {
      def: {
        breakable: 450, "mag":400, spr:120
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
    }
  },
  {
    id: 40,
    names:{
      en: "Orthros P2"
    },
    stats: {
      def: {
        breakable: 600, "mag":300, spr:120
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
    }
  },
  {
    id: 41,
    names:{
      en: "Typhon"
    },
    stats: {
      def: {
        breakable: 100, "mag":250, spr:600
      }
    },
    races: [
      "demon"
    ],
    resistances: {
      fire: 200,
      ice: -50,
      water: -50
    }
  },
  {
    id: 42,
    names:{
      en: "Echidna"
    },
    stats: {
      def: {
        breakable: 10, "mag":300, spr:50
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
    }
  },
  {
    id: 43,
    names:{
      en: "Dark Siren"
    },
    stats: {
      def: {
        breakable: 180, "mag":455, spr:205
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
    }
  },
  {
    id: 44,
    names:{
      en: "Dark Ifrit"
    },
    stats: {
      def: {
        breakable: 180, "mag":455, spr:205
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
    }
  },
  {
    id: 45,
    names:{
      en: "Gilgamesh"
    },
    stats: {
      def: {
        breakable:  170, "mag":345, spr:240
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
    }
  },
  {
    id: 46,
    names:{
      en: "2-Headed Dragon"
    },
    stats: {
      def: {
        breakable:  15, "mag":260, spr:125
      }
    },
    races: [
      "dragon"
    ],
    resistances: {
      fire: 50,
      lightning: 50,
      water: 50,
      wind: 50,
      earth: 50,
      light: 50,
      dark: 80
    },
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 47,
    names:{
      en: "Antenolla A (Flower)"
    },
    stats: {
      def: {
        breakable: 10, "mag":280, spr:120
      }
    },
    races: [
      "plant"
    ],
    resistances: {
      fire: 100,
      ice: 100,
      water: 100,
      wind: -50
    },
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 48,
    names:{
      en: "Antenolla B (Ivy)"
    },
    stats: {
      def: {
        breakable: 10, "mag":25, spr:120
      }
    },
    races: [
      "plant"
    ],
    resistances: {
      ice: 100,
      lightning: 100,
      water: -50,
      wind: 100,
      dark: -50
    },
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 49,
    names:{
      en: "Antenolla C (Root)"
    },
    stats: {
      def: {
        breakable: 10, "mag":250, spr:120
      }
    },
    races: [
      "plant"
    ],
    resistances: {
      fire: 100,
      lightning: 100,
      water: 100,
      wind: 100,
      earth: -50
    },
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 50,
    names:{
      en: "Antenolla D (Leaves)"
    },
    stats: {
      def: {
        breakable: 10, "mag":250, spr:120
      }
    },
    races: [
      "plant"
    ],
    resistances: {
      fire: 100,
      ice: 100,
      lightning: 100,
      water: 100,
      wind: 100,
      earth: -50
    },
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 51,
    names:{
      en: "Warden Welter"
    },
    stats: {
      def: {
        breakable: 50,"mag":600, "mag%":50 ,spr:300,"spr%":50
      },
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
    }
  },
  {
    id: 52,
    names:{
      en: "Nunki"
    },
    stats: {
      def: {
        breakable: 0,"mag":950, "mag%":0 ,spr:1400,"spr%":0
      },
    },
    races:[
      "human",
      "dragon"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 53,
    names:{
      en: "Dabih"
    },
    stats: {
      def: {
        breakable: 0,"mag":950, "mag%":0 ,spr:200,"spr%":0
      },
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
    }
  },
  {
    id: 54,
    names:{
      en: "Dabih Cultist A"
    },
    stats: {
      def: {
        breakable: 0,"mag":700, "mag%":0 ,spr:150,"spr%":0
      },
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
    }
  },
  {
    id: 55,
    names:{
      en: "Dabih Shaman A"
    },
    stats: {
      def: {
        breakable: 0,"mag":700, "mag%":0 ,spr:1200,"spr%":0
      },
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
    }
  },
  {
    id: 56,
    names:{
      en: "Dabih Cultist B"
    },
    stats: {
      def: {
        breakable: 0,"mag":700, "mag%":0 ,spr:150,"spr%":0
      },
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
    }
  },
  {
    id: 57,
    names:{
      en: "Dabih Shaman B"
    },
    stats: {
      def: {
        breakable: 0,"mag":700, "mag%":0 ,spr:1200,"spr%":0
      },
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
    }
  },
  {
    id: 58,
    names:{
      en: "Sadalsuud"
    },
    stats: {
      def: {
        breakable: 0,"mag":1000, "mag%":0 ,spr:550,"spr%":0
      },
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
    }
  },
  {
    id: 59,
    names:{
      en: "Red Wing"
    },
    stats: {
      def: {
        breakable: 0,"mag":500, "mag%":0 ,spr:150,"spr%":0
      },
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
    }
  },
  {
    id: 60,
    names:{
      en: "Orange Wing"
    },
    stats: {
      def: {
        breakable: 0,"mag":500, "mag%":0 ,spr:150,"spr%":0
      },
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
    }
  },
  {
    id: 61,
    names:{
      en: "Blue Wing"
    },
    stats: {
      def: {
        breakable: 0,"mag":500, "mag%":0 ,spr:150,"spr%":0
      },
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
    }
  },
  {
    id: 62,
    names:{
      en: "Green Wing"
    },
    stats: {
      def: {
        breakable: 0,"mag":500, "mag%":0 ,spr:150,"spr%":0
      },
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
    }
  },
  {
    id: 63,
    names:{
      en: "Alpherg"
    },
    stats: {
      def: {
        breakable: 0,"mag":500, "mag%":50 ,spr:300,"spr%":0
      },
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
    }
  },
  {
    id: 64,
    names:{
      en: "Shaula"
    },
    stats: {
      def: {
        breakable: 300
      },
    },
    races:[
      "bug",
      "spirit"
    ],
    breaks: {
      def: false,
      spr: false
    }
  },
  {
    id: 65,
    names:{
      en: "Shaula's Right Arm"
    },
    stats: {
      def: {
        breakable: 300
      },
    },
    races:[
      "bug",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 66,
    names:{
      en: "Shaula's Left Arm"
    },
    stats: {
      def: {
        breakable: 300
      },
    },
    races:[
      "bug",
      "spirit"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 67,
    names:{
      en: "Brachium"
    },
    stats: {
      def: {
        breakable: 300
      },
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
    }
  },
  {
    id: 68,
    names:{
      en: "Vindemiatrix"
    },
    stats: {
      def: {
        breakable: 240
      },
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
    }
  },
  {
    id: 69,
    names:{
      en: "Aldhafera"
    },
    stats: {
      def: {
        breakable: 350
      },
    },
    races:[
      "beast",
      "human"
    ],
    breaks: {
      def: true,
      spr: true
    }
  },
  {
    id: 70,
    names:{
      en: "Tegmine"
    },
    stats: {
      def: {
        breakable: 240
      },
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
    }
  },
  {
    id: 71,
    names:{
      en: "Alhena"
    },
    stats: {
      def: {
        breakable: 120
      },
    },
    races:[
      "human",
      "undead"
    ],
    breaks: {
      def: false,
      spr: false
    }
  },
  {
    id: 72,
    names:{
      en: "Elnath"
    },
    stats: {
      def: {
        breakable: 170, "mag":700, spr:120
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
    }
  },
  {
    id: 73,
    names:{
      en: "Elnath - Left Arm"
    },
    stats: {
      def: {
        breakable: 199, "mag":500, spr:75
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
    }
  },
  {
    id: 74,
    names:{
      en: "Elnath - Right Arm"
    },
    stats: {
      def: {
        breakable: 130, "mag":500, spr:999
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
    }
  },
  {
    id: 75,
    names:{
      en: "Sheratan"
    },
    stats: {
      def: {
        breakable: 170, "mag":700, spr:120
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
    }
  },
  {
    id: 76,
    names:{
      en: "Fruit of Tenacity"
    },
    stats: {
      def: {
        breakable: 130, "mag":500, spr:75
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
    }
  },
  {
    id: 77,
    names:{
      en: "Fruit of Anger"
    },
    stats: {
      def: {
        breakable: 130, "mag":500, spr:75
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
    }
  },
  {
    id: 78,
    names:{
      en: "Asura"
    },
    stats: {
      def: {
        breakable: 100
      },
    },
    races:[
      "human"
    ],
    breaks: {
      def: false,
      spr: false
    }
  },
  {
    id: 79,
    names:{
      en: "Anime 2*"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 80,
    names:{
      en: "Alexander 3*"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 81,
    names:{
      en: "Phoenix 3*"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 82,
    names:{
      en: "Leviathan 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 83,
    names:{
      en: "Odin 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 84,
    names:{
      en: "Diabolos 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 85,
    names:{
      en: "Tetra Sylphid 3★"
    },
    stats: {
      def: {
        breakable: 700
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
    }
  },
  {
    id: 86,
    names:{
      en: "Carbuncle 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 87,
    names:{
      en: "Golem 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 88,
    names:{
      en: "Ramuh 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 89,
    names:{
      en: "Shiva 3★"
    },
    stats: {
      def: {
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
    }
  },
  {
    id: 90,
    names:{
      en: "Ifrit 3★"
    },
    stats: {
      def: {
        breakable: 10, "mag":550, spr:30
      }
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
    }
  },
  {
    id: 91,
    names:{
      en: "Siren 3★"
    },
    stats: {
      def: {
        breakable: 150, "mag":340, spr:220
      }
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
    }
  },
  {
    id: 92,
    names:{
      en: "Bahamut"
    },
    stats: {
      def: {
        breakable: 10, "mag":760, spr:25
      }
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
    }
  },
  {
    id: 93,
    names:{
      en: "Bennu"
    },
    stats: {
      def: {
        breakable: 63, "def%":50, "mag":720, "mag%":50, spr:48, "spr%":50
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
    id: 94,
    names:{
      en: "Undine"
    },
    stats: {
      def: {
        breakable: 15, "mag":699, spr:44
      }
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
    id: 95,
    names:{
      en: "Abominable Wooden Soldier"
    },
    stats: {
      def: {
        breakable: 15, "mag":1, spr:25
      }
    },
    races: [
      "human"
    ],
    breaks: {
      def: false,
      spr: false
    },
    type: "madam"
  }
]
