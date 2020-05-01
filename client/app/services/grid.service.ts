import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Injectable()
export class GridService {

  private gridNodes = [
    100, 101, 81, 60 , 37, 38, 39, 64, 102,
    80, 59, 35, 36, 19, 20, 40, 65, 103,
    79, 58, 34, 18, 7, 8, 21, 41, 66,
    57, 33, 17, 6, 1, 9, 22, 42, 67,
    56, 32, 16, 5, 0, 2, 10, 23, 43,
    54, 31, 15, 4, 3, 11, 24, 44, 69,
    75, 53, 30, 14, 13, 12, 25, 45, 70,
    74, 52, 29, 28, 27, 26, 46, 71, 104,
    105, 73, 51, 50, 49, 48, 47, 72, 106
  ]

  private gridLines = [
    '<div class="line" style="top: 370px; left: 380px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 430px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 457px;"></div>',
    '<div class="line" style="top: 460px; left: 380px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 460px; left: 430px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 410px; left: 354px;"></div>',

    '<div class="line" style="top: 320px; left: 400px;"></div>',
    '<div class="line" style="top: 370px; left: 480px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 480px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 500px; left: 400px;"></div>',
    '<div class="line" style="top: 460px; left: 330px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 330px; transform: rotate(-60deg);"></div>',

    '<div class="line" style="top: 280px; left: 430px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 280px; left: 480px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 320px; left: 500px;"></div>',
    '<div class="line" style="top: 370px; left: 530px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 560px;"></div>',
    '<div class="line" style="top: 460px; left: 530px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 500px; left: 500px;"></div>',
    '<div class="line" style="top: 550px; left: 480px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 550px; left: 430px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 550px; left: 380px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 550px; left: 330px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 500px; left: 300px;"></div>',
    '<div class="line" style="top: 460px; left: 280px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 252px;"></div>',
    '<div class="line" style="top: 370px; left: 280px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 320px; left: 300px;"></div>',
    '<div class="line" style="top: 280px; left: 330px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 280px; left: 380px; transform: rotate(-60deg);"></div>',

    '<div class="line" style="top: 230px; left: 457px;"></div>',
    '<div class="line" style="top: 280px; left: 530px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 580px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 580px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 550px; left: 530px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 590px; left: 457px;"></div>',
    '<div class="line" style="top: 590px; left: 354px;"></div>',
    '<div class="line" style="top: 550px; left: 280px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 230px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 230px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 280px; left: 280px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 230px; left: 354px;"></div>',

    '<div class="line" style="top: 190px; left: 430px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 190px; left: 480px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 190px; left: 530px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 230px; left: 560px;"></div>',
    '<div class="line" style="top: 280px; left: 580px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 320px; left: 600px;"></div>',
    '<div class="line" style="top: 370px; left: 630px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 663px;"></div> ',
    '<div class="line" style="top: 460px; left: 630px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 500px; left: 600px;"></div>',
    '<div class="line" style="top: 550px; left: 580px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 590px; left: 560px;"></div>',
    '<div class="line" style="top: 640px; left: 530px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 640px; left: 480px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 640px; left: 430px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 640px; left: 380px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 640px; left: 330px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 640px; left: 280px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 590px; left: 252px;"></div>',
    '<div class="line" style="top: 550px; left: 230px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 500px; left: 200px;"></div>',
    '<div class="line" style="top: 460px; left: 180px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 149px;"></div>',
    '<div class="line" style="top: 370px; left: 180px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 320px; left: 200px;"></div>',
    '<div class="line" style="top: 280px; left: 230px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 230px; left: 252px;"></div>',
    '<div class="line" style="top: 190px; left: 280px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 190px; left: 330px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 190px; left: 380px; transform: rotate(60deg);"></div>',

    '<div class="line" style="top: 140px; left: 400px;"></div>',
    '<div class="line" style="top: 140px; left: 500px;"></div>',
    '<div class="line" style="top: 190px; left: 580px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 280px; left: 630px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 680px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 680px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 550px; left: 630px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 640px; left: 580px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 680px; left: 500px;"></div>',
    '<div class="line" style="top: 680px; left: 400px;"></div>',
    '<div class="line" style="top: 680px; left: 300px;"></div>',
    '<div class="line" style="top: 640px; left: 230px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 550px; left: 180px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 130px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 130px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 280px; left: 180px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 190px; left: 230px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 140px; left: 300px;"></div>',

    '<div class="line" style="top: 100px; left: 430px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 480px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 100px; left: 530px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 580px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 140px; left: 600px;"></div>',
    '<div class="line" style="top: 190px; left: 630px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 230px; left: 663px;"></div> ',
    '<div class="line" style="top: 280px; left: 680px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 320px; left: 700px;"></div> ',
    '<div class="line" style="top: 370px; left: 730px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 766px;"></div>',
    '<div class="line" style="top: 460px; left: 730px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 500px; left: 700px;"></div> ',
    '<div class="line" style="top: 550px; left: 680px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 590px; left: 663px;"></div> ',
    '<div class="line" style="top: 640px; left: 630px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 680px; left: 600px;"></div>',
    '<div class="line" style="top: 730px; left: 580px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 530px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 480px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 430px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 380px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 330px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 280px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 230px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 680px; left: 200px;"></div>',
    '<div class="line" style="top: 640px; left: 180px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 590px; left: 149px;"></div>',
    '<div class="line" style="top: 550px; left: 130px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 500px; left: 100px;"></div>',
    '<div class="line" style="top: 460px; left: 80px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 46px;"></div>',
    '<div class="line" style="top: 370px; left: 80px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 320px; left: 100px;"></div>',
    '<div class="line" style="top: 280px; left: 130px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 230px; left: 149px;"></div>',
    '<div class="line" style="top: 190px; left: 180px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 140px; left: 200px;"></div>',
    '<div class="line" style="top: 100px; left: 230px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 280px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 100px; left: 330px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 380px; transform: rotate(-60deg);"></div>',

    '<div class="line" style="top: 50px; left: 457px;"></div>',
    '<div class="line" style="top: 50px; left: 560px;"></div>',
    '<div class="line" style="top: 100px; left: 630px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 190px; left: 680px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 280px; left: 730px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 780px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 780px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 550px; left: 730px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 640px; left: 680px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 630px; transform: rotate(-60deg);"></div>',

    '<div class="line" style="top: 730px; left: 180px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 640px; left: 130px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 550px; left: 80px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 30px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 30px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 280px; left: 80px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 190px; left: 130px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 100px; left: 180px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 50px; left: 252px;"></div>',
    '<div class="line" style="top: 50px; left: 354px;"></div>',





    // corner lines
    '<div class="line" style="top: 50px; left: 46px;"></div>',
    '<div class="line" style="top: 50px; left: 149px;"></div>',
    '<div class="line" style="top: 50px; left: 663px;"></div> ',
    '<div class="line" style="top: 50px; left: 766px;"></div>',
    '<div class="line" style="top: 100px; left: 30px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 130px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 730px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 100px; left: 780px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 100px; left: 680px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 100px; left: 80px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 140px; left: 100px;"></div>',
    '<div class="line" style="top: 140px; left: 700px;"></div> ',
    '<div class="line" style="top: 140px; left: 800px;"></div>',
    '<div class="line" style="top: 190px; left: 80px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 190px; left: 780px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 190px; left: 730px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 190px; left: 30px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 230px; left: 46px;"></div>',
    '<div class="line" style="top: 230px; left: 766px;"></div>',
    '<div class="line" style="top: 280px; left: 30px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 280px; left: 780px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 320px; left: 800px;"></div>',
    '<div class="line" style="top: 500px; left: 800px;"></div>',
    '<div class="line" style="top: 550px; left: 780px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 550px; left: 30px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 590px; left: 46px;"></div>',
    '<div class="line" style="top: 590px; left: 766px;"></div>',
    '<div class="line" style="top: 640px; left: 30px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 640px; left: 730px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 640px; left: 780px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 640px; left: 80px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 680px; left: 100px;"></div>',
    '<div class="line" style="top: 680px; left: 700px;"></div> ',
    '<div class="line" style="top: 680px; left: 800px;"></div>',
    '<div class="line" style="top: 730px; left: 80px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 680px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 780px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 730px; left: 730px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 130px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 30px; transform: rotate(-60deg);"></div>',
  ]

  constructor(private sanitizer: DomSanitizer) {}

  generateEsperGrid(esper, skillService, translateService) {
    let nodesHtml = '<ul class="hexGrid">';

    this.gridNodes.forEach(node => {
      if (esper.board.nodes[node.toString()]) {
        let buff = esper.buffs.find(buff => buff.dataId === esper.board.nodes[node.toString()])

        nodesHtml += '<li><div class="hex">'
        //nodesHtml += '<span class="iconHolder"><img class="icon" src="/img/items/ability_100.png"></span>'
        nodesHtml += '<span class="text"><span>'+ skillService.formatEffect(esper, buff, buff.effects[0], false) + '</span>'
        nodesHtml += '</span><span class="cost">' + buff.sp + ' SP</span>'
        nodesHtml += '</div></li>'
      } else if (node === 0) {
        nodesHtml += '<li><div class="hex">'
        nodesHtml += '<span class="text"><span>Esper</span>'
        nodesHtml += '</div></li>'
      } else {
       nodesHtml += '<li><div class="hex hideNode"></div></li>' 
      }
    });

    nodesHtml += '</ul>'

    let linesHtml = '';
    esper.board.lines.forEach(line => {
      linesHtml += this.gridLines[line]
    })

    return {
      nodes: nodesHtml,
      lines: this.sanitizer.bypassSecurityTrustHtml(linesHtml)
    }
  }
}
