/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IMultiSelectOption() { }
function IMultiSelectOption_tsickle_Closure_declarations() {
    /** @type {?} */
    IMultiSelectOption.prototype.id;
    /** @type {?} */
    IMultiSelectOption.prototype.name;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.disabled;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.isLabel;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.parentId;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.params;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.classes;
    /** @type {?|undefined} */
    IMultiSelectOption.prototype.image;
}
/**
 * @record
 */
export function IMultiSelectSettings() { }
function IMultiSelectSettings_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.pullRight;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.enableSearch;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.closeOnClickOutside;
    /**
     * 0 - By default
     * If `enableSearch=true` and total amount of items more then `searchRenderLimit` (0 - No limit)
     * then render items only when user typed more then or equal `searchRenderAfter` charachters
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchRenderLimit;
    /**
     * 3 - By default
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchRenderAfter;
    /**
     * 0 - By default
     * If >0 will render only N first items
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchMaxLimit;
    /**
     * 0 - By default
     * Used with searchMaxLimit to further limit rendering for optimization
     * Should be less than searchMaxLimit to take effect
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.searchMaxRenderedItems;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.checkedStyle;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.buttonClasses;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.itemClasses;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.containerClasses;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.selectionLimit;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.minSelectionLimit;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.closeOnSelect;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.autoUnselect;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.showCheckAll;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.showUncheckAll;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.fixedTitle;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.dynamicTitleMaxItems;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.maxHeight;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.displayAllSelectedText;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.isLazyLoad;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.loadViewDistance;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.stopScrollPropagation;
    /** @type {?|undefined} */
    IMultiSelectSettings.prototype.selectAddedValues;
    /**
     * false - By default
     * If activated label IDs don't count and won't be written to the model.
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.ignoreLabels;
    /**
     * false - By default
     * If activated, the title will show selections in the order they were selected.
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.maintainSelectionOrderInTitle;
    /**
     * \@default true
     * Set the focus back to the input control when the dropdown closed
     * @type {?|undefined}
     */
    IMultiSelectSettings.prototype.focusBack;
}
/**
 * @record
 */
export function IMultiSelectTexts() { }
function IMultiSelectTexts_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.checkAll;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.uncheckAll;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.checked;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.checkedPlural;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.searchPlaceholder;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.searchEmptyResult;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.searchNoRenderText;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.defaultTitle;
    /** @type {?|undefined} */
    IMultiSelectTexts.prototype.allSelected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvIiwic291cmNlcyI6WyJkcm9wZG93bi90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBJTXVsdGlTZWxlY3RPcHRpb24ge1xuICBpZDogYW55O1xuICBuYW1lOiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgaXNMYWJlbD86IGJvb2xlYW47XG4gIHBhcmVudElkPzogYW55O1xuICBwYXJhbXM/OiBhbnk7XG4gIGNsYXNzZXM/OiBzdHJpbmc7XG4gIGltYWdlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElNdWx0aVNlbGVjdFNldHRpbmdzIHtcbiAgcHVsbFJpZ2h0PzogYm9vbGVhbjtcbiAgZW5hYmxlU2VhcmNoPzogYm9vbGVhbjtcbiAgY2xvc2VPbkNsaWNrT3V0c2lkZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiAwIC0gQnkgZGVmYXVsdFxuICAgKiBJZiBgZW5hYmxlU2VhcmNoPXRydWVgIGFuZCB0b3RhbCBhbW91bnQgb2YgaXRlbXMgbW9yZSB0aGVuIGBzZWFyY2hSZW5kZXJMaW1pdGAgKDAgLSBObyBsaW1pdClcbiAgICogdGhlbiByZW5kZXIgaXRlbXMgb25seSB3aGVuIHVzZXIgdHlwZWQgbW9yZSB0aGVuIG9yIGVxdWFsIGBzZWFyY2hSZW5kZXJBZnRlcmAgY2hhcmFjaHRlcnNcbiAgICovXG4gIHNlYXJjaFJlbmRlckxpbWl0PzogbnVtYmVyO1xuICAvKipcbiAgICogMyAtIEJ5IGRlZmF1bHRcbiAgICovXG4gIHNlYXJjaFJlbmRlckFmdGVyPzogbnVtYmVyO1xuICAvKipcbiAgICogMCAtIEJ5IGRlZmF1bHRcbiAgICogSWYgPjAgd2lsbCByZW5kZXIgb25seSBOIGZpcnN0IGl0ZW1zXG4gICAqL1xuICBzZWFyY2hNYXhMaW1pdD86IG51bWJlcjtcbiAgLyoqXG4gICAqIDAgLSBCeSBkZWZhdWx0XG4gICAqIFVzZWQgd2l0aCBzZWFyY2hNYXhMaW1pdCB0byBmdXJ0aGVyIGxpbWl0IHJlbmRlcmluZyBmb3Igb3B0aW1pemF0aW9uXG4gICAqIFNob3VsZCBiZSBsZXNzIHRoYW4gc2VhcmNoTWF4TGltaXQgdG8gdGFrZSBlZmZlY3RcbiAgICovXG4gIHNlYXJjaE1heFJlbmRlcmVkSXRlbXM/OiBudW1iZXI7XG4gIGNoZWNrZWRTdHlsZT86ICdjaGVja2JveGVzJyB8ICdnbHlwaGljb24nIHwgJ2ZvbnRhd2Vzb21lJyB8ICd2aXN1YWwnO1xuICBidXR0b25DbGFzc2VzPzogc3RyaW5nO1xuICBpdGVtQ2xhc3Nlcz86IHN0cmluZztcbiAgY29udGFpbmVyQ2xhc3Nlcz86IHN0cmluZztcbiAgc2VsZWN0aW9uTGltaXQ/OiBudW1iZXI7XG4gIG1pblNlbGVjdGlvbkxpbWl0PzogbnVtYmVyO1xuICBjbG9zZU9uU2VsZWN0PzogYm9vbGVhbjtcbiAgYXV0b1Vuc2VsZWN0PzogYm9vbGVhbjtcbiAgc2hvd0NoZWNrQWxsPzogYm9vbGVhbjtcbiAgc2hvd1VuY2hlY2tBbGw/OiBib29sZWFuO1xuICBmaXhlZFRpdGxlPzogYm9vbGVhbjtcbiAgZHluYW1pY1RpdGxlTWF4SXRlbXM/OiBudW1iZXI7XG4gIG1heEhlaWdodD86IHN0cmluZztcbiAgZGlzcGxheUFsbFNlbGVjdGVkVGV4dD86IGJvb2xlYW47XG4gIGlzTGF6eUxvYWQ/OiBib29sZWFuO1xuICBsb2FkVmlld0Rpc3RhbmNlPzogbnVtYmVyO1xuICBzdG9wU2Nyb2xsUHJvcGFnYXRpb24/OiBib29sZWFuO1xuICBzZWxlY3RBZGRlZFZhbHVlcz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBmYWxzZSAtIEJ5IGRlZmF1bHRcbiAgICogSWYgYWN0aXZhdGVkIGxhYmVsIElEcyBkb24ndCBjb3VudCBhbmQgd29uJ3QgYmUgd3JpdHRlbiB0byB0aGUgbW9kZWwuXG4gICAqL1xuICBpZ25vcmVMYWJlbHM/OiBib29sZWFuO1xuICAvKipcbiAgICogZmFsc2UgLSBCeSBkZWZhdWx0XG4gICAqIElmIGFjdGl2YXRlZCwgdGhlIHRpdGxlIHdpbGwgc2hvdyBzZWxlY3Rpb25zIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgc2VsZWN0ZWQuXG4gICAqL1xuICBtYWludGFpblNlbGVjdGlvbk9yZGVySW5UaXRsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqIFNldCB0aGUgZm9jdXMgYmFjayB0byB0aGUgaW5wdXQgY29udHJvbCB3aGVuIHRoZSBkcm9wZG93biBjbG9zZWRcbiAgICovXG4gIGZvY3VzQmFjaz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpU2VsZWN0VGV4dHMge1xuICBjaGVja0FsbD86IHN0cmluZztcbiAgdW5jaGVja0FsbD86IHN0cmluZztcbiAgY2hlY2tlZD86IHN0cmluZztcbiAgY2hlY2tlZFBsdXJhbD86IHN0cmluZztcbiAgc2VhcmNoUGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIHNlYXJjaEVtcHR5UmVzdWx0Pzogc3RyaW5nO1xuICBzZWFyY2hOb1JlbmRlclRleHQ/OiBzdHJpbmc7XG4gIGRlZmF1bHRUaXRsZT86IHN0cmluZztcbiAgYWxsU2VsZWN0ZWQ/OiBzdHJpbmc7XG59XG4iXX0=