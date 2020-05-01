import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2Piwik = /** @class */ (function () {
    function Angulartics2Piwik(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (_paq) === 'undefined') {
            console.warn('Piwik not found');
        }
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Piwik.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Piwik.prototype.pageTrack = function (path, location) {
        try {
            if (!window.location.origin) {
                window.location.origin = window.location.protocol + '//'
                    + window.location.hostname
                    + (window.location.port ? ':' + window.location.port : '');
            }
            _paq.push(['setDocumentTitle', window.document.title]);
            _paq.push(['setCustomUrl', window.location.origin + path]);
            _paq.push(['trackPageView']);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * Track a basic event in Piwik, or send an ecommerce event.
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    Angulartics2Piwik.prototype.eventTrack = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        var params = [];
        switch (action) {
            /**
             * @description Sets the current page view as a product or category page view. When you call
             * setEcommerceView it must be followed by a call to trackPageView to record the product or
             * category page view.
             *
             * @link https://piwik.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
             * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
             *
             * @property productSKU (required) SKU: Product unique identifier
             * @property productName (optional) Product name
             * @property categoryName (optional) Product category, or array of up to 5 categories
             * @property price (optional) Product Price as displayed on the page
             */
            case 'setEcommerceView':
                params = ['setEcommerceView',
                    properties.productSKU,
                    properties.productName,
                    properties.categoryName,
                    properties.price,
                ];
                break;
            /**
             * @description Adds a product into the ecommerce order. Must be called for each product in
             * the order.
             *
             * @link https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
             * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
             *
             * @property productSKU (required) SKU: Product unique identifier
             * @property productName (optional) Product name
             * @property categoryName (optional) Product category, or array of up to 5 categories
             * @property price (recommended) Product price
             * @property quantity (optional, default to 1) Product quantity
             */
            case 'addEcommerceItem':
                params = [
                    'addEcommerceItem',
                    properties.productSKU,
                    properties.productName,
                    properties.productCategory,
                    properties.price,
                    properties.quantity,
                ];
                break;
            /**
             * @description Tracks a shopping cart. Call this javascript function every time a user is
             * adding, updating or deleting a product from the cart.
             *
             * @link https://piwik.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
             * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
             *
             * @property grandTotal (required) Cart amount
             */
            case 'trackEcommerceCartUpdate':
                params = ['trackEcommerceCartUpdate', properties.grandTotal];
                break;
            /**
             * @description Tracks an Ecommerce order, including any ecommerce item previously added to
             * the order. orderId and grandTotal (ie. revenue) are required parameters.
             *
             * @link https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
             * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
             *
             * @property orderId (required) Unique Order ID
             * @property grandTotal (required) Order Revenue grand total (includes tax, shipping, and subtracted discount)
             * @property subTotal (optional) Order sub total (excludes shipping)
             * @property tax (optional) Tax amount
             * @property shipping (optional) Shipping amount
             * @property discount (optional) Discount offered (set to false for unspecified parameter)
             */
            case 'trackEcommerceOrder':
                params = [
                    'trackEcommerceOrder',
                    properties.orderId,
                    properties.grandTotal,
                    properties.subTotal,
                    properties.tax,
                    properties.shipping,
                    properties.discount,
                ];
                break;
            /**
             * @description Tracks an Ecommerce goal
             *
             * @link https://piwik.org/docs/tracking-goals-web-analytics/
             * @link https://developer.piwik.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
             *
             * @property goalId (required) Unique Goal ID
             * @property value (optional) passed to goal tracking
             */
            case 'trackGoal':
                params = [
                    'trackGoal',
                    properties.goalId,
                    properties.value,
                ];
                break;
            /**
             * @description Tracks a site search
             *
             * @link https://piwik.org/docs/site-search/
             * @link https://developer.piwik.org/guides/tracking-javascript-guide#internal-search-tracking
             *
             * @property keyword (required) Keyword searched for
             * @property category (optional) Search category
             * @property searchCount (optional) Number of results
             */
            case 'trackSiteSearch':
                params = [
                    'trackSiteSearch',
                    properties.keyword,
                    properties.category,
                    properties.searchCount,
                ];
                break;
            /**
             * @description Logs an event with an event category (Videos, Music, Games...), an event
             * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
             * event name and optional numeric value.
             *
             * @link https://piwik.org/docs/event-tracking/
             * @link https://developer.piwik.org/api-reference/tracking-javascript#using-the-tracker-object
             *
             * @property category
             * @property action
             * @property name (optional, recommended)
             * @property value (optional)
             */
            default:
                // PAQ requires that eventValue be an integer, see: http://piwik.org/docs/event-tracking
                if (properties.value) {
                    var parsed = parseInt(properties.value, 10);
                    properties.value = isNaN(parsed) ? 0 : parsed;
                }
                params = [
                    'trackEvent',
                    properties.category,
                    action,
                    properties.name || properties.label,
                    properties.value,
                ];
        }
        try {
            _paq.push(params);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setUsername = function (userId) {
        try {
            _paq.push(['setUserId', userId]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * Sets custom dimensions if at least one property has the key "dimension<n>",
     * e.g. dimension10. If there are custom dimensions, any other property is ignored.
     *
     * If there are no custom dimensions in the given properties object, the properties
     * object is saved as a custom variable.
     *
     * If in doubt, prefer custom dimensions.
     * @link https://piwik.org/docs/custom-variables/
     */
    Angulartics2Piwik.prototype.setUserProperties = function (properties) {
        var dimensions = this.setCustomDimensions(properties);
        try {
            if (dimensions.length === 0) {
                _paq.push(['setCustomVariable', properties.index, properties.name, properties.value, properties.scope]);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setCustomDimensions = function (properties) {
        var dimensionRegex = /dimension[1-9]\d*/;
        var dimensions = Object.keys(properties)
            .filter(function (key) { return dimensionRegex.exec(key); });
        dimensions.forEach(function (dimension) {
            var number = Number(dimension.substr(9));
            _paq.push(['setCustomDimension', number, properties[dimension]]);
        });
        return dimensions;
    };
    Angulartics2Piwik.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Piwik.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Piwik_Factory() { return new Angulartics2Piwik(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Piwik, providedIn: "root" });
    Angulartics2Piwik = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Piwik);
    return Angulartics2Piwik;
}());
export { Angulartics2Piwik };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl3aWsuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvcGl3aWsvIiwic291cmNlcyI6WyJwaXdpay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLNUM7SUFFRSwyQkFBb0IsWUFBMEI7UUFBOUMsaUJBUUM7UUFSbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVzthQUMxQixTQUFTLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7YUFDaEMsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENB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N0I7NEJBL1BEO0NBK1BDLEFBeFBELElBd1BDO1NBeFBZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSB2YXIgX3BhcTogYW55O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMlBpd2lrIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgaWYgKHR5cGVvZiAoX3BhcSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1Bpd2lrIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcsIGxvY2F0aW9uPzogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLm9yaWdpbikge1xuICAgICAgICAod2luZG93LmxvY2F0aW9uIGFzIGFueSkub3JpZ2luID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJ1xuICAgICAgICAgICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICAgICAgKyAod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCA6ICcnKTtcbiAgICAgIH1cbiAgICAgIF9wYXEucHVzaChbJ3NldERvY3VtZW50VGl0bGUnLCB3aW5kb3cuZG9jdW1lbnQudGl0bGVdKTtcbiAgICAgIF9wYXEucHVzaChbJ3NldEN1c3RvbVVybCcsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBwYXRoXSk7XG4gICAgICBfcGFxLnB1c2goWyd0cmFja1BhZ2VWaWV3J10pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhY2sgYSBiYXNpYyBldmVudCBpbiBQaXdpaywgb3Igc2VuZCBhbiBlY29tbWVyY2UgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gQSBzdHJpbmcgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZSBvZiBldmVudCB0aGF0IG5lZWRzIHRvIGJlIHRyYWNrZWQuXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRoYXQgbmVlZCB0byBiZSBsb2dnZWQgd2l0aCB0aGUgZXZlbnQuXG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkgPSB7fSkge1xuICAgIGxldCBwYXJhbXMgPSBbXTtcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgY3VycmVudCBwYWdlIHZpZXcgYXMgYSBwcm9kdWN0IG9yIGNhdGVnb3J5IHBhZ2Ugdmlldy4gV2hlbiB5b3UgY2FsbFxuICAgICAgICogc2V0RWNvbW1lcmNlVmlldyBpdCBtdXN0IGJlIGZvbGxvd2VkIGJ5IGEgY2FsbCB0byB0cmFja1BhZ2VWaWV3IHRvIHJlY29yZCB0aGUgcHJvZHVjdCBvclxuICAgICAgICogY2F0ZWdvcnkgcGFnZSB2aWV3LlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vcGl3aWsub3JnL2RvY3MvZWNvbW1lcmNlLWFuYWx5dGljcy8jdHJhY2tpbmctcHJvZHVjdC1wYWdlLXZpZXdzLWNhdGVnb3J5LXBhZ2Utdmlld3Mtb3B0aW9uYWxcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3RTS1UgKHJlcXVpcmVkKSBTS1U6IFByb2R1Y3QgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgICAqIEBwcm9wZXJ0eSBwcm9kdWN0TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgbmFtZVxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgY2F0ZWdvcnksIG9yIGFycmF5IG9mIHVwIHRvIDUgY2F0ZWdvcmllc1xuICAgICAgICogQHByb3BlcnR5IHByaWNlIChvcHRpb25hbCkgUHJvZHVjdCBQcmljZSBhcyBkaXNwbGF5ZWQgb24gdGhlIHBhZ2VcbiAgICAgICAqL1xuICAgICAgY2FzZSAnc2V0RWNvbW1lcmNlVmlldyc6XG4gICAgICAgIHBhcmFtcyA9IFsnc2V0RWNvbW1lcmNlVmlldycsXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0U0tVLFxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdE5hbWUsXG4gICAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeU5hbWUsXG4gICAgICAgICAgcHJvcGVydGllcy5wcmljZSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBwcm9kdWN0IGludG8gdGhlIGVjb21tZXJjZSBvcmRlci4gTXVzdCBiZSBjYWxsZWQgZm9yIGVhY2ggcHJvZHVjdCBpblxuICAgICAgICogdGhlIG9yZGVyLlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vcGl3aWsub3JnL2RvY3MvZWNvbW1lcmNlLWFuYWx5dGljcy8jdHJhY2tpbmctZWNvbW1lcmNlLW9yZGVycy1pdGVtcy1wdXJjaGFzZWQtcmVxdWlyZWRcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3RTS1UgKHJlcXVpcmVkKSBTS1U6IFByb2R1Y3QgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgICAqIEBwcm9wZXJ0eSBwcm9kdWN0TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgbmFtZVxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgY2F0ZWdvcnksIG9yIGFycmF5IG9mIHVwIHRvIDUgY2F0ZWdvcmllc1xuICAgICAgICogQHByb3BlcnR5IHByaWNlIChyZWNvbW1lbmRlZCkgUHJvZHVjdCBwcmljZVxuICAgICAgICogQHByb3BlcnR5IHF1YW50aXR5IChvcHRpb25hbCwgZGVmYXVsdCB0byAxKSBQcm9kdWN0IHF1YW50aXR5XG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ2FkZEVjb21tZXJjZUl0ZW0nOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ2FkZEVjb21tZXJjZUl0ZW0nLFxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdFNLVSxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3ROYW1lLFxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdENhdGVnb3J5LFxuICAgICAgICAgIHByb3BlcnRpZXMucHJpY2UsXG4gICAgICAgICAgcHJvcGVydGllcy5xdWFudGl0eSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhIHNob3BwaW5nIGNhcnQuIENhbGwgdGhpcyBqYXZhc2NyaXB0IGZ1bmN0aW9uIGV2ZXJ5IHRpbWUgYSB1c2VyIGlzXG4gICAgICAgKiBhZGRpbmcsIHVwZGF0aW5nIG9yIGRlbGV0aW5nIGEgcHJvZHVjdCBmcm9tIHRoZSBjYXJ0LlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vcGl3aWsub3JnL2RvY3MvZWNvbW1lcmNlLWFuYWx5dGljcy8jdHJhY2tpbmctYWRkLXRvLWNhcnQtaXRlbXMtYWRkZWQtdG8tdGhlLWNhcnQtb3B0aW9uYWxcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGdyYW5kVG90YWwgKHJlcXVpcmVkKSBDYXJ0IGFtb3VudFxuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja0Vjb21tZXJjZUNhcnRVcGRhdGUnOlxuICAgICAgICBwYXJhbXMgPSBbJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZScsIHByb3BlcnRpZXMuZ3JhbmRUb3RhbF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUcmFja3MgYW4gRWNvbW1lcmNlIG9yZGVyLCBpbmNsdWRpbmcgYW55IGVjb21tZXJjZSBpdGVtIHByZXZpb3VzbHkgYWRkZWQgdG9cbiAgICAgICAqIHRoZSBvcmRlci4gb3JkZXJJZCBhbmQgZ3JhbmRUb3RhbCAoaWUuIHJldmVudWUpIGFyZSByZXF1aXJlZCBwYXJhbWV0ZXJzLlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vcGl3aWsub3JnL2RvY3MvZWNvbW1lcmNlLWFuYWx5dGljcy8jdHJhY2tpbmctZWNvbW1lcmNlLW9yZGVycy1pdGVtcy1wdXJjaGFzZWQtcmVxdWlyZWRcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IG9yZGVySWQgKHJlcXVpcmVkKSBVbmlxdWUgT3JkZXIgSURcbiAgICAgICAqIEBwcm9wZXJ0eSBncmFuZFRvdGFsIChyZXF1aXJlZCkgT3JkZXIgUmV2ZW51ZSBncmFuZCB0b3RhbCAoaW5jbHVkZXMgdGF4LCBzaGlwcGluZywgYW5kIHN1YnRyYWN0ZWQgZGlzY291bnQpXG4gICAgICAgKiBAcHJvcGVydHkgc3ViVG90YWwgKG9wdGlvbmFsKSBPcmRlciBzdWIgdG90YWwgKGV4Y2x1ZGVzIHNoaXBwaW5nKVxuICAgICAgICogQHByb3BlcnR5IHRheCAob3B0aW9uYWwpIFRheCBhbW91bnRcbiAgICAgICAqIEBwcm9wZXJ0eSBzaGlwcGluZyAob3B0aW9uYWwpIFNoaXBwaW5nIGFtb3VudFxuICAgICAgICogQHByb3BlcnR5IGRpc2NvdW50IChvcHRpb25hbCkgRGlzY291bnQgb2ZmZXJlZCAoc2V0IHRvIGZhbHNlIGZvciB1bnNwZWNpZmllZCBwYXJhbWV0ZXIpXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrRWNvbW1lcmNlT3JkZXInOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrRWNvbW1lcmNlT3JkZXInLFxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJJZCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmdyYW5kVG90YWwsXG4gICAgICAgICAgcHJvcGVydGllcy5zdWJUb3RhbCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnRheCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnNoaXBwaW5nLFxuICAgICAgICAgIHByb3BlcnRpZXMuZGlzY291bnQsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUcmFja3MgYW4gRWNvbW1lcmNlIGdvYWxcbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL3Bpd2lrLm9yZy9kb2NzL3RyYWNraW5nLWdvYWxzLXdlYi1hbmFseXRpY3MvXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5waXdpay5vcmcvZ3VpZGVzL3RyYWNraW5nLWphdmFzY3JpcHQtZ3VpZGUjbWFudWFsbHktdHJpZ2dlci1nb2FsLWNvbnZlcnNpb25zXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGdvYWxJZCAocmVxdWlyZWQpIFVuaXF1ZSBHb2FsIElEXG4gICAgICAgKiBAcHJvcGVydHkgdmFsdWUgKG9wdGlvbmFsKSBwYXNzZWQgdG8gZ29hbCB0cmFja2luZ1xuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja0dvYWwnOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrR29hbCcsXG4gICAgICAgICAgcHJvcGVydGllcy5nb2FsSWQsXG4gICAgICAgICAgcHJvcGVydGllcy52YWx1ZSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhIHNpdGUgc2VhcmNoXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9zaXRlLXNlYXJjaC9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSNpbnRlcm5hbC1zZWFyY2gtdHJhY2tpbmdcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkga2V5d29yZCAocmVxdWlyZWQpIEtleXdvcmQgc2VhcmNoZWQgZm9yXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnkgKG9wdGlvbmFsKSBTZWFyY2ggY2F0ZWdvcnlcbiAgICAgICAqIEBwcm9wZXJ0eSBzZWFyY2hDb3VudCAob3B0aW9uYWwpIE51bWJlciBvZiByZXN1bHRzXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrU2l0ZVNlYXJjaCc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tTaXRlU2VhcmNoJyxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmtleXdvcmQsXG4gICAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnNlYXJjaENvdW50LFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gTG9ncyBhbiBldmVudCB3aXRoIGFuIGV2ZW50IGNhdGVnb3J5IChWaWRlb3MsIE11c2ljLCBHYW1lcy4uLiksIGFuIGV2ZW50XG4gICAgICAgKiBhY3Rpb24gKFBsYXksIFBhdXNlLCBEdXJhdGlvbiwgQWRkIFBsYXlsaXN0LCBEb3dubG9hZGVkLCBDbGlja2VkLi4uKSwgYW5kIGFuIG9wdGlvbmFsXG4gICAgICAgKiBldmVudCBuYW1lIGFuZCBvcHRpb25hbCBudW1lcmljIHZhbHVlLlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vcGl3aWsub3JnL2RvY3MvZXZlbnQtdHJhY2tpbmcvXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5waXdpay5vcmcvYXBpLXJlZmVyZW5jZS90cmFja2luZy1qYXZhc2NyaXB0I3VzaW5nLXRoZS10cmFja2VyLW9iamVjdFxuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBjYXRlZ29yeVxuICAgICAgICogQHByb3BlcnR5IGFjdGlvblxuICAgICAgICogQHByb3BlcnR5IG5hbWUgKG9wdGlvbmFsLCByZWNvbW1lbmRlZClcbiAgICAgICAqIEBwcm9wZXJ0eSB2YWx1ZSAob3B0aW9uYWwpXG4gICAgICAgKi9cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFBBUSByZXF1aXJlcyB0aGF0IGV2ZW50VmFsdWUgYmUgYW4gaW50ZWdlciwgc2VlOiBodHRwOi8vcGl3aWsub3JnL2RvY3MvZXZlbnQtdHJhY2tpbmdcbiAgICAgICAgaWYgKHByb3BlcnRpZXMudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChwcm9wZXJ0aWVzLnZhbHVlLCAxMCk7XG4gICAgICAgICAgcHJvcGVydGllcy52YWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyAwIDogcGFyc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja0V2ZW50JyxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxuICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICBwcm9wZXJ0aWVzLm5hbWUgfHwgcHJvcGVydGllcy5sYWJlbCwgLy8gQ2hhbmdlZCBpbiBmYXZvdXIgb2YgUGl3aWsgZG9jdW1lbnRhdGlvbi4gQWRkZWQgZmFsbGJhY2sgc28gaXQncyBiYWNrd2FyZHMgY29tcGF0aWJsZS5cbiAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgICBdO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgX3BhcS5wdXNoKHBhcmFtcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nIHwgYm9vbGVhbikge1xuICAgIHRyeSB7XG4gICAgICBfcGFxLnB1c2goWydzZXRVc2VySWQnLCB1c2VySWRdKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgY3VzdG9tIGRpbWVuc2lvbnMgaWYgYXQgbGVhc3Qgb25lIHByb3BlcnR5IGhhcyB0aGUga2V5IFwiZGltZW5zaW9uPG4+XCIsXG4gICAqIGUuZy4gZGltZW5zaW9uMTAuIElmIHRoZXJlIGFyZSBjdXN0b20gZGltZW5zaW9ucywgYW55IG90aGVyIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIElmIHRoZXJlIGFyZSBubyBjdXN0b20gZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gcHJvcGVydGllcyBvYmplY3QsIHRoZSBwcm9wZXJ0aWVzXG4gICAqIG9iamVjdCBpcyBzYXZlZCBhcyBhIGN1c3RvbSB2YXJpYWJsZS5cbiAgICpcbiAgICogSWYgaW4gZG91YnQsIHByZWZlciBjdXN0b20gZGltZW5zaW9ucy5cbiAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9jdXN0b20tdmFyaWFibGVzL1xuICAgKi9cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzKTtcbiAgICB0cnkge1xuICAgICAgaWYgKGRpbWVuc2lvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIF9wYXEucHVzaChbJ3NldEN1c3RvbVZhcmlhYmxlJywgcHJvcGVydGllcy5pbmRleCwgcHJvcGVydGllcy5uYW1lLCBwcm9wZXJ0aWVzLnZhbHVlLCBwcm9wZXJ0aWVzLnNjb3BlXSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZGltZW5zaW9uUmVnZXg6IFJlZ0V4cCA9IC9kaW1lbnNpb25bMS05XVxcZCovO1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKVxuICAgICAgLmZpbHRlcihrZXkgPT4gZGltZW5zaW9uUmVnZXguZXhlYyhrZXkpKTtcbiAgICBkaW1lbnNpb25zLmZvckVhY2goZGltZW5zaW9uID0+IHtcbiAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcihkaW1lbnNpb24uc3Vic3RyKDkpKTtcbiAgICAgIF9wYXEucHVzaChbJ3NldEN1c3RvbURpbWVuc2lvbicsIG51bWJlciwgcHJvcGVydGllc1tkaW1lbnNpb25dXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRpbWVuc2lvbnM7XG4gIH1cbn1cbiJdfQ==