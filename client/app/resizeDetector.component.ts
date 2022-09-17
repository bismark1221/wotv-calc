import { Component, HostListener } from '@angular/core';

import { ToolService } from './services/tool.service';

export abstract class ResizeDetectorComponent {
  isWindowSmall = false;

  constructor(
    private toolServ: ToolService
  ) {
    this.isWindowSmall = this.toolServ.isWindowSmall();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isWindowSmall = this.toolServ.isWindowSmall();
  }
}
