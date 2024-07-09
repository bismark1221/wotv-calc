import { Component, Input } from '@angular/core';

import { SharedResizeDetectorComponent } from '../resizeDetector.component';

import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared.card.component.html',
  styleUrls: ['./shared.card.component.css']
})
export class SharedCardComponent extends SharedResizeDetectorComponent {
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
