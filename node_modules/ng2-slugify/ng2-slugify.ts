import {Charmaps} from './charmaps';

export class Slug {
  private maps: Object;

  constructor(key: string) {
    let charmaps = new Charmaps();
    let k = (key) ? key : 'default';
    this.maps = charmaps.getMaps(k);
  }

  public slugify(s: string): any {
    if (!s) { return ''; }
    let ascii = [];
    let ch, cp;
    for (var i = 0; i < s.length; i++) {
      if ((cp = s.charCodeAt(i)) < 0x180) {
        ch = String.fromCharCode(cp);
        ascii.push(this.maps[ch] || ch);
      }
    }
    s = ascii.join('');
    s = s.replace(/[^\w\s-]/g, '').trim().toLowerCase();
    
    return s.replace(/[-\s]+/g, '-');
  }
}