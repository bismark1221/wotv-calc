import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as marked from 'marked';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var MarkdownService = (function () {
    function MarkdownService(http) {
        this.http = http;
        this._renderer = new marked.Renderer();
        this.extendRenderer();
        this.setMarkedOptions({});
    }
    //get the content from remote resource
    MarkdownService.prototype.getContent = function (path) {
        return this.http.get(path)
            .map(this.extractData)
            .catch(this.handleError);
    };
    Object.defineProperty(MarkdownService.prototype, "renderer", {
        get: function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
    // handle data
    MarkdownService.prototype.extractData = function (res) {
        return res.text() || '';
    };
    MarkdownService.prototype.setMarkedOptions = function (options) {
        options = Object.assign({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        }, options);
        options.renderer = this._renderer;
        marked.setOptions(options);
    };
    // comple markdown to html
    MarkdownService.prototype.compile = function (data) {
        return marked(data);
    };
    //handle error
    MarkdownService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };
    // extend marked render to support todo checkbox
    MarkdownService.prototype.extendRenderer = function () {
        this._renderer.listitem = function (text) {
            if (/^\s*\[[x ]\]\s*/.test(text)) {
                text = text
                    .replace(/^\s*\[ \]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " disabled> ')
                    .replace(/^\s*\[x\]\s*/, '<input type="checkbox" style=" vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px; " checked disabled> ');
                return '<li style="list-style: none">' + text + '</li>';
            }
            else {
                return '<li>' + text + '</li>';
            }
        };
    };
    return MarkdownService;
}());
export { MarkdownService };
MarkdownService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MarkdownService.ctorParameters = function () { return [
    { type: Http, },
]; };
//# sourceMappingURL=markdown.service.js.map