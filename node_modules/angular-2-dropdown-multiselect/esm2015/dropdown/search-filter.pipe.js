/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class MultiSelectSearchFilter {
    constructor() {
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
    transform(options, str = '', limit = 0, renderLimit = 0, searchFunction) {
        str = str.toLowerCase();
        // Drop cache because options were updated
        if (options !== this._lastOptions) {
            this._lastOptions = options;
            this._searchCache = {};
            this._searchCacheInclusive = {};
            this._prevSkippedItems = {};
        }
        const /** @type {?} */ filteredOpts = this._searchCache.hasOwnProperty(str)
            ? this._searchCache[str]
            : this._doSearch(options, str, limit, searchFunction);
        const /** @type {?} */ isUnderLimit = options.length <= limit;
        return isUnderLimit
            ? filteredOpts
            : this._limitRenderedItems(filteredOpts, renderLimit);
    }
    /**
     * @param {?} options
     * @param {?} prevOptions
     * @param {?} prevSearchStr
     * @return {?}
     */
    _getSubsetOptions(options, prevOptions, prevSearchStr) {
        const /** @type {?} */ prevInclusiveOrIdx = this._searchCacheInclusive[prevSearchStr];
        if (prevInclusiveOrIdx === true) {
            // If have previous results and it was inclusive, do only subsearch
            return prevOptions;
        }
        else if (typeof prevInclusiveOrIdx === 'number') {
            // Or reuse prev results with unchecked ones
            return [...prevOptions, ...options.slice(prevInclusiveOrIdx)];
        }
        return options;
    }
    /**
     * @param {?} options
     * @param {?} str
     * @param {?} limit
     * @param {?} searchFunction
     * @return {?}
     */
    _doSearch(options, str, limit, searchFunction) {
        const /** @type {?} */ prevStr = str.slice(0, -1);
        const /** @type {?} */ prevResults = this._searchCache[prevStr];
        const /** @type {?} */ prevResultShift = this._prevSkippedItems[prevStr] || 0;
        if (prevResults) {
            options = this._getSubsetOptions(options, prevResults, prevStr);
        }
        const /** @type {?} */ optsLength = options.length;
        const /** @type {?} */ maxFound = limit > 0 ? Math.min(limit, optsLength) : optsLength;
        const /** @type {?} */ regexp = searchFunction(str);
        const /** @type {?} */ filteredOpts = [];
        let /** @type {?} */ i = 0, /** @type {?} */ founded = 0, /** @type {?} */ removedFromPrevResult = 0;
        const /** @type {?} */ doesOptionMatch = (option) => regexp.test(option.name);
        const /** @type {?} */ getChildren = (option) => options.filter(child => child.parentId === option.id);
        const /** @type {?} */ getParent = (option) => options.find(parent => option.parentId === parent.id);
        const /** @type {?} */ foundFn = (item) => { filteredOpts.push(item); founded++; };
        const /** @type {?} */ notFoundFn = prevResults ? () => removedFromPrevResult++ : () => { };
        for (; i < optsLength && founded < maxFound; ++i) {
            const /** @type {?} */ option = options[i];
            const /** @type {?} */ directMatch = doesOptionMatch(option);
            if (directMatch) {
                foundFn(option);
                continue;
            }
            if (typeof option.parentId === 'undefined') {
                const /** @type {?} */ childrenMatch = getChildren(option).some(doesOptionMatch);
                if (childrenMatch) {
                    foundFn(option);
                    continue;
                }
            }
            if (typeof option.parentId !== 'undefined') {
                const /** @type {?} */ parentMatch = doesOptionMatch(getParent(option));
                if (parentMatch) {
                    foundFn(option);
                    continue;
                }
            }
            notFoundFn();
        }
        const /** @type {?} */ totalIterations = i + prevResultShift;
        this._searchCache[str] = filteredOpts;
        this._searchCacheInclusive[str] = i === optsLength || totalIterations;
        this._prevSkippedItems[str] = removedFromPrevResult + prevResultShift;
        return filteredOpts;
    }
    /**
     * @template T
     * @param {?} items
     * @param {?} limit
     * @return {?}
     */
    _limitRenderedItems(items, limit) {
        return items.length > limit && limit > 0 ? items.slice(0, limit) : items;
    }
}
MultiSelectSearchFilter.decorators = [
    { type: Pipe, args: [{
                name: 'searchFilter'
            },] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlci5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7QUFXcEQsTUFBTTs7NEJBR3dELEVBQUU7cUNBQ0csRUFBRTtpQ0FDaEIsRUFBRTs7Ozs7Ozs7OztJQUVyRCxTQUFTLENBQ1AsT0FBNkIsRUFDN0IsR0FBRyxHQUFHLEVBQUUsRUFDUixLQUFLLEdBQUcsQ0FBQyxFQUNULFdBQVcsR0FBRyxDQUFDLEVBQ2YsY0FBdUM7UUFFdkMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7UUFHeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUVELHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDeEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBRXhELHVCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUU3QyxNQUFNLENBQUMsWUFBWTtZQUNqQixDQUFDLENB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LEdBQUcscUJBQXFCLEdBQUcsZUFBZSxDQUFDO1FBRXRFLE1BQU0sQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7O0lBR2QsbUJBQW1CLENBQUksS0FBVSxFQUFFLEtBQWE7UUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Ozs7WUF4SDVFLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsY0FBYzthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmludGVyZmFjZSBTdHJpbmdIYXNoTWFwPFQ+IHtcbiAgW2s6IHN0cmluZ106IFQ7XG59XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NlYXJjaEZpbHRlcidcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBwcml2YXRlIF9sYXN0T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW107XG4gIHByaXZhdGUgX3NlYXJjaENhY2hlOiBTdHJpbmdIYXNoTWFwPElNdWx0aVNlbGVjdE9wdGlvbltdPiA9IHt9O1xuICBwcml2YXRlIF9zZWFyY2hDYWNoZUluY2x1c2l2ZTogU3RyaW5nSGFzaE1hcDxib29sZWFuIHwgbnVtYmVyPiA9IHt9O1xuICBwcml2YXRlIF9wcmV2U2tpcHBlZEl0ZW1zOiBTdHJpbmdIYXNoTWFwPG51bWJlcj4gPSB7fTtcblxuICB0cmFuc2Zvcm0oXG4gICAgb3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXG4gICAgc3RyID0gJycsXG4gICAgbGltaXQgPSAwLFxuICAgIHJlbmRlckxpbWl0ID0gMCxcbiAgICBzZWFyY2hGdW5jdGlvbjogKHN0cjogc3RyaW5nKSA9PiBSZWdFeHAsXG4gICk6IElNdWx0aVNlbGVjdE9wdGlvbltdIHtcbiAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIERyb3AgY2FjaGUgYmVjYXVzZSBvcHRpb25zIHdlcmUgdXBkYXRlZFxuICAgIGlmIChvcHRpb25zICE9PSB0aGlzLl9sYXN0T3B0aW9ucykge1xuICAgICAgdGhpcy5fbGFzdE9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy5fc2VhcmNoQ2FjaGUgPSB7fTtcbiAgICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlID0ge307XG4gICAgICB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zID0ge307XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVyZWRPcHRzID0gdGhpcy5fc2VhcmNoQ2FjaGUuaGFzT3duUHJvcGVydHkoc3RyKVxuICAgICAgPyB0aGlzLl9zZWFyY2hDYWNoZVtzdHJdXG4gICAgICA6IHRoaXMuX2RvU2VhcmNoKG9wdGlvbnMsIHN0ciwgbGltaXQsIHNlYXJjaEZ1bmN0aW9uKTtcblxuICAgIGNvbnN0IGlzVW5kZXJMaW1pdCA9IG9wdGlvbnMubGVuZ3RoIDw9IGxpbWl0O1xuXG4gICAgcmV0dXJuIGlzVW5kZXJMaW1pdFxuICAgICAgPyBmaWx0ZXJlZE9wdHNcbiAgICAgIDogdGhpcy5fbGltaXRSZW5kZXJlZEl0ZW1zKGZpbHRlcmVkT3B0cywgcmVuZGVyTGltaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U3Vic2V0T3B0aW9ucyhcbiAgICBvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcbiAgICBwcmV2T3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sXG4gICAgcHJldlNlYXJjaFN0cjogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IHByZXZJbmNsdXNpdmVPcklkeCA9IHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3ByZXZTZWFyY2hTdHJdO1xuXG4gICAgaWYgKHByZXZJbmNsdXNpdmVPcklkeCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gSWYgaGF2ZSBwcmV2aW91cyByZXN1bHRzIGFuZCBpdCB3YXMgaW5jbHVzaXZlLCBkbyBvbmx5IHN1YnNlYXJjaFxuICAgICAgcmV0dXJuIHByZXZPcHRpb25zO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXZJbmNsdXNpdmVPcklkeCA9PT0gJ251bWJlcicpIHtcbiAgICAgIC8vIE9yIHJldXNlIHByZXYgcmVzdWx0cyB3aXRoIHVuY2hlY2tlZCBvbmVzXG4gICAgICByZXR1cm4gWy4uLnByZXZPcHRpb25zLCAuLi5vcHRpb25zLnNsaWNlKHByZXZJbmNsdXNpdmVPcklkeCldO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfZG9TZWFyY2gob3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10sIHN0cjogc3RyaW5nLCBsaW1pdDogbnVtYmVyLCBzZWFyY2hGdW5jdGlvbjogKHN0cjogc3RyaW5nKSA9PiBSZWdFeHApIHtcbiAgICBjb25zdCBwcmV2U3RyID0gc3RyLnNsaWNlKDAsIC0xKTtcbiAgICBjb25zdCBwcmV2UmVzdWx0cyA9IHRoaXMuX3NlYXJjaENhY2hlW3ByZXZTdHJdO1xuICAgIGNvbnN0IHByZXZSZXN1bHRTaGlmdCA9IHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbcHJldlN0cl0gfHwgMDtcblxuICAgIGlmIChwcmV2UmVzdWx0cykge1xuICAgICAgb3B0aW9ucyA9IHRoaXMuX2dldFN1YnNldE9wdGlvbnMob3B0aW9ucywgcHJldlJlc3VsdHMsIHByZXZTdHIpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHNMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICBjb25zdCBtYXhGb3VuZCA9IGxpbWl0ID4gMCA/IE1hdGgubWluKGxpbWl0LCBvcHRzTGVuZ3RoKSA6IG9wdHNMZW5ndGg7XG4gICAgY29uc3QgcmVnZXhwID0gc2VhcmNoRnVuY3Rpb24oc3RyKTtcbiAgICBjb25zdCBmaWx0ZXJlZE9wdHM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XG5cbiAgICBsZXQgaSA9IDAsIGZvdW5kZWQgPSAwLCByZW1vdmVkRnJvbVByZXZSZXN1bHQgPSAwO1xuXG4gICAgY29uc3QgZG9lc09wdGlvbk1hdGNoID0gKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiByZWdleHAudGVzdChvcHRpb24ubmFtZSk7XG4gICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+XG4gICAgICBvcHRpb25zLmZpbHRlcihjaGlsZCA9PiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkKTtcbiAgICBjb25zdCBnZXRQYXJlbnQgPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+XG4gICAgICBvcHRpb25zLmZpbmQocGFyZW50ID0+IG9wdGlvbi5wYXJlbnRJZCA9PT0gcGFyZW50LmlkKTtcbiAgICBjb25zdCBmb3VuZEZuID0gKGl0ZW06IGFueSkgPT4geyBmaWx0ZXJlZE9wdHMucHVzaChpdGVtKTsgZm91bmRlZCsrOyB9O1xuICAgIGNvbnN0IG5vdEZvdW5kRm4gPSBwcmV2UmVzdWx0cyA/ICgpID0+IHJlbW92ZWRGcm9tUHJldlJlc3VsdCsrIDogKCkgPT4geyB9O1xuXG4gICAgZm9yICg7IGkgPCBvcHRzTGVuZ3RoICYmIGZvdW5kZWQgPCBtYXhGb3VuZDsgKytpKSB7XG4gICAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW2ldO1xuICAgICAgY29uc3QgZGlyZWN0TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2gob3B0aW9uKTtcblxuICAgICAgaWYgKGRpcmVjdE1hdGNoKSB7XG4gICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBjaGlsZHJlbk1hdGNoID0gZ2V0Q2hpbGRyZW4ob3B0aW9uKS5zb21lKGRvZXNPcHRpb25NYXRjaCk7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuTWF0Y2gpIHtcbiAgICAgICAgICBmb3VuZEZuKG9wdGlvbik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE1hdGNoID0gZG9lc09wdGlvbk1hdGNoKGdldFBhcmVudChvcHRpb24pKTtcblxuICAgICAgICBpZiAocGFyZW50TWF0Y2gpIHtcbiAgICAgICAgICBmb3VuZEZuKG9wdGlvbik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbm90Rm91bmRGbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHRvdGFsSXRlcmF0aW9ucyA9IGkgKyBwcmV2UmVzdWx0U2hpZnQ7XG5cbiAgICB0aGlzLl9zZWFyY2hDYWNoZVtzdHJdID0gZmlsdGVyZWRPcHRzO1xuICAgIHRoaXMuX3NlYXJjaENhY2hlSW5jbHVzaXZlW3N0cl0gPSBpID09PSBvcHRzTGVuZ3RoIHx8IHRvdGFsSXRlcmF0aW9ucztcbiAgICB0aGlzLl9wcmV2U2tpcHBlZEl0ZW1zW3N0cl0gPSByZW1vdmVkRnJvbVByZXZSZXN1bHQgKyBwcmV2UmVzdWx0U2hpZnQ7XG5cbiAgICByZXR1cm4gZmlsdGVyZWRPcHRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGltaXRSZW5kZXJlZEl0ZW1zPFQ+KGl0ZW1zOiBUW10sIGxpbWl0OiBudW1iZXIpOiBUW10ge1xuICAgIHJldHVybiBpdGVtcy5sZW5ndGggPiBsaW1pdCAmJiBsaW1pdCA+IDAgPyBpdGVtcy5zbGljZSgwLCBsaW1pdCkgOiBpdGVtcztcbiAgfVxufVxuIl19