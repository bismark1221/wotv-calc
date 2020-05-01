import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Amplitude = /** @class */ (function () {
    function Angulartics2Amplitude(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Amplitude.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Amplitude.prototype.pageTrack = function (path) {
        try {
            this.eventTrack('Pageview', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Amplitude.prototype.eventTrack = function (action, properties) {
        try {
            amplitude.getInstance().logEvent(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Amplitude.prototype.setUsername = function (userId) {
        try {
            amplitude.getInstance().setUserId(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Amplitude.prototype.setUserProperties = function (properties) {
        try {
            amplitude.getInstance().setUserProperties(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Amplitude.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Amplitude.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Amplitude_Factory() { return new Angulartics2Amplitude(ɵɵinject(Angulartics2)); }, token: Angulartics2Amplitude, providedIn: "root" });
    Angulartics2Amplitude = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Amplitude);
    return Angulartics2Amplitude;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Amplitude };
//# sourceMappingURL=angulartics2-amplitude.js.map
