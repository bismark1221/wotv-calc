import { __decorate } from 'tslib';
import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

var Angulartics2Clicky = /** @class */ (function () {
    function Angulartics2Clicky(angulartics2, titleService) {
        this.angulartics2 = angulartics2;
        this.titleService = titleService;
        if (typeof clicky === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
    }
    Angulartics2Clicky.prototype.startTracking = function () {
        var _this = this;
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(function (x) { return _this.eventOrGoalTrack(x.action, x.properties); });
    };
    /**
     * Track Page in Clicky
     *
     * @param path location
     *
     * @link https://clicky.com/help/custom/manual#log
     */
    Angulartics2Clicky.prototype.pageTrack = function (path) {
        var title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    };
    /**
     * Track Event Or Goal in Clicky
     *
     * @param action Action name
     * @param properties Definition of 'properties.goal' determines goal vs event tracking
     *
     * @link https://clicky.com/help/custom/manual#log
     * @link https://clicky.com/help/custom/manual#goal
     */
    Angulartics2Clicky.prototype.eventOrGoalTrack = function (action, properties) {
        if (typeof properties.goal === 'undefined') {
            var title = properties.title || null;
            var type = properties.type != null ? this.validateType(properties.type) : null;
            clicky.log(action, title, type);
        }
        else {
            var goalId = properties.goal;
            var revenue = properties.revenue;
            clicky.goal(goalId, revenue, !!properties.noQueue);
        }
    };
    Angulartics2Clicky.prototype.validateType = function (type) {
        var EventType = ['pageview', 'click', 'download', 'outbound'];
        return EventType.indexOf(type) > -1 ? type : 'pageview';
    };
    Angulartics2Clicky.ctorParameters = function () { return [
        { type: Angulartics2 },
        { type: Title }
    ]; };
    Angulartics2Clicky.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Clicky_Factory() { return new Angulartics2Clicky(ɵɵinject(Angulartics2), ɵɵinject(Title)); }, token: Angulartics2Clicky, providedIn: "root" });
    Angulartics2Clicky = __decorate([
        Injectable({ providedIn: 'root' })
    ], Angulartics2Clicky);
    return Angulartics2Clicky;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Clicky };
//# sourceMappingURL=angulartics2-clicky.js.map
