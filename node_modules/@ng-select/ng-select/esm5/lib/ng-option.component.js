/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-option.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { Subject } from 'rxjs';
var NgOptionComponent = /** @class */ (function () {
    function NgOptionComponent(elementRef) {
        this.elementRef = elementRef;
        this.stateChange$ = new Subject();
        this._disabled = false;
    }
    Object.defineProperty(NgOptionComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = this._isDisabled(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgOptionComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.elementRef.nativeElement.textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgOptionComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.disabled) {
            this.stateChange$.next({
                value: this.value,
                disabled: this._disabled
            });
        }
    };
    /**
     * @return {?}
     */
    NgOptionComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.label !== this._previousLabel) {
            this._previousLabel = this.label;
            this.stateChange$.next({
                value: this.value,
                disabled: this._disabled,
                label: this.elementRef.nativeElement.innerHTML
            });
        }
    };
    /**
     * @return {?}
     */
    NgOptionComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChange$.complete();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NgOptionComponent.prototype._isDisabled = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value != null && "" + value !== 'false';
    };
    NgOptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-option',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-content></ng-content>"
                }] }
    ];
    /** @nocollapse */
    NgOptionComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgOptionComponent.propDecorators = {
        value: [{ type: Input }],
        disabled: [{ type: Input }]
    };
    return NgOptionComponent;
}());
export { NgOptionComponent };
if (false) {
    /** @type {?} */
    NgOptionComponent.prototype.value;
    /** @type {?} */
    NgOptionComponent.prototype.stateChange$;
    /**
     * @type {?}
     * @private
     */
    NgOptionComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    NgOptionComponent.prototype._previousLabel;
    /** @type {?} */
    NgOptionComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctb3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zZWxlY3Qvbmctc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL25nLW9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUlSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0I7SUFpQkksMkJBQW1CLFVBQW1DO1FBQW5DLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBTDdDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQXFELENBQUM7UUFFakYsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUdnQyxDQUFDO0lBVDNELHNCQUNJLHVDQUFROzs7O1FBRFosY0FDaUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDekMsVUFBYSxLQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O09BRDVCO0lBVXpDLHNCQUFJLG9DQUFLOzs7O1FBQVQ7WUFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BFLENBQUM7OztPQUFBOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzNCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7OztJQUVELDhDQUFrQjs7O0lBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVM7YUFDakQsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFFTyx1Q0FBVzs7Ozs7SUFBbkIsVUFBb0IsS0FBSztRQUNyQixPQUFPLEtBQUssSUFBSSxJQUFJLElBQUksS0FBRyxLQUFPLEtBQUssT0FBTyxDQUFDO0lBQ25ELENBQUM7O2dCQWpESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsMkJBQTJCO2lCQUN4Qzs7OztnQkFaRyxVQUFVOzs7d0JBZVQsS0FBSzsyQkFDTCxLQUFLOztJQTBDVix3QkFBQztDQUFBLEFBbERELElBa0RDO1NBN0NZLGlCQUFpQjs7O0lBRTFCLGtDQUFvQjs7SUFLcEIseUNBQXlGOzs7OztJQUV6RixzQ0FBMEI7Ozs7O0lBQzFCLDJDQUErQjs7SUFFbkIsdUNBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZy1vcHRpb24nLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgTmdPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGFueSkgeyB0aGlzLl9kaXNhYmxlZCA9IHRoaXMuX2lzRGlzYWJsZWQodmFsdWUpIH1cblxuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PHsgdmFsdWU6IGFueSwgZGlzYWJsZWQ6IGJvb2xlYW4sIGxhYmVsPzogc3RyaW5nIH0+KCk7XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3ByZXZpb3VzTGFiZWw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB9XG5cbiAgICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UkLm5leHQoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLl9kaXNhYmxlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhYmVsICE9PSB0aGlzLl9wcmV2aW91c0xhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c0xhYmVsID0gdGhpcy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2UkLm5leHQoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGlzLl9kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlJC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzRGlzYWJsZWQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgYCR7dmFsdWV9YCAhPT0gJ2ZhbHNlJztcbiAgICB9XG59XG4iXX0=