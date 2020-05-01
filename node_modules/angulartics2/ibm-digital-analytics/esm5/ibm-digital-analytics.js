import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2IBMDigitalAnalytics = /** @class */ (function () {
    function Angulartics2IBMDigitalAnalytics(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof window['cmCreatePageviewTag'] !== 'function') {
            console.warn('Angulartics 2 IBM Digital Analytics Plugin: eluminate.js is not loaded');
        }
    }
    Angulartics2IBMDigitalAnalytics.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    /**
     * Track Page in IBM Digital Analytics
     *
     * @param path location
     *
     * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
     */
    Angulartics2IBMDigitalAnalytics.prototype.pageTrack = function (path) {
        var cmCreatePageviewTag = window['cmCreatePageviewTag'];
        cmCreatePageviewTag(path, null, null, null);
    };
    /**
     * Track an event in IBM Digital Analytics
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    Angulartics2IBMDigitalAnalytics.prototype.eventTrack = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        var cmDisplayShops = window['cmDisplayShops'];
        switch (action) {
            /**
             * @description The Product View tag captures information about vdigitalDataiews of product detail pages.
             *  The Product View tag should be called on the lowest level detail page for products, which is typically
             *  the Product Details page. You can view example Product View tags below.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_prodviewtag.html
             */
            case 'cmCreateProductviewTag':
                var cmCreateProductviewTag = window['cmCreateProductviewTag'];
                cmCreateProductviewTag(properties.productId, properties.productName, properties.categoryId, properties.attrbute, properties.virtualCategory);
                break;
            /**
             * @description The Shop Action 5 tag captures data about selected products and which products are present in a shopping cart,
             *  if any, when the cart is viewed.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact5tag.html
             */
            case 'cmCreateShopAction5Tag':
                var cmCreateShopAction5Tag = window['cmCreateShopAction5Tag'];
                cmCreateShopAction5Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.categoryId, properties.attrbute, properties.extraFields, properties.virtualCategory);
                cmDisplayShops();
                break;
            /**
             * @description The Shop Action 9 tag captures data about what products were purchased by a customer.
             *  Like the Shop Action 5 tag, one tag should be sent for each product line item purchased. These tags should be sent
             *  on the receipt or other completion page confirming a successful order.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact9tag.html
             */
            case 'cmCreateShopAction9Tag':
                var cmCreateShopAction9Tag = window['cmCreateShopAction9Tag'];
                cmCreateShopAction9Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.registrationId, properties.orderId, properties.orderSubtotal, properties.categoryId, properties.attrbute, properties.extraFields);
                cmDisplayShops();
                break;
            /**
             * @description The Order tag captures order header information such as Registration ID, order ID, order subtotal,
             *  and shipping and handling. The Order tag should be sent on the receipt page confirming order completion.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_ordertag.html
             */
            case 'cmCreateOrderTag':
                var cmCreateOrderTag = window['cmCreateOrderTag'];
                cmCreateOrderTag(properties.orderId, properties.orderSubtotal, properties.orderShipping, properties.registrationId, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.attrbute, properties.extraFields);
                break;
            /**
             * @description The Registration tag creates a Lifetime Visitor Experience Profile (LIVE Profile) by associating a single
             *  common Registration ID with the IBM® Digital Analytics permanent cookie set in every browser visiting the tagged site.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_registrationtag.html
             */
            case 'cmCreateRegistrationTag':
                var cmCreateRegistrationTag = window['cmCreateRegistrationTag'];
                cmCreateRegistrationTag(properties.registrationId, properties.registrantEmail, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.registrantCountry, properties.attrbute);
                break;
            /**
             * @description The Element tag is used to track intra-page content in IBM® Digital Analytics. Data collected by
             *  the Element tag is used to populate values in the Element Categories and Top Viewed Elements reports.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_elementtag.html
             */
            case 'cmCreateElementTag':
                var cmCreateElementTag = window['cmCreateElementTag'];
                cmCreateElementTag(properties.elementId, properties.elementCategory, properties.attrbute);
                break;
            /**
             * @description The Conversion Event tag is employed for tracking of general non-commerce conversion events.
             * The Conversion Event tag is used to populate values in the Conversion Events Reports and to create Key Segments.
             * This tag and the reports it populates enable analysis of a wide variety of site activities.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_conversioneventtag.html
             */
            case 'cmCreateConversionEventTag':
                var cmCreateConversionEventTag = window['cmCreateConversionEventTag'];
                cmCreateConversionEventTag(properties.eventId, properties.actionType, properties.eventCategoryId, properties.points, properties.attrbute, properties.extraFields);
                break;
            default:
                console.warn('Unsupported Event Action');
        }
    };
    Angulartics2IBMDigitalAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2IBMDigitalAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2IBMDigitalAnalytics_Factory() { return new Angulartics2IBMDigitalAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2IBMDigitalAnalytics, providedIn: "root" });
    Angulartics2IBMDigitalAnalytics = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2IBMDigitalAnalytics);
    return Angulartics2IBMDigitalAnalytics;
}());
export { Angulartics2IBMDigitalAnalytics };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWJtLWRpZ2l0YWwtYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL2libS1kaWdpdGFsLWFuYWx5dGljcy8iLCJzb3VyY2VzIjpbImlibS1kaWdpdGFsLWFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFHNUM7SUFDRSx5Q0FBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN2RCxPQUFPLENBQUMsSUFBSSxDQUNWLHdFQUF3RSxDQUN6RSxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsdURBQWEsR0FBYjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILG1EQUFTLEdBQVQsVUFBVSxJQUFZO1FBQ3BCLElBQU0sbUJBQW1CLEdBQUcsTUFB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aEIsVUFBVSxDQUFDLFNBQVMsRUFDcEIsVUFBVSxDQUFDLGVBQWUsRUFDMUIsVUFBVSxDQUFDLFFBQVEsQ0FDcEIsQ0FBQztnQkFFRixNQUFNO1lBRVI7Ozs7OztlQU1HO1lBQ0gsS0FBSyw0QkFBNEI7Z0JBQy9CLElBQU0sMEJBQTBCLEdBQUcsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUM7Z0JBQ3hFLDBCQUEwQixDQUN4QixVQUFVLENBQUMsT0FBTyxFQUNsQixVQUFVLENBQUMsVUFBVSxFQUNyQixVQUFVLENBQUMsZUFBZSxFQUMxQixVQUFVLENBQUMsTUFBTSxFQUNqQixVQUFVLENBQUMsUUFBUSxFQUNuQixVQUFVLENBQUMsV0FBVyxDQUN2QixDQUFDO2dCQUVGLE1BQU07WUFFUjtnQkFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDOztnQkEzTGlDLFlBQVk7OztJQURuQywrQkFBK0I7UUFEM0MsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLCtCQUErQixDQTZMM0M7MENBak1EO0NBaU1DLEFBN0xELElBNkxDO1NBN0xZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJJQk1EaWdpdGFsQW5hbHl0aWNzIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvd1snY21DcmVhdGVQYWdldmlld1RhZyddICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcclxuICAgICAgICAnQW5ndWxhcnRpY3MgMiBJQk0gRGlnaXRhbCBBbmFseXRpY3MgUGx1Z2luOiBlbHVtaW5hdGUuanMgaXMgbm90IGxvYWRlZCcsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXHJcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcclxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xyXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhY2sgUGFnZSBpbiBJQk0gRGlnaXRhbCBBbmFseXRpY3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXRoIGxvY2F0aW9uXHJcbiAgICpcclxuICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX3BhZ2V2aWV3dGFnLmh0bWxcclxuICAgKi9cclxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjbUNyZWF0ZVBhZ2V2aWV3VGFnID0gd2luZG93WydjbUNyZWF0ZVBhZ2V2aWV3VGFnJ107XHJcbiAgICBjbUNyZWF0ZVBhZ2V2aWV3VGFnKHBhdGgsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhY2sgYW4gZXZlbnQgaW4gSUJNIERpZ2l0YWwgQW5hbHl0aWNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYWN0aW9uIEEgc3RyaW5nIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGUgb2YgZXZlbnQgdGhhdCBuZWVkcyB0byBiZSB0cmFja2VkLlxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRoYXQgbmVlZCB0byBiZSBsb2dnZWQgd2l0aCB0aGUgZXZlbnQuXHJcbiAgICovXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55ID0ge30pIHtcclxuICAgIGNvbnN0IGNtRGlzcGxheVNob3BzID0gd2luZG93WydjbURpc3BsYXlTaG9wcyddO1xyXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgUHJvZHVjdCBWaWV3IHRhZyBjYXB0dXJlcyBpbmZvcm1hdGlvbiBhYm91dCB2ZGlnaXRhbERhdGFpZXdzIG9mIHByb2R1Y3QgZGV0YWlsIHBhZ2VzLlxyXG4gICAgICAgKiAgVGhlIFByb2R1Y3QgVmlldyB0YWcgc2hvdWxkIGJlIGNhbGxlZCBvbiB0aGUgbG93ZXN0IGxldmVsIGRldGFpbCBwYWdlIGZvciBwcm9kdWN0cywgd2hpY2ggaXMgdHlwaWNhbGx5XHJcbiAgICAgICAqICB0aGUgUHJvZHVjdCBEZXRhaWxzIHBhZ2UuIFlvdSBjYW4gdmlldyBleGFtcGxlIFByb2R1Y3QgVmlldyB0YWdzIGJlbG93LlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX3Byb2R2aWV3dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlUHJvZHVjdHZpZXdUYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlUHJvZHVjdHZpZXdUYWcgPSB3aW5kb3dbJ2NtQ3JlYXRlUHJvZHVjdHZpZXdUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZVByb2R1Y3R2aWV3VGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3ROYW1lLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hdHRyYnV0ZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMudmlydHVhbENhdGVnb3J5LFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgU2hvcCBBY3Rpb24gNSB0YWcgY2FwdHVyZXMgZGF0YSBhYm91dCBzZWxlY3RlZCBwcm9kdWN0cyBhbmQgd2hpY2ggcHJvZHVjdHMgYXJlIHByZXNlbnQgaW4gYSBzaG9wcGluZyBjYXJ0LFxyXG4gICAgICAgKiAgaWYgYW55LCB3aGVuIHRoZSBjYXJ0IGlzIHZpZXdlZC5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9zaG9wYWN0NXRhZy5odG1sXHJcbiAgICAgICAqL1xyXG4gICAgICBjYXNlICdjbUNyZWF0ZVNob3BBY3Rpb241VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZVNob3BBY3Rpb241VGFnID0gd2luZG93WydjbUNyZWF0ZVNob3BBY3Rpb241VGFnJ107XHJcbiAgICAgICAgY21DcmVhdGVTaG9wQWN0aW9uNVRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdElkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0TmFtZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucXVhbnRpdHksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnVuaXRQcmljZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmV4dHJhRmllbGRzLFxyXG4gICAgICAgICAgcHJvcGVydGllcy52aXJ0dWFsQ2F0ZWdvcnksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY21EaXNwbGF5U2hvcHMoKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQGRlc2NyaXB0aW9uIFRoZSBTaG9wIEFjdGlvbiA5IHRhZyBjYXB0dXJlcyBkYXRhIGFib3V0IHdoYXQgcHJvZHVjdHMgd2VyZSBwdXJjaGFzZWQgYnkgYSBjdXN0b21lci5cclxuICAgICAgICogIExpa2UgdGhlIFNob3AgQWN0aW9uIDUgdGFnLCBvbmUgdGFnIHNob3VsZCBiZSBzZW50IGZvciBlYWNoIHByb2R1Y3QgbGluZSBpdGVtIHB1cmNoYXNlZC4gVGhlc2UgdGFncyBzaG91bGQgYmUgc2VudFxyXG4gICAgICAgKiAgb24gdGhlIHJlY2VpcHQgb3Igb3RoZXIgY29tcGxldGlvbiBwYWdlIGNvbmZpcm1pbmcgYSBzdWNjZXNzZnVsIG9yZGVyLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX3Nob3BhY3Q5dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlU2hvcEFjdGlvbjlUYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlU2hvcEFjdGlvbjlUYWcgPSB3aW5kb3dbJ2NtQ3JlYXRlU2hvcEFjdGlvbjlUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZVNob3BBY3Rpb245VGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3ROYW1lLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5xdWFudGl0eSxcclxuICAgICAgICAgIHByb3BlcnRpZXMudW5pdFByaWNlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYXRpb25JZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJTdWJ0b3RhbCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmV4dHJhRmllbGRzLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNtRGlzcGxheVNob3BzKCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgT3JkZXIgdGFnIGNhcHR1cmVzIG9yZGVyIGhlYWRlciBpbmZvcm1hdGlvbiBzdWNoIGFzIFJlZ2lzdHJhdGlvbiBJRCwgb3JkZXIgSUQsIG9yZGVyIHN1YnRvdGFsLFxyXG4gICAgICAgKiAgYW5kIHNoaXBwaW5nIGFuZCBoYW5kbGluZy4gVGhlIE9yZGVyIHRhZyBzaG91bGQgYmUgc2VudCBvbiB0aGUgcmVjZWlwdCBwYWdlIGNvbmZpcm1pbmcgb3JkZXIgY29tcGxldGlvbi5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9vcmRlcnRhZy5odG1sXHJcbiAgICAgICAqL1xyXG4gICAgICBjYXNlICdjbUNyZWF0ZU9yZGVyVGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZU9yZGVyVGFnID0gd2luZG93WydjbUNyZWF0ZU9yZGVyVGFnJ107XHJcbiAgICAgICAgY21DcmVhdGVPcmRlclRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJTdWJ0b3RhbCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJTaGlwcGluZyxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmF0aW9uSWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRDaXR5LFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50U3RhdGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRQb3N0YWxDb2RlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hdHRyYnV0ZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuZXh0cmFGaWVsZHMsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQGRlc2NyaXB0aW9uIFRoZSBSZWdpc3RyYXRpb24gdGFnIGNyZWF0ZXMgYSBMaWZldGltZSBWaXNpdG9yIEV4cGVyaWVuY2UgUHJvZmlsZSAoTElWRSBQcm9maWxlKSBieSBhc3NvY2lhdGluZyBhIHNpbmdsZVxyXG4gICAgICAgKiAgY29tbW9uIFJlZ2lzdHJhdGlvbiBJRCB3aXRoIHRoZSBJQk3CriBEaWdpdGFsIEFuYWx5dGljcyBwZXJtYW5lbnQgY29va2llIHNldCBpbiBldmVyeSBicm93c2VyIHZpc2l0aW5nIHRoZSB0YWdnZWQgc2l0ZS5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9yZWdpc3RyYXRpb250YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVSZWdpc3RyYXRpb25UYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlUmVnaXN0cmF0aW9uVGFnID0gd2luZG93WydjbUNyZWF0ZVJlZ2lzdHJhdGlvblRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlUmVnaXN0cmF0aW9uVGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYXRpb25JZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudEVtYWlsLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50Q2l0eSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudFN0YXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50UG9zdGFsQ29kZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudENvdW50cnksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgRWxlbWVudCB0YWcgaXMgdXNlZCB0byB0cmFjayBpbnRyYS1wYWdlIGNvbnRlbnQgaW4gSUJNwq4gRGlnaXRhbCBBbmFseXRpY3MuIERhdGEgY29sbGVjdGVkIGJ5XHJcbiAgICAgICAqICB0aGUgRWxlbWVudCB0YWcgaXMgdXNlZCB0byBwb3B1bGF0ZSB2YWx1ZXMgaW4gdGhlIEVsZW1lbnQgQ2F0ZWdvcmllcyBhbmQgVG9wIFZpZXdlZCBFbGVtZW50cyByZXBvcnRzLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX2VsZW1lbnR0YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVFbGVtZW50VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZUVsZW1lbnRUYWcgPSB3aW5kb3dbJ2NtQ3JlYXRlRWxlbWVudFRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlRWxlbWVudFRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMuZWxlbWVudElkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5lbGVtZW50Q2F0ZWdvcnksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgQ29udmVyc2lvbiBFdmVudCB0YWcgaXMgZW1wbG95ZWQgZm9yIHRyYWNraW5nIG9mIGdlbmVyYWwgbm9uLWNvbW1lcmNlIGNvbnZlcnNpb24gZXZlbnRzLlxyXG4gICAgICAgKiBUaGUgQ29udmVyc2lvbiBFdmVudCB0YWcgaXMgdXNlZCB0byBwb3B1bGF0ZSB2YWx1ZXMgaW4gdGhlIENvbnZlcnNpb24gRXZlbnRzIFJlcG9ydHMgYW5kIHRvIGNyZWF0ZSBLZXkgU2VnbWVudHMuXHJcbiAgICAgICAqIFRoaXMgdGFnIGFuZCB0aGUgcmVwb3J0cyBpdCBwb3B1bGF0ZXMgZW5hYmxlIGFuYWx5c2lzIG9mIGEgd2lkZSB2YXJpZXR5IG9mIHNpdGUgYWN0aXZpdGllcy5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9jb252ZXJzaW9uZXZlbnR0YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVDb252ZXJzaW9uRXZlbnRUYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlQ29udmVyc2lvbkV2ZW50VGFnID0gd2luZG93WydjbUNyZWF0ZUNvbnZlcnNpb25FdmVudFRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlQ29udmVyc2lvbkV2ZW50VGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5ldmVudElkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hY3Rpb25UeXBlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5ldmVudENhdGVnb3J5SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnBvaW50cyxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmV4dHJhRmllbGRzLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1Vuc3VwcG9ydGVkIEV2ZW50IEFjdGlvbicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=