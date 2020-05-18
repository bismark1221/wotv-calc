import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';
import { SkillService } from '../services/skill.service';
import { GridService } from '../services/grid.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-esper',
  templateUrl: './esper.component.html',
  styleUrls: ['./esper.component.css']
})
export class EsperComponent implements OnInit {
  esper = null;
  grid = null;

  constructor(
    private esperService: EsperService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private gridService: GridService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatEsper();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.esper = this.esperService.getEsperBySlug(params.get('slug'))
      if (!this.esper) {
        this.router.navigate([this.navService.getRoute('/esper-not-found')]);
      } else {
        this.formatEsper();
      }
    });
  }

  private formatEsper() {
    let lang = this.translateService.currentLang
    this.esper.name = this.nameService.getName(this.esper)

    this.esper.skills.forEach(skill => {
      skill.name = this.nameService.getName(skill)
      skill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.esper, skill, effect);
      });

      if (skill.damage) {
        skill.damageHtml = this.skillService.formatDamage(this.esper, skill, skill.damage);
      }

      if (skill.counter) {
        skill.counterHtml = this.skillService.formatCounter(this.esper, skill, skill.counter);
      }

      this.skillService.formatRange(this.esper, skill);
    });

    this.esper.rarity = this.esperService.findRarity(this.esper);

    this.esper.maxSP = 0;
    this.esper.SPs.forEach(awake => {
      awake.forEach(sp => {
        this.esper.maxSP += sp;
      })
    })

    this.grid = this.gridService.generateEsperGrid(this.esper)
  }

  clickNode(this, node) {
    if (node !== 0) {
      if (!this.esper.board.nodes[node].activated) {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
    }
  }

  showNode(node) {
    if (node !== 0) {
      this.esper.board.nodes[node].activated = true;
      this.showNode(this.esper.board.nodes[node].parent)
    }
  }

  hideNode(node) {
    if (node !== 0) {
      this.esper.board.nodes[node].activated = false;
      this.esper.board.nodes[node].children.forEach(childNode => {
        this.hideNode(childNode)
      })
    }
  }
}
