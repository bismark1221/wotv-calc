import { Component, OnInit } from '@angular/core';
import { ChainService } from '../services/chain.service';

@Component({
  selector: 'app-macro',
  templateUrl: './macro.component.html',
  styleUrls: ['./macro.component.css']
})
export class MacroComponent implements OnInit {
  private units: any[] = [];

  width: number = 1280;
  height: number = 720;
  memu: string = '';
  memu6: string = '';
  nox: string = '';
  ld: string = '';

  constructor(private chainService: ChainService) { }

  ngOnInit() {
    this.units = this.chainService.units;
  }

  ngAfterViewInit() {
    this.chainService.$units.subscribe(
      units => setTimeout(() => {
        this.units = units;
        this.generateMacro();
      }
    , 0));
  }

  updateSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.generateMacro();
  }

  generateMacro() {
    this.memu = '';
    this.memu6 = '';
    this.nox = '';
    this.ld = '{"operations": [';

    let firstHits = this.chainService.calculateFramesDiffForFirstHits();

    firstHits.forEach((hit, index) => {
      let frame = firstHits[0].firstHit - firstHits[0].framesGap - hit.firstHit + hit.framesGap;
      this.addMacroHit(frame * 1 / 60 * 1000, hit.position, index);
    });
    this.ld = `],
      "recordInfo": {
          "loopType": 0,
          "loopTimes": 1,
          "circleDuration": 1829,
          "loopInterval": 0,
          "loopDuration": 0,
          "accelerateTimes": 1,
          "recordName": "My script1",
          "createTime": "19.01.01 23:23:23",
          "playOnBoot": false,
          "rebootTiming": 0
      }
    }`;
  }

  private addMacroHit(frame: number, position: number, index: number) {
    let memuMilliseconds: number = 1000;
    let noxMilliseconds: number = 1;
    let memuSeparator: number = 100;
    let noxSeparator: number = 1;

    let positions = [
      [
        {
          width: 0.6625,
          height: 0.7639
        },
        {
          width: 0.7617,
          height: 0.7639
        },
        {
          width: 0.8594,
          height: 0.7639
        },
        {
          width: 0.6625,
          height: 0.2778
        },
        {
          width: 0.7617,
          height: 0.2778
        },
        {
          width: 0.8594,
          height: 0.2778
        }
      ],
      [
        {
          width: 0.23,
          height: 0.65
        },
        {
          width: 0.23,
          height: 0.75
        },
        {
          width: 0.23,
          height: 0.85
        },
        {
          width: 0.7,
          height: 0.65
        },
        {
          width: 0.7,
          height: 0.75
        },
        {
          width: 0.7,
          height: 0.85
        }
      ],
      [
        {
          width: 0.3,
          height: 0.6
        },
        {
          width: 0.3,
          height: 0.725
        },
        {
          width: 0.3,
          height: 0.85
        },
        {
          width: 0.65,
          height: 0.6
        },
        {
          width: 0.65,
          height: 0.725
        },
        {
          width: 0.65,
          height: 0.85
        }
      ]
    ];

    let positionRatio = this.width > this.height ? 0 : this.width < this.height ? 1 : 2;
    let width = Math.round(positions[positionRatio][position].width * this.width)
    let height = Math.round(positions[positionRatio][position].height * this.height)

    this.memu += String(Math.round(memuMilliseconds + memuMilliseconds * frame)) + '--VINPUT--MULTI:1:0:' + width + ':' + height + '\n';
    this.memu += String(Math.round(memuMilliseconds + memuMilliseconds * frame + memuSeparator)) + '--VINPUT--MULTI:1:1:0:' + String(this.height) + '\n';

    this.memu6 += String(Math.round(memuMilliseconds + memuMilliseconds * frame)) + '--VINPUT--MULTI2:1:0:0:' + width + ':' + height + ':0\n';
    this.memu6 += String(Math.round(memuMilliseconds + memuMilliseconds * frame + memuSeparator)) + '--VINPUT--MULTI2:1:0:-1:-1:-2:2\n';

    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:1:0:' + width + ':' + height + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:6' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:6' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:1' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';

    this.ld += `
        {
            "timing": 1214,
            "operationId": "PutMultiTouch",
            "points": [
                {
                    "id": 1,
                    "x": 14765,
                    "y": 3624,
                    "state": 1
                }
            ]
        },
        {
            "timing": 1214,
            "operationId": "PutMultiTouch",
            "points": [
                {
                    "id": 1,
                    "x": 14765,
                    "y": 3624,
                    "state": 0
                }
            ]
        }`;
  }
}
