import { __decorate } from "tslib";
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
import * as i2 from "@angular/common";
var Angulartics2AdobeAnalytics = /** @class */ (function () {
    function Angulartics2AdobeAnalytics(angulartics2, location) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.location = location;
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2AdobeAnalytics.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2AdobeAnalytics.prototype.pageTrack = function (path) {
        if (typeof s !== 'undefined' && s) {
            s.clearVars();
            s.t({ pageName: path });
        }
    };
    /**
     * Track Event in Adobe Analytics
     *
     * @param action associated with the event
     * @param properties action detials
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    Angulartics2AdobeAnalytics.prototype.eventTrack = function (action, properties) {
        // TODO: make interface
        // @property {string} properties.category
        // @property {string} properties.label
        // @property {number} properties.value
        // @property {boolean} properties.noninteraction
        if (!properties) {
            properties = properties || {};
        }
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                this.setUserProperties(properties);
            }
            if (action) {
                // if linkName property is passed, use that; otherwise, the action is the linkName
                var linkName = (properties['linkName']) ? properties['linkName'] : action;
                // note that 'this' should refer the link element, but we can't get that in this function. example:
                // <a href="http://anothersite.com" onclick="s.tl(this,'e','AnotherSite',null)">
                // if disableDelay property is passed, use that to turn off/on the 500ms delay; otherwise, it uses this
                var disableDelay = !!properties['disableDelay'] ? true : this;
                // if action property is passed, use that; otherwise, the action remains unchanged
                if (properties['action']) {
                    action = properties['action'];
                }
                this.setPageName();
                if (action.toUpperCase() === 'DOWNLOAD') {
                    s.tl(disableDelay, 'd', linkName);
                }
                else if (action.toUpperCase() === 'EXIT') {
                    s.tl(disableDelay, 'e', linkName);
                }
                else {
                    s.tl(disableDelay, 'o', linkName);
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.prototype.setPageName = function () {
        var path = this.location.path(true);
        var hashNdx = path.indexOf('#');
        if (hashNdx > 0 && hashNdx < path.length) {
            s.pageName = path.substring(hashNdx + 1);
        }
        else {
            s.pageName = path;
        }
    };
    Angulartics2AdobeAnalytics.prototype.setUserProperties = function (properties) {
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        s[key] = properties[key];
                    }
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 },
        { type: Location }
    ]; };
    Angulartics2AdobeAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2AdobeAnalytics_Factory() { return new Angulartics2AdobeAnalytics(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Location)); }, token: Angulartics2AdobeAnalytics, providedIn: "root" });
    Angulartics2AdobeAnalytics = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2AdobeAnalytics);
    return Angulartics2AdobeAnalytics;
}());
export { Angulartics2AdobeAnalytics };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmVhbmFseXRpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvYWRvYmVhbmFseXRpY3MvIiwic291cmNlcyI6WyJhZG9iZWFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUs1QztJQUVFLG9DQUNVLFlBQTBCLEVBQzFCLFFBQWtCO1FBRjVCLGlCQU1DO1FBTFMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUUxQixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQjthQUNoQyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsa0RBQWEsR0FBYjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUF2QyxD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QUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUI7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBekZ1QixZQUFZO2dCQUNoQixRQUFROzs7SUFKakIsMEJBQTBCO1FBRHRDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUN0QiwwQkFBMEIsQ0E2RnRDO3FDQXJHRDtDQXFHQyxBQTdGRCxJQTZGQztTQTdGWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cbmRlY2xhcmUgY29uc3QgczogYW55O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkFkb2JlQW5hbHl0aWNzIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyLFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICApIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHMgIT09ICd1bmRlZmluZWQnICYmIHMpIHtcbiAgICAgIHMuY2xlYXJWYXJzKCk7XG4gICAgICBzLnQoe3BhZ2VOYW1lOiBwYXRofSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIEV2ZW50IGluIEFkb2JlIEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgYWN0aW9uIGRldGlhbHNcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9tYXJrZXRpbmcuYWRvYmUuY29tL3Jlc291cmNlcy9oZWxwL2VuX1VTL3NjL2ltcGxlbWVudC9qc19pbXBsZW1lbnRhdGlvbi5odG1sXG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGludGVyZmFjZVxuICAgIC8vIEBwcm9wZXJ0eSB7c3RyaW5nfSBwcm9wZXJ0aWVzLmNhdGVnb3J5XG4gICAgLy8gQHByb3BlcnR5IHtzdHJpbmd9IHByb3BlcnRpZXMubGFiZWxcbiAgICAvLyBAcHJvcGVydHkge251bWJlcn0gcHJvcGVydGllcy52YWx1ZVxuICAgIC8vIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJvcGVydGllcy5ub25pbnRlcmFjdGlvblxuICAgIGlmICghcHJvcGVydGllcykge1xuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzICE9PSAndW5kZWZpbmVkJyAmJiBzKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BlcnRpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMuc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgIC8vIGlmIGxpbmtOYW1lIHByb3BlcnR5IGlzIHBhc3NlZCwgdXNlIHRoYXQ7IG90aGVyd2lzZSwgdGhlIGFjdGlvbiBpcyB0aGUgbGlua05hbWVcbiAgICAgICAgY29uc3QgbGlua05hbWUgPSAocHJvcGVydGllc1snbGlua05hbWUnXSkgPyBwcm9wZXJ0aWVzWydsaW5rTmFtZSddIDogYWN0aW9uO1xuICAgICAgICAvLyBub3RlIHRoYXQgJ3RoaXMnIHNob3VsZCByZWZlciB0aGUgbGluayBlbGVtZW50LCBidXQgd2UgY2FuJ3QgZ2V0IHRoYXQgaW4gdGhpcyBmdW5jdGlvbi4gZXhhbXBsZTpcbiAgICAgICAgLy8gPGEgaHJlZj1cImh0dHA6Ly9hbm90aGVyc2l0ZS5jb21cIiBvbmNsaWNrPVwicy50bCh0aGlzLCdlJywnQW5vdGhlclNpdGUnLG51bGwpXCI+XG4gICAgICAgIC8vIGlmIGRpc2FibGVEZWxheSBwcm9wZXJ0eSBpcyBwYXNzZWQsIHVzZSB0aGF0IHRvIHR1cm4gb2ZmL29uIHRoZSA1MDBtcyBkZWxheTsgb3RoZXJ3aXNlLCBpdCB1c2VzIHRoaXNcbiAgICAgICAgY29uc3QgZGlzYWJsZURlbGF5ID0gISFwcm9wZXJ0aWVzWydkaXNhYmxlRGVsYXknXSA/IHRydWUgOiB0aGlzO1xuICAgICAgICAvLyBpZiBhY3Rpb24gcHJvcGVydHkgaXMgcGFzc2VkLCB1c2UgdGhhdDsgb3RoZXJ3aXNlLCB0aGUgYWN0aW9uIHJlbWFpbnMgdW5jaGFuZ2VkXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzWydhY3Rpb24nXSkge1xuICAgICAgICAgIGFjdGlvbiA9IHByb3BlcnRpZXNbJ2FjdGlvbiddO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UGFnZU5hbWUoKTtcblxuICAgICAgICBpZiAoYWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09ICdET1dOTE9BRCcpIHtcbiAgICAgICAgICBzLnRsKGRpc2FibGVEZWxheSwgJ2QnLCBsaW5rTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09ICdFWElUJykge1xuICAgICAgICAgIHMudGwoZGlzYWJsZURlbGF5LCAnZScsIGxpbmtOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzLnRsKGRpc2FibGVEZWxheSwgJ28nLCBsaW5rTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBhZ2VOYW1lKCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmxvY2F0aW9uLnBhdGgodHJ1ZSk7XG4gICAgY29uc3QgaGFzaE5keCA9IHBhdGguaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNoTmR4ID4gMCAmJiBoYXNoTmR4IDwgcGF0aC5sZW5ndGgpIHtcbiAgICAgIHMucGFnZU5hbWUgPSBwYXRoLnN1YnN0cmluZyhoYXNoTmR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHMucGFnZU5hbWUgPSBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcykge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgc1trZXldID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19