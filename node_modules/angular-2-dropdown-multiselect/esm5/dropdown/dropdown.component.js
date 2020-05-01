/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /** @type {?} */ MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiselectDropdownComponent; }),
    multi: true,
};
var MultiselectDropdownComponent = /** @class */ (function () {
    function MultiselectDropdownComponent(element, fb, searchFilter, differs, cdRef) {
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
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
        this.settings = this.defaultSettings;
        this.texts = this.defaultTexts;
    }
    Object.defineProperty(MultiselectDropdownComponent.prototype, "focusBack", {
        get: /**
         * @return {?}
         */
        function () {
            return this.settings.focusBack && this._focusBack;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.clickedOutside = /**
     * @return {?}
     */
    function () {
        if (!this.isVisible || !this.settings.closeOnClickOutside) {
            return;
        }
        this.isVisible = false;
        this._focusBack = true;
        this.dropdownClosed.emit();
    };
    Object.defineProperty(MultiselectDropdownComponent.prototype, "isVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isVisible;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._isVisible = val;
            this._workerDocClicked = val ? false : this._workerDocClicked;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.settings.searchRenderLimit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiselectDropdownComponent.prototype, "searchRenderAfter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.settings.searchRenderAfter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimitApplied", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchLimit > 0 && this.options.length > this.searchLimit;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.getItemStyle = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        var /** @type {?} */ style = {};
        if (!option.isLabel) {
            style['cursor'] = 'pointer';
        }
        if (option.disabled) {
            style['cursor'] = 'default';
        }
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.getItemStyleSelectionDisabled = /**
     * @return {?}
     */
    function () {
        if (this.disabledSelection) {
            return { cursor: 'default' };
        }
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.title = this.texts.defaultTitle || '';
        this.filterControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(function () {
            _this.updateRenderItems();
            if (_this.settings.isLazyLoad) {
                _this.load();
            }
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['options']) {
            this.options = this.options || [];
            this.parents = this.options
                .filter(function (option) { return typeof option.parentId === 'number'; })
                .map(function (option) { return option.parentId; });
            this.updateRenderItems();
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                this.loadedValueIds.length === 0) {
                this.loadedValueIds = this.loadedValueIds.concat(changes["options"].currentValue.map(function (value) { return value.id; }));
            }
            if (this.settings.isLazyLoad &&
                this.settings.selectAddedValues &&
                changes["options"].previousValue) {
                var /** @type {?} */ addedValues_1 = changes["options"].currentValue.filter(function (value) { return _this.loadedValueIds.indexOf(value.id) === -1; });
                this.loadedValueIds.concat(addedValues_1.map(function (value) { return value.id; }));
                if (this.checkAllStatus) {
                    this.addChecks(addedValues_1);
                }
                else if (this.checkAllSearchRegister.size > 0) {
                    this.checkAllSearchRegister.forEach(function (searchValue) {
                        return _this.addChecks(_this.applyFilters(addedValues_1, searchValue));
                    });
                }
            }
            if (this.texts) {
                this.updateTitle();
            }
            this.fireModelChange();
        }
        if (changes['settings']) {
            this.settings = tslib_1.__assign({}, this.defaultSettings, this.settings);
        }
        if (changes['texts']) {
            this.texts = tslib_1.__assign({}, this.defaultTexts, this.texts);
            if (!changes['texts'].isFirstChange()) {
                this.updateTitle();
            }
        }
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed$.next();
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.updateRenderItems = /**
     * @return {?}
     */
    function () {
        this.renderItems =
            !this.searchLimitApplied ||
                this.filterControl.value.length >= this.searchRenderAfter;
        this.filteredOptions = this.applyFilters(this.options, this.settings.isLazyLoad ? '' : this.filterControl.value);
        this.renderFilteredOptions = this.renderItems ? this.filteredOptions : [];
        this.focusedItem = undefined;
    };
    /**
     * @param {?} options
     * @param {?} value
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.applyFilters = /**
     * @param {?} options
     * @param {?} value
     * @return {?}
     */
    function (options, value) {
        return this.searchFilter.transform(options, value, this.settings.searchMaxLimit, this.settings.searchMaxRenderedItems, this.searchFunction);
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.fireModelChange = /**
     * @return {?}
     */
    function () {
        if (this.model != this.prevModel) {
            this.prevModel = this.model;
            this.onModelChange(this.model);
            this.onModelTouched();
            this.cdRef.markForCheck();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== undefined && value !== null) {
            this.model = Array.isArray(value) ? value : [value];
            this.ngDoCheck();
        }
        else {
            this.model = [];
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    };
    /**
     * @param {?} _c
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.validate = /**
     * @param {?} _c
     * @return {?}
     */
    function (_c) {
        var _this = this;
        if (this.model && this.model.length) {
            return {
                required: {
                    valid: false
                }
            };
        }
        if (this.options.filter(function (o) { return _this.model.indexOf(o.id) && !o.disabled; }).length === 0) {
            return {
                selection: {
                    valid: false
                }
            };
        }
        return null;
    };
    /**
     * @param {?} _fn
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.registerOnValidatorChange = /**
     * @param {?} _fn
     * @return {?}
     */
    function (_fn) {
        throw new Error('Method not implemented.');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.clearSearch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.maybeStopPropagation(event);
        this.filterControl.setValue('');
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.toggleDropdown = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (this.isVisible) {
            this._focusBack = true;
        }
        this.isVisible = !this.isVisible;
        this.isVisible ? this.dropdownOpened.emit() : this.dropdownClosed.emit();
        this.focusedItem = undefined;
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.closeDropdown = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        this.isVisible = true;
        this.toggleDropdown(e);
    };
    /**
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.isSelected = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.model && this.model.indexOf(option.id) > -1;
    };
    /**
     * @param {?} _event
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.setSelected = /**
     * @param {?} _event
     * @param {?} option
     * @return {?}
     */
    function (_event, option) {
        var _this = this;
        if (option.isLabel) {
            return;
        }
        if (option.disabled) {
            return;
        }
        if (this.disabledSelection) {
            return;
        }
        setTimeout(function () {
            _this.maybeStopPropagation(_event);
            _this.maybePreventDefault(_event);
            var /** @type {?} */ index = _this.model.indexOf(option.id);
            var /** @type {?} */ isAtSelectionLimit = _this.settings.selectionLimit > 0 &&
                _this.model.length >= _this.settings.selectionLimit;
            var /** @type {?} */ removeItem = function (idx, id) {
                _this.model.splice(idx, 1);
                _this.onRemoved.emit(id);
                if (_this.settings.isLazyLoad &&
                    _this.lazyLoadOptions.some(function (val) { return val.id === id; })) {
                    _this.lazyLoadOptions.splice(_this.lazyLoadOptions.indexOf(_this.lazyLoadOptions.find(function (val) { return val.id === id; })), 1);
                }
            };
            if (index > -1) {
                if (_this.settings.minSelectionLimit === undefined ||
                    _this.numSelected > _this.settings.minSelectionLimit) {
                    removeItem(index, option.id);
                }
                var /** @type {?} */ parentIndex = option.parentId && _this.model.indexOf(option.parentId);
                if (parentIndex > -1) {
                    removeItem(parentIndex, option.parentId);
                }
                else if (_this.parents.indexOf(option.id) > -1) {
                    _this.options
                        .filter(function (child) {
                        return _this.model.indexOf(child.id) > -1 &&
                            child.parentId === option.id;
                    })
                        .forEach(function (child) {
                        return removeItem(_this.model.indexOf(child.id), child.id);
                    });
                }
            }
            else if (isAtSelectionLimit && !_this.settings.autoUnselect) {
                _this.selectionLimitReached.emit(_this.model.length);
                return;
            }
            else {
                var /** @type {?} */ addItem_1 = function (id) {
                    _this.model.push(id);
                    _this.onAdded.emit(id);
                    if (_this.settings.isLazyLoad &&
                        !_this.lazyLoadOptions.some(function (val) { return val.id === id; })) {
                        _this.lazyLoadOptions.push(option);
                    }
                };
                addItem_1(option.id);
                if (!isAtSelectionLimit) {
                    if (option.parentId && !_this.settings.ignoreLabels) {
                        var /** @type {?} */ children = _this.options.filter(function (child) {
                            return child.id !== option.id && child.parentId === option.parentId;
                        });
                        if (children.every(function (child) { return _this.model.indexOf(child.id) > -1; })) {
                            addItem_1(option.parentId);
                        }
                    }
                    else if (_this.parents.indexOf(option.id) > -1) {
                        var /** @type {?} */ children = _this.options.filter(function (child) {
                            return _this.model.indexOf(child.id) < 0 && child.parentId === option.id;
                        });
                        children.forEach(function (child) { return addItem_1(child.id); });
                    }
                }
                else {
                    removeItem(0, _this.model[0]);
                }
            }
            if (_this.settings.closeOnSelect) {
                _this.toggleDropdown();
            }
            _this.model = _this.model.slice();
            _this.fireModelChange();
        }, 0);
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.updateNumSelected = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.numSelected =
            this.model.filter(function (id) { return _this.parents.indexOf(id) < 0; }).length || 0;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.updateTitle = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ numSelectedOptions = this.options.length;
        if (this.settings.ignoreLabels) {
            numSelectedOptions = this.options.filter(function (option) { return !option.isLabel; }).length;
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
            var /** @type {?} */ useOptions_1 = this.settings.isLazyLoad && this.lazyLoadOptions.length
                ? this.lazyLoadOptions
                : this.options;
            var /** @type {?} */ titleSelections = void 0;
            if (this.settings.maintainSelectionOrderInTitle) {
                var /** @type {?} */ optionIds_1 = useOptions_1.map(function (selectOption, idx) { return selectOption.id; });
                titleSelections = this.model
                    .map(function (selectedId) { return optionIds_1.indexOf(selectedId); })
                    .filter(function (optionIndex) { return optionIndex > -1; })
                    .map(function (optionIndex) { return useOptions_1[optionIndex]; });
            }
            else {
                titleSelections = useOptions_1.filter(function (option) { return _this.model.indexOf(option.id) > -1; });
            }
            this.title = titleSelections.map(function (option) { return option.name; }).join(', ');
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
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.searchFilterApplied = /**
     * @return {?}
     */
    function () {
        return (this.settings.enableSearch &&
            this.filterControl.value &&
            this.filterControl.value.length > 0);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.addChecks = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        var /** @type {?} */ checkedOptions = options
            .filter(function (option) {
            if (!option.disabled &&
                (_this.model.indexOf(option.id) === -1 &&
                    !(_this.settings.ignoreLabels && option.isLabel))) {
                _this.onAdded.emit(option.id);
                return true;
            }
            return false;
        })
            .map(function (option) { return option.id; });
        this.model = this.model.concat(checkedOptions);
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.checkAll = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.uncheckAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.disabledSelection) {
            var /** @type {?} */ checkedOptions = this.model;
            var /** @type {?} */ unCheckedOptions_1 = !this.searchFilterApplied()
                ? this.model
                : this.filteredOptions.map(function (option) { return option.id; });
            // set unchecked options only to the ones that were checked
            // set unchecked options only to the ones that were checked
            unCheckedOptions_1 = checkedOptions.filter(function (item) { return unCheckedOptions_1.indexOf(item) > -1; });
            this.model = this.model.filter(function (id) {
                if ((unCheckedOptions_1.indexOf(id) < 0 &&
                    _this.settings.minSelectionLimit === undefined) ||
                    unCheckedOptions_1.indexOf(id) < _this.settings.minSelectionLimit) {
                    return true;
                }
                else {
                    _this.onRemoved.emit(id);
                    return false;
                }
            });
            if (this.settings.isLazyLoad && this.settings.selectAddedValues) {
                if (this.searchFilterApplied()) {
                    if (this.checkAllSearchRegister.has(this.filterControl.value)) {
                        this.checkAllSearchRegister.delete(this.filterControl.value);
                        this.checkAllSearchRegister.forEach(function (searchTerm) {
                            var /** @type {?} */ filterOptions = this.applyFilters(this.options.filter(function (option) { return unCheckedOptions_1.indexOf(option.id) > -1; }), searchTerm);
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
    };
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.preventCheckboxCheck = /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    function (event, option) {
        if (option.disabled ||
            (this.settings.selectionLimit &&
                !this.settings.autoUnselect &&
                this.model.length >= this.settings.selectionLimit &&
                this.model.indexOf(option.id) === -1 &&
                this.maybePreventDefault(event))) {
            this.maybePreventDefault(event);
        }
    };
    /**
     * @param {?=} option
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.isCheckboxDisabled = /**
     * @param {?=} option
     * @return {?}
     */
    function (option) {
        return this.disabledSelection || option && option.disabled;
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.checkScrollPosition = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        var /** @type {?} */ scrollTop = ev.target.scrollTop;
        var /** @type {?} */ scrollHeight = ev.target.scrollHeight;
        var /** @type {?} */ scrollElementHeight = ev.target.clientHeight;
        var /** @type {?} */ roundingPixel = 1;
        var /** @type {?} */ gutterPixel = 1;
        if (scrollTop >=
            scrollHeight -
                (1 + this.settings.loadViewDistance) * scrollElementHeight -
                roundingPixel -
                gutterPixel) {
            this.load();
        }
    };
    /**
     * @param {?} ev
     * @param {?} element
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.checkScrollPropagation = /**
     * @param {?} ev
     * @param {?} element
     * @return {?}
     */
    function (ev, element) {
        var /** @type {?} */ scrollTop = element.scrollTop;
        var /** @type {?} */ scrollHeight = element.scrollHeight;
        var /** @type {?} */ scrollElementHeight = element.clientHeight;
        if ((ev.deltaY > 0 && scrollTop + scrollElementHeight >= scrollHeight) ||
            (ev.deltaY < 0 && scrollTop <= 0)) {
            ev = ev || window.event;
            this.maybePreventDefault(ev);
            ev.returnValue = false;
        }
    };
    /**
     * @param {?} idx
     * @param {?} selectOption
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.trackById = /**
     * @param {?} idx
     * @param {?} selectOption
     * @return {?}
     */
    function (idx, selectOption) {
        return selectOption.id;
    };
    /**
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.load = /**
     * @return {?}
     */
    function () {
        this.onLazyLoad.emit({
            length: this.options.length,
            filter: this.filterControl.value,
            checkAllSearches: this.checkAllSearchRegister,
            checkAllStatus: this.checkAllStatus,
        });
    };
    /**
     * @param {?} dir
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.focusItem = /**
     * @param {?} dir
     * @param {?=} e
     * @return {?}
     */
    function (dir, e) {
        if (!this.isVisible) {
            return;
        }
        this.maybePreventDefault(e);
        var /** @type {?} */ idx = this.filteredOptions.indexOf(this.focusedItem);
        if (idx === -1) {
            this.focusedItem = this.filteredOptions[0];
            return;
        }
        var /** @type {?} */ nextIdx = idx + dir;
        var /** @type {?} */ newIdx = nextIdx < 0
            ? this.filteredOptions.length - 1
            : nextIdx % this.filteredOptions.length;
        this.focusedItem = this.filteredOptions[newIdx];
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.maybePreventDefault = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
    };
    /**
     * @param {?=} e
     * @return {?}
     */
    MultiselectDropdownComponent.prototype.maybeStopPropagation = /**
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    };
    /**
     * @param {?} str
     * @return {?}
     */
    MultiselectDropdownComponent.prototype._escapeRegExp = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        var /** @type {?} */ regExpStr = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return new RegExp(regExpStr, 'i');
    };
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
    MultiselectDropdownComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FormBuilder, },
        { type: MultiSelectSearchFilter, },
        { type: IterableDiffers, },
        { type: ChangeDetectorRef, },
    ]; };
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
    return MultiselectDropdownComponent;
}());
export { MultiselectDropdownComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUVWLEtBQUssRUFDTCxlQUFlLEVBSWYsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxXQUFXLEVBRVgsaUJBQWlCLEdBRWxCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7O0FBVS9ELHFCQUFNLDBCQUEwQixHQUFRO0lBQ3RDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsNEJBQTRCLEVBQTVCLENBQTRCLENBQUM7SUFDM0QsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztJQTZIQSxzQ0FDVSxTQUNBLElBQ0EsY0FDUixPQUF3QixFQUNoQjtRQUpBLFlBQU8sR0FBUCxPQUFPO1FBQ1AsT0FBRSxHQUFGLEVBQUU7UUFDRixpQkFBWSxHQUFaLFlBQVk7UUFFWixVQUFLLEdBQUwsS0FBSzs2QkFsSGMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3dCQUtuQixLQUFLO2lDQUNJLEtBQUs7OEJBQ1EsSUFBSSxDQUFDLGFBQWE7cUNBRW5DLElBQUksWUFBWSxFQUFFOzhCQUN6QixJQUFJLFlBQVksRUFBRTs4QkFDbEIsSUFB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LENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O2dCQS9wQnJDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQywwdExBQXdDO29CQUV4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx1QkFBdUIsQ0FBQztvQkFDaEUsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkE3Q0MsVUFBVTtnQkFlVixXQUFXO2dCQVFKLHVCQUF1QjtnQkFsQjlCLGVBQWU7Z0JBUmYsaUJBQWlCOzs7NEJBMERoQixLQUFLOzZCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3NDQUNMLEtBQUs7bUNBQ0wsS0FBSzswQ0FFTCxNQUFNO21DQUNOLE1BQU07bUNBQ04sTUFBTTs0QkFDTixNQUFNOzhCQUNOLE1BQU07K0JBQ04sTUFBTTs2QkFDTixNQUFNOzt1Q0ExRVQ7O1NBb0RhLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIEl0ZXJhYmxlRGlmZmVycyxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgRm9ybUJ1aWxkZXIsXHJcbiAgRm9ybUNvbnRyb2wsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgVmFsaWRhdG9yLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlciB9IGZyb20gJy4vc2VhcmNoLWZpbHRlci5waXBlJztcclxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uLCBJTXVsdGlTZWxlY3RTZXR0aW5ncywgSU11bHRpU2VsZWN0VGV4dHMsIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKlxyXG4gKiBBbmd1bGFyIDIgRHJvcGRvd24gTXVsdGlzZWxlY3QgZm9yIEJvb3RzdHJhcFxyXG4gKlxyXG4gKiBTaW1vbiBMaW5kaFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc29mdHNpbW9uL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdFxyXG4gKi9cclxuXHJcbmNvbnN0IE1VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NzLW11bHRpc2VsZWN0LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Ryb3Bkb3duLmNvbXBvbmVudC5jc3MnXSxcclxuICBwcm92aWRlcnM6IFtNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUiwgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXJdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIERvQ2hlY2ssXHJcbiAgT25EZXN0cm95LFxyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIFZhbGlkYXRvciB7XHJcbiAgZmlsdGVyQ29udHJvbDogRm9ybUNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woJycpO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxJTXVsdGlTZWxlY3RPcHRpb24+O1xyXG4gIEBJbnB1dCgpIHNldHRpbmdzOiBJTXVsdGlTZWxlY3RTZXR0aW5ncztcclxuICBASW5wdXQoKSB0ZXh0czogSU11bHRpU2VsZWN0VGV4dHM7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZFNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCA9IHRoaXMuX2VzY2FwZVJlZ0V4cDtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZHJvcGRvd25DbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duT3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkFkZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvblJlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uTGF6eUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uRmlsdGVyOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzO1xyXG5cclxuICBnZXQgZm9jdXNCYWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZm9jdXNCYWNrICYmIHRoaXMuX2ZvY3VzQmFjaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGlja2VkT3V0c2lkZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuc2V0dGluZ3MuY2xvc2VPbkNsaWNrT3V0c2lkZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgZmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIGxhenlMb2FkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICByZW5kZXJGaWx0ZXJlZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgbW9kZWw6IGFueVtdID0gW107XHJcbiAgcHJldk1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHBhcmVudHM6IGFueVtdO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGlmZmVyOiBhbnk7XHJcbiAgbnVtU2VsZWN0ZWQ6IG51bWJlciA9IDA7XHJcbiAgc2V0IGlzVmlzaWJsZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzVmlzaWJsZSA9IHZhbDtcclxuICAgIHRoaXMuX3dvcmtlckRvY0NsaWNrZWQgPSB2YWwgPyBmYWxzZSA6IHRoaXMuX3dvcmtlckRvY0NsaWNrZWQ7XHJcbiAgfVxyXG4gIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xyXG4gIH1cclxuICByZW5kZXJJdGVtcyA9IHRydWU7XHJcbiAgY2hlY2tBbGxTZWFyY2hSZWdpc3RlciA9IG5ldyBTZXQoKTtcclxuICBjaGVja0FsbFN0YXR1cyA9IGZhbHNlO1xyXG4gIGxvYWRlZFZhbHVlSWRzID0gW107XHJcbiAgX2ZvY3VzQmFjayA9IGZhbHNlO1xyXG4gIGZvY3VzZWRJdGVtOiBJTXVsdGlTZWxlY3RPcHRpb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gIGRlZmF1bHRTZXR0aW5nczogSU11bHRpU2VsZWN0U2V0dGluZ3MgPSB7XHJcbiAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgcHVsbFJpZ2h0OiBmYWxzZSxcclxuICAgIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgICBzZWFyY2hSZW5kZXJMaW1pdDogMCxcclxuICAgIHNlYXJjaFJlbmRlckFmdGVyOiAxLFxyXG4gICAgc2VhcmNoTWF4TGltaXQ6IDAsXHJcbiAgICBzZWFyY2hNYXhSZW5kZXJlZEl0ZW1zOiAwLFxyXG4gICAgY2hlY2tlZFN0eWxlOiAnY2hlY2tib3hlcycsXHJcbiAgICBidXR0b25DbGFzc2VzOiAnYnRuIGJ0bi1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb250YWluZXJDbGFzc2VzOiAnZHJvcGRvd24taW5saW5lJyxcclxuICAgIHNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgbWluU2VsZWN0aW9uTGltaXQ6IDAsXHJcbiAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgIGF1dG9VbnNlbGVjdDogZmFsc2UsXHJcbiAgICBzaG93Q2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgc2hvd1VuY2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgZml4ZWRUaXRsZTogZmFsc2UsXHJcbiAgICBkeW5hbWljVGl0bGVNYXhJdGVtczogMyxcclxuICAgIG1heEhlaWdodDogJzMwMHB4JyxcclxuICAgIGlzTGF6eUxvYWQ6IGZhbHNlLFxyXG4gICAgc3RvcFNjcm9sbFByb3BhZ2F0aW9uOiBmYWxzZSxcclxuICAgIGxvYWRWaWV3RGlzdGFuY2U6IDEsXHJcbiAgICBzZWxlY3RBZGRlZFZhbHVlczogZmFsc2UsXHJcbiAgICBpZ25vcmVMYWJlbHM6IGZhbHNlLFxyXG4gICAgbWFpbnRhaW5TZWxlY3Rpb25PcmRlckluVGl0bGU6IGZhbHNlLFxyXG4gICAgZm9jdXNCYWNrOiB0cnVlXHJcbiAgfTtcclxuICBkZWZhdWx0VGV4dHM6IElNdWx0aVNlbGVjdFRleHRzID0ge1xyXG4gICAgY2hlY2tBbGw6ICdDaGVjayBhbGwnLFxyXG4gICAgdW5jaGVja0FsbDogJ1VuY2hlY2sgYWxsJyxcclxuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcclxuICAgIGNoZWNrZWRQbHVyYWw6ICdjaGVja2VkJyxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgIHNlYXJjaEVtcHR5UmVzdWx0OiAnTm90aGluZyBmb3VuZC4uLicsXHJcbiAgICBzZWFyY2hOb1JlbmRlclRleHQ6ICdUeXBlIGluIHNlYXJjaCBib3ggdG8gc2VlIHJlc3VsdHMuLi4nLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnU2VsZWN0JyxcclxuICAgIGFsbFNlbGVjdGVkOiAnQWxsIHNlbGVjdGVkJyxcclxuICB9O1xyXG5cclxuICBnZXQgc2VhcmNoTGltaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJMaW1pdDtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hSZW5kZXJBZnRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0QXBwbGllZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpbWl0ID4gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gdGhpcy5zZWFyY2hMaW1pdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3dvcmtlckRvY0NsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyOiBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xyXG4gICAgdGhpcy50ZXh0cyA9IHRoaXMuZGVmYXVsdFRleHRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICBpZiAoIW9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdwb2ludGVyJztcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlU2VsZWN0aW9uRGlzYWJsZWQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IGN1cnNvcjogJ2RlZmF1bHQnIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCkge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydvcHRpb25zJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhcmVudHMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAnbnVtYmVyJylcclxuICAgICAgICAubWFwKG9wdGlvbiA9PiBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMgPSB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChcclxuICAgICAgICAgIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUubWFwKHZhbHVlID0+IHZhbHVlLmlkKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBhZGRlZFZhbHVlcyA9IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgdmFsdWUgPT4gdGhpcy5sb2FkZWRWYWx1ZUlkcy5pbmRleE9mKHZhbHVlLmlkKSA9PT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KGFkZGVkVmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENoZWNrcyhhZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuc2l6ZSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKHNlYXJjaFZhbHVlID0+XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKHRoaXMuYXBwbHlGaWx0ZXJzKGFkZGVkVmFsdWVzLCBzZWFyY2hWYWx1ZSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGV4dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3MgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndGV4dHMnXSkge1xyXG4gICAgICB0aGlzLnRleHRzID0geyAuLi50aGlzLmRlZmF1bHRUZXh0cywgLi4udGhpcy50ZXh0cyB9O1xyXG4gICAgICBpZiAoIWNoYW5nZXNbJ3RleHRzJ10uaXNGaXJzdENoYW5nZSgpKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zID1cclxuICAgICAgIXRoaXMuc2VhcmNoTGltaXRBcHBsaWVkIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnMoXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkID8gJycgOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlckZpbHRlcmVkT3B0aW9ucyA9IHRoaXMucmVuZGVySXRlbXMgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucyA6IFtdO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhvcHRpb25zLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmlsdGVyLnRyYW5zZm9ybShcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4TGltaXQsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4UmVuZGVyZWRJdGVtcyxcclxuICAgICAgdGhpcy5zZWFyY2hGdW5jdGlvblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZpcmVNb2RlbENoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsICE9IHRoaXMucHJldk1vZGVsKSB7XHJcbiAgICAgIHRoaXMucHJldk1vZGVsID0gdGhpcy5tb2RlbDtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5tb2RlbCk7XHJcbiAgICBpZiAoY2hhbmdlcykge1xyXG4gICAgICB0aGlzLnVwZGF0ZU51bVNlbGVjdGVkKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlVGl0bGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKF9jOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHtcclxuICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpbHRlcihvID0+IHRoaXMubW9kZWwuaW5kZXhPZihvLmlkKSAmJiAhby5kaXNhYmxlZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0aW9uOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKF9mbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWFyY2goZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLm1heWJlU3RvcFByb3BhZ2F0aW9uKGV2ZW50KTtcclxuICAgIHRoaXMuZmlsdGVyQ29udHJvbC5zZXRWYWx1ZSgnJyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVEcm9wZG93bihlPzogRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICB0aGlzLl9mb2N1c0JhY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPyB0aGlzLmRyb3Bkb3duT3BlbmVkLmVtaXQoKSA6IHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKGUpO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkKF9ldmVudDogRXZlbnQsIG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICBpZiAob3B0aW9uLmlzTGFiZWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHRoaXMubWF5YmVTdG9wUHJvcGFnYXRpb24oX2V2ZW50KTtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KF9ldmVudCk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCk7XHJcbiAgICAgIGNvbnN0IGlzQXRTZWxlY3Rpb25MaW1pdCA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA+IDAgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0O1xyXG4gICAgICBjb25zdCByZW1vdmVJdGVtID0gKGlkeCwgaWQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNwbGljZShcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuaW5kZXhPZihcclxuICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5maW5kKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICB0aGlzLm51bVNlbGVjdGVkID4gdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShpbmRleCwgb3B0aW9uLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPVxyXG4gICAgICAgICAgb3B0aW9uLnBhcmVudElkICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKHBhcmVudEluZGV4LCBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xICYmXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZvckVhY2goY2hpbGQgPT5cclxuICAgICAgICAgICAgICByZW1vdmVJdGVtKHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCksIGNoaWxkLmlkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0F0U2VsZWN0aW9uTGltaXQgJiYgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MaW1pdFJlYWNoZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFkZEl0ZW0gPSAoaWQpOiB2b2lkID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZWwucHVzaChpZCk7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkSXRlbShvcHRpb24uaWQpO1xyXG4gICAgICAgIGlmICghaXNBdFNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnBhcmVudElkICYmICF0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIGNoaWxkLmlkICE9PSBvcHRpb24uaWQgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5wYXJlbnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xKSkge1xyXG4gICAgICAgICAgICAgIGFkZEl0ZW0ob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpIDwgMCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gYWRkSXRlbShjaGlsZC5pZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKDAsIHRoaXMubW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLnNsaWNlKCk7XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcblxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5udW1TZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMubW9kZWwuZmlsdGVyKGlkID0+IHRoaXMucGFyZW50cy5pbmRleE9mKGlkKSA8IDApLmxlbmd0aCB8fCAwO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVGl0bGUoKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbi5pc0xhYmVsXHJcbiAgICAgICkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDAgfHwgdGhpcy5zZXR0aW5ncy5maXhlZFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzcGxheUFsbFNlbGVjdGVkVGV4dCAmJlxyXG4gICAgICB0aGlzLm1vZGVsLmxlbmd0aCA9PT0gbnVtU2VsZWN0ZWRPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmFsbFNlbGVjdGVkIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zICYmXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgPj0gdGhpcy5udW1TZWxlY3RlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVzZU9wdGlvbnMgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLmxhenlMb2FkT3B0aW9ucy5sZW5ndGhcclxuICAgICAgICAgID8gdGhpcy5sYXp5TG9hZE9wdGlvbnNcclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgbGV0IHRpdGxlU2VsZWN0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gdXNlT3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uLCBpZHg6IG51bWJlcikgPT4gc2VsZWN0T3B0aW9uLmlkKTtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB0aGlzLm1vZGVsXHJcbiAgICAgICAgICAubWFwKChzZWxlY3RlZElkKSA9PiBvcHRpb25JZHMuaW5kZXhPZihzZWxlY3RlZElkKSlcclxuICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbkluZGV4KSA9PiBvcHRpb25JbmRleCA+IC0xKVxyXG4gICAgICAgICAgLm1hcCgob3B0aW9uSW5kZXgpID0+IHVzZU9wdGlvbnNbb3B0aW9uSW5kZXhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB1c2VPcHRpb25zLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGVTZWxlY3Rpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9XHJcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZCArXHJcbiAgICAgICAgJyAnICtcclxuICAgICAgICAodGhpcy5udW1TZWxlY3RlZCA9PT0gMVxyXG4gICAgICAgICAgPyB0aGlzLnRleHRzLmNoZWNrZWRcclxuICAgICAgICAgIDogdGhpcy50ZXh0cy5jaGVja2VkUGx1cmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hGaWx0ZXJBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2hlY2tzKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgICAgICEodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMgJiYgb3B0aW9uLmlzTGFiZWwpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChvcHRpb24uaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuY29uY2F0KGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hlY2tzKFxyXG4gICAgICAgICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSA/IHRoaXMub3B0aW9ucyA6IHRoaXMuZmlsdGVyZWRPcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSAmJiAhdGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmFkZCh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMubW9kZWw7XHJcbiAgICAgIGxldCB1bkNoZWNrZWRPcHRpb25zID0gIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpXHJcbiAgICAgICAgPyB0aGlzLm1vZGVsXHJcbiAgICAgICAgOiB0aGlzLmZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG4gICAgICAvLyBzZXQgdW5jaGVja2VkIG9wdGlvbnMgb25seSB0byB0aGUgb25lcyB0aGF0IHdlcmUgY2hlY2tlZFxyXG4gICAgICB1bkNoZWNrZWRPcHRpb25zID0gY2hlY2tlZE9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGl0ZW0pID4gLTEpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIoKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuaGFzKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmRlbGV0ZSh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChmdW5jdGlvbiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyh0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSwgc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDaGVja3MoZmlsdGVyT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZlbnRDaGVja2JveENoZWNrKGV2ZW50OiBFdmVudCwgb3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgb3B0aW9uLmRpc2FibGVkIHx8XHJcbiAgICAgIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NoZWNrYm94RGlzYWJsZWQob3B0aW9uPzogSU11bHRpU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFNlbGVjdGlvbiB8fCBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQb3NpdGlvbihldikge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZXYudGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZXYudGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHJvdW5kaW5nUGl4ZWwgPSAxO1xyXG4gICAgY29uc3QgZ3V0dGVyUGl4ZWwgPSAxO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgc2Nyb2xsVG9wID49XHJcbiAgICAgIHNjcm9sbEhlaWdodCAtXHJcbiAgICAgICgxICsgdGhpcy5zZXR0aW5ncy5sb2FkVmlld0Rpc3RhbmNlKSAqIHNjcm9sbEVsZW1lbnRIZWlnaHQgLVxyXG4gICAgICByb3VuZGluZ1BpeGVsIC1cclxuICAgICAgZ3V0dGVyUGl4ZWxcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUHJvcGFnYXRpb24oZXYsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoZXYuZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgKyBzY3JvbGxFbGVtZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCkgfHxcclxuICAgICAgKGV2LmRlbHRhWSA8IDAgJiYgc2Nyb2xsVG9wIDw9IDApXHJcbiAgICApIHtcclxuICAgICAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldik7XHJcbiAgICAgIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaWR4OiBudW1iZXIsIHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcclxuICAgICAgbGVuZ3RoOiB0aGlzLm9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSxcclxuICAgICAgY2hlY2tBbGxTZWFyY2hlczogdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLFxyXG4gICAgICBjaGVja0FsbFN0YXR1czogdGhpcy5jaGVja0FsbFN0YXR1cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNJdGVtKGRpcjogbnVtYmVyLCBlPzogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1swXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRJZHggPSBpZHggKyBkaXI7XHJcbiAgICBjb25zdCBuZXdJZHggPVxyXG4gICAgICBuZXh0SWR4IDwgMFxyXG4gICAgICAgID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogbmV4dElkeCAlIHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbbmV3SWR4XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVQcmV2ZW50RGVmYXVsdChlPzogeyBwcmV2ZW50RGVmYXVsdD86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVN0b3BQcm9wYWdhdGlvbihlPzogeyBzdG9wUHJvcGFnYXRpb24/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBwcml2YXRlIF9lc2NhcGVSZWdFeHAoc3RyOiBzdHJpbmcpOiBSZWdFeHAge1xyXG4gICAgY29uc3QgcmVnRXhwU3RyID0gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ0V4cFN0ciwgJ2knKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==