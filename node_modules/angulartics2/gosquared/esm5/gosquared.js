import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
var Angulartics2GoSquared = /** @class */ (function () {
    function Angulartics2GoSquared(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(function (x) {
            return _this.setUserProperties(x);
        });
        this.angulartics2.setUserPropertiesOnce.subscribe(function (x) {
            return _this.setUserProperties(x);
        });
    }
    Angulartics2GoSquared.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    };
    Angulartics2GoSquared.prototype.pageTrack = function (path) {
        try {
            _gs('track', path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2GoSquared.prototype.eventTrack = function (action, properties) {
        try {
            _gs('event', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2GoSquared.prototype.setUserProperties = function (properties) {
        try {
            _gs('identify', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2GoSquared.ctorParameters = function () { return [
        { type: Angulartics2 }
    ]; };
    Angulartics2GoSquared.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoSquared_Factory() { return new Angulartics2GoSquared(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoSquared, providedIn: "root" });
    Angulartics2GoSquared = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2GoSquared);
    return Angulartics2GoSquared;
}());
export { Angulartics2GoSquared };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29zcXVhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhcnRpY3MyL2dvc3F1YXJlZC8iLCJzb3VyY2VzIjpbImdvc3F1YXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7QUFLNUM7SUFDRSwrQkFBb0IsWUFBMEI7UUFBOUMsaUJBT0M7UUFQbUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQzdDLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUF6QixDQUF5QixDQUMxQixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ2pELE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUF6QixDQUF5QixDQUMxQixDQUFDO0lBQ0osQ0FBQztJQUVELDZDQUFhLEdBQWI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCx5Q0FBUyxHQUFULFVBQVUsSUFBWTtRQUNwQixJQUFJO1lBQ0YsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsMENBQVUsR0FBVixVQUFXLE1BQWMsRUFBRSxVQUFlO1FBQ3hDLElBQUk7WUFDRixHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNsQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCLFVBQWtCLFVBQWU7UUFDL0IsSUFBSTtZQUNGLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDN0I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQzs7Z0JBOUNpQyxZQUFZOzs7SUFEbkMscUJBQXFCO1FBRGpDLFVBQVUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQztPQUN0QixxQkFBcUIsQ0FnRGpDO2dDQXZERDtDQXVEQyxBQWhERCxJQWdEQztTQWhEWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cbmRlY2xhcmUgdmFyIF9nczogYW55O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvU3F1YXJlZCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoeCA9PlxuICAgICAgdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSxcbiAgICApO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzT25jZS5zdWJzY3JpYmUoeCA9PlxuICAgICAgdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSxcbiAgICApO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgX2dzKCd0cmFjaycsIHBhdGgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgX2dzKCdldmVudCcsIGFjdGlvbiwgcHJvcGVydGllcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBfZ3MoJ2lkZW50aWZ5JywgcHJvcGVydGllcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19