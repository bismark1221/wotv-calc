import { __decorate } from "tslib";
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
let AngularRouterTracking = class AngularRouterTracking {
    constructor(router, location) {
        this.router = router;
        this.location = location;
    }
    trackLocation(settings) {
        return this.router.events.pipe(filter(e => e instanceof NavigationEnd), filter(() => !settings.developerMode), map((e) => {
            return { url: e.urlAfterRedirects };
        }), delay(0));
    }
    prepareExternalUrl(url) {
        return this.location.prepareExternalUrl(url);
    }
};
AngularRouterTracking.ctorParameters = () => [
    { type: Router },
    { type: Location }
];
AngularRouterTracking.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularRouterTracking_Factory() { return new AngularRouterTracking(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.Location)); }, token: AngularRouterTracking, providedIn: "root" });
AngularRouterTracking = __decorate([
    Injectable({ providedIn: 'root' })
], AngularRouterTracking);
export { AngularRouterTracking };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yb3V0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvIiwic291cmNlcyI6WyJhbmd1bGFyLXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUtwRDs7Ozs7R0FLRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBQ2hDLFlBQ1UsTUFBYyxFQUNkLFFBQWtCO1FBRGxCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQ3pCLENBQUM7SUFFSixhQUFhLENBQUMsUUFBUTtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLGFBQWEsQ0FBQyxFQUN2QyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQWdCLEVBQUUsRUFBRTtZQUN2QixPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxFQUNGLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVc7UUFDNUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDRixDQUFBOztZQWxCbUIsTUFBTTtZQUNKLFFBQVE7OztBQUhqQixxQkFBcUI7SUFEakMsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO0dBQ3RCLHFCQUFxQixDQW9CakM7U0FwQlkscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgZGVsYXksIGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSb3V0ZXJsZXNzVHJhY2tpbmcsIFRyYWNrTmF2aWdhdGlvbkVuZCB9IGZyb20gJy4vcm91dGVybGVzcyc7XG5cbi8qKlxuICogVHJhY2sgUm91dGUgY2hhbmdlcyBmb3IgYXBwbGljYXRpb25zIHVzaW5nIEFuZ3VsYXInc1xuICogZGVmYXVsdCByb3V0ZXJcbiAqXG4gKiBAbGluayBodHRwczovL2FuZ3VsYXIuaW8vYXBpL3JvdXRlci9Sb3V0ZXJcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyUm91dGVyVHJhY2tpbmcgaW1wbGVtZW50cyBSb3V0ZXJsZXNzVHJhY2tpbmcge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICApIHt9XG5cbiAgdHJhY2tMb2NhdGlvbihzZXR0aW5ncyk6IE9ic2VydmFibGU8VHJhY2tOYXZpZ2F0aW9uRW5kPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmV2ZW50cy5waXBlKFxuICAgICAgZmlsdGVyKGUgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgZmlsdGVyKCgpID0+ICFzZXR0aW5ncy5kZXZlbG9wZXJNb2RlKSxcbiAgICAgIG1hcCgoZTogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICByZXR1cm4geyB1cmw6IGUudXJsQWZ0ZXJSZWRpcmVjdHMgfTtcbiAgICAgIH0pLFxuICAgICAgZGVsYXkoMCksXG4gICAgKTtcbiAgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24ucHJlcGFyZUV4dGVybmFsVXJsKHVybCk7XG4gIH1cbn1cbiJdfQ==