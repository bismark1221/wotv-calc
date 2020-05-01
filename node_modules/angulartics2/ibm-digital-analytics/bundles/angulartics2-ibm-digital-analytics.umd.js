(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/ibm-digital-analytics', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2['ibm-digital-analytics'] = {}), global.ng.core, global.angulartics2));
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

    var Angulartics2IBMDigitalAnalytics = /** @class */ (function () {
        function Angulartics2IBMDigitalAnalytics(angulartics2) {
            this.angulartics2 = angulartics2;
            if (typeof window['cmCreatePageviewTag'] !== 'function') {
                console.warn('Angulartics 2 IBM Digital Analytics Plugin: eluminate.js is not loaded');
            }
        }
        Angulartics2IBMDigitalAnalytics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * Track Page in IBM Digital Analytics
         *
         * @param path location
         *
         * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
         */
        Angulartics2IBMDigitalAnalytics.prototype.pageTrack = function (path) {
            var cmCreatePageviewTag = window['cmCreatePageviewTag'];
            cmCreatePageviewTag(path, null, null, null);
        };
        /**
         * Track an event in IBM Digital Analytics
         *
         * @param action A string corresponding to the type of event that needs to be tracked.
         * @param properties The properties that need to be logged with the event.
         */
        Angulartics2IBMDigitalAnalytics.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            var cmDisplayShops = window['cmDisplayShops'];
            switch (action) {
                /**
                 * @description The Product View tag captures information about vdigitalDataiews of product detail pages.
                 *  The Product View tag should be called on the lowest level detail page for products, which is typically
                 *  the Product Details page. You can view example Product View tags below.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_prodviewtag.html
                 */
                case 'cmCreateProductviewTag':
                    var cmCreateProductviewTag = window['cmCreateProductviewTag'];
                    cmCreateProductviewTag(properties.productId, properties.productName, properties.categoryId, properties.attrbute, properties.virtualCategory);
                    break;
                /**
                 * @description The Shop Action 5 tag captures data about selected products and which products are present in a shopping cart,
                 *  if any, when the cart is viewed.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact5tag.html
                 */
                case 'cmCreateShopAction5Tag':
                    var cmCreateShopAction5Tag = window['cmCreateShopAction5Tag'];
                    cmCreateShopAction5Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.categoryId, properties.attrbute, properties.extraFields, properties.virtualCategory);
                    cmDisplayShops();
                    break;
                /**
                 * @description The Shop Action 9 tag captures data about what products were purchased by a customer.
                 *  Like the Shop Action 5 tag, one tag should be sent for each product line item purchased. These tags should be sent
                 *  on the receipt or other completion page confirming a successful order.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact9tag.html
                 */
                case 'cmCreateShopAction9Tag':
                    var cmCreateShopAction9Tag = window['cmCreateShopAction9Tag'];
                    cmCreateShopAction9Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.registrationId, properties.orderId, properties.orderSubtotal, properties.categoryId, properties.attrbute, properties.extraFields);
                    cmDisplayShops();
                    break;
                /**
                 * @description The Order tag captures order header information such as Registration ID, order ID, order subtotal,
                 *  and shipping and handling. The Order tag should be sent on the receipt page confirming order completion.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_ordertag.html
                 */
                case 'cmCreateOrderTag':
                    var cmCreateOrderTag = window['cmCreateOrderTag'];
                    cmCreateOrderTag(properties.orderId, properties.orderSubtotal, properties.orderShipping, properties.registrationId, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.attrbute, properties.extraFields);
                    break;
                /**
                 * @description The Registration tag creates a Lifetime Visitor Experience Profile (LIVE Profile) by associating a single
                 *  common Registration ID with the IBM® Digital Analytics permanent cookie set in every browser visiting the tagged site.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_registrationtag.html
                 */
                case 'cmCreateRegistrationTag':
                    var cmCreateRegistrationTag = window['cmCreateRegistrationTag'];
                    cmCreateRegistrationTag(properties.registrationId, properties.registrantEmail, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.registrantCountry, properties.attrbute);
                    break;
                /**
                 * @description The Element tag is used to track intra-page content in IBM® Digital Analytics. Data collected by
                 *  the Element tag is used to populate values in the Element Categories and Top Viewed Elements reports.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_elementtag.html
                 */
                case 'cmCreateElementTag':
                    var cmCreateElementTag = window['cmCreateElementTag'];
                    cmCreateElementTag(properties.elementId, properties.elementCategory, properties.attrbute);
                    break;
                /**
                 * @description The Conversion Event tag is employed for tracking of general non-commerce conversion events.
                 * The Conversion Event tag is used to populate values in the Conversion Events Reports and to create Key Segments.
                 * This tag and the reports it populates enable analysis of a wide variety of site activities.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_conversioneventtag.html
                 */
                case 'cmCreateConversionEventTag':
                    var cmCreateConversionEventTag = window['cmCreateConversionEventTag'];
                    cmCreateConversionEventTag(properties.eventId, properties.actionType, properties.eventCategoryId, properties.points, properties.attrbute, properties.extraFields);
                    break;
                default:
                    console.warn('Unsupported Event Action');
            }
        };
        Angulartics2IBMDigitalAnalytics.ctorParameters = function () { return [
            { type: angulartics2.Angulartics2 }
        ]; };
        Angulartics2IBMDigitalAnalytics.ɵprov = core.ɵɵdefineInjectable({ factory: function Angulartics2IBMDigitalAnalytics_Factory() { return new Angulartics2IBMDigitalAnalytics(core.ɵɵinject(angulartics2.Angulartics2)); }, token: Angulartics2IBMDigitalAnalytics, providedIn: "root" });
        Angulartics2IBMDigitalAnalytics = __decorate([
            core.Injectable({ providedIn: 'root' })
        ], Angulartics2IBMDigitalAnalytics);
        return Angulartics2IBMDigitalAnalytics;
    }());

    exports.Angulartics2IBMDigitalAnalytics = Angulartics2IBMDigitalAnalytics;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-ibm-digital-analytics.umd.js.map
