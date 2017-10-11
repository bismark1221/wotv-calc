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
  memu: string;
  nox: string;

  constructor(private chainService: ChainService) { }

  ngOnInit() {
    this.units = this.chainService.units;
  }

  ngAfterViewInit() {
    this.chainService.$units.subscribe(units => {
      this.units = units;
      this.generateMacro();
    });
  }

  updateSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.generateMacro();
  }

  generateMacro() {
    this.memu = '';
    this.nox = '';

    let firstHits = this.chainService.calculateFramesDiffForFirstHits();
    firstHits.forEach((hit, index) => {
      let frame = firstHits[0].firstHit - firstHits[0].framesGap - hit.firstHit + hit.framesGap;
      this.addMacroHit(frame * 1 / 60 * 1000, hit.position);
    });
  }

  private addMacroHit(frame: number, position: number) {
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

    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:1:0:' + width + ':' + height + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:6' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:6' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:1' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
  }
}
