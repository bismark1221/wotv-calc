import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationError, NavigationStart, Router, } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Angulartics2, AppInsightsSettings } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/router";
export class AppInsightsDefaults {
    constructor() {
        this.userId = null;
    }
}
let Angulartics2AppInsights = class Angulartics2AppInsights {
    constructor(angulartics2, title, router) {
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
        const defaults = new AppInsightsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.appInsights = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.appInsights);
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
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.exceptionTrack(x));
        this.router.events
            .pipe(this.angulartics2.filterDeveloperMode(), filter(event => event instanceof NavigationStart))
            .subscribe(event => this.startTimer());
        this.router.events
            .pipe(filter(event => event instanceof NavigationError || event instanceof NavigationEnd))
            .subscribe(error => this.stopTimer());
    }
    startTimer() {
        this.loadStartTime = Date.now();
        this.loadTime = null;
    }
    stopTimer() {
        this.loadTime = Date.now() - this.loadStartTime;
        this.loadStartTime = null;
    }
    /**
     * Page Track in Baidu Analytics
     *
     * @param path - Location 'path'
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     */
    pageTrack(path) {
        appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
    }
    /**
     * Log a user action or other occurrence.
     *
     * @param name Name to identify this event in the portal.
     * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    eventTrack(name, properties) {
        appInsights.trackEvent(name, properties, this.measurements);
    }
    /**
     * Exception Track Event in GA
     *
     * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    exceptionTrack(properties) {
        const description = properties.event || properties.description || properties;
        appInsights.trackException(description);
    }
    /**
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    setUsername(userId) {
        this.angulartics2.settings.appInsights.userId = userId;
        appInsights.setAuthenticatedUserContext(userId);
    }
    setUserProperties(properties) {
        if (properties.userId) {
            this.angulartics2.settings.appInsights.userId = properties.userId;
        }
        if (properties.accountId) {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
        }
        else {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
        }
    }
};
Angulartics2AppInsights.ctorParameters = () => [
    { type: Angulartics2 },
    { type: Title },
    { type: Router }
];
Angulartics2AppInsights.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2AppInsights_Factory() { return new Angulartics2AppInsights(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title), i0.ɵɵinject(i3.Router)); }, token: Angulartics2AppInsights, providedIn: "root" });
Angulartics2AppInsights = __decorate([
    Injectable({ providedIn: 'root' })
], Angulartics2AppInsights);
export { Angulartics2AppInsights };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwaW5zaWdodHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvYXBwaW5zaWdodHMvIiwic291cmNlcyI6WyJhcHBpbnNpZ2h0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEQsT0FBTyxFQUNMLGFBQWEsRUFDYixlQUFlLEVBQ2YsZUFBZSxFQUNmLE1BQU0sR0FDUCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUlqRSxNQUFNLE9BQU8sbUJBQW1CO0lBQWhDO1FBQ0UsV0FBTSxHQUFHLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFHRCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQVFsQyxZQUNVLFlBQTBCLEVBQzFCLEtBQVksRUFDWixNQUFjO1FBRmQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLFdBQU0sR0FBTixNQUFNLENBQVE7UUFWeEIsa0JBQWEsR0FBVyxJQUFJLENBQUM7UUFDN0IsYUFBUSxHQUFXLElBQUksQ0FBQztRQUV4QixZQUFPLEdBQStCLElBQUksQ0FBQztRQUMzQyxlQUFVLEdBQStCLElBQUksQ0FBQztRQUM5QyxpQkFBWSxHQUErQixJQUFJLENBQUM7UUFPOUMsSUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXLEVBQUU7WUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQzNDLDJDQUEyQztRQUMzQyxJQUFJLENB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Z3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtcbiAgTmF2aWdhdGlvbkVuZCxcbiAgTmF2aWdhdGlvbkVycm9yLFxuICBOYXZpZ2F0aW9uU3RhcnQsXG4gIFJvdXRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyLCBBcHBJbnNpZ2h0c1NldHRpbmdzIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSBjb25zdCBhcHBJbnNpZ2h0czogTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMuSUFwcEluc2lnaHRzO1xuXG5leHBvcnQgY2xhc3MgQXBwSW5zaWdodHNEZWZhdWx0cyBpbXBsZW1lbnRzIEFwcEluc2lnaHRzU2V0dGluZ3Mge1xuICB1c2VySWQgPSBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkFwcEluc2lnaHRzIHtcbiAgbG9hZFN0YXJ0VGltZTogbnVtYmVyID0gbnVsbDtcbiAgbG9hZFRpbWU6IG51bWJlciA9IG51bGw7XG5cbiAgbWV0cmljczogeyBbbmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSBudWxsO1xuICBkaW1lbnNpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSA9IG51bGw7XG4gIG1lYXN1cmVtZW50czogeyBbbmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIsXG4gICAgcHJpdmF0ZSB0aXRsZTogVGl0bGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgKSB7XG4gICAgaWYgKHR5cGVvZiBhcHBJbnNpZ2h0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybignYXBwSW5zaWdodHMgbm90IGZvdW5kJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdHMgPSBuZXcgQXBwSW5zaWdodHNEZWZhdWx0cygpO1xuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzZXR0aW5ncyBmb3IgdGhpcyBtb2R1bGVcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cyA9IHsgLi4uZGVmYXVsdHMsIC4uLnRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzIH07XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWVcbiAgICAgIC5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXhjZXB0aW9uVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXhjZXB0aW9uVHJhY2soeCkpO1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSxcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSxcbiAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuc3RhcnRUaW1lcigpKTtcblxuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAuc3Vic2NyaWJlKGVycm9yID0+IHRoaXMuc3RvcFRpbWVyKCkpO1xuICB9XG5cbiAgc3RhcnRUaW1lcigpIHtcbiAgICB0aGlzLmxvYWRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMubG9hZFRpbWUgPSBudWxsO1xuICB9XG5cbiAgc3RvcFRpbWVyKCkge1xuICAgIHRoaXMubG9hZFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5sb2FkU3RhcnRUaW1lO1xuICAgIHRoaXMubG9hZFN0YXJ0VGltZSA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUGFnZSBUcmFjayBpbiBCYWlkdSBBbmFseXRpY3NcbiAgICpcbiAgICogQHBhcmFtIHBhdGggLSBMb2NhdGlvbiAncGF0aCdcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9BcHBsaWNhdGlvbkluc2lnaHRzLUpTL2Jsb2IvbWFzdGVyL0FQSS1yZWZlcmVuY2UubWQjdHJhY2twYWdldmlld1xuICAgKi9cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIGFwcEluc2lnaHRzLnRyYWNrUGFnZVZpZXcoXG4gICAgICB0aGlzLnRpdGxlLmdldFRpdGxlKCksXG4gICAgICBwYXRoLFxuICAgICAgdGhpcy5kaW1lbnNpb25zLFxuICAgICAgdGhpcy5tZXRyaWNzLFxuICAgICAgdGhpcy5sb2FkVGltZSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExvZyBhIHVzZXIgYWN0aW9uIG9yIG90aGVyIG9jY3VycmVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgdG8gaWRlbnRpZnkgdGhpcyBldmVudCBpbiB0aGUgcG9ydGFsLlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBBZGRpdGlvbmFsIGRhdGEgdXNlZCB0byBmaWx0ZXIgZXZlbnRzIGFuZCBtZXRyaWNzIGluIHRoZSBwb3J0YWwuIERlZmF1bHRzIHRvIGVtcHR5LlxuICAgKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja2V2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKG5hbWU6IHN0cmluZywgcHJvcGVydGllczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgICBhcHBJbnNpZ2h0cy50cmFja0V2ZW50KG5hbWUsIHByb3BlcnRpZXMsIHRoaXMubWVhc3VyZW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGNlcHRpb24gVHJhY2sgRXZlbnQgaW4gR0FcbiAgICpcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgLSBDb21wcmlzZWQgb2YgdGhlIG1hbmRhdG9yeSBmaWVsZHMgJ2FwcElkJyAoc3RyaW5nKSwgJ2FwcE5hbWUnIChzdHJpbmcpIGFuZCAnYXBwVmVyc2lvbicgKHN0cmluZykgYW5kXG4gICAqIG9wdGlvbmFsIGZpZWxkcyAnZmF0YWwnIChib29sZWFuKSBhbmQgJ2Rlc2NyaXB0aW9uJyAoc3RyaW5nKSwgZXJyb3JcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9BcHBsaWNhdGlvbkluc2lnaHRzLUpTL2Jsb2IvbWFzdGVyL0FQSS1yZWZlcmVuY2UubWQjdHJhY2tleGNlcHRpb25cbiAgICovXG4gIGV4Y2VwdGlvblRyYWNrKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gcHJvcGVydGllcy5ldmVudCB8fCBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uIHx8IHByb3BlcnRpZXM7XG5cbiAgICBhcHBJbnNpZ2h0cy50cmFja0V4Y2VwdGlvbihkZXNjcmlwdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9BcHBsaWNhdGlvbkluc2lnaHRzLUpTL2Jsb2IvbWFzdGVyL0FQSS1yZWZlcmVuY2UubWQjc2V0YXV0aGVudGljYXRlZHVzZXJjb250ZXh0XG4gICAqL1xuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZykge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzLnVzZXJJZCA9IHVzZXJJZDtcbiAgICBhcHBJbnNpZ2h0cy5zZXRBdXRoZW50aWNhdGVkVXNlckNvbnRleHQodXNlcklkKTtcbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IFBhcnRpYWw8eyB1c2VySWQ6IHN0cmluZywgYWNjb3VudElkOiBzdHJpbmcgfT4pIHtcbiAgICBpZiAocHJvcGVydGllcy51c2VySWQpIHtcbiAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzLnVzZXJJZCA9IHByb3BlcnRpZXMudXNlcklkO1xuICAgIH1cbiAgICBpZiAocHJvcGVydGllcy5hY2NvdW50SWQpIHtcbiAgICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dChcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkLFxuICAgICAgICBwcm9wZXJ0aWVzLmFjY291bnRJZCxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dChcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==