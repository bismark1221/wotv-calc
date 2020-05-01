import { __assign, __decorate, __values } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2, GoogleAnalyticsSettings, UserTimings, } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var GoogleAnalyticsDefaults = /** @class */ (function () {
    function GoogleAnalyticsDefaults() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
        this.anonymizeIp = false;
    }
    return GoogleAnalyticsDefaults;
}());
export { GoogleAnalyticsDefaults };
var Angulartics2GoogleAnalytics = /** @class */ (function () {
    function Angulartics2GoogleAnalytics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = [];
        var defaults = new GoogleAnalyticsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.ga = __assign(__assign({}, defaults), this.angulartics2.settings.ga);
        this.settings = this.angulartics2.settings.ga;
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2GoogleAnalytics.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.exceptionTrack(x); });
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.userTimings(x); });
    };
    Angulartics2GoogleAnalytics.prototype.pageTrack = function (path) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        if (typeof _gaq !== 'undefined' && _gaq) {
            _gaq.push(['_trackPageview', path]);
            try {
                for (var _e = __values(this.angulartics2.settings.ga.additionalAccountNames), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var accountName = _f.value;
                    _gaq.push([accountName + '._trackPageview', path]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (typeof ga !== 'undefined' && ga) {
            if (this.angulartics2.settings.ga.userId) {
                ga('set', '&uid', this.angulartics2.settings.ga.userId);
                try {
                    for (var _g = __values(this.angulartics2.settings.ga.additionalAccountNames), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var accountName = _h.value;
                        ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            if (this.angulartics2.settings.ga.anonymizeIp) {
                ga('set', 'anonymizeIp', true);
                try {
                    for (var _j = __values(this.angulartics2.settings.ga.additionalAccountNames), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var accountName = _k.value;
                        ga(accountName + '.set', 'anonymizeIp', true);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            ga('send', 'pageview', path);
            try {
                for (var _l = __values(this.angulartics2.settings.ga.additionalAccountNames), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var accountName = _m.value;
                    ga(accountName + '.send', 'pageview', path);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    };
    /**
     * Track Event in GA
     *
     * @param action Associated with the event
     * @param properties Comprised of:
     *  - category (string) and optional
     *  - label (string)
     *  - value (integer)
     *  - noninteraction (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    Angulartics2GoogleAnalytics.prototype.eventTrack = function (action, properties) {
        var e_5, _a;
        // Google Analytics requires an Event Category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
        }
        // GA requires that eventValue be an integer, see:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
        // https://github.com/luisfarzati/angulartics/issues/81
        if (properties.value) {
            var parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
        if (typeof ga !== 'undefined') {
            var eventOptions = __assign({ eventCategory: properties.category, eventAction: action, eventLabel: properties.label, eventValue: properties.value, nonInteraction: properties.noninteraction, page: properties.page || location.hash.substring(1) || location.pathname, userId: this.angulartics2.settings.ga.userId, hitCallback: properties.hitCallback }, this.angulartics2.settings.ga.transport && { transport: this.angulartics2.settings.ga.transport });
            // add custom dimensions and metrics
            this.setDimensionsAndMetrics(properties);
            ga('send', 'event', eventOptions);
            try {
                for (var _b = __values(this.angulartics2.settings.ga.additionalAccountNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var accountName = _c.value;
                    ga(accountName + '.send', 'event', eventOptions);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (typeof _gaq !== 'undefined') {
            _gaq.push([
                '_trackEvent',
                properties.category,
                action,
                properties.label,
                properties.value,
                properties.noninteraction,
            ]);
        }
    };
    /**
     * Exception Track Event in GA
     *
     * @param properties Comprised of the optional fields:
     *  - fatal (string)
     *  - description (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    Angulartics2GoogleAnalytics.prototype.exceptionTrack = function (properties) {
        var e_6, _a;
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.description;
        var eventOptions = {
            exFatal: properties.fatal,
            exDescription: properties.description,
        };
        ga('send', 'exception', eventOptions);
        try {
            for (var _b = __values(this.angulartics2.settings.ga.additionalAccountNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                var accountName = _c.value;
                ga(accountName + '.send', 'exception', eventOptions);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    /**
     * User Timings Event in GA
     *
     * @param properties Comprised of the mandatory fields:
     *  - timingCategory (string)
     *  - timingVar (string)
     *  - timingValue (number)
     * Properties can also have the optional fields:
     *  - timingLabel (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    Angulartics2GoogleAnalytics.prototype.userTimings = function (properties) {
        var e_7, _a;
        if (!properties ||
            !properties.timingCategory ||
            !properties.timingVar ||
            !properties.timingValue) {
            console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
            return;
        }
        if (typeof ga !== 'undefined') {
            ga('send', 'timing', properties);
            try {
                for (var _b = __values(this.angulartics2.settings.ga.additionalAccountNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var accountName = _c.value;
                    ga(accountName + '.send', 'timing', properties);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
    };
    Angulartics2GoogleAnalytics.prototype.setUsername = function (userId) {
        this.angulartics2.settings.ga.userId = userId;
        if (typeof ga === 'undefined') {
            return;
        }
        ga('set', 'userId', userId);
    };
    Angulartics2GoogleAnalytics.prototype.setUserProperties = function (properties) {
        this.setDimensionsAndMetrics(properties);
    };
    Angulartics2GoogleAnalytics.prototype.setDimensionsAndMetrics = function (properties) {
        var _this = this;
        if (typeof ga === 'undefined') {
            return;
        }
        // clean previously used dimensions and metrics that will not be overriden
        this.dimensionsAndMetrics.forEach(function (elem) {
            if (!properties.hasOwnProperty(elem)) {
                ga('set', elem, undefined);
                _this.angulartics2.settings.ga.additionalAccountNames.forEach(function (accountName) {
                    ga(accountName + ".set", elem, undefined);
                });
            }
        });
        this.dimensionsAndMetrics = [];
        // add custom dimensions and metrics
        Object.keys(properties).forEach(function (key) {
            if (key.lastIndexOf('dimension', 0) === 0 ||
                key.lastIndexOf('metric', 0) === 0) {
                ga('set', key, properties[key]);
                _this.angulartics2.settings.ga.additionalAccountNames.forEach(function (accountName) {
                    ga(accountName + ".set", key, properties[key]);
                });
                _this.dimensionsAndMetrics.push(key);
            }
        });
    };
    Angulartics2GoogleAnalytics.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2GoogleAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalytics_Factory() { return new Angulartics2GoogleAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleAnalytics, providedIn: "root" });
    Angulartics2GoogleAnalytics = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoogleAnalytics);
    return Angulartics2GoogleAnalytics;
}());
export { Angulartics2GoogleAnalytics };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2EuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFydGljczIvZ2EvIiwic291cmNlcyI6WyJnYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQ0wsWUFBWSxFQUNaLHVCQUF1QixFQUN2QixXQUFXLEdBQ1osTUFBTSxjQUFjLENBQUM7OztBQU90QjtJQUFBO1FBQ0UsMkJBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7O0FBR0Q7SUFJRSxxQ0FBb0IsWUFBMEI7UUFBOUMsaUJBVUM7UUFWbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFIOUMseUJBQW9CLEdBQUcsRUFBRSxDQUFDO1FBSXhCLElBQU0sUUFBUSxHQUFHLElBQUksdUJBQXVCLEVBQUUsQ0FBQztRQUMvQywyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSx5QkFDeEIsUUFBUSxHQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFD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LElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7UUFFL0Isb0NBQW9DO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNqQyxJQUNFLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDbEM7Z0JBQ0EsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRWhDLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQzFELFVBQUMsV0FBbUI7b0JBQ2xCLEVBQUUsQ0FBSSxXQUFXLFNBQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsQ0FDRixDQUFDO2dCQUNGLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQS9OaUMsWUFBWTs7O0lBSm5DLDJCQUEyQjtRQUR2QyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDdEIsMkJBQTJCLENBb092QztzQ0F6UEQ7Q0F5UEMsQUFwT0QsSUFvT0M7U0FwT1ksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBbmd1bGFydGljczIsXG4gIEdvb2dsZUFuYWx5dGljc1NldHRpbmdzLFxuICBVc2VyVGltaW5ncyxcbn0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuXG5kZWNsYXJlIHZhciBfZ2FxOiBHb29nbGVBbmFseXRpY3NDb2RlO1xuZGVjbGFyZSB2YXIgZ2E6IFVuaXZlcnNhbEFuYWx5dGljcy5nYTtcbmRlY2xhcmUgdmFyIGxvY2F0aW9uOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBHb29nbGVBbmFseXRpY3NEZWZhdWx0cyBpbXBsZW1lbnRzIEdvb2dsZUFuYWx5dGljc1NldHRpbmdzIHtcbiAgYWRkaXRpb25hbEFjY291bnROYW1lcyA9IFtdO1xuICB1c2VySWQgPSBudWxsO1xuICB0cmFuc3BvcnQgPSAnJztcbiAgYW5vbnltaXplSXAgPSBmYWxzZTtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJHb29nbGVBbmFseXRpY3Mge1xuICBkaW1lbnNpb25zQW5kTWV0cmljcyA9IFtdO1xuICBzZXR0aW5nczogUGFydGlhbDxHb29nbGVBbmFseXRpY3NTZXR0aW5ncz47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMikge1xuICAgIGNvbnN0IGRlZmF1bHRzID0gbmV3IEdvb2dsZUFuYWx5dGljc0RlZmF1bHRzKCk7XG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGlzIG1vZHVsZVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhID0ge1xuICAgICAgLi4uZGVmYXVsdHMsXG4gICAgICAuLi50aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYSxcbiAgICB9O1xuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZS5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKHggPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV4Y2VwdGlvblRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5leGNlcHRpb25UcmFjayh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIudXNlclRpbWluZ3NcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnVzZXJUaW1pbmdzKHgpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIF9nYXEgIT09ICd1bmRlZmluZWQnICYmIF9nYXEpIHtcbiAgICAgIF9nYXEucHVzaChbJ190cmFja1BhZ2V2aWV3JywgcGF0aF0pO1xuICAgICAgZm9yIChjb25zdCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XG4gICAgICAgIF9nYXEucHVzaChbYWNjb3VudE5hbWUgKyAnLl90cmFja1BhZ2V2aWV3JywgcGF0aF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJyAmJiBnYSkge1xuICAgICAgaWYgKHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnVzZXJJZCkge1xuICAgICAgICBnYSgnc2V0JywgJyZ1aWQnLCB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS51c2VySWQpO1xuICAgICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgICBnYShhY2NvdW50TmFtZSArICcuc2V0JywgJyZ1aWQnLCB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS51c2VySWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYW5vbnltaXplSXApIHtcbiAgICAgICAgZ2EoJ3NldCcsICdhbm9ueW1pemVJcCcsIHRydWUpO1xuICAgICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgICBnYShhY2NvdW50TmFtZSArICcuc2V0JywgJ2Fub255bWl6ZUlwJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3JywgcGF0aCk7XG4gICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNlbmQnLCAncGFnZXZpZXcnLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhY2sgRXZlbnQgaW4gR0FcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBBc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIENvbXByaXNlZCBvZjpcbiAgICogIC0gY2F0ZWdvcnkgKHN0cmluZykgYW5kIG9wdGlvbmFsXG4gICAqICAtIGxhYmVsIChzdHJpbmcpXG4gICAqICAtIHZhbHVlIChpbnRlZ2VyKVxuICAgKiAgLSBub25pbnRlcmFjdGlvbiAoYm9vbGVhbilcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2dhanMvZXZlbnRUcmFja2VyR3VpZGUjU2V0dGluZ1VwRXZlbnRUcmFja2luZ1xuICAgKiBAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZXZlbnRzXG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICAvLyBHb29nbGUgQW5hbHl0aWNzIHJlcXVpcmVzIGFuIEV2ZW50IENhdGVnb3J5XG4gICAgaWYgKCFwcm9wZXJ0aWVzIHx8ICFwcm9wZXJ0aWVzLmNhdGVnb3J5KSB7XG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcbiAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnkgPSAnRXZlbnQnO1xuICAgIH1cbiAgICAvLyBHQSByZXF1aXJlcyB0aGF0IGV2ZW50VmFsdWUgYmUgYW4gaW50ZWdlciwgc2VlOlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9maWVsZC1yZWZlcmVuY2UjZXZlbnRWYWx1ZVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sdWlzZmFyemF0aS9hbmd1bGFydGljcy9pc3N1ZXMvODFcbiAgICBpZiAocHJvcGVydGllcy52YWx1ZSkge1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQocHJvcGVydGllcy52YWx1ZSwgMTApO1xuICAgICAgcHJvcGVydGllcy52YWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyAwIDogcGFyc2VkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBldmVudE9wdGlvbnMgPSB7XG4gICAgICAgIGV2ZW50Q2F0ZWdvcnk6IHByb3BlcnRpZXMuY2F0ZWdvcnksXG4gICAgICAgIGV2ZW50QWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGV2ZW50TGFiZWw6IHByb3BlcnRpZXMubGFiZWwsXG4gICAgICAgIGV2ZW50VmFsdWU6IHByb3BlcnRpZXMudmFsdWUsXG4gICAgICAgIG5vbkludGVyYWN0aW9uOiBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxuICAgICAgICBwYWdlOiBwcm9wZXJ0aWVzLnBhZ2UgfHwgbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkgfHwgbG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHVzZXJJZDogdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkLFxuICAgICAgICBoaXRDYWxsYmFjazogcHJvcGVydGllcy5oaXRDYWxsYmFjayxcbiAgICAgICAgLi4uIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnRyYW5zcG9ydCAmJiB7IHRyYW5zcG9ydDogdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudHJhbnNwb3J0IH1cbiAgICAgIH07XG5cbiAgICAgIC8vIGFkZCBjdXN0b20gZGltZW5zaW9ucyBhbmQgbWV0cmljc1xuICAgICAgdGhpcy5zZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzKTtcblxuICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCBldmVudE9wdGlvbnMpO1xuXG4gICAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNlbmQnLCAnZXZlbnQnLCBldmVudE9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIF9nYXEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfZ2FxLnB1c2goW1xuICAgICAgICAnX3RyYWNrRXZlbnQnLFxuICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxuICAgICAgICBhY3Rpb24sXG4gICAgICAgIHByb3BlcnRpZXMubGFiZWwsXG4gICAgICAgIHByb3BlcnRpZXMudmFsdWUsXG4gICAgICAgIHByb3BlcnRpZXMubm9uaW50ZXJhY3Rpb24sXG4gICAgICBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhjZXB0aW9uIFRyYWNrIEV2ZW50IGluIEdBXG4gICAqXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIENvbXByaXNlZCBvZiB0aGUgb3B0aW9uYWwgZmllbGRzOlxuICAgKiAgLSBmYXRhbCAoc3RyaW5nKVxuICAgKiAgLSBkZXNjcmlwdGlvbiAoc3RyaW5nKVxuICAgKlxuICAgKiBAaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V4Y2VwdGlvbnNcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V2ZW50c1xuICAgKi9cbiAgZXhjZXB0aW9uVHJhY2socHJvcGVydGllczogYW55KSB7XG4gICAgaWYgKHByb3BlcnRpZXMuZmF0YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coJ05vIFwiZmF0YWxcIiBwcm92aWRlZCwgc2VuZGluZyB3aXRoIGZhdGFsPXRydWUnKTtcbiAgICAgIHByb3BlcnRpZXMuZmF0YWwgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXMuZXhEZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG5cbiAgICBjb25zdCBldmVudE9wdGlvbnMgPSB7XG4gICAgICBleEZhdGFsOiBwcm9wZXJ0aWVzLmZhdGFsLFxuICAgICAgZXhEZXNjcmlwdGlvbjogcHJvcGVydGllcy5kZXNjcmlwdGlvbixcbiAgICB9O1xuXG4gICAgZ2EoJ3NlbmQnLCAnZXhjZXB0aW9uJywgZXZlbnRPcHRpb25zKTtcbiAgICBmb3IgKGNvbnN0IGFjY291bnROYW1lIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMpIHtcbiAgICAgIGdhKGFjY291bnROYW1lICsgJy5zZW5kJywgJ2V4Y2VwdGlvbicsIGV2ZW50T3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgVGltaW5ncyBFdmVudCBpbiBHQVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBDb21wcmlzZWQgb2YgdGhlIG1hbmRhdG9yeSBmaWVsZHM6XG4gICAqICAtIHRpbWluZ0NhdGVnb3J5IChzdHJpbmcpXG4gICAqICAtIHRpbWluZ1ZhciAoc3RyaW5nKVxuICAgKiAgLSB0aW1pbmdWYWx1ZSAobnVtYmVyKVxuICAgKiBQcm9wZXJ0aWVzIGNhbiBhbHNvIGhhdmUgdGhlIG9wdGlvbmFsIGZpZWxkczpcbiAgICogIC0gdGltaW5nTGFiZWwgKHN0cmluZylcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL3VzZXItdGltaW5nc1xuICAgKi9cbiAgdXNlclRpbWluZ3MocHJvcGVydGllczogVXNlclRpbWluZ3MpIHtcbiAgICBpZiAoXG4gICAgICAhcHJvcGVydGllcyB8fFxuICAgICAgIXByb3BlcnRpZXMudGltaW5nQ2F0ZWdvcnkgfHxcbiAgICAgICFwcm9wZXJ0aWVzLnRpbWluZ1ZhciB8fFxuICAgICAgIXByb3BlcnRpZXMudGltaW5nVmFsdWVcbiAgICApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICdQcm9wZXJ0aWVzIHRpbWluZ0NhdGVnb3J5LCB0aW1pbmdWYXIsIGFuZCB0aW1pbmdWYWx1ZSBhcmUgcmVxdWlyZWQgdG8gYmUgc2V0LicsXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBnYSgnc2VuZCcsICd0aW1pbmcnLCBwcm9wZXJ0aWVzKTtcbiAgICAgIGZvciAoY29uc3QgYWNjb3VudE5hbWUgb2YgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EuYWRkaXRpb25hbEFjY291bnROYW1lcykge1xuICAgICAgICBnYShhY2NvdW50TmFtZSArICcuc2VuZCcsICd0aW1pbmcnLCBwcm9wZXJ0aWVzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZykge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnVzZXJJZCA9IHVzZXJJZDtcbiAgICBpZiAodHlwZW9mIGdhID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnYSgnc2V0JywgJ3VzZXJJZCcsIHVzZXJJZCk7XG4gIH1cblxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0aGlzLnNldERpbWVuc2lvbnNBbmRNZXRyaWNzKHByb3BlcnRpZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIGdhID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjbGVhbiBwcmV2aW91c2x5IHVzZWQgZGltZW5zaW9ucyBhbmQgbWV0cmljcyB0aGF0IHdpbGwgbm90IGJlIG92ZXJyaWRlblxuICAgIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgIGlmICghcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShlbGVtKSkge1xuICAgICAgICBnYSgnc2V0JywgZWxlbSwgdW5kZWZpbmVkKTtcblxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzLmZvckVhY2goXG4gICAgICAgICAgKGFjY291bnROYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGdhKGAke2FjY291bnROYW1lfS5zZXRgLCBlbGVtLCB1bmRlZmluZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcyA9IFtdO1xuXG4gICAgLy8gYWRkIGN1c3RvbSBkaW1lbnNpb25zIGFuZCBtZXRyaWNzXG4gICAgT2JqZWN0LmtleXMocHJvcGVydGllcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBrZXkubGFzdEluZGV4T2YoJ2RpbWVuc2lvbicsIDApID09PSAwIHx8XG4gICAgICAgIGtleS5sYXN0SW5kZXhPZignbWV0cmljJywgMCkgPT09IDBcbiAgICAgICkge1xuICAgICAgICBnYSgnc2V0Jywga2V5LCBwcm9wZXJ0aWVzW2tleV0pO1xuXG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLmFkZGl0aW9uYWxBY2NvdW50TmFtZXMuZm9yRWFjaChcbiAgICAgICAgICAoYWNjb3VudE5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgZ2EoYCR7YWNjb3VudE5hbWV9LnNldGAsIGtleSwgcHJvcGVydGllc1trZXldKTtcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19