/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, IterableDiffers, Output, } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MultiSelectSearchFilter } from './search-filter.pipe';
/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */
const /** @type {?} */ MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectDropdownComponent),
    multi: true,
};
export class MultiselectDropdownComponent {
    /**
     * @param {?} element
     * @param {?} fb
     * @param {?} searchFilter
     * @param {?} differs
     * @param {?} cdRef
     */
    constructor(element, fb, searchFilter, differs, cdRef) {
        this.element = element;
        this.fb = fb;
        this.searchFilter = searchFilter;
        this.cdRef = cdRef;
        this.filterControl = this.fb.control('');
        this.disabled = false;
        this.disabledSelection = false;
        this.searchFunction = this._escapeRegExp;
        this.selectionLimitReached = new EventEmitter();
        this.dropdownClosed = new EventEmitter();
        this.dropdownOpened = new EventEmitter();
        this.onAdded = new EventEmitter();
        this.onRemoved = new EventEmitter();
        this.onLazyLoad = new EventEmitter();
        this.onFilter = this.filterControl.valueChanges;
        this.destroyed$ = new Subject();
        this.filteredOptions = [];
        this.lazyLoadOptions = [];
        this.renderFilteredOptions = [];
        this.model = [];
        this.prevModel = [];
        this.numSelected = 0;
        this.renderItems = true;
        this.checkAllSearchRegister = new Set();
        this.checkAllStatus = false;
        this.loadedValueIds = [];
        this._focusBack = false;
        this.defaultSettings = {
            closeOnClickOutside: true,
            pullRight: false,
            enableSearch: false,
            searchRenderLimit: 0,
            searchRenderAfter: 1,
            searchMaxLimit: 0,
            searchMaxRenderedItems: 0,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-primary dropdown-toggle',
            containerClasses: 'dropdown-inline',
            selectionLimit: 0,
            minSelectionLimit: 0,
            closeOnSelect: false,
            autoUnselect: false,
            showCheckAll: false,
            showUncheckAll: false,
            fixedTitle: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '300px',
            isLazyLoad: false,
            stopScrollPropagation: false,
            loadViewDistance: 1,
            selectAddedValues: false,
            ignoreLabels: false,
            maintainSelectionOrderInTitle: false,
            focusBack: true
        };
        this.defaultTexts = {
            checkAll: 'Check all',
            uncheckAll: 'Uncheck all',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            searchEmptyResult: 'Nothing found...',
            searchNoRenderText: 'Type in search box to see results...',
            defaultTitle: 'Select',
            allSelected: 'All selected',
        };
        this._isVisible = false;
        this._workerDocClicked = false;
        this.onModelChange = (_) => { };
        this.onModelTouched = () => { };
        this.differ = differs.find([]).create(null);
        this.settings = this.defaultSettings;
        this.texts = this.defaultTexts;
    }
    /**
     * @return {?}
     */
    get focusBack() {
        return this.settings.focusBack && this._focusBack;
    }
    /**
     * @return {?}
     */
    clickedOutside() {
        if (!this.isVisible || !this.settings.closeOnClickOutside) {
            return;
        }
        this.isVisible = false;
        this._focusBack = true;
        this.dropdownClosed.emit();
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set isVisible(val) {
        this._isVisible = val;
        this._workerDocClicked = val ? false : this._workerDocClicked;
    }
    /**
     * @return {?}
     */
    get isVisible() {
        return this._isVisible;
    }
    /**
     * @return {?}
     */
    get searchLimit() {
        return this.settings.searchRenderLimit;
    }
    /**
     * @return {?}
     */
    get searchRenderAfter() {
        return this.settings.searchRenderAfter;
    }
    /**
     * @return {?}
     */
    get searchLimitApplied() {
        return this.searchLimit > 0 && this.options.length > this.searchLimit;
    }
    /**
     * @param {?} option
     * @return {?}
     */
    getItemStyle(option) {
        const /** @type {?} */ style = {};
        if (!option.isLabel) {
            style['cursor'] = 'pointer';
        }
        if (option.disabled) {
            style['cursor'] = 'default';
        }
    }
    /**
     * @return {?}
     */
    getItemStyleSelectionDisabled() {
        if (this.disabledSelection) {
            return { cursor: 'default' };
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.title = this.texts.defaultTitle || '';
        this.filterControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
            this.updateRenderItems();
            if (this.settings.isLazyLoad) {
                this.load();
            }
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['options']) {
            this.options = this.options || [];
            this.parents = this.options
                .filter(option => typeof option.parentId === 'number')
                .map(option => option.parentId);
            this.updateRenderItems();
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                this.loadedValueIds.length === 0) {
                this.loadedValueIds = this.loadedValueIds.concat(changes["options"].currentValue.map(value => value.id));
            }
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                changes["options"].previousValue) {
                const /** @type {?} */ addedValues = changes["options"].currentValue.filter(value => this.loadedValueIds.indexOf(value.id) === -1);
                this.loadedValueIds.concat(addedValues.map(value => value.id));
                if (this.checkAllStatus) {
                    this.addChecks(addedValues);
                }
                else if (this.checkAllSearchRegister.size > 0) {
                    this.checkAllSearchRegister.forEach(searchValue => this.addChecks(this.applyFilters(addedValues, searchValue)));
                }
            }
            if (this.texts) {
                this.updateTitle();
            }
            this.fireModelChange();
        }
        if (changes['settings']) {
            this.settings = Object.assign({}, this.defaultSettings, this.settings);
        }
        if (changes['texts']) {
            this.texts = Object.assign({}, this.defaultTexts, this.texts);
            if (!changes['texts'].isFirstChange()) {
                this.updateTitle();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed$.next();
    }
    /**
     * @return {?}
     */
    updateRenderItems() {
        this.renderItems =
            !this.searchLimitApplied ||
                this.filterControl.value.length >= this.searchRenderAfter;
        this.filteredOptions = this.applyFilters(this.options, this.settings.isLazyLoad ? '' : this.filterControl.value);
        this.renderFilteredOptions = this.renderItems ? this.filteredOptions : [];
        this.focusedItem = undefined;
    }
    /**
     * @param {?} options
     * @param {?} value
     * @return {?}
     */
    applyFilters(options, value) {
        return this.searchFilter.transform(options, value, this.settings.searchMaxLimit, this.settings.searchMaxRenderedItems, this.searchFunction);
    }
    /**
     * @return {?}
     */
    fireModelChange() {
        if (this.model != this.prevModel) {
            this.prevModel = this.model;
            this.onModelChange(this.model);
            this.onModelTouched();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined && value !== null) {
            this.model = Array.isArray(value) ? value : [value];
            this.ngDoCheck();
        }
        else {
            this.model = [];
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        const /** @type {?} */ changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    }
    /**
     * @param {?} _c
     * @return {?}
     */
    validate(_c) {
        if (this.model && this.model.length) {
            return {
                required: {
                    valid: false
                }
            };
        }
        if (this.options.filter(o => this.model.indexOf(o.id) && !o.disabled).length === 0) {
            return {
                selection: {
                    valid: false
                }
            };
        }
        return null;
    }
    /**
     * @param {?} _fn
     * @return {?}
     */
    registerOnValidatorChange(_fn) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clearSearch(event) {
        this.maybeStopPropagation(event);
        this.filterControl.setValue('');
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    toggleDropdown(e) {
        if (this.isVisible) {
            this._focusBack = true;
        }
        this.isVisible = !this.isVisible;
        this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        this.focusedItem = undefined;
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    closeDropdown(e) {
        this.isVisible = true;
        this.toggleDropdown(e);
    }
    /**
     * @param {?} option
     * @return {?}
     */
    isSelected(option) {
        return this.model && this.model.indexOf(option.id) > -1;
    }
    /**
     * @param {?} _event
     * @param {?} option
     * @return {?}
     */
    setSelected(_event, option) {
        if (option.isLabel) {
            return;
        }
        if (option.disabled) {
            return;
        }
        if (this.disabledSelection) {
            return;
        }
        setTimeout(() => {
            this.maybeStopPropagation(_event);
            this.maybePreventDefault(_event);
            const /** @type {?} */ index = this.model.indexOf(option.id);
            const /** @type {?} */ isAtSelectionLimit = this.settings.selectionLimit > 0 &&
                this.model.length >= this.settings.selectionLimit;
            const /** @type {?} */ removeItem = (idx, id) => {
                this.model.splice(idx, 1);
                this.onRemoved.emit(id);
                if (this.settings.isLazyLoad &&
                    this.lazyLoadOptions.some(val => val.id === id)) {
                    this.lazyLoadOptions.splice(this.lazyLoadOptions.indexOf(this.lazyLoadOptions.find(val => val.id === id)), 1);
                }
            };
            if (index > -1) {
                if (this.settings.minSelectionLimit === undefined ||
                    this.numSelected > this.settings.minSelectionLimit) {
                    removeItem(index, option.id);
                }
                const /** @type {?} */ parentIndex = option.parentId && this.model.indexOf(option.parentId);
                if (parentIndex > -1) {
                    removeItem(parentIndex, option.parentId);
                }
                else if (this.parents.indexOf(option.id) > -1) {
                    this.options
                        .filter(child => this.model.indexOf(child.id) > -1 &&
                        child.parentId === option.id)
                        .forEach(child => removeItem(this.model.indexOf(child.id), child.id));
                }
            }
            else if (isAtSelectionLimit && !this.settings.autoUnselect) {
                this.selectionLimitReached.emit(this.model.length);
                return;
            }
            else {
                const /** @type {?} */ addItem = (id) => {
                    this.model.push(id);
                    this.onAdded.emit(id);
                    if (this.settings.isLazyLoad &&
                        !this.lazyLoadOptions.some(val => val.id === id)) {
                        this.lazyLoadOptions.push(option);
                    }
                };
                addItem(option.id);
                if (!isAtSelectionLimit) {
                    if (option.parentId && !this.settings.ignoreLabels) {
                        const /** @type {?} */ children = this.options.filter(child => child.id !== option.id && child.parentId === option.parentId);
                        if (children.every(child => this.model.indexOf(child.id) > -1)) {
                            addItem(option.parentId);
                        }
                    }
                    else if (this.parents.indexOf(option.id) > -1) {
                        const /** @type {?} */ children = this.options.filter(child => this.model.indexOf(child.id) < 0 && child.parentId === option.id);
                        children.forEach(child => addItem(child.id));
                    }
                }
                else {
                    removeItem(0, this.model[0]);
                }
            }
            if (this.settings.closeOnSelect) {
                this.toggleDropdown();
            }
            this.model = this.model.slice();
            this.fireModelChange();
        }, 0);
    }
    /**
     * @return {?}
     */
    updateNumSelected() {
        this.numSelected =
            this.model.filter(id => this.parents.indexOf(id) < 0).length || 0;
    }
    /**
     * @return {?}
     */
    updateTitle() {
        let /** @type {?} */ numSelectedOptions = this.options.length;
        if (this.settings.ignoreLabels) {
            numSelectedOptions = this.options.filter((option) => !option.isLabel).length;
        }
        if (this.numSelected === 0 || this.settings.fixedTitle) {
            this.title = this.texts ? this.texts.defaultTitle : '';
        }
        else if (this.settings.displayAllSelectedText &&
            this.model.length === numSelectedOptions) {
            this.title = this.texts ? this.texts.allSelected : '';
        }
        else if (this.settings.dynamicTitleMaxItems &&
            this.settings.dynamicTitleMaxItems >= this.numSelected) {
            const /** @type {?} */ useOptions = this.settings.isLazyLoad && this.lazyLoadOptions.length
                ? this.lazyLoadOptions
                : this.options;
            let /** @type {?} */ titleSelections;
            if (this.settings.maintainSelectionOrderInTitle) {
                const /** @type {?} */ optionIds = useOptions.map((selectOption, idx) => selectOption.id);
                titleSelections = this.model
                    .map((selectedId) => optionIds.indexOf(selectedId))
                    .filter((optionIndex) => optionIndex > -1)
                    .map((optionIndex) => useOptions[optionIndex]);
            }
            else {
                titleSelections = useOptions.filter((option) => this.model.indexOf(option.id) > -1);
            }
            this.title = titleSelections.map((option) => option.name).join(', ');
        }
        else {
            this.title =
                this.numSelected +
                    ' ' +
                    (this.numSelected === 1
                        ? this.texts.checked
                        : this.texts.checkedPlural);
        }
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    searchFilterApplied() {
        return (this.settings.enableSearch &&
            this.filterControl.value &&
            this.filterControl.value.length > 0);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    addChecks(options) {
        const /** @type {?} */ checkedOptions = options
            .filter((option) => {
            if (!option.disabled &&
                (this.model.indexOf(option.id) === -1 &&
                    !(this.settings.ignoreLabels && option.isLabel))) {
                this.onAdded.emit(option.id);
                return true;
            }
            return false;
        })
            .map((option) => option.id);
        this.model = this.model.concat(checkedOptions);
    }
    /**
     * @return {?}
     */
    checkAll() {
        if (!this.disabledSelection) {
            this.addChecks(!this.searchFilterApplied() ? this.options : this.filteredOptions);
            if (this.settings.isLazyLoad && this.settings.selectAddedValues) {
                if (this.searchFilterApplied() && !this.checkAllStatus) {
                    this.checkAllSearchRegister.add(this.filterControl.value);
                }
                else {
                    this.checkAllSearchRegister.clear();
                    this.checkAllStatus = true;
                }
                this.load();
            }
            this.fireModelChange();
        }
    }
    /**
     * @return {?}
     */
    uncheckAll() {
        if (!this.disabledSelection) {
            const /** @type {?} */ checkedOptions = this.model;
            let /** @type {?} */ unCheckedOptions = !this.searchFilterApplied()
                ? this.model
                : this.filteredOptions.map((option) => option.id);
            // set unchecked options only to the ones that were checked
            unCheckedOptions = checkedOptions.filter(item => unCheckedOptions.indexOf(item) > -1);
            this.model = this.model.filter((id) => {
                if ((unCheckedOptions.indexOf(id) < 0 &&
                    this.settings.minSelectionLimit === undefined) ||
                    unCheckedOptions.indexOf(id) < this.settings.minSelectionLimit) {
                    return true;
                }
                else {
                    this.onRemoved.emit(id);
                    return false;
                }
            });
            if (this.settings.isLazyLoad && this.settings.selectAddedValues) {
                if (this.searchFilterApplied()) {
                    if (this.checkAllSearchRegister.has(this.filterControl.value)) {
                        this.checkAllSearchRegister.delete(this.filterControl.value);
                        this.checkAllSearchRegister.forEach(function (searchTerm) {
                            const /** @type {?} */ filterOptions = this.applyFilters(this.options.filter(option => unCheckedOptions.indexOf(option.id) > -1), searchTerm);
                            this.addChecks(filterOptions);
                        });
                    }
                }
                else {
                    this.checkAllSearchRegister.clear();
                    this.checkAllStatus = false;
                }
                this.load();
            }
            this.fireModelChange();
        }
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    preventCheckboxCheck(event, option) {
        if (option.disabled ||
            (this.settings.selectionLimit &&
                !this.settings.autoUnselect &&
                this.model.length >= this.settings.selectionLimit &&
                this.model.indexOf(option.id) === -1 &&
                this.maybePreventDefault(event))) {
            this.maybePreventDefault(event);
        }
    }
    /**
     * @param {?=} option
     * @return {?}
     */
    isCheckboxDisabled(option) {
        return this.disabledSelection || option && option.disabled;
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    checkScrollPosition(ev) {
        const /** @type {?} */ scrollTop = ev.target.scrollTop;
        const /** @type {?} */ scrollHeight = ev.target.scrollHeight;
        const /** @type {?} */ scrollElementHeight = ev.target.clientHeight;
        const /** @type {?} */ roundingPixel = 1;
        const /** @type {?} */ gutterPixel = 1;
        if (scrollTop >=
            scrollHeight -
                (1 + this.settings.loadViewDistance) * scrollElementHeight -
                roundingPixel -
                gutterPixel) {
            this.load();
        }
    }
    /**
     * @param {?} ev
     * @param {?} element
     * @return {?}
     */
    checkScrollPropagation(ev, element) {
        const /** @type {?} */ scrollTop = element.scrollTop;
        const /** @type {?} */ scrollHeight = element.scrollHeight;
        const /** @type {?} */ scrollElementHeight = element.clientHeight;
        if ((ev.deltaY > 0 && scrollTop + scrollElementHeight >= scrollHeight) ||
            (ev.deltaY < 0 && scrollTop <= 0)) {
            ev = ev || window.event;
            this.maybePreventDefault(ev);
            ev.returnValue = false;
        }
    }
    /**
     * @param {?} idx
     * @param {?} selectOption
     * @return {?}
     */
    trackById(idx, selectOption) {
        return selectOption.id;
    }
    /**
     * @return {?}
     */
    load() {
        this.onLazyLoad.emit({
            length: this.options.length,
            filter: this.filterControl.value,
            checkAllSearches: this.checkAllSearchRegister,
            checkAllStatus: this.checkAllStatus,
        });
    }
    /**
     * @param {?} dir
     * @param {?=} e
     * @return {?}
     */
    focusItem(dir, e) {
        if (!this.isVisible) {
            return;
        }
        this.maybePreventDefault(e);
        const /** @type {?} */ idx = this.filteredOptions.indexOf(this.focusedItem);
        if (idx === -1) {
            this.focusedItem = this.filteredOptions[0];
            return;
        }
        const /** @type {?} */ nextIdx = idx + dir;
        const /** @type {?} */ newIdx = nextIdx < 0
            ? this.filteredOptions.length - 1
            : nextIdx % this.filteredOptions.length;
        this.focusedItem = this.filteredOptions[newIdx];
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    maybePreventDefault(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    maybeStopPropagation(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    }
    /**
     * @param {?} str
     * @return {?}
     */
    _escapeRegExp(str) {
        const /** @type {?} */ regExpStr = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return new RegExp(regExpStr, 'i');
    }
}
MultiselectDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'ss-multiselect-dropdown',
                template: "<div class=\"dropdown\" [ngClass]=\"settings.containerClasses\" [class.open]=\"isVisible\" (offClick)=\"clickedOutside()\">\n  <button type=\"button\" class=\"dropdown-toggle\" [ngClass]=\"settings.buttonClasses\" (click)=\"toggleDropdown($event)\" [disabled]=\"disabled\"\n    [ssAutofocus]=\"!focusBack\">\n    {{ title }}\n    <span class=\"caret\"></span>\n  </button>\n  <div #scroller *ngIf=\"isVisible\" class=\"dropdown-menu\" [ngClass]=\"{'chunkydropdown-menu': settings.checkedStyle == 'visual' }\"\n    (scroll)=\"settings.isLazyLoad ? checkScrollPosition($event) : null\" (wheel)=\"settings.stopScrollPropagation ? checkScrollPropagation($event, scroller) : null\"\n    [class.pull-right]=\"settings.pullRight\" [class.dropdown-menu-right]=\"settings.pullRight\" [style.max-height]=\"settings.maxHeight\"\n    style=\"display: block; height: auto; overflow-y: auto;\" (keydown.tab)=\"focusItem(1, $event)\" (keydown.shift.tab)=\"focusItem(-1, $event)\">\n    <div class=\"input-group search-container\" *ngIf=\"settings.enableSearch\">\n      <div class=\"input-group-prepend\">\n        <span class=\"input-group-text\" id=\"basic-addon1\">\n          <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n        </span>\n      </div>\n      <input type=\"text\" class=\"form-control\" ssAutofocus [formControl]=\"filterControl\" [placeholder]=\"texts.searchPlaceholder\"\n        class=\"form-control\">\n      <div class=\"input-group-append\" *ngIf=\"filterControl.value.length>0\">\n        <button class=\"btn btn-default btn-secondary\" type=\"button\" (click)=\"clearSearch($event)\">\n          <i class=\"fa fa-times\"></i>\n        </button>\n      </div>\n    </div>\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-check\" *ngIf=\"settings.showCheckAll && !disabledSelection\"\n      (click)=\"checkAll()\">\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-ok': settings.checkedStyle !== 'fontawesome','fa fa-check': settings.checkedStyle === 'fontawesome'}\"></span></span>\n      {{ texts.checkAll }}\n    </a>\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-uncheck\" *ngIf=\"settings.showUncheckAll && !disabledSelection\"\n      (click)=\"uncheckAll()\">\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-remove': settings.checkedStyle !== 'fontawesome','fa fa-times': settings.checkedStyle === 'fontawesome'}\"></span></span>\n      {{ texts.uncheckAll }}\n    </a>\n    <a *ngIf=\"settings.showCheckAll || settings.showUncheckAll\" href=\"javascript:;\" class=\"dropdown-divider divider\"></a>\n    <a *ngIf=\"!renderItems\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchNoRenderText }}</a>\n    <a *ngIf=\"renderItems && !renderFilteredOptions.length\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchEmptyResult }}</a>\n    <a class=\"dropdown-item\" href=\"javascript:;\" *ngFor=\"let option of renderFilteredOptions; trackBy: trackById\" [class.active]=\"isSelected(option)\"\n      [ngStyle]=\"getItemStyle(option)\" [ngClass]=\"option.classes\" [class.dropdown-header]=\"option.isLabel\" [ssAutofocus]=\"option !== focusedItem\"\n      tabindex=\"-1\" (click)=\"setSelected($event, option)\" (keydown.space)=\"setSelected($event, option)\" (keydown.enter)=\"setSelected($event, option)\">\n      <span *ngIf=\"!option.isLabel; else label\" role=\"menuitem\" tabindex=\"-1\" [style.padding-left]=\"this.parents.length>0&&this.parents.indexOf(option.id)<0&&'30px'\"\n        [ngStyle]=\"getItemStyleSelectionDisabled()\">\n        <ng-container [ngSwitch]=\"settings.checkedStyle\">\n          <input *ngSwitchCase=\"'checkboxes'\" type=\"checkbox\" [checked]=\"isSelected(option)\" (click)=\"preventCheckboxCheck($event, option)\"\n            [disabled]=\"isCheckboxDisabled(option)\" [ngStyle]=\"getItemStyleSelectionDisabled()\" />\n          <span *ngSwitchCase=\"'glyphicon'\" style=\"width: 16px;\" class=\"glyphicon\" [class.glyphicon-ok]=\"isSelected(option)\" [class.glyphicon-lock]=\"isCheckboxDisabled(option)\"></span>\n          <span *ngSwitchCase=\"'fontawesome'\" style=\"width: 16px;display: inline-block;\">\n            <span *ngIf=\"isSelected(option)\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></span>\n            <span *ngIf=\"isCheckboxDisabled(option)\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></span>\n          </span>\n          <span *ngSwitchCase=\"'visual'\" style=\"display:block;float:left; border-radius: 0.2em; border: 0.1em solid rgba(44, 44, 44, 0.63);background:rgba(0, 0, 0, 0.1);width: 5.5em;\">\n            <div class=\"slider\" [ngClass]=\"{'slideron': isSelected(option)}\">\n              <img *ngIf=\"option.image != null\" [src]=\"option.image\" style=\"height: 100%; width: 100%; object-fit: contain\" />\n              <div *ngIf=\"option.image == null\" style=\"height: 100%; width: 100%;text-align: center; display: table; background-color:rgba(0, 0, 0, 0.74)\">\n                <div class=\"content_wrapper\">\n                  <span style=\"font-size:3em;color:white\" class=\"glyphicon glyphicon-eye-close\"></span>\n                </div>\n              </div>\n            </div>\n          </span>\n        </ng-container>\n        <span [ngClass]=\"{'chunkyrow': settings.checkedStyle == 'visual' }\" [class.disabled]=\"isCheckboxDisabled(option)\" [ngClass]=\"settings.itemClasses\"\n          [style.font-weight]=\"this.parents.indexOf(option.id)>=0?'bold':'normal'\">\n          {{ option.name }}\n        </span>\n      </span>\n      <ng-template #label>\n        <span [class.disabled]=\"isCheckboxDisabled(option)\">{{ option.name }}</span>\n      </ng-template>\n    </a>\n  </div>\n</div>\n",
                providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectSearchFilter],
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["a{outline:0!important}.dropdown-inline{display:inline-block}.dropdown-toggle .caret{margin-left:4px;white-space:nowrap;display:inline-block}.chunkydropdown-menu{min-width:20em}.chunkyrow{line-height:2;margin-left:1em;font-size:2em}.slider{width:3.8em;height:3.8em;display:block;transition:all 125ms linear;margin-left:.125em;margin-top:auto}.slideron{margin-left:1.35em}.content_wrapper{display:table-cell;vertical-align:middle}.search-container{padding:0 5px 5px}"]
            }] }
];
/** @nocollapse */
MultiselectDropdownComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: FormBuilder, },
    { type: MultiSelectSearchFilter, },
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
];
MultiselectDropdownComponent.propDecorators = {
    "options": [{ type: Input },],
    "settings": [{ type: Input },],
    "texts": [{ type: Input },],
    "disabled": [{ type: Input },],
    "disabledSelection": [{ type: Input },],
    "searchFunction": [{ type: Input },],
    "selectionLimitReached": [{ type: Output },],
    "dropdownClosed": [{ type: Output },],
    "dropdownOpened": [{ type: Output },],
    "onAdded": [{ type: Output },],
    "onRemoved": [{ type: Output },],
    "onLazyLoad": [{ type: Output },],
    "onFilter": [{ type: Output },],
};
function MultiselectDropdownComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiselectDropdownComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiselectDropdownComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MultiselectDropdownComponent.propDecorators;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.filterControl;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.options;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.settings;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.texts;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.disabled;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.disabledSelection;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.searchFunction;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.selectionLimitReached;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.dropdownClosed;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.dropdownOpened;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onAdded;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onRemoved;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onLazyLoad;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onFilter;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.destroyed$;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.filteredOptions;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.lazyLoadOptions;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.renderFilteredOptions;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.model;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.prevModel;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.parents;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.title;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.differ;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.numSelected;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.renderItems;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.checkAllSearchRegister;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.checkAllStatus;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.loadedValueIds;
    /** @type {?} */
    MultiselectDropdownComponent.prototype._focusBack;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.focusedItem;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.defaultSettings;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.defaultTexts;
    /** @type {?} */
    MultiselectDropdownComponent.prototype._isVisible;
    /** @type {?} */
    MultiselectDropdownComponent.prototype._workerDocClicked;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onModelChange;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.onModelTouched;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.element;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.fb;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.searchFilter;
    /** @type {?} */
    MultiselectDropdownComponent.prototype.cdRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBRVYsS0FBSyxFQUNMLGVBQWUsRUFJZixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUdMLFdBQVcsRUFFWCxpQkFBaUIsR0FFbEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7QUFVL0QsdUJBQU0sMEJBQTBCLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0lBQzNELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQVNGLE1BQU07Ozs7Ozs7O0lBb0hKLFlBQ1UsU0FDQSxJQUNBLGNBQ1IsT0FBd0IsRUFDaEI7UUFKQSxZQUFPLEdBQVAsT0FBTztRQUNQLE9BQUUsR0FBRixFQUFFO1FBQ0YsaUJBQVksR0FBWixZQUFZO1FBRVosVUFBSyxHQUFMLEtBQUs7NkJBbEhjLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQzt3QkFLbkIsS0FBSztpQ0FDSSxLQUFLOzhCQUNRLElBQUksQ0FBQyxhQUFhO3FDQUVuQyxJQUFJLFlBQVksRUFBRTs4QkFDekIsSUFBSSxZQUFZLEVBQUU7OEJB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QyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3BCOzs7Ozs7SUFHSyxvQkFBb0IsQ0FBQyxDQUFrQztRQUM3RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3JCOzs7Ozs7SUFHSyxhQUFhLENBQUMsR0FBVztRQUMvQix1QkFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7O1lBL3BCckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLDB0TEFBd0M7Z0JBRXhDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixFQUFFLHVCQUF1QixDQUFDO2dCQUNoRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUE3Q0MsVUFBVTtZQWVWLFdBQVc7WUFRSix1QkFBdUI7WUFsQjlCLGVBQWU7WUFSZixpQkFBaUI7Ozt3QkEwRGhCLEtBQUs7eUJBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLO3NDQUVMLE1BQU07K0JBQ04sTUFBTTsrQkFDTixNQUFNO3dCQUNOLE1BQU07MEJBQ04sTUFBTTsyQkFDTixNQUFNO3lCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRG9DaGVjayxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBmb3J3YXJkUmVmLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBJdGVyYWJsZURpZmZlcnMsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIEZvcm1CdWlsZGVyLFxyXG4gIEZvcm1Db250cm9sLFxyXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIFZhbGlkYXRvcixcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgfSBmcm9tICcuL3NlYXJjaC1maWx0ZXIucGlwZSc7XHJcbmltcG9ydCB7IElNdWx0aVNlbGVjdE9wdGlvbiwgSU11bHRpU2VsZWN0U2V0dGluZ3MsIElNdWx0aVNlbGVjdFRleHRzLCB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLypcclxuICogQW5ndWxhciAyIERyb3Bkb3duIE11bHRpc2VsZWN0IGZvciBCb290c3RyYXBcclxuICpcclxuICogU2ltb24gTGluZGhcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3NvZnRzaW1vbi9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3RcclxuICovXHJcblxyXG5jb25zdCBNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQpLFxyXG4gIG11bHRpOiB0cnVlLFxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcy1tdWx0aXNlbGVjdC1kcm9wZG93bicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kcm9wZG93bi5jb21wb25lbnQuY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1IsIE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBEb0NoZWNrLFxyXG4gIE9uRGVzdHJveSxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBWYWxpZGF0b3Ige1xyXG4gIGZpbHRlckNvbnRyb2w6IEZvcm1Db250cm9sID0gdGhpcy5mYi5jb250cm9sKCcnKTtcclxuXHJcbiAgQElucHV0KCkgb3B0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuICBASW5wdXQoKSBzZXR0aW5nczogSU11bHRpU2VsZWN0U2V0dGluZ3M7XHJcbiAgQElucHV0KCkgdGV4dHM6IElNdWx0aVNlbGVjdFRleHRzO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGlzYWJsZWRTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBzZWFyY2hGdW5jdGlvbjogKHN0cjogc3RyaW5nKSA9PiBSZWdFeHAgPSB0aGlzLl9lc2NhcGVSZWdFeHA7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25MaW1pdFJlYWNoZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBkcm9wZG93bk9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25BZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgb25SZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkxhenlMb2FkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkZpbHRlcjogT2JzZXJ2YWJsZTxzdHJpbmc+ID0gdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlQ2hhbmdlcztcclxuXHJcbiAgZ2V0IGZvY3VzQmFjaygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmZvY3VzQmFjayAmJiB0aGlzLl9mb2N1c0JhY2s7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xpY2tlZE91dHNpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlIHx8ICF0aGlzLnNldHRpbmdzLmNsb3NlT25DbGlja091dHNpZGUpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuX2ZvY3VzQmFjayA9IHRydWU7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gIGZpbHRlcmVkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICBsYXp5TG9hZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgcmVuZGVyRmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIG1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHByZXZNb2RlbDogYW55W10gPSBbXTtcclxuICBwYXJlbnRzOiBhbnlbXTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRpZmZlcjogYW55O1xyXG4gIG51bVNlbGVjdGVkOiBudW1iZXIgPSAwO1xyXG4gIHNldCBpc1Zpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc1Zpc2libGUgPSB2YWw7XHJcbiAgICB0aGlzLl93b3JrZXJEb2NDbGlja2VkID0gdmFsID8gZmFsc2UgOiB0aGlzLl93b3JrZXJEb2NDbGlja2VkO1xyXG4gIH1cclxuICBnZXQgaXNWaXNpYmxlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZTtcclxuICB9XHJcbiAgcmVuZGVySXRlbXMgPSB0cnVlO1xyXG4gIGNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIgPSBuZXcgU2V0KCk7XHJcbiAgY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICBsb2FkZWRWYWx1ZUlkcyA9IFtdO1xyXG4gIF9mb2N1c0JhY2sgPSBmYWxzZTtcclxuICBmb2N1c2VkSXRlbTogSU11bHRpU2VsZWN0T3B0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICBkZWZhdWx0U2V0dGluZ3M6IElNdWx0aVNlbGVjdFNldHRpbmdzID0ge1xyXG4gICAgY2xvc2VPbkNsaWNrT3V0c2lkZTogdHJ1ZSxcclxuICAgIHB1bGxSaWdodDogZmFsc2UsXHJcbiAgICBlbmFibGVTZWFyY2g6IGZhbHNlLFxyXG4gICAgc2VhcmNoUmVuZGVyTGltaXQ6IDAsXHJcbiAgICBzZWFyY2hSZW5kZXJBZnRlcjogMSxcclxuICAgIHNlYXJjaE1heExpbWl0OiAwLFxyXG4gICAgc2VhcmNoTWF4UmVuZGVyZWRJdGVtczogMCxcclxuICAgIGNoZWNrZWRTdHlsZTogJ2NoZWNrYm94ZXMnLFxyXG4gICAgYnV0dG9uQ2xhc3NlczogJ2J0biBidG4tcHJpbWFyeSBkcm9wZG93bi10b2dnbGUnLFxyXG4gICAgY29udGFpbmVyQ2xhc3NlczogJ2Ryb3Bkb3duLWlubGluZScsXHJcbiAgICBzZWxlY3Rpb25MaW1pdDogMCxcclxuICAgIG1pblNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXHJcbiAgICBhdXRvVW5zZWxlY3Q6IGZhbHNlLFxyXG4gICAgc2hvd0NoZWNrQWxsOiBmYWxzZSxcclxuICAgIHNob3dVbmNoZWNrQWxsOiBmYWxzZSxcclxuICAgIGZpeGVkVGl0bGU6IGZhbHNlLFxyXG4gICAgZHluYW1pY1RpdGxlTWF4SXRlbXM6IDMsXHJcbiAgICBtYXhIZWlnaHQ6ICczMDBweCcsXHJcbiAgICBpc0xhenlMb2FkOiBmYWxzZSxcclxuICAgIHN0b3BTY3JvbGxQcm9wYWdhdGlvbjogZmFsc2UsXHJcbiAgICBsb2FkVmlld0Rpc3RhbmNlOiAxLFxyXG4gICAgc2VsZWN0QWRkZWRWYWx1ZXM6IGZhbHNlLFxyXG4gICAgaWdub3JlTGFiZWxzOiBmYWxzZSxcclxuICAgIG1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlOiBmYWxzZSxcclxuICAgIGZvY3VzQmFjazogdHJ1ZVxyXG4gIH07XHJcbiAgZGVmYXVsdFRleHRzOiBJTXVsdGlTZWxlY3RUZXh0cyA9IHtcclxuICAgIGNoZWNrQWxsOiAnQ2hlY2sgYWxsJyxcclxuICAgIHVuY2hlY2tBbGw6ICdVbmNoZWNrIGFsbCcsXHJcbiAgICBjaGVja2VkOiAnY2hlY2tlZCcsXHJcbiAgICBjaGVja2VkUGx1cmFsOiAnY2hlY2tlZCcsXHJcbiAgICBzZWFyY2hQbGFjZWhvbGRlcjogJ1NlYXJjaC4uLicsXHJcbiAgICBzZWFyY2hFbXB0eVJlc3VsdDogJ05vdGhpbmcgZm91bmQuLi4nLFxyXG4gICAgc2VhcmNoTm9SZW5kZXJUZXh0OiAnVHlwZSBpbiBzZWFyY2ggYm94IHRvIHNlZSByZXN1bHRzLi4uJyxcclxuICAgIGRlZmF1bHRUaXRsZTogJ1NlbGVjdCcsXHJcbiAgICBhbGxTZWxlY3RlZDogJ0FsbCBzZWxlY3RlZCcsXHJcbiAgfTtcclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Muc2VhcmNoUmVuZGVyTGltaXQ7XHJcbiAgfVxyXG5cclxuICBnZXQgc2VhcmNoUmVuZGVyQWZ0ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hMaW1pdEFwcGxpZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hMaW1pdCA+IDAgJiYgdGhpcy5vcHRpb25zLmxlbmd0aCA+IHRoaXMuc2VhcmNoTGltaXQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9pc1Zpc2libGUgPSBmYWxzZTtcclxuICBwcml2YXRlIF93b3JrZXJEb2NDbGlja2VkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIHNlYXJjaEZpbHRlcjogTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXHJcbiAgICBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXHJcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgdGhpcy5kaWZmZXIgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncztcclxuICAgIHRoaXMudGV4dHMgPSB0aGlzLmRlZmF1bHRUZXh0cztcclxuICB9XHJcblxyXG4gIGdldEl0ZW1TdHlsZShvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbik6IGFueSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IHt9O1xyXG4gICAgaWYgKCFvcHRpb24uaXNMYWJlbCkge1xyXG4gICAgICBzdHlsZVsnY3Vyc29yJ10gPSAncG9pbnRlcic7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdkZWZhdWx0JztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEl0ZW1TdHlsZVNlbGVjdGlvbkRpc2FibGVkKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICByZXR1cm4geyBjdXJzb3I6ICdkZWZhdWx0JyB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgfHwgJyc7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQpIHtcclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1snb3B0aW9ucyddKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCBbXTtcclxuICAgICAgdGhpcy5wYXJlbnRzID0gdGhpcy5vcHRpb25zXHJcbiAgICAgICAgLmZpbHRlcihvcHRpb24gPT4gdHlwZW9mIG9wdGlvbi5wYXJlbnRJZCA9PT0gJ251bWJlcicpXHJcbiAgICAgICAgLm1hcChvcHRpb24gPT4gb3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgdGhpcy51cGRhdGVSZW5kZXJJdGVtcygpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICB0aGlzLmxvYWRlZFZhbHVlSWRzLmxlbmd0aCA9PT0gMFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmxvYWRlZFZhbHVlSWRzID0gdGhpcy5sb2FkZWRWYWx1ZUlkcy5jb25jYXQoXHJcbiAgICAgICAgICBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiZcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdEFkZGVkVmFsdWVzICYmXHJcbiAgICAgICAgY2hhbmdlcy5vcHRpb25zLnByZXZpb3VzVmFsdWVcclxuICAgICAgKSB7XHJcbiAgICAgICAgY29uc3QgYWRkZWRWYWx1ZXMgPSBjaGFuZ2VzLm9wdGlvbnMuY3VycmVudFZhbHVlLmZpbHRlcihcclxuICAgICAgICAgIHZhbHVlID0+IHRoaXMubG9hZGVkVmFsdWVJZHMuaW5kZXhPZih2YWx1ZS5pZCkgPT09IC0xXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChhZGRlZFZhbHVlcy5tYXAodmFsdWUgPT4gdmFsdWUuaWQpKTtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5hZGRDaGVja3MoYWRkZWRWYWx1ZXMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLnNpemUgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChzZWFyY2hWYWx1ZSA9PlxyXG4gICAgICAgICAgICB0aGlzLmFkZENoZWNrcyh0aGlzLmFwcGx5RmlsdGVycyhhZGRlZFZhbHVlcywgc2VhcmNoVmFsdWUpKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnRleHRzKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaXRsZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzWydzZXR0aW5ncyddKSB7XHJcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSB7IC4uLnRoaXMuZGVmYXVsdFNldHRpbmdzLCAuLi50aGlzLnNldHRpbmdzIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3RleHRzJ10pIHtcclxuICAgICAgdGhpcy50ZXh0cyA9IHsgLi4udGhpcy5kZWZhdWx0VGV4dHMsIC4uLnRoaXMudGV4dHMgfTtcclxuICAgICAgaWYgKCFjaGFuZ2VzWyd0ZXh0cyddLmlzRmlyc3RDaGFuZ2UoKSkgeyB0aGlzLnVwZGF0ZVRpdGxlKCk7IH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5yZW5kZXJJdGVtcyA9XHJcbiAgICAgICF0aGlzLnNlYXJjaExpbWl0QXBwbGllZCB8fFxyXG4gICAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUubGVuZ3RoID49IHRoaXMuc2VhcmNoUmVuZGVyQWZ0ZXI7XHJcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuYXBwbHlGaWx0ZXJzKFxyXG4gICAgICB0aGlzLm9wdGlvbnMsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCA/ICcnIDogdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlXHJcbiAgICApO1xyXG4gICAgdGhpcy5yZW5kZXJGaWx0ZXJlZE9wdGlvbnMgPSB0aGlzLnJlbmRlckl0ZW1zID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMgOiBbXTtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBhcHBseUZpbHRlcnMob3B0aW9ucywgdmFsdWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaEZpbHRlci50cmFuc2Zvcm0oXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIHZhbHVlLFxyXG4gICAgICB0aGlzLnNldHRpbmdzLnNlYXJjaE1heExpbWl0LFxyXG4gICAgICB0aGlzLnNldHRpbmdzLnNlYXJjaE1heFJlbmRlcmVkSXRlbXMsXHJcbiAgICAgIHRoaXMuc2VhcmNoRnVuY3Rpb25cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmaXJlTW9kZWxDaGFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCAhPSB0aGlzLnByZXZNb2RlbCkge1xyXG4gICAgICB0aGlzLnByZXZNb2RlbCA9IHRoaXMubW9kZWw7XHJcbiAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLm1vZGVsKTtcclxuICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoXzogYW55KSA9PiB7IH07XHJcbiAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubW9kZWwgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHZhbHVlIDogW3ZhbHVlXTtcclxuICAgICAgdGhpcy5uZ0RvQ2hlY2soKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kZWwgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG5nRG9DaGVjaygpIHtcclxuICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLmRpZmZlci5kaWZmKHRoaXMubW9kZWwpO1xyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy51cGRhdGVOdW1TZWxlY3RlZCgpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShfYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlcXVpcmVkOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiB0aGlzLm1vZGVsLmluZGV4T2Yoby5pZCkgJiYgIW8uZGlzYWJsZWQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgdmFsaWQ6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShfZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIGNsZWFyU2VhcmNoKGV2ZW50OiBFdmVudCkge1xyXG4gICAgdGhpcy5tYXliZVN0b3BQcm9wYWdhdGlvbihldmVudCk7XHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wuc2V0VmFsdWUoJycpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcclxuICAgIHRoaXMuaXNWaXNpYmxlID8gdGhpcy5kcm9wZG93bk9wZW5lZC5lbWl0KCkgOiB0aGlzLmRyb3Bkb3duQ2xvc2VkLmVtaXQoKTtcclxuICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjbG9zZURyb3Bkb3duKGU/OiBFdmVudCkge1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgdGhpcy50b2dnbGVEcm9wZG93bihlKTtcclxuICB9XHJcblxyXG4gIGlzU2VsZWN0ZWQob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTE7XHJcbiAgfVxyXG5cclxuICBzZXRTZWxlY3RlZChfZXZlbnQ6IEV2ZW50LCBvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikge1xyXG4gICAgaWYgKG9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB0aGlzLm1heWJlU3RvcFByb3BhZ2F0aW9uKF9ldmVudCk7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChfZXZlbnQpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpO1xyXG4gICAgICBjb25zdCBpc0F0U2VsZWN0aW9uTGltaXQgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0aW9uTGltaXQgPiAwICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdDtcclxuICAgICAgY29uc3QgcmVtb3ZlSXRlbSA9IChpZHgsIGlkKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiZcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNvbWUodmFsID0+IHZhbC5pZCA9PT0gaWQpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5zcGxpY2UoXHJcbiAgICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLmluZGV4T2YoXHJcbiAgICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuZmluZCh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgMVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXQgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgdGhpcy5udW1TZWxlY3RlZCA+IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJlbW92ZUl0ZW0oaW5kZXgsIG9wdGlvbi5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhcmVudEluZGV4ID1cclxuICAgICAgICAgIG9wdGlvbi5wYXJlbnRJZCAmJiB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICBpZiAocGFyZW50SW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShwYXJlbnRJbmRleCwgb3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFyZW50cy5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMSkge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICAgICAgICAgIC5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCkgPiAtMSAmJlxyXG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5pZFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgcmVtb3ZlSXRlbSh0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpLCBjaGlsZC5pZClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoaXNBdFNlbGVjdGlvbkxpbWl0ICYmICF0aGlzLnNldHRpbmdzLmF1dG9VbnNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW9uTGltaXRSZWFjaGVkLmVtaXQodGhpcy5tb2RlbC5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBhZGRJdGVtID0gKGlkKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICB0aGlzLm1vZGVsLnB1c2goaWQpO1xyXG4gICAgICAgICAgdGhpcy5vbkFkZGVkLmVtaXQoaWQpO1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiZcclxuICAgICAgICAgICAgIXRoaXMubGF6eUxvYWRPcHRpb25zLnNvbWUodmFsID0+IHZhbC5pZCA9PT0gaWQpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMucHVzaChvcHRpb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFkZEl0ZW0ob3B0aW9uLmlkKTtcclxuICAgICAgICBpZiAoIWlzQXRTZWxlY3Rpb25MaW1pdCkge1xyXG4gICAgICAgICAgaWYgKG9wdGlvbi5wYXJlbnRJZCAmJiAhdGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5pZCAhPT0gb3B0aW9uLmlkICYmIGNoaWxkLnBhcmVudElkID09PSBvcHRpb24ucGFyZW50SWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmV2ZXJ5KGNoaWxkID0+IHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCkgPiAtMSkpIHtcclxuICAgICAgICAgICAgICBhZGRJdGVtKG9wdGlvbi5wYXJlbnRJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5vcHRpb25zLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA8IDAgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5pZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGFkZEl0ZW0oY2hpbGQuaWQpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbSgwLCB0aGlzLm1vZGVsWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2xvc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRHJvcGRvd24oKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5zbGljZSgpO1xyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG5cclxuICAgIH0sIDApXHJcbiAgfVxyXG5cclxuICB1cGRhdGVOdW1TZWxlY3RlZCgpIHtcclxuICAgIHRoaXMubnVtU2VsZWN0ZWQgPVxyXG4gICAgICB0aGlzLm1vZGVsLmZpbHRlcihpZCA9PiB0aGlzLnBhcmVudHMuaW5kZXhPZihpZCkgPCAwKS5sZW5ndGggfHwgMDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVRpdGxlKCkge1xyXG4gICAgbGV0IG51bVNlbGVjdGVkT3B0aW9ucyA9IHRoaXMub3B0aW9ucy5sZW5ndGg7XHJcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMpIHtcclxuICAgICAgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmZpbHRlcihcclxuICAgICAgICAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+ICFvcHRpb24uaXNMYWJlbFxyXG4gICAgICApLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm51bVNlbGVjdGVkID09PSAwIHx8IHRoaXMuc2V0dGluZ3MuZml4ZWRUaXRsZSkge1xyXG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy50ZXh0cyA/IHRoaXMudGV4dHMuZGVmYXVsdFRpdGxlIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmRpc3BsYXlBbGxTZWxlY3RlZFRleHQgJiZcclxuICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPT09IG51bVNlbGVjdGVkT3B0aW9uc1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5hbGxTZWxlY3RlZCA6ICcnO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5keW5hbWljVGl0bGVNYXhJdGVtcyAmJlxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zID49IHRoaXMubnVtU2VsZWN0ZWRcclxuICAgICkge1xyXG4gICAgICBjb25zdCB1c2VPcHRpb25zID1cclxuICAgICAgICB0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5sYXp5TG9hZE9wdGlvbnMubGVuZ3RoXHJcbiAgICAgICAgICA/IHRoaXMubGF6eUxvYWRPcHRpb25zXHJcbiAgICAgICAgICA6IHRoaXMub3B0aW9ucztcclxuXHJcbiAgICAgIGxldCB0aXRsZVNlbGVjdGlvbnM6IEFycmF5PElNdWx0aVNlbGVjdE9wdGlvbj47XHJcblxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYWludGFpblNlbGVjdGlvbk9yZGVySW5UaXRsZSkge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbklkcyA9IHVzZU9wdGlvbnMubWFwKChzZWxlY3RPcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbiwgaWR4OiBudW1iZXIpID0+IHNlbGVjdE9wdGlvbi5pZCk7XHJcbiAgICAgICAgdGl0bGVTZWxlY3Rpb25zID0gdGhpcy5tb2RlbFxyXG4gICAgICAgICAgLm1hcCgoc2VsZWN0ZWRJZCkgPT4gb3B0aW9uSWRzLmluZGV4T2Yoc2VsZWN0ZWRJZCkpXHJcbiAgICAgICAgICAuZmlsdGVyKChvcHRpb25JbmRleCkgPT4gb3B0aW9uSW5kZXggPiAtMSlcclxuICAgICAgICAgIC5tYXAoKG9wdGlvbkluZGV4KSA9PiB1c2VPcHRpb25zW29wdGlvbkluZGV4XSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGl0bGVTZWxlY3Rpb25zID0gdXNlT3B0aW9ucy5maWx0ZXIoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlU2VsZWN0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24ubmFtZSkuam9pbignLCAnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPVxyXG4gICAgICAgIHRoaXMubnVtU2VsZWN0ZWQgK1xyXG4gICAgICAgICcgJyArXHJcbiAgICAgICAgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDFcclxuICAgICAgICAgID8gdGhpcy50ZXh0cy5jaGVja2VkXHJcbiAgICAgICAgICA6IHRoaXMudGV4dHMuY2hlY2tlZFBsdXJhbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoRmlsdGVyQXBwbGllZCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZW5hYmxlU2VhcmNoICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSAmJlxyXG4gICAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFkZENoZWNrcyhvcHRpb25zKSB7XHJcbiAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IG9wdGlvbnNcclxuICAgICAgLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAhb3B0aW9uLmRpc2FibGVkICYmXHJcbiAgICAgICAgICAoXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgICAgICAhKHRoaXMuc2V0dGluZ3MuaWdub3JlTGFiZWxzICYmIG9wdGlvbi5pc0xhYmVsKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5vbkFkZGVkLmVtaXQob3B0aW9uLmlkKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG5cclxuICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLmNvbmNhdChjaGVja2VkT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBjaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICB0aGlzLmFkZENoZWNrcyhcclxuICAgICAgICAhdGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkgPyB0aGlzLm9wdGlvbnMgOiB0aGlzLmZpbHRlcmVkT3B0aW9uc1xyXG4gICAgICApO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkgJiYgIXRoaXMuY2hlY2tBbGxTdGF0dXMpIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5hZGQodGhpcy5maWx0ZXJDb250cm9sLnZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmNsZWFyKCk7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVuY2hlY2tBbGwoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWRTZWxlY3Rpb24pIHtcclxuICAgICAgY29uc3QgY2hlY2tlZE9wdGlvbnMgPSB0aGlzLm1vZGVsO1xyXG4gICAgICBsZXQgdW5DaGVja2VkT3B0aW9ucyA9ICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKVxyXG4gICAgICAgID8gdGhpcy5tb2RlbFxyXG4gICAgICAgIDogdGhpcy5maWx0ZXJlZE9wdGlvbnMubWFwKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gb3B0aW9uLmlkKTtcclxuICAgICAgLy8gc2V0IHVuY2hlY2tlZCBvcHRpb25zIG9ubHkgdG8gdGhlIG9uZXMgdGhhdCB3ZXJlIGNoZWNrZWRcclxuICAgICAgdW5DaGVja2VkT3B0aW9ucyA9IGNoZWNrZWRPcHRpb25zLmZpbHRlcihpdGVtID0+IHVuQ2hlY2tlZE9wdGlvbnMuaW5kZXhPZihpdGVtKSA+IC0xKTtcclxuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuZmlsdGVyKChpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKHVuQ2hlY2tlZE9wdGlvbnMuaW5kZXhPZihpZCkgPCAwICYmXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXQgPT09IHVuZGVmaW5lZCkgfHxcclxuICAgICAgICAgIHVuQ2hlY2tlZE9wdGlvbnMuaW5kZXhPZihpZCkgPCB0aGlzLnNldHRpbmdzLm1pblNlbGVjdGlvbkxpbWl0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5vblJlbW92ZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLnNldHRpbmdzLnNlbGVjdEFkZGVkVmFsdWVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmhhcyh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5kZWxldGUodGhpcy5maWx0ZXJDb250cm9sLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmZvckVhY2goZnVuY3Rpb24gKHNlYXJjaFRlcm0pIHtcclxuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnModGhpcy5vcHRpb25zLmZpbHRlcihvcHRpb24gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMSksIHNlYXJjaFRlcm0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKGZpbHRlck9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmNsZWFyKCk7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcmV2ZW50Q2hlY2tib3hDaGVjayhldmVudDogRXZlbnQsIG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIG9wdGlvbi5kaXNhYmxlZCB8fFxyXG4gICAgICAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgICF0aGlzLnNldHRpbmdzLmF1dG9VbnNlbGVjdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwubGVuZ3RoID49IHRoaXMuc2V0dGluZ3Muc2VsZWN0aW9uTGltaXQgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2Yob3B0aW9uLmlkKSA9PT0gLTEgJiZcclxuICAgICAgICB0aGlzLm1heWJlUHJldmVudERlZmF1bHQoZXZlbnQpXHJcbiAgICAgIClcclxuICAgICkge1xyXG4gICAgICB0aGlzLm1heWJlUHJldmVudERlZmF1bHQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNDaGVja2JveERpc2FibGVkKG9wdGlvbj86IElNdWx0aVNlbGVjdE9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRTZWxlY3Rpb24gfHwgb3B0aW9uICYmIG9wdGlvbi5kaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUG9zaXRpb24oZXYpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGV2LnRhcmdldC5zY3JvbGxUb3A7XHJcbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSBldi50YXJnZXQuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudEhlaWdodCA9IGV2LnRhcmdldC5jbGllbnRIZWlnaHQ7XHJcbiAgICBjb25zdCByb3VuZGluZ1BpeGVsID0gMTtcclxuICAgIGNvbnN0IGd1dHRlclBpeGVsID0gMTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHNjcm9sbFRvcCA+PVxyXG4gICAgICBzY3JvbGxIZWlnaHQgLVxyXG4gICAgICAoMSArIHRoaXMuc2V0dGluZ3MubG9hZFZpZXdEaXN0YW5jZSkgKiBzY3JvbGxFbGVtZW50SGVpZ2h0IC1cclxuICAgICAgcm91bmRpbmdQaXhlbCAtXHJcbiAgICAgIGd1dHRlclBpeGVsXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja1Njcm9sbFByb3BhZ2F0aW9uKGV2LCBlbGVtZW50KSB7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSBlbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgY29uc3Qgc2Nyb2xsRWxlbWVudEhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgIGlmIChcclxuICAgICAgKGV2LmRlbHRhWSA+IDAgJiYgc2Nyb2xsVG9wICsgc2Nyb2xsRWxlbWVudEhlaWdodCA+PSBzY3JvbGxIZWlnaHQpIHx8XHJcbiAgICAgIChldi5kZWx0YVkgPCAwICYmIHNjcm9sbFRvcCA8PSAwKVxyXG4gICAgKSB7XHJcbiAgICAgIGV2ID0gZXYgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgICB0aGlzLm1heWJlUHJldmVudERlZmF1bHQoZXYpO1xyXG4gICAgICBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUlkKGlkeDogbnVtYmVyLCBzZWxlY3RPcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikge1xyXG4gICAgcmV0dXJuIHNlbGVjdE9wdGlvbi5pZDtcclxuICB9XHJcblxyXG4gIGxvYWQoKSB7XHJcbiAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh7XHJcbiAgICAgIGxlbmd0aDogdGhpcy5vcHRpb25zLmxlbmd0aCxcclxuICAgICAgZmlsdGVyOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUsXHJcbiAgICAgIGNoZWNrQWxsU2VhcmNoZXM6IHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3RlcixcclxuICAgICAgY2hlY2tBbGxTdGF0dXM6IHRoaXMuY2hlY2tBbGxTdGF0dXMsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZvY3VzSXRlbShkaXI6IG51bWJlciwgZT86IEV2ZW50KSB7XHJcbiAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1heWJlUHJldmVudERlZmF1bHQoZSk7XHJcblxyXG4gICAgY29uc3QgaWR4ID0gdGhpcy5maWx0ZXJlZE9wdGlvbnMuaW5kZXhPZih0aGlzLmZvY3VzZWRJdGVtKTtcclxuXHJcbiAgICBpZiAoaWR4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbMF07XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXh0SWR4ID0gaWR4ICsgZGlyO1xyXG4gICAgY29uc3QgbmV3SWR4ID1cclxuICAgICAgbmV4dElkeCA8IDBcclxuICAgICAgICA/IHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aCAtIDFcclxuICAgICAgICA6IG5leHRJZHggJSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHRoaXMuZmlsdGVyZWRPcHRpb25zW25ld0lkeF07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1heWJlUHJldmVudERlZmF1bHQoZT86IHsgcHJldmVudERlZmF1bHQ/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnByZXZlbnREZWZhdWx0KSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVTdG9wUHJvcGFnYXRpb24oZT86IHsgc3RvcFByb3BhZ2F0aW9uPzogRnVuY3Rpb24gfSkge1xyXG4gICAgaWYgKGUgJiYgZS5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgcHJpdmF0ZSBfZXNjYXBlUmVnRXhwKHN0cjogc3RyaW5nKTogUmVnRXhwIHtcclxuICAgIGNvbnN0IHJlZ0V4cFN0ciA9IHN0ci5yZXBsYWNlKC9bXFwtXFxbXFxdXFwvXFx7XFx9XFwoXFwpXFwqXFwrXFw/XFwuXFxcXFxcXlxcJFxcfF0vZywgXCJcXFxcJCZcIik7XHJcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdFeHBTdHIsICdpJyk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=