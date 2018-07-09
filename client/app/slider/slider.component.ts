import * as noUiSlider from 'nouislider';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, OnChanges, Output, NgModule } from '@angular/core';

import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DefaultFormatter } from './default.formatter';
import { UiFormatter } from './uiformatter.interface';

@Component({
  selector: 'nouislider',
  host: {
    '[class.ng2-nouislider]': 'true'
  },
  template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
  styles: [`
    :host {
      display: block;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    }
  ]
})
export class SliderComponent implements ControlValueAccessor, OnInit, OnChanges {

  public slider: any;
  public handles: any[];
  @Input() public disabled: boolean; // tslint:disable-line
  @Input() public behaviour: string;
  @Input() public connect: boolean[];
  @Input() public limit: number;
  @Input() public min: number;
  @Input() public max: number;
  @Input() public step: number;
  @Input() public format: UiFormatter;
  @Input() public pageSteps: number;
  @Input() public config: any = {};
  @Input() public ngModel: number | number[];
  @Input() public formControl: FormControl;
  @Input() public tooltips: Array<any>;
  @Output() public change: EventEmitter<any> = new EventEmitter(true);
  @Output() public update: EventEmitter<any> = new EventEmitter(true);
  @Output() public slide: EventEmitter<any> = new EventEmitter(true);
  @Output() public set: EventEmitter<any> = new EventEmitter(true);
  @Output() public start: EventEmitter<any> = new EventEmitter(true);
  @Output() public end: EventEmitter<any> = new EventEmitter(true);
  private value: any;
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  constructor(private el: ElementRef) { }

  private eventHandler = (emitter: EventEmitter<any>, values: string[], handle: number, unencoded: number[]) => {
    let v = this.toValues(values);
    let emitEvents = false;
    if(this.value === undefined) {
      this.value = v;
      return;
    }

    if(Array.isArray(v) && this.value[handle] != v[handle]) {
      emitEvents = true;
    }

    if(!Array.isArray(v) && this.value != v) {
      emitEvents = true;
    }

    if(emitEvents) {
      emitter.emit(v);
      this.onChange(v);
    }

    if(Array.isArray(v)) {
      this.value[handle] = v[handle];
    } else {
      this.value = v;
    }
  }

  ngOnInit(): void {
    let inputsConfig = JSON.parse(JSON.stringify({
      behaviour: this.behaviour,
      connect: this.connect,
      limit: this.limit,
      start: this.formControl !== undefined ? this.formControl.value : this.ngModel,
      step: this.step,
      pageSteps: this.pageSteps,
      range: this.config.range || {min: this.min, max: this.max},
      tooltips: this.tooltips,
    }));

    inputsConfig.format = this.format || this.config.format || new DefaultFormatter();

    this.slider = noUiSlider.create(
      this.el.nativeElement.querySelector('div'),
      Object.assign(this.config, inputsConfig)
    );

    this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));

    this.slider.on('set', (values: string[], handle: number, unencoded: number[]) => {
      this.eventHandler(this.set, values, handle, unencoded);
    });

    this.slider.on('update', (values: string[], handle: number, unencoded: number[]) => {
      this.update.emit(this.toValues(values));
    });

    this.slider.on('change', (values: string[], handle: number, unencoded: number[]) => {
      this.change.emit(this.toValues(values));
    });

    this.slider.on('slide', (values: string[], handle: number, unencoded: number[]) => {
      this.eventHandler(this.slide, values, handle, unencoded);
    });

    this.slider.on('start', (values: string[], handle: number, unencoded: number[]) => {
      this.start.emit(this.toValues(values));
    });

    this.slider.on('end', (values: string[], handle: number, unencoded: number[]) => {
      this.end.emit(this.toValues(values));
    });
  }

  ngOnChanges(changes: any) {
    if (this.slider && (changes.min || changes.max || changes.step)) {
      setTimeout(() => {
        this.slider.updateOptions({
          range: {
            min: this.min,
            max: this.max
          },
          step: this.step
        });
      });
    }
  }

  toValues(values: string[]): any | any[] {
    let v = values.map(this.config.format.from);
    return (v.length == 1 ? v[0] : v);
  }

  writeValue(value: any): void {
    if (this.slider) {
      this.slider.set(value);
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
