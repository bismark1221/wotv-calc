export const UNITS: any[] = [
  {
    id: 1,
    name: 'Tidus',
    type: 'chain',
    abilities: [
      {
        name: 'Quick Hit',
        hits: 12,
        firstHit: 22,
        frames: 5,
        base: 400
      }
    ],
    weapons : [
      'water'
    ]
  },
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
        ignore: 2,
        debuff: {
          light : 1.5
        }
      },
      {
        name: 'Holy Explosion + 2',
        base: 260,
        linearFrames: false,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        framesList: '0-7-5-7-7-7-7',
        ignore: 2,
        debuff: {
          light : 1.5
        }
      }
    ],
    weapons : [
      'light'
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
        ignore: 1,
        elements: [
          'wind',
          'light'
        ],
        type: 'magic'
      },
      {
        name: 'Aureole Ray + 2',
        base: 400,
        hits: 30,
        frames: 4,
        castTime: 40,
        offset: 16,
        firstHit: 42,
        ignore: 1,
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
    id: 7,
    name: '2B',
    type: "chain",
    "abilities": [
      {
        name: "Avoid Attack",
        base: 900,
        linearFrames: true,
        frames: 9,
        castTime: 0,
        offset: 32,
        hits: 8,
        firstHit: 42
      },
      {
        name: "Extra Speed",
        base: 600,
        linearFrames: false,
        framesList: '0-7-7-7-8-8-8-8-8-8',
        castTime: 8,
        offset: 32,
        firstHit: 2
      },
      {
        name: "R050: Spear",
        base: 550,
        linearFrames: true,
        frames: 5,
        castTime: 8,
        offset: 32,
        hits: 6,
        firstHit: 22
      },
      {
        name: "Steel Pipe",
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
    type: "chain",
    "abilities": [
      {
        name: "Counter Attack",
        base: 180,
        linearFrames: true,
        hits: 5,
        frames: 10,
        castTime: 8,
        offset: 32,
        firstHit: 42,
        ignore: 2
      },
      {
        name: "TM (R020: Mirage)",
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
    type: "chain",
    "abilities": [
      {
        name: "Dash Attack",
        base: 400,
        linearFrames: false,
        framesList: '0-7-7-8-8-16-8',
        castTime: 7,
        offset: 32,
        firstHit: 9,
      },
      {
        name: "Offensive Heal Combo (Math are wrong)",
        base: 255,
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-5-5',
        castTime: 40,
        offset: 16,
        firstHit: 42,
      },
      {
        name: "Heavy Attack",
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
    type: "chain",
    "abilities": [
      {
        name: "Tri-Beam Laser + 2",
        base: 2250,
        linearFrames: true,
        hits: 7,
        frames: 7,
        castTime: 40,
        offset: 16,
        firstHit: 64,
        ignore: 1.5,
        debuff: {
          fire : 1.75,
          light : 1.75,
          lightning : 1.75
        }
      }
    ],
    dual: false
  },
  {
    id: 11,
    name: 'Agrias',
    type: "chain",
    "abilities": [
      {
        name: "Divine Ruination",
        base: 160,
        linearFrames: true,
        hits: 5,
        frames: 10,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        ignore: 2,
        debuff: {
          light : 1.5
        }
      },
      {
        name: "Divine Ruination + 2",
        base: 200,
        linearFrames: false,
        framesList: '0-7-5-7-7-7-7',
        castTime: 40,
        offset: 16,
        firstHit: 70,
        ignore: 2,
        debuff: {
          light : 1.5
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
        ignore: 2,
        debuff: {
          earth : 1.5
        }
      },
      {
        name: 'Piledriver + 2',
        base: 250,
        hits: 7,
        frames: 8,
        castTime: 8,
        offset: 36,
        firstHit: 2,
        ignore: 2,
        debuff: {
          earth : 1.75
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
        ignore: 1.5,
      },
      {
        name: 'Sword of Kings',
        base: 270,
        hits: 7,
        frames: 10,
        castTime: 40,
        offset: 16,
        firstHit: 42
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
          light : 1.5,
          lightning : 1.5
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
        ignore: 2
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
        ignore: 2,
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
        ignore: 2,
        debuff: {
          dark : 1.5
        }
      }
    ],
    weapons : [
      'dark'
    ]
  },
  {
    id: 17,
    name: 'Folhen',
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
        ignore: 2,
        debuff: {
          wind : 1.5
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
        debuff: {
          ice : 1.5
        },
        elements: [
          'ice'
        ]
      },
    ]
  }
];


/*
  {
    id: ,
    name: '',
    type: "chain",
    "abilities": [
      {
        name: "Avoid Attack",
        base: 900,
        linearFrames: true,
        hits: 8,
        frames: 9,
        castTime: 0,
        offset: 32,
        firstHit: 42,
        ignore: 2,
        debuff: {
          earth : 1.75
        }
      },
      {
        name: "Extra Speed",
        base: 600,
        linearFrames: false,
        framesList: '0-7-7-7-8-8-8-8-8-8',
        castTime: 8,
        offset: 32,
        firstHit: 2,
        ignore: 2,
        debuff: {
          earth : 1.75
        }
      }
    ],
    weapons : [
      'dark'
    ],
    dual: false
  }
*/
