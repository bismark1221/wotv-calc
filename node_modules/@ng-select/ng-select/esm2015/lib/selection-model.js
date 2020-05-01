/**
 * @fileoverview added by tsickle
 * Generated from: lib/selection-model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
export function DefaultSelectionModelFactory() {
    return new DefaultSelectionModel();
}
/**
 * @record
 */
export function SelectionModel() { }
if (false) {
    /** @type {?} */
    SelectionModel.prototype.value;
    /**
     * @param {?} item
     * @param {?} multiple
     * @param {?} selectableGroupAsModel
     * @return {?}
     */
    SelectionModel.prototype.select = function (item, multiple, selectableGroupAsModel) { };
    /**
     * @param {?} item
     * @param {?} multiple
     * @return {?}
     */
    SelectionModel.prototype.unselect = function (item, multiple) { };
    /**
     * @param {?} keepDisabled
     * @return {?}
     */
    SelectionModel.prototype.clear = function (keepDisabled) { };
}
export class DefaultSelectionModel {
    constructor() {
        this._selected = [];
    }
    /**
     * @return {?}
     */
    get value() {
        return this._selected;
    }
    /**
     * @param {?} item
     * @param {?} multiple
     * @param {?} groupAsModel
     * @return {?}
     */
    select(item, multiple, groupAsModel) {
        item.selected = true;
        if (!item.children || (!multiple && groupAsModel)) {
            this._selected.push(item);
        }
        if (multiple) {
            if (item.parent) {
                /** @type {?} */
                const childrenCount = item.parent.children.length;
                /** @type {?} */
                const selectedCount = item.parent.children.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x.selected)).length;
                item.parent.selected = childrenCount === selectedCount;
            }
            else if (item.children) {
                this._setChildrenSelectedState(item.children, true);
                this._removeChildren(item);
                if (groupAsModel && this._activeChildren(item)) {
                    this._selected = [...this._selected.filter((/**
                         * @param {?} x
                         * @return {?}
                         */
                        x => x.parent !== item)), item];
                }
                else {
                    this._selected = [...this._selected, ...item.children.filter((/**
                         * @param {?} x
                         * @return {?}
                         */
                        x => !x.disabled))];
                }
            }
        }
    }
    /**
     * @param {?} item
     * @param {?} multiple
     * @return {?}
     */
    unselect(item, multiple) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== item));
        item.selected = false;
        if (multiple) {
            if (item.parent && item.parent.selected) {
                /** @type {?} */
                const children = item.parent.children;
                this._removeParent(item.parent);
                this._removeChildren(item.parent);
                this._selected.push(...children.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x !== item && !x.disabled)));
                item.parent.selected = false;
            }
            else if (item.children) {
                this._setChildrenSelectedState(item.children, false);
                this._removeChildren(item);
            }
        }
    }
    /**
     * @param {?} keepDisabled
     * @return {?}
     */
    clear(keepDisabled) {
        this._selected = keepDisabled ? this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.disabled)) : [];
    }
    /**
     * @private
     * @param {?} children
     * @param {?} selected
     * @return {?}
     */
    _setChildrenSelectedState(children, selected) {
        for (const child of children) {
            if (child.disabled) {
                continue;
            }
            child.selected = selected;
        }
        ;
    }
    /**
     * @private
     * @param {?} parent
     * @return {?}
     */
    _removeChildren(parent) {
        this._selected = [
            ...this._selected.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.parent !== parent)),
            ...parent.children.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.parent === parent && x.disabled && x.selected))
        ];
    }
    /**
     * @private
     * @param {?} parent
     * @return {?}
     */
    _removeParent(parent) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== parent));
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _activeChildren(item) {
        return item.children.every((/**
         * @param {?} x
         * @return {?}
         */
        x => !x.disabled || x.selected));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DefaultSelectionModel.prototype._selected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLXNlbGVjdC9uZy1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0aW9uLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLDRCQUE0QjtJQUN4QyxPQUFPLElBQUkscUJBQXFCLEVBQUUsQ0FBQztBQUN2QyxDQUFDOzs7O0FBRUQsb0NBS0M7OztJQUpHLCtCQUFrQjs7Ozs7OztJQUNsQix3RkFBMkU7Ozs7OztJQUMzRSxrRUFBNEM7Ozs7O0lBQzVDLDZEQUE2Qjs7QUFHakMsTUFBTSxPQUFPLHFCQUFxQjtJQUFsQztRQUNZLGNBQVMsR0FBZSxFQUFFLENBQUM7SUF3RXZDLENBQUM7Ozs7SUF0RUcsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBYyxFQUFFLFFBQWlCLEVBQUUsWUFBcUI7UUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztzQkFDUCxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTs7c0JBQzNDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBQyxDQUFDLE1BQU07Z0JBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLGFBQWEsS0FBSyxh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LEVBQUM7WUFDbEQsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBQztTQUNsRixDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBRU8sYUFBYSxDQUFDLE1BQWdCO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFDLENBQUE7SUFDN0QsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLElBQWM7UUFDbEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKOzs7Ozs7SUF4RUcsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdPcHRpb24gfSBmcm9tICcuL25nLXNlbGVjdC50eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdGlvbk1vZGVsRmFjdG9yeSA9ICgpID0+IFNlbGVjdGlvbk1vZGVsO1xuXG5leHBvcnQgZnVuY3Rpb24gRGVmYXVsdFNlbGVjdGlvbk1vZGVsRmFjdG9yeSgpIHtcbiAgICByZXR1cm4gbmV3IERlZmF1bHRTZWxlY3Rpb25Nb2RlbCgpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGlvbk1vZGVsIHtcbiAgICB2YWx1ZTogTmdPcHRpb25bXTtcbiAgICBzZWxlY3QoaXRlbTogTmdPcHRpb24sIG11bHRpcGxlOiBib29sZWFuLCBzZWxlY3RhYmxlR3JvdXBBc01vZGVsOiBib29sZWFuKTtcbiAgICB1bnNlbGVjdChpdGVtOiBOZ09wdGlvbiwgbXVsdGlwbGU6IGJvb2xlYW4pO1xuICAgIGNsZWFyKGtlZXBEaXNhYmxlZDogYm9vbGVhbik7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0U2VsZWN0aW9uTW9kZWwgaW1wbGVtZW50cyBTZWxlY3Rpb25Nb2RlbCB7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IE5nT3B0aW9uW10gPSBbXTtcblxuICAgIGdldCB2YWx1ZSgpOiBOZ09wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBOZ09wdGlvbiwgbXVsdGlwbGU6IGJvb2xlYW4sIGdyb3VwQXNNb2RlbDogYm9vbGVhbikge1xuICAgICAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8ICghbXVsdGlwbGUgJiYgZ3JvdXBBc01vZGVsKSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuQ291bnQgPSBpdGVtLnBhcmVudC5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IGl0ZW0ucGFyZW50LmNoaWxkcmVuLmZpbHRlcih4ID0+IHguc2VsZWN0ZWQpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpdGVtLnBhcmVudC5zZWxlY3RlZCA9IGNoaWxkcmVuQ291bnQgPT09IHNlbGVjdGVkQ291bnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRDaGlsZHJlblNlbGVjdGVkU3RhdGUoaXRlbS5jaGlsZHJlbiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ2hpbGRyZW4oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwQXNNb2RlbCAmJiB0aGlzLl9hY3RpdmVDaGlsZHJlbihpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IFsuLi50aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4LnBhcmVudCAhPT0gaXRlbSksIGl0ZW1dXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBbLi4udGhpcy5fc2VsZWN0ZWQsIC4uLml0ZW0uY2hpbGRyZW4uZmlsdGVyKHggPT4gIXguZGlzYWJsZWQpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bnNlbGVjdChpdGVtOiBOZ09wdGlvbiwgbXVsdGlwbGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4ICE9PSBpdGVtKTtcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudCAmJiBpdGVtLnBhcmVudC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbS5wYXJlbnQuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGFyZW50KGl0ZW0ucGFyZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDaGlsZHJlbihpdGVtLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQucHVzaCguLi5jaGlsZHJlbi5maWx0ZXIoeCA9PiB4ICE9PSBpdGVtICYmICF4LmRpc2FibGVkKSk7XG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldENoaWxkcmVuU2VsZWN0ZWRTdGF0ZShpdGVtLmNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ2hpbGRyZW4oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcihrZWVwRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBrZWVwRGlzYWJsZWQgPyB0aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4LmRpc2FibGVkKSA6IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldENoaWxkcmVuU2VsZWN0ZWRTdGF0ZShjaGlsZHJlbjogTmdPcHRpb25bXSwgc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92ZUNoaWxkcmVuKHBhcmVudDogTmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBbXG4gICAgICAgICAgICAuLi50aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4LnBhcmVudCAhPT0gcGFyZW50KSwgXG4gICAgICAgICAgICAuLi5wYXJlbnQuY2hpbGRyZW4uZmlsdGVyKHggPT4geC5wYXJlbnQgPT09IHBhcmVudCAmJiB4LmRpc2FibGVkICYmIHguc2VsZWN0ZWQpXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlUGFyZW50KHBhcmVudDogTmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4ICE9PSBwYXJlbnQpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWN0aXZlQ2hpbGRyZW4oaXRlbTogTmdPcHRpb24pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uY2hpbGRyZW4uZXZlcnkoeCA9PiAheC5kaXNhYmxlZCB8fCB4LnNlbGVjdGVkKTtcbiAgICB9XG59XG4iXX0=