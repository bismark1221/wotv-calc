import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Kissmetrics = /** @class */ (function () {
    function Angulartics2Kissmetrics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (_kmq) === 'undefined') {
            _kmq = [];
        }
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Kissmetrics.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Kissmetrics.prototype.pageTrack = function (path) {
        _kmq.push(['record', 'Pageview', { Page: path }]);
    };
    Angulartics2Kissmetrics.prototype.eventTrack = function (action, properties) {
        _kmq.push(['record', action, properties]);
    };
    Angulartics2Kissmetrics.prototype.setUsername = function (userId) {
        _kmq.push(['identify', userId]);
    };
    Angulartics2Kissmetrics.prototype.setUserProperties = function (properties) {
        _kmq.push(['set', properties]);
    };
    Angulartics2Kissmetrics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Kissmetrics.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Kissmetrics_Factory() { return new Angulartics2Kissmetrics(ɵɵinject(Angulartics2)); }, token: Angulartics2Kissmetrics, providedIn: "root" });
    Angulartics2Kissmetrics = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Kissmetrics);
    return Angulartics2Kissmetrics;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Kissmetrics };
//# sourceMappingURL=angulartics2-kissmetrics.js.map
