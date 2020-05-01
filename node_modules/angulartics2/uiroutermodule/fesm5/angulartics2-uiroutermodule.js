import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, NgModule } from '@angular/core';
import { ANGULARTICS2_TOKEN, RouterlessTracking, Angulartics2, Angulartics2OnModule } from 'angulartics2';
import { TransitionService } from '@uirouter/core';
import { Subject } from 'rxjs';

/**
 * Track Route changes for applications using UI-Router
 *
 * @link https://ui-router.github.io/ng2/docs/latest/
 *
 * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
 */
var UIRouterTracking = /** @class */ (function () {
    function UIRouterTracking(transitionService) {
        this.transitionService = transitionService;
    }
    UIRouterTracking.prototype.path = function (trans) {
        return trans.$to().url.format(trans.params());
    };
    UIRouterTracking.prototype.trackLocation = function (settings) {
        var _this = this;
        var subject = new Subject();
        this.transitionService.onSuccess({}, function (trans) {
            return subject.next({ url: _this.path(trans) });
        }, {
            priority: -10000,
        });
        return subject;
    };
    UIRouterTracking.prototype.prepareExternalUrl = function (url) {
        return url;
    };
    UIRouterTracking.ctorParameters = function () { return [
        { type: TransitionService }
    ]; };
    UIRouterTracking.ɵprov = ɵɵdefineInjectable({ factory: function UIRouterTracking_Factory() { return new UIRouterTracking(ɵɵinject(TransitionService)); }, token: UIRouterTracking, providedIn: "root" });
    UIRouterTracking = __decorate([
        Injectable({ providedIn: 'root' })
    ], UIRouterTracking);
    return UIRouterTracking;
}());

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

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2UirouterModule, UIRouterTracking };
//# sourceMappingURL=angulartics2-uiroutermodule.js.map
