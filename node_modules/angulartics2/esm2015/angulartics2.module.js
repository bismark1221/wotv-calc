var Angulartics2Module_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AngularRouterTracking } from './angular-router';
import { Angulartics2 } from './angulartics2-core';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2On, Angulartics2OnModule } from './angulartics2On';
import { RouterlessTracking } from './routerless';
let Angulartics2Module = Angulartics2Module_1 = class Angulartics2Module {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2Module_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: AngularRouterTracking },
                Angulartics2,
            ],
        };
    }
};
Angulartics2Module = Angulartics2Module_1 = __decorate([
    NgModule({
        imports: [Angulartics2OnModule],
        exports: [Angulartics2On],
    })
], Angulartics2Module);
export { Angulartics2Module };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ0aWNzMi8iLCJzb3VyY2VzIjpbImFuZ3VsYXJ0aWNzMi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQU1sRCxJQUFhLGtCQUFrQiwwQkFBL0IsTUFBYSxrQkFBa0I7SUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FDWixXQUEwQyxFQUFFO1FBRTVDLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDdkQsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFO2dCQUNoRSxZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFiWSxrQkFBa0I7SUFKOUIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7UUFDL0IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO0tBQzFCLENBQUM7R0FDVyxrQkFBa0IsQ0FhOUI7U0FiWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFyUm91dGVyVHJhY2tpbmcgfSBmcm9tICcuL2FuZ3VsYXItcm91dGVyJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMlNldHRpbmdzIH0gZnJvbSAnLi9hbmd1bGFydGljczItY29uZmlnJztcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvcmUnO1xuaW1wb3J0IHsgQU5HVUxBUlRJQ1MyX1RPS0VOIH0gZnJvbSAnLi9hbmd1bGFydGljczItdG9rZW4nO1xuaW1wb3J0IHsgQW5ndWxhcnRpY3MyT24sIEFuZ3VsYXJ0aWNzMk9uTW9kdWxlIH0gZnJvbSAnLi9hbmd1bGFydGljczJPbic7XG5pbXBvcnQgeyBSb3V0ZXJsZXNzVHJhY2tpbmcgfSBmcm9tICcuL3JvdXRlcmxlc3MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQW5ndWxhcnRpY3MyT25Nb2R1bGVdLFxuICBleHBvcnRzOiBbQW5ndWxhcnRpY3MyT25dLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChcbiAgICBzZXR0aW5nczogUGFydGlhbDxBbmd1bGFydGljczJTZXR0aW5ncz4gPSB7fSxcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBbmd1bGFydGljczJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJ0aWNzMk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFOR1VMQVJUSUNTMl9UT0tFTiwgdXNlVmFsdWU6IHsgc2V0dGluZ3MgfSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFJvdXRlcmxlc3NUcmFja2luZywgdXNlQ2xhc3M6IEFuZ3VsYXJSb3V0ZXJUcmFja2luZyB9LFxuICAgICAgICBBbmd1bGFydGljczIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==