export const UNITS: any[] = [
// Chain
  {
    id: 7,
    names: {
      en: '2B'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Avoid Attack',
          fr: 'Esquiver Attaque'
        },
        base: 900,
        linearFrames: true,
        frames: 9,
        castTime: 0,
        offset: 32,
        hits: 8,
        firstHit: 42
      },
      {
        names: {
          en: 'Extra Speed',
          fr: 'Attaque Sonique'
        },
        base: 600,
        linearFrames: false,
        framesList: '0-7-7-7-8-8-8-8-8-8',
        castTime: 8,
        offset: 32,
        firstHit: 2
      },
      {
        names: {
          en: 'R050: Spear',
          fr: 'R050: Lance'
        },
        base: 550,
        linearFrames: true,
        frames: 5,
        castTime: 8,
        offset: 32,
        hits: 6,
        firstHit: 22
      },
      {
        names: {
          en: 'Steel Pipe',
          fr: '? Steel Pipe ?'
        },
        base: 200,
        linearFrames: false,
        framesList: '0-8-8-8-8-8-8-9',
        castTime: 8,
        offset: 32,
        firstHit: 42
      },
      {
        names: {
          en: 'A150: Vault (activated)',
          fr: 'A150: Décharge (activé)'
        },
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
    names: {
      en: '9S'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Counter Attack'
        },
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
    names: {
      en: 'A2'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Dash Attack'
        },
        base: 400,
        linearFrames: false,
        framesList: '0-7-7-8-8-16-8',
        castTime: 7,
        offset: 26,
        firstHit: 9,
      },
      {
        names: {
          en: 'Offensive Heal Combo (Math are wrong)'
        },
        base: 510,
        linearFrames: false,
        framesList: '0-5-5-5-5-5-5-5-5-5-5-5-5-5',
        castTime: 40,
        offset: 16,
        firstHit: 35,
      },
      {
        names: {
          en: 'Heavy Attack'
        },
        base: 330,
        linearFrames: false,
        framesList: '0-9-9-9-9-9-5-4-9-5',
        castTime: 40,
        offset: 16,
        firstHit: 42,
      },
      {
        names: {
          en: 'Finisher'
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
      en: 'Ace'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Tri-Beam Laser +2'
        },
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
        names: {
          en: 'Attack Hand'
        },
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
    names: {
      en: 'Agrias'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Divine Ruination'
        },
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
        names: {
          en: 'Divine Ruination +2'
        },
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
    names: {
      en: 'Aileen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Piledriver'
        },
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
        names: {
          en: 'Piledriver +2 (JP Only)'
        },
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
    names: {
      en: 'Amelia'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Disorder'
        },
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
    names: {
      en: 'Ashe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Heaven\'s Fury'
        },
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
        names: {
          en: 'Sword of Kings'
        },
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
    names: {
      en: 'Bran'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Thunder Clap'
        },
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
    names: {
      en: 'Chizuru'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Phantom Shadow'
        },
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
    names: {
      en: 'Dark Fina',
      fr: 'Fina Obscure'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Ultima +2'
        },
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
        names: {
          en: 'Dystopia (max)'
        },
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
    names: {
      en: 'Dark Veritas',
      fr: 'Veritas des Ténèbres'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Dark Punishment'
        },
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
        names: {
          en: 'Dark Edge'
        },
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
    names: {
      en: 'Fohlen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Sonic Blast'
        },
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
    names: {
      en: 'Fryevia'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Frost Flower Blitz'
        },
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
        names: {
          en: 'Second Intention'
        },
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
    names: {
      en: 'Gilgamesh'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tri-Attack'
        },
        base: 300,
        linearFrames: false,
        framesList: '0-4-16-4-16-4',
        castTime: 40,
        offset: 26,
        firstHit: 40
      },
      {
        names: {
          en: 'Tri-Attack +2'
        },
        base: 300,
        linearFrames: false,
        framesList: '0-4-6-4-6-4-6-4-6-4-6-4',
        castTime: 40,
        offset: 26,
        firstHit: 40
      },
      {
        names: {
          en: 'Snowpetal +2'
        },
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
    names: {
      en: 'Knight Delita',
      fr: 'Delita Chevalier'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Commanding Blade'
        },
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
        names: {
          en: 'Lightning Stab'
        },
        base: 230,
        hits: 6,
        frames: 5,
        castTime: 40,
        offset: 16,
        firstHit: 42
      },
      {
        names: {
          en: 'Strategic blade'
        },
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
    names: {
      en: 'Light Veritas',
      fr: 'Veritas de la Lumière'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Divine Shot'
        },
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
        names: {
          en: 'Saint Buster'
        },
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
    names: {
      en: 'Lunera'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Aureole Ray'
        },
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
        names: {
          en: 'Aureole Ray +2 (JP Only)'
        },
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
        names: {
          en: 'Gleaming Arrow (max)'
        },
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
        names: {
          en: 'Gail Arrow (max)'
        },
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
    names: {
      en: 'Mercenary Ramza',
      fr: 'Ramza Mercenaire'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Blade of Justice'
        },
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
    names: {
      en: 'Orlandeau'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Holy Explosion'
        },
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
        names: {
          en: 'Holy Explosion +2 (JP Only)'
        },
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
    names: {
      en: 'Randi'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Torrential Slash'
        },
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
    names: {
      en: 'Rasler'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Patriotic Slash'
        },
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
    names: {
      en: 'Reberta'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Mystic Thrust'
        },
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
    names: {
      en: 'Rikku'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Burning Soul'
        },
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
        names: {
          en: 'Winter Storm'
        },
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
        names: {
          en: 'Lightning Rod'
        },
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
        names: {
          en: 'Tidal Wave +2 (JP Only)'
        },
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
        names: {
          en: 'Tidal Wave'
        },
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
    names: {
      en: 'Seabreeze Dark Fina',
      fr: 'Fina Obscure en Maillot'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Ultima +2 (JP Only)'
        },
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
        names: {
          en: 'Utopia (max)'
        },
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
    names: {
      en: 'Setzer'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Prismatic Flash'
        },
        base: 180,
        hits: 7,
        frames: 5,
        firstHit: 42,
        castTime: 40,
        offset: 16
      },
      {
        names: {
          en: 'Red Card'
        },
        base: 320,
        hits: 10,
        frames: 3,
        firstHit: 40,
        castTime: 40,
        offset: 16
      },
      {
        names: {
          en: 'Double Dice'
        },
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
    names: {
      en: 'Shantotto'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tornado'
        },
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
    names: {
      en: 'Trance Terra',
      fr: 'Terra en Transe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Chaos Wave'
        },
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
        names: {
          en: 'Chaos Wave +2'
        },
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
        names: {
          en: 'Ultima +2'
        },
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
    names: {
      en: 'Tidus'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Quick Hit'
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
          en: 'Quick Hit +2 (JP Only)'
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
          en: 'Energy Rain'
        },
        hits: 4,
        firstHit: 67,
        frames: 10,
        castTime: 40,
        offset: 16,
        base: 180
      },
      {
        names: {
          en: 'Jecht Shot'
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
      }
    ],
    weapons : [
      'water'
    ]
  },
  {
    id: 31,
    names: {
      en: 'Vaan'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Assault Strike'
        },
        hits: 8,
        firstHit: 22,
        frames: 8,
        castTime: 40,
        offset: 16,
        base: 270
      },
      {
        names: {
          en: 'Assault Strike +2 (JP Only)'
        },
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
    names: {
      en: 'Vargas'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Flare Ride+'
        },
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
    names: {
      en: 'Victoria'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Overflow (Max charge)'
        },
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
    names: {
      en: 'Zidane (JP Only - 6 stars)'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Free Energy'
        },
        hits: 8,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 360
      },
      {
        names: {
          en: 'Free Energy +2'
        },
        hits: 8,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 450
      },
      {
        names: {
          en: 'Lucky Seven'
        },
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
    names: {
      en: 'Onion Knight',
      fr: 'Chevalier Oignon'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Splendor of the Wind'
        },
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
        names: {
          en: 'Splendor of the Fire'
        },
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
        names: {
          en: 'Splendor of the Earth'
        },
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
        names: {
          en: 'Splendor of the Water'
        },
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
        names: {
          en: 'Onion Slice'
        },
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 400
      },
      {
        names: {
          en: 'Asthma Allergy'
        },
        hits: 12,
        frames: 7,
        firstHit: 42,
        castTime: 40,
        offset: 0,
        base: 220
      },
      {
        names: {
          en: 'LB (Twin Swords)'
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
          en: 'TMR - Onion Cutter'
        },
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
    names: {
      en: 'Queen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Devastate +2'
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
      en: 'Prishe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Raging Fists'
        },
        hits: 8,
        frames: 5,
        firstHit: 2,
        castTime: 40,
        offset: 26,
        base: 350
      },
      {
        names: {
          en: 'Prishe Special'
        },
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
    names: {
      en: 'Nyx'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Kingsglaive'
        },
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
        names: {
          en: 'Desperate Blow'
        },
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
    names: {
      en: 'Glauca'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Daybreak Darkness'
        },
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
    names: {
      en: 'Chic Ariana',
      fr: 'Ariana Chic'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Alluring Chorus'
        },
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
    names: {
      en: 'Goken'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Firm Punch'
        },
        hits: 6,
        frames: 10,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Light Kick'
        },
        hits: 6,
        frames: 10,
        firstHit: 50,
        castTime: 40,
        offset: 16,
        base: 200
      },
      {
        names: {
          en: 'Wolfclaw Fist'
        },
        hits: 8,
        frames: 10,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 500
      },
      {
        names: {
          en: 'Falcon Kick'
        },
        hits: 8,
        frames: 10,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 300
      },
      {
        names: {
          en: 'Tigerclaw Fist'
        },
        hits: 10,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 600
      },
      {
        names: {
          en: 'Dragon Kick'
        },
        hits: 10,
        frames: 8,
        firstHit: 42,
        castTime: 40,
        offset: 16,
        base: 400
      },
      {
        names: {
          en: 'LB - Fist Supreme'
        },
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
    names: {
      en: 'Toxic Rain'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Toxic Rain'
        },
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
    names: {
      en: 'Grim Lord Sakura',
      fr: 'Sakura, Seigneur Sombre'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Grim - Soul Barrage'
        },
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
        names: {
          en: 'Grim - Eldritch Flames'
        },
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
      {
        names: {
          en: 'LB - Phantom Fury (max)'
        },
        linearFrames: false,
        framesList: '0-4-4-4-4-4-4-4-30',
        firstHit: 62,
        castTime: 40,
        offset: 16,
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
      fr: 'Jake, Pirate'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Feed the Fishes'
        },
        hits: 6,
        frames: 5,
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
          en: 'LB - Unleash the Kraken (max)'
        },
        linearFrames: false,
        framesList: '0-10-10-10-35-10-10-10',
        firstHit: 62,
        castTime: 40,
        offset: 16,
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
      fr: 'Nichol, Illusionniste'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Illusion - Phantasmal Forces'
        },
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
    names: {
      en: 'Firion'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Fin Briar'
        },
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
        names: {
          en: 'Fin Briar +2'
        },
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
    names: {
      en: 'Fire Veritas',
      fr: 'Veritas des Flammes'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Heavy Stomp'
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
          en: 'Full Charge Stomp'
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
    id: 44,
    names: {
      en: 'Eve'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Roundhouse Kick'
        },
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
    names: {
      en: 'Adam'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Cube Explosion - Large'
        },
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
    names: {
      en: 'Vargas'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Supreme Blaze'
        },
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
    names: {
      en: 'Kelsus'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Crushing Vice'
        },
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
    names: {
      en: 'Maxwell'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Destiny'
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
      fr: 'Chatte Noire Lid'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Ultimate Blow'
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
      en: 'Helena'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Best Shot'
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
      en: 'Zargabaath'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Word of Law'
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
    id: 53,
    names: {
      en: 'Grace'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Destroy Arm +2'
        },
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
    names: {
      en: 'Rem'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Dagger Boomerang (max)'
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
      en: 'Zyrus'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Blood Pulsar (max)'
        },
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
        names: {
          en: 'Blood Rend'
        },
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
    names: {
      en: 'Shine'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Into Darkness'
        },
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
    names: {
      en: 'Olive'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'True Shot'
        },
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
    names: {
      en: 'Emperor',
      fr: 'Empereur'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Starfall'
        },
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
        names: {
          en: 'Fire From Below (max)'
        },
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
      },
      {
        names: {
          en: 'Fire From Below +2 (max)'
        },
        type: 'finish',
        hits: 1,
        frames: 1,
        firstHit: 80,
        castTime: 40,
        offset: 0,
        base: 2500,
        dualable: false,
        damage: 'magic',
        elements : [
          'fire'
        ],
        debuff: {
          fire: 50
        }
      }
    ]
  },
  {
    id: 52,
    names: {
      en: 'Luneth'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Cut Through +2'
        },
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
    names: {
      en: 'Dark Knight Cecil',
      fr: 'Chevalier Noir Cécil'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Soul Eater +2'
        },
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
    names: {
      en: 'Gaffgarion'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Abyssal Blade +2'
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
      en: 'Kefka'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Light of Judgment +2'
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
      en: 'Bartz'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Wind Shear +2'
        },
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
    names: {
      en: 'Pod 153'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'R020: Mirage'
        },
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
    names: {
      en: 'Alterna'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Alterna'
        },
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
    names: {
      en: 'Generic Spells'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Meteor'
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
          en: 'Comet'
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
          en: 'Ultima'
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
          en: 'Stonja'
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
          en: 'Aeroja'
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
          en: 'Waterja'
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
          en: 'Thundaja'
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
          en: 'Blizzaja'
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
          en: 'firaja'
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
];
