/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutofocusDirective } from './autofocus.directive';
import { MultiselectDropdownComponent } from './dropdown.component';
import { MultiSelectSearchFilter } from './search-filter.pipe';
import { OffClickDirective } from './off-click.directive';
var MultiselectDropdownModule = /** @class */ (function () {
    function MultiselectDropdownModule() {
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
    return MultiselectDropdownModule;
}());
export { MultiselectDropdownModule };
function MultiselectDropdownModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiselectDropdownModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiselectDropdownModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Z0JBRXpELFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7b0JBQzVDLE9BQU8sRUFBRTt3QkFDUCw0QkFBNEI7d0JBQzVCLHVCQUF1QjtxQkFDeEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLDRCQUE0Qjt3QkFDNUIsdUJBQXVCO3dCQUN2QixrQkFBa0I7d0JBQ2xCLGlCQUFpQjtxQkFDbEI7aUJBQ0Y7O29DQXJCRDs7U0FzQmEseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBBdXRvZm9jdXNEaXJlY3RpdmUgfSBmcm9tICcuL2F1dG9mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vZHJvcGRvd24uY29tcG9uZW50JztcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoRmlsdGVyIH0gZnJvbSAnLi9zZWFyY2gtZmlsdGVyLnBpcGUnO1xuaW1wb3J0IHsgT2ZmQ2xpY2tEaXJlY3RpdmUgfSBmcm9tICcuL29mZi1jbGljay5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE11bHRpc2VsZWN0RHJvcGRvd25Db21wb25lbnQsXG4gICAgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIsXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxuICAgIE9mZkNsaWNrRGlyZWN0aXZlXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpc2VsZWN0RHJvcGRvd25Nb2R1bGUgeyB9XG4iXX0=