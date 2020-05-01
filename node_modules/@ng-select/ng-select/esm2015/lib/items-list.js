/**
 * @fileoverview added by tsickle
 * Generated from: lib/items-list.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { newId } from './id';
import * as searchHelper from './search-helper';
import { isDefined, isFunction, isObject } from './value-utils';
export class ItemsList {
    /**
     * @param {?} _ngSelect
     * @param {?} _selectionModel
     */
    constructor(_ngSelect, _selectionModel) {
        this._ngSelect = _ngSelect;
        this._selectionModel = _selectionModel;
        this._items = [];
        this._filteredItems = [];
        this._markedIndex = -1;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    /**
     * @return {?}
     */
    get filteredItems() {
        return this._filteredItems;
    }
    /**
     * @return {?}
     */
    get markedIndex() {
        return this._markedIndex;
    }
    /**
     * @return {?}
     */
    get selectedItems() {
        return this._selectionModel.value;
    }
    /**
     * @return {?}
     */
    get markedItem() {
        return this._filteredItems[this._markedIndex];
    }
    /**
     * @return {?}
     */
    get noItemsToSelect() {
        return this._ngSelect.hideSelected && this._items.length === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    get maxItemsSelected() {
        return this._ngSelect.multiple && this._ngSelect.maxSelectedItems <= this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    get lastSelectedItem() {
        /** @type {?} */
        let i = this.selectedItems.length - 1;
        for (; i >= 0; i--) {
            /** @type {?} */
            let item = this.selectedItems[i];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    setItems(items) {
        this._items = items.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => this.mapItem(item, index)));
        if (this._ngSelect.groupBy) {
            this._groups = this._groupBy(this._items, this._ngSelect.groupBy);
            this._items = this._flatten(this._groups);
        }
        else {
            this._groups = new Map();
            this._groups.set(undefined, this._items);
        }
        this._filteredItems = [...this._items];
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (item.selected || this.maxItemsSelected) {
            return;
        }
        /** @type {?} */
        const multiple = this._ngSelect.multiple;
        if (!multiple) {
            this.clearSelected();
        }
        this._selectionModel.select(item, multiple, this._ngSelect.selectableGroupAsModel);
        if (this._ngSelect.hideSelected) {
            this._hideSelected(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unselect(item) {
        if (!item.selected) {
            return;
        }
        this._selectionModel.unselect(item, this._ngSelect.multiple);
        if (this._ngSelect.hideSelected && isDefined(item.index) && this._ngSelect.multiple) {
            this._showSelected(item);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    findItem(value) {
        /** @type {?} */
        let findBy;
        if (this._ngSelect.compareWith) {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => this._ngSelect.compareWith(item.value, value));
        }
        else if (this._ngSelect.bindValue) {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => !item.children && this.resolveNested(item.value, this._ngSelect.bindValue) === value);
        }
        else {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => item.value === value ||
                !item.children && item.label && item.label === this.resolveNested(value, this._ngSelect.bindLabel));
        }
        return this._items.find((/**
         * @param {?} item
         * @return {?}
         */
        item => findBy(item)));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addItem(item) {
        /** @type {?} */
        const option = this.mapItem(item, this._items.length);
        this._items.push(option);
        this._filteredItems.push(option);
        return option;
    }
    /**
     * @param {?=} keepDisabled
     * @return {?}
     */
    clearSelected(keepDisabled = false) {
        this._selectionModel.clear(keepDisabled);
        this._items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            item.selected = keepDisabled && item.selected && item.disabled;
            item.marked = false;
        }));
        if (this._ngSelect.hideSelected) {
            this.resetFilteredItems();
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    findByLabel(term) {
        term = searchHelper.stripSpecialChars(term).toLocaleLowerCase();
        return this.filteredItems.find((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const label = searchHelper.stripSpecialChars(item.label).toLocaleLowerCase();
            return label.substr(0, term.length) === term;
        }));
    }
    /**
     * @param {?} term
     * @return {?}
     */
    filter(term) {
        if (!term) {
            this.resetFilteredItems();
            return;
        }
        this._filteredItems = [];
        term = this._ngSelect.searchFn ? term : searchHelper.stripSpecialChars(term).toLocaleLowerCase();
        /** @type {?} */
        const match = this._ngSelect.searchFn || this._defaultSearchFn;
        /** @type {?} */
        const hideSelected = this._ngSelect.hideSelected;
        for (const key of Array.from(this._groups.keys())) {
            /** @type {?} */
            const matchedItems = [];
            for (const item of this._groups.get(key)) {
                if (hideSelected && (item.parent && item.parent.selected || item.selected)) {
                    continue;
                }
                /** @type {?} */
                const searchItem = this._ngSelect.searchFn ? item.value : item;
                if (match(term, searchItem)) {
                    matchedItems.push(item);
                }
            }
            if (matchedItems.length > 0) {
                const [last] = matchedItems.slice(-1);
                if (last.parent) {
                    /** @type {?} */
                    const head = this._items.find((/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => x === last.parent));
                    this._filteredItems.push(head);
                }
                this._filteredItems.push(...matchedItems);
            }
        }
    }
    /**
     * @return {?}
     */
    resetFilteredItems() {
        if (this._filteredItems.length === this._items.length) {
            return;
        }
        if (this._ngSelect.hideSelected && this.selectedItems.length > 0) {
            this._filteredItems = this._items.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !x.selected));
        }
        else {
            this._filteredItems = this._items;
        }
    }
    /**
     * @return {?}
     */
    unmarkItem() {
        this._markedIndex = -1;
    }
    /**
     * @return {?}
     */
    markNextItem() {
        this._stepToItem(+1);
    }
    /**
     * @return {?}
     */
    markPreviousItem() {
        this._stepToItem(-1);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    markItem(item) {
        this._markedIndex = this._filteredItems.indexOf(item);
    }
    /**
     * @param {?=} markDefault
     * @return {?}
     */
    markSelectedOrDefault(markDefault) {
        if (this._filteredItems.length === 0) {
            return;
        }
        /** @type {?} */
        const lastMarkedIndex = this._getLastMarkedIndex();
        if (lastMarkedIndex > -1) {
            this._markedIndex = lastMarkedIndex;
        }
        else {
            this._markedIndex = markDefault ? this.filteredItems.findIndex((/**
             * @param {?} x
             * @return {?}
             */
            x => !x.disabled)) : -1;
        }
    }
    /**
     * @param {?} option
     * @param {?} key
     * @return {?}
     */
    resolveNested(option, key) {
        if (!isObject(option)) {
            return option;
        }
        if (key.indexOf('.') === -1) {
            return option[key];
        }
        else {
            /** @type {?} */
            let keys = key.split('.');
            /** @type {?} */
            let value = option;
            for (let i = 0, len = keys.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[keys[i]];
            }
            return value;
        }
    }
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    mapItem(item, index) {
        /** @type {?} */
        const label = isDefined(item.$ngOptionLabel) ? item.$ngOptionLabel : this.resolveNested(item, this._ngSelect.bindLabel);
        /** @type {?} */
        const value = isDefined(item.$ngOptionValue) ? item.$ngOptionValue : item;
        return {
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: `${this._ngSelect.dropdownId}-${index}`,
        };
    }
    /**
     * @return {?}
     */
    mapSelectedItems() {
        /** @type {?} */
        const multiple = this._ngSelect.multiple;
        for (const selected of this.selectedItems) {
            /** @type {?} */
            const value = this._ngSelect.bindValue ? this.resolveNested(selected.value, this._ngSelect.bindValue) : selected.value;
            /** @type {?} */
            const item = isDefined(value) ? this.findItem(value) : null;
            this._selectionModel.unselect(selected, multiple);
            this._selectionModel.select(item || selected, multiple, this._ngSelect.selectableGroupAsModel);
        }
        if (this._ngSelect.hideSelected) {
            this._filteredItems = this.filteredItems.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => this.selectedItems.indexOf(x) === -1));
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _showSelected(item) {
        this._filteredItems.push(item);
        if (item.parent) {
            /** @type {?} */
            const parent = item.parent;
            /** @type {?} */
            const parentExists = this._filteredItems.find((/**
             * @param {?} x
             * @return {?}
             */
            x => x === parent));
            if (!parentExists) {
                this._filteredItems.push(parent);
            }
        }
        else if (item.children) {
            for (const child of item.children) {
                child.selected = false;
                this._filteredItems.push(child);
            }
        }
        this._filteredItems = [...this._filteredItems.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => (a.index - b.index)))];
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _hideSelected(item) {
        this._filteredItems = this._filteredItems.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== item));
        if (item.parent) {
            /** @type {?} */
            const children = item.parent.children;
            if (children.every((/**
             * @param {?} x
             * @return {?}
             */
            x => x.selected))) {
                this._filteredItems = this._filteredItems.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x !== item.parent));
            }
        }
        else if (item.children) {
            this._filteredItems = this.filteredItems.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.parent !== item));
        }
    }
    /**
     * @private
     * @param {?} search
     * @param {?} opt
     * @return {?}
     */
    _defaultSearchFn(search, opt) {
        /** @type {?} */
        const label = searchHelper.stripSpecialChars(opt.label).toLocaleLowerCase();
        return label.indexOf(search) > -1;
    }
    /**
     * @private
     * @param {?} steps
     * @return {?}
     */
    _getNextItemIndex(steps) {
        if (steps > 0) {
            return (this._markedIndex === this._filteredItems.length - 1) ? 0 : (this._markedIndex + 1);
        }
        return (this._markedIndex <= 0) ? (this._filteredItems.length - 1) : (this._markedIndex - 1);
    }
    /**
     * @private
     * @param {?} steps
     * @return {?}
     */
    _stepToItem(steps) {
        if (this._filteredItems.length === 0 || this._filteredItems.every((/**
         * @param {?} x
         * @return {?}
         */
        x => x.disabled))) {
            return;
        }
        this._markedIndex = this._getNextItemIndex(steps);
        if (this.markedItem.disabled) {
            this._stepToItem(steps);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _getLastMarkedIndex() {
        if (this._ngSelect.hideSelected) {
            return -1;
        }
        if (this._markedIndex > -1 && this.markedItem === undefined) {
            return -1;
        }
        /** @type {?} */
        const selectedIndex = this._filteredItems.indexOf(this.lastSelectedItem);
        if (this.lastSelectedItem && selectedIndex < 0) {
            return -1;
        }
        return Math.max(this.markedIndex, selectedIndex);
    }
    /**
     * @private
     * @param {?} items
     * @param {?} prop
     * @return {?}
     */
    _groupBy(items, prop) {
        /** @type {?} */
        const groups = new Map();
        if (items.length === 0) {
            return groups;
        }
        // Check if items are already grouped by given key.
        if (Array.isArray(items[0].value[(/** @type {?} */ (prop))])) {
            for (const item of items) {
                /** @type {?} */
                const children = (item.value[(/** @type {?} */ (prop))] || []).map((/**
                 * @param {?} x
                 * @param {?} index
                 * @return {?}
                 */
                (x, index) => this.mapItem(x, index)));
                groups.set(item, children);
            }
            return groups;
        }
        /** @type {?} */
        const isFnKey = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        const keyFn = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            let key = isFnKey ? ((/** @type {?} */ (prop)))(item.value) : item.value[(/** @type {?} */ (prop))];
            return isDefined(key) ? key : undefined;
        });
        // Group items by key.
        for (const item of items) {
            /** @type {?} */
            let key = keyFn(item);
            /** @type {?} */
            const group = groups.get(key);
            if (group) {
                group.push(item);
            }
            else {
                groups.set(key, [item]);
            }
        }
        return groups;
    }
    /**
     * @private
     * @param {?} groups
     * @return {?}
     */
    _flatten(groups) {
        /** @type {?} */
        const isGroupByFn = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        const items = [];
        for (const key of Array.from(groups.keys())) {
            /** @type {?} */
            let i = items.length;
            if (key === undefined) {
                /** @type {?} */
                const withoutGroup = groups.get(undefined) || [];
                items.push(...withoutGroup.map((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => (Object.assign(Object.assign({}, x), { index: i++ })))));
                continue;
            }
            /** @type {?} */
            const isObjectKey = isObject(key);
            /** @type {?} */
            const parent = {
                label: isObjectKey ? '' : String(key),
                children: undefined,
                parent: null,
                index: i++,
                disabled: !this._ngSelect.selectableGroup,
                htmlId: newId(),
            };
            /** @type {?} */
            const groupKey = isGroupByFn ? this._ngSelect.bindLabel : (/** @type {?} */ (this._ngSelect.groupBy));
            /** @type {?} */
            const groupValue = this._ngSelect.groupValue || ((/**
             * @return {?}
             */
            () => {
                if (isObjectKey) {
                    return ((/** @type {?} */ (key))).value;
                }
                return { [groupKey]: key };
            }));
            /** @type {?} */
            const children = groups.get(key).map((/**
             * @param {?} x
             * @return {?}
             */
            x => {
                x.parent = parent;
                x.children = undefined;
                x.index = i++;
                return x;
            }));
            parent.children = children;
            parent.value = groupValue(key, children.map((/**
             * @param {?} x
             * @return {?}
             */
            x => x.value)));
            items.push(parent);
            items.push(...children);
        }
        return items;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._groups;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._items;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._filteredItems;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._markedIndex;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._ngSelect;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._selectionModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1zZWxlY3Qvbmctc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL2l0ZW1zLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRzdCLE9BQU8sS0FBSyxZQUFZLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSWhFLE1BQU0sT0FBTyxTQUFTOzs7OztJQUdsQixZQUNZLFNBQTRCLEVBQzVCLGVBQStCO1FBRC9CLGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBQzVCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUduQyxXQUFNLEdBQWUsRUFBRSxDQUFDO1FBTXhCLG1CQUFjLEdBQWUsRUFBRSxDQUFDO1FBTWhDLGlCQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFkMUIsQ0FBQzs7OztJQUlELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7O0lBSUQsSUFBSSxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFJRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELElBQUksYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELElBQUksZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUss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QUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7U0FDM0I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7Ozs7OztJQXRZRyw0QkFBOEI7Ozs7O0lBTzlCLDJCQUFnQzs7Ozs7SUFNaEMsbUNBQXdDOzs7OztJQU14QyxpQ0FBMEI7Ozs7O0lBaEJ0Qiw4QkFBb0M7Ozs7O0lBQ3BDLG9DQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5ld0lkIH0gZnJvbSAnLi9pZCc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbmctc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ09wdGlvbiB9IGZyb20gJy4vbmctc2VsZWN0LnR5cGVzJztcbmltcG9ydCAqIGFzIHNlYXJjaEhlbHBlciBmcm9tICcuL3NlYXJjaC1oZWxwZXInO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICcuL3NlbGVjdGlvbi1tb2RlbCc7XG5pbXBvcnQgeyBpc0RlZmluZWQsIGlzRnVuY3Rpb24sIGlzT2JqZWN0IH0gZnJvbSAnLi92YWx1ZS11dGlscyc7XG5cbnR5cGUgT3B0aW9uR3JvdXBzID0gTWFwPHN0cmluZyB8IE5nT3B0aW9uLCBOZ09wdGlvbltdPjtcblxuZXhwb3J0IGNsYXNzIEl0ZW1zTGlzdCB7XG4gICAgcHJpdmF0ZSBfZ3JvdXBzOiBPcHRpb25Hcm91cHM7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfbmdTZWxlY3Q6IE5nU2VsZWN0Q29tcG9uZW50LFxuICAgICAgICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlbDogU2VsZWN0aW9uTW9kZWwpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pdGVtczogTmdPcHRpb25bXSA9IFtdO1xuXG4gICAgZ2V0IGl0ZW1zKCk6IE5nT3B0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlsdGVyZWRJdGVtczogTmdPcHRpb25bXSA9IFtdO1xuXG4gICAgZ2V0IGZpbHRlcmVkSXRlbXMoKTogTmdPcHRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJlZEl0ZW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21hcmtlZEluZGV4ID0gLTE7XG5cbiAgICBnZXQgbWFya2VkSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcmtlZEluZGV4O1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZEl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZWwudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IG1hcmtlZEl0ZW0oKTogTmdPcHRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyZWRJdGVtc1t0aGlzLl9tYXJrZWRJbmRleF07XG4gICAgfVxuXG4gICAgZ2V0IG5vSXRlbXNUb1NlbGVjdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCAmJiB0aGlzLl9pdGVtcy5sZW5ndGggPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IG1heEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ1NlbGVjdC5tdWx0aXBsZSAmJiB0aGlzLl9uZ1NlbGVjdC5tYXhTZWxlY3RlZEl0ZW1zIDw9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RTZWxlY3RlZEl0ZW0oKSB7XG4gICAgICAgIGxldCBpID0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNbaV07XG4gICAgICAgICAgICBpZiAoIWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzZXRJdGVtcyhpdGVtczogYW55W10pIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLm1hcEl0ZW0oaXRlbSwgaW5kZXgpKTtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0Lmdyb3VwQnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2dyb3VwcyA9IHRoaXMuX2dyb3VwQnkodGhpcy5faXRlbXMsIHRoaXMuX25nU2VsZWN0Lmdyb3VwQnkpO1xuICAgICAgICAgICAgdGhpcy5faXRlbXMgPSB0aGlzLl9mbGF0dGVuKHRoaXMuX2dyb3Vwcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9ncm91cHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9ncm91cHMuc2V0KHVuZGVmaW5lZCwgdGhpcy5faXRlbXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IFsuLi50aGlzLl9pdGVtc107XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdGVkIHx8IHRoaXMubWF4SXRlbXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG11bHRpcGxlID0gdGhpcy5fbmdTZWxlY3QubXVsdGlwbGU7XG4gICAgICAgIGlmICghbXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3RlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGl0ZW0sIG11bHRpcGxlLCB0aGlzLl9uZ1NlbGVjdC5zZWxlY3RhYmxlR3JvdXBBc01vZGVsKTtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5faGlkZVNlbGVjdGVkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5zZWxlY3QoaXRlbTogTmdPcHRpb24pIHtcbiAgICAgICAgaWYgKCFpdGVtLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwudW5zZWxlY3QoaXRlbSwgdGhpcy5fbmdTZWxlY3QubXVsdGlwbGUpO1xuICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuaGlkZVNlbGVjdGVkICYmIGlzRGVmaW5lZChpdGVtLmluZGV4KSAmJiB0aGlzLl9uZ1NlbGVjdC5tdWx0aXBsZSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NlbGVjdGVkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZEl0ZW0odmFsdWU6IGFueSk6IE5nT3B0aW9uIHtcbiAgICAgICAgbGV0IGZpbmRCeTogKGl0ZW06IE5nT3B0aW9uKSA9PiBib29sZWFuO1xuICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuY29tcGFyZVdpdGgpIHtcbiAgICAgICAgICAgIGZpbmRCeSA9IGl0ZW0gPT4gdGhpcy5fbmdTZWxlY3QuY29tcGFyZVdpdGgoaXRlbS52YWx1ZSwgdmFsdWUpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmdTZWxlY3QuYmluZFZhbHVlKSB7XG4gICAgICAgICAgICBmaW5kQnkgPSBpdGVtID0+ICFpdGVtLmNoaWxkcmVuICYmIHRoaXMucmVzb2x2ZU5lc3RlZChpdGVtLnZhbHVlLCB0aGlzLl9uZ1NlbGVjdC5iaW5kVmFsdWUpID09PSB2YWx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmluZEJ5ID0gaXRlbSA9PiBpdGVtLnZhbHVlID09PSB2YWx1ZSB8fFxuICAgICAgICAgICAgICAgICFpdGVtLmNoaWxkcmVuICYmIGl0ZW0ubGFiZWwgJiYgaXRlbS5sYWJlbCA9PT0gdGhpcy5yZXNvbHZlTmVzdGVkKHZhbHVlLCB0aGlzLl9uZ1NlbGVjdC5iaW5kTGFiZWwpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmZpbmQoaXRlbSA9PiBmaW5kQnkoaXRlbSkpO1xuICAgIH1cblxuICAgIGFkZEl0ZW0oaXRlbTogYW55KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMubWFwSXRlbShpdGVtLCB0aGlzLl9pdGVtcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKG9wdGlvbik7XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMucHVzaChvcHRpb24pO1xuICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0ZWQoa2VlcERpc2FibGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoa2VlcERpc2FibGVkKTtcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBrZWVwRGlzYWJsZWQgJiYgaXRlbS5zZWxlY3RlZCAmJiBpdGVtLmRpc2FibGVkO1xuICAgICAgICAgICAgaXRlbS5tYXJrZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXJlZEl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kQnlMYWJlbCh0ZXJtOiBzdHJpbmcpIHtcbiAgICAgICAgdGVybSA9IHNlYXJjaEhlbHBlci5zdHJpcFNwZWNpYWxDaGFycyh0ZXJtKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZEl0ZW1zLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHNlYXJjaEhlbHBlci5zdHJpcFNwZWNpYWxDaGFycyhpdGVtLmxhYmVsKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGxhYmVsLnN1YnN0cigwLCB0ZXJtLmxlbmd0aCkgPT09IHRlcm07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZpbHRlcih0ZXJtOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0ZXJtKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0RmlsdGVyZWRJdGVtcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IFtdO1xuICAgICAgICB0ZXJtID0gdGhpcy5fbmdTZWxlY3Quc2VhcmNoRm4gPyB0ZXJtIDogc2VhcmNoSGVscGVyLnN0cmlwU3BlY2lhbENoYXJzKHRlcm0pLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5fbmdTZWxlY3Quc2VhcmNoRm4gfHwgdGhpcy5fZGVmYXVsdFNlYXJjaEZuO1xuICAgICAgICBjb25zdCBoaWRlU2VsZWN0ZWQgPSB0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbSh0aGlzLl9ncm91cHMua2V5cygpKSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2hlZEl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fZ3JvdXBzLmdldChrZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhpZGVTZWxlY3RlZCAmJiAoaXRlbS5wYXJlbnQgJiYgaXRlbS5wYXJlbnQuc2VsZWN0ZWQgfHwgaXRlbS5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaEl0ZW0gPSB0aGlzLl9uZ1NlbGVjdC5zZWFyY2hGbiA/IGl0ZW0udmFsdWUgOiBpdGVtO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCh0ZXJtLCBzZWFyY2hJdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWF0Y2hlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbbGFzdF0gPSBtYXRjaGVkSXRlbXMuc2xpY2UoLTEpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gdGhpcy5faXRlbXMuZmluZCh4ID0+IHggPT09IGxhc3QucGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcy5wdXNoKGhlYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2goLi4ubWF0Y2hlZEl0ZW1zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0RmlsdGVyZWRJdGVtcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbHRlcmVkSXRlbXMubGVuZ3RoID09PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSB0aGlzLl9pdGVtcy5maWx0ZXIoeCA9PiAheC5zZWxlY3RlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gdGhpcy5faXRlbXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bm1hcmtJdGVtKCkge1xuICAgICAgICB0aGlzLl9tYXJrZWRJbmRleCA9IC0xO1xuICAgIH1cblxuICAgIG1hcmtOZXh0SXRlbSgpIHtcbiAgICAgICAgdGhpcy5fc3RlcFRvSXRlbSgrMSk7XG4gICAgfVxuXG4gICAgbWFya1ByZXZpb3VzSXRlbSgpIHtcbiAgICAgICAgdGhpcy5fc3RlcFRvSXRlbSgtMSk7XG4gICAgfVxuXG4gICAgbWFya0l0ZW0oaXRlbTogTmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSB0aGlzLl9maWx0ZXJlZEl0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgfVxuXG4gICAgbWFya1NlbGVjdGVkT3JEZWZhdWx0KG1hcmtEZWZhdWx0PzogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5fZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhc3RNYXJrZWRJbmRleCA9IHRoaXMuX2dldExhc3RNYXJrZWRJbmRleCgpO1xuICAgICAgICBpZiAobGFzdE1hcmtlZEluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcmtlZEluZGV4ID0gbGFzdE1hcmtlZEluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSBtYXJrRGVmYXVsdCA/IHRoaXMuZmlsdGVyZWRJdGVtcy5maW5kSW5kZXgoeCA9PiAheC5kaXNhYmxlZCkgOiAtMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc29sdmVOZXN0ZWQob3B0aW9uOiBhbnksIGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKCFpc09iamVjdChvcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkuaW5kZXhPZignLicpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbltrZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGtleXM6IHN0cmluZ1tdID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBvcHRpb247XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0ga2V5cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW2tleXNbaV1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFwSXRlbShpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpOiBOZ09wdGlvbiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gaXNEZWZpbmVkKGl0ZW0uJG5nT3B0aW9uTGFiZWwpID8gaXRlbS4kbmdPcHRpb25MYWJlbCA6IHRoaXMucmVzb2x2ZU5lc3RlZChpdGVtLCB0aGlzLl9uZ1NlbGVjdC5iaW5kTGFiZWwpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGlzRGVmaW5lZChpdGVtLiRuZ09wdGlvblZhbHVlKSA/IGl0ZW0uJG5nT3B0aW9uVmFsdWUgOiBpdGVtO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgbGFiZWw6IGlzRGVmaW5lZChsYWJlbCkgPyBsYWJlbC50b1N0cmluZygpIDogJycsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkaXNhYmxlZDogaXRlbS5kaXNhYmxlZCxcbiAgICAgICAgICAgIGh0bWxJZDogYCR7dGhpcy5fbmdTZWxlY3QuZHJvcGRvd25JZH0tJHtpbmRleH1gLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG1hcFNlbGVjdGVkSXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IG11bHRpcGxlID0gdGhpcy5fbmdTZWxlY3QubXVsdGlwbGU7XG4gICAgICAgIGZvciAoY29uc3Qgc2VsZWN0ZWQgb2YgdGhpcy5zZWxlY3RlZEl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX25nU2VsZWN0LmJpbmRWYWx1ZSA/IHRoaXMucmVzb2x2ZU5lc3RlZChzZWxlY3RlZC52YWx1ZSwgdGhpcy5fbmdTZWxlY3QuYmluZFZhbHVlKSA6IHNlbGVjdGVkLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IGlzRGVmaW5lZCh2YWx1ZSkgPyB0aGlzLmZpbmRJdGVtKHZhbHVlKSA6IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC51bnNlbGVjdChzZWxlY3RlZCwgbXVsdGlwbGUpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KGl0ZW0gfHwgc2VsZWN0ZWQsIG11bHRpcGxlLCB0aGlzLl9uZ1NlbGVjdC5zZWxlY3RhYmxlR3JvdXBBc01vZGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSB0aGlzLmZpbHRlcmVkSXRlbXMuZmlsdGVyKHggPT4gdGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YoeCkgPT09IC0xKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dTZWxlY3RlZChpdGVtOiBOZ09wdGlvbikge1xuICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gaXRlbS5wYXJlbnQ7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRFeGlzdHMgPSB0aGlzLl9maWx0ZXJlZEl0ZW1zLmZpbmQoeCA9PiB4ID09PSBwYXJlbnQpO1xuICAgICAgICAgICAgaWYgKCFwYXJlbnRFeGlzdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMucHVzaChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IFsuLi50aGlzLl9maWx0ZXJlZEl0ZW1zLnNvcnQoKGEsIGIpID0+IChhLmluZGV4IC0gYi5pbmRleCkpXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oaWRlU2VsZWN0ZWQoaXRlbTogTmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IHRoaXMuX2ZpbHRlcmVkSXRlbXMuZmlsdGVyKHggPT4geCAhPT0gaXRlbSk7XG4gICAgICAgIGlmIChpdGVtLnBhcmVudCkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBpdGVtLnBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbi5ldmVyeSh4ID0+IHguc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IHRoaXMuX2ZpbHRlcmVkSXRlbXMuZmlsdGVyKHggPT4geCAhPT0gaXRlbS5wYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSB0aGlzLmZpbHRlcmVkSXRlbXMuZmlsdGVyKHggPT4geC5wYXJlbnQgIT09IGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFNlYXJjaEZuKHNlYXJjaDogc3RyaW5nLCBvcHQ6IE5nT3B0aW9uKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gc2VhcmNoSGVscGVyLnN0cmlwU3BlY2lhbENoYXJzKG9wdC5sYWJlbCkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxhYmVsLmluZGV4T2Yoc2VhcmNoKSA+IC0xXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TmV4dEl0ZW1JbmRleChzdGVwczogbnVtYmVyKSB7XG4gICAgICAgIGlmIChzdGVwcyA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fbWFya2VkSW5kZXggPT09IHRoaXMuX2ZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSkgPyAwIDogKHRoaXMuX21hcmtlZEluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLl9tYXJrZWRJbmRleCA8PSAwKSA/ICh0aGlzLl9maWx0ZXJlZEl0ZW1zLmxlbmd0aCAtIDEpIDogKHRoaXMuX21hcmtlZEluZGV4IC0gMSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RlcFRvSXRlbShzdGVwczogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWx0ZXJlZEl0ZW1zLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9maWx0ZXJlZEl0ZW1zLmV2ZXJ5KHggPT4geC5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21hcmtlZEluZGV4ID0gdGhpcy5fZ2V0TmV4dEl0ZW1JbmRleChzdGVwcyk7XG4gICAgICAgIGlmICh0aGlzLm1hcmtlZEl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0ZXBUb0l0ZW0oc3RlcHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TGFzdE1hcmtlZEluZGV4KCkge1xuICAgICAgICBpZiAodGhpcy5fbmdTZWxlY3QuaGlkZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbWFya2VkSW5kZXggPiAtMSAmJiB0aGlzLm1hcmtlZEl0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHRoaXMuX2ZpbHRlcmVkSXRlbXMuaW5kZXhPZih0aGlzLmxhc3RTZWxlY3RlZEl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5sYXN0U2VsZWN0ZWRJdGVtICYmIHNlbGVjdGVkSW5kZXggPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5tYXJrZWRJbmRleCwgc2VsZWN0ZWRJbmRleCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ3JvdXBCeShpdGVtczogTmdPcHRpb25bXSwgcHJvcDogc3RyaW5nIHwgRnVuY3Rpb24pOiBPcHRpb25Hcm91cHMge1xuICAgICAgICBjb25zdCBncm91cHMgPSBuZXcgTWFwPHN0cmluZyB8IE5nT3B0aW9uLCBOZ09wdGlvbltdPigpO1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXBzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXRlbXMgYXJlIGFscmVhZHkgZ3JvdXBlZCBieSBnaXZlbiBrZXkuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zWzBdLnZhbHVlWzxzdHJpbmc+cHJvcF0pKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IChpdGVtLnZhbHVlWzxzdHJpbmc+cHJvcF0gfHwgW10pLm1hcCgoeCwgaW5kZXgpID0+IHRoaXMubWFwSXRlbSh4LCBpbmRleCkpO1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5zZXQoaXRlbSwgY2hpbGRyZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzRm5LZXkgPSBpc0Z1bmN0aW9uKHRoaXMuX25nU2VsZWN0Lmdyb3VwQnkpO1xuICAgICAgICBjb25zdCBrZXlGbiA9IChpdGVtOiBOZ09wdGlvbikgPT4ge1xuICAgICAgICAgICAgbGV0IGtleSA9IGlzRm5LZXkgPyAoPEZ1bmN0aW9uPnByb3ApKGl0ZW0udmFsdWUpIDogaXRlbS52YWx1ZVs8c3RyaW5nPnByb3BdO1xuICAgICAgICAgICAgcmV0dXJuIGlzRGVmaW5lZChrZXkpID8ga2V5IDogdW5kZWZpbmVkO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEdyb3VwIGl0ZW1zIGJ5IGtleS5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0ga2V5Rm4oaXRlbSk7XG4gICAgICAgICAgICBjb25zdCBncm91cCA9IGdyb3Vwcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5zZXQoa2V5LCBbaXRlbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmxhdHRlbihncm91cHM6IE9wdGlvbkdyb3Vwcykge1xuICAgICAgICBjb25zdCBpc0dyb3VwQnlGbiA9IGlzRnVuY3Rpb24odGhpcy5fbmdTZWxlY3QuZ3JvdXBCeSk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIEFycmF5LmZyb20oZ3JvdXBzLmtleXMoKSkpIHtcbiAgICAgICAgICAgIGxldCBpID0gaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2l0aG91dEdyb3VwID0gZ3JvdXBzLmdldCh1bmRlZmluZWQpIHx8IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goLi4ud2l0aG91dEdyb3VwLm1hcCh4ID0+ICh7IC4uLngsIGluZGV4OiBpKysgfSkpKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaXNPYmplY3RLZXkgPSBpc09iamVjdChrZXkpO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50OiBOZ09wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsYWJlbDogaXNPYmplY3RLZXkgPyAnJyA6IFN0cmluZyhrZXkpLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpKyssXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLl9uZ1NlbGVjdC5zZWxlY3RhYmxlR3JvdXAsXG4gICAgICAgICAgICAgICAgaHRtbElkOiBuZXdJZCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gaXNHcm91cEJ5Rm4gPyB0aGlzLl9uZ1NlbGVjdC5iaW5kTGFiZWwgOiA8c3RyaW5nPnRoaXMuX25nU2VsZWN0Lmdyb3VwQnk7XG4gICAgICAgICAgICBjb25zdCBncm91cFZhbHVlID0gdGhpcy5fbmdTZWxlY3QuZ3JvdXBWYWx1ZSB8fCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdEtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxOZ09wdGlvbj5rZXkpLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZ3JvdXBLZXldOiBrZXkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBncm91cHMuZ2V0KGtleSkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgIHgucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIHguY2hpbGRyZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgeC5pbmRleCA9IGkrKztcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgICAgICBwYXJlbnQudmFsdWUgPSBncm91cFZhbHVlKGtleSwgY2hpbGRyZW4ubWFwKHggPT4geC52YWx1ZSkpO1xuICAgICAgICAgICAgaXRlbXMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgaXRlbXMucHVzaCguLi5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cbn1cbiJdfQ==