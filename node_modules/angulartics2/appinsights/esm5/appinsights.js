import { __assign, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationError, NavigationStart, Router, } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Angulartics2, AppInsightsSettings } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/router";
var AppInsightsDefaults = /** @class */ (function () {
    function AppInsightsDefaults() {
        this.userId = null;
    }
    return AppInsightsDefaults;
}());
export { AppInsightsDefaults };
var Angulartics2AppInsights = /** @class */ (function () {
    function Angulartics2AppInsights(angulartics2, title, router) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.title = title;
        this.router = router;
        this.loadStartTime = null;
        this.loadTime = null;
        this.metrics = null;
        this.dimensions = null;
        this.measurements = null;
        if (typeof appInsights === 'undefined') {
            console.warn('appInsights not found');
        }
        var defaults = new AppInsightsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.appInsights = __assign(__assign({}, defaults), this.angulartics2.settings.appInsights);
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2AppInsights.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.exceptionTrack(x); });
        this.router.events
            .pipe(this.angulartics2.filterDeveloperMode(), filter(function (event) { return event instanceof NavigationStart; }))
            .subscribe(function (event) { return _this.startTimer(); });
        this.router.events
            .pipe(filter(function (event) { return event instanceof NavigationError || event instanceof NavigationEnd; }))
            .subscribe(function (error) { return _this.stopTimer(); });
    };
    Angulartics2AppInsights.prototype.startTimer = function () {
        this.loadStartTime = Date.now();
        this.loadTime = null;
    };
    Angulartics2AppInsights.prototype.stopTimer = function () {
        this.loadTime = Date.now() - this.loadStartTime;
        this.loadStartTime = null;
    };
    /**
     * Page Track in Baidu Analytics
     *
     * @param path - Location 'path'
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     */
    Angulartics2AppInsights.prototype.pageTrack = function (path) {
        appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
    };
    /**
     * Log a user action or other occurrence.
     *
     * @param name Name to identify this event in the portal.
     * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    Angulartics2AppInsights.prototype.eventTrack = function (name, properties) {
        appInsights.trackEvent(name, properties, this.measurements);
    };
    /**
     * Exception Track Event in GA
     *
     * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    Angulartics2AppInsights.prototype.exceptionTrack = function (properties) {
        var description = properties.event || properties.description || properties;
        appInsights.trackException(description);
    };
    /**
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    Angulartics2AppInsights.prototype.setUsername = function (userId) {
        this.angulartics2.settings.appInsights.userId = userId;
        appInsights.setAuthenticatedUserContext(userId);
    };
    Angulartics2AppInsights.prototype.setUserProperties = function (properties) {
        if (properties.userId) {
            this.angulartics2.settings.appInsights.userId = properties.userId;
        }
        if (properties.accountId) {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
        }
        else {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
        }
    };
    Angulartics2AppInsights.ctorParameters = function () { return [
        { type: Angulartics2 },
        { type: Title },
        { type: Router }
    ]; };
    Angulartics2AppInsights.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2AppInsights_Factory() { return new Angulartics2AppInsights(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title), i0.ɵɵinject(i3.Router)); }, token: Angulartics2AppInsights, providedIn: "root" });
    Angulartics2AppInsights = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2AppInsights);
    return Angulartics2AppInsights;
}());
export { Angulartics2AppInsights };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwaW5zaWdodHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvYXBwaW5zaWdodHMvIiwic291cmNlcyI6WyJhcHBpbnNpZ2h0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLE1BQU0sR0FDUCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUlqRTtJQUFBO1FBQ0UsV0FBTSxHQUFHLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFHRDtJQVFFLGlDQUNVLFlBQTBCLEVBQzFCLEtBQVksRUFDWixNQUFjO1FBSHhCLGlCQWdCQztRQWZTLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVnhCLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsWUFBTyxHQUErQixJQUFJLENBQUM7UUFDM0MsZUFBVSxHQUErQixJQUFJLENBQUM7UUFDOUMsaUJBQVksR0FBK0IsSUFBSSxDQUFDO1FBTzlDLElBQUksT0FBTyxXQUFXLEtBQUssV0FBVyxFQUFFO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUN2QztRQUVELElBQU0sUUFBUSxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUMzQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFlBQVks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UUFEbkMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLHVCQUF1QixDQTRIbkM7a0NBL0lEO0NBK0lDLEFBNUhELElBNEhDO1NBNUhZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBOYXZpZ2F0aW9uRW5kLFxuICBOYXZpZ2F0aW9uRXJyb3IsXG4gIE5hdmlnYXRpb25TdGFydCxcbiAgUm91dGVyLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIsIEFwcEluc2lnaHRzU2V0dGluZ3MgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIGNvbnN0IGFwcEluc2lnaHRzOiBNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cy5JQXBwSW5zaWdodHM7XG5cbmV4cG9ydCBjbGFzcyBBcHBJbnNpZ2h0c0RlZmF1bHRzIGltcGxlbWVudHMgQXBwSW5zaWdodHNTZXR0aW5ncyB7XG4gIHVzZXJJZCA9IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQXBwSW5zaWdodHMge1xuICBsb2FkU3RhcnRUaW1lOiBudW1iZXIgPSBudWxsO1xuICBsb2FkVGltZTogbnVtYmVyID0gbnVsbDtcblxuICBtZXRyaWNzOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG4gIGRpbWVuc2lvbnM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcbiAgbWVhc3VyZW1lbnRzOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgICBwcml2YXRlIHRpdGxlOiBUaXRsZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICApIHtcbiAgICBpZiAodHlwZW9mIGFwcEluc2lnaHRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKCdhcHBJbnNpZ2h0cyBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IG5ldyBBcHBJbnNpZ2h0c0RlZmF1bHRzKCk7XG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGlzIG1vZHVsZVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzID0geyAuLi5kZWZhdWx0cywgLi4udGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMgfTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5leGNlcHRpb25UcmFjayh4KSk7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpLFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLFxuICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5zdGFydFRpbWVyKCkpO1xuXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5zdWJzY3JpYmUoZXJyb3IgPT4gdGhpcy5zdG9wVGltZXIoKSk7XG4gIH1cblxuICBzdGFydFRpbWVyKCkge1xuICAgIHRoaXMubG9hZFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5sb2FkVGltZSA9IG51bGw7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgdGhpcy5sb2FkVGltZSA9IERhdGUubm93KCkgLSB0aGlzLmxvYWRTdGFydFRpbWU7XG4gICAgdGhpcy5sb2FkU3RhcnRUaW1lID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIFRyYWNrIGluIEJhaWR1IEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gcGF0aCAtIExvY2F0aW9uICdwYXRoJ1xuICAgKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja3BhZ2V2aWV3XG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgYXBwSW5zaWdodHMudHJhY2tQYWdlVmlldyhcbiAgICAgIHRoaXMudGl0bGUuZ2V0VGl0bGUoKSxcbiAgICAgIHBhdGgsXG4gICAgICB0aGlzLmRpbWVuc2lvbnMsXG4gICAgICB0aGlzLm1ldHJpY3MsXG4gICAgICB0aGlzLmxvYWRUaW1lLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgdXNlciBhY3Rpb24gb3Igb3RoZXIgb2NjdXJyZW5jZS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSB0byBpZGVudGlmeSB0aGlzIGV2ZW50IGluIHRoZSBwb3J0YWwuXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIEFkZGl0aW9uYWwgZGF0YSB1c2VkIHRvIGZpbHRlciBldmVudHMgYW5kIG1ldHJpY3MgaW4gdGhlIHBvcnRhbC4gRGVmYXVsdHMgdG8gZW1wdHkuXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvQXBwbGljYXRpb25JbnNpZ2h0cy1KUy9ibG9iL21hc3Rlci9BUEktcmVmZXJlbmNlLm1kI3RyYWNrZXZlbnRcbiAgICovXG4gIGV2ZW50VHJhY2sobmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGFwcEluc2lnaHRzLnRyYWNrRXZlbnQobmFtZSwgcHJvcGVydGllcywgdGhpcy5tZWFzdXJlbWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHQVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIENvbXByaXNlZCBvZiB0aGUgbWFuZGF0b3J5IGZpZWxkcyAnYXBwSWQnIChzdHJpbmcpLCAnYXBwTmFtZScgKHN0cmluZykgYW5kICdhcHBWZXJzaW9uJyAoc3RyaW5nKSBhbmRcbiAgICogb3B0aW9uYWwgZmllbGRzICdmYXRhbCcgKGJvb2xlYW4pIGFuZCAnZGVzY3JpcHRpb24nIChzdHJpbmcpLCBlcnJvclxuICAgKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja2V4Y2VwdGlvblxuICAgKi9cbiAgZXhjZXB0aW9uVHJhY2socHJvcGVydGllczogYW55KSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmV2ZW50IHx8IHByb3BlcnRpZXMuZGVzY3JpcHRpb24gfHwgcHJvcGVydGllcztcblxuICAgIGFwcEluc2lnaHRzLnRyYWNrRXhjZXB0aW9uKGRlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCNzZXRhdXRoZW50aWNhdGVkdXNlcmNvbnRleHRcbiAgICovXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkID0gdXNlcklkO1xuICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dCh1c2VySWQpO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogUGFydGlhbDx7IHVzZXJJZDogc3RyaW5nLCBhY2NvdW50SWQ6IHN0cmluZyB9Pikge1xuICAgIGlmIChwcm9wZXJ0aWVzLnVzZXJJZCkge1xuICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkID0gcHJvcGVydGllcy51c2VySWQ7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0aWVzLmFjY291bnRJZCkge1xuICAgICAgYXBwSW5zaWdodHMuc2V0QXV0aGVudGljYXRlZFVzZXJDb250ZXh0KFxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWQsXG4gICAgICAgIHByb3BlcnRpZXMuYWNjb3VudElkLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwSW5zaWdodHMuc2V0QXV0aGVudGljYXRlZFVzZXJDb250ZXh0KFxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWQsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19