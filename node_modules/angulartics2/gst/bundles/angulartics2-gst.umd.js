(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/gst', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.gst = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, core, angulartics2) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            { type: angulartics2.Angulartics2 }
        ]; };
        Angulartics2GoogleGlobalSiteTag.ɵprov = core.ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(core.ɵɵinject(angulartics2.Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
        Angulartics2GoogleGlobalSiteTag = __decorate([
            core.Injectable({ providedIn: 'root' })
        ], Angulartics2GoogleGlobalSiteTag);
        return Angulartics2GoogleGlobalSiteTag;
    }());

    exports.Angulartics2GoogleGlobalSiteTag = Angulartics2GoogleGlobalSiteTag;
    exports.GoogleGlobalSiteTagDefaults = GoogleGlobalSiteTagDefaults;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-gst.umd.js.map
