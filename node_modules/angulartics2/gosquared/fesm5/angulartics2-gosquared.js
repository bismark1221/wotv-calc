import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2GoSquared = /** @class */ (function () {
    function Angulartics2GoSquared(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(function (x) {
            return _this.setUserProperties(x);
        });
        this.angulartics2.setUserPropertiesOnce.subscribe(function (x) {
            return _this.setUserProperties(x);
        });
    }
    Angulartics2GoSquared.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2GoSquared.prototype.pageTrack = function (path) {
        try {
            _gs('track', path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2GoSquared.prototype.eventTrack = function (action, properties) {
        try {
            _gs('event', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2GoSquared.prototype.setUserProperties = function (properties) {
        try {
            _gs('identify', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2GoSquared.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2GoSquared.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoSquared_Factory() { return new Angulartics2GoSquared(ɵɵinject(Angulartics2)); }, token: Angulartics2GoSquared, providedIn: "root" });
    Angulartics2GoSquared = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoSquared);
    return Angulartics2GoSquared;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoSquared };
//# sourceMappingURL=angulartics2-gosquared.js.map
