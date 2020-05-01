import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2, GoogleGlobalSiteTagSettings, UserTimings } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class GoogleGlobalSiteTagDefaults {
    constructor() {
        this.trackingIds = [];
        if (typeof ga !== 'undefined' && ga) {
            // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
            ga(() => {
                ga.getAll().forEach((tracker) => {
                    const id = tracker.get('trackingId');
                    // If set both in forRoot and HTML page, we want to avoid duplicates
                    if (id !== undefined && this.trackingIds.indexOf(id) === -1) {
                        this.trackingIds.push(id);
                    }
                });
            });
        }
    }
}
let Angulartics2GoogleGlobalSiteTag = class Angulartics2GoogleGlobalSiteTag {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = {};
        const defaults = new GoogleGlobalSiteTagDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.gst = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.gst);
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.exceptionTrack(x));
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.userTimings(this.convertTimings(x)));
        this.angulartics2.setUsername
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.setUserProperties(x));
    }
    /**
     * Manually track page view, see:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
     *
     * @param path relative url
     */
    pageTrack(path) {
        if (typeof gtag !== 'undefined' && gtag) {
            const params = Object.assign({ page_path: path, page_location: window.location.protocol + '//' + window.location.host + path }, this.dimensionsAndMetrics);
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
            for (const id of this.angulartics2.settings.gst.trackingIds) {
                gtag('config', id, params);
            }
        }
    }
    /**
     * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/events
     *
     * @param action associated with the event
     */
    eventTrack(action, properties = {}) {
        this.eventTrackInternal(action, Object.assign({ event_category: properties.category || 'interaction', event_label: properties.label, value: properties.value, non_interaction: properties.noninteraction }, properties.gstCustom));
    }
    /**
     * Exception Track Event in GST. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
     *
     */
    exceptionTrack(properties) {
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
            gstCustom: Object.assign({ description: properties.exDescription, fatal: properties.fatal }, properties.gstCustom)
        });
    }
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
    userTimings(properties) {
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
    }
    convertTimings(properties) {
        return {
            name: properties.timingVar,
            value: properties.timingValue,
            category: properties.timingCategory,
            label: properties.timingLabel
        };
    }
    setUsername(userId) {
        this.angulartics2.settings.gst.userId = userId;
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', { user_id: typeof userId === 'string' || !userId ? userId : userId.userId });
        }
    }
    setUserProperties(properties) {
        this.setDimensionsAndMetrics(properties);
    }
    setDimensionsAndMetrics(properties) {
        // We want the dimensions and metrics to accumulate, so we merge with previous value
        this.dimensionsAndMetrics = Object.assign(Object.assign({}, this.dimensionsAndMetrics), properties);
        // Remove properties that are null or undefined
        Object.keys(this.dimensionsAndMetrics).forEach(key => {
            const val = this.dimensionsAndMetrics[key];
            if (val === undefined || val === null) {
                delete this.dimensionsAndMetrics[key];
            }
        });
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', this.dimensionsAndMetrics);
        }
    }
    eventTrackInternal(action, properties = {}) {
        this.cleanProperties(properties);
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('event', action, properties);
        }
    }
    cleanProperties(properties) {
        // GA requires that eventValue be an non-negative integer, see:
        // https://developers.google.com/analytics/devguides/collection/gtagjs/events
        if (properties.value) {
            const parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
    }
};
Angulartics2GoogleGlobalSiteTag.ctorParameters = () => [
    { type: Angulartics2 }
];
Angulartics2GoogleGlobalSiteTag.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
Angulartics2GoogleGlobalSiteTag = __decorate([
    Injectable({ providedIn: 'root' })
], Angulartics2GoogleGlobalSiteTag);
export { Angulartics2GoogleGlobalSiteTag };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL2dzdC8iLCJzb3VyY2VzIjpbImdzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLDJCQUEyQixFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7O0FBTXRGLE1BQU0sT0FBTywyQkFBMkI7SUFHdEM7UUFGQSxnQkFBVyxHQUFhLEVBQUUsQ0FBQztRQUd6QixJQUFJLE9BQU8sRUFBRSxLQUFLLFdBQVcsSUFBSSxFQUFFLEVBQUU7WUFDbkMsNEdBQTRHO1lBQzVHLEVBQUUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO29CQUNuQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNyQyxvRUFBb0U7b0JBQ3BFLElBQUksRUFBRSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzNCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRjtBQUdELElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQStCO0lBRzFDLFlBQXNCLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRnhDLHlCQUFvQixHQUEyQixFQUFFLENBQUM7UUFHeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO1FBQ25ELDJDQUEyQztRQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLG1DQUFRLFFBQVEsR0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsQ0FBQztJQUN0RixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWM7YUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVc7YUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVzthQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCO2FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUFDLElBQVk7UUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3ZDLE1BQU0sTUFBTSxtQkFDVixTQUFTLEVBQUUsSUFBSSxFQUNmLGFBQWEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUN6RSxJQUFJLENBQUMsb0JBQW9CLENBQzdCLENBQUM7WUFFRiwwREFBMEQ7WUFFMUQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO2dCQUM1QyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7YUFDOUQ7WUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUN4RDtZQUNELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDOUMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2FBQ2xFO1lBRUQsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO2dCQUMzRCxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM1QjtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsQ0FBQyxNQUFjLEVBQUUsYUFBZ0MsRUFBRTtRQUMzRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxrQkFDNUIsY0FBYyxFQUFFLFVBQVUsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUNwRCxXQUFXLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFDN0IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQ3ZCLGVBQWUsRUFBRSxVQUFVLENBQUMsY0FBYyxJQUN2QyxVQUFVLENBQUMsU0FBUyxFQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLFVBQWU7UUFDNUIsdUJBQXVCO1FBQ3ZCLDhCQUE4QjtRQUM5Qiw0Q0FBNEM7UUFDNUMsdUNBQXVDO1FBQ3ZDLElBQUksVUFBVSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQzVELFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsVUFBVSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUU5RixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUMzQixTQUFTLGtCQUNQLFdBQVcsRUFBRSxVQUFVLENBQUMsYUFBYSxFQUNyQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssSUFDcEIsVUFBVSxDQUFDLFNBQVMsQ0FDeEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxXQUFXLENBQUMsVUFBMEI7UUFDcEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztZQUM5RSxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUU7WUFDekMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztZQUN2QixjQUFjLEVBQUUsVUFBVSxDQUFDLFFBQVE7WUFDbkMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsVUFBdUI7UUFDNUMsT0FBTztZQUNMLElBQUksRUFBRSxVQUFVLENBQUMsU0FBUztZQUMxQixLQUFLLEVBQUUsVUFBVSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLFVBQVUsQ0FBQyxjQUFjO1lBQ25DLEtBQUssRUFBRSxVQUFVLENBQUMsV0FBVztTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUE0QztRQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUMvQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDMUY7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBZTtRQUMvQixJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLHVCQUF1QixDQUFDLFVBQWtDO1FBQ2hFLG9GQUFvRjtRQUNwRixJQUFJLENBQUMsb0JBQW9CLG1DQUNwQixJQUFJLENBQUMsb0JBQW9CLEdBQ3pCLFVBQVUsQ0FDZCxDQUFDO1FBRUYsK0NBQStDO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDckMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksRUFBRTtZQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxhQUFrQixFQUFFO1FBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVPLGVBQWUsQ0FBQyxVQUFrQztRQUN4RCwrREFBK0Q7UUFDL0QsNkVBQTZFO1FBQzdFLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtZQUNwQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QyxVQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDL0M7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUF6THFDLFlBQVk7OztBQUhyQywrQkFBK0I7SUFEM0MsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO0dBQ3RCLCtCQUErQixDQTRMM0M7U0E1TFksK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIsIEdvb2dsZUdsb2JhbFNpdGVUYWdTZXR0aW5ncywgVXNlclRpbWluZ3MgfSBmcm9tICdhbmd1bGFydGljczInO1xuaW1wb3J0IHsgRXZlbnRHc3QsIFVzZXJUaW1pbmdzR3N0IH0gZnJvbSAnLi9nc3QtaW50ZXJmYWNlcyc7XG5cbmRlY2xhcmUgdmFyIGd0YWc6IGFueTtcbmRlY2xhcmUgdmFyIGdhOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBHb29nbGVHbG9iYWxTaXRlVGFnRGVmYXVsdHMgaW1wbGVtZW50cyBHb29nbGVHbG9iYWxTaXRlVGFnU2V0dGluZ3Mge1xuICB0cmFja2luZ0lkczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJyAmJiBnYSkge1xuICAgICAgLy8gU2VlOiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZ2Etb2JqZWN0LW1ldGhvZHMtcmVmZXJlbmNlXG4gICAgICBnYSgoKSA9PiB7XG4gICAgICAgIGdhLmdldEFsbCgpLmZvckVhY2goKHRyYWNrZXI6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlkID0gdHJhY2tlci5nZXQoJ3RyYWNraW5nSWQnKTtcbiAgICAgICAgICAvLyBJZiBzZXQgYm90aCBpbiBmb3JSb290IGFuZCBIVE1MIHBhZ2UsIHdlIHdhbnQgdG8gYXZvaWQgZHVwbGljYXRlc1xuICAgICAgICAgIGlmIChpZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMudHJhY2tpbmdJZHMuaW5kZXhPZihpZCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNraW5nSWRzLnB1c2goaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJHb29nbGVHbG9iYWxTaXRlVGFnIHtcbiAgcHJpdmF0ZSBkaW1lbnNpb25zQW5kTWV0cmljczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMikge1xuICAgIGNvbnN0IGRlZmF1bHRzID0gbmV3IEdvb2dsZUdsb2JhbFNpdGVUYWdEZWZhdWx0cygpO1xuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzZXR0aW5ncyBmb3IgdGhpcyBtb2R1bGVcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QgPSB7IC4uLmRlZmF1bHRzLCAuLi50aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QgfTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV4Y2VwdGlvblRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXhjZXB0aW9uVHJhY2soeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnVzZXJUaW1pbmdzXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy51c2VyVGltaW5ncyh0aGlzLmNvbnZlcnRUaW1pbmdzKHgpKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWVcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgdHJhY2sgcGFnZSB2aWV3LCBzZWU6XG4gICAqXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvc2luZ2xlLXBhZ2UtYXBwbGljYXRpb25zI3RyYWNraW5nX3ZpcnR1YWxfcGFnZXZpZXdzXG4gICAqXG4gICAqIEBwYXJhbSBwYXRoIHJlbGF0aXZlIHVybFxuICAgKi9cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ3RhZykge1xuICAgICAgY29uc3QgcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgIHBhZ2VfcGF0aDogcGF0aCxcbiAgICAgICAgcGFnZV9sb2NhdGlvbjogd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgcGF0aCxcbiAgICAgICAgLi4udGhpcy5kaW1lbnNpb25zQW5kTWV0cmljc1xuICAgICAgfTtcblxuICAgICAgLy8gQ3VzdG9tIG1hcCBtdXN0IGJlIHJlc2V0IHdpdGggYWxsIGNvbmZpZyB0byBzdGF5IHZhbGlkLlxuXG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LmN1c3RvbU1hcCkge1xuICAgICAgICBwYXJhbXMuY3VzdG9tX21hcCA9IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC5jdXN0b21NYXA7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LnVzZXJJZCkge1xuICAgICAgICBwYXJhbXMudXNlcl9pZCA9IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC51c2VySWQ7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LmFub255bWl6ZUlwKSB7XG4gICAgICAgIHBhcmFtcy5hbm9ueW1pemVfaXAgPSB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QuYW5vbnltaXplSXA7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgaWQgb2YgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LnRyYWNraW5nSWRzKSB7XG4gICAgICAgIGd0YWcoJ2NvbmZpZycsIGlkLCBwYXJhbXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGludGVyYWN0aW9ucyB0byBndGFnLCBpLmUuIGZvciBldmVudCB0cmFja2luZyBpbiBHb29nbGUgQW5hbHl0aWNzLiBTZWU6XG4gICAqXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvZXZlbnRzXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogUGFydGlhbDxFdmVudEdzdD4gPSB7fSkge1xuICAgIHRoaXMuZXZlbnRUcmFja0ludGVybmFsKGFjdGlvbiwge1xuICAgICAgZXZlbnRfY2F0ZWdvcnk6IHByb3BlcnRpZXMuY2F0ZWdvcnkgfHwgJ2ludGVyYWN0aW9uJyxcbiAgICAgIGV2ZW50X2xhYmVsOiBwcm9wZXJ0aWVzLmxhYmVsLFxuICAgICAgdmFsdWU6IHByb3BlcnRpZXMudmFsdWUsXG4gICAgICBub25faW50ZXJhY3Rpb246IHByb3BlcnRpZXMubm9uaW50ZXJhY3Rpb24sXG4gICAgICAuLi5wcm9wZXJ0aWVzLmdzdEN1c3RvbVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHU1QuIFNlZTpcbiAgICpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9leGNlcHRpb25zXG4gICAqXG4gICAqL1xuICBleGNlcHRpb25UcmFjayhwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICAvLyBUT0RPOiBtYWtlIGludGVyZmFjZVxuICAgIC8vICBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllc1xuICAgIC8vICBAcGFyYW0ge3N0cmluZ30gW3Byb3BlcnRpZXMuZGVzY3JpcHRpb25dXG4gICAgLy8gIEBwYXJhbSB7Ym9vbGVhbn0gW3Byb3BlcnRpZXMuZmF0YWxdXG4gICAgaWYgKHByb3BlcnRpZXMuZmF0YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coJ05vIFwiZmF0YWxcIiBwcm92aWRlZCwgc2VuZGluZyB3aXRoIGZhdGFsPXRydWUnKTtcbiAgICAgIHByb3BlcnRpZXMuZmF0YWwgPSB0cnVlO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXMuZXhEZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZXZlbnQgPyBwcm9wZXJ0aWVzLmV2ZW50LnN0YWNrIDogcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcblxuICAgIHRoaXMuZXZlbnRUcmFjaygnZXhjZXB0aW9uJywge1xuICAgICAgZ3N0Q3VzdG9tOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBwcm9wZXJ0aWVzLmV4RGVzY3JpcHRpb24sXG4gICAgICAgIGZhdGFsOiBwcm9wZXJ0aWVzLmZhdGFsLFxuICAgICAgICAuLi5wcm9wZXJ0aWVzLmdzdEN1c3RvbVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXIgVGltaW5ncyBFdmVudCBpbiBHU1QuXG4gICAqXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIENvbXByaXNlZCBvZiB0aGUgbWFuZGF0b3J5IGZpZWxkczpcbiAgICogIC0gbmFtZSAoc3RyaW5nKVxuICAgKiAgLSB2YWx1ZSAobnVtYmVyIC0gaW50ZWdlcilcbiAgICogUHJvcGVydGllcyBjYW4gYWxzbyBoYXZlIHRoZSBvcHRpb25hbCBmaWVsZHM6XG4gICAqICAtIGNhdGVnb3J5IChzdHJpbmcpXG4gICAqICAtIGxhYmVsIChzdHJpbmcpXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvdXNlci10aW1pbmdzXG4gICAqL1xuICB1c2VyVGltaW5ncyhwcm9wZXJ0aWVzOiBVc2VyVGltaW5nc0dzdCkge1xuICAgIGlmICghcHJvcGVydGllcykge1xuICAgICAgY29uc29sZS5lcnJvcignVXNlciB0aW1pbmdzIC0gXCJwcm9wZXJ0aWVzXCIgcGFyYW1ldGVyIGlzIHJlcXVpcmVkIHRvIGJlIHNldC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50VHJhY2tJbnRlcm5hbCgndGltaW5nX2NvbXBsZXRlJywge1xuICAgICAgbmFtZTogcHJvcGVydGllcy5uYW1lLFxuICAgICAgdmFsdWU6IHByb3BlcnRpZXMudmFsdWUsXG4gICAgICBldmVudF9jYXRlZ29yeTogcHJvcGVydGllcy5jYXRlZ29yeSxcbiAgICAgIGV2ZW50X2xhYmVsOiBwcm9wZXJ0aWVzLmxhYmVsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRUaW1pbmdzKHByb3BlcnRpZXM6IFVzZXJUaW1pbmdzKTogVXNlclRpbWluZ3NHc3Qge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBwcm9wZXJ0aWVzLnRpbWluZ1ZhcixcbiAgICAgIHZhbHVlOiBwcm9wZXJ0aWVzLnRpbWluZ1ZhbHVlLFxuICAgICAgY2F0ZWdvcnk6IHByb3BlcnRpZXMudGltaW5nQ2F0ZWdvcnksXG4gICAgICBsYWJlbDogcHJvcGVydGllcy50aW1pbmdMYWJlbFxuICAgIH07XG4gIH1cblxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZyB8IHsgdXNlcklkOiBzdHJpbmcgfCBudW1iZXIgfSkge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC51c2VySWQgPSB1c2VySWQ7XG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJyAmJiBndGFnKSB7XG4gICAgICBndGFnKCdzZXQnLCB7IHVzZXJfaWQ6IHR5cGVvZiB1c2VySWQgPT09ICdzdHJpbmcnIHx8ICF1c2VySWQgPyB1c2VySWQgOiB1c2VySWQudXNlcklkIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIHRoaXMuc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllcyk7XG4gIH1cblxuICBwcml2YXRlIHNldERpbWVuc2lvbnNBbmRNZXRyaWNzKHByb3BlcnRpZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcbiAgICAvLyBXZSB3YW50IHRoZSBkaW1lbnNpb25zIGFuZCBtZXRyaWNzIHRvIGFjY3VtdWxhdGUsIHNvIHdlIG1lcmdlIHdpdGggcHJldmlvdXMgdmFsdWVcbiAgICB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzID0ge1xuICAgICAgLi4udGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcyxcbiAgICAgIC4uLnByb3BlcnRpZXNcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIHByb3BlcnRpZXMgdGhhdCBhcmUgbnVsbCBvciB1bmRlZmluZWRcbiAgICBPYmplY3Qua2V5cyh0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzW2tleV07XG4gICAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzW2tleV07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnICYmIGd0YWcpIHtcbiAgICAgIGd0YWcoJ3NldCcsIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZXZlbnRUcmFja0ludGVybmFsKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuY2xlYW5Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ3RhZykge1xuICAgICAgZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xlYW5Qcm9wZXJ0aWVzKHByb3BlcnRpZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pOiB2b2lkIHtcbiAgICAvLyBHQSByZXF1aXJlcyB0aGF0IGV2ZW50VmFsdWUgYmUgYW4gbm9uLW5lZ2F0aXZlIGludGVnZXIsIHNlZTpcbiAgICAvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL2V2ZW50c1xuICAgIGlmIChwcm9wZXJ0aWVzLnZhbHVlKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChwcm9wZXJ0aWVzLnZhbHVlLCAxMCk7XG4gICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IDAgOiBwYXJzZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=