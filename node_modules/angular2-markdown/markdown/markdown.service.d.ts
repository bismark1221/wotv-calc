import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
export declare class MarkdownService {
    private http;
    private _renderer;
    constructor(http: Http);
    getContent(path: string): Observable<any>;
    readonly renderer: any;
    extractData(res: Response): string;
    setMarkedOptions(options: any): void;
    compile(data: string): string;
    private handleError(error);
    private extendRenderer();
}
