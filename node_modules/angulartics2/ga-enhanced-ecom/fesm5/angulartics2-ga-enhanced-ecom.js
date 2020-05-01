import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, Injectable } from '@angular/core';

var Angulartics2GoogleAnalyticsEnhancedEcommerce = /** @class */ (function () {
    function Angulartics2GoogleAnalyticsEnhancedEcommerce() {
    }
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddImpression = function (properties) {
        ga('ec:addImpression', properties);
    };
    /**
     * Add product in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddProduct = function (product) {
        ga('ec:addProduct', product);
    };
    /**
     * Set action in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecSetAction = function (action, properties) {
        ga('ec:setAction', action, properties);
    };
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalyticsEnhancedEcommerce_Factory() { return new Angulartics2GoogleAnalyticsEnhancedEcommerce(); }, token: Angulartics2GoogleAnalyticsEnhancedEcommerce, providedIn: "root" });
    Angulartics2GoogleAnalyticsEnhancedEcommerce = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoogleAnalyticsEnhancedEcommerce);
    return Angulartics2GoogleAnalyticsEnhancedEcommerce;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoogleAnalyticsEnhancedEcommerce };
//# sourceMappingURL=angulartics2-ga-enhanced-ecom.js.map
