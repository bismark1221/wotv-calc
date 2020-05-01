import { Pipe, Directive, ElementRef, Host, Input, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, IterableDiffers, Output, HostListener, NgModule } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MultiSelectSearchFilter {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutofocusDirective {
    /**
     * @param {?} elemRef
     */
    constructor(elemRef) {
        this.elemRef = elemRef;
    }
    /**
     * @return {?}
     */
    get element() {
        return this.elemRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.focus();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ ssAutofocusChange = changes["ssAutofocus"];
        if (ssAutofocusChange && !ssAutofocusChange.isFirstChange()) {
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.ssAutofocus) {
            return;
        }
        this.element.focus && this.element.focus();
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ssAutofocus]'
            },] }
];
/** @nocollapse */
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Host },] },
];
AutofocusDirective.propDecorators = {
    "ssAutofocus": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
class MultiselectDropdownComponent {
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
        if (!option.isLabel) ;
        if (option.disabled) ;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OffClickDirective {
    constructor() {
        this.onOffClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this._clickEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouch(event) {
        this._touchEvent = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (event !== this._clickEvent) {
            this.onOffClick.emit(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentTouch(event) {
        if (event !== this._touchEvent) {
            this.onOffClick.emit(event);
        }
    }
}
OffClickDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[offClick]',
            },] }
];
/** @nocollapse */
OffClickDirective.propDecorators = {
    "onOffClick": [{ type: Output, args: ['offClick',] },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
    "onTouch": [{ type: HostListener, args: ['touchstart', ['$event'],] },],
    "onDocumentClick": [{ type: HostListener, args: ['document:click', ['$event'],] },],
    "onDocumentTouch": [{ type: HostListener, args: ['document:touchstart', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MultiselectDropdownModule {
}
MultiselectDropdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ReactiveFormsModule],
                exports: [
                    MultiselectDropdownComponent,
                    MultiSelectSearchFilter,
                ],
                declarations: [
                    MultiselectDropdownComponent,
                    MultiSelectSearchFilter,
                    AutofocusDirective,
                    OffClickDirective
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MultiSelectSearchFilter, MultiselectDropdownModule, MultiselectDropdownComponent, AutofocusDirective as ɵa, OffClickDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vc2VhcmNoLWZpbHRlci5waXBlLnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vYXV0b2ZvY3VzLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL29mZi1jbGljay5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9kcm9wZG93bi5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJTXVsdGlTZWxlY3RPcHRpb24gfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIFN0cmluZ0hhc2hNYXA8VD4ge1xuICBbazogc3RyaW5nXTogVDtcbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnc2VhcmNoRmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlciBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHByaXZhdGUgX2xhc3RPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXTtcbiAgcHJpdmF0ZSBfc2VhcmNoQ2FjaGU6IFN0cmluZ0hhc2hNYXA8SU11bHRpU2VsZWN0T3B0aW9uW10+ID0ge307XG4gIHByaXZhdGUgX3NlYXJjaENhY2hlSW5jbHVzaXZlOiBTdHJpbmdIYXNoTWFwPGJvb2xlYW4gfCBudW1iZXI+ID0ge307XG4gIHByaXZhdGUgX3ByZXZTa2lwcGVkSXRlbXM6IFN0cmluZ0hhc2hNYXA8bnVtYmVyPiA9IHt9O1xuXG4gIHRyYW5zZm9ybShcbiAgICBvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcbiAgICBzdHIgPSAnJyxcbiAgICBsaW1pdCA9IDAsXG4gICAgcmVuZGVyTGltaXQgPSAwLFxuICAgIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCxcbiAgKTogSU11bHRpU2VsZWN0T3B0aW9uW10ge1xuICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRHJvcCBjYWNoZSBiZWNhdXNlIG9wdGlvbnMgd2VyZSB1cGRhdGVkXG4gICAgaWYgKG9wdGlvbnMgIT09IHRoaXMuX2xhc3RPcHRpb25zKSB7XG4gICAgICB0aGlzLl9sYXN0T3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICB0aGlzLl9zZWFyY2hDYWNoZSA9IHt9O1xuICAgICAgdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmUgPSB7fTtcbiAgICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXMgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJlZE9wdHMgPSB0aGlzLl9zZWFyY2hDYWNoZS5oYXNPd25Qcm9wZXJ0eShzdHIpXG4gICAgICA/IHRoaXMuX3NlYXJjaENhY2hlW3N0cl1cbiAgICAgIDogdGhpcy5fZG9TZWFyY2gob3B0aW9ucywgc3RyLCBsaW1pdCwgc2VhcmNoRnVuY3Rpb24pO1xuXG4gICAgY29uc3QgaXNVbmRlckxpbWl0ID0gb3B0aW9ucy5sZW5ndGggPD0gbGltaXQ7XG5cbiAgICByZXR1cm4gaXNVbmRlckxpbWl0XG4gICAgICA/IGZpbHRlcmVkT3B0c1xuICAgICAgOiB0aGlzLl9saW1pdFJlbmRlcmVkSXRlbXMoZmlsdGVyZWRPcHRzLCByZW5kZXJMaW1pdCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTdWJzZXRPcHRpb25zKFxuICAgIG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxuICAgIHByZXZPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcbiAgICBwcmV2U2VhcmNoU3RyOiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgcHJldkluY2x1c2l2ZU9ySWR4ID0gdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmVbcHJldlNlYXJjaFN0cl07XG5cbiAgICBpZiAocHJldkluY2x1c2l2ZU9ySWR4ID09PSB0cnVlKSB7XG4gICAgICAvLyBJZiBoYXZlIHByZXZpb3VzIHJlc3VsdHMgYW5kIGl0IHdhcyBpbmNsdXNpdmUsIGRvIG9ubHkgc3Vic2VhcmNoXG4gICAgICByZXR1cm4gcHJldk9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJldkluY2x1c2l2ZU9ySWR4ID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gT3IgcmV1c2UgcHJldiByZXN1bHRzIHdpdGggdW5jaGVja2VkIG9uZXNcbiAgICAgIHJldHVybiBbLi4ucHJldk9wdGlvbnMsIC4uLm9wdGlvbnMuc2xpY2UocHJldkluY2x1c2l2ZU9ySWR4KV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9kb1NlYXJjaChvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSwgc3RyOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIsIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCkge1xuICAgIGNvbnN0IHByZXZTdHIgPSBzdHIuc2xpY2UoMCwgLTEpO1xuICAgIGNvbnN0IHByZXZSZXN1bHRzID0gdGhpcy5fc2VhcmNoQ2FjaGVbcHJldlN0cl07XG4gICAgY29uc3QgcHJldlJlc3VsdFNoaWZ0ID0gdGhpcy5fcHJldlNraXBwZWRJdGVtc1twcmV2U3RyXSB8fCAwO1xuXG4gICAgaWYgKHByZXZSZXN1bHRzKSB7XG4gICAgICBvcHRpb25zID0gdGhpcy5fZ2V0U3Vic2V0T3B0aW9ucyhvcHRpb25zLCBwcmV2UmVzdWx0cywgcHJldlN0cik7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0c0xlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGNvbnN0IG1heEZvdW5kID0gbGltaXQgPiAwID8gTWF0aC5taW4obGltaXQsIG9wdHNMZW5ndGgpIDogb3B0c0xlbmd0aDtcbiAgICBjb25zdCByZWdleHAgPSBzZWFyY2hGdW5jdGlvbihzdHIpO1xuICAgIGNvbnN0IGZpbHRlcmVkT3B0czogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcblxuICAgIGxldCBpID0gMCwgZm91bmRlZCA9IDAsIHJlbW92ZWRGcm9tUHJldlJlc3VsdCA9IDA7XG5cbiAgICBjb25zdCBkb2VzT3B0aW9uTWF0Y2ggPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHJlZ2V4cC50ZXN0KG9wdGlvbi5uYW1lKTtcbiAgICBjb25zdCBnZXRDaGlsZHJlbiA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cbiAgICAgIG9wdGlvbnMuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnBhcmVudElkID09PSBvcHRpb24uaWQpO1xuICAgIGNvbnN0IGdldFBhcmVudCA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cbiAgICAgIG9wdGlvbnMuZmluZChwYXJlbnQgPT4gb3B0aW9uLnBhcmVudElkID09PSBwYXJlbnQuaWQpO1xuICAgIGNvbnN0IGZvdW5kRm4gPSAoaXRlbTogYW55KSA9PiB7IGZpbHRlcmVkT3B0cy5wdXNoKGl0ZW0pOyBmb3VuZGVkKys7IH07XG4gICAgY29uc3Qgbm90Rm91bmRGbiA9IHByZXZSZXN1bHRzID8gKCkgPT4gcmVtb3ZlZEZyb21QcmV2UmVzdWx0KysgOiAoKSA9PiB7IH07XG5cbiAgICBmb3IgKDsgaSA8IG9wdHNMZW5ndGggJiYgZm91bmRlZCA8IG1heEZvdW5kOyArK2kpIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICBjb25zdCBkaXJlY3RNYXRjaCA9IGRvZXNPcHRpb25NYXRjaChvcHRpb24pO1xuXG4gICAgICBpZiAoZGlyZWN0TWF0Y2gpIHtcbiAgICAgICAgZm91bmRGbihvcHRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTWF0Y2ggPSBnZXRDaGlsZHJlbihvcHRpb24pLnNvbWUoZG9lc09wdGlvbk1hdGNoKTtcblxuICAgICAgICBpZiAoY2hpbGRyZW5NYXRjaCkge1xuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbi5wYXJlbnRJZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgcGFyZW50TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2goZ2V0UGFyZW50KG9wdGlvbikpO1xuXG4gICAgICAgIGlmIChwYXJlbnRNYXRjaCkge1xuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBub3RGb3VuZEZuKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdG90YWxJdGVyYXRpb25zID0gaSArIHByZXZSZXN1bHRTaGlmdDtcblxuICAgIHRoaXMuX3NlYXJjaENhY2hlW3N0cl0gPSBmaWx0ZXJlZE9wdHM7XG4gICAgdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmVbc3RyXSA9IGkgPT09IG9wdHNMZW5ndGggfHwgdG90YWxJdGVyYXRpb25zO1xuICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbc3RyXSA9IHJlbW92ZWRGcm9tUHJldlJlc3VsdCArIHByZXZSZXN1bHRTaGlmdDtcblxuICAgIHJldHVybiBmaWx0ZXJlZE9wdHM7XG4gIH1cblxuICBwcml2YXRlIF9saW1pdFJlbmRlcmVkSXRlbXM8VD4oaXRlbXM6IFRbXSwgbGltaXQ6IG51bWJlcik6IFRbXSB7XG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IGxpbWl0ICYmIGxpbWl0ID4gMCA/IGl0ZW1zLnNsaWNlKDAsIGxpbWl0KSA6IGl0ZW1zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc3NBdXRvZm9jdXNdJ1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvZm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgLyoqXG4gICAqIFdpbGwgc2V0IGZvY3VzIGlmIHNldCB0byBmYWxzeSB2YWx1ZSBvciBub3Qgc2V0IGF0IGFsbFxuICAgKi9cbiAgQElucHV0KCkgc3NBdXRvZm9jdXM6IGJvb2xlYW47XG5cbiAgZ2V0IGVsZW1lbnQoKTogeyBmb2N1cz86IEZ1bmN0aW9uIH0ge1xuICAgIHJldHVybiB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBzc0F1dG9mb2N1c0NoYW5nZSA9IGNoYW5nZXMuc3NBdXRvZm9jdXM7XG5cbiAgICBpZiAoc3NBdXRvZm9jdXNDaGFuZ2UgJiYgIXNzQXV0b2ZvY3VzQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLnNzQXV0b2ZvY3VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzICYmIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbn1cbiIsIlxyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIEl0ZXJhYmxlRGlmZmVycyxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgRm9ybUJ1aWxkZXIsXHJcbiAgRm9ybUNvbnRyb2wsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgVmFsaWRhdG9yLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlciB9IGZyb20gJy4vc2VhcmNoLWZpbHRlci5waXBlJztcclxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uLCBJTXVsdGlTZWxlY3RTZXR0aW5ncywgSU11bHRpU2VsZWN0VGV4dHMsIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKlxyXG4gKiBBbmd1bGFyIDIgRHJvcGRvd24gTXVsdGlzZWxlY3QgZm9yIEJvb3RzdHJhcFxyXG4gKlxyXG4gKiBTaW1vbiBMaW5kaFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc29mdHNpbW9uL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdFxyXG4gKi9cclxuXHJcbmNvbnN0IE1VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NzLW11bHRpc2VsZWN0LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Ryb3Bkb3duLmNvbXBvbmVudC5jc3MnXSxcclxuICBwcm92aWRlcnM6IFtNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUiwgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXJdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIERvQ2hlY2ssXHJcbiAgT25EZXN0cm95LFxyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIFZhbGlkYXRvciB7XHJcbiAgZmlsdGVyQ29udHJvbDogRm9ybUNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woJycpO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxJTXVsdGlTZWxlY3RPcHRpb24+O1xyXG4gIEBJbnB1dCgpIHNldHRpbmdzOiBJTXVsdGlTZWxlY3RTZXR0aW5ncztcclxuICBASW5wdXQoKSB0ZXh0czogSU11bHRpU2VsZWN0VGV4dHM7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZFNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCA9IHRoaXMuX2VzY2FwZVJlZ0V4cDtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZHJvcGRvd25DbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duT3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkFkZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvblJlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uTGF6eUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uRmlsdGVyOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzO1xyXG5cclxuICBnZXQgZm9jdXNCYWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZm9jdXNCYWNrICYmIHRoaXMuX2ZvY3VzQmFjaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGlja2VkT3V0c2lkZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuc2V0dGluZ3MuY2xvc2VPbkNsaWNrT3V0c2lkZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgZmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIGxhenlMb2FkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICByZW5kZXJGaWx0ZXJlZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgbW9kZWw6IGFueVtdID0gW107XHJcbiAgcHJldk1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHBhcmVudHM6IGFueVtdO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGlmZmVyOiBhbnk7XHJcbiAgbnVtU2VsZWN0ZWQ6IG51bWJlciA9IDA7XHJcbiAgc2V0IGlzVmlzaWJsZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzVmlzaWJsZSA9IHZhbDtcclxuICAgIHRoaXMuX3dvcmtlckRvY0NsaWNrZWQgPSB2YWwgPyBmYWxzZSA6IHRoaXMuX3dvcmtlckRvY0NsaWNrZWQ7XHJcbiAgfVxyXG4gIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xyXG4gIH1cclxuICByZW5kZXJJdGVtcyA9IHRydWU7XHJcbiAgY2hlY2tBbGxTZWFyY2hSZWdpc3RlciA9IG5ldyBTZXQoKTtcclxuICBjaGVja0FsbFN0YXR1cyA9IGZhbHNlO1xyXG4gIGxvYWRlZFZhbHVlSWRzID0gW107XHJcbiAgX2ZvY3VzQmFjayA9IGZhbHNlO1xyXG4gIGZvY3VzZWRJdGVtOiBJTXVsdGlTZWxlY3RPcHRpb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gIGRlZmF1bHRTZXR0aW5nczogSU11bHRpU2VsZWN0U2V0dGluZ3MgPSB7XHJcbiAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgcHVsbFJpZ2h0OiBmYWxzZSxcclxuICAgIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgICBzZWFyY2hSZW5kZXJMaW1pdDogMCxcclxuICAgIHNlYXJjaFJlbmRlckFmdGVyOiAxLFxyXG4gICAgc2VhcmNoTWF4TGltaXQ6IDAsXHJcbiAgICBzZWFyY2hNYXhSZW5kZXJlZEl0ZW1zOiAwLFxyXG4gICAgY2hlY2tlZFN0eWxlOiAnY2hlY2tib3hlcycsXHJcbiAgICBidXR0b25DbGFzc2VzOiAnYnRuIGJ0bi1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb250YWluZXJDbGFzc2VzOiAnZHJvcGRvd24taW5saW5lJyxcclxuICAgIHNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgbWluU2VsZWN0aW9uTGltaXQ6IDAsXHJcbiAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgIGF1dG9VbnNlbGVjdDogZmFsc2UsXHJcbiAgICBzaG93Q2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgc2hvd1VuY2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgZml4ZWRUaXRsZTogZmFsc2UsXHJcbiAgICBkeW5hbWljVGl0bGVNYXhJdGVtczogMyxcclxuICAgIG1heEhlaWdodDogJzMwMHB4JyxcclxuICAgIGlzTGF6eUxvYWQ6IGZhbHNlLFxyXG4gICAgc3RvcFNjcm9sbFByb3BhZ2F0aW9uOiBmYWxzZSxcclxuICAgIGxvYWRWaWV3RGlzdGFuY2U6IDEsXHJcbiAgICBzZWxlY3RBZGRlZFZhbHVlczogZmFsc2UsXHJcbiAgICBpZ25vcmVMYWJlbHM6IGZhbHNlLFxyXG4gICAgbWFpbnRhaW5TZWxlY3Rpb25PcmRlckluVGl0bGU6IGZhbHNlLFxyXG4gICAgZm9jdXNCYWNrOiB0cnVlXHJcbiAgfTtcclxuICBkZWZhdWx0VGV4dHM6IElNdWx0aVNlbGVjdFRleHRzID0ge1xyXG4gICAgY2hlY2tBbGw6ICdDaGVjayBhbGwnLFxyXG4gICAgdW5jaGVja0FsbDogJ1VuY2hlY2sgYWxsJyxcclxuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcclxuICAgIGNoZWNrZWRQbHVyYWw6ICdjaGVja2VkJyxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgIHNlYXJjaEVtcHR5UmVzdWx0OiAnTm90aGluZyBmb3VuZC4uLicsXHJcbiAgICBzZWFyY2hOb1JlbmRlclRleHQ6ICdUeXBlIGluIHNlYXJjaCBib3ggdG8gc2VlIHJlc3VsdHMuLi4nLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnU2VsZWN0JyxcclxuICAgIGFsbFNlbGVjdGVkOiAnQWxsIHNlbGVjdGVkJyxcclxuICB9O1xyXG5cclxuICBnZXQgc2VhcmNoTGltaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJMaW1pdDtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hSZW5kZXJBZnRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0QXBwbGllZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpbWl0ID4gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gdGhpcy5zZWFyY2hMaW1pdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3dvcmtlckRvY0NsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyOiBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xyXG4gICAgdGhpcy50ZXh0cyA9IHRoaXMuZGVmYXVsdFRleHRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICBpZiAoIW9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdwb2ludGVyJztcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlU2VsZWN0aW9uRGlzYWJsZWQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IGN1cnNvcjogJ2RlZmF1bHQnIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCkge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydvcHRpb25zJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhcmVudHMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAnbnVtYmVyJylcclxuICAgICAgICAubWFwKG9wdGlvbiA9PiBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMgPSB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChcclxuICAgICAgICAgIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUubWFwKHZhbHVlID0+IHZhbHVlLmlkKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBhZGRlZFZhbHVlcyA9IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgdmFsdWUgPT4gdGhpcy5sb2FkZWRWYWx1ZUlkcy5pbmRleE9mKHZhbHVlLmlkKSA9PT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KGFkZGVkVmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENoZWNrcyhhZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuc2l6ZSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKHNlYXJjaFZhbHVlID0+XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKHRoaXMuYXBwbHlGaWx0ZXJzKGFkZGVkVmFsdWVzLCBzZWFyY2hWYWx1ZSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGV4dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3MgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndGV4dHMnXSkge1xyXG4gICAgICB0aGlzLnRleHRzID0geyAuLi50aGlzLmRlZmF1bHRUZXh0cywgLi4udGhpcy50ZXh0cyB9O1xyXG4gICAgICBpZiAoIWNoYW5nZXNbJ3RleHRzJ10uaXNGaXJzdENoYW5nZSgpKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zID1cclxuICAgICAgIXRoaXMuc2VhcmNoTGltaXRBcHBsaWVkIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnMoXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkID8gJycgOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlckZpbHRlcmVkT3B0aW9ucyA9IHRoaXMucmVuZGVySXRlbXMgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucyA6IFtdO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhvcHRpb25zLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmlsdGVyLnRyYW5zZm9ybShcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4TGltaXQsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4UmVuZGVyZWRJdGVtcyxcclxuICAgICAgdGhpcy5zZWFyY2hGdW5jdGlvblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZpcmVNb2RlbENoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsICE9IHRoaXMucHJldk1vZGVsKSB7XHJcbiAgICAgIHRoaXMucHJldk1vZGVsID0gdGhpcy5tb2RlbDtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5tb2RlbCk7XHJcbiAgICBpZiAoY2hhbmdlcykge1xyXG4gICAgICB0aGlzLnVwZGF0ZU51bVNlbGVjdGVkKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlVGl0bGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKF9jOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHtcclxuICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpbHRlcihvID0+IHRoaXMubW9kZWwuaW5kZXhPZihvLmlkKSAmJiAhby5kaXNhYmxlZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0aW9uOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKF9mbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWFyY2goZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLm1heWJlU3RvcFByb3BhZ2F0aW9uKGV2ZW50KTtcclxuICAgIHRoaXMuZmlsdGVyQ29udHJvbC5zZXRWYWx1ZSgnJyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVEcm9wZG93bihlPzogRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICB0aGlzLl9mb2N1c0JhY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPyB0aGlzLmRyb3Bkb3duT3BlbmVkLmVtaXQoKSA6IHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKGUpO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkKF9ldmVudDogRXZlbnQsIG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICBpZiAob3B0aW9uLmlzTGFiZWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHRoaXMubWF5YmVTdG9wUHJvcGFnYXRpb24oX2V2ZW50KTtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KF9ldmVudCk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCk7XHJcbiAgICAgIGNvbnN0IGlzQXRTZWxlY3Rpb25MaW1pdCA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA+IDAgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0O1xyXG4gICAgICBjb25zdCByZW1vdmVJdGVtID0gKGlkeCwgaWQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNwbGljZShcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuaW5kZXhPZihcclxuICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5maW5kKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICB0aGlzLm51bVNlbGVjdGVkID4gdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShpbmRleCwgb3B0aW9uLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPVxyXG4gICAgICAgICAgb3B0aW9uLnBhcmVudElkICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKHBhcmVudEluZGV4LCBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xICYmXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZvckVhY2goY2hpbGQgPT5cclxuICAgICAgICAgICAgICByZW1vdmVJdGVtKHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCksIGNoaWxkLmlkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0F0U2VsZWN0aW9uTGltaXQgJiYgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MaW1pdFJlYWNoZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFkZEl0ZW0gPSAoaWQpOiB2b2lkID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZWwucHVzaChpZCk7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkSXRlbShvcHRpb24uaWQpO1xyXG4gICAgICAgIGlmICghaXNBdFNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnBhcmVudElkICYmICF0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIGNoaWxkLmlkICE9PSBvcHRpb24uaWQgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5wYXJlbnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xKSkge1xyXG4gICAgICAgICAgICAgIGFkZEl0ZW0ob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpIDwgMCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gYWRkSXRlbShjaGlsZC5pZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKDAsIHRoaXMubW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLnNsaWNlKCk7XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcblxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5udW1TZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMubW9kZWwuZmlsdGVyKGlkID0+IHRoaXMucGFyZW50cy5pbmRleE9mKGlkKSA8IDApLmxlbmd0aCB8fCAwO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVGl0bGUoKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbi5pc0xhYmVsXHJcbiAgICAgICkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDAgfHwgdGhpcy5zZXR0aW5ncy5maXhlZFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzcGxheUFsbFNlbGVjdGVkVGV4dCAmJlxyXG4gICAgICB0aGlzLm1vZGVsLmxlbmd0aCA9PT0gbnVtU2VsZWN0ZWRPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmFsbFNlbGVjdGVkIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zICYmXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgPj0gdGhpcy5udW1TZWxlY3RlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVzZU9wdGlvbnMgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLmxhenlMb2FkT3B0aW9ucy5sZW5ndGhcclxuICAgICAgICAgID8gdGhpcy5sYXp5TG9hZE9wdGlvbnNcclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgbGV0IHRpdGxlU2VsZWN0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gdXNlT3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uLCBpZHg6IG51bWJlcikgPT4gc2VsZWN0T3B0aW9uLmlkKTtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB0aGlzLm1vZGVsXHJcbiAgICAgICAgICAubWFwKChzZWxlY3RlZElkKSA9PiBvcHRpb25JZHMuaW5kZXhPZihzZWxlY3RlZElkKSlcclxuICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbkluZGV4KSA9PiBvcHRpb25JbmRleCA+IC0xKVxyXG4gICAgICAgICAgLm1hcCgob3B0aW9uSW5kZXgpID0+IHVzZU9wdGlvbnNbb3B0aW9uSW5kZXhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB1c2VPcHRpb25zLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGVTZWxlY3Rpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9XHJcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZCArXHJcbiAgICAgICAgJyAnICtcclxuICAgICAgICAodGhpcy5udW1TZWxlY3RlZCA9PT0gMVxyXG4gICAgICAgICAgPyB0aGlzLnRleHRzLmNoZWNrZWRcclxuICAgICAgICAgIDogdGhpcy50ZXh0cy5jaGVja2VkUGx1cmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hGaWx0ZXJBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2hlY2tzKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgICAgICEodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMgJiYgb3B0aW9uLmlzTGFiZWwpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChvcHRpb24uaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuY29uY2F0KGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hlY2tzKFxyXG4gICAgICAgICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSA/IHRoaXMub3B0aW9ucyA6IHRoaXMuZmlsdGVyZWRPcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSAmJiAhdGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmFkZCh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMubW9kZWw7XHJcbiAgICAgIGxldCB1bkNoZWNrZWRPcHRpb25zID0gIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpXHJcbiAgICAgICAgPyB0aGlzLm1vZGVsXHJcbiAgICAgICAgOiB0aGlzLmZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG4gICAgICAvLyBzZXQgdW5jaGVja2VkIG9wdGlvbnMgb25seSB0byB0aGUgb25lcyB0aGF0IHdlcmUgY2hlY2tlZFxyXG4gICAgICB1bkNoZWNrZWRPcHRpb25zID0gY2hlY2tlZE9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGl0ZW0pID4gLTEpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIoKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuaGFzKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmRlbGV0ZSh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChmdW5jdGlvbiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyh0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSwgc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDaGVja3MoZmlsdGVyT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZlbnRDaGVja2JveENoZWNrKGV2ZW50OiBFdmVudCwgb3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgb3B0aW9uLmRpc2FibGVkIHx8XHJcbiAgICAgIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NoZWNrYm94RGlzYWJsZWQob3B0aW9uPzogSU11bHRpU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFNlbGVjdGlvbiB8fCBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQb3NpdGlvbihldikge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZXYudGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZXYudGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHJvdW5kaW5nUGl4ZWwgPSAxO1xyXG4gICAgY29uc3QgZ3V0dGVyUGl4ZWwgPSAxO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgc2Nyb2xsVG9wID49XHJcbiAgICAgIHNjcm9sbEhlaWdodCAtXHJcbiAgICAgICgxICsgdGhpcy5zZXR0aW5ncy5sb2FkVmlld0Rpc3RhbmNlKSAqIHNjcm9sbEVsZW1lbnRIZWlnaHQgLVxyXG4gICAgICByb3VuZGluZ1BpeGVsIC1cclxuICAgICAgZ3V0dGVyUGl4ZWxcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUHJvcGFnYXRpb24oZXYsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoZXYuZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgKyBzY3JvbGxFbGVtZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCkgfHxcclxuICAgICAgKGV2LmRlbHRhWSA8IDAgJiYgc2Nyb2xsVG9wIDw9IDApXHJcbiAgICApIHtcclxuICAgICAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldik7XHJcbiAgICAgIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaWR4OiBudW1iZXIsIHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcclxuICAgICAgbGVuZ3RoOiB0aGlzLm9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSxcclxuICAgICAgY2hlY2tBbGxTZWFyY2hlczogdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLFxyXG4gICAgICBjaGVja0FsbFN0YXR1czogdGhpcy5jaGVja0FsbFN0YXR1cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNJdGVtKGRpcjogbnVtYmVyLCBlPzogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1swXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRJZHggPSBpZHggKyBkaXI7XHJcbiAgICBjb25zdCBuZXdJZHggPVxyXG4gICAgICBuZXh0SWR4IDwgMFxyXG4gICAgICAgID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogbmV4dElkeCAlIHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbbmV3SWR4XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVQcmV2ZW50RGVmYXVsdChlPzogeyBwcmV2ZW50RGVmYXVsdD86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVN0b3BQcm9wYWdhdGlvbihlPzogeyBzdG9wUHJvcGFnYXRpb24/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBwcml2YXRlIF9lc2NhcGVSZWdFeHAoc3RyOiBzdHJpbmcpOiBSZWdFeHAge1xyXG4gICAgY29uc3QgcmVnRXhwU3RyID0gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ0V4cFN0ciwgJ2knKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxufSlcblxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgnb2ZmQ2xpY2snKSBvbk9mZkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcbiAgcHJpdmF0ZSBfdG91Y2hFdmVudDogVG91Y2hFdmVudDtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxuICBwdWJsaWMgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NsaWNrRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX3RvdWNoRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSkgXG4gIHB1YmxpYyBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCAhPT0gdGhpcy5fdG91Y2hFdmVudCkge1xuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBBdXRvZm9jdXNEaXJlY3RpdmUgfSBmcm9tICcuL2F1dG9mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xuaW1wb3J0IHsgT2ZmQ2xpY2tEaXJlY3RpdmUgfSBmcm9tICcuL29mZi1jbGljay5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxuICAgIE9mZkNsaWNrRGlyZWN0aXZlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpc2VsZWN0RHJvcGRvd25Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs0QkFjOEQsRUFBRTtxQ0FDRyxFQUFFO2lDQUNoQixFQUFFOzs7Ozs7Ozs7O0lBRXJELFNBQVMsQ0FDUCxPQUE2QixFQUM3QixHQUFHLEdBQUcsRUFBRSxFQUNSLEtBQUssR0FBRyxDQUFDLEVBQ1QsV0FBVyxHQUFHLENBQUMsRUFDZixjQUF1QztRQUV2QyxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDOztRQUd4QixJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztTQUM3QjtRQUVELHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Y0FDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7Y0FDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztRQUV4RCx1QkFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7UUFFN0MsT0FBTyxZQUFZO2NBQ2YsWUFBWTtjQUNaLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7S0FDekQ7Ozs7Ozs7SUFFTyxpQkFBaUIsQ0FDdkIsT0FBNkIsRUFDN0IsV0FBaUMsRUFDakMsYUFBcUI7UUFFckIsdUJBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXJFLElBQUksa0JBQWtCLEtBQUssSUFBSSxFQUFFOztZQUUvQixPQUFPLFdBQVcsQ0FBQztTQUNwQjthQUFNLElBQUksT0FBTyxrQkFBa0IsS0FBSyxRQUFRLEVBQUU7O1lBRWpELE9BQU8sQ0FBQyxHQUFHLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQy9EO1FBRUQsT0FBTyxPQUFPLENBQUM7Ozs7Ozs7OztJQUdULFNBQVMsQ0FBQyxPQUE2QixFQUFFLEdBQVcsRUFBRSxLQUFhLEVBQUUsY0FBdUM7UUFDbEgsdUJBQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsdUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsdUJBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0QsSUFBSSxXQUFXLEVBQUU7WUFDZixPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDakU7UUFFRCx1QkFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNsQyx1QkFBTSxRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDdEUsdUJBQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyx1QkFBTSxZQUFZLEdBQXlCLEVBQUUsQ0FBQztRQUU5QyxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBRSxPQUFPLEdBQUcsQ0FBQyxtQkFBRSxxQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFFbEQsdUJBQU0sZUFBZSxHQUFHLENBQUMsTUFBMEIsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRix1QkFBTSxXQUFXLEdBQUcsQ0FBQyxNQUEwQixLQUM3QyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RCx1QkFBTSxTQUFTLEdBQUcsQ0FBQyxNQUEwQixLQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4RCx1QkFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFTLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN2RSx1QkFBTSxVQUFVLEdBQUcsV0FBVyxHQUFHLE1BQU0scUJBQXFCLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFFM0UsT0FBTyxDQUFDLEdBQUcsVUFBVSxJQUFJLE9BQU8sR0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDaEQsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQix1QkFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTVDLElBQUksV0FBVyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEIsU0FBUzthQUNWO1lBRUQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssV0FBVyxFQUFFO2dCQUMxQyx1QkFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFFaEUsSUFBSSxhQUFhLEVBQUU7b0JBQ2pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDaEIsU0FBUztpQkFDVjthQUNGO1lBRUQsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssV0FBVyxFQUFFO2dCQUMxQyx1QkFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUV2RCxJQUFJLFdBQVcsRUFBRTtvQkFDZixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hCLFNBQVM7aUJBQ1Y7YUFDRjtZQUVELFVBQVUsRUFBRSxDQUFDO1NBQ2Q7UUFFRCx1QkFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQztRQUU1QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFVBQVUsSUFBSSxlQUFlLENBQUM7UUFDdEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLHFCQUFxQixHQUFHLGVBQWUsQ0FBQztRQUV0RSxPQUFPLFlBQVksQ0FBQzs7Ozs7Ozs7SUFHZCxtQkFBbUIsQ0FBSSxLQUFVLEVBQUUsS0FBYTtRQUN0RCxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDOzs7O1lBeEg1RSxJQUFJLFNBQUM7Z0JBQ0osSUFBSSxFQUFFLGNBQWM7YUFDckI7Ozs7Ozs7QUNWRDs7OztJQWdCRSxZQUNrQjtRQUFBLFlBQU8sR0FBUCxPQUFPO0tBQ3BCOzs7O0lBTkwsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUNuQzs7OztJQU1ELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDZDs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsdUJBQU0saUJBQWlCLEdBQUcsT0FBTyxlQUFZLENBQUM7UUFFOUMsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO0tBQ0Y7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDNUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7WUFKbUIsVUFBVSx1QkFpQnpCLElBQUk7Ozs0QkFQTixLQUFLOzs7Ozs7O0FDVFI7Ozs7OztBQXNDQSx1QkFBTSwwQkFBMEIsR0FBUTtJQUN0QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSw0QkFBNEIsQ0FBQztJQUMzRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFTRjs7Ozs7Ozs7SUFvSEUsWUFDVSxTQUNBLElBQ0EsY0FDUixPQUF3QixFQUNoQjtRQUpBLFlBQU8sR0FBUCxPQUFPO1FBQ1AsT0FBRSxHQUFGLEVBQUU7UUFDRixpQkFBWSxHQUFaLFlBQVk7UUFFWixVQUFLLEdBQUwsS0FBSzs2QkFsSGMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3dCQUtuQixLQUFLO2lDQUNJLEtBQUs7OEJBQ1EsSUFBSSxDQUFDLGFBQWE7cUNBRW5DLElBQUksWUFBWSxFQUFFOzhCQUN6QixJQUFJLFlBQVksRUFBRTs4QkFDbEIsSUFBSSxZQUFZLEVBQUU7dUJBQ3pCLElBQUksWUFBWSxFQUFFO3lCQUNoQixJQUFJLFlBQVksRUFBRTswQkFDakIsSUFBSSxZQUFZLEVBQUU7d0JBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZOzBCQWMzRCxJQUFJLE9BQU8sRUFBTzsrQkFFUyxFQUFFOytCQUNGLEVBQUU7cUNBQ0ksRUFBRTtxQkFDakMsRUFBRTt5QkFDRSxFQUFFOzJCQUlDLENBQUM7MkJBUVQsSUFBSTtzQ0FDTyxJQUFJLEdBQUcsRUFBRTs4QkFDakIsS0FBSzs4QkFDTCxFQUFFOzBCQUNOLEtBQUs7K0JBR3NCO1lBQ3RDLG1CQUFtQixFQUFFLElBQUk7WUFDekIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLHNCQUFzQixFQUFFLENBQUM7WUFDekIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsYUFBYSxFQUFFLGlDQUFpQztZQUNoRCxnQkFBZ0IsRUFBRSxpQkFBaUI7WUFDbkMsY0FBYyxFQUFFLENBQUM7WUFDakIsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQixhQUFhLEVBQUUsS0FBSztZQUNwQixZQUFZLEVBQUUsS0FBSztZQUNuQixZQUFZLEVBQUUsS0FBSztZQUNuQixjQUFjLEVBQUUsS0FBSztZQUNyQixVQUFVLEVBQUUsS0FBSztZQUNqQixvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLHFCQUFxQixFQUFFLEtBQUs7WUFDNUIsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFlBQVksRUFBRSxLQUFLO1lBQ25CLDZCQUE2QixFQUFFLEtBQUs7WUFDcEMsU0FBUyxFQUFFLElBQUk7U0FDaEI7NEJBQ2lDO1lBQ2hDLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGlCQUFpQixFQUFFLFdBQVc7WUFDOUIsaUJBQWlCLEVBQUUsa0JBQWtCO1lBQ3JDLGtCQUFrQixFQUFFLHNDQUFzQztZQUMxRCxZQUFZLEVBQUUsUUFBUTtZQUN0QixXQUFXLEVBQUUsY0FBYztTQUM1QjswQkFjb0IsS0FBSztpQ0FDRSxLQUFLOzZCQWdJUCxDQUFDLENBQU0sUUFBUTs4QkFDZCxTQUFTO1FBeEhsQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7S0FDaEM7Ozs7SUF0R0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ25EOzs7O0lBRU0sY0FBYztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFdEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7O0lBYzdCLElBQUksU0FBUyxDQUFDLEdBQVk7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0tBQy9EOzs7O0lBQ0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7O0lBZ0RELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4Qzs7OztJQUVELElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztLQUN4Qzs7OztJQUVELElBQUksa0JBQWtCO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN2RTs7Ozs7SUFpQkQsWUFBWSxDQUFDLE1BQTBCO1FBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBRXBCO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLENBRXBCO0tBQ0Y7Ozs7SUFFRCw2QkFBNkI7UUFDM0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQztTQUM5QjtLQUNGOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO1FBRTNDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztpQkFDeEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO2lCQUNyRCxHQUFHLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUV6QixJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUI7Z0JBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQ2pDLEVBQUU7Z0JBQ0EsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDOUMsT0FBTyxZQUFTLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDcEQsQ0FBQzthQUNIO1lBQ0QsSUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCO2dCQUMvQixPQUFPLFlBQVMsYUFDbEIsRUFBRTtnQkFDQSx1QkFBTSxXQUFXLEdBQUcsT0FBTyxZQUFTLFlBQVksQ0FBQyxNQUFNLENBQ3JELEtBQUssSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ3RELENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDN0I7cUJBQU0sSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDL0MsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FDNUQsQ0FBQztpQkFDSDthQUNGO1lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtZQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLHFCQUFRLElBQUksQ0FBQyxlQUFlLEVBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1NBQy9EO1FBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEtBQUsscUJBQVEsSUFBSSxDQUFDLFlBQVksRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7WUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFBRTtTQUMvRDtLQUNGOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDeEI7Ozs7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsV0FBVztZQUNkLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUM1RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQ3RDLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUN6RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7S0FDOUI7Ozs7OztJQUVELFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSztRQUN6QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUNoQyxPQUFPLEVBQ1AsS0FBSyxFQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUNwQyxJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO0tBQ0g7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzNCO0tBQ0Y7Ozs7O0lBS0QsVUFBVSxDQUFDLEtBQVU7UUFDbkIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDakI7S0FDRjs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFZO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0tBQ3pCOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7S0FDMUI7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDNUI7Ozs7SUFFRCxTQUFTO1FBQ1AsdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtLQUNGOzs7OztJQUVELFFBQVEsQ0FBQyxFQUFtQjtRQUMxQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTztnQkFDTCxRQUFRLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLEtBQUs7aUJBQ2I7YUFDRixDQUFDO1NBQ0g7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsRixPQUFPO2dCQUNMLFNBQVMsRUFBRTtvQkFDVCxLQUFLLEVBQUUsS0FBSztpQkFDYjthQUNGLENBQUM7U0FDSDtRQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7O0lBRUQseUJBQXlCLENBQUMsR0FBZTtRQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDNUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVk7UUFDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUVELGNBQWMsQ0FBQyxDQUFTO1FBQ3RCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0tBQzlCOzs7OztJQUVELGFBQWEsQ0FBQyxDQUFTO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQTBCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDekQ7Ozs7OztJQUVELFdBQVcsQ0FBQyxNQUFhLEVBQUUsTUFBMEI7UUFDbkQsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuQixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixPQUFPO1NBQ1I7UUFFRCxVQUFVLENBQUM7WUFDVCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsdUJBQU0sa0JBQWtCLEdBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ3BELHVCQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTtvQkFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUNoRCxFQUFFO29CQUNBLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQ2hELEVBQ0QsQ0FBQyxDQUNGLENBQUM7aUJBQ0g7YUFDRixDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsSUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixLQUFLLFNBQVM7b0JBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFDbkMsRUFBRTtvQkFDQSxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDOUI7Z0JBQ0QsdUJBQU0sV0FBVyxHQUNmLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDcEIsVUFBVSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzFDO3FCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUMvQyxJQUFJLENBQUMsT0FBTzt5QkFDVCxNQUFNLENBQ0wsS0FBSyxJQUNILElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pDLEtBQUssQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FDL0I7eUJBQ0EsT0FBTyxDQUFDLEtBQUssSUFDWixVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FDbkQsQ0FBQztpQkFDTDthQUNGO2lCQUFNLElBQUksa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtnQkFDNUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxPQUFPO2FBQ1I7aUJBQU07Z0JBQ0wsdUJBQU0sT0FBTyxHQUFHLENBQUMsRUFBRTtvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixJQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVTt3QkFDeEIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQ2pELEVBQUU7d0JBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ25DO2lCQUNGLENBQUM7Z0JBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGtCQUFrQixFQUFFO29CQUN2QixJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTt3QkFDbEQsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNsQyxLQUFLLElBQ0gsS0FBSyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FDL0QsQ0FBQzt3QkFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUM5RCxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3lCQUMxQjtxQkFDRjt5QkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDL0MsdUJBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNsQyxLQUFLLElBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQ25FLENBQUM7d0JBQ0YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUM5QztpQkFDRjtxQkFBTTtvQkFDTCxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUI7YUFDRjtZQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FFeEIsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNOOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLFdBQVc7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztLQUNyRTs7OztJQUVELFdBQVc7UUFDVCxxQkFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQzlCLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN0QyxDQUFDLE1BQTBCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNoRCxDQUFDLE1BQU0sQ0FBQztTQUNWO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hEO2FBQU0sSUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQjtZQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxrQkFDeEIsRUFBRTtZQUNBLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDdkQ7YUFBTSxJQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFdBQzdDLEVBQUU7WUFDQSx1QkFBTSxVQUFVLEdBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNO2tCQUNuRCxJQUFJLENBQUMsZUFBZTtrQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUVuQixxQkFBSSxlQUEwQyxDQUFDO1lBRS9DLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTtnQkFDL0MsdUJBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFnQyxFQUFFLEdBQVcsS0FBSyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JHLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSztxQkFDekIsR0FBRyxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ2xELE1BQU0sQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ3pDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsS0FBSyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxlQUFlLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQTBCLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekc7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUEwQixLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUY7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLO2dCQUNSLElBQUksQ0FBQyxXQUFXO29CQUNoQixHQUFHO3FCQUNGLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQzswQkFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzBCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVELG1CQUFtQjtRQUNqQixRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUs7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDbkM7S0FDSDs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBTztRQUNmLHVCQUFNLGNBQWMsR0FBRyxPQUFPO2FBQzNCLE1BQU0sQ0FBQyxDQUFDLE1BQTBCO1lBQ2pDLElBQ0UsQ0FBQyxNQUFNLENBQUMsUUFBUTtpQkFFZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FFbkQsRUFBRTtnQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxNQUEwQixLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2hEOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FDWixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDbEUsQ0FBQztZQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDL0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDM0Q7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztpQkFDNUI7Z0JBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7S0FDRjs7OztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzNCLHVCQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xDLHFCQUFJLGdCQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2tCQUM5QyxJQUFJLENBQUMsS0FBSztrQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQTBCLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUV4RSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBVTtnQkFDeEMsSUFDRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO29CQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixLQUFLLFNBQVM7b0JBQy9DLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUMvQyxFQUFFO29CQUNBLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4QixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDL0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtvQkFDOUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQzdELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDN0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxVQUFVLFVBQVU7NEJBQ3RELHVCQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQzdILElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7eUJBQy9CLENBQUMsQ0FBQztxQkFDSjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2lCQUM3QjtnQkFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtLQUNGOzs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxLQUFZLEVBQUUsTUFBMEI7UUFDM0QsSUFDRSxNQUFNLENBQUMsUUFBUTthQUViLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztnQkFDNUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztnQkFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUVuQyxFQUFFO1lBQ0EsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0tBQ0Y7Ozs7O0lBRUQsa0JBQWtCLENBQUMsTUFBMkI7UUFDNUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDNUQ7Ozs7O0lBRUQsbUJBQW1CLENBQUMsRUFBRTtRQUNwQix1QkFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDdEMsdUJBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQzVDLHVCQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ25ELHVCQUFNLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDeEIsdUJBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUNFLFNBQVM7WUFDVCxZQUFZO2dCQUNaLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLElBQUksbUJBQW1CO2dCQUMxRCxhQUFhO2dCQUNiLFdBQ0YsRUFBRTtZQUNBLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0tBQ0Y7Ozs7OztJQUVELHNCQUFzQixDQUFDLEVBQUUsRUFBRSxPQUFPO1FBQ2hDLHVCQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3BDLHVCQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzFDLHVCQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFakQsSUFDRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxtQkFBbUIsSUFBSSxZQUFZO2FBQ2hFLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQ2xDLEVBQUU7WUFDQSxFQUFFLEdBQUcsRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7OztJQUVELFNBQVMsQ0FBQyxHQUFXLEVBQUUsWUFBZ0M7UUFDckQsT0FBTyxZQUFZLENBQUMsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDM0IsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSztZQUNoQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCO1lBQzdDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUNwQyxDQUFDLENBQUM7S0FDSjs7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVcsRUFBRSxDQUFTO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1Qix1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNELElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU87U0FDUjtRQUVELHVCQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQzFCLHVCQUFNLE1BQU0sR0FDVixPQUFPLEdBQUcsQ0FBQztjQUNQLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUM7Y0FDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRTVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxDQUFpQztRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFO1lBQ3pCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQjs7Ozs7O0lBR0ssb0JBQW9CLENBQUMsQ0FBa0M7UUFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRTtZQUMxQixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDckI7Ozs7OztJQUdLLGFBQWEsQ0FBQyxHQUFXO1FBQy9CLHVCQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdFLE9BQU8sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7O1lBL3BCckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLDB0TEFBd0M7Z0JBRXhDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixFQUFFLHVCQUF1QixDQUFDO2dCQUNoRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7WUE3Q0MsVUFBVTtZQWVWLFdBQVc7WUFRSix1QkFBdUI7WUFsQjlCLGVBQWU7WUFSZixpQkFBaUI7Ozt3QkEwRGhCLEtBQUs7eUJBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7a0NBQ0wsS0FBSzsrQkFDTCxLQUFLO3NDQUVMLE1BQU07K0JBQ04sTUFBTTsrQkFDTixNQUFNO3dCQUNOLE1BQU07MEJBQ04sTUFBTTsyQkFDTixNQUFNO3lCQUNOLE1BQU07Ozs7Ozs7QUMxRVQ7OzBCQWNtQyxJQUFJLFlBQVksRUFBTzs7Ozs7O0lBTWpELE9BQU8sQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0lBSXBCLE9BQU8sQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0lBSXBCLGVBQWUsQ0FBQyxLQUFpQjtRQUN0QyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCOzs7Ozs7SUFJSSxlQUFlLENBQUMsS0FBaUI7UUFDdEMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3Qjs7OztZQWhDSixTQUFTLFNBQUM7O2dCQUVULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7OzJCQUdFLE1BQU0sU0FBQyxVQUFVO3dCQUtqQixZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQUtoQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO2dDQUtyQyxZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0NBT3pDLFlBQVksU0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztBQ3BDakQ7OztZQVNDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7Z0JBQzVDLE9BQU8sRUFBRTtvQkFDUCw0QkFBNEI7b0JBQzVCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLDRCQUE0QjtvQkFDNUIsdUJBQXVCO29CQUN2QixrQkFBa0I7b0JBQ2xCLGlCQUFpQjtpQkFDbEI7YUFDRjs7Ozs7Ozs7Ozs7Ozs7OyJ9