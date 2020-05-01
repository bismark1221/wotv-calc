/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-dropdown-panel.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * @record
 */
export function ItemsRangeResult() { }
if (false) {
    /** @type {?} */
    ItemsRangeResult.prototype.scrollHeight;
    /** @type {?} */
    ItemsRangeResult.prototype.topPadding;
    /** @type {?} */
    ItemsRangeResult.prototype.start;
    /** @type {?} */
    ItemsRangeResult.prototype.end;
}
/**
 * @record
 */
export function PanelDimensions() { }
if (false) {
    /** @type {?} */
    PanelDimensions.prototype.itemHeight;
    /** @type {?} */
    PanelDimensions.prototype.panelHeight;
    /** @type {?} */
    PanelDimensions.prototype.itemsPerViewport;
}
export class NgDropdownPanelService {
    constructor() {
        this._dimensions = {
            itemHeight: 0,
            panelHeight: 0,
            itemsPerViewport: 0
        };
    }
    /**
     * @return {?}
     */
    get dimensions() {
        return this._dimensions;
    }
    /**
     * @param {?} scrollPos
     * @param {?} itemsLength
     * @param {?} buffer
     * @return {?}
     */
    calculateItems(scrollPos, itemsLength, buffer) {
        /** @type {?} */
        const d = this._dimensions;
        /** @type {?} */
        const scrollHeight = d.itemHeight * itemsLength;
        /** @type {?} */
        const scrollTop = Math.max(0, scrollPos);
        /** @type {?} */
        const indexByScrollTop = scrollTop / scrollHeight * itemsLength;
        /** @type {?} */
        let end = Math.min(itemsLength, Math.ceil(indexByScrollTop) + (d.itemsPerViewport + 1));
        /** @type {?} */
        const maxStartEnd = end;
        /** @type {?} */
        const maxStart = Math.max(0, maxStartEnd - d.itemsPerViewport);
        /** @type {?} */
        let start = Math.min(maxStart, Math.floor(indexByScrollTop));
        /** @type {?} */
        let topPadding = d.itemHeight * Math.ceil(start) - (d.itemHeight * Math.min(start, buffer));
        topPadding = !isNaN(topPadding) ? topPadding : 0;
        start = !isNaN(start) ? start : -1;
        end = !isNaN(end) ? end : -1;
        start -= buffer;
        start = Math.max(0, start);
        end += buffer;
        end = Math.min(itemsLength, end);
        return {
            topPadding,
            scrollHeight,
            start,
            end
        };
    }
    /**
     * @param {?} itemHeight
     * @param {?} panelHeight
     * @return {?}
     */
    setDimensions(itemHeight, panelHeight) {
        /** @type {?} */
        const itemsPerViewport = Math.max(1, Math.floor(panelHeight / itemHeight));
        this._dimensions = {
            itemHeight,
            panelHeight,
            itemsPerViewport
        };
    }
    /**
     * @param {?} itemTop
     * @param {?} itemHeight
     * @param {?} lastScroll
     * @return {?}
     */
    getScrollTo(itemTop, itemHeight, lastScroll) {
        const { panelHeight } = this.dimensions;
        /** @type {?} */
        const itemBottom = itemTop + itemHeight;
        /** @type {?} */
        const top = lastScroll;
        /** @type {?} */
        const bottom = top + panelHeight;
        if (panelHeight >= itemBottom && lastScroll === itemTop) {
            return null;
        }
        if (itemBottom > bottom) {
            return top + itemBottom - bottom;
        }
        else if (itemTop <= top) {
            return itemTop;
        }
        return null;
    }
}
NgDropdownPanelService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgDropdownPanelService.prototype._dimensions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZHJvcGRvd24tcGFuZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zZWxlY3Qvbmctc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL25nLWRyb3Bkb3duLXBhbmVsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBQzNDLHNDQUtDOzs7SUFKRyx3Q0FBcUI7O0lBQ3JCLHNDQUFtQjs7SUFDbkIsaUNBQWM7O0lBQ2QsK0JBQVk7Ozs7O0FBR2hCLHFDQUlDOzs7SUFIRyxxQ0FBbUI7O0lBQ25CLHNDQUFvQjs7SUFDcEIsMkNBQXlCOztBQUk3QixNQUFNLE9BQU8sc0JBQXNCO0lBRG5DO1FBR1ksZ0JBQVcsR0FBb0I7WUFDbkMsVUFBVSxFQUFFLENBQUM7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLGdCQUFnQixFQUFFLENBQUM7U0FDdEIsQ0FBQztJQThETixDQUFDOzs7O0lBNURHLElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7Ozs7O0lBRUQsY0FBYyxDQUFDLFNBQWlCLEVBQUUsV0FBbUIsRUFBRSxNQUFjOztjQUMzRCxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVc7O2NBQ3BCLFlBQVksR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLFdBQVc7O2NBRXpDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUM7O2NBQ2xDLGdCQUFnQixHQUFHLFNBQVMsR0FBRyxZQUFZLEdBQUcsV0FBVzs7WUFDM0QsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Y0FFakYsV0FBVyxHQUFHLEdBQUc7O2NBQ2pCLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDOztZQUMxRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztZQUV4RCxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRixVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxJQUFJLE1BQU0sQ0FBQztRQUNoQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUNkLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqQyxPQUFPO1lBQ0gsVUFBVTtZQUNWLFlBQVk7WUFDWixLQUFLO1lBQ0wsR0FBRztTQUNOLENBQUE7SUFDTCxDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQUMsVUFBa0IsRUFBRSxXQUFtQjs7Y0FDM0MsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNmLFVBQVU7WUFDVixXQUFXO1lBQ1gsZ0JBQWdCO1NBQ25CLENBQUM7SUFDTixDQUFDOzs7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxVQUFrQixFQUFFLFVBQWtCO2NBQ3pELEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVU7O2NBQ2pDLFVBQVUsR0FBRyxPQUFPLEdBQUcsVUFBVTs7Y0FDakMsR0FBRyxHQUFHLFVBQVU7O2NBQ2hCLE1BQU0sR0FBRyxHQUFHLEdBQUcsV0FBVztRQUVoQyxJQUFJLFdBQVcsSUFBSSxVQUFVLElBQUksVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUNyRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxVQUFVLEdBQUcsTUFBTSxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUM7U0FDcEM7YUFBTSxJQUFJLE9BQU8sSUFBSSxHQUFHLEVBQUU7WUFDdkIsT0FBTyxPQUFPLENBQUM7U0FDbEI7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7WUFwRUosVUFBVTs7Ozs7OztJQUdQLDZDQUlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBJdGVtc1JhbmdlUmVzdWx0IHtcbiAgICBzY3JvbGxIZWlnaHQ6IG51bWJlcjtcbiAgICB0b3BQYWRkaW5nOiBudW1iZXI7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYW5lbERpbWVuc2lvbnMge1xuICAgIGl0ZW1IZWlnaHQ6IG51bWJlcjtcbiAgICBwYW5lbEhlaWdodDogbnVtYmVyO1xuICAgIGl0ZW1zUGVyVmlld3BvcnQ6IG51bWJlcjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5nRHJvcGRvd25QYW5lbFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfZGltZW5zaW9uczogUGFuZWxEaW1lbnNpb25zID0ge1xuICAgICAgICBpdGVtSGVpZ2h0OiAwLFxuICAgICAgICBwYW5lbEhlaWdodDogMCxcbiAgICAgICAgaXRlbXNQZXJWaWV3cG9ydDogMFxuICAgIH07XG5cbiAgICBnZXQgZGltZW5zaW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnM7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlSXRlbXMoc2Nyb2xsUG9zOiBudW1iZXIsIGl0ZW1zTGVuZ3RoOiBudW1iZXIsIGJ1ZmZlcjogbnVtYmVyKTogSXRlbXNSYW5nZVJlc3VsdCB7XG4gICAgICAgIGNvbnN0IGQgPSB0aGlzLl9kaW1lbnNpb25zO1xuICAgICAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBkLml0ZW1IZWlnaHQgKiBpdGVtc0xlbmd0aDtcblxuICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSBNYXRoLm1heCgwLCBzY3JvbGxQb3MpO1xuICAgICAgICBjb25zdCBpbmRleEJ5U2Nyb2xsVG9wID0gc2Nyb2xsVG9wIC8gc2Nyb2xsSGVpZ2h0ICogaXRlbXNMZW5ndGg7XG4gICAgICAgIGxldCBlbmQgPSBNYXRoLm1pbihpdGVtc0xlbmd0aCwgTWF0aC5jZWlsKGluZGV4QnlTY3JvbGxUb3ApICsgKGQuaXRlbXNQZXJWaWV3cG9ydCArIDEpKTtcblxuICAgICAgICBjb25zdCBtYXhTdGFydEVuZCA9IGVuZDtcbiAgICAgICAgY29uc3QgbWF4U3RhcnQgPSBNYXRoLm1heCgwLCBtYXhTdGFydEVuZCAtIGQuaXRlbXNQZXJWaWV3cG9ydCk7XG4gICAgICAgIGxldCBzdGFydCA9IE1hdGgubWluKG1heFN0YXJ0LCBNYXRoLmZsb29yKGluZGV4QnlTY3JvbGxUb3ApKTtcblxuICAgICAgICBsZXQgdG9wUGFkZGluZyA9IGQuaXRlbUhlaWdodCAqIE1hdGguY2VpbChzdGFydCkgLSAoZC5pdGVtSGVpZ2h0ICogTWF0aC5taW4oc3RhcnQsIGJ1ZmZlcikpO1xuICAgICAgICB0b3BQYWRkaW5nID0gIWlzTmFOKHRvcFBhZGRpbmcpID8gdG9wUGFkZGluZyA6IDA7XG4gICAgICAgIHN0YXJ0ID0gIWlzTmFOKHN0YXJ0KSA/IHN0YXJ0IDogLTE7XG4gICAgICAgIGVuZCA9ICFpc05hTihlbmQpID8gZW5kIDogLTE7XG4gICAgICAgIHN0YXJ0IC09IGJ1ZmZlcjtcbiAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgwLCBzdGFydCk7XG4gICAgICAgIGVuZCArPSBidWZmZXI7XG4gICAgICAgIGVuZCA9IE1hdGgubWluKGl0ZW1zTGVuZ3RoLCBlbmQpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3BQYWRkaW5nLFxuICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgICBlbmRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldERpbWVuc2lvbnMoaXRlbUhlaWdodDogbnVtYmVyLCBwYW5lbEhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zUGVyVmlld3BvcnQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHBhbmVsSGVpZ2h0IC8gaXRlbUhlaWdodCkpO1xuICAgICAgICB0aGlzLl9kaW1lbnNpb25zID0ge1xuICAgICAgICAgICAgaXRlbUhlaWdodCxcbiAgICAgICAgICAgIHBhbmVsSGVpZ2h0LFxuICAgICAgICAgICAgaXRlbXNQZXJWaWV3cG9ydFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFNjcm9sbFRvKGl0ZW1Ub3A6IG51bWJlciwgaXRlbUhlaWdodDogbnVtYmVyLCBsYXN0U2Nyb2xsOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgeyBwYW5lbEhlaWdodCB9ID0gdGhpcy5kaW1lbnNpb25zO1xuICAgICAgICBjb25zdCBpdGVtQm90dG9tID0gaXRlbVRvcCArIGl0ZW1IZWlnaHQ7XG4gICAgICAgIGNvbnN0IHRvcCA9IGxhc3RTY3JvbGw7XG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IHRvcCArIHBhbmVsSGVpZ2h0O1xuXG4gICAgICAgIGlmIChwYW5lbEhlaWdodCA+PSBpdGVtQm90dG9tICYmIGxhc3RTY3JvbGwgPT09IGl0ZW1Ub3ApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW1Cb3R0b20gPiBib3R0b20pIHtcbiAgICAgICAgICAgIHJldHVybiB0b3AgKyBpdGVtQm90dG9tIC0gYm90dG9tO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPD0gdG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiJdfQ==