import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2Segment = /** @class */ (function () {
    function Angulartics2Segment(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce
            .subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setAlias
            .subscribe(function (x) { return _this.setAlias(x); });
    }
    Angulartics2Segment.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#page
     *
     * analytics.page([category], [name], [properties], [options], [callback]);
     */
    Angulartics2Segment.prototype.pageTrack = function (path) {
        // TODO : Support optional parameters where the parameter order and type changes their meaning
        try {
            analytics.page(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#track
     *
     * analytics.track(event, [properties], [options], [callback]);
     */
    Angulartics2Segment.prototype.eventTrack = function (action, properties) {
        try {
            analytics.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#identify
     *
     * analytics.identify([userId], [traits], [options], [callback]);
     */
    Angulartics2Segment.prototype.setUserProperties = function (properties) {
        try {
            if (properties.userId) {
                analytics.identify(properties.userId, properties);
            }
            else {
                analytics.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#alias
     *
     * analytics.alias(userId, previousId, options, callback);
     */
    Angulartics2Segment.prototype.setAlias = function (alias) {
        try {
            analytics.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Segment.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Segment.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Segment_Factory() { return new Angulartics2Segment(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Segment, providedIn: "root" });
    Angulartics2Segment = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Segment);
    return Angulartics2Segment;
}());
export { Angulartics2Segment };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ0aWNzMi9zZWdtZW50LyIsInNvdXJjZXMiOlsic2VnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLNUM7SUFFRSw2QkFDVSxZQUEwQjtRQURwQyxpQkFTQztRQVJTLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRWxDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCO2FBQ2hDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCO2FBQ3BDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTthQUN2QixTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDJDQUFhLEdBQWI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdUNBQVMsR0FBVCxVQUFVLElBQVk7UUFDcEIsOEZBQThGO1FBQzlGLElBQUk7WUFDRixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0NBQVUsR0FBVixVQUFXLE1BQWMsRUFBRSxVQUFlO1FBQ3hDLElBQUk7WUFDRixTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNyQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILCtDQUFpQixHQUFqQixVQUFrQixVQUFlO1FBQy9CLElBQUk7WUFDRixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxzQ0FBUSxHQUFSLFVBQVMsS0FBVTtRQUNqQixJQUFJO1lBQ0YsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDOztnQkFsRnVCLFlBQVk7OztJQUh6QixtQkFBbUI7UUFEL0IsVUFBVSxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxDQUFDO09BQ3RCLG1CQUFtQixDQXNGL0I7OEJBN0ZEO0NBNkZDLEFBdEZELElBc0ZDO1NBdEZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSB2YXIgYW5hbHl0aWNzOiBTZWdtZW50QW5hbHl0aWNzLkFuYWx5dGljc0pTO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMlNlZ21lbnQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczJcbiAgKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzT25jZVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0QWxpYXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0QWxpYXMoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL2xpYnJhcmllcy9hbmFseXRpY3MuanMvI3BhZ2VcbiAgICpcbiAgICogYW5hbHl0aWNzLnBhZ2UoW2NhdGVnb3J5XSwgW25hbWVdLCBbcHJvcGVydGllc10sIFtvcHRpb25zXSwgW2NhbGxiYWNrXSk7XG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgLy8gVE9ETyA6IFN1cHBvcnQgb3B0aW9uYWwgcGFyYW1ldGVycyB3aGVyZSB0aGUgcGFyYW1ldGVyIG9yZGVyIGFuZCB0eXBlIGNoYW5nZXMgdGhlaXIgbWVhbmluZ1xuICAgIHRyeSB7XG4gICAgICBhbmFseXRpY3MucGFnZShwYXRoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGh0dHBzOi8vc2VnbWVudC5jb20vZG9jcy9saWJyYXJpZXMvYW5hbHl0aWNzLmpzLyN0cmFja1xuICAgKlxuICAgKiBhbmFseXRpY3MudHJhY2soZXZlbnQsIFtwcm9wZXJ0aWVzXSwgW29wdGlvbnNdLCBbY2FsbGJhY2tdKTtcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBhbmFseXRpY3MudHJhY2soYWN0aW9uLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGh0dHBzOi8vc2VnbWVudC5jb20vZG9jcy9saWJyYXJpZXMvYW5hbHl0aWNzLmpzLyNpZGVudGlmeVxuICAgKlxuICAgKiBhbmFseXRpY3MuaWRlbnRpZnkoW3VzZXJJZF0sIFt0cmFpdHNdLCBbb3B0aW9uc10sIFtjYWxsYmFja10pO1xuICAgKi9cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChwcm9wZXJ0aWVzLnVzZXJJZCkge1xuICAgICAgICBhbmFseXRpY3MuaWRlbnRpZnkocHJvcGVydGllcy51c2VySWQsIHByb3BlcnRpZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5hbHl0aWNzLmlkZW50aWZ5KHByb3BlcnRpZXMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL2xpYnJhcmllcy9hbmFseXRpY3MuanMvI2FsaWFzXG4gICAqXG4gICAqIGFuYWx5dGljcy5hbGlhcyh1c2VySWQsIHByZXZpb3VzSWQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICovXG4gIHNldEFsaWFzKGFsaWFzOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgYW5hbHl0aWNzLmFsaWFzKGFsaWFzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=