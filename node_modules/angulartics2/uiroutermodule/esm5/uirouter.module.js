import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking, } from 'angulartics2';
import { UIRouterTracking } from './uirouter';
var Angulartics2UirouterModule = /** @class */ (function () {
    function Angulartics2UirouterModule() {
    }
    Angulartics2UirouterModule_1 = Angulartics2UirouterModule;
    Angulartics2UirouterModule.forRoot = function (settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2UirouterModule_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                { provide: RouterlessTracking, useClass: UIRouterTracking },
                Angulartics2,
            ],
        };
    };
    var Angulartics2UirouterModule_1;
    Angulartics2UirouterModule = Angulartics2UirouterModule_1 = __decorate([
        NgModule({
            imports: [Angulartics2OnModule],
        })
    ], Angulartics2UirouterModule);
    return Angulartics2UirouterModule;
}());
export { Angulartics2UirouterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlyb3V0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL3Vpcm91dGVybW9kdWxlLyIsInNvdXJjZXMiOlsidWlyb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQ0wsWUFBWSxFQUNaLG9CQUFvQixFQUVwQixrQkFBa0IsRUFDbEIsa0JBQWtCLEdBQ25CLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUs5QztJQUFBO0lBYUEsQ0FBQzttQ0FiWSwwQkFBMEI7SUFDOUIsa0NBQU8sR0FBZCxVQUNFLFFBQTRDO1FBQTVDLHlCQUFBLEVBQUEsYUFBNEM7UUFFNUMsT0FBTztZQUNMLFFBQVEsRUFBRSw0QkFBMEI7WUFDcEMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxFQUFFLFFBQVEsVUFBQSxFQUFFLEVBQUU7Z0JBQ3ZELEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtnQkFDM0QsWUFBWTthQUNiO1NBQ0YsQ0FBQztJQUNKLENBQUM7O0lBWlUsMEJBQTBCO1FBSHRDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO1NBQ2hDLENBQUM7T0FDVywwQkFBMEIsQ0FhdEM7SUFBRCxpQ0FBQztDQUFBLEFBYkQsSUFhQztTQWJZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFuZ3VsYXJ0aWNzMixcbiAgQW5ndWxhcnRpY3MyT25Nb2R1bGUsXG4gIEFuZ3VsYXJ0aWNzMlNldHRpbmdzLFxuICBBTkdVTEFSVElDUzJfVE9LRU4sXG4gIFJvdXRlcmxlc3NUcmFja2luZyxcbn0gZnJvbSAnYW5ndWxhcnRpY3MyJztcbmltcG9ydCB7IFVJUm91dGVyVHJhY2tpbmcgfSBmcm9tICcuL3Vpcm91dGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0FuZ3VsYXJ0aWNzMk9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyVWlyb3V0ZXJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBzZXR0aW5nczogUGFydGlhbDxBbmd1bGFydGljczJTZXR0aW5ncz4gPSB7fSxcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBbmd1bGFydGljczJVaXJvdXRlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhcnRpY3MyVWlyb3V0ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBBTkdVTEFSVElDUzJfVE9LRU4sIHVzZVZhbHVlOiB7IHNldHRpbmdzIH0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBSb3V0ZXJsZXNzVHJhY2tpbmcsIHVzZUNsYXNzOiBVSVJvdXRlclRyYWNraW5nIH0sXG4gICAgICAgIEFuZ3VsYXJ0aWNzMixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19