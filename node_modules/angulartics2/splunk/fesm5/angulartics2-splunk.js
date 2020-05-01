import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Splunk = /** @class */ (function () {
    function Angulartics2Splunk(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (sp) === 'undefined') {
            console.warn('Splunk not found');
        }
    }
    Angulartics2Splunk.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Splunk.prototype.pageTrack = function (path) {
        try {
            sp.pageview(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Splunk.prototype.eventTrack = function (action, properties) {
        try {
            sp.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Splunk.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Splunk.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Splunk_Factory() { return new Angulartics2Splunk(ɵɵinject(Angulartics2)); }, token: Angulartics2Splunk, providedIn: "root" });
    Angulartics2Splunk = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Splunk);
    return Angulartics2Splunk;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Splunk };
//# sourceMappingURL=angulartics2-splunk.js.map
