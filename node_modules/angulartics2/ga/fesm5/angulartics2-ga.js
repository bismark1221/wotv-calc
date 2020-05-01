import { __assign, __values, __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var GoogleAnalyticsDefaults = /** @class */ (function () {
    function GoogleAnalyticsDefaults() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
        this.anonymizeIp = false;
    }
    return GoogleAnalyticsDefaults;
}());
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
    Angulartics2GoogleAnalytics.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalytics_Factory() { return new Angulartics2GoogleAnalytics(ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleAnalytics, providedIn: "root" });
    Angulartics2GoogleAnalytics = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoogleAnalytics);
    return Angulartics2GoogleAnalytics;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoogleAnalytics, GoogleAnalyticsDefaults };
//# sourceMappingURL=angulartics2-ga.js.map
