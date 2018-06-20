"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angulartics2_1 = require("../../core/angulartics2");
var Angulartics2Intercom = /** @class */ (function () {
    function Angulartics2Intercom(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Intercom.prototype.pageTrack = function (path, location) {
        try {
            this.eventTrack('Pageview', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Intercom.prototype.eventTrack = function (action, properties) {
        try {
            Intercom('trackEvent', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Intercom.prototype.setUserProperties = function (properties) {
        try {
            if (properties.userId && !properties.user_id) {
                properties.user_id = properties.userId;
            }
            Intercom('boot', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Intercom.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Angulartics2Intercom.ctorParameters = function () { return [
        { type: angulartics2_1.Angulartics2, },
    ]; };
    return Angulartics2Intercom;
}());
exports.Angulartics2Intercom = Angulartics2Intercom;
