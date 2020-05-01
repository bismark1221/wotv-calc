import { __assign, __values, __decorate, __param } from 'tslib';
import { InjectionToken, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, ElementRef, Renderer2, Input, Directive, NgModule } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, map, delay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

var DefaultConfig = /** @class */ (function () {
    function DefaultConfig() {
        this.pageTracking = {
            autoTrackVirtualPages: true,
            basePath: '',
            excludedRoutes: [],
            clearIds: false,
            clearHash: false,
            clearQueryParams: false,
            idsRegExp: /^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        };
        this.developerMode = false;
        this.ga = {};
        this.appInsights = {};
        this.gtm = {};
        this.gst = {};
    }
    return DefaultConfig;
}());

var ANGULARTICS2_TOKEN = new InjectionToken('ANGULARTICS2');

var RouterlessTracking = /** @class */ (function () {
    function RouterlessTracking() {
    }
    RouterlessTracking.prototype.trackLocation = function (settings) {
        return new BehaviorSubject({ url: '/' });
    };
    RouterlessTracking.prototype.prepareExternalUrl = function (url) {
        return url;
    };
    return RouterlessTracking;
}());

var Angulartics2 = /** @class */ (function () {
    function Angulartics2(tracker, setup) {
        var _this = this;
        this.tracker = tracker;
        this.pageTrack = new ReplaySubject(10);
        this.eventTrack = new ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject(10);
        this.setAlias = new ReplaySubject(10);
        this.setUsername = new ReplaySubject(10);
        this.setUserProperties = new ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject(10);
        this.userTimings = new ReplaySubject(10);
        var defaultConfig = new DefaultConfig();
        this.settings = __assign(__assign({}, defaultConfig), setup.settings);
        this.settings.pageTracking = __assign(__assign({}, defaultConfig.pageTracking), setup.settings.pageTracking);
        this.tracker
            .trackLocation(this.settings)
            .subscribe(function (event) {
            return _this.trackUrlChange(event.url);
        });
    }
    /** filters all events when developer mode is true */
    Angulartics2.prototype.filterDeveloperMode = function () {
        var _this = this;
        return filter(function (value, index) { return !_this.settings.developerMode; });
    };
    Angulartics2.prototype.trackUrlChange = function (url) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            var clearedUrl = this.clearUrl(url);
            var path = void 0;
            if (this.settings.pageTracking.basePath.length) {
                path = this.settings.pageTracking.basePath + clearedUrl;
            }
            else {
                path = this.tracker.prepareExternalUrl(clearedUrl);
            }
            this.pageTrack.next({ path: path });
        }
    };
    /**
     * Use string literals or regular expressions to exclude routes
     * from automatic pageview tracking.
     *
     * @param url location
     */
    Angulartics2.prototype.matchesExcludedRoute = function (url) {
        var e_1, _a;
        try {
            for (var _b = __values(this.settings.pageTracking.excludedRoutes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var excludedRoute = _c.value;
                var matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
                if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * Removes id's from tracked route.
     *  EX: `/project/12981/feature` becomes `/project/feature`
     *
     * @param url current page path
     */
    Angulartics2.prototype.clearUrl = function (url) {
        var _this = this;
        if (this.settings.pageTracking.clearIds || this.settings.pageTracking.clearQueryParams ||
            this.settings.pageTracking.clearHash) {
            return url
                .split('/')
                .map(function (part) { return _this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part; })
                .map(function (part) { return _this.settings.pageTracking.clearHash ? part.split('#')[0] : part; })
                .filter(function (part) { return !_this.settings.pageTracking.clearIds || !part.match(_this.settings.pageTracking.idsRegExp); })
                .join('/');
        }
        return url;
    };
    Angulartics2.ctorParameters = function () { return [
        { type: RouterlessTracking },
        { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] }] }
    ]; };
    Angulartics2.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2_Factory() { return new Angulartics2(ɵɵinject(RouterlessTracking), ɵɵinject(ANGULARTICS2_TOKEN)); }, token: Angulartics2, providedIn: "root" });
    Angulartics2 = __decorate([
        Injectable({ providedIn: 'root' }),
        __param(1, Inject(ANGULARTICS2_TOKEN))
    ], Angulartics2);
    return Angulartics2;
}());

/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
var AngularRouterTracking = /** @class */ (function () {
    function AngularRouterTracking(router, location) {
        this.router = router;
        this.location = location;
    }
    AngularRouterTracking.prototype.trackLocation = function (settings) {
        return this.router.events.pipe(filter(function (e) { return e instanceof NavigationEnd; }), filter(function () { return !settings.developerMode; }), map(function (e) {
            return { url: e.urlAfterRedirects };
        }), delay(0));
    };
    AngularRouterTracking.prototype.prepareExternalUrl = function (url) {
        return this.location.prepareExternalUrl(url);
    };
    AngularRouterTracking.ctorParameters = function () { return [
        { type: Router },
        { type: Location }
    ]; };
    AngularRouterTracking.ɵprov = ɵɵdefineInjectable({ factory: function AngularRouterTracking_Factory() { return new AngularRouterTracking(ɵɵinject(Router), ɵɵinject(Location)); }, token: AngularRouterTracking, providedIn: "root" });
    AngularRouterTracking = __decorate([
        Injectable({ providedIn: 'root' })
    ], AngularRouterTracking);
    return AngularRouterTracking;
}());

var Angulartics2On = /** @class */ (function () {
    function Angulartics2On(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    Angulartics2On.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
    };
    Angulartics2On.prototype.eventTrack = function (event) {
        var action = this.angularticsAction; // || this.inferEventName();
        var properties = __assign(__assign({}, this.angularticsProperties), { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action: action,
            properties: properties,
        });
    };
    Angulartics2On.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Angulartics2 },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input('angulartics2On')
    ], Angulartics2On.prototype, "angulartics2On", void 0);
    __decorate([
        Input()
    ], Angulartics2On.prototype, "angularticsAction", void 0);
    __decorate([
        Input()
    ], Angulartics2On.prototype, "angularticsCategory", void 0);
    __decorate([
        Input()
    ], Angulartics2On.prototype, "angularticsLabel", void 0);
    __decorate([
        Input()
    ], Angulartics2On.prototype, "angularticsValue", void 0);
    __decorate([
        Input()
    ], Angulartics2On.prototype, "angularticsProperties", void 0);
    Angulartics2On = __decorate([
        Directive({ selector: '[angulartics2On]' })
    ], Angulartics2On);
    return Angulartics2On;
}());
var Angulartics2OnModule = /** @class */ (function () {
    function Angulartics2OnModule() {
    }
    Angulartics2OnModule = __decorate([
        NgModule({
            declarations: [Angulartics2On],
            exports: [Angulartics2On],
        })
    ], Angulartics2OnModule);
    return Angulartics2OnModule;
}());

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

/**
 * Generated bundle index. Do not edit.
 */

export { ANGULARTICS2_TOKEN, AngularRouterTracking, Angulartics2, Angulartics2Module, Angulartics2On, Angulartics2OnModule, DefaultConfig, RouterlessTracking };
//# sourceMappingURL=angulartics2.js.map
