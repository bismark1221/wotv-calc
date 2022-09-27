import { Component, Input } from '@angular/core';

import { ResizeDetectorComponent } from '../resizeDetector.component';

import { ToolService } from '../services/tool.service';

@Component({
  selector: 'tbody[app-template-skillWithUpgrade]',
  templateUrl: './template.skillWithUpgrade.component.html',
  styleUrls: ['./template.skillWithUpgrade.component.css']
})
export class TemplateSkillWithUpgradeComponent extends ResizeDetectorComponent {
  @Input() skill;
  @Input() jobs;

  @Input() showJobIcon;
  @Input() showJobLvl;
  @Input() showStarLvl;
  @Input() showType;
  @Input() showName;
  @Input() showEffects;
  @Input() showRange;
  @Input() showCasts;
  @Input() showHits;
  @Input() showCost;

  @Input() upgradeColSpan;
  @Input() basicAttack;

  constructor(
    private toolService: ToolService
  ) {
    super(toolService);
  }
}
