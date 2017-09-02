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
      }
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
      {
        name: 'TM (R020: Mirage)',
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
        base: 500,
        linearFrames: false,
        framesList: '0-10-10-10-10-10-10-10',
        castTime: 40,
        offset: 16,
        firstHit: 42,
      },
      {
        name: 'Heavy Attack',
        base: 330,
        linearFrames: false,
        framesList: '0-9-9-9-9-9-5-4-9-5',
        castTime: 40,
        offset: 16,
        firstHit: 42,
      }
    ]
  },
  {
    id: 10,
    name: 'Ace',
    type: 'chain',
    'abilities': [
      {
        name: 'Tri-Beam Laser + 2',
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
        }
      }
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
        name: 'Divine Ruination + 2 (JP Only)',
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
      'ligth'
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
        name: 'Piledriver + 2 (JP Only)',
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
        type: 'magic'
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
        offset: 26,
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
        name: 'Ultima + 2',
        base: 280,
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        castTime: 40,
        offset: 16,
        firstHit: 140,
        ignore: 50,
        type: 'magic'
      },
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
        type: 'hybrid',
        debuff: {
          ice: 50
        },
        elements: [
          'ice'
        ]
      },
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
        name: 'Tri-Attack + 2 (JP Only)',
        base: 300,
        linearFrames: false,
        framesList: '0-4-6-4-6-4-6-4-6-4-6-4',
        castTime: 40,
        offset: 26,
        firstHit: 40
      },
    ]
  },
  {
    id: 20,
    name: 'Knight Delita',
    type: 'chain',
    abilities: [
      {
        name: 'Strategic Blade',
        base: 230,
        hits: 8,
        frames: 5,
        castTime: 40,
        offset: 16,
        firstHit: 51,
        elements: [
          'lightning'
        ]
      },
      {
        name: 'Lightning Stab',
        base: 250,
        hits: 6,
        frames: 5,
        castTime: 40,
        offset: 16,
        firstHit: 42,
        ignore: 50,
        debuff: {
          lightning: 50
        }
      },
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
        type: 'hybrid',
        elements: [
          'light'
        ],
        debuff: {
          light: 50
        }
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
        type: 'magic'
      },
      {
        name: 'Aureole Ray + 2 (JP Only)',
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
        type: 'magic'
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
        name: 'Holy Explosion + 2 (JP Only)',
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
        base: 400,
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
        name: 'Tidal Wave + 2 (JP Only)',
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
        name: 'Ultima + 2 (JP Only)',
        base: 280,
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        castTime: 40,
        offset: 16,
        firstHit: 140,
        ignore: 50,
        type: 'magic'
      },
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
      }
    ]
  },
  {
    id: 29,
    name: 'Shantotto',
    type: 'chain',
    abilities: [
      {
        name: 'Tornado (JP only - 5 stars)',
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
        type: 'magic'
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
        type: 'magic'
      },
      {
        name: 'Chaos Wave + 2 (JP Only)',
        base: 420,
        hits: 10,
        frames: 8,
        castTime: 40,
        offset: 16,
        firstHit: 60,
        ignore: 50,
        type: 'magic'
      },
      {
        name: 'Ultima + 2 (JP Only)',
        base: 280,
        linearFrames: false,
        framesList: '0-37-38-37-38-38-37',
        castTime: 40,
        offset: 16,
        firstHit: 140,
        ignore: 50,
        type: 'magic'
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
        name: 'Quick Hit + 2 (JP Only)',
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
        name: 'Assault Strike + 2 (JP Only)',
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
        ]
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
        name: 'Free Energy + 2',
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
        name: 'TM (Onion Cutter)',
        hits: 16,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 520
      },
      {
        name: 'LB (Twin Swords)',
        linearFrames: false,
        framesList: '0-4-47-4-35-5-5-5-5-5-5-5-5-5-20-4',
        firstHit: 68,
        castTime: 40,
        offset: 0,
        base: 800,
        type: 'LB'
      }
    ]
  },
// Finish
  {
    id: 2,
    name: 'Firion',
    type: 'finish',
    abilities: [
      {
        name: 'Fin Briar',
        base: 230,
        frames: 1,
        hits: 1
      }
    ]
  }
];
