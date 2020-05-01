import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { Angulartics2, Angulartics2OnModule, ANGULARTICS2_TOKEN, RouterlessTracking, } from 'angulartics2';
var Angulartics2RouterlessModule = /** @class */ (function () {
    function Angulartics2RouterlessModule() {
    }
    Angulartics2RouterlessModule_1 = Angulartics2RouterlessModule;
    Angulartics2RouterlessModule.forRoot = function (settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2RouterlessModule_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    };
    var Angulartics2RouterlessModule_1;
    Angulartics2RouterlessModule = Angulartics2RouterlessModule_1 = __decorate([
        NgModule({
            imports: [Angulartics2OnModule],
        })
    ], Angulartics2RouterlessModule);
    return Angulartics2RouterlessModule;
}());
export { Angulartics2RouterlessModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVybGVzcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvcm91dGVybGVzc21vZHVsZS8iLCJzb3VyY2VzIjpbInJvdXRlcmxlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQ0wsWUFBWSxFQUNaLG9CQUFvQixFQUVwQixrQkFBa0IsRUFDbEIsa0JBQWtCLEdBQ25CLE1BQU0sY0FBYyxDQUFDO0FBS3RCO0lBQUE7SUFhQSxDQUFDO3FDQWJZLDRCQUE0QjtJQUNoQyxvQ0FBTyxHQUFkLFVBQ0UsUUFBNEM7UUFBNUMseUJBQUEsRUFBQSxhQUE0QztRQUU1QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLDhCQUE0QjtZQUN0QyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLEVBQUUsUUFBUSxVQUFBLEVBQUUsRUFBRTtnQkFDdkQsa0JBQWtCO2dCQUNsQixZQUFZO2FBQ2I7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFaVSw0QkFBNEI7UUFIeEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDaEMsQ0FBQztPQUNXLDRCQUE0QixDQWF4QztJQUFELG1DQUFDO0NBQUEsQUFiRCxJQWFDO1NBYlksNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQW5ndWxhcnRpY3MyLFxuICBBbmd1bGFydGljczJPbk1vZHVsZSxcbiAgQW5ndWxhcnRpY3MyU2V0dGluZ3MsXG4gIEFOR1VMQVJUSUNTMl9UT0tFTixcbiAgUm91dGVybGVzc1RyYWNraW5nLFxufSBmcm9tICdhbmd1bGFydGljczInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQW5ndWxhcnRpY3MyT25Nb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJSb3V0ZXJsZXNzTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgc2V0dGluZ3M6IFBhcnRpYWw8QW5ndWxhcnRpY3MyU2V0dGluZ3M+ID0ge30sXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QW5ndWxhcnRpY3MyUm91dGVybGVzc01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQW5ndWxhcnRpY3MyUm91dGVybGVzc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFOR1VMQVJUSUNTMl9UT0tFTiwgdXNlVmFsdWU6IHsgc2V0dGluZ3MgfSB9LFxuICAgICAgICBSb3V0ZXJsZXNzVHJhY2tpbmcsXG4gICAgICAgIEFuZ3VsYXJ0aWNzMixcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19