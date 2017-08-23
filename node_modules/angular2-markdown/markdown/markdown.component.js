import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';
import { MarkdownService } from './markdown.service';
import './prism.languages';
var MarkdownComponent = (function () {
    function MarkdownComponent(mdService, el, http) {
        this.mdService = mdService;
        this.el = el;
        this.http = http;
        this.changeLog = [];
    }
    MarkdownComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(MarkdownComponent.prototype, "path", {
        set: function (value) {
            this._path = value;
            this.onPathChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkdownComponent.prototype, "data", {
        set: function (value) {
            this._data = value;
            this.onDataChange(value);
        },
        enumerable: true,
        configurable: true
    });
    // on input
    MarkdownComponent.prototype.onDataChange = function (data) {
        this.el.nativeElement.innerHTML = this.mdService.compile(data);
        Prism.highlightAll(false);
    };
    /**
     *  After view init
     */
    MarkdownComponent.prototype.ngAfterViewInit = function () {
        if (this._path) {
            this.onPathChange();
        }
        else {
            this.processRaw();
        }
    };
    MarkdownComponent.prototype.processRaw = function () {
        this._md = this.prepare(this.el.nativeElement.innerHTML);
        this.el.nativeElement.innerHTML = this.mdService.compile(this._md);
        Prism.highlightAll(false);
    };
    /**
     * get remote conent;
     */
    MarkdownComponent.prototype.onPathChange = function () {
        var _this = this;
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this.mdService.getContent(this._path)
            .subscribe(function (data) {
            _this._md = _this._ext !== 'md' ? '```' + _this._ext + '\n' + data + '\n```' : data;
            _this.el.nativeElement.innerHTML = _this.mdService.compile(_this.prepare(_this._md));
            Prism.highlightAll(false);
        }, function (err) { return _this.handleError; });
    };
    /**
     * catch http error
     */
    MarkdownComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    /**
     * Prepare string
     */
    MarkdownComponent.prototype.prepare = function (raw) {
        var _this = this;
        if (!raw) {
            return '';
        }
        if (this._ext === 'md' || !this.path) {
            var isCodeBlock_1 = false;
            return raw.split('\n').map(function (line) {
                if (_this.trimLeft(line).substring(0, 3) === "```") {
                    isCodeBlock_1 = !isCodeBlock_1;
                }
                return isCodeBlock_1 ? line : line.trim();
            }).join('\n');
        }
        return raw.replace(/\"/g, '\'');
    };
    /**
     * Trim left whitespace
     */
    MarkdownComponent.prototype.trimLeft = function (line) {
        return line.replace(/^\s+|\s+$/g, '');
    };
    return MarkdownComponent;
}());
export { MarkdownComponent };
MarkdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'markdown,[Markdown]',
                template: '<ng-content></ng-content>',
                styles: [
                    ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
                ]
            },] },
];
/** @nocollapse */
MarkdownComponent.ctorParameters = function () { return [
    { type: MarkdownService, },
    { type: ElementRef, },
    { type: Http, },
]; };
MarkdownComponent.propDecorators = {
    'path': [{ type: Input },],
    'data': [{ type: Input },],
};
//# sourceMappingURL=markdown.component.js.map