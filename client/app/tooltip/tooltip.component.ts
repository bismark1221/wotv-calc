import { Component, ElementRef } from "@angular/core";
import { trigger, state, style, animate, transition } from '@angular/animations';

export interface TooltipOptions {
  content: string;
  active: boolean;
  tooltipClass: string;
}

/**
 * This component is dynamically injected to a page via the tooltip directive
 */
@Component({
  template : `<div
      class="tooltip"
      [@tooltipState]="active?'active':'inactive'"
      [ngClass]="tooltipClass"
    >
      <span class="tooltip-content"></span>
      <span class="tooltip-arrow"></span>
    </div>
  `,
  styles: [`
    .tooltip {
      position:absolute;
      background: rgba(0,0,0,0.8);
      color: #fff;
      font-size:1.2rem;
      line-height: 1.2;
      padding:8px 12px;
      border-radius: 3px;
    }
    .tooltip-content {
      min-width:100px;
    }
    .tooltip-arrow {
      position:absolute;
      bottom: -10px;
      border: 5px solid transparent;
      border-top-color: rgba(0,0,0,0.8);
      left:50%;
      margin-left:-5px;
    }
  `],
  animations: [
    trigger("tooltipState", [
      state("active", style({
        visibility: 'visible',
        opacity: 1,
        transform: "translate(0, -4px)"
      })),
      state("inactive", style({
        visibility: 'hidden',
        opacity: 0,
        transform: "translate(0, 0)"
      })),
      transition(":enter", [
        style({visibility: 'visible', opacity: 0, transform: "translate(0,0)"}),
        animate(300)
      ]),
      transition(":leave", [
        style({visibility: 'hidden', opacity: 0, transform: "translate(0,0)"}),
        animate(300)
      ]),
      transition("inactive => active", animate(300)),
      transition("active => inactive", animate(300))
    ])
  ]
})
export class TooltipComponent {

  private _relativeElement: ElementRef;
  public active: boolean = false;
  public tooltipClass: string;

  constructor(private elRef: ElementRef) {}

  /**
   * Set the content and position of the tooltip, then set the active status.
   */
  public renderTooltip(el: ElementRef, options: TooltipOptions): ElementRef {
    if (options.content !== "") {
      this._relativeElement = el;
      this.tooltipClass = options.tooltipClass;
      if (options.content) {
        this._setTooltipContent(options.content);
        this._setTooltipPosition();
      }
      if (options.active) {
        this.active = true;
      } else {
        this.active = false;
      }
    } else {
      this.active = false;
    }
    return this.elRef;
  }

  /**
   * Calculates the position of the tooltip element, along with an
   * offset value of how much to adjust the tooltip arrow if necessary.
   */
  private _calculateTooltipPosition(): {
    left: number,
    top: number,
    offset: number
  } {
    // get DOM elements
    let tooltipEl = this.elRef.nativeElement.querySelector(".tooltip");
    let relEl = this._relativeElement.nativeElement;
    // width and height of tooltip element
    let tooltipDimensions = [ tooltipEl.offsetWidth, tooltipEl.offsetHeight ];
    // top, center position of relative element
    let relDimensions = [
      relEl.offsetLeft + relEl.offsetWidth / 2, relEl.offsetTop
    ];
    let targetX = (relDimensions[0] - tooltipDimensions[0] / 2);
    // calculate the adjusted x position to keep the element on screen
    let adjustedX = Math.min(
      window.innerWidth - tooltipEl.offsetWidth, Math.max(4, targetX)
    );
    // keep the pointer offset from extending past the edge of the tooltip
    let adjustedOffset = Math.max(
      Math.min((tooltipEl.offsetWidth / 2) - 10, targetX - adjustedX),
      -(tooltipEl.offsetWidth / 2) + 10
    );
    return {
      left: adjustedX,
      top: relDimensions[1] - tooltipDimensions[1],
      offset: adjustedOffset
    };
  }

  /**
   * Sets the content for the tooltip.
   */
  private _setTooltipContent(content: string): void {
    let tooltipContentEl =
      this.elRef.nativeElement.querySelector(".tooltip-content");
    tooltipContentEl.innerHTML = content;
  }

  /**
   * Sets the transform on the tooltip arrow.
   */
  private _setPointerOffset(offset: number): void {
    let tooltipArrow = this.elRef.nativeElement.querySelector(".tooltip-arrow");
    let translate = "translateX(" + offset + "px)";
    tooltipArrow.style.webkitTransform = translate;
    tooltipArrow.style.MozTransform = translate;
    tooltipArrow.style.msTransform = translate;
    tooltipArrow.style.OTransform = translate;
    tooltipArrow.style.transform = translate;
  }

  /**
   * Positions the tooltip directly above the relative element.
   */
  private _setTooltipPosition(): void {
    // get DOM elements
    let tooltipEl = this.elRef.nativeElement.querySelector(".tooltip");
    let positions = this._calculateTooltipPosition();
    // place the tooltip
    tooltipEl.style.left = positions.left + "px";
    tooltipEl.style.top = positions.top + "px";
    if (positions.offset !== 0) { this._setPointerOffset(positions.offset); }
  }

}
