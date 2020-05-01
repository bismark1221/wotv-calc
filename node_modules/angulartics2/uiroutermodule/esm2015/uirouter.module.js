var Angulartics2UirouterModule_1;
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking, } from 'angulartics2';
import { UIRouterTracking } from './uirouter';
let Angulartics2UirouterModule = Angulartics2UirouterModule_1 = class Angulartics2UirouterModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2UirouterModule_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: UIRouterTracking },
                Angulartics2,
            ],
        };
    }
};
Angulartics2UirouterModule = Angulartics2UirouterModule_1 = __decorate([
    NgModule({
        imports: [Angulartics2OnModule],
    })
], Angulartics2UirouterModule);
export { Angulartics2UirouterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlyb3V0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL3Vpcm91dGVybW9kdWxlLyIsInNvdXJjZXMiOlsidWlyb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsRUFFcEIsa0JBQWtCLEVBQ2xCLGtCQUFrQixHQUNuQixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFLOUMsSUFBYSwwQkFBMEIsa0NBQXZDLE1BQWEsMEJBQTBCO0lBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQ1osV0FBMEMsRUFBRTtRQUU1QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLDRCQUEwQjtZQUNwQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUU7Z0JBQ3ZELEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtnQkFDM0QsWUFBWTthQUNiO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBYlksMEJBQTBCO0lBSHRDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO0tBQ2hDLENBQUM7R0FDVywwQkFBMEIsQ0FhdEM7U0FiWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBbmd1bGFydGljczIsXG4gIEFuZ3VsYXJ0aWNzMk9uTW9kdWxlLFxuICBBbmd1bGFydGljczJTZXR0aW5ncyxcbiAgQU5HVUxBUlRJQ1MyX1RPS0VOLFxuICBSb3V0ZXJsZXNzVHJhY2tpbmcsXG59IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5pbXBvcnQgeyBVSVJvdXRlclRyYWNraW5nIH0gZnJvbSAnLi91aXJvdXRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBbmd1bGFydGljczJPbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMlVpcm91dGVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgc2V0dGluZ3M6IFBhcnRpYWw8QW5ndWxhcnRpY3MyU2V0dGluZ3M+ID0ge30sXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QW5ndWxhcnRpY3MyVWlyb3V0ZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFuZ3VsYXJ0aWNzMlVpcm91dGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQU5HVUxBUlRJQ1MyX1RPS0VOLCB1c2VWYWx1ZTogeyBzZXR0aW5ncyB9IH0sXG4gICAgICAgIHsgcHJvdmlkZTogUm91dGVybGVzc1RyYWNraW5nLCB1c2VDbGFzczogVUlSb3V0ZXJUcmFja2luZyB9LFxuICAgICAgICBBbmd1bGFydGljczIsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==