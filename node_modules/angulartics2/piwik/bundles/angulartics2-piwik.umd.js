(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/piwik', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.piwik = {}), global.ng.core, global.angulartics2));
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

    var Angulartics2Piwik = /** @class */ (function () {
        function Angulartics2Piwik(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof (_paq) === 'undefined') {
                console.warn('Piwik not found');
            }
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Piwik.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Piwik.prototype.pageTrack = function (path, location) {
            try {
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + '//'
                        + window.location.hostname
                        + (window.location.port ? ':' + window.location.port : '');
                }
                _paq.push(['setDocumentTitle', window.document.title]);
                _paq.push(['setCustomUrl', window.location.origin + path]);
                _paq.push(['trackPageView']);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * Track a basic event in Piwik, or send an ecommerce event.
         *
         * @param action A string corresponding to the type of event that needs to be tracked.
         * @param properties The properties that need to be logged with the event.
         */
        Angulartics2Piwik.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            var params = [];
            switch (action) {
                /**
                 * @description Sets the current page view as a product or category page view. When you call
                 * setEcommerceView it must be followed by a call to trackPageView to record the product or
                 * category page view.
                 *
                 * @link https://piwik.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
                 * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property productSKU (required) SKU: Product unique identifier
                 * @property productName (optional) Product name
                 * @property categoryName (optional) Product category, or array of up to 5 categories
                 * @property price (optional) Product Price as displayed on the page
                 */
                case 'setEcommerceView':
                    params = ['setEcommerceView',
                        properties.productSKU,
                        properties.productName,
                        properties.categoryName,
                        properties.price,
                    ];
                    break;
                /**
                 * @description Adds a product into the ecommerce order. Must be called for each product in
                 * the order.
                 *
                 * @link https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
                 * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property productSKU (required) SKU: Product unique identifier
                 * @property productName (optional) Product name
                 * @property categoryName (optional) Product category, or array of up to 5 categories
                 * @property price (recommended) Product price
                 * @property quantity (optional, default to 1) Product quantity
                 */
                case 'addEcommerceItem':
                    params = [
                        'addEcommerceItem',
                        properties.productSKU,
                        properties.productName,
                        properties.productCategory,
                        properties.price,
                        properties.quantity,
                    ];
                    break;
                /**
                 * @description Tracks a shopping cart. Call this javascript function every time a user is
                 * adding, updating or deleting a product from the cart.
                 *
                 * @link https://piwik.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
                 * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property grandTotal (required) Cart amount
                 */
                case 'trackEcommerceCartUpdate':
                    params = ['trackEcommerceCartUpdate', properties.grandTotal];
                    break;
                /**
                 * @description Tracks an Ecommerce order, including any ecommerce item previously added to
                 * the order. orderId and grandTotal (ie. revenue) are required parameters.
                 *
                 * @link https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
                 * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property orderId (required) Unique Order ID
                 * @property grandTotal (required) Order Revenue grand total (includes tax, shipping, and subtracted discount)
                 * @property subTotal (optional) Order sub total (excludes shipping)
                 * @property tax (optional) Tax amount
                 * @property shipping (optional) Shipping amount
                 * @property discount (optional) Discount offered (set to false for unspecified parameter)
                 */
                case 'trackEcommerceOrder':
                    params = [
                        'trackEcommerceOrder',
                        properties.orderId,
                        properties.grandTotal,
                        properties.subTotal,
                        properties.tax,
                        properties.shipping,
                        properties.discount,
                    ];
                    break;
                /**
                 * @description Tracks an Ecommerce goal
                 *
                 * @link https://piwik.org/docs/tracking-goals-web-analytics/
                 * @link https://developer.piwik.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
                 *
                 * @property goalId (required) Unique Goal ID
                 * @property value (optional) passed to goal tracking
                 */
                case 'trackGoal':
                    params = [
                        'trackGoal',
                        properties.goalId,
                        properties.value,
                    ];
                    break;
                /**
                 * @description Tracks a site search
                 *
                 * @link https://piwik.org/docs/site-search/
                 * @link https://developer.piwik.org/guides/tracking-javascript-guide#internal-search-tracking
                 *
                 * @property keyword (required) Keyword searched for
                 * @property category (optional) Search category
                 * @property searchCount (optional) Number of results
                 */
                case 'trackSiteSearch':
                    params = [
                        'trackSiteSearch',
                        properties.keyword,
                        properties.category,
                        properties.searchCount,
                    ];
                    break;
                /**
                 * @description Logs an event with an event category (Videos, Music, Games...), an event
                 * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
                 * event name and optional numeric value.
                 *
                 * @link https://piwik.org/docs/event-tracking/
                 * @link https://developer.piwik.org/api-reference/tracking-javascript#using-the-tracker-object
                 *
                 * @property category
                 * @property action
                 * @property name (optional, recommended)
                 * @property value (optional)
                 */
                default:
                    // PAQ requires that eventValue be an integer, see: http://piwik.org/docs/event-tracking
                    if (properties.value) {
                        var parsed = parseInt(properties.value, 10);
                        properties.value = isNaN(parsed) ? 0 : parsed;
                    }
                    params = [
                        'trackEvent',
                        properties.category,
                        action,
                        properties.name || properties.label,
                        properties.value,
                    ];
            }
            try {
                _paq.push(params);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Piwik.prototype.setUsername = function (userId) {
            try {
                _paq.push(['setUserId', userId]);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * Sets custom dimensions if at least one property has the key "dimension<n>",
         * e.g. dimension10. If there are custom dimensions, any other property is ignored.
         *
         * If there are no custom dimensions in the given properties object, the properties
         * object is saved as a custom variable.
         *
         * If in doubt, prefer custom dimensions.
         * @link https://piwik.org/docs/custom-variables/
         */
        Angulartics2Piwik.prototype.setUserProperties = function (properties) {
            var dimensions = this.setCustomDimensions(properties);
            try {
                if (dimensions.length === 0) {
                    _paq.push(['setCustomVariable', properties.index, properties.name, properties.value, properties.scope]);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Piwik.prototype.setCustomDimensions = function (properties) {
            var dimensionRegex = /dimension[1-9]\d*/;
            var dimensions = Object.keys(properties)
                .filter(function (key) { return dimensionRegex.exec(key); });
            dimensions.forEach(function (dimension) {
                var number = Number(dimension.substr(9));
                _paq.push(['setCustomDimension', number, properties[dimension]]);
            });
            return dimensions;
        };
        Angulartics2Piwik.ctorParameters = function () { return [
            { type: angulartics2.Angulartics2 }
        ]; };
        Angulartics2Piwik.ɵprov = core.ɵɵdefineInjectable({ factory: function Angulartics2Piwik_Factory() { return new Angulartics2Piwik(core.ɵɵinject(angulartics2.Angulartics2)); }, token: Angulartics2Piwik, providedIn: "root" });
        Angulartics2Piwik = __decorate([
            core.Injectable({ providedIn: 'root' })
        ], Angulartics2Piwik);
        return Angulartics2Piwik;
    }());

    exports.Angulartics2Piwik = Angulartics2Piwik;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-piwik.umd.js.map
