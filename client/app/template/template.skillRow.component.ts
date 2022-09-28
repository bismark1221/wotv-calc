import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ResizeDetectorComponent } from '../resizeDetector.component';

import { ToolService } from '../services/tool.service';

@Component({
  selector: 'tr[app-template-skillRow]',
  templateUrl: './template.skillRow.component.html',
  styleUrls: ['./template.skillRow.component.css']
})
export class TemplateSkillRowComponent extends ResizeDetectorComponent {
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

  @Input() isUpgrade;
  @Input() effectsColSpan;
  @Input() showTypeWithName;
  @Input() showLevelInput;
  @Input() rawSkills;
  @Input() skillIndex;

  @Output() changeLevel = new EventEmitter<string>();

  constructor(
    private toolService: ToolService
  ) {
    super(toolService);
  }

  changeSkillLevel() {
    this.changeLevel.emit(this.skill.level);
  }
}
