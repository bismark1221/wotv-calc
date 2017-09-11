import {
  Input, Directive, ComponentRef, ElementRef, OnInit, OnDestroy, OnChanges,
  ViewContainerRef, ComponentFactoryResolver, Inject, SimpleChanges
} from "@angular/core";
import { TooltipComponent } from "./tooltip.component";
import { DOCUMENT } from "@angular/platform-browser";


/**
 * Displays a tooltip over the element that contains this directive when
 * the active input is true.
 * @example:
 * <p>
 *    Only one word in this sentence will have a
 *    <span tooltip="hello" [active]="true">tooltip</span>.
 * </p>
 */
@Directive({
  selector: "[tooltip]",
  host: {
    "(mouseover)": "onMouseOver($event)",
    "(mouseleave)": "onMouseLeave($event)"
  }
})
export class TooltipDirective implements OnInit, OnChanges, OnDestroy {
  private _tooltipRef: ComponentRef<TooltipComponent>;
  @Input() parentSelector: string = "body"; // where the tooltip gets added
  @Input() active: boolean; // used to manually enable / disable
  @Input() tooltip: string; // content for the tooltip
  @Input() tooltipClass: string; // class for the tooltip element

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _container: ViewContainerRef,
    private _el: ElementRef,
    @Inject(DOCUMENT) private _document: any
  ) {}

  /**
   * Add the tooltip component on init.
   */
  ngOnInit(): void { this.addTooltip(); }

  /**
   * Destroy the tooltip component on destroy.
   */
  ngOnDestroy(): void { if (this._tooltipRef) { this._tooltipRef.destroy(); } }

  /**
   * Listens for active state changes and shows / hides the tooltip
   * based on the value.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["active"] && typeof this.active !== "undefined") {
      if (changes["active"]["currentValue"]) {
        this.showTooltip();
      } else {
        this.hideTooltip();
      }
    }
  }

  /**
   * Show the tooltip on hover, if it is not being manually shown / hidden
   * by the active attribute.
   */
  onMouseOver(ev: MouseEvent): void {
    if (typeof this.active === "undefined") { this.showTooltip(); }
  }

  /**
   * Hide the tooltip on leave, if it is not being manually shown / hidden
   * by the active attribute.
   */
  onMouseLeave(ev: MouseEvent): void {
    if (typeof this.active === "undefined") { this.hideTooltip(); }
  }

  /**
   * Waits until a value has a constant value and resolves the promise.
   * Current usage is to make sure an element is finished rendering and is in
   * place before performing an action.
   * @param valFunc - a function that returns the value to wait for
   * @param threshold - the number of consecutive times the value must be
   *    consistent before being deemed final.
   * @param timeout - maximum amount of time (ms) to continue checking for a
   *    consistent value
   */
  private waitForFinalValue(
    valFunc: () => any,
    options: Object = {}
  ): Promise<any> {
    // override default options
    let ops = Object.assign({
      threshold: 5,
      intervalTime: 100,
      timeout: 5000
    }, options);
    // return the promise
    return new Promise<any>((resolve, reject) => {
      let value = valFunc();
      let totalTime = 0; // track total time
      let checks = 0; // track the number of consecutive checks
      let interval = setInterval(() => {
        if (checks > ops.threshold) {
          clearInterval(interval);
          resolve(value);
        } else if (totalTime > ops.timeout) {
          clearInterval(interval);
          reject("Timed out when waiting for a final value.");
        }
        totalTime += ops.intervalTime;
        if (value === valFunc()) {
          checks++;
        } else {
          // value changed, reset.
          value = valFunc();
          checks = 0;
        }
      }, ops.intervalTime);
    });
  }

  /**
   * Dynamically adds a tooltip component
   */
  public addTooltip(): Promise<ComponentRef<TooltipComponent>> {
    // resolve the promise if the tooltip already exists
    if (this._tooltipRef) { return Promise.resolve(this._tooltipRef); }
    // add the tooltip when the element is in place
    return this.waitForFinalValue(() => this._el.nativeElement.offsetTop)
      .then(() => {
        // get the factory for creating tooltips
        let tooltipFactory =
          this._resolver.resolveComponentFactory(TooltipComponent);
        // create the tooltip
        this._tooltipRef = this._container.createComponent(tooltipFactory);
        // append the component to the document body
        this._document.querySelector(this.parentSelector)
          .appendChild(this._tooltipRef.location.nativeElement);
        return this._tooltipRef;
      });
  }

  /**
   * Adds the tooltip (if it doesn't already exist) and then activates
   * the component.
   */
  public showTooltip(): Promise<ElementRef> {
    return this.addTooltip().then((ref) => {
      return ref.instance.renderTooltip(this._el, {
        content: this.tooltip,
        active: true,
        tooltipClass: this.tooltipClass
      });
    });
  }

  /**
   * Deactivates the tooltip component if it exists.
   */
  public hideTooltip(): void {
    if (this._tooltipRef) {
      this._tooltipRef.instance.renderTooltip(this._el, {
        content: this.tooltip,
        active: false,
        tooltipClass: this.tooltipClass
      });
    }
  }

}
