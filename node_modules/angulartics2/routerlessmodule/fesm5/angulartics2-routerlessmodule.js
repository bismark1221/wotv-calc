import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { ANGULARTICS2_TOKEN, RouterlessTracking, Angulartics2, Angulartics2OnModule } from 'angulartics2';

var Angulartics2RouterlessModule = /** @class */ (function () {
    function Angulartics2RouterlessModule() {
    }
    Angulartics2RouterlessModule_1 = Angulartics2RouterlessModule;
    Angulartics2RouterlessModule.forRoot = function (settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2RouterlessModule_1,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings: settings } },
                RouterlessTracking,
                Angulartics2,
            ],
        };
    };
    var Angulartics2RouterlessModule_1;
    Angulartics2RouterlessModule = Angulartics2RouterlessModule_1 = __decorate([
        NgModule({
            imports: [Angulartics2OnModule],
        })
    ], Angulartics2RouterlessModule);
    return Angulartics2RouterlessModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2RouterlessModule };
//# sourceMappingURL=angulartics2-routerlessmodule.js.map
