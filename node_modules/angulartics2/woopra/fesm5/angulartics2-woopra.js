import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Woopra = /** @class */ (function () {
    function Angulartics2Woopra(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (woopra) === 'undefined') {
            console.warn('Woopra not found');
        }
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Woopra.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Woopra.prototype.pageTrack = function (path) {
        try {
            woopra.track('pv', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.prototype.eventTrack = function (action, properties) {
        try {
            woopra.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.prototype.setUserProperties = function (properties) {
        try {
            if (properties.email) {
                woopra.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Woopra.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Woopra_Factory() { return new Angulartics2Woopra(ɵɵinject(Angulartics2)); }, token: Angulartics2Woopra, providedIn: "root" });
    Angulartics2Woopra = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Woopra);
    return Angulartics2Woopra;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Woopra };
//# sourceMappingURL=angulartics2-woopra.js.map
