export class Ability {
  name: string;
  frames?: number = 1;
  hits?: number = 1;
  base: number;
  ignore?: number = 1;
  dualable?: boolean = true;
}
