import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Pyze = /** @class */ (function () {
    function Angulartics2Pyze(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUserId(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.postTraits(x); });
    }
    Angulartics2Pyze.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Pyze.prototype.pageTrack = function (path) {
        try {
            Pyze.postPageView('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.prototype.eventTrack = function (action, properties) {
        try {
            PyzeEvents.postCustomEventWithAttributes(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.prototype.setUserId = function (userId) {
        try {
            PyzeIdentity.setUserIdentifier(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.prototype.postTraits = function (properties) {
        try {
            PyzeIdentity.postTraits(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Pyze.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Pyze_Factory() { return new Angulartics2Pyze(ɵɵinject(Angulartics2)); }, token: Angulartics2Pyze, providedIn: "root" });
    Angulartics2Pyze = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Pyze);
    return Angulartics2Pyze;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Pyze };
//# sourceMappingURL=angulartics2-pyze.js.map
