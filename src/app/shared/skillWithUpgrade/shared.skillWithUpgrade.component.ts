import { Component, Input } from '@angular/core';

import { SharedResizeDetectorComponent } from '../resizeDetector.component';

import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'tbody[app-shared-skillWithUpgrade]',
  templateUrl: './shared.skillWithUpgrade.component.html',
  styleUrls: ['./shared.skillWithUpgrade.component.css']
})
export class SharedSkillWithUpgradeComponent extends SharedResizeDetectorComponent {
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
  @Input() showRaidLevel;

  @Input() upgradeColSpan;
  @Input() basicAttack;
  @Input() rawSkills;
  @Input() skillIndex;
  @Input() showTypeWithName;
  @Input() noNameOnUpgrade;

  @Input() mobileView;
  @Input() showMobileSeparator;
  @Input() showMobileTitles;
  @Input() mobileCollapseDetail;

  constructor(
    private toolService: ToolService
  ) {
    super(toolService);
  }
}
