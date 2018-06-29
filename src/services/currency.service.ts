import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

const FIXER_API_KEY = '1e7927b44bfbfe5480e1f751595f4f3e';
const FIXER_API_URL = 'http://data.fixer.io/api/latest?access_key=' + FIXER_API_KEY + '&symbols=USD,GBP,JPY,CHF,PHP';

@Injectable()
export class CurrencyService {

    constructor(private http: HttpClient) { }

    public get(): Observable<any> {
        return this.http.get<any>(FIXER_API_URL);
    }
}
