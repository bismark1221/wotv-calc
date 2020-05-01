import { __assign, __values, __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

var GoogleGlobalSiteTagDefaults = /** @class */ (function () {
    function GoogleGlobalSiteTagDefaults() {
        var _this = this;
        this.trackingIds = [];
        if (typeof ga !== 'undefined' && ga) {
            // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
            ga(function () {
                ga.getAll().forEach(function (tracker) {
                    var id = tracker.get('trackingId');
                    // If set both in forRoot and HTML page, we want to avoid duplicates
                    if (id !== undefined && _this.trackingIds.indexOf(id) === -1) {
                        _this.trackingIds.push(id);
                    }
                });
            });
        }
    }
    return GoogleGlobalSiteTagDefaults;
}());
var Angulartics2GoogleGlobalSiteTag = /** @class */ (function () {
    function Angulartics2GoogleGlobalSiteTag(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = {};
        var defaults = new GoogleGlobalSiteTagDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.gst = __assign(__assign({}, defaults), this.angulartics2.settings.gst);
    }
    Angulartics2GoogleGlobalSiteTag.prototype.startTracking = function () {
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
            .subscribe(function (x) { return _this.userTimings(_this.convertTimings(x)); });
        this.angulartics2.setUsername
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.setUserProperties(x); });
    };
    /**
     * Manually track page view, see:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
     *
     * @param path relative url
     */
    Angulartics2GoogleGlobalSiteTag.prototype.pageTrack = function (path) {
        var e_1, _a;
        if (typeof gtag !== 'undefined' && gtag) {
            var params = __assign({ page_path: path, page_location: window.location.protocol + '//' + window.location.host + path }, this.dimensionsAndMetrics);
            // Custom map must be reset with all config to stay valid.
            if (this.angulartics2.settings.gst.customMap) {
                params.custom_map = this.angulartics2.settings.gst.customMap;
            }
            if (this.angulartics2.settings.gst.userId) {
                params.user_id = this.angulartics2.settings.gst.userId;
            }
            if (this.angulartics2.settings.gst.anonymizeIp) {
                params.anonymize_ip = this.angulartics2.settings.gst.anonymizeIp;
            }
            try {
                for (var _b = __values(this.angulartics2.settings.gst.trackingIds), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var id = _c.value;
                    gtag('config', id, params);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/events
     *
     * @param action associated with the event
     */
    Angulartics2GoogleGlobalSiteTag.prototype.eventTrack = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        this.eventTrackInternal(action, __assign({ event_category: properties.category || 'interaction', event_label: properties.label, value: properties.value, non_interaction: properties.noninteraction }, properties.gstCustom));
    };
    /**
     * Exception Track Event in GST. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
     *
     */
    Angulartics2GoogleGlobalSiteTag.prototype.exceptionTrack = function (properties) {
        // TODO: make interface
        //  @param {Object} properties
        //  @param {string} [properties.description]
        //  @param {boolean} [properties.fatal]
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack('exception', {
            gstCustom: __assign({ description: properties.exDescription, fatal: properties.fatal }, properties.gstCustom)
        });
    };
    /**
     * User Timings Event in GST.
     *
     * @param properties Comprised of the mandatory fields:
     *  - name (string)
     *  - value (number - integer)
     * Properties can also have the optional fields:
     *  - category (string)
     *  - label (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
     */
    Angulartics2GoogleGlobalSiteTag.prototype.userTimings = function (properties) {
        if (!properties) {
            console.error('User timings - "properties" parameter is required to be set.');
            return;
        }
        this.eventTrackInternal('timing_complete', {
            name: properties.name,
            value: properties.value,
            event_category: properties.category,
            event_label: properties.label
        });
    };
    Angulartics2GoogleGlobalSiteTag.prototype.convertTimings = function (properties) {
        return {
            name: properties.timingVar,
            value: properties.timingValue,
            category: properties.timingCategory,
            label: properties.timingLabel
        };
    };
    Angulartics2GoogleGlobalSiteTag.prototype.setUsername = function (userId) {
        this.angulartics2.settings.gst.userId = userId;
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', { user_id: typeof userId === 'string' || !userId ? userId : userId.userId });
        }
    };
    Angulartics2GoogleGlobalSiteTag.prototype.setUserProperties = function (properties) {
        this.setDimensionsAndMetrics(properties);
    };
    Angulartics2GoogleGlobalSiteTag.prototype.setDimensionsAndMetrics = function (properties) {
        var _this = this;
        // We want the dimensions and metrics to accumulate, so we merge with previous value
        this.dimensionsAndMetrics = __assign(__assign({}, this.dimensionsAndMetrics), properties);
        // Remove properties that are null or undefined
        Object.keys(this.dimensionsAndMetrics).forEach(function (key) {
            var val = _this.dimensionsAndMetrics[key];
            if (val === undefined || val === null) {
                delete _this.dimensionsAndMetrics[key];
            }
        });
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', this.dimensionsAndMetrics);
        }
    };
    Angulartics2GoogleGlobalSiteTag.prototype.eventTrackInternal = function (action, properties) {
        if (properties === void 0) { properties = {}; }
        this.cleanProperties(properties);
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('event', action, properties);
        }
    };
    Angulartics2GoogleGlobalSiteTag.prototype.cleanProperties = function (properties) {
        // GA requires that eventValue be an non-negative integer, see:
        // https://developers.google.com/analytics/devguides/collection/gtagjs/events
        if (properties.value) {
            var parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
    };
    Angulartics2GoogleGlobalSiteTag.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2GoogleGlobalSiteTag.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
    Angulartics2GoogleGlobalSiteTag = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoogleGlobalSiteTag);
    return Angulartics2GoogleGlobalSiteTag;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoogleGlobalSiteTag, GoogleGlobalSiteTagDefaults };
//# sourceMappingURL=angulartics2-gst.js.map
