import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
let Angulartics2Piwik = class Angulartics2Piwik {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (_paq) === 'undefined') {
            console.warn('Piwik not found');
        }
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path, location) {
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
    }
    /**
     * Track a basic event in Piwik, or send an ecommerce event.
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action, properties = {}) {
        let params = [];
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
                    const parsed = parseInt(properties.value, 10);
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
    }
    setUsername(userId) {
        try {
            _paq.push(['setUserId', userId]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
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
    setUserProperties(properties) {
        const dimensions = this.setCustomDimensions(properties);
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
    }
    setCustomDimensions(properties) {
        const dimensionRegex = /dimension[1-9]\d*/;
        const dimensions = Object.keys(properties)
            .filter(key => dimensionRegex.exec(key));
        dimensions.forEach(dimension => {
            const number = Number(dimension.substr(9));
            _paq.push(['setCustomDimension', number, properties[dimension]]);
        });
        return dimensions;
    }
};
Angulartics2Piwik.ctorParameters = () => [
    { type: Angulartics2 }
];
Angulartics2Piwik.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Piwik_Factory() { return new Angulartics2Piwik(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Piwik, providedIn: "root" });
Angulartics2Piwik = __decorate([
    Injectable({ providedIn: 'root' })
], Angulartics2Piwik);
export { Angulartics2Piwik };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl3aWsuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvcGl3aWsvIiwic291cmNlcyI6WyJwaXdpay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLNUMsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFNUIsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVzthQUMxQixTQUFTLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQjthQUNoQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxD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cmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIHZhciBfcGFxOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyUGl3aWsge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBpZiAodHlwZW9mIChfcGFxKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybignUGl3aWsgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lXG4gICAgICAuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgbG9jYXRpb24/OiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG4gICAgICAgICh3aW5kb3cubG9jYXRpb24gYXMgYW55KS5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nXG4gICAgICAgICAgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgICAgICArICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuICAgICAgfVxuICAgICAgX3BhcS5wdXNoKFsnc2V0RG9jdW1lbnRUaXRsZScsIHdpbmRvdy5kb2N1bWVudC50aXRsZV0pO1xuICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tVXJsJywgd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHBhdGhdKTtcbiAgICAgIF9wYXEucHVzaChbJ3RyYWNrUGFnZVZpZXcnXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBhIGJhc2ljIGV2ZW50IGluIFBpd2lrLCBvciBzZW5kIGFuIGVjb21tZXJjZSBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBBIHN0cmluZyBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlIG9mIGV2ZW50IHRoYXQgbmVlZHMgdG8gYmUgdHJhY2tlZC5cbiAgICogQHBhcmFtIHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdGhhdCBuZWVkIHRvIGJlIGxvZ2dlZCB3aXRoIHRoZSBldmVudC5cbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSA9IHt9KSB7XG4gICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UgdmlldyBhcyBhIHByb2R1Y3Qgb3IgY2F0ZWdvcnkgcGFnZSB2aWV3LiBXaGVuIHlvdSBjYWxsXG4gICAgICAgKiBzZXRFY29tbWVyY2VWaWV3IGl0IG11c3QgYmUgZm9sbG93ZWQgYnkgYSBjYWxsIHRvIHRyYWNrUGFnZVZpZXcgdG8gcmVjb3JkIHRoZSBwcm9kdWN0IG9yXG4gICAgICAgKiBjYXRlZ29yeSBwYWdlIHZpZXcuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1wcm9kdWN0LXBhZ2Utdmlld3MtY2F0ZWdvcnktcGFnZS12aWV3cy1vcHRpb25hbFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIucGl3aWsub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdFNLVSAocmVxdWlyZWQpIFNLVTogUHJvZHVjdCB1bmlxdWUgaWRlbnRpZmllclxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3ROYW1lIChvcHRpb25hbCkgUHJvZHVjdCBuYW1lXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnlOYW1lIChvcHRpb25hbCkgUHJvZHVjdCBjYXRlZ29yeSwgb3IgYXJyYXkgb2YgdXAgdG8gNSBjYXRlZ29yaWVzXG4gICAgICAgKiBAcHJvcGVydHkgcHJpY2UgKG9wdGlvbmFsKSBQcm9kdWN0IFByaWNlIGFzIGRpc3BsYXllZCBvbiB0aGUgcGFnZVxuICAgICAgICovXG4gICAgICBjYXNlICdzZXRFY29tbWVyY2VWaWV3JzpcbiAgICAgICAgcGFyYW1zID0gWydzZXRFY29tbWVyY2VWaWV3JyxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3RTS1UsXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0TmFtZSxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5TmFtZSxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByaWNlLFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gQWRkcyBhIHByb2R1Y3QgaW50byB0aGUgZWNvbW1lcmNlIG9yZGVyLiBNdXN0IGJlIGNhbGxlZCBmb3IgZWFjaCBwcm9kdWN0IGluXG4gICAgICAgKiB0aGUgb3JkZXIuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1lY29tbWVyY2Utb3JkZXJzLWl0ZW1zLXB1cmNoYXNlZC1yZXF1aXJlZFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIucGl3aWsub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdFNLVSAocmVxdWlyZWQpIFNLVTogUHJvZHVjdCB1bmlxdWUgaWRlbnRpZmllclxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3ROYW1lIChvcHRpb25hbCkgUHJvZHVjdCBuYW1lXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnlOYW1lIChvcHRpb25hbCkgUHJvZHVjdCBjYXRlZ29yeSwgb3IgYXJyYXkgb2YgdXAgdG8gNSBjYXRlZ29yaWVzXG4gICAgICAgKiBAcHJvcGVydHkgcHJpY2UgKHJlY29tbWVuZGVkKSBQcm9kdWN0IHByaWNlXG4gICAgICAgKiBAcHJvcGVydHkgcXVhbnRpdHkgKG9wdGlvbmFsLCBkZWZhdWx0IHRvIDEpIFByb2R1Y3QgcXVhbnRpdHlcbiAgICAgICAqL1xuICAgICAgY2FzZSAnYWRkRWNvbW1lcmNlSXRlbSc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAnYWRkRWNvbW1lcmNlSXRlbScsXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0U0tVLFxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdE5hbWUsXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0Q2F0ZWdvcnksXG4gICAgICAgICAgcHJvcGVydGllcy5wcmljZSxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnF1YW50aXR5LFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVHJhY2tzIGEgc2hvcHBpbmcgY2FydC4gQ2FsbCB0aGlzIGphdmFzY3JpcHQgZnVuY3Rpb24gZXZlcnkgdGltZSBhIHVzZXIgaXNcbiAgICAgICAqIGFkZGluZywgdXBkYXRpbmcgb3IgZGVsZXRpbmcgYSBwcm9kdWN0IGZyb20gdGhlIGNhcnQuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1hZGQtdG8tY2FydC1pdGVtcy1hZGRlZC10by10aGUtY2FydC1vcHRpb25hbFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIucGl3aWsub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgZ3JhbmRUb3RhbCAocmVxdWlyZWQpIENhcnQgYW1vdW50XG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZSc6XG4gICAgICAgIHBhcmFtcyA9IFsndHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlJywgcHJvcGVydGllcy5ncmFuZFRvdGFsXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhbiBFY29tbWVyY2Ugb3JkZXIsIGluY2x1ZGluZyBhbnkgZWNvbW1lcmNlIGl0ZW0gcHJldmlvdXNseSBhZGRlZCB0b1xuICAgICAgICogdGhlIG9yZGVyLiBvcmRlcklkIGFuZCBncmFuZFRvdGFsIChpZS4gcmV2ZW51ZSkgYXJlIHJlcXVpcmVkIHBhcmFtZXRlcnMuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1lY29tbWVyY2Utb3JkZXJzLWl0ZW1zLXB1cmNoYXNlZC1yZXF1aXJlZFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIucGl3aWsub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgb3JkZXJJZCAocmVxdWlyZWQpIFVuaXF1ZSBPcmRlciBJRFxuICAgICAgICogQHByb3BlcnR5IGdyYW5kVG90YWwgKHJlcXVpcmVkKSBPcmRlciBSZXZlbnVlIGdyYW5kIHRvdGFsIChpbmNsdWRlcyB0YXgsIHNoaXBwaW5nLCBhbmQgc3VidHJhY3RlZCBkaXNjb3VudClcbiAgICAgICAqIEBwcm9wZXJ0eSBzdWJUb3RhbCAob3B0aW9uYWwpIE9yZGVyIHN1YiB0b3RhbCAoZXhjbHVkZXMgc2hpcHBpbmcpXG4gICAgICAgKiBAcHJvcGVydHkgdGF4IChvcHRpb25hbCkgVGF4IGFtb3VudFxuICAgICAgICogQHByb3BlcnR5IHNoaXBwaW5nIChvcHRpb25hbCkgU2hpcHBpbmcgYW1vdW50XG4gICAgICAgKiBAcHJvcGVydHkgZGlzY291bnQgKG9wdGlvbmFsKSBEaXNjb3VudCBvZmZlcmVkIChzZXQgdG8gZmFsc2UgZm9yIHVuc3BlY2lmaWVkIHBhcmFtZXRlcilcbiAgICAgICAqL1xuICAgICAgY2FzZSAndHJhY2tFY29tbWVyY2VPcmRlcic6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tFY29tbWVyY2VPcmRlcicsXG4gICAgICAgICAgcHJvcGVydGllcy5vcmRlcklkLFxuICAgICAgICAgIHByb3BlcnRpZXMuZ3JhbmRUb3RhbCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnN1YlRvdGFsLFxuICAgICAgICAgIHByb3BlcnRpZXMudGF4LFxuICAgICAgICAgIHByb3BlcnRpZXMuc2hpcHBpbmcsXG4gICAgICAgICAgcHJvcGVydGllcy5kaXNjb3VudCxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhbiBFY29tbWVyY2UgZ29hbFxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vcGl3aWsub3JnL2RvY3MvdHJhY2tpbmctZ29hbHMtd2ViLWFuYWx5dGljcy9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSNtYW51YWxseS10cmlnZ2VyLWdvYWwtY29udmVyc2lvbnNcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgZ29hbElkIChyZXF1aXJlZCkgVW5pcXVlIEdvYWwgSURcbiAgICAgICAqIEBwcm9wZXJ0eSB2YWx1ZSAob3B0aW9uYWwpIHBhc3NlZCB0byBnb2FsIHRyYWNraW5nXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrR29hbCc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tHb2FsJyxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmdvYWxJZCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVHJhY2tzIGEgc2l0ZSBzZWFyY2hcbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL3Bpd2lrLm9yZy9kb2NzL3NpdGUtc2VhcmNoL1xuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIucGl3aWsub3JnL2d1aWRlcy90cmFja2luZy1qYXZhc2NyaXB0LWd1aWRlI2ludGVybmFsLXNlYXJjaC10cmFja2luZ1xuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBrZXl3b3JkIChyZXF1aXJlZCkgS2V5d29yZCBzZWFyY2hlZCBmb3JcbiAgICAgICAqIEBwcm9wZXJ0eSBjYXRlZ29yeSAob3B0aW9uYWwpIFNlYXJjaCBjYXRlZ29yeVxuICAgICAgICogQHByb3BlcnR5IHNlYXJjaENvdW50IChvcHRpb25hbCkgTnVtYmVyIG9mIHJlc3VsdHNcbiAgICAgICAqL1xuICAgICAgY2FzZSAndHJhY2tTaXRlU2VhcmNoJzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja1NpdGVTZWFyY2gnLFxuICAgICAgICAgIHByb3BlcnRpZXMua2V5d29yZCxcbiAgICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxuICAgICAgICAgIHByb3BlcnRpZXMuc2VhcmNoQ291bnQsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBMb2dzIGFuIGV2ZW50IHdpdGggYW4gZXZlbnQgY2F0ZWdvcnkgKFZpZGVvcywgTXVzaWMsIEdhbWVzLi4uKSwgYW4gZXZlbnRcbiAgICAgICAqIGFjdGlvbiAoUGxheSwgUGF1c2UsIER1cmF0aW9uLCBBZGQgUGxheWxpc3QsIERvd25sb2FkZWQsIENsaWNrZWQuLi4pLCBhbmQgYW4gb3B0aW9uYWxcbiAgICAgICAqIGV2ZW50IG5hbWUgYW5kIG9wdGlvbmFsIG51bWVyaWMgdmFsdWUuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9ldmVudC10cmFja2luZy9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLnBpd2lrLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjdXNpbmctdGhlLXRyYWNrZXItb2JqZWN0XG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5XG4gICAgICAgKiBAcHJvcGVydHkgYWN0aW9uXG4gICAgICAgKiBAcHJvcGVydHkgbmFtZSAob3B0aW9uYWwsIHJlY29tbWVuZGVkKVxuICAgICAgICogQHByb3BlcnR5IHZhbHVlIChvcHRpb25hbClcbiAgICAgICAqL1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gUEFRIHJlcXVpcmVzIHRoYXQgZXZlbnRWYWx1ZSBiZSBhbiBpbnRlZ2VyLCBzZWU6IGh0dHA6Ly9waXdpay5vcmcvZG9jcy9ldmVudC10cmFja2luZ1xuICAgICAgICBpZiAocHJvcGVydGllcy52YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHByb3BlcnRpZXMudmFsdWUsIDEwKTtcbiAgICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IDAgOiBwYXJzZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrRXZlbnQnLFxuICAgICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnksXG4gICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgIHByb3BlcnRpZXMubmFtZSB8fCBwcm9wZXJ0aWVzLmxhYmVsLCAvLyBDaGFuZ2VkIGluIGZhdm91ciBvZiBQaXdpayBkb2N1bWVudGF0aW9uLiBBZGRlZCBmYWxsYmFjayBzbyBpdCdzIGJhY2t3YXJkcyBjb21wYXRpYmxlLlxuICAgICAgICAgIHByb3BlcnRpZXMudmFsdWUsXG4gICAgICAgIF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBfcGFxLnB1c2gocGFyYW1zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcgfCBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9wYXEucHVzaChbJ3NldFVzZXJJZCcsIHVzZXJJZF0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjdXN0b20gZGltZW5zaW9ucyBpZiBhdCBsZWFzdCBvbmUgcHJvcGVydHkgaGFzIHRoZSBrZXkgXCJkaW1lbnNpb248bj5cIixcbiAgICogZS5nLiBkaW1lbnNpb24xMC4gSWYgdGhlcmUgYXJlIGN1c3RvbSBkaW1lbnNpb25zLCBhbnkgb3RoZXIgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAgICpcbiAgICogSWYgdGhlcmUgYXJlIG5vIGN1c3RvbSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiBwcm9wZXJ0aWVzIG9iamVjdCwgdGhlIHByb3BlcnRpZXNcbiAgICogb2JqZWN0IGlzIHNhdmVkIGFzIGEgY3VzdG9tIHZhcmlhYmxlLlxuICAgKlxuICAgKiBJZiBpbiBkb3VidCwgcHJlZmVyIGN1c3RvbSBkaW1lbnNpb25zLlxuICAgKiBAbGluayBodHRwczovL3Bpd2lrLm9yZy9kb2NzL2N1c3RvbS12YXJpYWJsZXMvXG4gICAqL1xuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5zZXRDdXN0b21EaW1lbnNpb25zKHByb3BlcnRpZXMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGltZW5zaW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tVmFyaWFibGUnLCBwcm9wZXJ0aWVzLmluZGV4LCBwcm9wZXJ0aWVzLm5hbWUsIHByb3BlcnRpZXMudmFsdWUsIHByb3BlcnRpZXMuc2NvcGVdKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXN0b21EaW1lbnNpb25zKHByb3BlcnRpZXM6IGFueSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBkaW1lbnNpb25SZWdleDogUmVnRXhwID0gL2RpbWVuc2lvblsxLTldXFxkKi87XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpXG4gICAgICAuZmlsdGVyKGtleSA9PiBkaW1lbnNpb25SZWdleC5leGVjKGtleSkpO1xuICAgIGRpbWVuc2lvbnMuZm9yRWFjaChkaW1lbnNpb24gPT4ge1xuICAgICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKGRpbWVuc2lvbi5zdWJzdHIoOSkpO1xuICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tRGltZW5zaW9uJywgbnVtYmVyLCBwcm9wZXJ0aWVzW2RpbWVuc2lvbl1dKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgfVxufVxuIl19