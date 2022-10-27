import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-item',
  templateUrl: './shared.item.component.html',
  styleUrls: ['./shared.item.component.css']
})
export class SharedItemComponent {
  @Input() item;
  @Input() customClass;
}
