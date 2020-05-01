(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-2-dropdown-multiselect', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['angular-2-dropdown-multiselect'] = {}),global.ng.core,global.ng.forms,global.rxjs,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,forms,rxjs,operators,common) { 'use strict';

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
    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MultiSelectSearchFilter = (function () {
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
                if (str === void 0) {
                    str = '';
                }
                if (limit === void 0) {
                    limit = 0;
                }
                if (renderLimit === void 0) {
                    renderLimit = 0;
                }
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
                    return __spread(prevOptions, options.slice(prevInclusiveOrIdx));
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
            { type: core.Pipe, args: [{
                        name: 'searchFilter'
                    },] }
        ];
        return MultiSelectSearchFilter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AutofocusDirective = (function () {
        function AutofocusDirective(elemRef) {
            this.elemRef = elemRef;
        }
        Object.defineProperty(AutofocusDirective.prototype, "element", {
            get: /**
             * @return {?}
             */ function () {
                return this.elemRef.nativeElement;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AutofocusDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.focus();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        AutofocusDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                var /** @type {?} */ ssAutofocusChange = changes["ssAutofocus"];
                if (ssAutofocusChange && !ssAutofocusChange.isFirstChange()) {
                    this.focus();
                }
            };
        /**
         * @return {?}
         */
        AutofocusDirective.prototype.focus = /**
         * @return {?}
         */
            function () {
                if (this.ssAutofocus) {
                    return;
                }
                this.element.focus && this.element.focus();
            };
        AutofocusDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ssAutofocus]'
                    },] }
        ];
        /** @nocollapse */
        AutofocusDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, decorators: [{ type: core.Host },] },
            ];
        };
        AutofocusDirective.propDecorators = {
            "ssAutofocus": [{ type: core.Input },],
        };
        return AutofocusDirective;
    }());

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
    var /** @type {?} */ MULTISELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiselectDropdownComponent; }),
        multi: true,
    };
    var MultiselectDropdownComponent = (function () {
        function MultiselectDropdownComponent(element, fb, searchFilter, differs, cdRef) {
            this.element = element;
            this.fb = fb;
            this.searchFilter = searchFilter;
            this.cdRef = cdRef;
            this.filterControl = this.fb.control('');
            this.disabled = false;
            this.disabledSelection = false;
            this.searchFunction = this._escapeRegExp;
            this.selectionLimitReached = new core.EventEmitter();
            this.dropdownClosed = new core.EventEmitter();
            this.dropdownOpened = new core.EventEmitter();
            this.onAdded = new core.EventEmitter();
            this.onRemoved = new core.EventEmitter();
            this.onLazyLoad = new core.EventEmitter();
            this.onFilter = this.filterControl.valueChanges;
            this.destroyed$ = new rxjs.Subject();
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
             */ function () {
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
             */ function () {
                return this._isVisible;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */ function (val) {
                this._isVisible = val;
                this._workerDocClicked = val ? false : this._workerDocClicked;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimit", {
            get: /**
             * @return {?}
             */ function () {
                return this.settings.searchRenderLimit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiselectDropdownComponent.prototype, "searchRenderAfter", {
            get: /**
             * @return {?}
             */ function () {
                return this.settings.searchRenderAfter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiselectDropdownComponent.prototype, "searchLimitApplied", {
            get: /**
             * @return {?}
             */ function () {
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
                if (!option.isLabel) ;
                if (option.disabled) ;
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
                this.filterControl.valueChanges.pipe(operators.takeUntil(this.destroyed$)).subscribe(function () {
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
                    this.settings = __assign({}, this.defaultSettings, this.settings);
                }
                if (changes['texts']) {
                    this.texts = __assign({}, this.defaultTexts, this.texts);
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
            { type: core.Component, args: [{
                        selector: 'ss-multiselect-dropdown',
                        template: "<div class=\"dropdown\" [ngClass]=\"settings.containerClasses\" [class.open]=\"isVisible\" (offClick)=\"clickedOutside()\">\n  <button type=\"button\" class=\"dropdown-toggle\" [ngClass]=\"settings.buttonClasses\" (click)=\"toggleDropdown($event)\" [disabled]=\"disabled\"\n    [ssAutofocus]=\"!focusBack\">\n    {{ title }}\n    <span class=\"caret\"></span>\n  </button>\n  <div #scroller *ngIf=\"isVisible\" class=\"dropdown-menu\" [ngClass]=\"{'chunkydropdown-menu': settings.checkedStyle == 'visual' }\"\n    (scroll)=\"settings.isLazyLoad ? checkScrollPosition($event) : null\" (wheel)=\"settings.stopScrollPropagation ? checkScrollPropagation($event, scroller) : null\"\n    [class.pull-right]=\"settings.pullRight\" [class.dropdown-menu-right]=\"settings.pullRight\" [style.max-height]=\"settings.maxHeight\"\n    style=\"display: block; height: auto; overflow-y: auto;\" (keydown.tab)=\"focusItem(1, $event)\" (keydown.shift.tab)=\"focusItem(-1, $event)\">\n    <div class=\"input-group search-container\" *ngIf=\"settings.enableSearch\">\n      <div class=\"input-group-prepend\">\n        <span class=\"input-group-text\" id=\"basic-addon1\">\n          <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n        </span>\n      </div>\n      <input type=\"text\" class=\"form-control\" ssAutofocus [formControl]=\"filterControl\" [placeholder]=\"texts.searchPlaceholder\"\n        class=\"form-control\">\n      <div class=\"input-group-append\" *ngIf=\"filterControl.value.length>0\">\n        <button class=\"btn btn-default btn-secondary\" type=\"button\" (click)=\"clearSearch($event)\">\n          <i class=\"fa fa-times\"></i>\n        </button>\n      </div>\n    </div>\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-check\" *ngIf=\"settings.showCheckAll && !disabledSelection\"\n      (click)=\"checkAll()\">\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-ok': settings.checkedStyle !== 'fontawesome','fa fa-check': settings.checkedStyle === 'fontawesome'}\"></span></span>\n      {{ texts.checkAll }}\n    </a>\n    <a role=\"menuitem\" href=\"javascript:;\" tabindex=\"-1\" class=\"dropdown-item check-control check-control-uncheck\" *ngIf=\"settings.showUncheckAll && !disabledSelection\"\n      (click)=\"uncheckAll()\">\n      <span style=\"width: 16px;\"><span [ngClass]=\"{'glyphicon glyphicon-remove': settings.checkedStyle !== 'fontawesome','fa fa-times': settings.checkedStyle === 'fontawesome'}\"></span></span>\n      {{ texts.uncheckAll }}\n    </a>\n    <a *ngIf=\"settings.showCheckAll || settings.showUncheckAll\" href=\"javascript:;\" class=\"dropdown-divider divider\"></a>\n    <a *ngIf=\"!renderItems\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchNoRenderText }}</a>\n    <a *ngIf=\"renderItems && !renderFilteredOptions.length\" href=\"javascript:;\" class=\"dropdown-item empty\">{{ texts.searchEmptyResult }}</a>\n    <a class=\"dropdown-item\" href=\"javascript:;\" *ngFor=\"let option of renderFilteredOptions; trackBy: trackById\" [class.active]=\"isSelected(option)\"\n      [ngStyle]=\"getItemStyle(option)\" [ngClass]=\"option.classes\" [class.dropdown-header]=\"option.isLabel\" [ssAutofocus]=\"option !== focusedItem\"\n      tabindex=\"-1\" (click)=\"setSelected($event, option)\" (keydown.space)=\"setSelected($event, option)\" (keydown.enter)=\"setSelected($event, option)\">\n      <span *ngIf=\"!option.isLabel; else label\" role=\"menuitem\" tabindex=\"-1\" [style.padding-left]=\"this.parents.length>0&&this.parents.indexOf(option.id)<0&&'30px'\"\n        [ngStyle]=\"getItemStyleSelectionDisabled()\">\n        <ng-container [ngSwitch]=\"settings.checkedStyle\">\n          <input *ngSwitchCase=\"'checkboxes'\" type=\"checkbox\" [checked]=\"isSelected(option)\" (click)=\"preventCheckboxCheck($event, option)\"\n            [disabled]=\"isCheckboxDisabled(option)\" [ngStyle]=\"getItemStyleSelectionDisabled()\" />\n          <span *ngSwitchCase=\"'glyphicon'\" style=\"width: 16px;\" class=\"glyphicon\" [class.glyphicon-ok]=\"isSelected(option)\" [class.glyphicon-lock]=\"isCheckboxDisabled(option)\"></span>\n          <span *ngSwitchCase=\"'fontawesome'\" style=\"width: 16px;display: inline-block;\">\n            <span *ngIf=\"isSelected(option)\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></span>\n            <span *ngIf=\"isCheckboxDisabled(option)\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></span>\n          </span>\n          <span *ngSwitchCase=\"'visual'\" style=\"display:block;float:left; border-radius: 0.2em; border: 0.1em solid rgba(44, 44, 44, 0.63);background:rgba(0, 0, 0, 0.1);width: 5.5em;\">\n            <div class=\"slider\" [ngClass]=\"{'slideron': isSelected(option)}\">\n              <img *ngIf=\"option.image != null\" [src]=\"option.image\" style=\"height: 100%; width: 100%; object-fit: contain\" />\n              <div *ngIf=\"option.image == null\" style=\"height: 100%; width: 100%;text-align: center; display: table; background-color:rgba(0, 0, 0, 0.74)\">\n                <div class=\"content_wrapper\">\n                  <span style=\"font-size:3em;color:white\" class=\"glyphicon glyphicon-eye-close\"></span>\n                </div>\n              </div>\n            </div>\n          </span>\n        </ng-container>\n        <span [ngClass]=\"{'chunkyrow': settings.checkedStyle == 'visual' }\" [class.disabled]=\"isCheckboxDisabled(option)\" [ngClass]=\"settings.itemClasses\"\n          [style.font-weight]=\"this.parents.indexOf(option.id)>=0?'bold':'normal'\">\n          {{ option.name }}\n        </span>\n      </span>\n      <ng-template #label>\n        <span [class.disabled]=\"isCheckboxDisabled(option)\">{{ option.name }}</span>\n      </ng-template>\n    </a>\n  </div>\n</div>\n",
                        providers: [MULTISELECT_VALUE_ACCESSOR, MultiSelectSearchFilter],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["a{outline:0!important}.dropdown-inline{display:inline-block}.dropdown-toggle .caret{margin-left:4px;white-space:nowrap;display:inline-block}.chunkydropdown-menu{min-width:20em}.chunkyrow{line-height:2;margin-left:1em;font-size:2em}.slider{width:3.8em;height:3.8em;display:block;transition:all 125ms linear;margin-left:.125em;margin-top:auto}.slideron{margin-left:1.35em}.content_wrapper{display:table-cell;vertical-align:middle}.search-container{padding:0 5px 5px}"]
                    }] }
        ];
        /** @nocollapse */
        MultiselectDropdownComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
                { type: forms.FormBuilder, },
                { type: MultiSelectSearchFilter, },
                { type: core.IterableDiffers, },
                { type: core.ChangeDetectorRef, },
            ];
        };
        MultiselectDropdownComponent.propDecorators = {
            "options": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "texts": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "disabledSelection": [{ type: core.Input },],
            "searchFunction": [{ type: core.Input },],
            "selectionLimitReached": [{ type: core.Output },],
            "dropdownClosed": [{ type: core.Output },],
            "dropdownOpened": [{ type: core.Output },],
            "onAdded": [{ type: core.Output },],
            "onRemoved": [{ type: core.Output },],
            "onLazyLoad": [{ type: core.Output },],
            "onFilter": [{ type: core.Output },],
        };
        return MultiselectDropdownComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var OffClickDirective = (function () {
        function OffClickDirective() {
            this.onOffClick = new core.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        OffClickDirective.prototype.onClick = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this._clickEvent = event;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        OffClickDirective.prototype.onTouch = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this._touchEvent = event;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        OffClickDirective.prototype.onDocumentClick = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event !== this._clickEvent) {
                    this.onOffClick.emit(event);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        OffClickDirective.prototype.onDocumentTouch = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event !== this._touchEvent) {
                    this.onOffClick.emit(event);
                }
            };
        OffClickDirective.decorators = [
            { type: core.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: '[offClick]',
                    },] }
        ];
        /** @nocollapse */
        OffClickDirective.propDecorators = {
            "onOffClick": [{ type: core.Output, args: ['offClick',] },],
            "onClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
            "onTouch": [{ type: core.HostListener, args: ['touchstart', ['$event'],] },],
            "onDocumentClick": [{ type: core.HostListener, args: ['document:click', ['$event'],] },],
            "onDocumentTouch": [{ type: core.HostListener, args: ['document:touchstart', ['$event'],] },],
        };
        return OffClickDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MultiselectDropdownModule = (function () {
        function MultiselectDropdownModule() {
        }
        MultiselectDropdownModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.ReactiveFormsModule],
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
        return MultiselectDropdownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.MultiSelectSearchFilter = MultiSelectSearchFilter;
    exports.MultiselectDropdownModule = MultiselectDropdownModule;
    exports.MultiselectDropdownComponent = MultiselectDropdownComponent;
    exports.ɵa = AutofocusDirective;
    exports.ɵb = OffClickDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9zZWFyY2gtZmlsdGVyLnBpcGUudHMiLCJuZzovL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdC9kcm9wZG93bi9hdXRvZm9jdXMuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIiwibmc6Ly9hbmd1bGFyLTItZHJvcGRvd24tbXVsdGlzZWxlY3QvZHJvcGRvd24vb2ZmLWNsaWNrLmRpcmVjdGl2ZS50cyIsIm5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0L2Ryb3Bkb3duL2Ryb3Bkb3duLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBJTXVsdGlTZWxlY3RPcHRpb24gfSBmcm9tICcuL3R5cGVzJztcblxuaW50ZXJmYWNlIFN0cmluZ0hhc2hNYXA8VD4ge1xuICBbazogc3RyaW5nXTogVDtcbn1cblxuQFBpcGUoe1xuICBuYW1lOiAnc2VhcmNoRmlsdGVyJ1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlciBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHByaXZhdGUgX2xhc3RPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXTtcbiAgcHJpdmF0ZSBfc2VhcmNoQ2FjaGU6IFN0cmluZ0hhc2hNYXA8SU11bHRpU2VsZWN0T3B0aW9uW10+ID0ge307XG4gIHByaXZhdGUgX3NlYXJjaENhY2hlSW5jbHVzaXZlOiBTdHJpbmdIYXNoTWFwPGJvb2xlYW4gfCBudW1iZXI+ID0ge307XG4gIHByaXZhdGUgX3ByZXZTa2lwcGVkSXRlbXM6IFN0cmluZ0hhc2hNYXA8bnVtYmVyPiA9IHt9O1xuXG4gIHRyYW5zZm9ybShcbiAgICBvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcbiAgICBzdHIgPSAnJyxcbiAgICBsaW1pdCA9IDAsXG4gICAgcmVuZGVyTGltaXQgPSAwLFxuICAgIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCxcbiAgKTogSU11bHRpU2VsZWN0T3B0aW9uW10ge1xuICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gRHJvcCBjYWNoZSBiZWNhdXNlIG9wdGlvbnMgd2VyZSB1cGRhdGVkXG4gICAgaWYgKG9wdGlvbnMgIT09IHRoaXMuX2xhc3RPcHRpb25zKSB7XG4gICAgICB0aGlzLl9sYXN0T3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICB0aGlzLl9zZWFyY2hDYWNoZSA9IHt9O1xuICAgICAgdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmUgPSB7fTtcbiAgICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXMgPSB7fTtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJlZE9wdHMgPSB0aGlzLl9zZWFyY2hDYWNoZS5oYXNPd25Qcm9wZXJ0eShzdHIpXG4gICAgICA/IHRoaXMuX3NlYXJjaENhY2hlW3N0cl1cbiAgICAgIDogdGhpcy5fZG9TZWFyY2gob3B0aW9ucywgc3RyLCBsaW1pdCwgc2VhcmNoRnVuY3Rpb24pO1xuXG4gICAgY29uc3QgaXNVbmRlckxpbWl0ID0gb3B0aW9ucy5sZW5ndGggPD0gbGltaXQ7XG5cbiAgICByZXR1cm4gaXNVbmRlckxpbWl0XG4gICAgICA/IGZpbHRlcmVkT3B0c1xuICAgICAgOiB0aGlzLl9saW1pdFJlbmRlcmVkSXRlbXMoZmlsdGVyZWRPcHRzLCByZW5kZXJMaW1pdCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTdWJzZXRPcHRpb25zKFxuICAgIG9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdLFxuICAgIHByZXZPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSxcbiAgICBwcmV2U2VhcmNoU3RyOiBzdHJpbmdcbiAgKSB7XG4gICAgY29uc3QgcHJldkluY2x1c2l2ZU9ySWR4ID0gdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmVbcHJldlNlYXJjaFN0cl07XG5cbiAgICBpZiAocHJldkluY2x1c2l2ZU9ySWR4ID09PSB0cnVlKSB7XG4gICAgICAvLyBJZiBoYXZlIHByZXZpb3VzIHJlc3VsdHMgYW5kIGl0IHdhcyBpbmNsdXNpdmUsIGRvIG9ubHkgc3Vic2VhcmNoXG4gICAgICByZXR1cm4gcHJldk9wdGlvbnM7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJldkluY2x1c2l2ZU9ySWR4ID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gT3IgcmV1c2UgcHJldiByZXN1bHRzIHdpdGggdW5jaGVja2VkIG9uZXNcbiAgICAgIHJldHVybiBbLi4ucHJldk9wdGlvbnMsIC4uLm9wdGlvbnMuc2xpY2UocHJldkluY2x1c2l2ZU9ySWR4KV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9kb1NlYXJjaChvcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSwgc3RyOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIsIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCkge1xuICAgIGNvbnN0IHByZXZTdHIgPSBzdHIuc2xpY2UoMCwgLTEpO1xuICAgIGNvbnN0IHByZXZSZXN1bHRzID0gdGhpcy5fc2VhcmNoQ2FjaGVbcHJldlN0cl07XG4gICAgY29uc3QgcHJldlJlc3VsdFNoaWZ0ID0gdGhpcy5fcHJldlNraXBwZWRJdGVtc1twcmV2U3RyXSB8fCAwO1xuXG4gICAgaWYgKHByZXZSZXN1bHRzKSB7XG4gICAgICBvcHRpb25zID0gdGhpcy5fZ2V0U3Vic2V0T3B0aW9ucyhvcHRpb25zLCBwcmV2UmVzdWx0cywgcHJldlN0cik7XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0c0xlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGNvbnN0IG1heEZvdW5kID0gbGltaXQgPiAwID8gTWF0aC5taW4obGltaXQsIG9wdHNMZW5ndGgpIDogb3B0c0xlbmd0aDtcbiAgICBjb25zdCByZWdleHAgPSBzZWFyY2hGdW5jdGlvbihzdHIpO1xuICAgIGNvbnN0IGZpbHRlcmVkT3B0czogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcblxuICAgIGxldCBpID0gMCwgZm91bmRlZCA9IDAsIHJlbW92ZWRGcm9tUHJldlJlc3VsdCA9IDA7XG5cbiAgICBjb25zdCBkb2VzT3B0aW9uTWF0Y2ggPSAob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHJlZ2V4cC50ZXN0KG9wdGlvbi5uYW1lKTtcbiAgICBjb25zdCBnZXRDaGlsZHJlbiA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cbiAgICAgIG9wdGlvbnMuZmlsdGVyKGNoaWxkID0+IGNoaWxkLnBhcmVudElkID09PSBvcHRpb24uaWQpO1xuICAgIGNvbnN0IGdldFBhcmVudCA9IChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT5cbiAgICAgIG9wdGlvbnMuZmluZChwYXJlbnQgPT4gb3B0aW9uLnBhcmVudElkID09PSBwYXJlbnQuaWQpO1xuICAgIGNvbnN0IGZvdW5kRm4gPSAoaXRlbTogYW55KSA9PiB7IGZpbHRlcmVkT3B0cy5wdXNoKGl0ZW0pOyBmb3VuZGVkKys7IH07XG4gICAgY29uc3Qgbm90Rm91bmRGbiA9IHByZXZSZXN1bHRzID8gKCkgPT4gcmVtb3ZlZEZyb21QcmV2UmVzdWx0KysgOiAoKSA9PiB7IH07XG5cbiAgICBmb3IgKDsgaSA8IG9wdHNMZW5ndGggJiYgZm91bmRlZCA8IG1heEZvdW5kOyArK2kpIHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XG4gICAgICBjb25zdCBkaXJlY3RNYXRjaCA9IGRvZXNPcHRpb25NYXRjaChvcHRpb24pO1xuXG4gICAgICBpZiAoZGlyZWN0TWF0Y2gpIHtcbiAgICAgICAgZm91bmRGbihvcHRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24ucGFyZW50SWQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTWF0Y2ggPSBnZXRDaGlsZHJlbihvcHRpb24pLnNvbWUoZG9lc09wdGlvbk1hdGNoKTtcblxuICAgICAgICBpZiAoY2hpbGRyZW5NYXRjaCkge1xuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbi5wYXJlbnRJZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgcGFyZW50TWF0Y2ggPSBkb2VzT3B0aW9uTWF0Y2goZ2V0UGFyZW50KG9wdGlvbikpO1xuXG4gICAgICAgIGlmIChwYXJlbnRNYXRjaCkge1xuICAgICAgICAgIGZvdW5kRm4ob3B0aW9uKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBub3RGb3VuZEZuKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdG90YWxJdGVyYXRpb25zID0gaSArIHByZXZSZXN1bHRTaGlmdDtcblxuICAgIHRoaXMuX3NlYXJjaENhY2hlW3N0cl0gPSBmaWx0ZXJlZE9wdHM7XG4gICAgdGhpcy5fc2VhcmNoQ2FjaGVJbmNsdXNpdmVbc3RyXSA9IGkgPT09IG9wdHNMZW5ndGggfHwgdG90YWxJdGVyYXRpb25zO1xuICAgIHRoaXMuX3ByZXZTa2lwcGVkSXRlbXNbc3RyXSA9IHJlbW92ZWRGcm9tUHJldlJlc3VsdCArIHByZXZSZXN1bHRTaGlmdDtcblxuICAgIHJldHVybiBmaWx0ZXJlZE9wdHM7XG4gIH1cblxuICBwcml2YXRlIF9saW1pdFJlbmRlcmVkSXRlbXM8VD4oaXRlbXM6IFRbXSwgbGltaXQ6IG51bWJlcik6IFRbXSB7XG4gICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA+IGxpbWl0ICYmIGxpbWl0ID4gMCA/IGl0ZW1zLnNsaWNlKDAsIGxpbWl0KSA6IGl0ZW1zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3QsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc3NBdXRvZm9jdXNdJ1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvZm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgLyoqXG4gICAqIFdpbGwgc2V0IGZvY3VzIGlmIHNldCB0byBmYWxzeSB2YWx1ZSBvciBub3Qgc2V0IGF0IGFsbFxuICAgKi9cbiAgQElucHV0KCkgc3NBdXRvZm9jdXM6IGJvb2xlYW47XG5cbiAgZ2V0IGVsZW1lbnQoKTogeyBmb2N1cz86IEZ1bmN0aW9uIH0ge1xuICAgIHJldHVybiB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBIb3N0KCkgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBzc0F1dG9mb2N1c0NoYW5nZSA9IGNoYW5nZXMuc3NBdXRvZm9jdXM7XG5cbiAgICBpZiAoc3NBdXRvZm9jdXNDaGFuZ2UgJiYgIXNzQXV0b2ZvY3VzQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkge1xuICAgICAgdGhpcy5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLnNzQXV0b2ZvY3VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50LmZvY3VzICYmIHRoaXMuZWxlbWVudC5mb2N1cygpO1xuICB9XG5cbn1cbiIsIlxyXG5pbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIEl0ZXJhYmxlRGlmZmVycyxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgRm9ybUJ1aWxkZXIsXHJcbiAgRm9ybUNvbnRyb2wsXHJcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgVmFsaWRhdG9yLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlciB9IGZyb20gJy4vc2VhcmNoLWZpbHRlci5waXBlJztcclxuaW1wb3J0IHsgSU11bHRpU2VsZWN0T3B0aW9uLCBJTXVsdGlTZWxlY3RTZXR0aW5ncywgSU11bHRpU2VsZWN0VGV4dHMsIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKlxyXG4gKiBBbmd1bGFyIDIgRHJvcGRvd24gTXVsdGlzZWxlY3QgZm9yIEJvb3RzdHJhcFxyXG4gKlxyXG4gKiBTaW1vbiBMaW5kaFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc29mdHNpbW9uL2FuZ3VsYXItMi1kcm9wZG93bi1tdWx0aXNlbGVjdFxyXG4gKi9cclxuXHJcbmNvbnN0IE1VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NzLW11bHRpc2VsZWN0LWRyb3Bkb3duJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Ryb3Bkb3duLmNvbXBvbmVudC5jc3MnXSxcclxuICBwcm92aWRlcnM6IFtNVUxUSVNFTEVDVF9WQUxVRV9BQ0NFU1NPUiwgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXJdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIERvQ2hlY2ssXHJcbiAgT25EZXN0cm95LFxyXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gIFZhbGlkYXRvciB7XHJcbiAgZmlsdGVyQ29udHJvbDogRm9ybUNvbnRyb2wgPSB0aGlzLmZiLmNvbnRyb2woJycpO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBBcnJheTxJTXVsdGlTZWxlY3RPcHRpb24+O1xyXG4gIEBJbnB1dCgpIHNldHRpbmdzOiBJTXVsdGlTZWxlY3RTZXR0aW5ncztcclxuICBASW5wdXQoKSB0ZXh0czogSU11bHRpU2VsZWN0VGV4dHM7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkaXNhYmxlZFNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHNlYXJjaEZ1bmN0aW9uOiAoc3RyOiBzdHJpbmcpID0+IFJlZ0V4cCA9IHRoaXMuX2VzY2FwZVJlZ0V4cDtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgZHJvcGRvd25DbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGRyb3Bkb3duT3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvbkFkZGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBvblJlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uTGF6eUxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIG9uRmlsdGVyOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzO1xyXG5cclxuICBnZXQgZm9jdXNCYWNrKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MuZm9jdXNCYWNrICYmIHRoaXMuX2ZvY3VzQmFjaztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGlja2VkT3V0c2lkZSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUgfHwgIXRoaXMuc2V0dGluZ3MuY2xvc2VPbkNsaWNrT3V0c2lkZSkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZm9jdXNCYWNrID0gdHJ1ZTtcclxuICAgIHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveWVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgZmlsdGVyZWRPcHRpb25zOiBJTXVsdGlTZWxlY3RPcHRpb25bXSA9IFtdO1xyXG4gIGxhenlMb2FkT3B0aW9uczogSU11bHRpU2VsZWN0T3B0aW9uW10gPSBbXTtcclxuICByZW5kZXJGaWx0ZXJlZE9wdGlvbnM6IElNdWx0aVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgbW9kZWw6IGFueVtdID0gW107XHJcbiAgcHJldk1vZGVsOiBhbnlbXSA9IFtdO1xyXG4gIHBhcmVudHM6IGFueVtdO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGlmZmVyOiBhbnk7XHJcbiAgbnVtU2VsZWN0ZWQ6IG51bWJlciA9IDA7XHJcbiAgc2V0IGlzVmlzaWJsZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzVmlzaWJsZSA9IHZhbDtcclxuICAgIHRoaXMuX3dvcmtlckRvY0NsaWNrZWQgPSB2YWwgPyBmYWxzZSA6IHRoaXMuX3dvcmtlckRvY0NsaWNrZWQ7XHJcbiAgfVxyXG4gIGdldCBpc1Zpc2libGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlO1xyXG4gIH1cclxuICByZW5kZXJJdGVtcyA9IHRydWU7XHJcbiAgY2hlY2tBbGxTZWFyY2hSZWdpc3RlciA9IG5ldyBTZXQoKTtcclxuICBjaGVja0FsbFN0YXR1cyA9IGZhbHNlO1xyXG4gIGxvYWRlZFZhbHVlSWRzID0gW107XHJcbiAgX2ZvY3VzQmFjayA9IGZhbHNlO1xyXG4gIGZvY3VzZWRJdGVtOiBJTXVsdGlTZWxlY3RPcHRpb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gIGRlZmF1bHRTZXR0aW5nczogSU11bHRpU2VsZWN0U2V0dGluZ3MgPSB7XHJcbiAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiB0cnVlLFxyXG4gICAgcHVsbFJpZ2h0OiBmYWxzZSxcclxuICAgIGVuYWJsZVNlYXJjaDogZmFsc2UsXHJcbiAgICBzZWFyY2hSZW5kZXJMaW1pdDogMCxcclxuICAgIHNlYXJjaFJlbmRlckFmdGVyOiAxLFxyXG4gICAgc2VhcmNoTWF4TGltaXQ6IDAsXHJcbiAgICBzZWFyY2hNYXhSZW5kZXJlZEl0ZW1zOiAwLFxyXG4gICAgY2hlY2tlZFN0eWxlOiAnY2hlY2tib3hlcycsXHJcbiAgICBidXR0b25DbGFzc2VzOiAnYnRuIGJ0bi1wcmltYXJ5IGRyb3Bkb3duLXRvZ2dsZScsXHJcbiAgICBjb250YWluZXJDbGFzc2VzOiAnZHJvcGRvd24taW5saW5lJyxcclxuICAgIHNlbGVjdGlvbkxpbWl0OiAwLFxyXG4gICAgbWluU2VsZWN0aW9uTGltaXQ6IDAsXHJcbiAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgIGF1dG9VbnNlbGVjdDogZmFsc2UsXHJcbiAgICBzaG93Q2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgc2hvd1VuY2hlY2tBbGw6IGZhbHNlLFxyXG4gICAgZml4ZWRUaXRsZTogZmFsc2UsXHJcbiAgICBkeW5hbWljVGl0bGVNYXhJdGVtczogMyxcclxuICAgIG1heEhlaWdodDogJzMwMHB4JyxcclxuICAgIGlzTGF6eUxvYWQ6IGZhbHNlLFxyXG4gICAgc3RvcFNjcm9sbFByb3BhZ2F0aW9uOiBmYWxzZSxcclxuICAgIGxvYWRWaWV3RGlzdGFuY2U6IDEsXHJcbiAgICBzZWxlY3RBZGRlZFZhbHVlczogZmFsc2UsXHJcbiAgICBpZ25vcmVMYWJlbHM6IGZhbHNlLFxyXG4gICAgbWFpbnRhaW5TZWxlY3Rpb25PcmRlckluVGl0bGU6IGZhbHNlLFxyXG4gICAgZm9jdXNCYWNrOiB0cnVlXHJcbiAgfTtcclxuICBkZWZhdWx0VGV4dHM6IElNdWx0aVNlbGVjdFRleHRzID0ge1xyXG4gICAgY2hlY2tBbGw6ICdDaGVjayBhbGwnLFxyXG4gICAgdW5jaGVja0FsbDogJ1VuY2hlY2sgYWxsJyxcclxuICAgIGNoZWNrZWQ6ICdjaGVja2VkJyxcclxuICAgIGNoZWNrZWRQbHVyYWw6ICdjaGVja2VkJyxcclxuICAgIHNlYXJjaFBsYWNlaG9sZGVyOiAnU2VhcmNoLi4uJyxcclxuICAgIHNlYXJjaEVtcHR5UmVzdWx0OiAnTm90aGluZyBmb3VuZC4uLicsXHJcbiAgICBzZWFyY2hOb1JlbmRlclRleHQ6ICdUeXBlIGluIHNlYXJjaCBib3ggdG8gc2VlIHJlc3VsdHMuLi4nLFxyXG4gICAgZGVmYXVsdFRpdGxlOiAnU2VsZWN0JyxcclxuICAgIGFsbFNlbGVjdGVkOiAnQWxsIHNlbGVjdGVkJyxcclxuICB9O1xyXG5cclxuICBnZXQgc2VhcmNoTGltaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5zZWFyY2hSZW5kZXJMaW1pdDtcclxuICB9XHJcblxyXG4gIGdldCBzZWFyY2hSZW5kZXJBZnRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnNlYXJjaFJlbmRlckFmdGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNlYXJjaExpbWl0QXBwbGllZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlYXJjaExpbWl0ID4gMCAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gdGhpcy5zZWFyY2hMaW1pdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2lzVmlzaWJsZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3dvcmtlckRvY0NsaWNrZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcclxuICAgIHByaXZhdGUgc2VhcmNoRmlsdGVyOiBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcclxuICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcclxuICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGVmYXVsdFNldHRpbmdzO1xyXG4gICAgdGhpcy50ZXh0cyA9IHRoaXMuZGVmYXVsdFRleHRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKTogYW55IHtcclxuICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICBpZiAoIW9wdGlvbi5pc0xhYmVsKSB7XHJcbiAgICAgIHN0eWxlWydjdXJzb3InXSA9ICdwb2ludGVyJztcclxuICAgIH1cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgc3R5bGVbJ2N1cnNvciddID0gJ2RlZmF1bHQnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbVN0eWxlU2VsZWN0aW9uRGlzYWJsZWQoKTogYW55IHtcclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiB7IGN1cnNvcjogJ2RlZmF1bHQnIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzLmRlZmF1bHRUaXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlUmVuZGVySXRlbXMoKTtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCkge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzWydvcHRpb25zJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhcmVudHMgPSB0aGlzLm9wdGlvbnNcclxuICAgICAgICAuZmlsdGVyKG9wdGlvbiA9PiB0eXBlb2Ygb3B0aW9uLnBhcmVudElkID09PSAnbnVtYmVyJylcclxuICAgICAgICAubWFwKG9wdGlvbiA9PiBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVJlbmRlckl0ZW1zKCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmXHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcyAmJlxyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMgPSB0aGlzLmxvYWRlZFZhbHVlSWRzLmNvbmNhdChcclxuICAgICAgICAgIGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUubWFwKHZhbHVlID0+IHZhbHVlLmlkKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMgJiZcclxuICAgICAgICBjaGFuZ2VzLm9wdGlvbnMucHJldmlvdXNWYWx1ZVxyXG4gICAgICApIHtcclxuICAgICAgICBjb25zdCBhZGRlZFZhbHVlcyA9IGNoYW5nZXMub3B0aW9ucy5jdXJyZW50VmFsdWUuZmlsdGVyKFxyXG4gICAgICAgICAgdmFsdWUgPT4gdGhpcy5sb2FkZWRWYWx1ZUlkcy5pbmRleE9mKHZhbHVlLmlkKSA9PT0gLTFcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubG9hZGVkVmFsdWVJZHMuY29uY2F0KGFkZGVkVmFsdWVzLm1hcCh2YWx1ZSA9PiB2YWx1ZS5pZCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU3RhdHVzKSB7XHJcbiAgICAgICAgICB0aGlzLmFkZENoZWNrcyhhZGRlZFZhbHVlcyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuc2l6ZSA+IDApIHtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTZWFyY2hSZWdpc3Rlci5mb3JFYWNoKHNlYXJjaFZhbHVlID0+XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hlY2tzKHRoaXMuYXBwbHlGaWx0ZXJzKGFkZGVkVmFsdWVzLCBzZWFyY2hWYWx1ZSkpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMudGV4dHMpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRpdGxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncyA9IHsgLi4udGhpcy5kZWZhdWx0U2V0dGluZ3MsIC4uLnRoaXMuc2V0dGluZ3MgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlc1sndGV4dHMnXSkge1xyXG4gICAgICB0aGlzLnRleHRzID0geyAuLi50aGlzLmRlZmF1bHRUZXh0cywgLi4udGhpcy50ZXh0cyB9O1xyXG4gICAgICBpZiAoIWNoYW5nZXNbJ3RleHRzJ10uaXNGaXJzdENoYW5nZSgpKSB7IHRoaXMudXBkYXRlVGl0bGUoKTsgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlUmVuZGVySXRlbXMoKSB7XHJcbiAgICB0aGlzLnJlbmRlckl0ZW1zID1cclxuICAgICAgIXRoaXMuc2VhcmNoTGltaXRBcHBsaWVkIHx8XHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5zZWFyY2hSZW5kZXJBZnRlcjtcclxuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5hcHBseUZpbHRlcnMoXHJcbiAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgdGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkID8gJycgOiB0aGlzLmZpbHRlckNvbnRyb2wudmFsdWVcclxuICAgICk7XHJcbiAgICB0aGlzLnJlbmRlckZpbHRlcmVkT3B0aW9ucyA9IHRoaXMucmVuZGVySXRlbXMgPyB0aGlzLmZpbHRlcmVkT3B0aW9ucyA6IFtdO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGFwcGx5RmlsdGVycyhvcHRpb25zLCB2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRmlsdGVyLnRyYW5zZm9ybShcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4TGltaXQsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3Muc2VhcmNoTWF4UmVuZGVyZWRJdGVtcyxcclxuICAgICAgdGhpcy5zZWFyY2hGdW5jdGlvblxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZpcmVNb2RlbENoYW5nZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGVsICE9IHRoaXMucHJldk1vZGVsKSB7XHJcbiAgICAgIHRoaXMucHJldk1vZGVsID0gdGhpcy5tb2RlbDtcclxuICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMubW9kZWwpO1xyXG4gICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9IChfOiBhbnkpID0+IHsgfTtcclxuICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xyXG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RlbCA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5tb2RlbCk7XHJcbiAgICBpZiAoY2hhbmdlcykge1xyXG4gICAgICB0aGlzLnVwZGF0ZU51bVNlbGVjdGVkKCk7XHJcbiAgICAgIHRoaXMudXBkYXRlVGl0bGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKF9jOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVxdWlyZWQ6IHtcclxuICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpbHRlcihvID0+IHRoaXMubW9kZWwuaW5kZXhPZihvLmlkKSAmJiAhby5kaXNhYmxlZCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0aW9uOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKF9mbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTZWFyY2goZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLm1heWJlU3RvcFByb3BhZ2F0aW9uKGV2ZW50KTtcclxuICAgIHRoaXMuZmlsdGVyQ29udHJvbC5zZXRWYWx1ZSgnJyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVEcm9wZG93bihlPzogRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICB0aGlzLl9mb2N1c0JhY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xyXG4gICAgdGhpcy5pc1Zpc2libGUgPyB0aGlzLmRyb3Bkb3duT3BlbmVkLmVtaXQoKSA6IHRoaXMuZHJvcGRvd25DbG9zZWQuZW1pdCgpO1xyXG4gICAgdGhpcy5mb2N1c2VkSXRlbSA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGNsb3NlRHJvcGRvd24oZT86IEV2ZW50KSB7XHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnRvZ2dsZURyb3Bkb3duKGUpO1xyXG4gIH1cclxuXHJcbiAgaXNTZWxlY3RlZChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPiAtMTtcclxuICB9XHJcblxyXG4gIHNldFNlbGVjdGVkKF9ldmVudDogRXZlbnQsIG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICBpZiAob3B0aW9uLmlzTGFiZWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgIHRoaXMubWF5YmVTdG9wUHJvcGFnYXRpb24oX2V2ZW50KTtcclxuICAgICAgdGhpcy5tYXliZVByZXZlbnREZWZhdWx0KF9ldmVudCk7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCk7XHJcbiAgICAgIGNvbnN0IGlzQXRTZWxlY3Rpb25MaW1pdCA9XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCA+IDAgJiZcclxuICAgICAgICB0aGlzLm1vZGVsLmxlbmd0aCA+PSB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0O1xyXG4gICAgICBjb25zdCByZW1vdmVJdGVtID0gKGlkeCwgaWQpOiB2b2lkID0+IHtcclxuICAgICAgICB0aGlzLm1vZGVsLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgIHRoaXMub25SZW1vdmVkLmVtaXQoaWQpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMubGF6eUxvYWRPcHRpb25zLnNwbGljZShcclxuICAgICAgICAgICAgdGhpcy5sYXp5TG9hZE9wdGlvbnMuaW5kZXhPZihcclxuICAgICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5maW5kKHZhbCA9PiB2YWwuaWQgPT09IGlkKVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICB0aGlzLm51bVNlbGVjdGVkID4gdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgcmVtb3ZlSXRlbShpbmRleCwgb3B0aW9uLmlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyZW50SW5kZXggPVxyXG4gICAgICAgICAgb3B0aW9uLnBhcmVudElkICYmIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIGlmIChwYXJlbnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKHBhcmVudEluZGV4LCBvcHRpb24ucGFyZW50SWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJlbnRzLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcclxuICAgICAgICAgICAgLmZpbHRlcihcclxuICAgICAgICAgICAgICBjaGlsZCA9PlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xICYmXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZvckVhY2goY2hpbGQgPT5cclxuICAgICAgICAgICAgICByZW1vdmVJdGVtKHRoaXMubW9kZWwuaW5kZXhPZihjaGlsZC5pZCksIGNoaWxkLmlkKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0F0U2VsZWN0aW9uTGltaXQgJiYgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25MaW1pdFJlYWNoZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGFkZEl0ZW0gPSAoaWQpOiB2b2lkID0+IHtcclxuICAgICAgICAgIHRoaXMubW9kZWwucHVzaChpZCk7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChpZCk7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5sYXp5TG9hZE9wdGlvbnMuc29tZSh2YWwgPT4gdmFsLmlkID09PSBpZClcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmxhenlMb2FkT3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYWRkSXRlbShvcHRpb24uaWQpO1xyXG4gICAgICAgIGlmICghaXNBdFNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnBhcmVudElkICYmICF0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgY2hpbGQgPT5cclxuICAgICAgICAgICAgICAgIGNoaWxkLmlkICE9PSBvcHRpb24uaWQgJiYgY2hpbGQucGFyZW50SWQgPT09IG9wdGlvbi5wYXJlbnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGRyZW4uZXZlcnkoY2hpbGQgPT4gdGhpcy5tb2RlbC5pbmRleE9mKGNoaWxkLmlkKSA+IC0xKSkge1xyXG4gICAgICAgICAgICAgIGFkZEl0ZW0ob3B0aW9uLnBhcmVudElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBhcmVudHMuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGNoaWxkID0+XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmluZGV4T2YoY2hpbGQuaWQpIDwgMCAmJiBjaGlsZC5wYXJlbnRJZCA9PT0gb3B0aW9uLmlkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gYWRkSXRlbShjaGlsZC5pZCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZW1vdmVJdGVtKDAsIHRoaXMubW9kZWxbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVEcm9wZG93bigpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLnNsaWNlKCk7XHJcbiAgICAgIHRoaXMuZmlyZU1vZGVsQ2hhbmdlKCk7XHJcblxyXG4gICAgfSwgMClcclxuICB9XHJcblxyXG4gIHVwZGF0ZU51bVNlbGVjdGVkKCkge1xyXG4gICAgdGhpcy5udW1TZWxlY3RlZCA9XHJcbiAgICAgIHRoaXMubW9kZWwuZmlsdGVyKGlkID0+IHRoaXMucGFyZW50cy5pbmRleE9mKGlkKSA8IDApLmxlbmd0aCB8fCAwO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlVGl0bGUoKSB7XHJcbiAgICBsZXQgbnVtU2VsZWN0ZWRPcHRpb25zID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcclxuICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUxhYmVscykge1xyXG4gICAgICBudW1TZWxlY3RlZE9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxyXG4gICAgICAgIChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4gIW9wdGlvbi5pc0xhYmVsXHJcbiAgICAgICkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubnVtU2VsZWN0ZWQgPT09IDAgfHwgdGhpcy5zZXR0aW5ncy5maXhlZFRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLnRleHRzID8gdGhpcy50ZXh0cy5kZWZhdWx0VGl0bGUgOiAnJztcclxuICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZGlzcGxheUFsbFNlbGVjdGVkVGV4dCAmJlxyXG4gICAgICB0aGlzLm1vZGVsLmxlbmd0aCA9PT0gbnVtU2VsZWN0ZWRPcHRpb25zXHJcbiAgICApIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRoaXMudGV4dHMgPyB0aGlzLnRleHRzLmFsbFNlbGVjdGVkIDogJyc7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aGlzLnNldHRpbmdzLmR5bmFtaWNUaXRsZU1heEl0ZW1zICYmXHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuZHluYW1pY1RpdGxlTWF4SXRlbXMgPj0gdGhpcy5udW1TZWxlY3RlZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHVzZU9wdGlvbnMgPVxyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuaXNMYXp5TG9hZCAmJiB0aGlzLmxhenlMb2FkT3B0aW9ucy5sZW5ndGhcclxuICAgICAgICAgID8gdGhpcy5sYXp5TG9hZE9wdGlvbnNcclxuICAgICAgICAgIDogdGhpcy5vcHRpb25zO1xyXG5cclxuICAgICAgbGV0IHRpdGxlU2VsZWN0aW9uczogQXJyYXk8SU11bHRpU2VsZWN0T3B0aW9uPjtcclxuXHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLm1haW50YWluU2VsZWN0aW9uT3JkZXJJblRpdGxlKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uSWRzID0gdXNlT3B0aW9ucy5tYXAoKHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uLCBpZHg6IG51bWJlcikgPT4gc2VsZWN0T3B0aW9uLmlkKTtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB0aGlzLm1vZGVsXHJcbiAgICAgICAgICAubWFwKChzZWxlY3RlZElkKSA9PiBvcHRpb25JZHMuaW5kZXhPZihzZWxlY3RlZElkKSlcclxuICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbkluZGV4KSA9PiBvcHRpb25JbmRleCA+IC0xKVxyXG4gICAgICAgICAgLm1hcCgob3B0aW9uSW5kZXgpID0+IHVzZU9wdGlvbnNbb3B0aW9uSW5kZXhdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRsZVNlbGVjdGlvbnMgPSB1c2VPcHRpb25zLmZpbHRlcigob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID4gLTEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRpdGxlID0gdGl0bGVTZWxlY3Rpb25zLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aXRsZSA9XHJcbiAgICAgICAgdGhpcy5udW1TZWxlY3RlZCArXHJcbiAgICAgICAgJyAnICtcclxuICAgICAgICAodGhpcy5udW1TZWxlY3RlZCA9PT0gMVxyXG4gICAgICAgICAgPyB0aGlzLnRleHRzLmNoZWNrZWRcclxuICAgICAgICAgIDogdGhpcy50ZXh0cy5jaGVja2VkUGx1cmFsKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBzZWFyY2hGaWx0ZXJBcHBsaWVkKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zZXR0aW5ncy5lbmFibGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy5maWx0ZXJDb250cm9sLnZhbHVlICYmXHJcbiAgICAgIHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZS5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2hlY2tzKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNoZWNrZWRPcHRpb25zID0gb3B0aW9uc1xyXG4gICAgICAuZmlsdGVyKChvcHRpb246IElNdWx0aVNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICFvcHRpb24uZGlzYWJsZWQgJiZcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5pbmRleE9mKG9wdGlvbi5pZCkgPT09IC0xICYmXHJcbiAgICAgICAgICAgICEodGhpcy5zZXR0aW5ncy5pZ25vcmVMYWJlbHMgJiYgb3B0aW9uLmlzTGFiZWwpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLm9uQWRkZWQuZW1pdChvcHRpb24uaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSlcclxuICAgICAgLm1hcCgob3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pID0+IG9wdGlvbi5pZCk7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IHRoaXMubW9kZWwuY29uY2F0KGNoZWNrZWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGNoZWNrQWxsKCkge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkU2VsZWN0aW9uKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2hlY2tzKFxyXG4gICAgICAgICF0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSA/IHRoaXMub3B0aW9ucyA6IHRoaXMuZmlsdGVyZWRPcHRpb25zXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlzTGF6eUxvYWQgJiYgdGhpcy5zZXR0aW5ncy5zZWxlY3RBZGRlZFZhbHVlcykge1xyXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZpbHRlckFwcGxpZWQoKSAmJiAhdGhpcy5jaGVja0FsbFN0YXR1cykge1xyXG4gICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmFkZCh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmZpcmVNb2RlbENoYW5nZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdW5jaGVja0FsbCgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZFNlbGVjdGlvbikge1xyXG4gICAgICBjb25zdCBjaGVja2VkT3B0aW9ucyA9IHRoaXMubW9kZWw7XHJcbiAgICAgIGxldCB1bkNoZWNrZWRPcHRpb25zID0gIXRoaXMuc2VhcmNoRmlsdGVyQXBwbGllZCgpXHJcbiAgICAgICAgPyB0aGlzLm1vZGVsXHJcbiAgICAgICAgOiB0aGlzLmZpbHRlcmVkT3B0aW9ucy5tYXAoKG9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSA9PiBvcHRpb24uaWQpO1xyXG4gICAgICAvLyBzZXQgdW5jaGVja2VkIG9wdGlvbnMgb25seSB0byB0aGUgb25lcyB0aGF0IHdlcmUgY2hlY2tlZFxyXG4gICAgICB1bkNoZWNrZWRPcHRpb25zID0gY2hlY2tlZE9wdGlvbnMuZmlsdGVyKGl0ZW0gPT4gdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGl0ZW0pID4gLTEpO1xyXG4gICAgICB0aGlzLm1vZGVsID0gdGhpcy5tb2RlbC5maWx0ZXIoKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAodW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IDAgJiZcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5taW5TZWxlY3Rpb25MaW1pdCA9PT0gdW5kZWZpbmVkKSB8fFxyXG4gICAgICAgICAgdW5DaGVja2VkT3B0aW9ucy5pbmRleE9mKGlkKSA8IHRoaXMuc2V0dGluZ3MubWluU2VsZWN0aW9uTGltaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLm9uUmVtb3ZlZC5lbWl0KGlkKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pc0xhenlMb2FkICYmIHRoaXMuc2V0dGluZ3Muc2VsZWN0QWRkZWRWYWx1ZXMpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWFyY2hGaWx0ZXJBcHBsaWVkKCkpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuaGFzKHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLmRlbGV0ZSh0aGlzLmZpbHRlckNvbnRyb2wudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuZm9yRWFjaChmdW5jdGlvbiAoc2VhcmNoVGVybSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlck9wdGlvbnMgPSB0aGlzLmFwcGx5RmlsdGVycyh0aGlzLm9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB1bkNoZWNrZWRPcHRpb25zLmluZGV4T2Yob3B0aW9uLmlkKSA+IC0xKSwgc2VhcmNoVGVybSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGRDaGVja3MoZmlsdGVyT3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNoZWNrQWxsU2VhcmNoUmVnaXN0ZXIuY2xlYXIoKTtcclxuICAgICAgICAgIHRoaXMuY2hlY2tBbGxTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5maXJlTW9kZWxDaGFuZ2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByZXZlbnRDaGVja2JveENoZWNrKGV2ZW50OiBFdmVudCwgb3B0aW9uOiBJTXVsdGlTZWxlY3RPcHRpb24pIHtcclxuICAgIGlmIChcclxuICAgICAgb3B0aW9uLmRpc2FibGVkIHx8XHJcbiAgICAgIChcclxuICAgICAgICB0aGlzLnNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ICYmXHJcbiAgICAgICAgIXRoaXMuc2V0dGluZ3MuYXV0b1Vuc2VsZWN0ICYmXHJcbiAgICAgICAgdGhpcy5tb2RlbC5sZW5ndGggPj0gdGhpcy5zZXR0aW5ncy5zZWxlY3Rpb25MaW1pdCAmJlxyXG4gICAgICAgIHRoaXMubW9kZWwuaW5kZXhPZihvcHRpb24uaWQpID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0NoZWNrYm94RGlzYWJsZWQob3B0aW9uPzogSU11bHRpU2VsZWN0T3B0aW9uKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFNlbGVjdGlvbiB8fCBvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTY3JvbGxQb3NpdGlvbihldikge1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gZXYudGFyZ2V0LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IGV2LnRhcmdldC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZXYudGFyZ2V0LmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHJvdW5kaW5nUGl4ZWwgPSAxO1xyXG4gICAgY29uc3QgZ3V0dGVyUGl4ZWwgPSAxO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgc2Nyb2xsVG9wID49XHJcbiAgICAgIHNjcm9sbEhlaWdodCAtXHJcbiAgICAgICgxICsgdGhpcy5zZXR0aW5ncy5sb2FkVmlld0Rpc3RhbmNlKSAqIHNjcm9sbEVsZW1lbnRIZWlnaHQgLVxyXG4gICAgICByb3VuZGluZ1BpeGVsIC1cclxuICAgICAgZ3V0dGVyUGl4ZWxcclxuICAgICkge1xyXG4gICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrU2Nyb2xsUHJvcGFnYXRpb24oZXYsIGVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcbiAgICBjb25zdCBzY3JvbGxFbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoZXYuZGVsdGFZID4gMCAmJiBzY3JvbGxUb3AgKyBzY3JvbGxFbGVtZW50SGVpZ2h0ID49IHNjcm9sbEhlaWdodCkgfHxcclxuICAgICAgKGV2LmRlbHRhWSA8IDAgJiYgc2Nyb2xsVG9wIDw9IDApXHJcbiAgICApIHtcclxuICAgICAgZXYgPSBldiB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChldik7XHJcbiAgICAgIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0cmFja0J5SWQoaWR4OiBudW1iZXIsIHNlbGVjdE9wdGlvbjogSU11bHRpU2VsZWN0T3B0aW9uKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0T3B0aW9uLmlkO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpIHtcclxuICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcclxuICAgICAgbGVuZ3RoOiB0aGlzLm9wdGlvbnMubGVuZ3RoLFxyXG4gICAgICBmaWx0ZXI6IHRoaXMuZmlsdGVyQ29udHJvbC52YWx1ZSxcclxuICAgICAgY2hlY2tBbGxTZWFyY2hlczogdGhpcy5jaGVja0FsbFNlYXJjaFJlZ2lzdGVyLFxyXG4gICAgICBjaGVja0FsbFN0YXR1czogdGhpcy5jaGVja0FsbFN0YXR1cyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZm9jdXNJdGVtKGRpcjogbnVtYmVyLCBlPzogRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWF5YmVQcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcbiAgICBjb25zdCBpZHggPSB0aGlzLmZpbHRlcmVkT3B0aW9ucy5pbmRleE9mKHRoaXMuZm9jdXNlZEl0ZW0pO1xyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSB0aGlzLmZpbHRlcmVkT3B0aW9uc1swXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG5leHRJZHggPSBpZHggKyBkaXI7XHJcbiAgICBjb25zdCBuZXdJZHggPVxyXG4gICAgICBuZXh0SWR4IDwgMFxyXG4gICAgICAgID8gdGhpcy5maWx0ZXJlZE9wdGlvbnMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogbmV4dElkeCAlIHRoaXMuZmlsdGVyZWRPcHRpb25zLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmZvY3VzZWRJdGVtID0gdGhpcy5maWx0ZXJlZE9wdGlvbnNbbmV3SWR4XTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF5YmVQcmV2ZW50RGVmYXVsdChlPzogeyBwcmV2ZW50RGVmYXVsdD86IEZ1bmN0aW9uIH0pIHtcclxuICAgIGlmIChlICYmIGUucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXliZVN0b3BQcm9wYWdhdGlvbihlPzogeyBzdG9wUHJvcGFnYXRpb24/OiBGdW5jdGlvbiB9KSB7XHJcbiAgICBpZiAoZSAmJiBlLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBwcml2YXRlIF9lc2NhcGVSZWdFeHAoc3RyOiBzdHJpbmcpOiBSZWdFeHAge1xyXG4gICAgY29uc3QgcmVnRXhwU3RyID0gc3RyLnJlcGxhY2UoL1tcXC1cXFtcXF1cXC9cXHtcXH1cXChcXClcXCpcXCtcXD9cXC5cXFxcXFxeXFwkXFx8XS9nLCBcIlxcXFwkJlwiKTtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ0V4cFN0ciwgJ2knKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhvc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1tvZmZDbGlja10nLFxufSlcblxuZXhwb3J0IGNsYXNzIE9mZkNsaWNrRGlyZWN0aXZlIHtcbiAgQE91dHB1dCgnb2ZmQ2xpY2snKSBvbk9mZkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHJpdmF0ZSBfY2xpY2tFdmVudDogTW91c2VFdmVudDtcbiAgcHJpdmF0ZSBfdG91Y2hFdmVudDogVG91Y2hFdmVudDtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIFxuICBwdWJsaWMgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2NsaWNrRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25Ub3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX3RvdWNoRXZlbnQgPSBldmVudDtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSkgXG4gIHB1YmxpYyBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgIT09IHRoaXMuX2NsaWNrRXZlbnQpIHtcbiAgICAgIHRoaXMub25PZmZDbGljay5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaHN0YXJ0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRG9jdW1lbnRUb3VjaChldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCAhPT0gdGhpcy5fdG91Y2hFdmVudCkge1xuICAgICAgdGhpcy5vbk9mZkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBBdXRvZm9jdXNEaXJlY3RpdmUgfSBmcm9tICcuL2F1dG9mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xuaW1wb3J0IHsgT2ZmQ2xpY2tEaXJlY3RpdmUgfSBmcm9tICcuL29mZi1jbGljay5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxuICAgIE9mZkNsaWNrRGlyZWN0aXZlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpc2VsZWN0RHJvcGRvd25Nb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiUGlwZSIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJIb3N0IiwiSW5wdXQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJFdmVudEVtaXR0ZXIiLCJTdWJqZWN0IiwidGFrZVVudGlsIiwiQ29tcG9uZW50IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJGb3JtQnVpbGRlciIsIkl0ZXJhYmxlRGlmZmVycyIsIkNoYW5nZURldGVjdG9yUmVmIiwiT3V0cHV0IiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQVlPLElBQUksUUFB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