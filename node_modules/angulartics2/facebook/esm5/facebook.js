import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
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
    Angulartics2Facebook.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Facebook_Factory() { return new Angulartics2Facebook(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Facebook, providedIn: "root" });
    Angulartics2Facebook = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Facebook);
    return Angulartics2Facebook;
}());
export { Angulartics2Facebook };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvZmFjZWJvb2svIiwic291cmNlcyI6WyJmYWNlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFJNUMsSUFBTSxpQkFBaUIsR0FBRztJQUN4QixhQUFhO0lBQ2IsUUFBUTtJQUNSLFdBQVc7SUFDWCxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsTUFBTTtJQUNOLHNCQUFzQjtDQUN2QixDQUFDO0FBR0Y7SUFDRSw4QkFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBSSxDQUFDO0lBRW5ELDRDQUFhLEdBQWI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHlDQUFVLEdBQVYsVUFBVyxNQUFjLEVBQUUsVUFBb0I7UUFBcEIsMkJBQUEsRUFBQSxlQUFvQjtRQUM3QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtZQUM5QixPQUFPO1NBQ1I7UUFDRCxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QyxPQUFPLEdBQUcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDOztnQkFyQmlDLFlBQVk7OztJQURuQyxvQkFBb0I7UUFEaEMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLG9CQUFvQixDQXVCaEM7K0JBMUNEO0NBMENDLEFBdkJELElBdUJDO1NBdkJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSBjb25zdCBmYnE6IGZhY2Vib29rLlBpeGVsLkV2ZW50O1xuXG5jb25zdCBmYWNlYm9va0V2ZW50TGlzdCA9IFtcbiAgJ1ZpZXdDb250ZW50JyxcbiAgJ1NlYXJjaCcsXG4gICdBZGRUb0NhcnQnLFxuICAnQWRkVG9XaXNobGlzdCcsXG4gICdJbml0aWF0ZUNoZWNrb3V0JyxcbiAgJ0FkZFBheW1lbnRJbmZvJyxcbiAgJ1B1cmNoYXNlJyxcbiAgJ0xlYWQnLFxuICAnQ29tcGxldGVSZWdpc3RyYXRpb24nLFxuXTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJGYWNlYm9vayB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHsgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBpbnRlcmFjdGlvbnMgdG8gdGhlIFBpeGVsLCBpLmUuIGZvciBldmVudCB0cmFja2luZyBpbiBQaXhlbFxuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgZmJxID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZmFjZWJvb2tFdmVudExpc3QuaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZicSgndHJhY2tDdXN0b20nLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gZmJxKCd0cmFjaycsIGFjdGlvbiwgcHJvcGVydGllcyk7XG4gIH1cbn1cbiJdfQ==