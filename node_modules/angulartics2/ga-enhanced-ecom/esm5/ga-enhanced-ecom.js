import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalyticsEnhancedEcommerce_Factory() { return new Angulartics2GoogleAnalyticsEnhancedEcommerce(); }, token: Angulartics2GoogleAnalyticsEnhancedEcommerce, providedIn: "root" });
    Angulartics2GoogleAnalyticsEnhancedEcommerce = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoogleAnalyticsEnhancedEcommerce);
    return Angulartics2GoogleAnalyticsEnhancedEcommerce;
}());
export { Angulartics2GoogleAnalyticsEnhancedEcommerce };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2EtZW5oYW5jZWQtZWNvbS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ0aWNzMi9nYS1lbmhhbmNlZC1lY29tLyIsInNvdXJjZXMiOlsiZ2EtZW5oYW5jZWQtZWNvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFXM0M7SUFBQTtLQTJCQztJQTFCQzs7O09BR0c7SUFDSCxzRUFBZSxHQUFmLFVBQWdCLFVBQXdEO1FBQ3RFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsbUVBQVksR0FBWixVQUFhLE9BQWtEO1FBQzdELEVBQUUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtFQUFXLEdBQVgsVUFDRSxNQUE0QixFQUM1QixVQUFvRDtRQUVwRCxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDOztJQTFCVSw0Q0FBNEM7UUFEeEQsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLDRDQUE0QyxDQTJCeEQ7dURBdENEO0NBc0NDLEFBM0JELElBMkJDO1NBM0JZLDRDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEdhRW5oYW5jZWRFY29tQWN0aW9uLFxuICBHYUVuaGFuY2VkRWNvbUFjdGlvbkZpZWxkT2JqZWN0LFxuICBHYUVuaGFuY2VkRWNvbUltcHJlc3Npb25GaWVsZE9iamVjdCxcbiAgR2FFbmhhbmNlZEVjb21Qcm9kdWN0RmllbGRPYmplY3QsXG59IGZyb20gJy4vZ2EtZW5oYW5jZWQtZWNvbS1vcHRpb25zJztcblxuZGVjbGFyZSB2YXIgZ2E6IFVuaXZlcnNhbEFuYWx5dGljcy5nYTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJHb29nbGVBbmFseXRpY3NFbmhhbmNlZEVjb21tZXJjZSB7XG4gIC8qKlxuICAgKiBBZGQgaW1wcmVzc2lvbiBpbiBHQSBlbmhhbmNlZCBlY29tbWVyY2UgdHJhY2tpbmdcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNtZWFzdXJpbmctYWN0aXZpdGllc1xuICAgKi9cbiAgZWNBZGRJbXByZXNzaW9uKHByb3BlcnRpZXM6IFBhcnRpYWw8R2FFbmhhbmNlZEVjb21JbXByZXNzaW9uRmllbGRPYmplY3Q+KSB7XG4gICAgZ2EoJ2VjOmFkZEltcHJlc3Npb24nLCBwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgcHJvZHVjdCBpbiBHQSBlbmhhbmNlZCBlY29tbWVyY2UgdHJhY2tpbmdcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2Vjb21tZXJjZVxuICAgKi9cbiAgZWNBZGRQcm9kdWN0KHByb2R1Y3Q6IFBhcnRpYWw8R2FFbmhhbmNlZEVjb21Qcm9kdWN0RmllbGRPYmplY3Q+KSB7XG4gICAgZ2EoJ2VjOmFkZFByb2R1Y3QnLCBwcm9kdWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYWN0aW9uIGluIEdBIGVuaGFuY2VkIGVjb21tZXJjZSB0cmFja2luZ1xuICAgKiBAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZWNvbW1lcmNlXG4gICAqL1xuICBlY1NldEFjdGlvbihcbiAgICBhY3Rpb246IEdhRW5oYW5jZWRFY29tQWN0aW9uLFxuICAgIHByb3BlcnRpZXM6IFBhcnRpYWw8R2FFbmhhbmNlZEVjb21BY3Rpb25GaWVsZE9iamVjdD4sXG4gICkge1xuICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xuICB9XG59XG4iXX0=