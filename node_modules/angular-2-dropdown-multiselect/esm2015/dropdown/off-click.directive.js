/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
export class OffClickDirective {
    constructor() {
        this.onOffClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this._clickEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouch(event) {
        this._touchEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (event !== this._clickEvent) {
            this.onOffClick.emit(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentTouch(event) {
        if (event !== this._touchEvent) {
            this.onOffClick.emit(event);
        }
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmLWNsaWNrLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUlsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPdkMsTUFBTTs7MEJBQzZCLElBQUksWUFBWSxFQUFPOzs7Ozs7SUFNakQsT0FBTyxDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFJcEIsT0FBTyxDQUFDLEtBQWlCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOzs7Ozs7SUFJcEIsZUFBZSxDQUFDLEtBQWlCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qjs7Ozs7O0lBSUksZUFBZSxDQUFDLEtBQWlCO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qjs7OztZQWhDSixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7OzJCQUdFLE1BQU0sU0FBQyxVQUFVO3dCQUtqQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQUtoQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dDQUtyQyxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBT3pDLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxufSlcblxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgnb2ZmQ2xpY2snKSBvbk9mZkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcbiAgcHJpdmF0ZSBfdG91Y2hFdmVudDogVG91Y2hFdmVudDtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxuICBwdWJsaWMgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NsaWNrRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX3RvdWNoRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSkgXG4gIHB1YmxpYyBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCAhPT0gdGhpcy5fdG91Y2hFdmVudCkge1xuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19