import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2, GoogleTagManagerSettings } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class GoogleTagManagerDefaults {
    constructor() {
        this.userId = null;
    }
}
let Angulartics2GoogleTagManager = class Angulartics2GoogleTagManager {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        // The dataLayer needs to be initialized
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer = window.dataLayer = window.dataLayer || [];
        }
        const defaults = new GoogleTagManagerDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.gtm = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.gtm);
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
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
    }
    pageTrack(path) {
        this.pushLayer({
            event: 'Page View',
            'content-name': path,
            userId: this.angulartics2.settings.gtm.userId
        });
    }
    /**
     * Send Data Layer
     *
     * @layer data layer object
     */
    pushLayer(layer) {
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer.push(layer);
        }
    }
    /**
     * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
     *
     * @param action associated with the event
     */
    eventTrack(action, properties) {
        // TODO: make interface
        //  @param {string} properties.category
        //  @param {string} [properties.label]
        //  @param {number} [properties.value]
        //  @param {boolean} [properties.noninteraction]
        // Set a default GTM category
        properties = properties || {};
        this.pushLayer(Object.assign({ event: properties.event || 'interaction', target: properties.category || 'Event', action, label: properties.label, value: properties.value, interactionType: properties.noninteraction, userId: this.angulartics2.settings.gtm.userId }, properties.gtmCustom));
    }
    /**
     * Exception Track Event in GTM
     *
     */
    exceptionTrack(properties) {
        // TODO: make interface
        //  @param {Object} properties
        //  @param {string} properties.appId
        //  @param {string} properties.appName
        //  @param {string} properties.appVersion
        //  @param {string} [properties.description]
        //  @param {boolean} [properties.fatal]
        if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
            console.error('Must be setted appId, appName and appVersion.');
            return;
        }
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.exFatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack(`Exception thrown for ${properties.appName} <${properties.appId}@${properties.appVersion}>`, {
            category: 'Exception',
            label: properties.exDescription,
        });
    }
    /**
     * Set userId for use with Universal Analytics User ID feature
     *
     * @param userId used to identify user cross-device in Google Analytics
     */
    setUsername(userId) {
        this.angulartics2.settings.gtm.userId = userId;
    }
};
Angulartics2GoogleTagManager.ctorParameters = () => [
    { type: Angulartics2 }
];
Angulartics2GoogleTagManager.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleTagManager_Factory() { return new Angulartics2GoogleTagManager(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleTagManager, providedIn: "root" });
Angulartics2GoogleTagManager = __decorate([
    Injectable({ providedIn: 'root' })
], Angulartics2GoogleTagManager);
export { Angulartics2GoogleTagManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3RtLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL2d0bS8iLCJzb3VyY2VzIjpbImd0bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFJdEUsTUFBTSxPQUFPLHdCQUF3QjtJQUFyQztRQUNFLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUFBO0FBR0QsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUFFdkMsWUFDWSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUVwQyx3Q0FBd0M7UUFDeEMsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO1lBQ2pELFNBQVMsR0FBSSxNQUFjLENBQUMsU0FBUyxHQUFJLE1BQWMsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1NBQ3pFO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hELDJDQUEyQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLG1DQUFRLFFBQVEsR0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsQ0FBQztRQUNwRixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVc7YUFDMUIsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFD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QUFDLFVBQVUsR0FBRyxFQUFFO1lBQzNHLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLEtBQUssRUFBRSxVQUFVLENBQUMsYUFBYTtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxNQUFjO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2pELENBQUM7Q0FDRixDQUFBOztZQTVHMkIsWUFBWTs7O0FBSDNCLDRCQUE0QjtJQUR4QyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDdEIsNEJBQTRCLENBK0d4QztTQS9HWSw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiwgR29vZ2xlVGFnTWFuYWdlclNldHRpbmdzIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSB2YXIgZGF0YUxheWVyOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBHb29nbGVUYWdNYW5hZ2VyRGVmYXVsdHMgaW1wbGVtZW50cyBHb29nbGVUYWdNYW5hZ2VyU2V0dGluZ3Mge1xuICB1c2VySWQgPSBudWxsO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvb2dsZVRhZ01hbmFnZXIge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgKSB7XG4gICAgLy8gVGhlIGRhdGFMYXllciBuZWVkcyB0byBiZSBpbml0aWFsaXplZFxuICAgIGlmICh0eXBlb2YgZGF0YUxheWVyICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhTGF5ZXIpIHtcbiAgICAgIGRhdGFMYXllciA9ICh3aW5kb3cgYXMgYW55KS5kYXRhTGF5ZXIgPSAod2luZG93IGFzIGFueSkuZGF0YUxheWVyIHx8IFtdO1xuICAgIH1cbiAgICBjb25zdCBkZWZhdWx0cyA9IG5ldyBHb29nbGVUYWdNYW5hZ2VyRGVmYXVsdHMoKTtcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtID0geyAuLi5kZWZhdWx0cywgLi4udGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtIH07XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWVcbiAgICAgIC5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCkge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV4Y2VwdGlvblRyYWNrKHgpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLnB1c2hMYXllcih7XG4gICAgICBldmVudDogJ1BhZ2UgVmlldycsXG4gICAgICAnY29udGVudC1uYW1lJzogcGF0aCxcbiAgICAgIHVzZXJJZDogdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtLnVzZXJJZFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgRGF0YSBMYXllclxuICAgKlxuICAgKiBAbGF5ZXIgZGF0YSBsYXllciBvYmplY3RcbiAgICovXG4gIHB1c2hMYXllcihsYXllcjogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBkYXRhTGF5ZXIgIT09ICd1bmRlZmluZWQnICYmIGRhdGFMYXllcikge1xuICAgICAgZGF0YUxheWVyLnB1c2gobGF5ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGludGVyYWN0aW9ucyB0byB0aGUgZGF0YUxheWVyLCBpLmUuIGZvciBldmVudCB0cmFja2luZyBpbiBHb29nbGUgQW5hbHl0aWNzXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XG4gICAgLy8gVE9ETzogbWFrZSBpbnRlcmZhY2VcbiAgICAvLyAgQHBhcmFtIHtzdHJpbmd9IHByb3BlcnRpZXMuY2F0ZWdvcnlcbiAgICAvLyAgQHBhcmFtIHtzdHJpbmd9IFtwcm9wZXJ0aWVzLmxhYmVsXVxuICAgIC8vICBAcGFyYW0ge251bWJlcn0gW3Byb3BlcnRpZXMudmFsdWVdXG4gICAgLy8gIEBwYXJhbSB7Ym9vbGVhbn0gW3Byb3BlcnRpZXMubm9uaW50ZXJhY3Rpb25dXG4gICAgLy8gU2V0IGEgZGVmYXVsdCBHVE0gY2F0ZWdvcnlcbiAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcblxuICAgIHRoaXMucHVzaExheWVyKHtcbiAgICAgIGV2ZW50OiBwcm9wZXJ0aWVzLmV2ZW50IHx8ICdpbnRlcmFjdGlvbicsXG4gICAgICB0YXJnZXQ6IHByb3BlcnRpZXMuY2F0ZWdvcnkgfHwgJ0V2ZW50JyxcbiAgICAgIGFjdGlvbixcbiAgICAgIGxhYmVsOiBwcm9wZXJ0aWVzLmxhYmVsLFxuICAgICAgdmFsdWU6IHByb3BlcnRpZXMudmFsdWUsXG4gICAgICBpbnRlcmFjdGlvblR5cGU6IHByb3BlcnRpZXMubm9uaW50ZXJhY3Rpb24sXG4gICAgICB1c2VySWQ6IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmd0bS51c2VySWQsXG4gICAgICAuLi5wcm9wZXJ0aWVzLmd0bUN1c3RvbVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHVE1cbiAgICpcbiAgICovXG4gIGV4Y2VwdGlvblRyYWNrKHByb3BlcnRpZXM6IGFueSkge1xuICAgIC8vIFRPRE86IG1ha2UgaW50ZXJmYWNlXG4gICAgLy8gIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzXG4gICAgLy8gIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0aWVzLmFwcElkXG4gICAgLy8gIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0aWVzLmFwcE5hbWVcbiAgICAvLyAgQHBhcmFtIHtzdHJpbmd9IHByb3BlcnRpZXMuYXBwVmVyc2lvblxuICAgIC8vICBAcGFyYW0ge3N0cmluZ30gW3Byb3BlcnRpZXMuZGVzY3JpcHRpb25dXG4gICAgLy8gIEBwYXJhbSB7Ym9vbGVhbn0gW3Byb3BlcnRpZXMuZmF0YWxdXG4gICAgaWYgKCEgcHJvcGVydGllcyB8fCAhIHByb3BlcnRpZXMuYXBwSWQgfHwgISBwcm9wZXJ0aWVzLmFwcE5hbWUgfHwgISBwcm9wZXJ0aWVzLmFwcFZlcnNpb24pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ011c3QgYmUgc2V0dGVkIGFwcElkLCBhcHBOYW1lIGFuZCBhcHBWZXJzaW9uLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzLmZhdGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdObyBcImZhdGFsXCIgcHJvdmlkZWQsIHNlbmRpbmcgd2l0aCBmYXRhbD10cnVlJyk7XG4gICAgICBwcm9wZXJ0aWVzLmV4RmF0YWwgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXMuZXhEZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZXZlbnQgPyBwcm9wZXJ0aWVzLmV2ZW50LnN0YWNrIDogcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcblxuICAgIHRoaXMuZXZlbnRUcmFjayhgRXhjZXB0aW9uIHRocm93biBmb3IgJHtwcm9wZXJ0aWVzLmFwcE5hbWV9IDwke3Byb3BlcnRpZXMuYXBwSWR9QCR7cHJvcGVydGllcy5hcHBWZXJzaW9ufT5gLCB7XG4gICAgICBjYXRlZ29yeTogJ0V4Y2VwdGlvbicsXG4gICAgICBsYWJlbDogcHJvcGVydGllcy5leERlc2NyaXB0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1c2VySWQgZm9yIHVzZSB3aXRoIFVuaXZlcnNhbCBBbmFseXRpY3MgVXNlciBJRCBmZWF0dXJlXG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWQgdXNlZCB0byBpZGVudGlmeSB1c2VyIGNyb3NzLWRldmljZSBpbiBHb29nbGUgQW5hbHl0aWNzXG4gICAqL1xuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZykge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmd0bS51c2VySWQgPSB1c2VySWQ7XG4gIH1cbn1cbiJdfQ==