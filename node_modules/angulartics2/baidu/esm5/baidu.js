import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2BaiduAnalytics = /** @class */ (function () {
    function Angulartics2BaiduAnalytics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof _hmt === 'undefined') {
            _hmt = [];
        }
        else {
            _hmt.push(['_setAutoPageview', false]);
        }
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2BaiduAnalytics.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    /**
     * Page Track in Baidu Analytics
     *
     * @param path Required url 'path'
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
     */
    Angulartics2BaiduAnalytics.prototype.pageTrack = function (path) {
        if (typeof _hmt !== 'undefined' && _hmt) {
            _hmt.push(['_trackPageview', path]);
        }
    };
    /**
     * Track Event in Baidu Analytics
     *
     * @param action Name associated with the event
     * @param properties Comprised of:
     *  - 'category' (string)
     *  - 'opt_label' (string)
     *  - 'opt_value' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
     */
    Angulartics2BaiduAnalytics.prototype.eventTrack = function (action, properties) {
        // baidu analytics requires category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
            properties.opt_label = 'default';
            properties.opt_value = 'default';
        }
        if (typeof _hmt !== 'undefined' && _hmt) {
            _hmt.push([
                '_trackEvent',
                properties.category,
                action,
                properties.opt_label,
                properties.opt_value,
            ]);
        }
    };
    Angulartics2BaiduAnalytics.prototype.setUsername = function (userId) {
        // set default custom variables name to 'identity' and 'value'
        _hmt.push(['_setCustomVar', 1, 'identity', userId]);
    };
    Angulartics2BaiduAnalytics.prototype.setUserProperties = function (properties) {
        _hmt.push(['_setCustomVar', 2, 'user', JSON.stringify(properties)]);
    };
    Angulartics2BaiduAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2BaiduAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2BaiduAnalytics_Factory() { return new Angulartics2BaiduAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2BaiduAnalytics, providedIn: "root" });
    Angulartics2BaiduAnalytics = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2BaiduAnalytics);
    return Angulartics2BaiduAnalytics;
}());
export { Angulartics2BaiduAnalytics };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFpZHUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvYmFpZHUvIiwic291cmNlcyI6WyJiYWlkdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFNNUM7SUFDRSxvQ0FBb0IsWUFBMEI7UUFBOUMsaUJBVUM7UUFWbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVzthQUMxQixTQUFTLENBQUMsVUFBQyxDQUFTLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7YUFDaEMsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGtEQUFhLEdBQWI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCw4Q0FBUyxHQUFULFVBQVUsSUFBWTtRQUNwQixJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILCtDQUFVLEdBQVYsVUFBVyxNQUFjLEVBQUUsVUFBZTtRQUN4QyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDdkMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7WUFDOUIsVUFBVSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDOUIsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDakMsVUFBVSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDbEM7UUFFRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDUixhQUFhO2dCQUNiLFVBQVUsQ0FBQyxRQUFRO2dCQUNuQixNQUFNO2dCQUNOLFVBQVUsQ0FBQyxTQUFTO2dCQUNwQixVQUFVLENBQUMsU0FBUzthQUNyQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxnREFBVyxHQUFYLFVBQVksTUFBYztRQUN4Qiw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHNEQUFpQixHQUFqQixVQUFrQixVQUFlO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDOztnQkF4RWlDLFlBQVk7OztJQURuQywwQkFBMEI7UUFEdEMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLDBCQUEwQixDQTBFdEM7cUNBbEZEO0NBa0ZDLEFBMUVELElBMEVDO1NBMUVZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuXG5kZWNsYXJlIHZhciBfaG10OiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQmFpZHVBbmFseXRpY3Mge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgaWYgKHR5cGVvZiBfaG10ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgX2htdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBfaG10LnB1c2goWydfc2V0QXV0b1BhZ2V2aWV3JywgZmFsc2VdKTtcbiAgICB9XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWVcbiAgICAgIC5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogUGFnZSBUcmFjayBpbiBCYWlkdSBBbmFseXRpY3NcbiAgICpcbiAgICogQHBhcmFtIHBhdGggUmVxdWlyZWQgdXJsICdwYXRoJ1xuICAgKlxuICAgKiBAbGluayBodHRwOi8vdG9uZ2ppLmJhaWR1LmNvbS9vcGVuL2FwaS9tb3JlP3A9cmVmX3RyYWNrUGFnZXZpZXdcbiAgICovXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIF9obXQgIT09ICd1bmRlZmluZWQnICYmIF9obXQpIHtcbiAgICAgIF9obXQucHVzaChbJ190cmFja1BhZ2V2aWV3JywgcGF0aF0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFjayBFdmVudCBpbiBCYWlkdSBBbmFseXRpY3NcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBOYW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mOlxuICAgKiAgLSAnY2F0ZWdvcnknIChzdHJpbmcpXG4gICAqICAtICdvcHRfbGFiZWwnIChzdHJpbmcpXG4gICAqICAtICdvcHRfdmFsdWUnIChzdHJpbmcpXG4gICAqXG4gICAqIEBsaW5rIGh0dHA6Ly90b25namkuYmFpZHUuY29tL29wZW4vYXBpL21vcmU/cD1yZWZfdHJhY2tFdmVudFxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XG4gICAgLy8gYmFpZHUgYW5hbHl0aWNzIHJlcXVpcmVzIGNhdGVnb3J5XG4gICAgaWYgKCFwcm9wZXJ0aWVzIHx8ICFwcm9wZXJ0aWVzLmNhdGVnb3J5KSB7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnkgPSAnRXZlbnQnO1xuICAgICAgcHJvcGVydGllcy5vcHRfbGFiZWwgPSAnZGVmYXVsdCc7XG4gICAgICBwcm9wZXJ0aWVzLm9wdF92YWx1ZSA9ICdkZWZhdWx0JztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIF9obXQgIT09ICd1bmRlZmluZWQnICYmIF9obXQpIHtcbiAgICAgIF9obXQucHVzaChbXG4gICAgICAgICdfdHJhY2tFdmVudCcsXG4gICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnksXG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgcHJvcGVydGllcy5vcHRfbGFiZWwsXG4gICAgICAgIHByb3BlcnRpZXMub3B0X3ZhbHVlLFxuICAgICAgXSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcbiAgICAvLyBzZXQgZGVmYXVsdCBjdXN0b20gdmFyaWFibGVzIG5hbWUgdG8gJ2lkZW50aXR5JyBhbmQgJ3ZhbHVlJ1xuICAgIF9obXQucHVzaChbJ19zZXRDdXN0b21WYXInLCAxLCAnaWRlbnRpdHknLCB1c2VySWRdKTtcbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIF9obXQucHVzaChbJ19zZXRDdXN0b21WYXInLCAyLCAndXNlcicsIEpTT04uc3RyaW5naWZ5KHByb3BlcnRpZXMpXSk7XG4gIH1cbn1cbiJdfQ==