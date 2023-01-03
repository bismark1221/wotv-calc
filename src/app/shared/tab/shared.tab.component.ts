import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-tab',
  templateUrl: './shared.tab.component.html',
  styleUrls: ['./shared.tab.component.css']
})
export class SharedTabComponent {
  @Input() title: string;
  @Input() active = false;
  @Input() link = null;
  @Input() mobileManaged = false;
}
