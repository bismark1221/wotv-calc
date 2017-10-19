export const UNITS: any[] = [
// Chain
  {
    id: 7,
    name: '2B',
    type: 'chain',
    'abilities': [
      {
        name: 'Avoid Attack',
        base: 900,
        linearFrames: true,
        frames: 9,
        castTime: 0,
        offset: 32,
        hits: 8,
        firstHit: 42
      },
      {
        name: 'Extra Speed',
        base: 600,
        linearFrames: false,
        framesList: '0-7-7-7-8-8-8-8-8-8',
        castTime: 8,
        offset: 32,
        firstHit: 2
      },
      {
        name: 'R050: Spear',
        base: 550,
        linearFrames: true,
        frames: 5,
        castTime: 8,
        offset: 32,
        hits: 6,
        firstHit: 22
      },
      {
        name: 'Steel Pipe',
        base: 200,
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-9',
        castTime: 8,
        offset: 32,
        firstHit: 42
      },
      {
        name: 'A150: Vault (activated)',
        type: 'finish',
        base: 400,
        linearFrames: true,
        hits: 1,
        frames: 1,
        castTime: 8,
        offset: 32,
        firstHit: 42,
        debuff: {
          lightning: 65
        }
      },
    ]
  },
  {
    id: 8,
    name: '9S',
    type: 'chain',
    'abilities': [
      {
        name: 'Counter Attack',
        base: 180,
        linearFrames: true,
        hits: 5,
        frames: 10,
        castTime: 8,
        offset: 32,
        firstHit: 42,
        ignore: 50
      },
    ]
  },
  {
    id: 9,
    name: 'A2',
    type: 'chain',
    'abilities': [
      {
        name: 'Dash Attack',
        base: 400,
        linearFrames: false,
        framesList: '0-7-7-8-8-16-8',
        castTime: 7,
        offset: 26,
        firstHit: 9,
      },
      {
        name: 'Offensive Heal Combo (Math are wrong)',
        base: 510,
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-5-5-5',
        castTime: 40,
        offset: 16,
        firstHit: 35,
      },
      {
        name: 'Heavy Attack',
        base: 330,
        linearFrames: false,
        framesList: '0-9-9-9-9-9-5-4-9-5',
        castTime: 40,
        offset: 16,
        firstHit: 42,
      },
      {
        name: 'Finisher',
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
    name: 'Ace',
    type: 'chain',
    'abilities': [
      {
        name: 'Tri-Beam Laser +2',
        base: 2250,
        linearFrames: true,
        hits: 7,
        frames: 7,
        castTime: 40,
        offset: 16,
        firstHit: 64,
        ignore: 25,
        debuff: {
          fire: 75,
          light: 75,
          lightning: 75
        },
        damage: 'magic'
      },
      {
        name: 'Attack Hand',
        type: 'finish',
        base: 320,
        ignore: 25,
        hits: 1,
        frames: 1,
        castTime: 40,
        offset: 16,
        firstHit: 150,
        damage: 'magic'
      },
    ],
    dual: false
  },
  {
    id: 11,
    name: 'Agrias',
    type: 'chain',
    'abilities': [
      {
        name: 'Divine Ruination',
        base: 160,
        linearFrames: true,
        hits: 5,
        frames: 10,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        ignore: 50,
        debuff: {
          light: 50
        }
      },
      {
        name: 'Divine Ruination +2',
        base: 200,
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        castTime: 40,
        offset: 16,
        firstHit: 70,
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
    id: 5,
    name: 'Aileen',
    type: 'chain',
    abilities: [
      {
        name: 'Piledriver',
        base: 200,
        hits: 5,
        frames: 15,
        castTime: 0,
        offset: 36,
        firstHit: 2,
        ignore: 50,
        debuff: {
          earth: 50
        }
      },
      {
        name: 'Piledriver +2 (JP Only)',
        base: 250,
        hits: 7,
        frames: 8,
        castTime: 8,
        offset: 36,
        firstHit: 2,
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
    id: 12,
    name: 'Amelia',
    type: 'chain',
    abilities: [
      {
        name: 'Disorder',
        base: 200,
        hits: 10,
        frames: 5,
        castTime: 40,
        offset: 16,
        firstHit: 42
      },
    ]
  },
  {
    id: 13,
    name: 'Ashe',
    type: 'chain',
    abilities: [
      {
        name: 'Heaven\'s Fury',
        base: 230,
        hits: 10,
        frames: 10,
        castTime: 40,
        offset: 16,
        firstHit: 72,
        ignore: 25,
        damage: 'magic',
        dualable: false
      },
      {
        name: 'Sword of Kings',
        base: 270,
        hits: 7,
        frames: 10,
        castTime: 40,
        offset: 16,
        firstHit: 42,
      },
    ]
  },
  {
    id: 14,
    name: 'Bran',
    type: 'chain',
    abilities: [
      {
        name: 'Thunder Clap',
        base: 270,
        hits: 7,
        frames: 5,
        castTime: 8,
        offset: 50,
        firstHit: 47,
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
    name: 'Chizuru',
    type: 'chain',
    abilities: [
      {
        name: 'Phantom Shadow',
        base: 140,
        hits: 5,
        frames: 5,
        castTime: 8,
        offset: 36,
        firstHit: 22,
        ignore: 50
      },
    ]
  },
  {
    id: 16,
    name: 'Dark Fina',
    type: 'chain',
    abilities: [
      {
        name: 'Ultima +2',
        base: 280,
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        castTime: 40,
        offset: 16,
        firstHit: 140,
        ignore: 50,
        damage: 'magic'
      },
      {
        name: 'Dystopia (max)',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 0,
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
    id: 6,
    name: 'Dark Veritas',
    type: 'chain',
    abilities: [
      {
        name: 'Dark Punishment',
        base: 200,
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        castTime: 40,
        offset: 16,
        firstHit: 70,
        ignore: 50,
        debuff: {
          dark: 50
        }
      },
      {
        name: 'Dark Edge',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 110,
        castTime: 40,
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
    id: 17,
    name: 'Fohlen',
    type: 'chain',
    abilities: [
      {
        name: 'Sonic Blast',
        base: 200,
        hits: 7,
        frames: 10,
        castTime: 40,
        offset: 26,
        firstHit: 10,
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
    name: 'Fryevia',
    type: 'chain',
    abilities: [
      {
        name: 'Frost Flower Blitz',
        base: 800,
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        castTime: 8,
        offset: 16,
        firstHit: 40,
        damage: 'hybrid',
        debuff: {
          ice: 50
        },
        elements: [
          'ice'
        ]
      },
      {
        name: 'Second Intention',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 40,
        offset: 16,
        base: 600,
        damage: 'hybrid',
      }
    ]
  },
  {
    id: 19,
    name: 'Gilgamesh',
    type: 'chain',
    abilities: [
      {
        name: 'Tri-Attack',
        base: 300,
        linearFrames: false,
        framesList: '0-4-16-4-16-4',
        castTime: 40,
        offset: 26,
        firstHit: 40
      },
      {
        name: 'Tri-Attack +2',
        base: 300,
        linearFrames: false,
        framesList: '0-4-6-4-6-4-6-4-6-4-6-4',
        castTime: 40,
        offset: 26,
        firstHit: 40
      },
      {
        name: 'Snowpetal +2',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 40,
        offset: 0,
        base: 200,
        ignore: 65
      }
    ]
  },
  {
    id: 20,
    name: 'Knight Delita',
    type: 'chain',
    abilities: [
      {
        name: 'Commanding Blade',
        base: 200,
        hits: 8,
        frames: 9,
        castTime: 40,
        offset: 16,
        firstHit: 51,
        elements: [
          'lightning'
        ],
        ignore: 50
      },
      {
        name: 'Lightning Stab',
        base: 230,
        hits: 6,
        frames: 5,
        castTime: 40,
        offset: 16,
        firstHit: 42
      },
      {
        name: 'Strategic blade',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 20,
        castTime: 40,
        offset: 16,
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
    name: 'Light Veritas',
    type: 'chain',
    abilities: [
      {
        name: 'Divine Shot',
        base: 700,
        hits: 7,
        frames: 9,
        castTime: 40,
        offset: 16,
        firstHit: 42,
        damage: 'hybrid',
        elements: [
          'light'
        ],
        debuff: {
          light: 50
        }
      },
      {
        name: 'Saint Buster',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 150,
        castTime: 40,
        offset: 0,
        base: 1600,
        damage: 'hybrid'
      }
    ]
  },
  {
    id: 4,
    name: 'Lunera',
    type: 'chain',
    abilities: [
      {
        name: 'Aureole Ray',
        base: 400,
        hits: 20,
        frames: 4,
        castTime: 40,
        offset: 16,
        firstHit: 58,
        elements: [
          'wind',
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        name: 'Aureole Ray +2 (JP Only)',
        base: 400,
        hits: 30,
        frames: 4,
        castTime: 40,
        offset: 16,
        firstHit: 42,
        elements: [
          'wind',
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        name: 'Gleaming Arrow (max)',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 410,
        castTime: 40,
        offset: 16,
        base: 1500,
        elements : [
          'light'
        ],
        damage: 'magic',
        dualable: false
      },
      {
        name: 'Gail Arrow (max)',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 70,
        castTime: 40,
        offset: 16,
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
    id: 22,
    name: 'Mercenary Ramza',
    type: 'chain',
    abilities: [
      {
        name: 'Blade of Justice',
        base: 250,
        linearFrames: false,
        framesList: '0-8-8-8-8-8-6-8',
        castTime: 40,
        offset: 16,
        firstHit: 42,
        ignore: 25,
      }
    ]
  },
  {
    id: 3,
    name: 'Orlandeau',
    type: 'chain',
    abilities: [
      {
        name: 'Holy Explosion',
        base: 200,
        linearFrames: false,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        framesList: '0-7-5-7-7-7-7',
        ignore: 50,
        debuff: {
          light: 50
        }
      },
      {
        name: 'Holy Explosion +2 (JP Only)',
        base: 260,
        linearFrames: false,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        framesList: '0-7-5-7-7-7-7',
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
    id: 23,
    name: 'Randi',
    type: 'chain',
    abilities: [
      {
        name: 'Torrential Slash',
        base: 700,
        hits: 10,
        frames: 10,
        castTime: 40,
        offset: 26,
        firstHit: 42
      }
    ]
  },
  {
    id: 24,
    name: 'Rasler',
    type: 'chain',
    abilities: [
      {
        name: 'Patriotic Slash',
        base: 300,
        hits: 7,
        frames: 10,
        castTime: 40,
        offset: 26,
        firstHit: 42
      }
    ]
  },
  {
    id: 25,
    name: 'Reberta',
    type: 'chain',
    abilities: [
      {
        name: 'Mystic Thrust',
        base: 400,
        hits: 7,
        frames: 10,
        castTime: 40,
        offset: 26,
        firstHit: 42
      }
    ]
  },
  {
    id: 26,
    name: 'Rikku',
    type: 'chain',
    abilities: [
      {
        name: 'Burning Soul',
        base: 230,
        hits: 9,
        frames: 25,
        castTime: 40,
        offset: 16,
        firstHit: 40,
        elements: [
          'fire'
        ]
      },
      {
        name: 'Winter Storm',
        base: 230,
        hits: 9,
        frames: 13,
        castTime: 40,
        offset: 16,
        firstHit: 40,
        elements: [
          'ice'
        ]
      },
      {
        name: 'Lightning Rod',
        base: 230,
        hits: 9,
        frames: 5,
        castTime: 40,
        offset: 16,
        firstHit: 45,
        elements: [
          'lightning'
        ]
      },
      {
        name: 'Tidal Wave +2 (JP Only)',
        base: 280,
        hits: 12,
        frames: 12,
        castTime: 40,
        offset: 16,
        firstHit: 132,
        elements: [
          'water'
        ]
      },
      {
        name: 'Tidal Wave',
        base: 230,
        hits: 9,
        frames: 9,
        castTime: 40,
        offset: 16,
        firstHit: 40,
        elements: [
          'water'
        ]
      }
    ]
  },
  {
    id: 27,
    name: 'Seabreeze Dark Fina',
    type: 'chain',
    abilities: [
      {
        name: 'Ultima +2 (JP Only)',
        base: 280,
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        castTime: 40,
        offset: 16,
        firstHit: 140,
        ignore: 50,
        damage: 'magic'
      },
      {
        name: 'Utopia (max)',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 120,
        castTime: 40,
        offset: 0,
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
    name: 'Setzer',
    type: 'chain',
    abilities: [
      {
        name: 'Prismatic Flash',
        base: 180,
        hits: 7,
        frames: 5,
        firstHit: 42,
        castTime: 40,
        offset: 16
      },
      {
        name: 'Red Card',
        base: 320,
        hits: 10,
        frames: 3,
        firstHit: 40,
        castTime: 40,
        offset: 16
      },
      {
        name: 'Double Dice',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 16,
        castTime: 40,
        offset: 16,
        base: 100
      }
    ]
  },
  {
    id: 29,
    name: 'Shantotto',
    type: 'chain',
    abilities: [
      {
        name: 'Tornado',
        base: 250,
        hits: 12,
        frames: 12,
        firstHit: 80,
        castTime: 40,
        offset: 16,
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
    name: 'Trance Terra',
    type: 'chain',
    abilities: [
      {
        name: 'Chaos Wave',
        base: 360,
        hits: 5,
        frames: 20,
        castTime: 40,
        offset: 16,
        firstHit: 52,
        ignore: 50,
        damage: 'magic',
        dualable: false
      },
      {
        name: 'Chaos Wave +2 (JP Only)',
        base: 420,
        hits: 10,
        frames: 8,
        castTime: 40,
        offset: 16,
        firstHit: 60,
        ignore: 50,
        damage: 'magic',
        dualable: false
      },
      {
        name: 'Ultima +2 (JP Only)',
        base: 280,
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        castTime: 40,
        offset: 16,
        firstHit: 140,
        ignore: 50,
        damage: 'magic'
      }
    ]
  },
  {
    id: 1,
    name: 'Tidus',
    type: 'chain',
    abilities: [
      {
        name: 'Quick Hit',
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-20',
        firstHit: 22,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        name: 'Quick Hit +2 (JP Only)',
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-20',
        firstHit: 22,
        castTime: 40,
        offset: 16,
        base: 720
      },
      {
        name: 'Energy Rain',
        hits: 4,
        firstHit: 67,
        frames: 10,
        castTime: 40,
        offset: 16,
        base: 180
      },
      {
        name: 'Jecht Shot',
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
      }
    ],
    weapons : [
      'water'
    ]
  },
  {
    id: 31,
    name: 'Vaan',
    type: 'chain',
    abilities: [
      {
        name: 'Assault Strike',
        hits: 8,
        firstHit: 22,
        frames: 8,
        castTime: 40,
        offset: 16,
        base: 270
      },
      {
        name: 'Assault Strike +2 (JP Only)',
        hits: 8,
        firstHit: 22,
        frames: 8,
        castTime: 40,
        offset: 16,
        base: 400
      }
    ]
  },
  {
    id: 32,
    name: 'Vargas',
    type: 'chain',
    abilities: [
      {
        name: 'Flare Ride+',
        linearFrames: false,
        framesList: '0-10-10-10-78',
        firstHit: 2,
        castTime: 40,
        offset: 26,
        base: 200
      }
    ]
  },
  {
    id: 33,
    name: 'Victoria',
    type: 'chain',
    abilities: [
      {
        name: 'Overflow (Max charge)',
        hits: 10,
        frames: 24,
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
    name: 'Zidane (JP Only - 6 stars)',
    type: 'chain',
    abilities: [
      {
        name: 'Free Energy',
        hits: 8,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 360
      },
      {
        name: 'Free Energy +2',
        hits: 8,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        name: 'Lucky Seven',
        hits: 7,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 777
      }
    ]
  },
  {
    id: 35,
    name: 'Onion Knight',
    type: 'chain',
    abilities: [
      {
        name: 'Splendor of the Wind',
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 380,
        elements: [
          'wind'
        ]
      },
      {
        name: 'Splendor of the Fire',
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 380,
        elements: [
          'fire'
        ]
      },
      {
        name: 'Splendor of the Earth',
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 380,
        elements: [
          'earth'
        ]
      },
      {
        name: 'Splendor of the Water',
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 380,
        elements: [
          'water'
        ]
      },
      {
        name: 'Onion Slice',
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 400
      },
      {
        name: 'Asthma Allergy',
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 220
      },
      {
        name: 'LB (Twin Swords)',
        linearFrames: false,
        framesList: '0-4-47-4-35-5-5-5-5-5-5-5-5-5-20-4',
        firstHit: 68,
        castTime: 40,
        offset: 0,
        base: 800,
        dualable: false
      },
      {
        name: 'TMR - Onion Cutter',
        hits: 16,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 520
      },
    ]
  },
  {
    id: 37,
    name: 'Queen',
    type: 'chain',
    abilities: [
      {
        name: 'Devastate +2',
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
    name: 'Prishe',
    type: 'chain',
    abilities: [
      {
        name: 'Raging Fists',
        hits: 8,
        frames: 5,
        firstHit: 2,
        castTime: 40,
        offset: 26,
        base: 350
      },
      {
        name: 'Prishe Special',
        hits: 15,
        frames: 4,
        firstHit: 4,
        castTime: 40,
        offset: 26,
        base: 500,
        ignore: 50
      }
    ]
  },
  {
    id: 39,
    name: 'Nyx',
    type: 'chain',
    abilities: [
      {
        name: 'Kingsglaive',
        hits: 8,
        frames: 8,
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
        name: 'Desperate Blow',
        hits: 1,
        frames: 1,
        firstHit: 180,
        castTime: 40,
        offset: 26,
        base: 750,
        type: 'finish'
      },
    ]
  },
  {
    id: 40,
    name: 'Glauca',
    type: 'chain',
    abilities: [
      {
        name: 'Daybreak Darkness',
        hits: 8,
        frames: 9,
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
    id: 43,
    name: 'Chic Ariana',
    type: 'chain',
    abilities: [
      {
        name: 'Alluring Chorus',
        linearFrames: false,
        framesList: '0-7-7-8-8-16-8',
        firstHit: 139,
        castTime: 40,
        offset: 16,
        base: 280,
        ignore: 25,
        damage: 'magic',
        dualable: false
      }
    ]
  },
  {
    id: 63,
    name: 'Goken',
    type: 'chain',
    abilities: [
      {
        name: 'Firm Punch',
        hits: 6,
        frames: 10,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        name: 'Light Kick',
        hits: 6,
        frames: 10,
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 200
      },
      {
        name: 'Wolfclaw Fist',
        hits: 8,
        frames: 10,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 500
      },
      {
        name: 'Falcon Kick',
        hits: 8,
        frames: 10,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        name: 'Tigerclaw Fist',
        hits: 10,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      },
      {
        name: 'Dragon Kick',
        hits: 10,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        name: 'LB - Fist Supreme',
        linearFrames: false,
        framesList: '0-7-9-7-9-7-9-9-5-5',
        firstHit: 47,
        castTime: 40,
        offset: 16,
        base: 840,
        dualable: false
      }
    ]
  },
  {
    id: 64,
    name: 'Toxic Rain',
    type: 'chain',
    abilities: [
      {
        name: 'Toxic Rain',
        hits: 7,
        frames: 10,
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
    id: 66,
    name: 'Grim Lord Sakura',
    type: 'chain',
    abilities: [
      {
        name: 'Grim - Soul Barrage',
        hits: 10,
        frames: 10,
        firstHit: 62,
        castTime: 40,
        offset: 16,
        base: 200,
        ignore: 50,
        damage: 'magic'
      },
      {
        name: 'Grim - Eldritch Flames',
        hits: 5,
        frames: 10,
        firstHit: 110,
        castTime: 40,
        offset: 16,
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
    ],
  },
  {
    id: 67,
    name: 'Pirate Jake',
    type: 'chain',
    abilities: [
      {
        name: 'Feed the Fishes',
        hits: 6,
        frames: 5,
        firstHit: 22,
        castTime: 40,
        offset: 16,
        base: 350,
        debuff: {
          water: 50
        }
      },
    ],
  },
  {
    id: 68,
    name: 'Illusionist Nichol',
    type: 'chain',
    abilities: [
      {
        name: 'Illusion - Phantasmal Forces',
        hits: 7,
        frames: 8,
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 600,
        damage: 'magic',
      },
    ],
  },
// Finish
  {
    id: 2,
    name: 'Firion',
    type: 'finish',
    abilities: [
      {
        name: 'Fin Briar',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 30,
        castTime: 40,
        offset: 0,
        base: 180,
        ignore: 25
      },
      {
        name: 'Fin Briar +2',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 30,
        castTime: 40,
        offset: 0,
        base: 230,
        ignore: 50
      }
    ]
  },
  {
    id: 36,
    name: 'Fire Veritas',
    type: 'finish',
    abilities: [
      {
        name: 'Heavy Stomp',
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
        name: 'Full Charge Stomp',
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
    id: 44,
    name: 'Eve',
    type: 'finish',
    abilities: [
      {
        name: 'Roundhouse Kick',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 10,
        castTime: 40,
        offset: 0,
        base: 350,
      }
    ]
  },
  {
    id: 45,
    name: 'Adam',
    type: 'finish',
    abilities: [
      {
        name: 'Cube Explosion - Large',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 40,
        offset: 0,
        base: 500,
      }
    ]
  },
  {
    id: 46,
    name: 'Vargas',
    type: 'finish',
    abilities: [
      {
        name: 'Supreme Blaze',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 240,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 50,
        elements : [
          'fire'
        ]
      }
    ]
  },
  {
    id: 47,
    name: 'Kelsus',
    type: 'finish',
    abilities: [
      {
        name: 'Crushing Vice',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 40,
        offset: 0,
        base: 500,
      }
    ]
  },
  {
    id: 48,
    name: 'Maxwell',
    type: 'finish',
    abilities: [
      {
        name: 'Destiny',
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
    name: 'Black Cat Lid',
    type: 'finish',
    abilities: [
      {
        name: 'Ultimate Blow',
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
    name: 'Helena',
    type: 'finish',
    abilities: [
      {
        name: 'Best Shot',
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
    name: 'Zargabaath',
    type: 'finish',
    abilities: [
      {
        name: 'Word of Law',
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
    id: 53,
    name: 'Grace',
    type: 'finish',
    abilities: [
      {
        name: 'Destroy Arm +2',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 250,
        ignore: 50
      }
    ]
  },
  {
    id: 54,
    name: 'Rem',
    type: 'finish',
    abilities: [
      {
        name: 'Dagger Boomerang (max)',
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
    name: 'Zyrus',
    type: 'finish',
    abilities: [
      {
        name: 'Blood Pulsar (max)',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 130,
        castTime: 40,
        offset: 0,
        base: 650,
        damage: 'magic'
      },
      {
        name: 'Blood Rend',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 90,
        castTime: 40,
        offset: 0,
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
    name: 'Shine',
    type: 'finish',
    abilities: [
      {
        name: 'Into Darkness',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 23,
        castTime: 40,
        offset: 0,
        base: 420,
        elements: [
          'dark'
        ]
      }
    ]
  },
  {
    id: 57,
    name: 'Olive',
    type: 'finish',
    abilities: [
      {
        name: 'True Shot',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 100,
        castTime: 40,
        offset: 0,
        base: 240,
        ignore: 50
      }
    ],
    dual: false
  },
  {
    id: 58,
    name: 'Emperor',
    type: 'finish',
    abilities: [
      {
        name: 'Starfall',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 350,
        castTime: 40,
        offset: 0,
        base: 230,
        ignore: 50,
        dualable: false,
        damage: 'magic'
      },
      {
        name: 'Fire From Below (max)',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2000,
        dualable: false,
        damage: 'magic',
        elements : [
          'fire'
        ]
      }
    ]
  },
  {
    id: 52,
    name: 'Luneth',
    type: 'finish',
    abilities: [
      {
        name: 'Cut Through +2',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 60,
        castTime: 40,
        offset: 0,
        base: 525,
        ignore: 50
      }
    ]
  },
  {
    id: 59,
    name: 'Dark Knight Cecil',
    type: 'finish',
    abilities: [
      {
        name: 'Soul Eater +2',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 20,
        castTime: 40,
        offset: 0,
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
    name: 'Gaffgarion',
    type: 'finish',
    abilities: [
      {
        name: 'Abyssal Blade +2',
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
    name: 'Kefka',
    type: 'finish',
    abilities: [
      {
        name: 'Light of Judgment +2',
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
    name: 'Bartz',
    type: 'finish',
    abilities: [
      {
        name: 'Wind Shear +2',
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 70,
        castTime: 40,
        offset: 0,
        base: 700,
        damage: 'hybrid'
      }
    ]
  },
//TMR
  {
    id: 41,
    name: 'Pod 153',
    type: 'chain',
    abilities: [
      {
        name: 'R020: Mirage',
        base: 300,
        linearFrames: true,
        hits: 8,
        frames: 10,
        castTime: 40,
        offset: 16,
        firstHit: 42
      },
    ]
  },
  {
    id: 65,
    name: 'Alterna',
    type: 'finish',
    abilities: [
      {
        name: 'Alterna',
        hits: 1,
        frames: 1,
        firstHit: 365,
        castTime: 40,
        offset: 16,
        base: 510,
        ignore: 25,
        damage: 'magic',
        type: 'finish'
      },
    ],
  },
  {
    id: 42,
    name: 'Generic Spells',
    type: 'finish',
    abilities: [
      {
        name: 'Meteor',
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
        name: 'Comet',
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
        name: 'Ultima',
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
        name: 'Stonja',
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
        name: 'Aeroja',
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
        name: 'Waterja',
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
        name: 'Thundaja',
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
        name: 'Blizzaja',
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
        name: 'firaja',
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

];
