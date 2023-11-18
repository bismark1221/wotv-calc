import { Card } from './card';

describe('entities/card', () => {
  let card: Card;

  beforeEach(() => {
    card = new Card();
  });

  it('return max level per star (SR/0)', () => {
    // @ts-ignore
    expect(card.getLevelPerStar('SR', 0)).toEqual(20);
  });

  it('return max level per star (UR/4)', () => {
    // @ts-ignore
    expect(card.getLevelPerStar('UR', 4)).toEqual(99);
  });

  it('return max level per star (R/null)', () => {
    // @ts-ignore
    expect(card.getLevelPerStar('R', null)).toEqual(20);
  });

  it('return max level per star (R/100)', () => {
    // @ts-ignore
    expect(card.getLevelPerStar('R', 100)).toEqual(20);
  });

  it('return max level per star (AZERTY/1)', () => {
    // @ts-ignore
    expect(card.getLevelPerStar('AZERTY', 1)).toEqual(1);
  });

  it('update max level (UR/4)', () => {
    card.rarity = 'UR';
    card.star = 4;
    // @ts-ignore
    card.updateMaxLevel();

    expect(card.level).toEqual(undefined);
    expect(card.tableLevels.length).toEqual(99);
  });

  it('return max level per star (UR/2)', () => {
    card.rarity = 'UR';
    card.star = 2;
    card.level = 99;
    // @ts-ignore
    card.updateMaxLevel();

    expect(card.level).toEqual(70);
    expect(card.tableLevels.length).toEqual(70);
  });
});
