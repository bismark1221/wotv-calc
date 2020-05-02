import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core';

import { SkillService } from './skill.service'

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
    '<div class="line" style="top: 370px; left: 430px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 457px;"></div>',
    '<div class="line" style="top: 460px; left: 430px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 380px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 410px; left: 354px;"></div>',
    '<div class="line" style="top: 370px; left: 380px; transform: rotate(60deg);"></div>',

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

    '<div class="line" style="top: 50px; left: 457px;">00</div>',
    '<div class="line" style="top: 50px; left: 560px;"></div>',
    '<div class="line" style="top: 100px; left: 630px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 190px; left: 680px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 280px; left: 730px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 370px; left: 780px; transform: rotate(60deg);"></div>',
    '<div class="line" style="top: 460px; left: 780px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 550px; left: 730px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 640px; left: 680px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 730px; left: 630px; transform: rotate(-60deg);"></div>',
    '<div class="line" style="top: 750px; left: 560px;"></div>',
    '<div class="line" style="top: 750px; left: 457px;"></div>',
    '<div class="line" style="top: 750px; left: 354px;"></div>',
    '<div class="line" style="top: 750px; left: 252px;"></div>',
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
    { "node1": 59, "node2": 40 },
    { "node1": 60, "node2": 37 }, // 155
  ]

  constructor(
    private sanitizer: DomSanitizer,
    private skillService: SkillService,
    private translateService: TranslateService
  ) {}

  generateEsperGrid(esper) {
    let nodesHtml = '<ul class="hexGrid">';

    this.gridNodes.forEach(node => {
      if (esper.board.nodes[node.toString()]) {
        let buff = esper.buffs.find(buff => buff.dataId === esper.board.nodes[node.toString()])

        nodesHtml += '<li><div class="hex">'
        //nodesHtml += '<span class="iconHolder"><img class="icon" src="/img/items/ability_100.png"></span>'
        nodesHtml += '<span class="text">'+ this.skillService.formatEffect(esper, buff, buff.effects[0], false) + '</span>'
        nodesHtml += '<span class="cost">' + buff.sp + ' SP</span>'
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
      linesHtml += this.lines[line]
    })

    return {
      nodes: nodesHtml,
      lines: this.sanitizer.bypassSecurityTrustHtml(linesHtml)
    }
  }

  generateUnitGrid(unit) {
    let nodesHtml = '<ul class="hexGrid">';

    this.gridNodes.forEach(node => {
      if (unit.board.nodes[node.toString()]) {
        let skill = unit.buffs.find(buff => buff.dataId === unit.board.nodes[node.toString()])
        let text = ""

        if (!skill) {
          skill = unit.skills.find(skill => skill.dataId === unit.board.nodes[node.toString()])
          text = skill.name
        } else {
          text = this.skillService.formatEffect(unit, skill, skill.effects[0], false)
        }

        nodesHtml += '<li><div class="hex">'
        //nodesHtml += '<span class="iconHolder"><img class="icon" src="/img/items/ability_100.png"></span>'
        nodesHtml += '<span class="text">'+ text + '</span>'
        nodesHtml += '</div></li>'
      } else if (node === 0) {
        nodesHtml += '<li><div class="hex">'
        nodesHtml += '<span class="text"><span>Unit</span>'
        nodesHtml += '</div></li>'
      } else {
       nodesHtml += '<li><div class="hex hideNode">' + node + '</div></li>'
      }
    });

    nodesHtml += '</ul>'

    let linesHtml = '';
    unit.board.lines.forEach(line => {
      linesHtml += this.lines[line]
    })

    return {
      nodes: nodesHtml,
      lines: this.sanitizer.bypassSecurityTrustHtml(linesHtml)
    }
  }
}
