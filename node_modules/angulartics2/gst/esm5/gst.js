import { __assign, __decorate, __values } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2, GoogleGlobalSiteTagSettings, UserTimings } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
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
export { GoogleGlobalSiteTagDefaults };
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
    Angulartics2GoogleGlobalSiteTag.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
    Angulartics2GoogleGlobalSiteTag = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoogleGlobalSiteTag);
    return Angulartics2GoogleGlobalSiteTag;
}());
export { Angulartics2GoogleGlobalSiteTag };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL2dzdC8iLCJzb3VyY2VzIjpbImdzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0FBTXRGO0lBR0U7UUFBQSxpQkFhQztRQWZELGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBR3pCLElBQUksT0FBTyxFQUFFLEtBQUssV0FBVyxJQUFJLEVBQUUsRUFBRTtZQUNuQyw0R0FBNEc7WUFDNUcsRUFBRSxDQUFDO2dCQUNELEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFZO29CQUMvQixJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNyQyxvRUFBb0U7b0JBQ3BFLElBQUksRUFBRSxLQUFLLFNBQVMsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDM0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzNCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7O0FBR0Q7SUFHRSx5Q0FBc0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGeEMseUJBQW9CLEdBQTJCLEVBQUUsQ0FBQztRQUd4RCxJQUFNLFFBQVEsR0FBRyxJQUFJLDJCQUEyQixFQUFFLENBQUM7UUFDbkQsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcseUJBQVEsUUFBUSxHQUFLLElBQUks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UUFDL0QsNkVBQTZFO1FBQzdFLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNwQixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDL0M7SUFDSCxDQUFDOztnQkF4TG1DLFlBQVk7OztJQUhyQywrQkFBK0I7UUFEM0MsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLCtCQUErQixDQTRMM0M7MENBeE5EO0NBd05DLEFBNUxELElBNExDO1NBNUxZLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyLCBHb29nbGVHbG9iYWxTaXRlVGFnU2V0dGluZ3MsIFVzZXJUaW1pbmdzIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcbmltcG9ydCB7IEV2ZW50R3N0LCBVc2VyVGltaW5nc0dzdCB9IGZyb20gJy4vZ3N0LWludGVyZmFjZXMnO1xuXG5kZWNsYXJlIHZhciBndGFnOiBhbnk7XG5kZWNsYXJlIHZhciBnYTogYW55O1xuXG5leHBvcnQgY2xhc3MgR29vZ2xlR2xvYmFsU2l0ZVRhZ0RlZmF1bHRzIGltcGxlbWVudHMgR29vZ2xlR2xvYmFsU2l0ZVRhZ1NldHRpbmdzIHtcbiAgdHJhY2tpbmdJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBnYSAhPT0gJ3VuZGVmaW5lZCcgJiYgZ2EpIHtcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2dhLW9iamVjdC1tZXRob2RzLXJlZmVyZW5jZVxuICAgICAgZ2EoKCkgPT4ge1xuICAgICAgICBnYS5nZXRBbGwoKS5mb3JFYWNoKCh0cmFja2VyOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBpZCA9IHRyYWNrZXIuZ2V0KCd0cmFja2luZ0lkJyk7XG4gICAgICAgICAgLy8gSWYgc2V0IGJvdGggaW4gZm9yUm9vdCBhbmQgSFRNTCBwYWdlLCB3ZSB3YW50IHRvIGF2b2lkIGR1cGxpY2F0ZXNcbiAgICAgICAgICBpZiAoaWQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnRyYWNraW5nSWRzLmluZGV4T2YoaWQpID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy50cmFja2luZ0lkcy5wdXNoKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyR29vZ2xlR2xvYmFsU2l0ZVRhZyB7XG4gIHByaXZhdGUgZGltZW5zaW9uc0FuZE1ldHJpY3M6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IG5ldyBHb29nbGVHbG9iYWxTaXRlVGFnRGVmYXVsdHMoKTtcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0ID0geyAuLi5kZWZhdWx0cywgLi4udGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0IH07XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV4Y2VwdGlvblRyYWNrKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi51c2VyVGltaW5nc1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMudXNlclRpbWluZ3ModGhpcy5jb252ZXJ0VGltaW5ncyh4KSkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbnVhbGx5IHRyYWNrIHBhZ2Ugdmlldywgc2VlOlxuICAgKlxuICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL3NpbmdsZS1wYWdlLWFwcGxpY2F0aW9ucyN0cmFja2luZ192aXJ0dWFsX3BhZ2V2aWV3c1xuICAgKlxuICAgKiBAcGFyYW0gcGF0aCByZWxhdGl2ZSB1cmxcbiAgICovXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnICYmIGd0YWcpIHtcbiAgICAgIGNvbnN0IHBhcmFtczogYW55ID0ge1xuICAgICAgICBwYWdlX3BhdGg6IHBhdGgsXG4gICAgICAgIHBhZ2VfbG9jYXRpb246IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIHBhdGgsXG4gICAgICAgIC4uLnRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3NcbiAgICAgIH07XG5cbiAgICAgIC8vIEN1c3RvbSBtYXAgbXVzdCBiZSByZXNldCB3aXRoIGFsbCBjb25maWcgdG8gc3RheSB2YWxpZC5cblxuICAgICAgaWYgKHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC5jdXN0b21NYXApIHtcbiAgICAgICAgcGFyYW1zLmN1c3RvbV9tYXAgPSB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QuY3VzdG9tTWFwO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC51c2VySWQpIHtcbiAgICAgICAgcGFyYW1zLnVzZXJfaWQgPSB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudXNlcklkO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC5hbm9ueW1pemVJcCkge1xuICAgICAgICBwYXJhbXMuYW5vbnltaXplX2lwID0gdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LmFub255bWl6ZUlwO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC50cmFja2luZ0lkcykge1xuICAgICAgICBndGFnKCdjb25maWcnLCBpZCwgcGFyYW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBpbnRlcmFjdGlvbnMgdG8gZ3RhZywgaS5lLiBmb3IgZXZlbnQgdHJhY2tpbmcgaW4gR29vZ2xlIEFuYWx5dGljcy4gU2VlOlxuICAgKlxuICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL2V2ZW50c1xuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IFBhcnRpYWw8RXZlbnRHc3Q+ID0ge30pIHtcbiAgICB0aGlzLmV2ZW50VHJhY2tJbnRlcm5hbChhY3Rpb24sIHtcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBwcm9wZXJ0aWVzLmNhdGVnb3J5IHx8ICdpbnRlcmFjdGlvbicsXG4gICAgICBldmVudF9sYWJlbDogcHJvcGVydGllcy5sYWJlbCxcbiAgICAgIHZhbHVlOiBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgbm9uX2ludGVyYWN0aW9uOiBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxuICAgICAgLi4ucHJvcGVydGllcy5nc3RDdXN0b21cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGNlcHRpb24gVHJhY2sgRXZlbnQgaW4gR1NULiBTZWU6XG4gICAqXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvZXhjZXB0aW9uc1xuICAgKlxuICAgKi9cbiAgZXhjZXB0aW9uVHJhY2socHJvcGVydGllczogYW55KSB7XG4gICAgLy8gVE9ETzogbWFrZSBpbnRlcmZhY2VcbiAgICAvLyAgQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAgICAvLyAgQHBhcmFtIHtzdHJpbmd9IFtwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uXVxuICAgIC8vICBAcGFyYW0ge2Jvb2xlYW59IFtwcm9wZXJ0aWVzLmZhdGFsXVxuICAgIGlmIChwcm9wZXJ0aWVzLmZhdGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdObyBcImZhdGFsXCIgcHJvdmlkZWQsIHNlbmRpbmcgd2l0aCBmYXRhbD10cnVlJyk7XG4gICAgICBwcm9wZXJ0aWVzLmZhdGFsID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmV2ZW50ID8gcHJvcGVydGllcy5ldmVudC5zdGFjayA6IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG5cbiAgICB0aGlzLmV2ZW50VHJhY2soJ2V4Y2VwdGlvbicsIHtcbiAgICAgIGdzdEN1c3RvbToge1xuICAgICAgICBkZXNjcmlwdGlvbjogcHJvcGVydGllcy5leERlc2NyaXB0aW9uLFxuICAgICAgICBmYXRhbDogcHJvcGVydGllcy5mYXRhbCxcbiAgICAgICAgLi4ucHJvcGVydGllcy5nc3RDdXN0b21cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VyIFRpbWluZ3MgRXZlbnQgaW4gR1NULlxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBDb21wcmlzZWQgb2YgdGhlIG1hbmRhdG9yeSBmaWVsZHM6XG4gICAqICAtIG5hbWUgKHN0cmluZylcbiAgICogIC0gdmFsdWUgKG51bWJlciAtIGludGVnZXIpXG4gICAqIFByb3BlcnRpZXMgY2FuIGFsc28gaGF2ZSB0aGUgb3B0aW9uYWwgZmllbGRzOlxuICAgKiAgLSBjYXRlZ29yeSAoc3RyaW5nKVxuICAgKiAgLSBsYWJlbCAoc3RyaW5nKVxuICAgKlxuICAgKiBAbGluayBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL3VzZXItdGltaW5nc1xuICAgKi9cbiAgdXNlclRpbWluZ3MocHJvcGVydGllczogVXNlclRpbWluZ3NHc3QpIHtcbiAgICBpZiAoIXByb3BlcnRpZXMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1VzZXIgdGltaW5ncyAtIFwicHJvcGVydGllc1wiIHBhcmFtZXRlciBpcyByZXF1aXJlZCB0byBiZSBzZXQuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudFRyYWNrSW50ZXJuYWwoJ3RpbWluZ19jb21wbGV0ZScsIHtcbiAgICAgIG5hbWU6IHByb3BlcnRpZXMubmFtZSxcbiAgICAgIHZhbHVlOiBwcm9wZXJ0aWVzLnZhbHVlLFxuICAgICAgZXZlbnRfY2F0ZWdvcnk6IHByb3BlcnRpZXMuY2F0ZWdvcnksXG4gICAgICBldmVudF9sYWJlbDogcHJvcGVydGllcy5sYWJlbFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0VGltaW5ncyhwcm9wZXJ0aWVzOiBVc2VyVGltaW5ncyk6IFVzZXJUaW1pbmdzR3N0IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogcHJvcGVydGllcy50aW1pbmdWYXIsXG4gICAgICB2YWx1ZTogcHJvcGVydGllcy50aW1pbmdWYWx1ZSxcbiAgICAgIGNhdGVnb3J5OiBwcm9wZXJ0aWVzLnRpbWluZ0NhdGVnb3J5LFxuICAgICAgbGFiZWw6IHByb3BlcnRpZXMudGltaW5nTGFiZWxcbiAgICB9O1xuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcgfCB7IHVzZXJJZDogc3RyaW5nIHwgbnVtYmVyIH0pIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudXNlcklkID0gdXNlcklkO1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ3RhZykge1xuICAgICAgZ3RhZygnc2V0JywgeyB1c2VyX2lkOiB0eXBlb2YgdXNlcklkID09PSAnc3RyaW5nJyB8fCAhdXNlcklkID8gdXNlcklkIDogdXNlcklkLnVzZXJJZCB9KTtcbiAgICB9XG4gIH1cblxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0aGlzLnNldERpbWVuc2lvbnNBbmRNZXRyaWNzKHByb3BlcnRpZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgLy8gV2Ugd2FudCB0aGUgZGltZW5zaW9ucyBhbmQgbWV0cmljcyB0byBhY2N1bXVsYXRlLCBzbyB3ZSBtZXJnZSB3aXRoIHByZXZpb3VzIHZhbHVlXG4gICAgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcyA9IHtcbiAgICAgIC4uLnRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MsXG4gICAgICAuLi5wcm9wZXJ0aWVzXG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBwcm9wZXJ0aWVzIHRoYXQgYXJlIG51bGwgb3IgdW5kZWZpbmVkXG4gICAgT2JqZWN0LmtleXModGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljc1trZXldO1xuICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCkge1xuICAgICAgICBkZWxldGUgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJyAmJiBndGFnKSB7XG4gICAgICBndGFnKCdzZXQnLCB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV2ZW50VHJhY2tJbnRlcm5hbChhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55ID0ge30pIHtcbiAgICB0aGlzLmNsZWFuUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnICYmIGd0YWcpIHtcbiAgICAgIGd0YWcoJ2V2ZW50JywgYWN0aW9uLCBwcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFuUHJvcGVydGllcyhwcm9wZXJ0aWVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KTogdm9pZCB7XG4gICAgLy8gR0EgcmVxdWlyZXMgdGhhdCBldmVudFZhbHVlIGJlIGFuIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyLCBzZWU6XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9ldmVudHNcbiAgICBpZiAocHJvcGVydGllcy52YWx1ZSkge1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQocHJvcGVydGllcy52YWx1ZSwgMTApO1xuICAgICAgcHJvcGVydGllcy52YWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyAwIDogcGFyc2VkO1xuICAgIH1cbiAgfVxufVxuIl19