import { ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { NgxMdService } from './ngx-md.service';
export declare class NgxMdComponent implements AfterViewInit {
    _mdService: NgxMdService;
    _el: ElementRef;
    platformId: string;
    _path: string;
    _data: string;
    _md: any;
    _ext: string;
    changeLog: string[];
    errror: EventEmitter<any>;
    loaded: EventEmitter<any>;
    constructor(_mdService: NgxMdService, _el: ElementRef, platformId: string);
    path: string;
    data: string;
    /**
     * Boolean indicating if the markdown content should be sanitized to avoid script injections
     */
    sanitizeHtml: boolean;
    onDataChange(data: string): void;
    /**
     *  After view init
     */
    ngAfterViewInit(): void;
    processRaw(): void;
    /**
     * get remote conent;
     */
    onPathChange(): void;
    /**
     * catch http error
     */
    private handleError;
    /**
     * Prepare string
     */
    prepare(raw: string): string;
    /**
     * Trim left whitespace
     */
    private trimLeft;
    /**
     * Use Prism to highlight code snippets only on the browser
     */
    private highlightContent;
}
