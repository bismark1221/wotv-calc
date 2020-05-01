import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { ANGULARTICS2_TOKEN, RouterlessTracking, Angulartics2, Angulartics2OnModule } from 'angulartics2';

var Angulartics2RouterlessModule_1;
let Angulartics2RouterlessModule = Angulartics2RouterlessModule_1 = class Angulartics2RouterlessModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2RouterlessModule_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    }
};
Angulartics2RouterlessModule = Angulartics2RouterlessModule_1 = __decorate([
    NgModule({
        imports: [Angulartics2OnModule],
    })
], Angulartics2RouterlessModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2RouterlessModule };
//# sourceMappingURL=angulartics2-routerlessmodule.js.map
