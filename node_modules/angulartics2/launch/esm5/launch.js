import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2LaunchByAdobe = /** @class */ (function () {
    function Angulartics2LaunchByAdobe(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.payload = {};
        if ('undefined' === typeof _satellite) {
            console.warn('Launch not found!');
        }
        this.angulartics2.setUsername
            .subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties
            .subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2LaunchByAdobe.prototype.setUsername = function (userId) {
        if ('undefined' !== typeof userId && userId) {
            this.payload.userId = userId;
        }
    };
    Angulartics2LaunchByAdobe.prototype.setUserProperties = function (properties) {
        if ('undefined' !== typeof properties && properties) {
            this.payload.properties = properties;
        }
    };
    Angulartics2LaunchByAdobe.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2LaunchByAdobe.prototype.pageTrack = function (path) {
        this.payload = this.payload || {};
        this.payload.path = path;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('pageTrack', this.payload);
        }
    };
    /**
     * @param action associated with the event
     * @param properties associated with the event
     */
    Angulartics2LaunchByAdobe.prototype.eventTrack = function (action, properties) {
        properties = properties || {};
        // add properties to payload
        this.payload.action = action;
        this.payload.eventProperties = properties;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('eventTrack', this.payload);
        }
    };
    Angulartics2LaunchByAdobe.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2LaunchByAdobe.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2LaunchByAdobe_Factory() { return new Angulartics2LaunchByAdobe(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2LaunchByAdobe, providedIn: "root" });
    Angulartics2LaunchByAdobe = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2LaunchByAdobe);
    return Angulartics2LaunchByAdobe;
}());
export { Angulartics2LaunchByAdobe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL2xhdW5jaC8iLCJzb3VyY2VzIjpbImxhdW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLNUM7SUFFRSxtQ0FDWSxZQUEwQjtRQUR0QyxpQkFVQztRQVRXLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBRnRDLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFJaEIsSUFBSSxXQUFXLEtBQUssT0FBTyxVQUFVLEVBQUU7WUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO2FBQzFCLFNBQVMsQ0FBQyxVQUFDLENBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQjthQUNoQyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsK0NBQVcsR0FBWCxVQUFZLE1BQXdCO1FBQ2xDLElBQUksV0FBVyxLQUFLLE9BQU8sTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQscURBQWlCLEdBQWpCLFVBQWtCLFVBQWU7UUFDL0IsSUFBSSxXQUFXLEtBQUssT0FBTyxVQUFVLElBQUksVUFBVSxFQUFFO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxpREFBYSxHQUFiO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNkNBQVMsR0FBVCxVQUFVLElBQVk7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFekIsSUFBSSxXQUFXLEtBQUssT0FBTyxVQUFVLElBQUksVUFBVSxFQUFFO1lBQ25ELFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCw4Q0FBVSxHQUFWLFVBQVcsTUFBYyxFQUFFLFVBQWU7UUFDeEMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFFOUIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFFMUMsSUFBSSxXQUFXLEtBQUssT0FBTyxVQUFVLElBQUksVUFBVSxFQUFFO1lBQ25ELFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7O2dCQXZEeUIsWUFBWTs7O0lBSDNCLHlCQUF5QjtRQURyQyxVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDdEIseUJBQXlCLENBMkRyQztvQ0FsRUQ7Q0FrRUMsQUEzREQsSUEyREM7U0EzRFkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIGNvbnN0IF9zYXRlbGxpdGU6IGFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJMYXVuY2hCeUFkb2JlIHtcbiAgcGF5bG9hZDogYW55ID0ge307XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgX3NhdGVsbGl0ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdMYXVuY2ggbm90IGZvdW5kIScpO1xuICAgIH1cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB1c2VySWQgJiYgdXNlcklkKSB7XG4gICAgICB0aGlzLnBheWxvYWQudXNlcklkID0gdXNlcklkO1xuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHByb3BlcnRpZXMgJiYgcHJvcGVydGllcykge1xuICAgICAgdGhpcy5wYXlsb2FkLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMucGF5bG9hZCA9IHRoaXMucGF5bG9hZCB8fCB7fTtcbiAgICB0aGlzLnBheWxvYWQucGF0aCA9IHBhdGg7XG5cbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBfc2F0ZWxsaXRlICYmIF9zYXRlbGxpdGUpIHtcbiAgICAgIF9zYXRlbGxpdGUudHJhY2soJ3BhZ2VUcmFjaycsIHRoaXMucGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcblxuICAgIC8vIGFkZCBwcm9wZXJ0aWVzIHRvIHBheWxvYWRcbiAgICB0aGlzLnBheWxvYWQuYWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMucGF5bG9hZC5ldmVudFByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgX3NhdGVsbGl0ZSAmJiBfc2F0ZWxsaXRlKSB7XG4gICAgICBfc2F0ZWxsaXRlLnRyYWNrKCdldmVudFRyYWNrJywgdGhpcy5wYXlsb2FkKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==