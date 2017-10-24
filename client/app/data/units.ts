export const UNITS: any[] = [
// Chain
  {
    id: 7,
    names: {
      en: '2B',
      fr: '2B'
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
          en: 'Extract Speed',
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
          fr: 'Barre de fer'
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
          en: 'A150: Vault',
          fr: 'A150: Décharge'
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
      en: '9S',
      fr: '9S'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Counter Attack',
          fr: 'Contre-attaquer'
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
      en: 'A2',
      fr: 'A2'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Dash Attack',
          fr: 'Attaque rapide'
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
          en: 'Offensive Heal Combo (Modifier are wrong)',
          fr: 'Combo offensivo-curatif (Le modificateur est incorrecte)'
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
          en: 'Heavy Attack',
          fr: 'Attaque lourde'
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
      fr: 'Ace'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Tri-Beam Laser +2',
          fr: 'Laser triple +2'
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
          en: 'Attack Hand',
          fr: 'Tirage explosif'
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
      en: 'Agrias',
      fr: 'Agrias'
    },
    type: 'chain',
    'abilities': [
      {
        names: {
          en: 'Divine Ruination',
          fr: 'Ruine divine'
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
          en: 'Divine Ruination +2',
          fr: 'Ruine divine +2'
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
      en: 'Aileen',
      fr: 'Aileen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Piledriver',
          fr: 'Sonnette'
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
          en: 'Piledriver +2 (JP Only)',
          fr: 'Sonnette +2 (JP Seulement)'
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
      en: 'Amelia',
      fr: 'Amelia'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Disorder',
          fr: 'Désordre'
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
      en: 'Ashe',
      fr: 'Ashe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Heaven\'s Fury',
          fr: 'Ire céleste'
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
          en: 'Sword of Kings',
          fr: 'Épée des Rois'
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
      en: 'Bran',
      fr: 'Bran'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Thunder Clap',
          fr: 'Coup de tonnerre'
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
      en: 'Chizuru',
      fr: 'Chizuru'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Phantom Shadow',
          fr: 'Ombre fantasmatique'
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
          en: 'Ultima +2',
          fr: 'Ultima +2'
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
          en: 'Dystopia (max)',
          fr: 'Dystopie (max)'
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
          en: 'Dark Punishment',
          fr: 'Punition obscure'
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
          en: 'Dark Edge',
          fr: 'Entaille obscure'
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
      en: 'Fohlen',
      fr: 'Fohlen'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Sonic Blast',
          fr: 'Rafale sonique'
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
      en: 'Fryevia',
      fr: 'Fryevia'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Frost Flower Blitz',
          fr: 'Pétales gelés'
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
          en: 'Second Intention',
          fr: 'Seconde intention'
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
      en: 'Gilgamesh',
      fr: 'Gilgamesh'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tri-Attack',
          fr: 'Triple-attaque'
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
          en: 'Tri-Attack +2',
          fr: 'Triple-attaque +2'
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
          en: 'Snowpetal +2',
          fr: 'Flocon de neige +2'
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
          en: 'Commanding Blade',
          fr: 'Lame du commandant'
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
          en: 'Lightning Stab',
          fr: 'Décharge sacrée'
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
          en: 'Strategic blade',
          fr: 'Lame du stratège'
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
          en: 'Divine Shot',
          fr: 'Tir divin'
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
          en: 'Saint Buster',
          fr: 'Casseur céleste'
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
      en: 'Lunera',
      fr: 'Lunera'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Aureole Ray',
          fr: 'Rayon auréole'
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
          en: 'Aureole Ray +2 (JP Only)',
          fr: 'Rayon auréole +2 (JP Seulement)'
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
          en: 'Gleaming Arrow (max)',
          fr: 'Flèche étincelante (max)'
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
          en: 'Gail Arrow (max)',
          fr: 'Flèche tornade (max)'
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
          en: 'Blade of Justice',
          fr: 'Lame de la justice'
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
      en: 'Orlandeau',
      fr: 'Orlandeau'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Divine Ruination',
          fr: 'Ruine divine'
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
          en: 'Divine Ruination +2 (JP Only)',
          fr: 'Ruine divine +2 (JP Seulement)'
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
      en: 'Randi',
      fr: 'Randi'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Torrential Slash',
          fr: 'Entaille torrentielle'
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
      en: 'Rasler',
      fr: 'Rasler'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Patriotic Slash',
          fr: 'Coup patriotique'
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
      en: 'Reberta',
      fr: 'Reberta'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Mystic Thrust',
          fr: 'Coup mystique'
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
      en: 'Rikku',
      fr: 'Rikku'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Burning Soul',
          fr: 'Âme ardente'
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
          en: 'Winter Storm',
          fr: 'Avalanche'
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
          en: 'Lightning Rod',
          fr: 'Flash'
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
          en: 'Tidal Wave',
          fr: 'Tsunami'
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
      },
      {
        names: {
          en: 'Tidal Wave +2 (JP Only)',
          fr: 'Tsunami +2 (JP Seulement)'
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
          en: 'Ultima +2 (JP Only)',
          fr: 'Ultima +2 (JP Seulement)'
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
          en: 'Utopia (max)',
          fr: 'Utopie (max)'
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
      en: 'Setzer',
      fr: 'Setzer'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Prismatic Flash',
          fr: 'Prisme arc-en-ciel'
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
          en: 'Red Card',
          fr: 'Carte sanglante'
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
          en: 'Double Dice',
          fr: 'Double dés'
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
      en: 'Shantotto',
      fr: 'Shantotto'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Tornado',
          fr: 'Tornade'
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
          en: 'Chaos Wave',
          fr: 'Onde chaotique'
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
          en: 'Chaos Wave +2',
          fr: 'Onde chaotique +2'
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
          en: 'Ultima +2',
          fr: 'Ultima +2'
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
      en: 'Tidus',
      fr: 'Tidus'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Quick Hit',
          fr: 'Attaque éclair'
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
          fr: 'Attaque éclair +2 (JP Seulement)'
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
          fr: 'Déluge d\'énergie'
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
          en: 'Jecht Shot',
          fr: 'Jecht Shoot'
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
      en: 'Vaan',
      fr: 'Vaan'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Assault Strike',
          fr: 'Violent assaut',
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
          en: 'Assault Strike +2 (JP Only)',
          fr: 'Violent assaut +2 (JP Seulement)',
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
      en: 'Vargas',
      fr: 'Vargas'
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
        castTime: 40,
        offset: 26,
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
    id: 33,
    names: {
      en: 'Victoria',
      fr: 'Victoria'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Overflow (max)',
          fr: 'Dépassement (max)'
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
      en: 'Zidane (JP Only - 6 stars)',
      fr: 'Djidane (JP Seulement - 6 étoiles)'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Free Energy',
          fr: 'Energétik'
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
          en: 'Free Energy +2',
          fr: 'Energétik +2'
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
          en: 'Lucky Seven',
          fr: 'Coudepot'
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
          en: 'Splendor of the Wind',
          fr: 'Splendeur du vent'
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
          en: 'Splendor of the Fire',
          fr: 'Splendeur du feu'
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
          en: 'Splendor of the Earth',
          fr: 'Splendeur de la terre'
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
          en: 'Splendor of the Water',
          fr: 'Splendeur de l\'eau'
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
          en: 'Onion Slice',
          fr: 'Tranche-oignon'
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
          en: 'Full Speed Bladeblitz',
          fr: 'Lame éclair rapide'
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
          en: 'LB - Twin Swords',
          fr: 'LB - Double épées'
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
      en: 'Queen',
      fr: 'Queen'
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
      fr: 'Prishe'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Raging Fists',
          fr: 'Poings de colère'
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
          en: 'Prishe Special',
          fr: 'Spécialité de Prishe'
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
      en: 'Nyx',
      fr: 'Nyx'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Kingsglaive',
          fr: 'Glaive du roi'
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
          en: 'Desperate Blow',
          fr: 'Attaque désespérée'
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
      en: 'Glauca',
      fr: 'Glauca'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Daybreak Darkness',
          fr: 'Ténèbres de l\'aube'
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
      fr: 'Ariana chic'
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
      en: 'Goken',
      fr: 'Goken'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Firm Punch',
          fr: 'Poing ferme'
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
          en: 'Light Kick',
          fr: 'Coup de pied léger'
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
          en: 'Wolfclaw Fist',
          fr: 'Poings croc-de-loup'
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
          en: 'Falcon Kick',
          fr: 'Coup de pied du Faucon'
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
          en: 'Tigerclaw Fist',
          fr: 'Poings croc-de-tigre'
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
          en: 'Dragon Kick',
          fr: 'Coup de pied du Dragon'
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
          en: 'LB - Fist Supreme',
          fr: 'LB - Coup de poings ultime'
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
      en: 'Toxic Rain',
      fr: 'Pluie toxique'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'Toxic Rain',
          fr: 'Pluie toxique'
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
          en: 'Grim - Soul Barrage',
          fr: 'Obscurité - Barrage spectral'
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
          en: 'Grim - Eldritch Flames',
          fr: 'Obscurité - Flammes surnaturelles'
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
          en: 'LB - Phantom Fury',
          fr: 'LB - Furie fantomatique'
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
          en: 'Feed the Fishes',
          fr: 'Nourrissez les poissons'
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
          en: 'LB - Unleash the Kraken',
          fr: 'LB - Relâchez le Kraken'
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
          en: 'Illusion - Phantasmal Forces',
          fr: 'Illusion - Forces fantasmagorique'
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
      en: 'Firion',
      fr: 'Firion'
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
        castTime: 40,
        offset: 0,
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
    id: 44,
    names: {
      en: 'Eve',
      fr: 'Ève'
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
        castTime: 40,
        offset: 0,
        base: 350,
      }
    ]
  },
  {
    id: 45,
    names: {
      en: 'Adam',
      fr: 'Adam'
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
        castTime: 40,
        offset: 0,
        base: 500,
      }
    ]
  },
  {
    id: 47,
    names: {
      en: 'Kelsus',
      fr: 'Kelsus'
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
        castTime: 40,
        offset: 0,
        base: 500,
      }
    ]
  },
  {
    id: 48,
    names: {
      en: 'Maxwell',
      fr: 'Maxwell'
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
      fr: 'Chatte noire Lid'
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
      fr: 'Helena'
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
      fr: 'Zargabaath'
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
    id: 53,
    names: {
      en: 'Grace',
      fr: 'Grace'
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
      en: 'Rem',
      fr: 'Rem'
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
      fr: 'Zyrus'
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
        castTime: 40,
        offset: 0,
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
      en: 'Shine',
      fr: 'Shine'
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
      en: 'Olive',
      fr: 'Olive'
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
        dualable: false,
        damage: 'magic'
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
        dualable: false,
        damage: 'magic',
        elements : [
          'fire'
        ]
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
      en: 'Luneth',
      fr: 'Luneth'
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
          en: 'Soul Eater +2',
          fr: 'Mangeur d\'âme +2'
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
      en: 'Gaffgarion',
      fr: 'Gaffgarion'
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
      fr: 'Kefka'
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
      fr: 'Bartz'
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
      en: 'Pod 153',
      fr: 'Pod 153'
    },
    type: 'chain',
    abilities: [
      {
        names: {
          en: 'R020: Mirage',
          fr: 'R020: Mirage'
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
      en: 'Alterna',
      fr: 'Alternance'
    },
    type: 'finish',
    abilities: [
      {
        names: {
          en: 'Alterna',
          fr: 'Alternance'
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
      en: 'Generic Spells',
      fr: 'Sorts génériques'
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
  // Espers
  {
    id: 69,
    names: {
      en: 'Siren',
      fr: 'Sirène'
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
      fr: 'Ifrit'
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
      fr: 'Shiva'
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
      fr: 'Diabolos'
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
      fr: 'Ramuh'
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
      fr: 'Titan'
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
      fr: 'Tétra-Sylphides'
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
      fr: 'Odin'
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
      fr: 'Bahamut'
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
        firstHit: 210,
        castTime: 40,
        offset: 0,
        base: 300,
        damage: 'magic',
        dualable: false
      },
    ],
    dual: false
  }
];
