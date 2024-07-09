import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SharedResizeDetectorComponent } from '../resizeDetector.component';

import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-shared-skillType',
  templateUrl: './shared.skillType.component.html',
  styleUrls: ['./shared.skillType.component.css']
})
export class SharedSkillTypeComponent extends SharedResizeDetectorComponent {
  @Input() skill;

  constructor(
    private toolService: ToolService
  ) {
    super(toolService);
  }
}
