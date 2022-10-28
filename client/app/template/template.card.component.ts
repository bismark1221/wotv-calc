import { Component, Input } from '@angular/core';

import { ResizeDetectorComponent } from '../resizeDetector.component';

import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-template-card',
  templateUrl: './template.card.component.html',
  styleUrls: ['./template.card.component.css']
})
export class TemplateCardComponent extends ResizeDetectorComponent {
  @Input() item;
  @Input() linkType;
  @Input() assetType;
  @Input() options;

  constructor(
    private navService: NavService,
    private toolService: ToolService
  ) {
    super(toolService);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
