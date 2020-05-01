/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-templates.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { escapeHTML } from './value-utils';
var NgItemLabelDirective = /** @class */ (function () {
    function NgItemLabelDirective(element) {
        this.element = element;
        this.escape = true;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgItemLabelDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.element.nativeElement.innerHTML = this.escape ?
            escapeHTML(this.ngItemLabel) :
            this.ngItemLabel;
    };
    NgItemLabelDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngItemLabel]' },] }
    ];
    /** @nocollapse */
    NgItemLabelDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgItemLabelDirective.propDecorators = {
        ngItemLabel: [{ type: Input }],
        escape: [{ type: Input }]
    };
    return NgItemLabelDirective;
}());
export { NgItemLabelDirective };
if (false) {
    /** @type {?} */
    NgItemLabelDirective.prototype.ngItemLabel;
    /** @type {?} */
    NgItemLabelDirective.prototype.escape;
    /**
     * @type {?}
     * @private
     */
    NgItemLabelDirective.prototype.element;
}
var NgOptionTemplateDirective = /** @class */ (function () {
    function NgOptionTemplateDirective(template) {
        this.template = template;
    }
    NgOptionTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-option-tmp]' },] }
    ];
    /** @nocollapse */
    NgOptionTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgOptionTemplateDirective;
}());
export { NgOptionTemplateDirective };
if (false) {
    /** @type {?} */
    NgOptionTemplateDirective.prototype.template;
}
var NgOptgroupTemplateDirective = /** @class */ (function () {
    function NgOptgroupTemplateDirective(template) {
        this.template = template;
    }
    NgOptgroupTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-optgroup-tmp]' },] }
    ];
    /** @nocollapse */
    NgOptgroupTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgOptgroupTemplateDirective;
}());
export { NgOptgroupTemplateDirective };
if (false) {
    /** @type {?} */
    NgOptgroupTemplateDirective.prototype.template;
}
var NgLabelTemplateDirective = /** @class */ (function () {
    function NgLabelTemplateDirective(template) {
        this.template = template;
    }
    NgLabelTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-label-tmp]' },] }
    ];
    /** @nocollapse */
    NgLabelTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgLabelTemplateDirective;
}());
export { NgLabelTemplateDirective };
if (false) {
    /** @type {?} */
    NgLabelTemplateDirective.prototype.template;
}
var NgMultiLabelTemplateDirective = /** @class */ (function () {
    function NgMultiLabelTemplateDirective(template) {
        this.template = template;
    }
    NgMultiLabelTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-multi-label-tmp]' },] }
    ];
    /** @nocollapse */
    NgMultiLabelTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgMultiLabelTemplateDirective;
}());
export { NgMultiLabelTemplateDirective };
if (false) {
    /** @type {?} */
    NgMultiLabelTemplateDirective.prototype.template;
}
var NgHeaderTemplateDirective = /** @class */ (function () {
    function NgHeaderTemplateDirective(template) {
        this.template = template;
    }
    NgHeaderTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-header-tmp]' },] }
    ];
    /** @nocollapse */
    NgHeaderTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgHeaderTemplateDirective;
}());
export { NgHeaderTemplateDirective };
if (false) {
    /** @type {?} */
    NgHeaderTemplateDirective.prototype.template;
}
var NgFooterTemplateDirective = /** @class */ (function () {
    function NgFooterTemplateDirective(template) {
        this.template = template;
    }
    NgFooterTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-footer-tmp]' },] }
    ];
    /** @nocollapse */
    NgFooterTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgFooterTemplateDirective;
}());
export { NgFooterTemplateDirective };
if (false) {
    /** @type {?} */
    NgFooterTemplateDirective.prototype.template;
}
var NgNotFoundTemplateDirective = /** @class */ (function () {
    function NgNotFoundTemplateDirective(template) {
        this.template = template;
    }
    NgNotFoundTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-notfound-tmp]' },] }
    ];
    /** @nocollapse */
    NgNotFoundTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgNotFoundTemplateDirective;
}());
export { NgNotFoundTemplateDirective };
if (false) {
    /** @type {?} */
    NgNotFoundTemplateDirective.prototype.template;
}
var NgTypeToSearchTemplateDirective = /** @class */ (function () {
    function NgTypeToSearchTemplateDirective(template) {
        this.template = template;
    }
    NgTypeToSearchTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-typetosearch-tmp]' },] }
    ];
    /** @nocollapse */
    NgTypeToSearchTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgTypeToSearchTemplateDirective;
}());
export { NgTypeToSearchTemplateDirective };
if (false) {
    /** @type {?} */
    NgTypeToSearchTemplateDirective.prototype.template;
}
var NgLoadingTextTemplateDirective = /** @class */ (function () {
    function NgLoadingTextTemplateDirective(template) {
        this.template = template;
    }
    NgLoadingTextTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-loadingtext-tmp]' },] }
    ];
    /** @nocollapse */
    NgLoadingTextTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgLoadingTextTemplateDirective;
}());
export { NgLoadingTextTemplateDirective };
if (false) {
    /** @type {?} */
    NgLoadingTextTemplateDirective.prototype.template;
}
var NgTagTemplateDirective = /** @class */ (function () {
    function NgTagTemplateDirective(template) {
        this.template = template;
    }
    NgTagTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-tag-tmp]' },] }
    ];
    /** @nocollapse */
    NgTagTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgTagTemplateDirective;
}());
export { NgTagTemplateDirective };
if (false) {
    /** @type {?} */
    NgTagTemplateDirective.prototype.template;
}
var NgLoadingSpinnerTemplateDirective = /** @class */ (function () {
    function NgLoadingSpinnerTemplateDirective(template) {
        this.template = template;
    }
    NgLoadingSpinnerTemplateDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng-loadingspinner-tmp]' },] }
    ];
    /** @nocollapse */
    NgLoadingSpinnerTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    return NgLoadingSpinnerTemplateDirective;
}());
export { NgLoadingSpinnerTemplateDirective };
if (false) {
    /** @type {?} */
    NgLoadingSpinnerTemplateDirective.prototype.template;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctdGVtcGxhdGVzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zZWxlY3Qvbmctc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL25nLXRlbXBsYXRlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTRCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDO0lBS0ksOEJBQW9CLE9BQWdDO1FBQWhDLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBRjNDLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFFaUMsQ0FBQzs7Ozs7SUFFekQsMENBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekIsQ0FBQzs7Z0JBWEosU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTs7OztnQkFIcEIsVUFBVTs7OzhCQUt6QixLQUFLO3lCQUNMLEtBQUs7O0lBU1YsMkJBQUM7Q0FBQSxBQVpELElBWUM7U0FYWSxvQkFBb0I7OztJQUM3QiwyQ0FBNkI7O0lBQzdCLHNDQUF1Qjs7Ozs7SUFFWCx1Q0FBd0M7O0FBU3hEO0lBRUksbUNBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUksQ0FBQzs7Z0JBRnJELFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztnQkFqQnVCLFdBQVc7O0lBb0I1RSxnQ0FBQztDQUFBLEFBSEQsSUFHQztTQUZZLHlCQUF5Qjs7O0lBQ3RCLDZDQUFpQzs7QUFH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OlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZXNjYXBlSFRNTCB9IGZyb20gJy4vdmFsdWUtdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdJdGVtTGFiZWxdJyB9KVxuZXhwb3J0IGNsYXNzIE5nSXRlbUxhYmVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSBuZ0l0ZW1MYWJlbDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGVzY2FwZSA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7IH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5lc2NhcGUgP1xuICAgICAgICAgICAgZXNjYXBlSFRNTCh0aGlzLm5nSXRlbUxhYmVsKSA6XG4gICAgICAgICAgICB0aGlzLm5nSXRlbUxhYmVsO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nLW9wdGlvbi10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nT3B0aW9uVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy1vcHRncm91cC10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nT3B0Z3JvdXBUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nLWxhYmVsLXRtcF0nIH0pXG5leHBvcnQgY2xhc3MgTmdMYWJlbFRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctbXVsdGktbGFiZWwtdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ011bHRpTGFiZWxUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7IH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nLWhlYWRlci10bXBdJyB9KVxuZXhwb3J0IGNsYXNzIE5nSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy1mb290ZXItdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0Zvb3RlclRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctbm90Zm91bmQtdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ05vdEZvdW5kVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy10eXBldG9zZWFyY2gtdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ1R5cGVUb1NlYXJjaFRlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctbG9hZGluZ3RleHQtdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0xvYWRpbmdUZXh0VGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZy10YWctdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ1RhZ1RlbXBsYXRlRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHsgfVxufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmctbG9hZGluZ3NwaW5uZXItdG1wXScgfSlcbmV4cG9ydCBjbGFzcyBOZ0xvYWRpbmdTcGlubmVyVGVtcGxhdGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PikgeyB9XG59XG4iXX0=