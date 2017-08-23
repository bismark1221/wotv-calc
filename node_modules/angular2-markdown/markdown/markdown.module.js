import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MarkdownComponent } from './markdown.component';
import { MarkdownService } from './markdown.service';
import { MarkdownConfig } from './markdown.config';
var MarkdownModule = (function () {
    function MarkdownModule() {
    }
    MarkdownModule.forRoot = function () {
        return {
            ngModule: MarkdownModule,
            providers: [MarkdownConfig]
        };
    };
    return MarkdownModule;
}());
export { MarkdownModule };
MarkdownModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, HttpModule],
                declarations: [MarkdownComponent],
                providers: [MarkdownService],
                exports: [MarkdownComponent],
                entryComponents: [MarkdownComponent]
            },] },
];
/** @nocollapse */
MarkdownModule.ctorParameters = function () { return []; };
//# sourceMappingURL=markdown.module.js.map