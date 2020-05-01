/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
var OffClickDirective = /** @class */ (function () {
    function OffClickDirective() {
        this.onOffClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._clickEvent = event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onTouch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._touchEvent = event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onDocumentClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event !== this._clickEvent) {
            this.onOffClick.emit(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OffClickDirective.prototype.onDocumentTouch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event !== this._touchEvent) {
            this.onOffClick.emit(event);
        }
    };
    OffClickDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[offClick]',
                },] }
    ];
    /** @nocollapse */
    OffClickDirective.propDecorators = {
        "onOffClick": [{ type: Output, args: ['offClick',] },],
        "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
        "onTouch": [{ type: HostListener, args: ['touchstart', ['$event'],] },],
        "onDocumentClick": [{ type: HostListener, args: ['document:click', ['$event'],] },],
        "onDocumentTouch": [{ type: HostListener, args: ['document:touchstart', ['$event'],] },],
    };
    return OffClickDirective;
}());
export { OffClickDirective };
function OffClickDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    OffClickDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    OffClickDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    OffClickDirective.propDecorators;
    /** @type {?} */
    OffClickDirective.prototype.onOffClick;
    /** @type {?} */
    OffClickDirective.prototype._clickEvent;
    /** @type {?} */
    OffClickDirective.prototype._touchEvent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmLWNsaWNrLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUlsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7OzswQkFRSixJQUFJLFlBQVksRUFBTzs7Ozs7O0lBTWpELG1DQUFPOzs7O2NBQUMsS0FBaUI7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Ozs7OztJQUlwQixtQ0FBTzs7OztjQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFJcEIsMkNBQWU7Ozs7Y0FBQyxLQUFpQjtRQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7Ozs7OztJQUlJLDJDQUFlOzs7O2NBQUMsS0FBaUI7UUFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCOzs7Z0JBaENKLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCOzs7OytCQUdFLE1BQU0sU0FBQyxVQUFVOzRCQUtqQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUtoQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO29DQUtyQyxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7b0NBT3pDLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7NEJBcENqRDs7U0FhYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIb3N0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbb2ZmQ2xpY2tdJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBPZmZDbGlja0RpcmVjdGl2ZSB7XG4gIEBPdXRwdXQoJ29mZkNsaWNrJykgb25PZmZDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX2NsaWNrRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gIHByaXZhdGUgX3RvdWNoRXZlbnQ6IFRvdWNoRXZlbnQ7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBcbiAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGlja0V2ZW50ID0gZXZlbnQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uVG91Y2goZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl90b3VjaEV2ZW50ID0gZXZlbnQ7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pIFxuICBwdWJsaWMgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICE9PSB0aGlzLl9jbGlja0V2ZW50KSB7XG4gICAgICB0aGlzLm9uT2ZmQ2xpY2suZW1pdChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dG91Y2hzdGFydCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbkRvY3VtZW50VG91Y2goZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX3RvdWNoRXZlbnQpIHtcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==