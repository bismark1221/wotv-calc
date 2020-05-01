/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
/**
 * @record
 * @template T
 */
function StringHashMap() { }
function StringHashMap_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [k: string]: T;
    */
}
var MultiSelectSearchFilter = /** @class */ (function () {
    function MultiSelectSearchFilter() {
        this._searchCache = {};
        this._searchCacheInclusive = {};
        this._prevSkippedItems = {};
    }
    /**
     * @param {?} options
     * @param {?=} str
     * @param {?=} limit
     * @param {?=} renderLimit
     * @param {?=} searchFunction
     * @return {?}
     */
    MultiSelectSearchFilter.prototype.transform = /**
     * @param {?} options
     * @param {?=} str
     * @param {?=} limit
     * @param {?=} renderLimit
     * @param {?=} searchFunction
     * @return {?}
     */
    function (options, str, limit, renderLimit, searchFunction) {
        if (str === void 0) { str = ''; }
        if (limit === void 0) { limit = 0; }
        if (renderLimit === void 0) { renderLimit = 0; }
        str = str.toLowerCase();
        // Drop cache because options were updated
        if (options !== this._lastOptions) {
            this._lastOptions = options;
            this._searchCache = {};
            this._searchCacheInclusive = {};
            this._prevSkippedItems = {};
        }
        var /** @type {?} */ filteredOpts = this._searchCache.hasOwnProperty(str)
            ? this._searchCache[str]
            : this._doSearch(options, str, limit, searchFunction);
        var /** @type {?} */ isUnderLimit = options.length <= limit;
        return isUnderLimit
            ? filteredOpts
            : this._limitRenderedItems(filteredOpts, renderLimit);
    };
    /**
     * @param {?} options
     * @param {?} prevOptions
     * @param {?} prevSearchStr
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._getSubsetOptions = /**
     * @param {?} options
     * @param {?} prevOptions
     * @param {?} prevSearchStr
     * @return {?}
     */
    function (options, prevOptions, prevSearchStr) {
        var /** @type {?} */ prevInclusiveOrIdx = this._searchCacheInclusive[prevSearchStr];
        if (prevInclusiveOrIdx === true) {
            // If have previous results and it was inclusive, do only subsearch
            return prevOptions;
        }
        else if (typeof prevInclusiveOrIdx === 'number') {
            // Or reuse prev results with unchecked ones
            return tslib_1.__spread(prevOptions, options.slice(prevInclusiveOrIdx));
        }
        return options;
    };
    /**
     * @param {?} options
     * @param {?} str
     * @param {?} limit
     * @param {?} searchFunction
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._doSearch = /**
     * @param {?} options
     * @param {?} str
     * @param {?} limit
     * @param {?} searchFunction
     * @return {?}
     */
    function (options, str, limit, searchFunction) {
        var /** @type {?} */ prevStr = str.slice(0, -1);
        var /** @type {?} */ prevResults = this._searchCache[prevStr];
        var /** @type {?} */ prevResultShift = this._prevSkippedItems[prevStr] || 0;
        if (prevResults) {
            options = this._getSubsetOptions(options, prevResults, prevStr);
        }
        var /** @type {?} */ optsLength = options.length;
        var /** @type {?} */ maxFound = limit > 0 ? Math.min(limit, optsLength) : optsLength;
        var /** @type {?} */ regexp = searchFunction(str);
        var /** @type {?} */ filteredOpts = [];
        var /** @type {?} */ i = 0, /** @type {?} */ founded = 0, /** @type {?} */ removedFromPrevResult = 0;
        var /** @type {?} */ doesOptionMatch = function (option) { return regexp.test(option.name); };
        var /** @type {?} */ getChildren = function (option) {
            return options.filter(function (child) { return child.parentId === option.id; });
        };
        var /** @type {?} */ getParent = function (option) {
            return options.find(function (parent) { return option.parentId === parent.id; });
        };
        var /** @type {?} */ foundFn = function (item) { filteredOpts.push(item); founded++; };
        var /** @type {?} */ notFoundFn = prevResults ? function () { return removedFromPrevResult++; } : function () { };
        for (; i < optsLength && founded < maxFound; ++i) {
            var /** @type {?} */ option = options[i];
            var /** @type {?} */ directMatch = doesOptionMatch(option);
            if (directMatch) {
                foundFn(option);
                continue;
            }
            if (typeof option.parentId === 'undefined') {
                var /** @type {?} */ childrenMatch = getChildren(option).some(doesOptionMatch);
                if (childrenMatch) {
                    foundFn(option);
                    continue;
                }
            }
            if (typeof option.parentId !== 'undefined') {
                var /** @type {?} */ parentMatch = doesOptionMatch(getParent(option));
                if (parentMatch) {
                    foundFn(option);
                    continue;
                }
            }
            notFoundFn();
        }
        var /** @type {?} */ totalIterations = i + prevResultShift;
        this._searchCache[str] = filteredOpts;
        this._searchCacheInclusive[str] = i === optsLength || totalIterations;
        this._prevSkippedItems[str] = removedFromPrevResult + prevResultShift;
        return filteredOpts;
    };
    /**
     * @template T
     * @param {?} items
     * @param {?} limit
     * @return {?}
     */
    MultiSelectSearchFilter.prototype._limitRenderedItems = /**
     * @template T
     * @param {?} items
     * @param {?} limit
     * @return {?}
     */
    function (items, limit) {
        return items.length > limit && limit > 0 ? items.slice(0, limit) : items;
    };
    MultiSelectSearchFilter.decorators = [
        { type: Pipe, args: [{
                    name: 'searchFilter'
                },] }
    ];
    return MultiSelectSearchFilter;
}());
export { MultiSelectSearchFilter };
function MultiSelectSearchFilter_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiSelectSearchFilter.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiSelectSearchFilter.ctorParameters;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._lastOptions;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._searchCache;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._searchCacheInclusive;
    /** @type {?} */
    MultiSelectSearchFilter.prototype._prevSkippedItems;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7NEJBY1UsRUFBRTtxQ0FDRyxFQUFFO2lDQUNoQixFQUFFOzs7Ozs7Ozs7O0lBRXJELDJDQUFTOzs7Ozs7OztJQUFULFVBQ0UsT0FBNkIsRUFDN0IsR0FBUSxFQUNSLEtBQVMsRUFDVCxXQUFlLEVBQ2YsY0FBdUM7UUFIdkMsb0JBQUEsRUFBQSxRQUFRO1FBQ1Isc0JBQUEsRUFBQSxTQUFTO1FBQ1QsNEJBQUEsRUFBQSxlQUFlO1FBR2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFHeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUVELHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXhELHFCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUU3QyxNQUFNLENBQUMsWUFBWTtZQUNqQixDQUFDLENBQUMsWUFBWTtZQUNkLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3pEOzs7Ozs7O0lBRU8sbURBQWlCOzs7Ozs7Y0FDdkIsT0FBNkIsRUFDN0IsV0FBaUMsRUFDakMsYUFBcUI7UUFFckIscUJBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXJFLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBRWhDLE1BQU0sQ0FBQyxXQUFXLENBQUM7U0FDcEI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxrQkFBa0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUVsRCxNQUFNLGtCQUFLLFdBQVcsRUFBSyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7U0FDL0Q7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7SUFHVCwyQ0FBUzs7Ozs7OztjQUFDLE9BQTZCLEVBQUUsR0FBVyxFQUFFLEtBQWEsRUFBRSxjQUF1QztRQUNsSCxxQkFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxxQkFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxxQkFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3RCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNqRTtRQUVELHFCQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2xDLHFCQUFNLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO1FBQ3RFLHFCQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMscUJBQU0sWUFBWSxHQUF5QixFQUFFLENBQUM7UUFFOUMscUJBQUksQ0FBQyxHQUFHLENBQUMsbUJBQUUsT0FBTyxHQUFHLENBQUMsbUJBQUUscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1FBRWxELHFCQUFNLGVBQWUsR0FBRyxVQUFDLE1BQTBCLElBQUssT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQztRQUNqRixxQkFBTSxXQUFXLEdBQUcsVUFBQyxNQUEwQjtZQUM3QyxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxFQUFFLEVBQTVCLENBQTRCLENBQUM7UUFBckQsQ0FBcUQsQ0FBQztRQUN4RCxxQkFBTSxTQUFTLEdBQUcsVUFBQyxNQUEwQjtZQUMzQyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxFQUFFLEVBQTdCLENBQTZCLENBQUM7UUFBckQsQ0FBcUQsQ0FBQztRQUN4RCxxQkFBTSxPQUFPLEdBQUcsVUFBQyxJQUFTLElBQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN2RSxxQkFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFNLE9BQUEscUJBQXFCLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLENBQUMsZUFBUyxDQUFDO1FBRTNFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsSUFBSSxPQUFPLEdBQUcsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDakQscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixxQkFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTVDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEIsUUFBUSxDQUFDO2FBQ1Y7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0MscUJBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRWhFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDaEIsUUFBUSxDQUFDO2lCQUNWO2FBQ0Y7WUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDM0MscUJBQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFdkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDaEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQixRQUFRLENBQUM7aUJBQ1Y7YUFDRjtZQUVELFVBQVUsRUFBRSxDQUFDO1NBQ2Q7UUFFRCxxQkFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQztRQUU1QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsSUFBSSxlQUFlLENBQUM7UUFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFxQixHQUFHLGVBQWUsQ0FBQztRQUV0RSxNQUFNLENBQUMsWUFBWSxDQUFDOzs7Ozs7OztJQUdkLHFEQUFtQjs7Ozs7O2NBQUksS0FBVSxFQUFFLEtBQWE7UUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7OztnQkF4SDVFLElBQUksU0FBQztvQkFDSixJQUFJLEVBQUUsY0FBYztpQkFDckI7O2tDQVZEOztTQVdhLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBTdHJpbmdIYXNoTWFwPFQ+IHtcbiAgW2s6IHN0cmluZ106IFQ7XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NlYXJjaEZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIF9sYXN0T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW107XG4gIHByaXZhdGUgX3NlYXJjaENhY2hlOiBTdHJpbmdIYXNoTWFwPElNdWx0aVNlbGVjdE9wdGlvbltdPiA9IHt9O1xuICBwcml2YXRlIF9zZWFyY2hDYWNoZUluY2x1c2l2ZTogU3RyaW5nSGFzaE1hcDxib29sZWFuIHwgbnVtYmVyPiA9IHt9O1xuICBwcml2YXRlIF9wcmV2U2tpcHBlZEl0ZW1zOiBTdHJpbmdIYXNoTWFwPG51bWJlcj4gPSB7fTtcblxuICB0cmFuc2Zvcm0oXG4gICAgb3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXG4gICAgc3RyID0gJycsXG4gICAgbGltaXQgPSAwLFxuICAgIHJlbmRlckxpbWl0ID0gMCxcbiAgICBzZWFyY2hGdW5jdGlvbjogKHN0cjogc3RyaW5nKSA9PiBSZWdFeHAsXG4gICk6IElNdWx0aVNlbGVjdE9wdGlvbltdIHtcbiAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIERyb3AgY2FjaGUgYmVjYXVzZSBvcHRpb25zIHdlcmUgdXBkYXRlZFxuICAgIGlmIChvcHRpb25zICE9PSB0aGlzLl9sYXN0T3B0aW9ucykge1xuICAgICAgdGhpcy5fbGFzdE9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy5fc2VhcmNoQ2FjaGUgPSB7fTtcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlID0ge307XG4gICAgICB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zID0ge307XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVyZWRPcHRzID0gdGhpcy5fc2VhcmNoQ2FjaGUuaGFzT3duUHJvcGVydHkoc3RyKVxuICAgICAgPyB0aGlzLl9zZWFyY2hDYWNoZVtzdHJdXG4gICAgICA6IHRoaXMuX2RvU2VhcmNoKG9wdGlvbnMsIHN0ciwgbGltaXQsIHNlYXJjaEZ1bmN0aW9uKTtcblxuICAgIGNvbnN0IGlzVW5kZXJMaW1pdCA9IG9wdGlvbnMubGVuZ3RoIDw9IGxpbWl0O1xuXG4gICAgcmV0dXJuIGlzVW5kZXJMaW1pdFxuICAgICAgPyBmaWx0ZXJlZE9wdHNcbiAgICAgIDogdGhpcy5fbGltaXRSZW5kZXJlZEl0ZW1zKGZpbHRlcmVkT3B0cywgcmVuZGVyTGltaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U3Vic2V0T3B0aW9ucyhcbiAgICBvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcbiAgICBwcmV2T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXG4gICAgcHJldlNlYXJjaFN0cjogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IHByZXZJbmNsdXNpdmVPcklkeCA9IHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3ByZXZTZWFyY2hTdHJdO1xuXG4gICAgaWYgKHByZXZJbmNsdXNpdmVPcklkeCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gSWYgaGF2ZSBwcmV2aW91cyByZXN1bHRzIGFuZCBpdCB3YXMgaW5jbHVzaXZlLCBkbyBvbmx5IHN1YnNlYXJjaFxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXZJbmNsdXNpdmVPcklkeCA9PT0gJ251bWJlcicpIHtcbiAgICAgIC8vIE9yIHJldXNlIHByZXYgcmVzdWx0cyB3aXRoIHVuY2hlY2tlZCBvbmVzXG4gICAgICByZXR1cm4gWy4uLnByZXZPcHRpb25zLCAuLi5vcHRpb25zLnNsaWNlKHByZXZJbmNsdXNpdmVPcklkeCldO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfZG9TZWFyY2gob3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sIHN0cjogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBzZWFyY2hGdW5jdGlvbjogKHN0cjogc3RyaW5nKSA9PiBSZWdFeHApIHtcbiAgICBjb25zdCBwcmV2U3RyID0gc3RyLnNsaWNlKDAsIC0xKTtcbiAgICBjb25zdCBwcmV2UmVzdWx0cyA9IHRoaXMuX3NlYXJjaENhY2hlW3ByZXZTdHJdO1xuICAgIGNvbnN0IHByZXZSZXN1bHRTaGlmdCA9IHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbcHJldlN0cl0gfHwgMDtcblxuICAgIGlmIChwcmV2UmVzdWx0cykge1xuICAgICAgb3B0aW9ucyA9IHRoaXMuX2dldFN1YnNldE9wdGlvbnMob3B0aW9ucywgcHJldlJlc3VsdHMsIHByZXZTdHIpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHNMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICBjb25zdCBtYXhGb3VuZCA9IGxpbWl0ID4gMCA/IE1hdGgubWluKGxpbWl0LCBvcHRzTGVuZ3RoKSA6IG9wdHNMZW5ndGg7XG4gICAgY29uc3QgcmVnZXhwID0gc2VhcmNoRnVuY3Rpb24oc3RyKTtcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XG5cbiAgICBsZXQgaSA9IDAsIGZvdW5kZWQgPSAwLCByZW1vdmVkRnJvbVByZXZSZXN1bHQgPSAwO1xuXG4gICAgY29uc3QgZG9lc09wdGlvbk1hdGNoID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiByZWdleHAudGVzdChvcHRpb24ubmFtZSk7XG4gICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+XG4gICAgICBvcHRpb25zLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkKTtcbiAgICBjb25zdCBnZXRQYXJlbnQgPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+XG4gICAgICBvcHRpb25zLmZpbmQocGFyZW50ID0+IG9wdGlvbi5wYXJlbnRJZCA9PT0gcGFyZW50LmlkKTtcbiAgICBjb25zdCBmb3VuZEZuID0gKGl0ZW06IGFueSkgPT4geyBmaWx0ZXJlZE9wdHMucHVzaChpdGVtKTsgZm91bmRlZCsrOyB9O1xuICAgIGNvbnN0IG5vdEZvdW5kRm4gPSBwcmV2UmVzdWx0cyA/ICgpID0+IHJlbW92ZWRGcm9tUHJldlJlc3VsdCsrIDogKCkgPT4geyB9O1xuXG4gICAgZm9yICg7IGkgPCBvcHRzTGVuZ3RoICYmIGZvdW5kZWQgPCBtYXhGb3VuZDsgKytpKSB7XG4gICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgY29uc3QgZGlyZWN0TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2gob3B0aW9uKTtcblxuICAgICAgaWYgKGRpcmVjdE1hdGNoKSB7XG4gICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBjaGlsZHJlbk1hdGNoID0gZ2V0Q2hpbGRyZW4ob3B0aW9uKS5zb21lKGRvZXNPcHRpb25NYXRjaCk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuTWF0Y2gpIHtcbiAgICAgICAgICBmb3VuZEZuKG9wdGlvbik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE1hdGNoID0gZG9lc09wdGlvbk1hdGNoKGdldFBhcmVudChvcHRpb24pKTtcblxuICAgICAgICBpZiAocGFyZW50TWF0Y2gpIHtcbiAgICAgICAgICBmb3VuZEZuKG9wdGlvbik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbm90Rm91bmRGbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHRvdGFsSXRlcmF0aW9ucyA9IGkgKyBwcmV2UmVzdWx0U2hpZnQ7XG5cbiAgICB0aGlzLl9zZWFyY2hDYWNoZVtzdHJdID0gZmlsdGVyZWRPcHRzO1xuICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3N0cl0gPSBpID09PSBvcHRzTGVuZ3RoIHx8IHRvdGFsSXRlcmF0aW9ucztcbiAgICB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zW3N0cl0gPSByZW1vdmVkRnJvbVByZXZSZXN1bHQgKyBwcmV2UmVzdWx0U2hpZnQ7XG5cbiAgICByZXR1cm4gZmlsdGVyZWRPcHRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGltaXRSZW5kZXJlZEl0ZW1zPFQ+KGl0ZW1zOiBUW10sIGxpbWl0OiBudW1iZXIpOiBUW10ge1xuICAgIHJldHVybiBpdGVtcy5sZW5ndGggPiBsaW1pdCAmJiBsaW1pdCA+IDAgPyBpdGVtcy5zbGljZSgwLCBsaW1pdCkgOiBpdGVtcztcbiAgfVxufVxuIl19