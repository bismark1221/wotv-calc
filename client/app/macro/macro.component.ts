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
    let noxMilliseconds: number = 10;
    let memuSeparator: number = 100;
    let noxSeparator: number = 2;

    let positions = [
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
    ];

    this.memu += String(Math.round(memuMilliseconds + memuMilliseconds * frame)) + '--VINPUT--MULTI:1:0:' + Math.round(positions[position].width * this.width) + ':' + Math.round(positions[position].height * this.height) + '\n';
    this.memu += String(Math.round(memuMilliseconds + memuMilliseconds * frame + memuSeparator)) + '--VINPUT--MULTI:1:1:0:' + String(this.height) + '\n';

    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:1:0:' + Math.round(positions[position].width * this.width) + ':' + Math.round(positions[position].height * this.height) + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:6' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:6' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
    this.nox += '0ScRiPtSePaRaToR' + String(this.width) + '|' + String(this.height) + '|MULTI:0:1' + 'ScRiPtSePaRaToR' + String(Math.round(noxMilliseconds + noxMilliseconds * frame + noxSeparator)) + '\n';
  }
}
