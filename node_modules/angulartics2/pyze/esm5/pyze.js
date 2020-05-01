import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2Pyze = /** @class */ (function () {
    function Angulartics2Pyze(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUserId(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.postTraits(x); });
    }
    Angulartics2Pyze.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2Pyze.prototype.pageTrack = function (path) {
        try {
            Pyze.postPageView('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.prototype.eventTrack = function (action, properties) {
        try {
            PyzeEvents.postCustomEventWithAttributes(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.prototype.setUserId = function (userId) {
        try {
            PyzeIdentity.setUserIdentifier(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.prototype.postTraits = function (properties) {
        try {
            PyzeIdentity.postTraits(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Pyze.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2Pyze.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Pyze_Factory() { return new Angulartics2Pyze(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Pyze, providedIn: "root" });
    Angulartics2Pyze = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Pyze);
    return Angulartics2Pyze;
}());
export { Angulartics2Pyze };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHl6ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXJ0aWNzMi9weXplLyIsInNvdXJjZXMiOlsicHl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFRNUM7SUFFSSwwQkFBb0IsWUFBMEI7UUFBOUMsaUJBR0M7UUFIbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLElBQVk7UUFDbEIsSUFBSTtZQUNBLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLENBQUM7YUFDUDtTQUNKO0lBQ0wsQ0FBQztJQUVELHFDQUFVLEdBQVYsVUFBVyxNQUFjLEVBQUUsVUFBZTtRQUN0QyxJQUFJO1lBQ0EsVUFBVSxDQUFDLDZCQUE2QixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNwQyxNQUFNLENBQUMsQ0FBQzthQUNQO1NBQ0o7SUFDTCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLE1BQWM7UUFDcEIsSUFBSTtZQUNBLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUgscUNBQVUsR0FBVixVQUFXLFVBQWtCO1FBQ3pCLElBQUk7WUFDQSxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUNMLENBQUM7O2dCQXBEaUMsWUFBWTs7O0lBRnBDLGdCQUFnQjtRQUQ3QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDckIsZ0JBQWdCLENBdUQ3QjsyQkFqRUQ7Q0FpRUMsQUF2REQsSUF1REM7U0F2RGEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIHZhciBQeXplOiBhbnk7XG5kZWNsYXJlIHZhciBQeXplRXZlbnRzOiBhbnk7XG5kZWNsYXJlIHZhciBQeXplSWRlbnRpdHk6IGFueTtcblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzICBBbmd1bGFydGljczJQeXplIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcklkKHgpKTtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBvc3RUcmFpdHMoeCkpO1xuICAgIH1cblxuICAgIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICAgIH1cblxuICAgIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFB5emUucG9zdFBhZ2VWaWV3KCdQYWdlIFZpZXdlZCcsIHsgcGFnZTogcGF0aCB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHl6ZUV2ZW50cy5wb3N0Q3VzdG9tRXZlbnRXaXRoQXR0cmlidXRlcyhhY3Rpb24sIHByb3BlcnRpZXMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBQeXplSWRlbnRpdHkuc2V0VXNlcklkZW50aWZpZXIodXNlcklkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBwb3N0VHJhaXRzKHByb3BlcnRpZXM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHl6ZUlkZW50aXR5LnBvc3RUcmFpdHMocHJvcGVydGllcyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==