import { __assign, __decorate, __param, __values } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DefaultConfig } from './angulartics2-config';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { RouterlessTracking, TrackNavigationEnd } from './routerless';
import * as i0 from "@angular/core";
import * as i1 from "./routerless";
import * as i2 from "./angulartics2-token";
var Angulartics2 = /** @class */ (function () {
    function Angulartics2(tracker, setup) {
        var _this = this;
        this.tracker = tracker;
        this.pageTrack = new ReplaySubject(10);
        this.eventTrack = new ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject(10);
        this.setAlias = new ReplaySubject(10);
        this.setUsername = new ReplaySubject(10);
        this.setUserProperties = new ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject(10);
        this.userTimings = new ReplaySubject(10);
        var defaultConfig = new DefaultConfig();
        this.settings = __assign(__assign({}, defaultConfig), setup.settings);
        this.settings.pageTracking = __assign(__assign({}, defaultConfig.pageTracking), setup.settings.pageTracking);
        this.tracker
            .trackLocation(this.settings)
            .subscribe(function (event) {
            return _this.trackUrlChange(event.url);
        });
    }
    /** filters all events when developer mode is true */
    Angulartics2.prototype.filterDeveloperMode = function () {
        var _this = this;
        return filter(function (value, index) { return !_this.settings.developerMode; });
    };
    Angulartics2.prototype.trackUrlChange = function (url) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            var clearedUrl = this.clearUrl(url);
            var path = void 0;
            if (this.settings.pageTracking.basePath.length) {
                path = this.settings.pageTracking.basePath + clearedUrl;
            }
            else {
                path = this.tracker.prepareExternalUrl(clearedUrl);
            }
            this.pageTrack.next({ path: path });
        }
    };
    /**
     * Use string literals or regular expressions to exclude routes
     * from automatic pageview tracking.
     *
     * @param url location
     */
    Angulartics2.prototype.matchesExcludedRoute = function (url) {
        var e_1, _a;
        try {
            for (var _b = __values(this.settings.pageTracking.excludedRoutes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var excludedRoute = _c.value;
                var matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
                if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * Removes id's from tracked route.
     *  EX: `/project/12981/feature` becomes `/project/feature`
     *
     * @param url current page path
     */
    Angulartics2.prototype.clearUrl = function (url) {
        var _this = this;
        if (this.settings.pageTracking.clearIds || this.settings.pageTracking.clearQueryParams ||
            this.settings.pageTracking.clearHash) {
            return url
                .split('/')
                .map(function (part) { return _this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part; })
                .map(function (part) { return _this.settings.pageTracking.clearHash ? part.split('#')[0] : part; })
                .filter(function (part) { return !_this.settings.pageTracking.clearIds || !part.match(_this.settings.pageTracking.idsRegExp); })
                .join('/');
        }
        return url;
    };
    Angulartics2.ctorParameters = function () { return [
        { type: RouterlessTracking },
        { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] }] }
    ]; };
    Angulartics2.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2_Factory() { return new Angulartics2(i0.ɵɵinject(i1.RouterlessTracking), i0.ɵɵinject(i2.ANGULARTICS2_TOKEN)); }, token: Angulartics2, providedIn: "root" });
    Angulartics2 = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(1, Inject(ANGULARTICS2_TOKEN))
    ], Angulartics2);
    return Angulartics2;
}());
export { Angulartics2 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLWNvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvIiwic291cmNlcyI6WyJhbmd1bGFydGljczItY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUE0QixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBd0IsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFNUUsT0FBTyxFQUFxQixrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUd0RTtJQWNFLHNCQUNVLE9BQTJCLEVBQ1AsS0FBd0I7UUFGdEQsaUJBZUM7UUFkUyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVpyQyxjQUFTLEdBQUcsSUFBSSxhQUFhLENBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELGVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBc0IsRUFBRSxDQUFDLENBQUM7UUFDeEQsbUJBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUM1QyxhQUFRLEdBQUcsSUFBSSxhQUFhLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDekMsZ0JBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBdUMsRUFBRSxDQUFDLENBQUM7UUFDMUUsc0JBQWlCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsMEJBQXFCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDbkQsdUJBQWtCLEdBQUcsSUFBSSxhQUFhLENBQU0sRUFBRSxDQUFDLENBQUM7UUFDaEQsMkJBQXNCLEdBQUcsSUFBSSxhQUFhLENB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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQXZFLENBQXVFLENBQUM7aUJBQ3BGLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFoRSxDQUFnRSxDQUFDO2lCQUM3RSxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQXpGLENBQXlGLENBQUM7aUJBQ3pHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOztnQkFuRWtCLGtCQUFrQjtnREFDbEMsTUFBTSxTQUFDLGtCQUFrQjs7O0lBaEJqQixZQUFZO1FBRHhCLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztRQWlCOUIsV0FBQSxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtPQWhCbEIsWUFBWSxDQW1GeEI7dUJBOUZEO0NBOEZDLEFBbkZELElBbUZDO1NBbkZZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTW9ub1R5cGVPcGVyYXRvckZ1bmN0aW9uLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMlNldHRpbmdzLCBEZWZhdWx0Q29uZmlnIH0gZnJvbSAnLi9hbmd1bGFydGljczItY29uZmlnJztcbmltcG9ydCB7IEV2ZW50VHJhY2ssIFBhZ2VUcmFjaywgVXNlclRpbWluZ3MgfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMi1pbnRlcmZhY2VzJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMlRva2VuLCBBTkdVTEFSVElDUzJfVE9LRU4gfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMi10b2tlbic7XG5pbXBvcnQgeyBSb3V0ZXJsZXNzVHJhY2tpbmcsIFRyYWNrTmF2aWdhdGlvbkVuZCB9IGZyb20gJy4vcm91dGVybGVzcyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyIHtcbiAgc2V0dGluZ3M6IEFuZ3VsYXJ0aWNzMlNldHRpbmdzO1xuXG4gIHBhZ2VUcmFjayA9IG5ldyBSZXBsYXlTdWJqZWN0PFBhcnRpYWw8UGFnZVRyYWNrPj4oMTApO1xuICBldmVudFRyYWNrID0gbmV3IFJlcGxheVN1YmplY3Q8UGFydGlhbDxFdmVudFRyYWNrPj4oMTApO1xuICBleGNlcHRpb25UcmFjayA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueT4oMTApO1xuICBzZXRBbGlhcyA9IG5ldyBSZXBsYXlTdWJqZWN0PHN0cmluZz4oMTApO1xuICBzZXRVc2VybmFtZSA9IG5ldyBSZXBsYXlTdWJqZWN0PHsgdXNlcklkOiBzdHJpbmcgfCBudW1iZXIgfSB8IHN0cmluZz4oMTApO1xuICBzZXRVc2VyUHJvcGVydGllcyA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueT4oMTApO1xuICBzZXRVc2VyUHJvcGVydGllc09uY2UgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEwKTtcbiAgc2V0U3VwZXJQcm9wZXJ0aWVzID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxMCk7XG4gIHNldFN1cGVyUHJvcGVydGllc09uY2UgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEwKTtcbiAgdXNlclRpbWluZ3MgPSBuZXcgUmVwbGF5U3ViamVjdDxVc2VyVGltaW5ncz4oMTApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhY2tlcjogUm91dGVybGVzc1RyYWNraW5nLFxuICAgIEBJbmplY3QoQU5HVUxBUlRJQ1MyX1RPS0VOKSBzZXR1cDogQW5ndWxhcnRpY3MyVG9rZW4sXG4gICkge1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSBuZXcgRGVmYXVsdENvbmZpZygpO1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLmRlZmF1bHRDb25maWcsIC4uLnNldHVwLnNldHRpbmdzIH07XG4gICAgdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcgPSB7XG4gICAgICAuLi5kZWZhdWx0Q29uZmlnLnBhZ2VUcmFja2luZyxcbiAgICAgIC4uLnNldHVwLnNldHRpbmdzLnBhZ2VUcmFja2luZyxcbiAgICB9O1xuICAgIHRoaXMudHJhY2tlclxuICAgICAgLnRyYWNrTG9jYXRpb24odGhpcy5zZXR0aW5ncylcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBUcmFja05hdmlnYXRpb25FbmQpID0+XG4gICAgICAgIHRoaXMudHJhY2tVcmxDaGFuZ2UoZXZlbnQudXJsKSxcbiAgICAgICk7XG4gIH1cblxuICAvKiogZmlsdGVycyBhbGwgZXZlbnRzIHdoZW4gZGV2ZWxvcGVyIG1vZGUgaXMgdHJ1ZSAqL1xuICBmaWx0ZXJEZXZlbG9wZXJNb2RlPFQ+KCk6IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbjxUPiB7XG4gICAgcmV0dXJuIGZpbHRlcigodmFsdWUsIGluZGV4KSA9PiAhdGhpcy5zZXR0aW5ncy5kZXZlbG9wZXJNb2RlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0cmFja1VybENoYW5nZSh1cmw6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5hdXRvVHJhY2tWaXJ0dWFsUGFnZXMgJiYgIXRoaXMubWF0Y2hlc0V4Y2x1ZGVkUm91dGUodXJsKSkge1xuICAgICAgY29uc3QgY2xlYXJlZFVybCA9IHRoaXMuY2xlYXJVcmwodXJsKTtcbiAgICAgIGxldCBwYXRoOiBzdHJpbmc7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuYmFzZVBhdGgubGVuZ3RoKSB7XG4gICAgICAgIHBhdGggPSB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5iYXNlUGF0aCArIGNsZWFyZWRVcmw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXRoID0gdGhpcy50cmFja2VyLnByZXBhcmVFeHRlcm5hbFVybChjbGVhcmVkVXJsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFnZVRyYWNrLm5leHQoeyBwYXRoIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2Ugc3RyaW5nIGxpdGVyYWxzIG9yIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdG8gZXhjbHVkZSByb3V0ZXNcbiAgICogZnJvbSBhdXRvbWF0aWMgcGFnZXZpZXcgdHJhY2tpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgbG9jYXRpb25cbiAgICovXG4gIHByb3RlY3RlZCBtYXRjaGVzRXhjbHVkZWRSb3V0ZSh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGZvciAoY29uc3QgZXhjbHVkZWRSb3V0ZSBvZiB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5leGNsdWRlZFJvdXRlcykge1xuICAgICAgY29uc3QgbWF0Y2hlc1JlZ2V4ID0gZXhjbHVkZWRSb3V0ZSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBleGNsdWRlZFJvdXRlLnRlc3QodXJsKTtcbiAgICAgIGlmIChtYXRjaGVzUmVnZXggfHwgdXJsLmluZGV4T2YoZXhjbHVkZWRSb3V0ZSBhcyBzdHJpbmcpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgaWQncyBmcm9tIHRyYWNrZWQgcm91dGUuXG4gICAqICBFWDogYC9wcm9qZWN0LzEyOTgxL2ZlYXR1cmVgIGJlY29tZXMgYC9wcm9qZWN0L2ZlYXR1cmVgXG4gICAqXG4gICAqIEBwYXJhbSB1cmwgY3VycmVudCBwYWdlIHBhdGhcbiAgICovXG4gIHByb3RlY3RlZCBjbGVhclVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFySWRzIHx8IHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFyUXVlcnlQYXJhbXMgfHxcbiAgICAgIHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFySGFzaCkge1xuICAgICAgcmV0dXJuIHVybFxuICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAubWFwKHBhcnQgPT4gdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuY2xlYXJRdWVyeVBhcmFtcyA/IHBhcnQuc3BsaXQoJz8nKVswXSA6IHBhcnQpXG4gICAgICAgIC5tYXAocGFydCA9PiB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhckhhc2ggPyBwYXJ0LnNwbGl0KCcjJylbMF0gOiBwYXJ0KVxuICAgICAgICAuZmlsdGVyKHBhcnQgPT4gIXRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFySWRzIHx8ICFwYXJ0Lm1hdGNoKHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmlkc1JlZ0V4cCkpXG4gICAgICAgIC5qb2luKCcvJyk7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cbiJdfQ==