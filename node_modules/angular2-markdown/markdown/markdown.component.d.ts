import { ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { MarkdownService } from './markdown.service';
import './prism.languages';
export declare class MarkdownComponent implements OnInit {
    private mdService;
    private el;
    private http;
    private _path;
    private _data;
    private _md;
    private _ext;
    changeLog: string[];
    constructor(mdService: MarkdownService, el: ElementRef, http: Http);
    ngOnInit(): void;
    path: string;
    data: string;
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
    private handleError(error);
    /**
     * Prepare string
     */
    prepare(raw: string): string;
    /**
     * Trim left whitespace
     */
    private trimLeft(line);
}
