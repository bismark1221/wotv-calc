import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
let Angulartics2Pyze = class Angulartics2Pyze {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe((x) => this.setUserId(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.postTraits(x));
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
        try {
            Pyze.postPageView('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            PyzeEvents.postCustomEventWithAttributes(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserId(userId) {
        try {
            PyzeIdentity.setUserIdentifier(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    postTraits(properties) {
        try {
            PyzeIdentity.postTraits(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
};
Angulartics2Pyze.ctorParameters = () => [
    { type: Angulartics2 }
];
Angulartics2Pyze.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Pyze_Factory() { return new Angulartics2Pyze(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Pyze, providedIn: "root" });
Angulartics2Pyze = __decorate([
    Injectable({ providedIn: 'root' })
], Angulartics2Pyze);
export { Angulartics2Pyze };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHl6ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ0aWNzMi9weXplLyIsInNvdXJjZXMiOlsicHl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFRNUMsSUFBYyxnQkFBZ0IsR0FBOUIsTUFBYyxnQkFBZ0I7SUFFMUIsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDbEIsSUFBSTtZQUNBLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLENBQUM7YUFDUDtTQUNKO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBZTtRQUN0QyxJQUFJO1lBQ0EsVUFBVSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLENBQUMsQ0FBQzthQUNQO1NBQ0o7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSTtZQUNBLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUgsVUFBVSxDQUFDLFVBQWtCO1FBQ3pCLElBQUk7WUFDQSxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUNMLENBQUM7Q0FDSixDQUFBOztZQXJEcUMsWUFBWTs7O0FBRnBDLGdCQUFnQjtJQUQ3QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDckIsZ0JBQWdCLENBdUQ3QjtTQXZEYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cbmRlY2xhcmUgdmFyIFB5emU6IGFueTtcbmRlY2xhcmUgdmFyIFB5emVFdmVudHM6IGFueTtcbmRlY2xhcmUgdmFyIFB5emVJZGVudGl0eTogYW55O1xuXG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgIEFuZ3VsYXJ0aWNzMlB5emUge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMikge1xuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZS5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VySWQoeCkpO1xuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoKHgpID0+IHRoaXMucG9zdFRyYWl0cyh4KSk7XG4gICAgfVxuXG4gICAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gICAgfVxuXG4gICAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHl6ZS5wb3N0UGFnZVZpZXcoJ1BhZ2UgVmlld2VkJywgeyBwYWdlOiBwYXRoIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBQeXplRXZlbnRzLnBvc3RDdXN0b21FdmVudFdpdGhBdHRyaWJ1dGVzKGFjdGlvbiwgcHJvcGVydGllcyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRVc2VySWQodXNlcklkOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFB5emVJZGVudGl0eS5zZXRVc2VySWRlbnRpZmllcih1c2VySWQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIHBvc3RUcmFpdHMocHJvcGVydGllczogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBQeXplSWRlbnRpdHkucG9zdFRyYWl0cyhwcm9wZXJ0aWVzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19