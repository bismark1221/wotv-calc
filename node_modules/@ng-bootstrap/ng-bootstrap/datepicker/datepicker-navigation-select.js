import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgbDate } from './ngb-date';
import { toInteger } from '../util/util';
import { NgbDatepickerI18n } from './datepicker-i18n';
var NgbDatepickerNavigationSelect = (function () {
    function NgbDatepickerNavigationSelect(i18n) {
        this.i18n = i18n;
        this.select = new EventEmitter();
    }
    NgbDatepickerNavigationSelect.prototype.changeMonth = function (month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); };
    NgbDatepickerNavigationSelect.prototype.changeYear = function (year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); };
    NgbDatepickerNavigationSelect.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-datepicker-navigation-select',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    :host>select {\n      /* to align with btn-sm */\n      padding: 0.25rem 0.5rem;\n      font-size: 0.875rem;\n      line-height: 1.25;\n      /* to cancel the custom height set by custom-select */\n      height: inherit;\n      width: 50%;\n      display: inline-block;\n    }\n  "],
                    template: "\n    <select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.month\"\n      (change)=\"changeMonth($event.target.value)\"\n      tabindex=\"-1\">\n        <option *ngFor=\"let m of months\" [value]=\"m\">{{ i18n.getMonthShortName(m) }}</option>\n    </select><select\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      [value]=\"date?.year\"\n      (change)=\"changeYear($event.target.value)\"\n      tabindex=\"-1\">\n        <option *ngFor=\"let y of years\" [value]=\"y\">{{ y }}</option>\n    </select>\n  "
                },] },
    ];
    /** @nocollapse */
    NgbDatepickerNavigationSelect.ctorParameters = function () { return [
        { type: NgbDatepickerI18n, },
    ]; };
    NgbDatepickerNavigationSelect.propDecorators = {
        "date": [{ type: Input },],
        "disabled": [{ type: Input },],
        "months": [{ type: Input },],
        "years": [{ type: Input },],
        "select": [{ type: Output },],
    };
    return NgbDatepickerNavigationSelect;
}());
export { NgbDatepickerNavigationSelect };
//# sourceMappingURL=datepicker-navigation-select.js.map