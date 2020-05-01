var Angulartics2RouterlessModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking, } from 'angulartics2';
let Angulartics2RouterlessModule = Angulartics2RouterlessModule_1 = class Angulartics2RouterlessModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2RouterlessModule_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    }
};
Angulartics2RouterlessModule = Angulartics2RouterlessModule_1 = __decorate([
    NgModule({
        imports: [Angulartics2OnModule],
    })
], Angulartics2RouterlessModule);
export { Angulartics2RouterlessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVybGVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvcm91dGVybGVzc21vZHVsZS8iLCJzb3VyY2VzIjpbInJvdXRlcmxlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFFcEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixHQUNuQixNQUFNLGNBQWMsQ0FBQztBQUt0QixJQUFhLDRCQUE0QixvQ0FBekMsTUFBYSw0QkFBNEI7SUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUEwQyxFQUFFO1FBRTVDLE9BQU87WUFDTCxRQUFRLEVBQUUsOEJBQTRCO1lBQ3RDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdkQsa0JBQWtCO2dCQUNsQixZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFiWSw0QkFBNEI7SUFIeEMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7S0FDaEMsQ0FBQztHQUNXLDRCQUE0QixDQWF4QztTQWJZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFuZ3VsYXJ0aWNzMixcbiAgQW5ndWxhcnRpY3MyT25Nb2R1bGUsXG4gIEFuZ3VsYXJ0aWNzMlNldHRpbmdzLFxuICBBTkdVTEFSVElDUzJfVE9LRU4sXG4gIFJvdXRlcmxlc3NUcmFja2luZyxcbn0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FuZ3VsYXJ0aWNzMk9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyUm91dGVybGVzc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHNldHRpbmdzOiBQYXJ0aWFsPEFuZ3VsYXJ0aWNzMlNldHRpbmdzPiA9IHt9LFxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJ0aWNzMlJvdXRlcmxlc3NNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBTkdVTEFSVElDUzJfVE9LRU4sIHVzZVZhbHVlOiB7IHNldHRpbmdzIH0gfSxcbiAgICAgICAgUm91dGVybGVzc1RyYWNraW5nLFxuICAgICAgICBBbmd1bGFydGljczIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==