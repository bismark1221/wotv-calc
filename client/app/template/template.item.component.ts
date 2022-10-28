import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template-item',
  templateUrl: './template.item.component.html',
  styleUrls: ['./template.item.component.css']
})
export class TemplateItemComponent {
  @Input() item;
  @Input() customClass;
}
