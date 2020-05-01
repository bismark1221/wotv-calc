import { __decorate } from "tslib";
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
import * as i2 from "@angular/common";
let Angulartics2AdobeAnalytics = class Angulartics2AdobeAnalytics {
    constructor(angulartics2, location) {
        this.angulartics2 = angulartics2;
        this.location = location;
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
    pageTrack(path) {
        if (typeof s !== 'undefined' && s) {
            s.clearVars();
            s.t({ pageName: path });
        }
    }
    /**
     * Track Event in Adobe Analytics
     *
     * @param action associated with the event
     * @param properties action detials
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    eventTrack(action, properties) {
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
                const linkName = (properties['linkName']) ? properties['linkName'] : action;
                // note that 'this' should refer the link element, but we can't get that in this function. example:
                // <a href="http://anothersite.com" onclick="s.tl(this,'e','AnotherSite',null)">
                // if disableDelay property is passed, use that to turn off/on the 500ms delay; otherwise, it uses this
                const disableDelay = !!properties['disableDelay'] ? true : this;
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
    }
    setPageName() {
        const path = this.location.path(true);
        const hashNdx = path.indexOf('#');
        if (hashNdx > 0 && hashNdx < path.length) {
            s.pageName = path.substring(hashNdx + 1);
        }
        else {
            s.pageName = path;
        }
    }
    setUserProperties(properties) {
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                for (const key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        s[key] = properties[key];
                    }
                }
            }
        }
    }
};
Angulartics2AdobeAnalytics.ctorParameters = () => [
    { type: Angulartics2 },
    { type: Location }
];
Angulartics2AdobeAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2AdobeAnalytics_Factory() { return new Angulartics2AdobeAnalytics(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Location)); }, token: Angulartics2AdobeAnalytics, providedIn: "root" });
Angulartics2AdobeAnalytics = __decorate([
    Injectable({ providedIn: 'root' })
], Angulartics2AdobeAnalytics);
export { Angulartics2AdobeAnalytics };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRvYmVhbmFseXRpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvYWRvYmVhbmFseXRpY3MvIiwic291cmNlcyI6WyJhZG9iZWFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUs1QyxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQUVyQyxZQUNVLFlBQTBCLEVBQzFCLFFBQWtCO1FBRGxCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7YUFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMv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cUJBQzFCO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOztZQTFGeUIsWUFBWTtZQUNoQixRQUFROzs7QUFKakIsMEJBQTBCO0lBRHRDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUN0QiwwQkFBMEIsQ0E2RnRDO1NBN0ZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSBjb25zdCBzOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQWRvYmVBbmFseXRpY3Mge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICkge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcykge1xuICAgICAgcy5jbGVhclZhcnMoKTtcbiAgICAgIHMudCh7cGFnZU5hbWU6IHBhdGh9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhY2sgRXZlbnQgaW4gQWRvYmUgQW5hbHl0aWNzXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBhY3Rpb24gZGV0aWFsc1xuICAgKlxuICAgKiBAbGluayBodHRwczovL21hcmtldGluZy5hZG9iZS5jb20vcmVzb3VyY2VzL2hlbHAvZW5fVVMvc2MvaW1wbGVtZW50L2pzX2ltcGxlbWVudGF0aW9uLmh0bWxcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgIC8vIFRPRE86IG1ha2UgaW50ZXJmYWNlXG4gICAgLy8gQHByb3BlcnR5IHtzdHJpbmd9IHByb3BlcnRpZXMuY2F0ZWdvcnlcbiAgICAvLyBAcHJvcGVydHkge3N0cmluZ30gcHJvcGVydGllcy5sYWJlbFxuICAgIC8vIEBwcm9wZXJ0eSB7bnVtYmVyfSBwcm9wZXJ0aWVzLnZhbHVlXG4gICAgLy8gQHByb3BlcnR5IHtib29sZWFufSBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uXG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHMgIT09ICd1bmRlZmluZWQnICYmIHMpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhpcy5zZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24pIHtcbiAgICAgICAgLy8gaWYgbGlua05hbWUgcHJvcGVydHkgaXMgcGFzc2VkLCB1c2UgdGhhdDsgb3RoZXJ3aXNlLCB0aGUgYWN0aW9uIGlzIHRoZSBsaW5rTmFtZVxuICAgICAgICBjb25zdCBsaW5rTmFtZSA9IChwcm9wZXJ0aWVzWydsaW5rTmFtZSddKSA/IHByb3BlcnRpZXNbJ2xpbmtOYW1lJ10gOiBhY3Rpb247XG4gICAgICAgIC8vIG5vdGUgdGhhdCAndGhpcycgc2hvdWxkIHJlZmVyIHRoZSBsaW5rIGVsZW1lbnQsIGJ1dCB3ZSBjYW4ndCBnZXQgdGhhdCBpbiB0aGlzIGZ1bmN0aW9uLiBleGFtcGxlOlxuICAgICAgICAvLyA8YSBocmVmPVwiaHR0cDovL2Fub3RoZXJzaXRlLmNvbVwiIG9uY2xpY2s9XCJzLnRsKHRoaXMsJ2UnLCdBbm90aGVyU2l0ZScsbnVsbClcIj5cbiAgICAgICAgLy8gaWYgZGlzYWJsZURlbGF5IHByb3BlcnR5IGlzIHBhc3NlZCwgdXNlIHRoYXQgdG8gdHVybiBvZmYvb24gdGhlIDUwMG1zIGRlbGF5OyBvdGhlcndpc2UsIGl0IHVzZXMgdGhpc1xuICAgICAgICBjb25zdCBkaXNhYmxlRGVsYXkgPSAhIXByb3BlcnRpZXNbJ2Rpc2FibGVEZWxheSddID8gdHJ1ZSA6IHRoaXM7XG4gICAgICAgIC8vIGlmIGFjdGlvbiBwcm9wZXJ0eSBpcyBwYXNzZWQsIHVzZSB0aGF0OyBvdGhlcndpc2UsIHRoZSBhY3Rpb24gcmVtYWlucyB1bmNoYW5nZWRcbiAgICAgICAgaWYgKHByb3BlcnRpZXNbJ2FjdGlvbiddKSB7XG4gICAgICAgICAgYWN0aW9uID0gcHJvcGVydGllc1snYWN0aW9uJ107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQYWdlTmFtZSgpO1xuXG4gICAgICAgIGlmIChhY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gJ0RPV05MT0FEJykge1xuICAgICAgICAgIHMudGwoZGlzYWJsZURlbGF5LCAnZCcsIGxpbmtOYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gJ0VYSVQnKSB7XG4gICAgICAgICAgcy50bChkaXNhYmxlRGVsYXksICdlJywgbGlua05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHMudGwoZGlzYWJsZURlbGF5LCAnbycsIGxpbmtOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UGFnZU5hbWUoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMubG9jYXRpb24ucGF0aCh0cnVlKTtcbiAgICBjb25zdCBoYXNoTmR4ID0gcGF0aC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2hOZHggPiAwICYmIGhhc2hOZHggPCBwYXRoLmxlbmd0aCkge1xuICAgICAgcy5wYWdlTmFtZSA9IHBhdGguc3Vic3RyaW5nKGhhc2hOZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcy5wYWdlTmFtZSA9IHBhdGg7XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzICE9PSAndW5kZWZpbmVkJyAmJiBzKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BlcnRpZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=