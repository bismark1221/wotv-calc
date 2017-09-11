import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy,
  Output, SimpleChanges, ViewChild, ViewEncapsulation, Renderer, OnInit
} from '@angular/core';

import 'select2';
import 'jquery';

import { Select2OptionData } from './select2.interface';

@Component({
  selector: 'select2',
  template: `
    <select #selector>
      <ng-content select="option, optgroup">
      </ng-content>
    </select>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./select2.component.css']
})
export class Select2Component implements AfterViewInit, OnChanges, OnDestroy, OnInit {
  @ViewChild('selector') selector: ElementRef;

  // data for select2 drop down
  @Input() data: Array<Select2OptionData>;

  // value for select2
  @Input() value: string | string[];

  @Input() position: string;

  // enable / disable default style for select2
  @Input() cssImport: boolean = false;

  // width of select2 input
  @Input() width: string;

  // enable / disable select2
  @Input() disabled: boolean = false;

  // all additional options
  @Input() options: Select2Options;

  // emitter when value is changed
  @Output() valueChanged = new EventEmitter();

  private element: JQuery = undefined;
  private check: boolean = false;
  private style: string = `CSS`;
  private positionSelected: any[] = [];

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    if(this.cssImport) {
      const head = document.getElementsByTagName('head')[0];
      const link: any = head.children[head.children.length-1];

      if(!link.version) {
        const newLink = this.renderer.createElement(head, 'style');
        this.renderer.setElementProperty(newLink, 'type', 'text/css');
        this.renderer.setElementProperty(newLink, 'version', 'select2');
        this.renderer.setElementProperty(newLink, 'innerHTML', this.style);
      }

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("###### -- " + this.position);
    console.log(changes);

    if(!this.element) {
      // console.log("No ELEMENT")
      setTimeout(() => {
        // console.log("end wait")
        // console.log(this.element)
        if (this.element) {
          this.ngOnChanges(changes)
        }
      }, 200)

      return;
    }

    if(changes['data']) {
      // console.log("refresh plugin data")
      this.initPlugin();

      // console.log("val -- " + this.element.val())
      let newValue: string = this.element.val();
      if(changes['value']) {
        console.log("change value")
        let newValue = changes['value'].currentValue;
        this.setElementValue(newValue);
        this.positionSelected[this.position] = newValue;
        this.valueChanged.emit({
          value: newValue,
          data: this.element.select2('data')
        });
      } else {
        console.log("@@@@@@@@@@@ only send data -- " + this.positionSelected[this.position])
        this.valueChanged.emit({
          value: this.positionSelected[this.position],
          data: this.element.select2('data')
        });
      }
      console.log("TTTTTTTTT")
      console.log(this.element)
      console.log(newValue);
      console.log(this.positionSelected);
      console.log("TTTTTTTTT")

    }

    if(changes['value']) {
      // console.log("refresh plugin value")
      const newValue: string = changes['value'].currentValue;

      this.setElementValue(newValue);
      this.positionSelected[this.position] = newValue;

      this.valueChanged.emit({
        value: newValue,
        data: this.element.select2('data')
      });
    }

    if(changes['disabled'] && changes['disabled'].previousValue !== changes['disabled'].currentValue) {
      this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
    // console.log("@@@@@");
  }

  ngAfterViewInit() {
    // console.log("ngAfterViewInit")
    this.element = jQuery(this.selector.nativeElement);
    this.initPlugin();

    if (typeof this.value !== 'undefined') {
      this.setElementValue(this.value);
    }

    this.element.on('select2:select', () => {
      this.valueChanged.emit({
        value: this.element.val(),
        data: this.element.select2('data')
      });
    });

    this.element.on('select2:unselect', () => {
      if (this.options.multiple !== true) {
        this.valueChanged.emit({
          value: null,
          data: this.element.select2('data')
        });
        return;
      }
      this.valueChanged.emit({
        value: this.element.val(),
        data: this.element.select2('data')
      });
    });
  }

  ngOnDestroy() {
    if (this.element) {
      this.element.off("select2:select");
    }
  }

  private initPlugin() {
    if(!this.element.select2) {
      if(!this.check) {
        this.check = true;
      }

      return;
    }

    // If select2 already initialized remove him and remove all tags inside
    if (this.element.hasClass('select2-hidden-accessible') == true) {
      this.element.select2('destroy');
      this.renderer.setElementProperty(this.selector.nativeElement, 'innerHTML', '');
    }

    let options: Select2Options = {
      data: this.data,
      width: (this.width) ? this.width : 'resolve'
    };

    Object.assign(options, this.options);

    if(options.matcher) {
      jQuery.fn.select2.amd.require(['select2/compat/matcher'], (oldMatcher: any) => {
        options.matcher = oldMatcher(options.matcher);
        this.element.select2(options);

        if (typeof this.value !== 'undefined') {
          this.setElementValue(this.value);
        }
      });
    } else {
      this.element.select2(options);
    }

    if(this.disabled) {
      this.renderer.setElementProperty(this.selector.nativeElement, 'disabled', this.disabled);
    }
  }

  private setElementValue (newValue: string | string[]) {
    if(Array.isArray(newValue)) {
      for (let option of this.selector.nativeElement.options) {
        if (newValue.indexOf(option.value) > -1) {
          this.renderer.setElementProperty(option, 'selected', 'true');
        }
       }
    } else {
      this.renderer.setElementProperty(this.selector.nativeElement, 'value', newValue);
    }

    this.element.trigger('change.select2');
  }

}
