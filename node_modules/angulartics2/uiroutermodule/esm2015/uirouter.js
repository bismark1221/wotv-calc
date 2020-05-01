import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Transition, TransitionService } from '@uirouter/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@uirouter/core";
/**
 * Track Route changes for applications using UI-Router
 *
 * @link https://ui-router.github.io/ng2/docs/latest/
 *
 * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
 */
let UIRouterTracking = class UIRouterTracking {
    constructor(transitionService) {
        this.transitionService = transitionService;
    }
    path(trans) {
        return trans.$to().url.format(trans.params());
    }
    trackLocation(settings) {
        const subject = new Subject();
        this.transitionService.onSuccess({}, trans => {
            return subject.next({ url: this.path(trans) });
        }, {
            priority: -10000,
        });
        return subject;
    }
    prepareExternalUrl(url) {
        return url;
    }
};
UIRouterTracking.ctorParameters = () => [
    { type: TransitionService }
];
UIRouterTracking.ɵprov = i0.ɵɵdefineInjectable({ factory: function UIRouterTracking_Factory() { return new UIRouterTracking(i0.ɵɵinject(i1.TransitionService)); }, token: UIRouterTracking, providedIn: "root" });
UIRouterTracking = __decorate([
    Injectable({ providedIn: 'root' })
], UIRouterTracking);
export { UIRouterTracking };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlyb3V0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvdWlyb3V0ZXJtb2R1bGUvIiwic291cmNlcyI6WyJ1aXJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSTNDOzs7Ozs7R0FNRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQW9CLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQUcsQ0FBQztJQUU1RCxJQUFJLENBQUMsS0FBaUI7UUFDcEIsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsYUFBYSxDQUFDLFFBQVE7UUFDcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFDbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FDOUIsRUFBRSxFQUNGLEtBQUssQ0FBQyxFQUFFO1lBQ04sT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFDRDtZQUNFLFFBQVEsRUFBRSxDQUFDLEtBQUs7U0FDakIsQ0FDRixDQUFDO1FBQ0YsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVELGtCQUFrQixDQUFDLEdBQVc7UUFDNUIsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQTs7WUF2QndDLGlCQUFpQjs7O0FBRDdDLGdCQUFnQjtJQUQ1QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDdEIsZ0JBQWdCLENBd0I1QjtTQXhCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2l0aW9uLCBUcmFuc2l0aW9uU2VydmljZSB9IGZyb20gJ0B1aXJvdXRlci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBSb3V0ZXJsZXNzVHJhY2tpbmcsIFRyYWNrTmF2aWdhdGlvbkVuZCB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cbi8qKlxuICogVHJhY2sgUm91dGUgY2hhbmdlcyBmb3IgYXBwbGljYXRpb25zIHVzaW5nIFVJLVJvdXRlclxuICpcbiAqIEBsaW5rIGh0dHBzOi8vdWktcm91dGVyLmdpdGh1Yi5pby9uZzIvZG9jcy9sYXRlc3QvXG4gKlxuICogcmVmZXJlbmNlZDogaHR0cHM6Ly9naXRodWIuY29tL3VpLXJvdXRlci9zYW1wbGUtYXBwLWFuZ3VsYXIvYmxvYi85YWRiNTMzYjg1YzBmMGZjY2VmMjM5Njg0ODljY2EwYTVlYzg0NjU0L3NyYy9hcHAvdXRpbC9nYS50c1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFVJUm91dGVyVHJhY2tpbmcgaW1wbGVtZW50cyBSb3V0ZXJsZXNzVHJhY2tpbmcge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zaXRpb25TZXJ2aWNlOiBUcmFuc2l0aW9uU2VydmljZSkge31cblxuICBwYXRoKHRyYW5zOiBUcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuIHRyYW5zLiR0bygpLnVybC5mb3JtYXQodHJhbnMucGFyYW1zKCkpO1xuICB9XG5cbiAgdHJhY2tMb2NhdGlvbihzZXR0aW5ncyk6IE9ic2VydmFibGU8VHJhY2tOYXZpZ2F0aW9uRW5kPiB7XG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0PFRyYWNrTmF2aWdhdGlvbkVuZD4oKTtcbiAgICB0aGlzLnRyYW5zaXRpb25TZXJ2aWNlLm9uU3VjY2VzcyhcbiAgICAgIHt9LFxuICAgICAgdHJhbnMgPT4ge1xuICAgICAgICByZXR1cm4gc3ViamVjdC5uZXh0KHsgdXJsOiB0aGlzLnBhdGgodHJhbnMpIH0pO1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHJpb3JpdHk6IC0xMDAwMCxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gc3ViamVjdDtcbiAgfVxuXG4gIHByZXBhcmVFeHRlcm5hbFVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxufVxuIl19