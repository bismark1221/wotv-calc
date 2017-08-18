import { PipeTransform } from '@angular/core';
import { IMultiSelectOption } from './types';
export declare class MultiSelectSearchFilter implements PipeTransform {
    private _lastOptions;
    private _searchCache;
    private _searchCacheInclusive;
    transform(options: Array<IMultiSelectOption>, str: string, limit?: number, renderLimit?: number): Array<IMultiSelectOption>;
    private _limitRenderedItems<T>(items, limit);
    private _escapeRegExp(str);
}
