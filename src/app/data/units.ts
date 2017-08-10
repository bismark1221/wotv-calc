import { Unit } from '../entities/unit';

export const UNITS: Unit[] = [
  {
    id: 1,
    name: 'Tidus',
    type: 'chain',
    abilities: [
      {
        name: 'Quick Hit',
        hits: 12,
        frames: 5,
        base: 400
      }
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
    name: 'Orlandu',
    type: 'chain',
    abilities: [
      {
        name: 'Holy Explosion',
        base: 200,
        hits: 7,
        frames: 7,
      }
    ]
  }
];
