export const UNITS: any[] = [
  {
    id: 1,
    names: {
      en: 'Tidus',
      fr: 'Tidus',
      tw: '提達',
      es: 'Tidus',
      de: 'Tidus',
      kr: '프리오닐'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Quick Hit',
          fr: 'Attaque éclair',
          tw: '快捷進擊',
          kr: '퀵 트릭',
          de: 'Schneller Treffer',
          es: 'Golpe rápido'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-20',
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 400
      },
      {
        names: {
          en: 'Quick Hit +2 (JP Only)',
          fr: 'Attaque éclair +2 (JP Seulement)',
          tw: '快捷進擊 +2 (JP Only)',
          kr: '퀵 트릭 +2 (JP Only)',
          de: 'Schneller Treffer +2 (JP Only)',
          es: 'Golpe rápido +2 (JP Only)'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-20',
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 720
      },
      {
        names: {
          en: 'Energy Rain',
          fr: 'Déluge d\'énergie',
          tw: '能量雨',
          kr: '에너지 레인',
          de: 'Energieregen',
          es: 'Lluvia de energía'
        },
        linearFrames: false,
        framesList: '0-10-10-10',
        firstHit: 67,
        castTime: 40,
        offset: 16,
        base: 180
      },
      {
        names: {
          en: 'Jecht Shot',
          fr: 'Jecht Shoot',
          tw: '傑克特射門',
          kr: '젝트 슛',
          de: 'Jechtschuss',
          es: 'Chut de Jecht'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: "Blitz Ace",
          tw: "水鬥球王牌",
          kr: "블리츠의 에이스",
          fr: "Champion de blitz",
          de: "Blitzass",
          es: "As del blitzbol"
        },
        linearFrames: false,
        framesList: '0-4-10-4-10-4-4-4-12-4-20-4-14-4-36-150',
        firstHit: 106,
        castTime: 0,
        offset: 0,
        base: 410,
        debuff: {
          water: 100
        },
        dualable: false
      },
    ],
    weapons : [
      'water'
    ]
  },
  {
    id: 2,
    names: {
      en: 'Firion',
      fr: 'Firion',
      tw: '弗利奧尼爾',
      kr: '프리오닐',
      de: 'Firion',
      es: 'Firion'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Fin Briar',
          fr: 'Fin Briar'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 30,
        castTime: 0, //"effect_frames": [[0,  0,  27]],
        offset: 36,
        base: 180,
        ignore: 25
      },
      {
        names: {
          en: 'Fin Briar +2',
          fr: 'Fin Briar +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 30,
        castTime: 0, //"effect_frames": [[0,  0,  27]],
        offset: 36,
        base: 230,
        ignore: 50
      }
    ]
  },
  {
    id: 3,
    names: {
      en: 'Orlandeau',
      fr: 'Orlandeau',
      tw: '奧爾蘭多',
      kr: '올란두',
      de: 'Orlandeau',
      es: 'Orlandeau'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Divine Ruination',
          fr: 'Ruine divine'
        },
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuff: {
          light: 50
        }
      },
      {
        names: {
          en: 'Divine Ruination +2 (JP Only)',
          fr: 'Ruine divine +2 (JP Seulement)'
        },
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 260,
        ignore: 50,
        debuff: {
          light: 50
        }
      }
    ],
    weapons : [
      'light'
    ]
  },
  {
    id: 4,
    names: {
      en: 'Lunera',
      fr: 'Lunera',
      tw: '盧內拉',
      kr: '루네라',
      de: 'Lunera',
      es: 'Lunera'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Aureole Ray',
          fr: 'Rayon auréole'
        },
        linearFrames: false,
        framesList: '0-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          'wind',
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Aureole Ray +2 (JP Only)',
          fr: 'Rayon auréole +2 (JP Seulement)'
        },
        linearFrames: false,
        framesList: '0-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4-4',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400,
        elements: [
          'wind',
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Gleaming Arrow (max)',
          fr: 'Flèche étincelante (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 410,
        castTime: 0,
        offset: 0,
        base: 1500,
        elements : [
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Gail Arrow (max)',
          fr: 'Flèche tornade (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 70,
        castTime: 0,
        offset: 0,
        base: 1500,
        elements : [
          'wind'
        ],
        damage: 'magic',
        dualable: false
      }
    ],
    dual: false
  },
  {
    id: 5,
    names: {
      en: 'Aileen',
      fr: 'Aileen',
      tw: '艾琳',
      kr: '아이린',
      de: 'Aileen',
      es: 'Aileen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Piledriver',
          fr: 'Sonnette'
        },
        linearFrames: false,
        framesList: '0-15-15-15-15',
        firstHit: 2,
        castTime: 0,
        offset: 36,
        base: 200,
        ignore: 50,
        debuff: {
          earth: 50
        }
      },
      {
        names: {
          en: 'Piledriver +2 (JP Only)',
          fr: 'Sonnette +2 (JP Seulement)'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8',
        firstHit: 2,
        castTime: 0,
        offset: 36,
        base: 250,
        ignore: 50,
        debuff: {
          earth: 75
        }
      }
    ],
    weapons : [
      'earth'
    ]
  },
  {
    id: 6,
    names: {
      en: 'Dark Veritas',
      fr: 'Veritas des Ténèbres',
      tw: '常暗之維利亞斯',
      kr: '영원한 어둠의 베리어스',
      de: 'Veritas der Finstere',
      es: 'Veritas el tenebroso'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Dark Punishment',
          fr: 'Punition obscure'
        },
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuff: {
          dark: 50
        }
      },
      {
        names: {
          en: 'Dark Edge',
          fr: 'Entaille obscure'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 110,
        castTime: 40, //"effect_frames": [[0,  0,  40]],
        offset: 16,
        base: 200,
        ignore: 50,
        elements: [
          'dark'
        ]
      }
    ],
    weapons : [
      'dark'
    ]
  },
  {
    id: 7,
    names: {
      en: '2B',
      fr: '2B',
      tw: '2B',
      kr: '2B',
      de: '2B',
      es: '2B'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Avoid Attack',
          fr: 'Esquiver Attaque'
        },
        linearFrames: false,
        framesList: '0-9-9-9-9-9-9-9',
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 900,
      },
      {
        names: {
          en: 'Extract Speed',
          fr: 'Attaque Sonique'
        },
        linearFrames: false,
        framesList: '0-7-7-7-8-8-8-8-8-8',
        firstHit: 2,
        castTime: 0,
        offset: 40,
        base: 600,
      },
      {
        names: {
          en: 'R050: Spear',
          fr: 'R050: Lance'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5',
        firstHit: 22,
        castTime: 0, //"effect_frames": [[0,  0,  20,  25,  30,  35,  40,  45]],
        offset: 40,
        base: 550,
      },
      {
        names: {
          en: 'Steel Pipe',
          fr: 'Barre de fer'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-9',
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 200,
      },
      {
        names: {
          en: 'A150: Vault',
          fr: 'A150: Décharge'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 400,
        debuff: {
          lightning: 65
        }
      },
      {
        names: {
          en: 'Self Destruct: 2B',
          fr: 'Autodestruction : 2B'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 999,
        dualable: false
      },
    ]
  },
  {
    id: 8,
    names: {
      en: '9S',
      fr: '9S',
      tw: '9S',
      kr: '9S',
      de: '9S',
      es: '9S'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Counter Attack',
          fr: 'Contre-attaquer'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 180,
        ignore: 50
      },
      {
        names: {
          en: 'Self Destruct: 9S',
          fr: 'Autodestruction : 9S'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 999,
        dualable: false
      },
    ]
  },
  {
    id: 9,
    names: {
      en: 'A2',
      fr: 'A2',
      tw: 'A2',
      kr: 'A2',
      de: 'A2',
      es: 'A2'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Dash Attack',
          fr: 'Attaque rapide'
        },
        linearFrames: false,
        framesList: '0-7-7-8-8-16-8',
        firstHit: 9,
        castTime: 9,
        offset: 30,
        base: 400,
      },
      {
        names: {
          en: 'Offensive Heal Combo (Modifier are wrong)',
          fr: 'Combo offensivo-curatif (Le modificateur est incorrecte)'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-5-5-5',
        firstHit: 35,
        castTime: 35,
        offset: 31,
        base: 510,
      },
      {
        names: {
          en: 'Heavy Attack',
          fr: 'Attaque lourde'
        },
        linearFrames: false,
        framesList: '0-9-9-9-9-9-5-4-9-5',
        firstHit: 42,
        castTime: 42,
        offset: 14,
        base: 330,
      },
      {
        names: {
          en: 'Finisher',
          fr: 'Coup fatal'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      }
    ]
  },
  {
    id: 10,
    names: {
      en: 'Ace',
      fr: 'Ace',
      tw: '艾斯',
      kr: '에이스',
      de: 'Ace',
      es: 'Ace'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Tri-Beam Laser +2 (orange)',
          fr: 'Laser triple +2 (orange)'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7',
        firstHit: 64,
        castTime: 0, //"effect_frames": [[0,  20,  0]],
        offset: 46,
        base: 560,
        ignore: 25,
        debuff: {
          fire: 75,
          light: 75,
          lightning: 75
        },
        damage: 'magic'
      },
      {
        names: {
          en: 'Attack Hand',
          fr: 'Tirage explosif'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 150,
        castTime: 75, //"effect_frames": [[75,  40]],
        offset: 0,
        base: 320,
        ignore: 25,
        damage: 'magic'
      },
    ],
    dual: false
  },
  {
    id: 11,
    names: {
      en: 'Agrias',
      fr: 'Agrias',
      tw: '阿格莉亞絲',
      kr: '아그리아스',
      de: 'Agrias',
      es: 'Agrias'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Divine Ruination',
          fr: 'Ruine divine'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 160,
        ignore: 50,
        debuff: {
          light: 50
        }
      },
      {
        names: {
          en: 'Divine Ruination +2',
          fr: 'Ruine divine +2'
        },
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        firstHit: 70,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        debuff: {
          light: 50
        }
      }
    ],
    weapons : [
      'light'
    ]
  },
  {
    id: 12,
    names: {
      en: 'Amelia',
      fr: 'Amélia',
      tw: '艾美利亞',
      kr: '아멜리아',
      de: 'Amelia',
      es: 'Amelia'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Disorder',
          fr: 'Désordre'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 200,
      },
    ]
  },
  {
    id: 13,
    names: {
      en: 'Ashe',
      fr: 'Ashe',
      tw: '雅雪',
      kr: '아셰',
      de: 'Ashe',
      es: 'Ashe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Heaven\'s Fury',
          fr: 'Ire céleste'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10-10-10',
        firstHit: 72,
        castTime: 40,
        offset: 16,
        base: 230,
        ignore: 25,
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Sword of Kings',
          fr: 'Épée des Rois'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 270,
      },
    ]
  },
  {
    id: 14,
    names: {
      en: 'Bran',
      fr: 'Bran',
      tw: '布蘭',
      kr: '브란',
      de: 'Bran',
      es: 'Bran'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Thunder Clap',
          fr: 'Coup de tonnerre'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5',
        firstHit: 47,
        castTime: 40,
        offset: 16,
        base: 270,
        elements: [
          'light',
          'lightning'
        ],
        debuff: {
          light: 50,
          lightning: 50
        }
      },
    ]
  },
  {
    id: 15,
    names: {
      en: 'Chizuru',
      fr: 'Chizuru',
      tw: '千鶴',
      kr: '치즈루',
      de: 'Chizuru',
      es: 'Chizuru'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Phantom Shadow',
          fr: 'Ombre fantasmatique'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5',
        firstHit: 22,
        castTime: 0,
        offset: 44,
        base: 140,
        ignore: 50
      },
    ]
  },
  {
    id: 16,
    names: {
      en: 'Dark Fina',
      fr: 'Fina Obscure',
      tw: '魔人菲娜',
      kr: '마인 피나',
      de: 'Dunkel-Fina',
      es: 'Fina oscura'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Ultima +2',
          fr: 'Ultima +2'
        },
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Dystopia (max)',
          fr: 'Dystopie (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          'dark'
        ],
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 17,
    names: {
      en: 'Fohlen',
      fr: 'Fohlen',
      tw: '福倫',
      kr: '포렌',
      de: 'Fohlen',
      es: 'Fohlen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Sonic Blast',
          fr: 'Rafale sonique'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10',
        firstHit: 10,
        castTime: 0,
        offset: 66,
        base: 200,
        ignore: 50,
        debuff: {
          wind: 50
        },
        elements: [
          'wind'
        ]
      },
    ]
  },
  {
    id: 18,
    names: {
      en: 'Fryevia',
      fr: 'Freyja',
      tw: '芙萊雅',
      kr: '프레이야',
      de: 'Freya',
      es: 'Freija'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Frost Flower Blitz',
          fr: 'Pétales gelés'
        },
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        firstHit: 40,
        castTime: 0,
        offset: 22,
        base: 800,
        damage: 'hybrid',
        debuff: {
          ice: 50
        },
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'Second Intention',
          fr: 'Seconde intention'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 0, //"effect_frames": [[0,  0,  27]],
        offset: 66,
        base: 600,
        damage: 'hybrid',
      }
    ]
  },
  {
    id: 19,
    names: {
      en: 'Gilgamesh',
      fr: 'Gilgamesh',
      tw: '吉爾伽美什',
      kr: '길가메시',
      de: 'Gilgamesch',
      es: 'Gilgamesh'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tri-Attack',
          fr: 'Triple-attaque'
        },
        linearFrames: false,
        framesList: '0-4-16-4-16-4',
        firstHit: 40,
        castTime: 40,
        offset: 26,
        base: 300,
      },
      {
        names: {
          en: 'Tri-Attack +2',
          fr: 'Triple-attaque +2'
        },
        linearFrames: false,
        framesList: '0-4-6-4-6-4-6-4-6-4-6-4',
        firstHit: 40,
        castTime: 40,
        offset: 26,
        base: 300,
      },
      {
        names: {
          en: 'Snowpetal +2',
          fr: 'Flocon de neige +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 0, //"effect_frames": [[0,  0,  30]],
        offset: 40,
        base: 200,
        ignore: 65
      }
    ]
  },
  {
    id: 20,
    names: {
      en: 'Knight Delita',
      fr: 'Delita Chevalier',
      tw: '騎士迪利塔',
      kr: '기사 디리타',
      de: 'Ritter Delita',
      es: 'Delita caballero'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Commanding Blade',
          fr: 'Lame du commandant'
        },
        linearFrames: false,
        framesList: '0-9-9-9-9-9-9-9',
        firstHit: 51,
        castTime: 40,
        offset: 16,
        base: 200,
        elements: [
          'lightning'
        ],
        ignore: 50
      },
      {
        names: {
          en: 'Lightning Stab',
          fr: 'Décharge sacrée'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 230,
      },
      {
        names: {
          en: 'Strategic blade',
          fr: 'Lame du stratège'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 20,
        castTime: 0,
        offset: 40,
        base: 250,
        ignore: 50,
        debuff: {
          lightning: 50
        }
      }
    ]
  },
  {
    id: 21,
    names: {
      en: 'Light Veritas',
      fr: 'Veritas de la Lumière',
      tw: '光輝之維利亞斯',
      kr: '찬란한 빛의 베리어스',
      de: 'Veritas des Lichts',
      es: 'Veritas el luminoso'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Divine Shot',
          fr: 'Tir divin'
        },
        linearFrames: false,
        framesList: '0-9-9-9-9-9-9',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 700,
        damage: 'hybrid',
        elements: [
          'light'
        ],
        debuff: {
          light: 50
        }
      },
      {
        names: {
          en: 'Saint Buster',
          fr: 'Casseur céleste'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 150,
        castTime: 40, //"effect_frames": [[40,  100,  120]],
        offset: 0,
        base: 1600,
        damage: 'hybrid'
      }
    ]
  },
  {
    id: 22,
    names: {
      en: 'Mercenary Ramza',
      fr: 'Ramza Mercenaire',
      tw: '傭兵拉姆薩',
      kr: '용병 람자',
      de: 'Söldner Ramza',
      es: 'Ramza mercenario'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Blade of Justice',
          fr: 'Lame de la justice'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-6-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 25,
      }
    ]
  },
  {
    id: 23,
    names: {
      en: 'Randi',
      fr: 'Randy',
      tw: '蘭迪',
      kr: '랜디',
      de: 'Randi',
      es: 'Randy'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Torrential Slash',
          fr: 'Entaille torrentielle'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 26,
        base: 700,
      }
    ]
  },
  {
    id: 24,
    names: {
      en: 'Rasler',
      fr: 'Rasler',
      tw: '拉斯勒',
      kr: '라슬러',
      de: 'Rasler',
      es: 'Rasler'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Patriotic Slash',
          fr: 'Coup patriotique'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 26,
        base: 300,
      }
    ]
  },
  {
    id: 25,
    names: {
      en: 'Reberta',
      fr: 'Réberta',
      tw: '蕾貝爾塔',
      kr: '리베르타',
      de: 'Reberta',
      es: 'Reberta'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Mystic Thrust',
          fr: 'Coup mystique'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 42,
        offset: 24,
        base: 400,
      }
    ]
  },
  {
    id: 26,
    names: {
      en: 'Rikku',
      fr: 'Rikku',
      tw: '琉克',
      kr: '류크',
      de: 'Rikku',
      es: 'Rikku'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Burning Soul',
          fr: 'Âme ardente'
        },
        linearFrames: false,
        framesList: '0-25-25-25-25-25-25-25-25',
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'fire'
        ]
      },
      {
        names: {
          en: 'Winter Storm',
          fr: 'Avalanche'
        },
        linearFrames: false,
        framesList: '0-13-13-13-13-13-13-13-13',
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'Lightning Rod',
          fr: 'Flash'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5',
        firstHit: 45,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'lightning'
        ]
      },
      {
        names: {
          en: 'Tidal Wave',
          fr: 'Tsunami'
        },
        linearFrames: false,
        framesList: '0-9-9-9-9-9-9-9-9',
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 230,
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: 'Tidal Wave +2 (JP Only)',
          fr: 'Tsunami +2 (JP Seulement)'
        },
        linearFrames: false,
        framesList: '0-12-12-12-12-12-12-12-12-12-12-12',
        firstHit: 132,
        castTime: 40,
        offset: 16,
        base: 280,
        elements: [
          'water'
        ]
      }
    ]
  },
  {
    id: 27,
    names: {
      en: 'Seabreeze Dark Fina',
      fr: 'Fina Obscure en Maillot',
      tw: '涼爽魔人菲娜',
      kr: '바닷바람의 마인 피나',
      de: 'Dunkel-Seewind-Fina',
      es: 'Fina oscura de la marea'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Ultima +2 (JP Only)',
          fr: 'Ultima +2 (JP Seulement)'
        },
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Utopia (max)',
          fr: 'Utopie (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 16,
        base: 600,
        elements: [
          'water'
        ],
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 28,
    names: {
      en: 'Setzer',
      fr: 'Setzer',
      tw: '塞策',
      kr: '셋쳐',
      de: 'Setzer',
      es: 'Setzer'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Prismatic Flash',
          fr: 'Prisme arc-en-ciel'
        },
        base: 180,
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5',
        firstHit: 42,
        castTime: 0,
        offset: 56
      },
      {
        names: {
          en: 'Red Card',
          fr: 'Carte sanglante'
        },
        linearFrames: false,
        framesList: '0-3-3-3-3-3-3-3-3-3',
        firstHit: 40,
        castTime: 40,
        offset: 16,
        base: 320,
      },
      {
        names: {
          en: 'Double Dice',
          fr: 'Double dés'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 16,
        castTime: 0,
        offset: 56,
        base: 100
      }
    ]
  },
  {
    id: 29,
    names: {
      en: 'Shantotto',
      fr: 'Shantotto',
      tw: '香托托',
      kr: '샨토토',
      de: 'Shantotto',
      es: 'Shantotto'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tornado',
          fr: 'Tornade'
        },
        linearFrames: false,
        framesList: '0-12-12-12-12-12-12-12-12-12-12-12',
        firstHit: 80,
        castTime: 40,
        offset: 16,
        base: 250,
        elements: [
          'wind'
        ],
        debuff: {
          wind: 50
        },
        damage: 'magic'
      }
    ]
  },
  {
    id: 30,
    names: {
      en: 'Trance Terra',
      fr: 'Terra en transe',
      tw: '入神蒂娜',
      kr: '트랜스 티나',
      de: 'Trance-Terra',
      es: 'Terra en trance'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Chaos Wave',
          fr: 'Onde chaotique'
        },
        linearFrames: false,
        framesList: '0-20-20-20-20',
        firstHit: 52,
        castTime: 40,
        offset: 16,
        base: 360,
        ignore: 50,
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Chaos Wave Awakened +2',
          fr: 'Onde chaotique - Év. +2'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 60,
        castTime: 40,
        offset: 12,
        base: 420,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Ultima +2',
          fr: 'Ultima +2'
        },
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        firstHit: 140,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 50,
        damage: 'magic'
      }
    ]
  },
  {
    id: 31,
    names: {
      en: 'Vaan',
      fr: 'Vaan',
      tw: '梵恩',
      kr: '반',
      de: 'Vaan',
      es: 'Vaan'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Assault Strike',
          fr: 'Violent assaut',
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8',
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 270
      },
      {
        names: {
          en: 'Assault Strike +2 (JP Only)',
          fr: 'Violent assaut +2 (JP Seulement)',
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8',
        firstHit: 22,
        castTime: 20,
        offset: 16,
        base: 400
      }
    ]
  },
  {
    id: 32,
    names: {
      en: 'Vargas',
      fr: 'Vargas',
      tw: '瓦爾加斯',
      kr: '발가스',
      de: 'Vargas',
      es: 'Vargas'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Flare Ride+',
          fr: 'Galop enflammé +'
        },
        linearFrames: false,
        framesList: '0-10-10-10-78',
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 200
      },
      {
        names: {
          en: 'Supreme Blaze',
          fr: 'Explosion suprême'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 240,
        castTime: 40,
        offset: 16,
        base: 250,
        ignore: 50,
        elements : [
          'fire'
        ]
      }
    ]
  },
  {
    id: 33,
    names: {
      en: 'Victoria',
      fr: 'Victoria',
      tw: '維多利亞',
      kr: '빅토리아',
      de: 'Victoria',
      es: 'Victoria'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Overflow (max)',
          fr: 'Dépassement (max)'
        },
        linearFrames: false,
        framesList: '0-24-24-24-24-24-24-24-24-24',
        firstHit: 57,
        castTime: 40,
        offset: 16,
        base: 940,
        elements: [
          'dark'
        ],
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 34,
    names: {
      en: 'Zidane (JP Only - 6 stars)',
      fr: 'Djidane (JP Seulement - 6 étoiles)',
      tw: '吉坦 (JP Only - 6 stars)',
      kr: '지탄 (JP Only - 6 stars)',
      de: 'Zidane (JP Only - 6 stars)',
      es: 'Yitán (JP Only - 6 stars)'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Free Energy',
          fr: 'Energétik'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 360
      },
      {
        names: {
          en: 'Free Energy +2',
          fr: 'Energétik +2'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        names: {
          en: 'Lucky Seven',
          fr: 'Coudepot'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 777
      }
    ]
  },
  {
    id: 35,
    names: {
      en: 'Onion Knight',
      fr: 'Chevalier Oignon',
      tw: '洋蔥劍士',
      kr: '양파 검사',
      de: 'Zwiebelritter',
      es: 'Caballero Cebolla'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Splendor of the Wind',
          fr: 'Splendeur du vent'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'wind'
        ]
      },
      {
        names: {
          en: 'Splendor of the Fire',
          fr: 'Splendeur du feu'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'fire'
        ]
      },
      {
        names: {
          en: 'Splendor of the Earth',
          fr: 'Splendeur de la terre'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'earth'
        ]
      },
      {
        names: {
          en: 'Splendor of the Water',
          fr: 'Splendeur de l\'eau'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 380,
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: 'Onion Slice',
          fr: 'Tranche-oignon'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 400
      },
      {
        names: {
          en: 'Full Speed Bladeblitz',
          fr: 'Lame éclair rapide'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 220
      },
      {
        names: {
          en: 'Twin Swords',
          fr: 'Double épées',
          tw: '雙劍',
          kr: '트윈 소드',
          de: 'Zwillingsschwerter',
          es: 'Espadas gemelas'
        },
        linearFrames: false,
        framesList: '0-4-47-4-35-5-5-5-5-5-5-5-5-5-20-4',
        firstHit: 68,
        castTime: 40,
        offset: 0,
        base: 800,
        dualable: false
      },
      {
        names: {
          en: 'TMR - Onion Cutter',
          fr: 'TMR - Coupe-oignon'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7-7-7-7-7-7-7',
        firstHit: 42,
        castTime: 40,
        offset: 14,
        base: 520
      },
    ]
  },
  {
    id: 36,
    names: {
      en: 'Fire Veritas',
      fr: 'Veritas des Flammes',
      tw: '劫火之維利亞斯',
      kr: '지옥불의 베리어스',
      de: 'Veritas der Flammende',
      es: 'Veritas el llameante'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Heavy Stomp',
          fr: 'Piétinement'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 90,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 50
      },
      {
        names: {
          en: 'Full Charge Stomp',
          fr: 'Piétinement maximum'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 90,
        castTime: 40,
        offset: 0,
        base: 500,
        ignore: 50
      }
    ]
  },
  {
    id: 37,
    names: {
      en: 'Queen',
      fr: 'Queen',
      tw: '葵因',
      kr: '퀸',
      de: 'Queen',
      es: 'Queen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Devastate +2',
          fr: 'Dévastation +2'
        },
        linearFrames: false,
        framesList: '0-26-10-10-30',
        firstHit: 20,
        castTime: 40,
        offset: 80,
        base: 800
      }
    ]
  },
  {
    id: 38,
    names: {
      en: 'Prishe',
      fr: 'Prishe',
      tw: '普利修',
      kr: '프리쉬',
      de: 'Prishe',
      es: 'Prishe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Raging Fists',
          fr: 'Poings de colère'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5',
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 350
      },
      {
        names: {
          en: 'Prishe Special',
          fr: 'Spécialité de Prishe'
        },
        linearFrames: false,
        framesList: '0-4-4-4-4-4-4-4-4-4-4-4-4-4-4',
        firstHit: 4,
        castTime: 0,
        offset: 66,
        base: 500,
        ignore: 50
      }
    ]
  },
  {
    id: 39,
    names: {
      en: 'Nyx',
      fr: 'Nyx',
      tw: '尼克斯',
      kr: '닉스',
      de: 'Nyx',
      es: 'Nyx'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Kingsglaive',
          fr: 'Glaive du roi'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8',
        firstHit: 82,
        castTime: 40,
        offset: 26,
        base: 200,
        ignore: 50,
        debuff: {
          fire: 50
        }
      },
      {
        names: {
          en: 'Desperate Blow',
          fr: 'Attaque désespérée'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 180,
        castTime: 40,
        offset: 26,
        base: 750,
      },
    ]
  },
  {
    id: 40,
    names: {
      en: 'Glauca',
      fr: 'Glauca',
      tw: '格拉烏卡',
      kr: '글라우카',
      de: 'Glauca',
      es: 'Glauca'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Daybreak Darkness',
          fr: 'Ténèbres de l\'aube'
        },
        linearFrames: false,
        framesList: '0-9-9-9-9-9-9-9',
        firstHit: 102,
        castTime: 40,
        offset: 26,
        base: 200,
        ignore: 25,
        debuff: {
          light: 50,
          dark: 50
        }
      }
    ]
  },
  {
    id: 41,
    names: {
      en: 'Pod 153',
      fr: 'Pod 153',
      tw: '輔助機１５３',
      kr: '포드 153',
      de: 'Pod 153',
      es: 'Pod 153'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'R020: Mirage',
          fr: 'R020: Mirage'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300,
      },
    ]
  },
  {
    id: 42,
    names: {
      en: 'Generic Spells',
      fr: 'Sorts génériques',
      tw: '通用法術',
      kr: '일반 주문',
      de: 'Generieke spreuken',
      es: 'Hechizos genéricos'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Meteor',
          fr: 'Météore'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 25,
        damage: 'magic'
      },
      {
        names: {
          en: 'Comet',
          fr: 'Comète'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 190,
        damage: 'magic'
      },
      {
        names: {
          en: 'Ultima',
          fr: 'Ultima'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Stonja',
          fr: 'Terre max'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'earth'
        ]
      },
      {
        names: {
          en: 'Aeroja',
          fr: 'Vent max'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'wind'
        ]
      },
      {
        names: {
          en: 'Waterja',
          fr: 'Eau max'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'water'
        ]
      },
      {
        names: {
          en: 'Thundaja',
          fr: 'Foudre max'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 150,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'lightning'
        ]
      },
      {
        names: {
          en: 'Blizzaja',
          fr: 'Glace max'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 240,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'ice'
        ]
      },
      {
        names: {
          en: 'firaja',
          fr: 'Feu max'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 210,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'magic',
        elements: [
          'fire'
        ]
      }
    ]
  },
  {
    id: 43,
    names: {
      en: 'Chic Ariana',
      fr: 'Ariana chic',
      tw: '時尚亞莉安娜',
      kr: '시크 아리아나',
      de: 'Schicke Ariana',
      es: 'Ariana chic'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Alluring Chorus',
          fr: 'Chœur envoûtant'
        },
        linearFrames: false,
        framesList: '0-7-7-8-8-16-8',
        firstHit: 139,
        castTime: 0, //"effect_frames": [[0,  0,  140]],
        offset: 56,
        base: 280,
        ignore: 25,
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 44,
    names: {
      en: 'Eve',
      fr: 'Ève',
      tw: '夏娃',
      kr: '이브',
      de: 'Eva',
      es: 'Eva'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Roundhouse Kick',
          fr: 'Coup de pied retourné'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 10,
        castTime: 0,
        offset: 40,
        base: 350,
      }
    ]
  },
  {
    id: 45,
    names: {
      en: 'Adam',
      fr: 'Adam',
      tw: '亞當',
      kr: '아담',
      de: 'Adam',
      es: 'Adán'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Cube Explosion - Large',
          fr: 'Explosion cubique - Grande'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 500,
      }
    ]
  },
  {
    id: 47,
    names: {
      en: 'Kelsus',
      fr: 'Kelsus',
      tw: '凱爾蘇斯',
      kr: '켈서스',
      de: 'Kelsus',
      es: 'Kelsus'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Crushing Vice',
          fr: 'Vice écrasant'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 500,
      }
    ]
  },
  {
    id: 48,
    names: {
      en: 'Maxwell',
      fr: 'Maxwell',
      tw: '麥斯威爾',
      kr: '막스웰',
      de: 'Maxwell',
      es: 'Maxwell'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Destiny',
          fr: 'Destinée'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 102,
        castTime: 40,
        offset: 0,
        base: 200,
        ignore: 50,
        elements : [
          'light'
        ]
      }
    ]
  },
  {
    id: 49,
    names: {
      en: 'Black Cat Lid',
      fr: 'Chatte noire Lid',
      tw: '黑貓里德',
      kr: '검은 고양이 리드',
      de: 'Schwarze Katze Lid',
      es: 'Lid minina negra'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Ultimate Blow',
          fr: 'Souffle ultime'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 35
      }
    ]
  },
  {
    id: 50,
    names: {
      en: 'Helena',
      fr: 'Helena',
      tw: '海倫娜',
      kr: '헬레나',
      de: 'Helena',
      es: 'Helena'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Best Shot',
          fr: 'Superbe tir'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 40,
        offset: 0,
        base: 450
      }
    ]
  },
  {
    id: 51,
    names: {
      en: 'Zargabaath',
      fr: 'Zargabaath',
      tw: '查格博斯',
      kr: '자르가바스',
      de: 'Zargabaath',
      es: 'Zargabaath'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Word of Law',
          fr: 'Mot de la loi'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 270,
        castTime: 40,
        offset: 0,
        base: 300,
        ignore: 50,
        elements: [
          'light'
        ],
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 52,
    names: {
      en: 'Luneth',
      fr: 'Luneth',
      tw: '路涅斯',
      kr: '루네스',
      de: 'Luneth',
      es: 'Luneth'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Cut Through +2',
          fr: 'Trancher +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 0,
        offset: 40,
        base: 525,
        ignore: 50
      }
    ]
  },
  {
    id: 53,
    names: {
      en: 'Grace',
      fr: 'Grace',
      tw: '格蕾斯',
      kr: '그레이스',
      de: 'Grace',
      es: 'Grace'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Destroy Arm +2',
          fr: 'Détruire arme +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 0,
        offset: 40,
        base: 250,
        ignore: 50
      }
    ]
  },
  {
    id: 54,
    names: {
      en: 'Rem',
      fr: 'Rem',
      tw: '蕾姆',
      kr: '렘',
      de: 'Rem',
      es: 'Rem'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Dagger Boomerang (max)',
          fr: 'Dague boomerang (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 620
      }
    ]
  },
  {
    id: 55,
    names: {
      en: 'Zyrus',
      fr: 'Zyrus',
      tw: '扎拉斯',
      kr: '자이러스',
      de: 'Zyrus',
      es: 'Zyrus'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Blood Pulsar (max)',
          fr: 'Pulsar de sang (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 130,
        castTime: 30,
        offset: 16,
        base: 650,
        damage: 'magic'
      },
      {
        names: {
          en: 'Blood Rend',
          fr: 'Déchirure sanglante'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 90,
        castTime: 30,
        offset: 16,
        base: 500,
        elements: [
          'water'
        ],
        damage: 'magic'
      }
    ]
  },
  {
    id: 56,
    names: {
      en: 'Shine',
      fr: 'Shine',
      tw: '夏因',
      kr: '샤인',
      de: 'Shine',
      es: 'Shine'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Into Darkness',
          fr: 'Obscurité sans fin'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 23,
        castTime: 0, //"effect_frames": [[0,  20,  20]],
        offset: 40,
        base: 420,
        elements: [
          'dark'
        ]
      }
    ]
  },
  {
    id: 57,
    names: {
      en: 'Olive',
      fr: 'Olive',
      tw: '奧利芙',
      kr: '올리브',
      de: 'Olive',
      es: 'Olivia'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'True Shot',
          fr: 'Tir sérieux'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 20,
        offset: 26,
        base: 240,
        ignore: 50
      }
    ],
    dual: false
  },
  {
    id: 58,
    names: {
      en: 'Emperor',
      fr: 'Empereur',
      tw: '皇帝',
      kr: '황제',
      de: 'Imperator',
      es: 'Emperador'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Starfall',
          fr: 'Météorite'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 230,
        ignore: 50,
        damage: 'magic',
        dualable: false,
      },
      {
        names: {
          en: 'Fire From Below (max)',
          fr: 'Feu de l\'Enfer (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2000,
        damage: 'magic',
        elements : [
          'fire'
        ],
        dualable: false,
      },
      {
        names: {
          en: 'Fire From Below +2 (max)',
          fr: 'Feu de l\'Enfer +2 (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2500,
        damage: 'magic',
        elements : [
          'fire'
        ],
        debuff: {
          fire: 50
        },
        dualable: false,
      }
    ]
  },
  {
    id: 59,
    names: {
      en: 'Dark Knight Cecil',
      fr: 'Cécil chevevalier noir',
      tw: '暗黑騎士塞西爾',
      kr: '암흑기사 세실',
      de: 'Dunkelritter Cecil',
      es: 'Cecil oscuro'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Soul Eater +2',
          fr: 'Mangeur d\'âme +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 20,
        castTime: 0,
        offset: 40,
        base: 750,
        elements: [
          'dark'
        ],
        debuff: {
          dark: 100
        }
      }
    ]
  },
  {
    id: 60,
    names: {
      en: 'Gaffgarion',
      fr: 'Gaffgarion',
      tw: '加夫加利安',
      kr: '가프가리온',
      de: 'Gaffgarion',
      es: 'Gaffgarion'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Abyssal Blade +2',
          fr: 'Lame abyssale +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 0,
        base: 750,
        elements: [
          'dark'
        ]
      }
    ]
  },
  {
    id: 61,
    names: {
      en: 'Kefka',
      fr: 'Kefka',
      tw: '凱夫卡',
      kr: '케프카',
      de: 'Kefka',
      es: 'Kefka'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Light of Judgment +2',
          fr: 'Lumière du jugement +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 280,
        ignore: 50,
        dualable: false,
        damage: 'magic'
      }
    ]
  },
  {
    id: 62,
    names: {
      en: 'Bartz',
      fr: 'Bartz',
      tw: '巴茲',
      kr: '버츠',
      de: 'Bartz',
      es: 'Bartz'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Wind Shear +2',
          fr: 'Tranche-vent +2'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 70,
        castTime: 40, //"effect_frames": [[0]], "effects_raw": [[1, 1, 40, [0,  0,  0,  0,  0,  0,  0,  0,  540,  540]]],
        offset: 0,
        base: 700,
        damage: 'hybrid'
      }
    ]
  },
  {
    id: 63,
    names: {
      en: 'Goken',
      fr: 'Goken',
      tw: '剛健',
      kr: '고우켄',
      de: 'Goken',
      es: 'Goken'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Firm Punch',
          fr: 'Poing ferme'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Light Kick',
          fr: 'Coup de pied léger'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10',
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 200
      },
      {
        names: {
          en: 'Wolfclaw Fist',
          fr: 'Poings croc-de-loup'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 500
      },
      {
        names: {
          en: 'Falcon Kick',
          fr: 'Coup de pied du Faucon'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Tigerclaw Fist',
          fr: 'Poings croc-de-tigre'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      },
      {
        names: {
          en: 'Dragon Kick',
          fr: 'Coup de pied du Dragon'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        names: {
          en: 'Fist Supreme',
          fr: 'Coup de poings ultime',
          tw: '豪覇瞬烈拳',
          kr: '호패순열권',
          de: 'Stärkste Faust',
          es: 'Puño supremo'
        },
        linearFrames: false,
        framesList: '0-7-9-7-9-7-9-9-5-5',
        firstHit: 47,
        castTime: 0,
        offset: 0,
        base: 840,
        dualable: false
      }
    ]
  },
  {
    id: 64,
    names: {
      en: 'Toxic Rain',
      fr: 'Pluie toxique',
      tw: '暴風酸性雨',
      kr: '산성 폭풍우',
      de: 'Giftregen',
      es: 'Lluvia tóxica'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Toxic Rain',
          fr: 'Pluie toxique',
          tw: '暴風酸性雨',
          kr: '산성 폭풍우',
          de: 'Giftregen',
          es: 'Lluvia tóxica'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10',
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 180,
        ignore: 25,
        damage: 'magic',
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 65,
    names: {
      en: 'Alterna',
      fr: 'Alternance',
      tw: '吸收',
      kr: '얼터너',
      de: 'Alterna',
      es: 'Versus'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Alterna',
          fr: 'Alternance',
          tw: '吸收',
          kr: '얼터너',
          de: 'Alterna',
          es: 'Versus'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 365,
        castTime: 40,
        offset: 16,
        base: 510,
        ignore: 25,
        damage: 'magic',
      },
    ],
  },
  {
    id: 66,
    names: {
      en: 'Grim Lord Sakura',
      fr: 'Sakura, Seigneur Sombre',
      tw: '冷血貴族櫻',
      kr: '사신 사쿠라',
      de: 'Grimmige Herrin Sakura',
      es: 'Sakura la parca'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Grim - Soul Barrage',
          fr: 'Obscurité - Barrage spectral'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10-10-10',
        firstHit: 62,
        castTime: 30,
        offset: 26,
        base: 200,
        ignore: 50,
        damage: 'magic'
      },
      {
        names: {
          en: 'Grim - Eldritch Flames',
          fr: 'Obscurité - Flammes surnaturelles'
        },
        linearFrames: false,
        framesList: '0-10-10-10-10',
        firstHit: 110,
        castTime: 0,
        offset: 56,
        base: 300,
        damage: 'magic',
        elements : [
          'dark',
          'fire'
        ],
        debuff : {
          dark: 50,
          fire: 50
        }
      },
      {
        names: {
          en: 'Phantom Fury',
          fr: 'Furie fantomatique',
          tw: '狂怒幻影',
          kr: '유령의 진노',
          de: 'Phantomwut',
          es: 'Furia fantasma'
        },
        linearFrames: false,
        framesList: '0-4-4-4-4-4-4-4-30',
        firstHit: 62,
        castTime: 60,
        offset: 0,
        base: 660,
        damage: 'magic',
        dualable: false
      },
    ],
  },
  {
    id: 67,
    names: {
      en: 'Pirate Jake',
      fr: 'Jake, Pirate',
      tw: '海盜傑科',
      kr: '해적 제이크',
      de: 'Piraten-Jake',
      es: 'Jake pirata'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Feed the Fishes',
          fr: 'Nourrissez les poissons'
        },
        linearFrames: false,
        framesList: '0-5-5-5-5-5',
        firstHit: 22,
        castTime: 20,
        offset: 14,
        base: 350,
        debuff: {
          water: 50
        }
      },
      {
        names: {
          en: 'Unleash the Kraken',
          fr: 'Relâchez le Kraken',
          tw: '釋放克拉肯!',
          kr: '크라켄을 풀어라!',
          de: 'Befreit den Kraken',
          es: 'Soltad al Kraken'
        },
        linearFrames: false,
        framesList: '0-10-10-10-35-10-10-10',
        firstHit: 62,
        castTime: 0,
        offset: 0,
        base: 570,
        dualable: false,
        elements: [
          'water'
        ],
        debuff: {
          water: 74
        }
      },
    ],
  },
  {
    id: 68,
    names: {
      en: 'Illusionist Nichol',
      fr: 'Nichol, Illusionniste',
      tw: '幻術師尼科爾',
      kr: '마술사 니콜',
      de: 'Illusionist Nichol',
      es: 'Nichol ilusionista'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Illusion - Phantasmal Forces',
          fr: 'Illusion - Forces fantasmagorique'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8',
        firstHit: 50,
        castTime: 20,
        offset: 16,
        base: 600,
        damage: 'magic',
      },
    ],
  },
  {
    id: 69,
    names: {
      en: 'Siren',
      fr: 'Sirène',
      tw: '塞壬',
      kr: '세이렌',
      de: 'Sirene',
      es: 'Sirena'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Lunatic Voice (2)',
          fr: 'Voix ensorcelante (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 120,
        damage: 'magic',
        elements: [
          'water'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 70,
    names: {
      en: 'Ifrit',
      fr: 'Ifrit',
      tw: '伊弗利特',
      kr: '이프리트',
      de: 'Ifrit',
      es: 'Ifrit'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Hellfire (2)',
          fr: 'Flammes de l\'enfer (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 140,
        damage: 'physic',
        elements: [
          'fire'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 71,
    names: {
      en: 'Shiva',
      fr: 'Shiva',
      tw: '濕婆',
      kr: '시바',
      de: 'Shiva',
      es: 'Shiva'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Diamond Dust (2)',
          fr: 'Poussière de diamant (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 140,
        damage: 'magic',
        elements: [
          'ice'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 72,
    names: {
      en: 'Diabolos',
      fr: 'Diabolos',
      tw: '迪亞波羅斯',
      kr: '디아볼로스',
      de: 'Diabolos',
      es: 'Diablo'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Dark Messenger (2)',
          fr: 'Héraut ténébreux (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 170,
        damage: 'magic',
        elements: [
          'dark'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 73,
    names: {
      en: 'Ramuh',
      fr: 'Ramuh',
      tw: '拉姆',
      kr: '라무',
      de: 'Ramuh',
      es: 'Lamú'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Judgment Bolt (2)',
          fr: 'Foudre du jugement (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 110,
        castTime: 40,
        offset: 0,
        base: 140,
        damage: 'magic',
        elements: [
          'lightning'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 74,
    names: {
      en: 'Titan',
      fr: 'Titan',
      tw: '泰坦',
      kr: '타이탄',
      de: 'Titan',
      es: 'Titán'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Gaia\'s Wrath (2)',
          fr: 'Colère de Gaïa (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 170,
        damage: 'physic',
        elements: [
          'earth'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 75,
    names: {
      en: 'Tetra Sylphid',
      fr: 'Tétra-Sylphides',
      tw: '四方風精靈',
      kr: '테트라 실피드',
      de: 'Tetra Sylphid',
      es: 'Tetra Sílfide'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Heavenswind (2)',
          fr: 'Vent céleste (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 190,
        castTime: 40,
        offset: 0,
        base: 180,
        damage: 'magic',
        elements: [
          'wind'
        ],
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 76,
    names: {
      en: 'Odin',
      fr: 'Odin',
      tw: '奧汀',
      kr: '오딘',
      de: 'Odin',
      es: 'Odín'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Gungnir (2)',
          fr: 'Gungnir (2)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 200,
        damage: 'physic',
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 77,
    names: {
      en: 'Bahamut',
      fr: 'Bahamut',
      tw: '巴哈姆特',
      kr: '바하무트',
      de: 'Bahamut',
      es: 'Bahamut'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Megaflare (1)',
          fr: 'MégaBrasier (1)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 170,
        castTime: 40,
        offset: 0,
        base: 300,
        damage: 'magic',
        dualable: false
      },
    ],
    dual: false
  },
  {
    id: 78,
    names: {
      en: 'Loren',
      fr: 'Loren',
      tw: '洛倫',
      kr: '로렌',
      de: 'Loren',
      es: 'Loren'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Swiftwind Blade',
          fr: 'Lame oscillante'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7-7-7',
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 450,
        elements: [
          'wind'
        ],
      },
      {
        names: {
          en: 'Greased Lightning',
          fr: 'Éclair supersonique'
        },
        linearFrames: false,
        framesList: '0-7-7-7-7-7-7-7',
        firstHit: 2,
        castTime: 0,
        offset: 66,
        base: 250,
        ignore: 50,
      },
      {
        names: {
          en: 'Blade Prison',
          fr: 'Prison de lames'
        },
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-8-8-8',
        firstHit: 42,
        castTime: 40,
        offset: 17,
        base: 400,
        ignore: 50,
      },
      {
        names: {
          en: 'Quickbolt Blade',
          fr: 'Lame'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 50,
        castTime: 0,
        offset: 40,
        base: 225,
        ignore: 50,
        elements: [
          'lightning'
        ],
      },
      {
        names: {
          en: 'Kingdom\'s Order',
          fr: 'Ordre royal',
          tw: '王國秩序',
          kr: '왕국의 질서',
          de: 'Königlicher Befehl',
          es: 'Orden del reino'
        },
        linearFrames: false,
        framesList: '0-10-13-14-14-10-13-14-24-12-34-18-18-18-16',
        firstHit: 34,
        castTime: 0,
        offset: 0,
        base: 420,
        ignore: 50,
        debuff: {
          wind: 74
        },
        dualable: false
      },
    ],
  },
  {
    id: 79,
    names: {
      en: 'Barbariccia',
      tw: '巴爾巴莉希亞',
      kr: '발바리시아',
      fr: 'Barbariccia',
      de: 'Barbarizia',
      es: 'Barbariccia'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tornado',
          fr: 'Tornade'
        },
        linearFrames: false,
        framesList: '0-12-12-12-12-12-12-12-12-12-12-12',
        firstHit: 80,
        castTime: 40,
        offset: 16,
        base: 250,
        elements: [
          'wind'
        ],
        debuff: {
          wind: 50
        },
        damage: 'magic'
      },
      {
        names: {
          en: 'Sunder',
          fr: 'Bourrasque électrique'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 20,
        offset: 0,
        base: 1000,
        elements: [
          'wind',
          'lightning'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        names: {
          en: 'Maelstrom',
          fr: 'Maelström',
          tw: '大漩渦',
          kr: '마엘스트롬',
          de: 'Mahlstrom',
          es: 'Vórtice'
        },
        linearFrames: false,
        framesList: '0-5-5-10-10-20-20',
        firstHit: 100,
        castTime: 90,
        offset: 0,
        base: 840,
        elements: [
          'wind',
          'lightning'
        ],
        debuff: {
          wind: 74,
          lightning: 74
        },
        damage: 'magic',
        dualable: false
      }
    ]
  },
];
