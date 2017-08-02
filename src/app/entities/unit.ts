import { Ability } from './ability';

export class Unit {
  id: number;
  name: string;
  type: string;
  abilities: [Ability]
}
