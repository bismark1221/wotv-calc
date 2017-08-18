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
    id: 6,
    name: 'Veritas of the Dark',
    type: 'chain',
    abilities: [
      {
        name: 'Dark Punishment',
        base: 200,
        linearFrames: false,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        framesList: '0-7-5-7-7-7-7',
        ignore: 2,
        debuff: {
          dark : 1.5
        }
      }
    ],
    weapons : [
      'dark'
    ]
  }
];
