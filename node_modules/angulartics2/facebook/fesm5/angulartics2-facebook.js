import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var facebookEventList = [
    'ViewContent',
    'Search',
    'AddToCart',
    'AddToWishlist',
    'InitiateCheckout',
    'AddPaymentInfo',
    'Purchase',
    'Lead',
    'CompleteRegistration',
];
var Angulartics2Facebook = /** @class */ (function () {
    function Angulartics2Facebook(angulartics2) {
        this.angulartics2 = angulartics2;
    }
    Angulartics2Facebook.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action action associated with the event
     */
    Angulartics2Facebook.prototype.eventTrack = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        if (typeof fbq === 'undefined') {
            return;
        }
        if (facebookEventList.indexOf(action) === -1) {
            return fbq('trackCustom', action, properties);
        }
        return fbq('track', action, properties);
    };
    Angulartics2Facebook.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Facebook.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Facebook_Factory() { return new Angulartics2Facebook(ɵɵinject(Angulartics2)); }, token: Angulartics2Facebook, providedIn: "root" });
    Angulartics2Facebook = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Facebook);
    return Angulartics2Facebook;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Facebook };
//# sourceMappingURL=angulartics2-facebook.js.map
