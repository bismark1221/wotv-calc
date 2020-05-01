/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Host, Input } from '@angular/core';
export class AutofocusDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
    }
    /**
     * @return {?}
     */
    get element() {
        return this.elemRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.focus();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ ssAutofocusChange = changes["ssAutofocus"];
        if (ssAutofocusChange && !ssAutofocusChange.isFirstChange()) {
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.ssAutofocus) {
            return;
        }
        this.element.focus && this.element.focus();
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ssAutofocus]'
            },] }
];
/** @nocollapse */
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Host },] },
];
AutofocusDirective.propDecorators = {
    "ssAutofocus": [{ type: Input },],
};
function AutofocusDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AutofocusDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AutofocusDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AutofocusDirective.propDecorators;
    /**
     * Will set focus if set to falsy value or not set at all
     * @type {?}
     */
    AutofocusDirective.prototype.ssAutofocus;
    /** @type {?} */
    AutofocusDirective.prototype.elemRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL2F1dG9mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBS3JHLE1BQU07Ozs7SUFXSixZQUNrQjtRQUFBLFlBQU8sR0FBUCxPQUFPO0tBQ3BCOzs7O0lBTkwsSUFBSSxPQUFPO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0tBQ25DOzs7O0lBTUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNkOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyx1QkFBTSxpQkFBaUIsR0FBRyxPQUFPLGVBQVksQ0FBQztRQUU5QyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDtLQUNGOzs7O0lBRUQsS0FBSztRQUNILEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUM1Qzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OztZQUptQixVQUFVLHVCQWlCekIsSUFBSTs7OzRCQVBOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc3NBdXRvZm9jdXNdJ1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvZm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgLyoqXG4gICAqIFdpbGwgc2V0IGZvY3VzIGlmIHNldCB0byBmYWxzeSB2YWx1ZSBvciBub3Qgc2V0IGF0IGFsbFxuICAgKi9cbiAgQElucHV0KCkgc3NBdXRvZm9jdXM6IGJvb2xlYW47XG5cbiAgZ2V0IGVsZW1lbnQoKTogeyBmb2N1cz86IEZ1bmN0aW9uIH0ge1xuICAgIHJldHVybiB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBzc0F1dG9mb2N1c0NoYW5nZSA9IGNoYW5nZXMuc3NBdXRvZm9jdXM7XG5cbiAgICBpZiAoc3NBdXRvZm9jdXNDaGFuZ2UgJiYgIXNzQXV0b2ZvY3VzQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLnNzQXV0b2ZvY3VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzICYmIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbn1cbiJdfQ==