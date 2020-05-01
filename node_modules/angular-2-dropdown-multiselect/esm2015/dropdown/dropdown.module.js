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
export class MultiselectDropdownModule {
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
function MultiselectDropdownModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiselectDropdownModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiselectDropdownModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci0yLWRyb3Bkb3duLW11bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsiZHJvcGRvd24vZHJvcGRvd24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWUxRCxNQUFNOzs7WUFiTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO2dCQUM1QyxPQUFPLEVBQUU7b0JBQ1AsNEJBQTRCO29CQUM1Qix1QkFBdUI7aUJBQ3hCO2dCQUNELFlBQVksRUFBRTtvQkFDWiw0QkFBNEI7b0JBQzVCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEF1dG9mb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4vYXV0b2ZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNdWx0aXNlbGVjdERyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9kcm9wZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RTZWFyY2hGaWx0ZXIgfSBmcm9tICcuL3NlYXJjaC1maWx0ZXIucGlwZSc7XG5pbXBvcnQgeyBPZmZDbGlja0RpcmVjdGl2ZSB9IGZyb20gJy4vb2ZmLWNsaWNrLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcbiAgICBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTXVsdGlzZWxlY3REcm9wZG93bkNvbXBvbmVudCxcbiAgICBNdWx0aVNlbGVjdFNlYXJjaEZpbHRlcixcbiAgICBBdXRvZm9jdXNEaXJlY3RpdmUsXG4gICAgT2ZmQ2xpY2tEaXJlY3RpdmVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlzZWxlY3REcm9wZG93bk1vZHVsZSB7IH1cbiJdfQ==