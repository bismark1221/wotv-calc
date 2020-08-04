import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core';

import { SkillService } from './skill.service'
import { NameService } from './name.service'

@Injectable()
export class GridService {

  private gridNodes = [
    100, 81, 59, 60 , 37, 38, 39, 64, 102,
    80, 58, 35, 36, 19, 20, 40, 65, 103,
    79, 57, 34, 18, 7, 8, 21, 41, 66,
    56, 33, 17, 6, 1, 9, 22, 42, 67,
    55, 32, 16, 5, 0, 2, 10, 23, 43,
    54, 31, 15, 4, 3, 11, 24, 44, 69,
    75, 53, 30, 14, 13, 12, 25, 45, 70,
    74, 52, 29, 28, 27, 26, 46, 71, 104,
    105, 73, 51, 50, 49, 48, 47, 72, 106
  ]

  private lines = [
    {top: 370, left: 430, transform: -55},
    {top: 410, left: 457},
    {top: 460, left: 430, transform: 55},
    {top: 460, left: 380, transform: -55},
    {top: 410, left: 354},
    {top: 370, left: 380, transform: 55},
    {top: 320, left: 400},
    {top: 370, left: 490, transform: 55},
    {top: 460, left: 480, transform: -55},
    {top: 500, left: 400},
    {top: 460, left: 340, transform: 55},
    {top: 370, left: 330, transform: -55},
    {top: 280, left: 430, transform: 55},
    {top: 280, left: 480, transform: -55},
    {top: 320, left: 500},
    {top: 370, left: 530, transform: -55},
    {top: 410, left: 560},
    {top: 460, left: 530, transform: 55},
    {top: 500, left: 500},
    {top: 550, left: 480, transform: 55},
    {top: 550, left: 430, transform: -55},
    {top: 550, left: 380, transform: 55},
    {top: 550, left: 330, transform: -55},
    {top: 500, left: 300},
    {top: 460, left: 280, transform: -55},
    {top: 410, left: 252},
    {top: 370, left: 280, transform: 55},
    {top: 320, left: 300},
    {top: 280, left: 330, transform: 55},
    {top: 280, left: 380, transform: -55},
    {top: 230, left: 457},
    {top: 280, left: 530, transform: 55},
    {top: 370, left: 580, transform: 55},
    {top: 460, left: 580, transform: -55},
    {top: 550, left: 530, transform: -55},
    {top: 590, left: 457},
    {top: 590, left: 354},
    {top: 550, left: 280, transform: 55},
    {top: 460, left: 230, transform: 55},
    {top: 370, left: 230, transform: -55},
    {top: 280, left: 280, transform: -55},
    {top: 230, left: 354},
    {top: 190, left: 430, transform: -55},
    {top: 190, left: 480, transform: 55},
    {top: 190, left: 530, transform: -55},
    {top: 230, left: 560},
    {top: 280, left: 580, transform: -55},
    {top: 320, left: 600},
    {top: 370, left: 630, transform: -55},
    {top: 410, left: 663},
    {top: 460, left: 630, transform: 55},
    {top: 500, left: 600},
    {top: 550, left: 580, transform: 55},
    {top: 590, left: 560},
    {top: 640, left: 530, transform: 55},
    {top: 640, left: 480, transform: -55},
    {top: 640, left: 430, transform: 55},
    {top: 640, left: 380, transform: -55},
    {top: 640, left: 330, transform: 55},
    {top: 640, left: 280, transform: -55},
    {top: 590, left: 252},
    {top: 550, left: 230, transform: -55},
    {top: 500, left: 200},
    {top: 460, left: 180, transform: -55},
    {top: 410, left: 149},
    {top: 370, left: 180, transform: 55},
    {top: 320, left: 200},
    {top: 280, left: 230, transform: 55},
    {top: 230, left: 252},
    {top: 190, left: 280, transform: 55},
    {top: 190, left: 330, transform: -55},
    {top: 190, left: 380, transform: 55},
    {top: 140, left: 400},
    {top: 140, left: 500},
    {top: 190, left: 580, transform: 55},
    {top: 280, left: 630, transform: 55},
    {top: 370, left: 680, transform: 55},
    {top: 460, left: 680, transform: -55},
    {top: 550, left: 630, transform: -55},
    {top: 640, left: 580, transform: -55},
    {top: 680, left: 500},
    {top: 680, left: 400},
    {top: 680, left: 300},
    {top: 640, left: 230, transform: 55},
    {top: 550, left: 180, transform: 55},
    {top: 460, left: 130, transform: 55},
    {top: 370, left: 130, transform: -55},
    {top: 280, left: 180, transform: -55},
    {top: 190, left: 230, transform: -55},
    {top: 140, left: 300},
    {top: 100, left: 430, transform: 55},
    {top: 100, left: 480, transform: -55},
    {top: 100, left: 530, transform: 55},
    {top: 100, left: 580, transform: -55},
    {top: 140, left: 600},
    {top: 190, left: 630, transform: -55},
    {top: 230, left: 663},
    {top: 280, left: 680, transform: -55},
    {top: 320, left: 700},
    {top: 370, left: 730, transform: -55},
    {top: 410, left: 766},
    {top: 460, left: 730, transform: 55},
    {top: 500, left: 700},
    {top: 550, left: 680, transform: 55},
    {top: 590, left: 663},
    {top: 640, left: 630, transform: 55},
    {top: 680, left: 600},
    {top: 730, left: 580, transform: 55},
    {top: 730, left: 530, transform: -55},
    {top: 730, left: 480, transform: 55},
    {top: 730, left: 430, transform: -55},
    {top: 730, left: 380, transform: 55},
    {top: 730, left: 330, transform: -55},
    {top: 730, left: 280, transform: 55},
    {top: 730, left: 230, transform: -55},
    {top: 680, left: 200},
    {top: 640, left: 180, transform: -55},
    {top: 590, left: 149},
    {top: 550, left: 130, transform: -55},
    {top: 500, left: 100},
    {top: 460, left: 80, transform: -55},
    {top: 410, left: 46},
    {top: 370, left: 80, transform: 55},
    {top: 320, left: 100},
    {top: 280, left: 130, transform: 55},
    {top: 230, left: 149},
    {top: 190, left: 180, transform: 55},
    {top: 140, left: 200},
    {top: 100, left: 230, transform: 55},
    {top: 100, left: 280, transform: -55},
    {top: 100, left: 330, transform: 55},
    {top: 100, left: 380, transform: -55},
    {top: 50, left: 457},
    {top: 50, left: 560},
    {top: 100, left: 630, transform: 55},
    {top: 190, left: 680, transform: 55},
    {top: 280, left: 730, transform: 55},
    {top: 370, left: 780, transform: 55},
    {top: 460, left: 780, transform: -55},
    {top: 550, left: 730, transform: -55},
    {top: 640, left: 680, transform: -55},
    {top: 730, left: 630, transform: -55},
    {top: 750, left: 560},
    {top: 750, left: 457},
    {top: 750, left: 354},
    {top: 750, left: 252},
    {top: 730, left: 180, transform: 55},
    {top: 640, left: 130, transform: 55},
    {top: 550, left: 80, transform: 55},
    {top: 460, left: 30, transform: 55},
    {top: 370, left: 30, transform: -55},
    {top: 280, left: 80, transform: -55},
    {top: 190, left: 130, transform: -55},
    {top: 100, left: 180, transform: -55},
    {top: 50, left: 252},
    {top: 50, left: 354},
    {top: 50, left: 46},
    {top: 50, left: 149},
    {top: 50, left: 663},
    {top: 50, left: 766},
    {top: 100, left: 30, transform: 55},
    {top: 100, left: 130, transform: 55},
    {top: 100, left: 730, transform: 55},
    {top: 100, left: 780, transform: -55},
    {top: 100, left: 680, transform: -55},
    {top: 100, left: 80, transform: -55},
    {top: 140, left: 100},
    {top: 140, left: 700},
    {top: 140, left: 800},
    {top: 190, left: 80, transform: 55},
    {top: 190, left: 780, transform: 55},
    {top: 190, left: 730, transform: -55},
    {top: 190, left: 30, transform: -55},
    {top: 230, left: 46},
    {top: 230, left: 766},
    {top: 280, left: 30, transform: 55},
    {top: 280, left: 780, transform: -55},
    {top: 320, left: 800},
    {top: 500, left: 800},
    {top: 550, left: 780, transform: 55},
    {top: 550, left: 30, transform: -55},
    {top: 590, left: 46},
    {top: 590, left: 766},
    {top: 640, left: 30, transform: 55},
    {top: 640, left: 730, transform: 55},
    {top: 640, left: 780, transform: -55},
    {top: 640, left: 80, transform: -55},
    {top: 680, left: 100},
    {top: 680, left: 700},
    {top: 680, left: 800},
    {top: 730, left: 80, transform: 55},
    {top: 730, left: 680, transform: 55},
    {top: 730, left: 780, transform: 55},
    {top: 730, left: 730, transform: -55},
    {top: 730, left: 130, transform: -55},
    {top: 730, left: 30, transform: -55},
  ]

  private nodeLine = [
    { "node1": 0, "node2": 1 },
    { "node1": 0, "node2": 2 },
    { "node1": 0, "node2": 3 },
    { "node1": 0, "node2": 4 },
    { "node1": 0, "node2": 5 },
    { "node1": 0, "node2": 6 },
    { "node1": 6, "node2": 1 },
    { "node1": 1, "node2": 2 },
    { "node1": 2, "node2": 3 },
    { "node1": 3, "node2": 4 },

    { "node1": 4, "node2": 5 }, //10
    { "node1": 5, "node2": 6 },
    { "node1": 1, "node2": 7 },
    { "node1": 1, "node2": 8 },
    { "node1": 1, "node2": 9 },
    { "node1": 2, "node2": 9 },
    { "node1": 2, "node2": 10 },
    { "node1": 2, "node2": 11 },
    { "node1": 3, "node2": 11 },
    { "node1": 3, "node2": 12 },

    { "node1": 3, "node2": 13 }, //20
    { "node1": 4, "node2": 13 },
    { "node1": 4, "node2": 14 },
    { "node1": 4, "node2": 15 },
    { "node1": 5, "node2": 15 },
    { "node1": 5, "node2": 16 },
    { "node1": 5, "node2": 17 },
    { "node1": 6, "node2": 17 },
    { "node1": 6, "node2": 18 },
    { "node1": 6, "node2": 7 },

    { "node1": 7, "node2": 8 }, //30
    { "node1": 8, "node2": 9 },
    { "node1": 9, "node2": 10 },
    { "node1": 10, "node2": 11 },
    { "node1": 11, "node2": 12 },
    { "node1": 12, "node2": 13 },
    { "node1": 13, "node2": 14 },
    { "node1": 14, "node2": 15 },
    { "node1": 15, "node2": 16 },
    { "node1": 16, "node2": 17 },

    { "node1": 17, "node2": 18 }, //40
    { "node1": 18, "node2": 7 },
    { "node1": 7, "node2": 19 }, //42
    { "node1": 8, "node2": 19 },
    { "node1": 8, "node2": 20 },
    { "node1": 8, "node2": 21 },
    { "node1": 9, "node2": 21 },
    { "node1": 9, "node2": 22 },
    { "node1": 10, "node2": 22 },
    { "node1": 10, "node2": 23 },

    { "node1": 10, "node2": 24 }, //50
    { "node1": 11, "node2": 24 },
    { "node1": 11, "node2": 25 },
    { "node1": 12, "node2": 25 },
    { "node1": 12, "node2": 26 },
    { "node1": 12, "node2": 27 },
    { "node1": 13, "node2": 27 },
    { "node1": 13, "node2": 28 },
    { "node1": 14, "node2": 28 },
    { "node1": 14, "node2": 29 },

    { "node1": 14, "node2": 30 }, //60
    { "node1": 15, "node2": 30 },
    { "node1": 15, "node2": 31 },
    { "node1": 16, "node2": 31 },
    { "node1": 16, "node2": 32 },
    { "node1": 16, "node2": 33 },
    { "node1": 17, "node2": 33 },
    { "node1": 17, "node2": 34 },
    { "node1": 18, "node2": 34 },
    { "node1": 18, "node2": 35 },

    { "node1": 18, "node2": 36 }, //70
    { "node1": 7, "node2": 36 }, //71
    { "node1": 36, "node2": 19 },
    { "node1": 19, "node2": 20 },
    { "node1": 20, "node2": 21 },
    { "node1": 21, "node2": 22 },
    { "node1": 22, "node2": 23 },
    { "node1": 23, "node2": 24 },
    { "node1": 24, "node2": 25 },
    { "node1": 25, "node2": 26 },

    { "node1": 26, "node2": 27 }, //80
    { "node1": 27, "node2": 28 },
    { "node1": 28, "node2": 29 },
    { "node1": 29, "node2": 30 },
    { "node1": 30, "node2": 31 },
    { "node1": 31, "node2": 32 },
    { "node1": 32, "node2": 33 },
    { "node1": 33, "node2": 34 },
    { "node1": 34, "node2": 35 },
    { "node1": 35, "node2": 36 },

    { "node1": 19, "node2": 37 }, //90
    { "node1": 19, "node2": 38 },
    { "node1": 20, "node2": 38 },
    { "node1": 20, "node2": 39 },
    { "node1": 20, "node2": 40 },
    { "node1": 21, "node2": 40 },
    { "node1": 21, "node2": 41 },
    { "node1": 22, "node2": 41 },
    { "node1": 22, "node2": 42 },
    { "node1": 23, "node2": 42 },

    { "node1": 23, "node2": 43 }, //100
    { "node1": 23, "node2": 44 },
    { "node1": 24, "node2": 44 },
    { "node1": 24, "node2": 45 },
    { "node1": 25, "node2": 45 },
    { "node1": 25, "node2": 46 },
    { "node1": 26, "node2": 46 },
    { "node1": 26, "node2": 47 },
    { "node1": 26, "node2": 48 },
    { "node1": 27, "node2": 48 },

    { "node1": 27, "node2": 49 }, //110
    { "node1": 28, "node2": 49 },
    { "node1": 28, "node2": 50 },
    { "node1": 29, "node2": 50 },
    { "node1": 29, "node2": 51 },
    { "node1": 29, "node2": 52 },
    { "node1": 30, "node2": 52 },
    { "node1": 30, "node2": 53 },
    { "node1": 31, "node2": 53 },
    { "node1": 31, "node2": 54 },

    { "node1": 32, "node2": 54 }, //120
    { "node1": 32, "node2": 55 },
    { "node1": 32, "node2": 56 },
    { "node1": 33, "node2": 56 },
    { "node1": 33, "node2": 57 },
    { "node1": 34, "node2": 57 },
    { "node1": 34, "node2": 58 },
    { "node1": 35, "node2": 58 },
    { "node1": 35, "node2": 59 },
    { "node1": 35, "node2": 60 },

    { "node1": 36, "node2": 60 }, //130
    { "node1": 36, "node2": 37 },
    { "node1": 37, "node2": 38 }, //132
    { "node1": 38, "node2": 39 },
    { "node1": 39, "node2": 40 },
    { "node1": 40, "node2": 41 },
    { "node1": 41, "node2": 42 },
    { "node1": 42, "node2": 43 },
    { "node1": 43, "node2": 44 },
    { "node1": 44, "node2": 45 },

    { "node1": 45, "node2": 46 }, //140
    { "node1": 46, "node2": 47 },
    { "node1": 47, "node2": 48 },
    { "node1": 48, "node2": 49 },
    { "node1": 49, "node2": 50 },
    { "node1": 50, "node2": 51 },
    { "node1": 51, "node2": 52 },
    { "node1": 52, "node2": 53 },
    { "node1": 53, "node2": 54 },
    { "node1": 54, "node2": 55 },

    { "node1": 55, "node2": 56 }, //150
    { "node1": 56, "node2": 57 },
    { "node1": 57, "node2": 58 },
    { "node1": 58, "node2": 59 },
    { "node1": 59, "node2": 60 },
    { "node1": 60, "node2": 37 }, // 155
  ]

  constructor(
    private sanitizer: DomSanitizer,
    private skillService: SkillService,
    private translateService: TranslateService,
    private nameService: NameService
  ) {}

  generateEsperGrid(esper, size) {
    let nodesForGrid = []

    this.gridNodes.forEach(node => {
      if (esper.board.nodes[node.toString()]) {
        let buff = esper.board.nodes[node.toString()].skill

        nodesForGrid[node] = {
          type: "text",
          value: this.skillService.formatEffect(esper, buff, buff.effects[0])
        }
      } else if (node === 0) {
        nodesForGrid[node] = {
          type: "center"
        }
      } else {
        nodesForGrid[node] = {
          type: "hidden"
        }
      }
    })

    let linesHtml = '';
    esper.board.lines.forEach(line => {
      let html = '<div class="line" style="top: ' + (this.lines[line].top * size / 1000) + 'px; left: ' + (this.lines[line].left * size / 1000) + 'px;'
      if (this.lines[line].transform) {
        html = html + 'transform: rotate(' + this.lines[line].transform + 'deg);'
      }
      html = html + '"></div>'
      linesHtml += html
    })

    this.generateNodesHierachy(esper)

    return {
      lines: this.sanitizer.bypassSecurityTrustHtml(linesHtml),
      nodesForGrid: nodesForGrid,
      gridNodes: this.gridNodes
    }
  }

  generateUnitGrid(unit, size) {
    let nodesForGrid = []

    this.gridNodes.forEach(node => {
      if (unit.board.nodes[node.toString()]) {
        let skill = unit.board.nodes[node.toString()].skill
        let text = ""

        if (unit.board.nodes[node.toString()].type == "buff") {
          text = this.skillService.formatEffect(unit, skill, skill.effects[0])
        } else {
          text = this.nameService.getName(skill)
        }

        nodesForGrid[node] = {
          type: "text",
          subType: unit.board.nodes[node.toString()].type,
          value: text
        }
      } else if (node === 0) {
        nodesForGrid[node] = {
          type: "center"
        }
      } else {
        nodesForGrid[node] = {
          type: "hidden"
        }
      }
    })

    let linesHtml = '';
    unit.board.lines.forEach(line => {
      let html = '<div class="line" style="top: ' + (this.lines[line].top * size / 1000) + 'px; left: ' + (this.lines[line].left * size / 1000) + 'px;'
      if (this.lines[line].transform) {
        html = html + 'transform: rotate(' + this.lines[line].transform + 'deg);'
      }
      html = html + '"></div>'
      linesHtml += html
    })

    this.generateNodesHierachy(unit)

    return {
      lines: this.sanitizer.bypassSecurityTrustHtml(linesHtml),
      nodesForGrid: nodesForGrid,
      gridNodes: this.gridNodes
    }
  }

  generateNodesHierachy(item, lines = null, node = 0) {
    if (!lines) {
      lines = JSON.parse(JSON.stringify(item.board.lines))
    }

    let childNodes = this.searchChildNodes(lines, node)
    if (node !== 0) {
      item.board.nodes[node].children = childNodes
    }

    childNodes.forEach(childNode => {
      item.board.nodes[childNode].parent = node
      this.generateNodesHierachy(item, lines, childNode)
    })

  }

  private searchChildNodes(lines, node) {
    let childNodes = []
    let linesToRemove = []

    lines.forEach((line, lineIndex) => {
      if (this.nodeLine[line].node1 === node) {
        childNodes.push(this.nodeLine[line].node2)
        linesToRemove.push(lineIndex)

      } else if (this.nodeLine[line].node2 === node) {
        childNodes.push(this.nodeLine[line].node1)
        linesToRemove.push(lineIndex)
      }
    })

    linesToRemove.sort(function(a, b){return b-a});
    linesToRemove.forEach(line => {
      lines.splice(line, 1)
    })

    return childNodes
  }
}
