import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ResizeDetectorComponent } from '../resizeDetector.component';

import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-template-skillType',
  templateUrl: './template.skillType.component.html',
  styleUrls: ['./template.skillType.component.css']
})
export class TemplateSkillTypeComponent extends ResizeDetectorComponent {
  @Input() skill;

  constructor(
    private toolService: ToolService
  ) {
    super(toolService);
  }
}
