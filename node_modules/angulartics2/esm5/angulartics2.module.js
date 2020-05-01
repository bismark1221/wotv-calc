import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AngularRouterTracking } from './angular-router';
import { Angulartics2 } from './angulartics2-core';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2On, Angulartics2OnModule } from './angulartics2On';
import { RouterlessTracking } from './routerless';
var Angulartics2Module = /** @class */ (function () {
    function Angulartics2Module() {
    }
    Angulartics2Module_1 = Angulartics2Module;
    Angulartics2Module.forRoot = function (settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2Module_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                { provide: RouterlessTracking, useClass: AngularRouterTracking },
                Angulartics2,
            ],
        };
    };
    var Angulartics2Module_1;
    Angulartics2Module = Angulartics2Module_1 = __decorate([
        NgModule({
            imports: [Angulartics2OnModule],
            exports: [Angulartics2On],
        })
    ], Angulartics2Module);
    return Angulartics2Module;
}());
export { Angulartics2Module };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ0aWNzMi8iLCJzb3VyY2VzIjpbImFuZ3VsYXJ0aWNzMi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBTWxEO0lBQUE7SUFhQSxDQUFDOzJCQWJZLGtCQUFrQjtJQUN0QiwwQkFBTyxHQUFkLFVBQ0UsUUFBNEM7UUFBNUMseUJBQUEsRUFBQSxhQUE0QztRQUU1QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxVQUFBLEVBQUUsRUFBRTtnQkFDdkQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO2dCQUNoRSxZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFaVSxrQkFBa0I7UUFKOUIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDL0IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQzFCLENBQUM7T0FDVyxrQkFBa0IsQ0FhOUI7SUFBRCx5QkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJSb3V0ZXJUcmFja2luZyB9IGZyb20gJy4vYW5ndWxhci1yb3V0ZXInO1xuaW1wb3J0IHsgQW5ndWxhcnRpY3MyU2V0dGluZ3MgfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMi1jb25maWcnO1xuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi9hbmd1bGFydGljczItY29yZSc7XG5pbXBvcnQgeyBBTkdVTEFSVElDUzJfVE9LRU4gfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMi10b2tlbic7XG5pbXBvcnQgeyBBbmd1bGFydGljczJPbiwgQW5ndWxhcnRpY3MyT25Nb2R1bGUgfSBmcm9tICcuL2FuZ3VsYXJ0aWNzMk9uJztcbmltcG9ydCB7IFJvdXRlcmxlc3NUcmFja2luZyB9IGZyb20gJy4vcm91dGVybGVzcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBbmd1bGFydGljczJPbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtBbmd1bGFydGljczJPbl0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KFxuICAgIHNldHRpbmdzOiBQYXJ0aWFsPEFuZ3VsYXJ0aWNzMlNldHRpbmdzPiA9IHt9LFxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFuZ3VsYXJ0aWNzMk1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhcnRpY3MyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQU5HVUxBUlRJQ1MyX1RPS0VOLCB1c2VWYWx1ZTogeyBzZXR0aW5ncyB9IH0sXG4gICAgICAgIHsgcHJvdmlkZTogUm91dGVybGVzc1RyYWNraW5nLCB1c2VDbGFzczogQW5ndWxhclJvdXRlclRyYWNraW5nIH0sXG4gICAgICAgIEFuZ3VsYXJ0aWNzMixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19