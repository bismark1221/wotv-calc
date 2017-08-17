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
        linearFrames: 5,
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
        linearFrames: 1,
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
        castTime: 40,
        offset: 16,
        firstHit: 70,
        frames: '0-7-5-7-7-7-7',
        ignore: 2,
        debuff: {
          light : 1.5
        }
      },
      {
        name: 'Holy Explosion + 2',
        base: 260,
        castTime: 40,
        offset: 16,
        firstHit: 70,
        frames: '0-7-5-7-7-7-7',
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
        linearFrames: 4,
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
        linearFrames: 15,
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
        linearFrames: 8,
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
  }
];
