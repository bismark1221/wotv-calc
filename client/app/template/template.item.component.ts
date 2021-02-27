import { Component, Input } from '@angular/core';

import { Item } from '../entities/item';

@Component({
  selector: 'app-template-item',
  templateUrl: './template.item.component.html',
  styleUrls: ['./template.item.component.css']
})
export class TemplateItemComponent {
  @Input() item;
  @Input() customClass;
}
