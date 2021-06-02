import { Injectable } from '@angular/core';

@Injectable()
export class RangeService {

  constructor() {}

  formatDiamond(skillTable, range) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle - range.l; i <= middle; i++) {
      let countCol = 0;

      for (let j = middle - countLine; j <= middle; j++) { // up-left
        if (!range.m || (countCol < range.l - range.m )) {
          skillTable[i][j] = 'R';
        }

        countCol++;
      }

      countCol = 0;
      for (let j = middle + 1; j <= middle + countLine; j++) { // up-right
        if (!range.m || (countCol >= ((countLine) - (range.l - range.m)))) {
          skillTable[i][j] = 'R';
        }

        countCol++;
      }

      if (countLine > 0) {
        countCol = 0;
        for (let j = middle - range.l + countLine; j <= middle; j++) { // down-left
          if (!range.m || (countCol < range.l - range.m )) {
            skillTable[middle + countLine][j] = 'R';
          }

          countCol++;
        }

        countCol = 0;
        for (let j = middle + 1; j <= middle + range.l - countLine; j++) { // down-right
          if (!range.m || (countCol >= ((range.l - countLine) - (range.l - range.m)))) {
            skillTable[middle + countLine][j] = 'R';
          }

          countCol++;
        }
      }

      countLine++;
    }

    return skillTable;
  }

  formatLine(skillTable, range, fullAOE = false) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle; i >= middle - range.l; i--) {
      if (i !== middle && (!range.m || countLine > range.m) && i >= 0) {
        skillTable[i][middle] = fullAOE ? 'AR' : 'R';
        skillTable[(middle + countLine)][middle] = 'R';
      } else {
        let start = fullAOE ? 1 : 0;
        if (range.m) {
          start = range.m + 1;
        }

        for (let j = start; j <= range.l; j++) {
          skillTable[middle][middle - j] = 'R';
          skillTable[middle][middle + j] = 'R';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  formatSquare(skillTable, range) {
    const middle = 8;
    let countLine = 0;
    for (let i = middle; i >= middle - range.l; i--) {
      for (let j = 1; j <= range.l; j++) {
        if (i !== middle) {
          if (i > middle - range.w || j < range.w) {
            if (j >= range.w) {
              skillTable[i][middle + j] = 'R';
              skillTable[i][middle - j] = 'R';
            } else {
              skillTable[i][middle + j] = 'AR';
              skillTable[i][middle - j] = 'AR';
            }

            skillTable[(middle + countLine)][middle + j] = 'R';
            skillTable[(middle + countLine)][middle - j] = 'R';
          }

          skillTable[i][middle] = 'AR';
          skillTable[(middle + countLine)][middle] = 'R';
        } else {
          skillTable[i][middle - j] = 'R';
          skillTable[i][middle + j] = 'R';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  formatL(skillTable, range) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle - 1; i >= middle - range.l; i--) {
      if (i + 1 === middle) {
        for (let j = 1; j <= range.l; j++) {
          if (j === 1) {
            skillTable[i][middle + j] = 'AR';
            skillTable[i][middle - j] = 'AR';
          } else {
            skillTable[i][middle + j] = 'R';
            skillTable[i][middle - j] = 'R';
          }

          skillTable[(middle + countLine + 1)][middle + j] = 'R';
          skillTable[(middle + countLine + 1)][middle - j] = 'R';
        }
      } else {
        skillTable[i][middle + 1] = 'AR';
        skillTable[i][middle - 1] = 'AR';

        skillTable[(middle + countLine + 1)][middle + 1] = 'R';
        skillTable[(middle + countLine + 1)][middle - 1] = 'R';
      }

      countLine++;
    }

    return skillTable;
  }

  formatV(skillTable, range) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle; i >= middle - range.l; i--) {

      if (i === middle) {
        for (let j = 1; j <= range.l; j++) {
          skillTable[i][middle + j] = 'R';
          skillTable[i][middle - j] = 'R';
        }
      } else {
        for (let j = 0; j <= range.l; j++) {
          if ((middle - j) !== i) {
            if (j <= countLine) {
              skillTable[i][middle + j] = 'AR';
              skillTable[i][middle - j] = 'AR';
            } else {
              skillTable[i][middle + j] = 'R';
              skillTable[i][middle - j] = 'R';
            }

            skillTable[(middle + countLine)][middle + j] = 'R';
            skillTable[(middle + countLine)][middle - j] = 'R';
          }
        }
      }

      countLine++;
    }

    return skillTable;
  }

  aoeDiamond(skillTable, aoe, maxLine) {
    const middle = 8;
    let countLine = 0;

    for (let i = maxLine - aoe.l; i <= maxLine; i++) {
      for (let j = middle - countLine; j <= middle; j++) { // up-left
        skillTable[i][j] = skillTable[i][j] === 'N' ? 'A' : 'AR';
      }

      for (let j = middle + 1; j <= middle + countLine; j++) { // up-right
        skillTable[i][j] = skillTable[i][j] === 'N' ? 'A' : 'AR';
      }

      if (countLine > 0) {
        for (let j = middle - aoe.l + countLine; j <= middle; j++) { // down-left
          skillTable[maxLine + countLine][j] = skillTable[maxLine + countLine][j] === 'N' ? 'A' : 'AR';
        }

        for (let j = middle + 1; j <= middle + aoe.l - countLine; j++) { // down-right
          skillTable[maxLine + countLine][j] = skillTable[maxLine + countLine][j] === 'N' ? 'A' : 'AR';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  aoeLine(skillTable, aoe, maxLine, onlyHorizontal = false) {
    const middle = 8;
    let countLine = 0;

    for (let i = maxLine - aoe.l; i <= maxLine; i++) {
      if (i !== maxLine) {
        if (!onlyHorizontal) {
          skillTable[i][middle] = skillTable[i][middle] === 'N' || skillTable[i][middle] === 'A' ? 'A' : 'AR';
          skillTable[(maxLine + countLine + 1)][middle] = skillTable[(maxLine + countLine + 1)][middle] === 'N' || skillTable[(maxLine + countLine + 1)][middle] === 'A' ? 'A' : 'AR';
        } else if (aoe.w === 2) {
          skillTable[i][middle] = skillTable[i][middle] === 'N' || skillTable[i][middle] === 'A' ? 'A' : 'AR';
          for (let j = 0; j <= aoe.l; j++) {
            skillTable[i][middle - j] = skillTable[i][middle - j] === 'N' || skillTable[i][middle - j] === 'A' ? 'A' : 'AR';
            skillTable[i][middle + j] = skillTable[i][middle + j] === 'N' || skillTable[i][middle + j] === 'A' ? 'A' : 'AR';
          }
        }
      } else {
        for (let j = 0; j <= aoe.l; j++) {
          skillTable[maxLine][middle - j] = skillTable[maxLine][middle - j] === 'N' || skillTable[maxLine][middle - j] === 'A' ? 'A' : 'AR';
          skillTable[maxLine][middle + j] = skillTable[maxLine][middle + j] === 'N' || skillTable[maxLine][middle + j] === 'A' ? 'A' : 'AR';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  aoeSquare(skillTable, aoe, maxLine) {
    const middle = 8;
    let countLine = 0;

    for (let i = maxLine; i >= maxLine - aoe.l; i--) {
      for (let j = 0; j <= aoe.l; j++) {
        skillTable[i][middle - j] = skillTable[i][middle - j] === 'N' || skillTable[i][middle - j] === 'A' ? 'A' : 'AR';
        skillTable[i][middle + j] = skillTable[i][middle + j] === 'N' || skillTable[i][middle + j] === 'A' ? 'A' : 'AR';

        skillTable[(maxLine + countLine)][middle - j] = skillTable[i][middle - j] === 'N' || skillTable[i][middle - j] === 'A' ? 'A' : 'AR';
        skillTable[(maxLine + countLine)][middle + j] = skillTable[i][middle + j] === 'N' || skillTable[i][middle + j] === 'A' ? 'A' : 'AR';
      }

      countLine++;
    }

    return skillTable;
  }

  aoeX(skillTable, aoe, maxLine) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle; i >= middle - aoe.l; i--) {

      if (i === middle) {
        skillTable[i][middle] = skillTable[i][middle] === 'N' ? 'A' : 'AR';
      } else {
        for (let j = 0; j <= aoe.l; j++) {
          if ((middle - j) === i) {
            if (j <= countLine) {
              skillTable[i][middle + j] = 'A';
              skillTable[i][middle - j] = 'A';
            } else {
              skillTable[i][middle + j] = 'A';
              skillTable[i][middle - j] = 'A';
            }

            skillTable[(maxLine + countLine)][middle + j] = 'A';
            skillTable[(maxLine + countLine)][middle - j] = 'A';
          }
        }
      }

      countLine++;
    }

    return skillTable;
  }


  formatRange(unit, skill) {
    if (skill.type !== 'passive') {
      let skillTable = [];
      for (let i = 0; i <= 16; i++) {
        skillTable.push([]);
        for (let j = 0; j <= 16; j++) {
          skillTable[i].push('N');
        }
      }

      if (skill.range && skill.range.l) {
        if (skill.range.s === 0) {
          skillTable = this.formatLine(skillTable, skill.range);
        } else if (skill.range.s === 1) {
          skillTable = this.formatDiamond(skillTable, skill.range);
        } else if (skill.range.s === 10) {
          if (!skill.range.w || (skill.range.w && skill.range.w === 1)) {
            skillTable = this.formatLine(skillTable, skill.range, true);
          } else {
            skillTable = this.formatSquare(skillTable, skill.range);
          }
        } else if (skill.range.s === 11) {
          skillTable = this.formatL(skillTable, skill.range);
        } else if (skill.range.s === 13) {
          skillTable = this.formatV(skillTable, skill.range);
        } else {
          console.log('Unknow range grid -- ' + skill.dataId);
        }
      }

      const middle = 8;
      const maxLine = (skill.range && skill.range.l) ? middle - skill.range.l : middle;
      if (skill.aoe && skill.aoe.l) {
        if (skill.aoe.s === 0) {
          skillTable = this.aoeLine(skillTable, skill.aoe, maxLine);
        } else if (skill.aoe.s === 1) {
          skillTable = this.aoeDiamond(skillTable, skill.aoe, maxLine);
        } else if (skill.aoe.s === 2) {
          skillTable = this.aoeSquare(skillTable, skill.aoe, maxLine);
        } else if (skill.aoe.s === 3) {
          skillTable = this.aoeLine(skillTable, skill.aoe, maxLine, true);
        } else if (skill.aoe.s === 5) {
          skillTable = this.aoeX(skillTable, skill.aoe, maxLine);
        } else {
          console.log('unknow aoe -- ' + skill.dataId);
        }
      }

      if (!skill.range || (skill.range.s !== 11 && skill.range.s !== 13)) {
        if (!skill.range && skill.target === 'target') {
          skillTable[maxLine][middle] = 'T';
        } else if (maxLine >= 0) {
          skillTable[maxLine][middle] = 'TAR';
        }
      } else if (skill.range.s === 13) {
        skillTable[middle - 1][middle] = 'TAR';
      }

      if (maxLine !== middle) {
        skillTable[middle][middle] = 'U' + skillTable[middle][middle];
      }

      let html = '<table class=\'table-skill\'>';
      skillTable.forEach(line => {
        html += '<tr>';
        line.forEach(col => {
          html += '<td class=\'table-skill-' + col + '\'></td>';
        });
        html += '</tr>';
      });
      html += '</table>';
      html += '<div class=\'tableSkillHeight\'>Range Height: ' + (skill.range && skill.range.h ? skill.range.h : '0') + '</div>';
      if (skill.aoe && skill.aoe.l) {
        html += '<div class=\'tableSkillHeight\'>AOE Height: ' + skill.aoe.h + '</div>';
      }

      skill.skillTableHtml = html;
    }
  }
}
