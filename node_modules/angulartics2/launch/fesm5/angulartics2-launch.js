import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2LaunchByAdobe = /** @class */ (function () {
    function Angulartics2LaunchByAdobe(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.payload = {};
        if ('undefined' === typeof _satellite) {
            console.warn('Launch not found!');
        }
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2LaunchByAdobe.prototype.setUsername = function (userId) {
        if ('undefined' !== typeof userId && userId) {
            this.payload.userId = userId;
        }
    };
    Angulartics2LaunchByAdobe.prototype.setUserProperties = function (properties) {
        if ('undefined' !== typeof properties && properties) {
            this.payload.properties = properties;
        }
    };
    Angulartics2LaunchByAdobe.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2LaunchByAdobe.prototype.pageTrack = function (path) {
        this.payload = this.payload || {};
        this.payload.path = path;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('pageTrack', this.payload);
        }
    };
    /**
     * @param action associated with the event
     * @param properties associated with the event
     */
    Angulartics2LaunchByAdobe.prototype.eventTrack = function (action, properties) {
        properties = properties || {};
        // add properties to payload
        this.payload.action = action;
        this.payload.eventProperties = properties;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('eventTrack', this.payload);
        }
    };
    Angulartics2LaunchByAdobe.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2LaunchByAdobe.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2LaunchByAdobe_Factory() { return new Angulartics2LaunchByAdobe(ɵɵinject(Angulartics2)); }, token: Angulartics2LaunchByAdobe, providedIn: "root" });
    Angulartics2LaunchByAdobe = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2LaunchByAdobe);
    return Angulartics2LaunchByAdobe;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2LaunchByAdobe };
//# sourceMappingURL=angulartics2-launch.js.map
