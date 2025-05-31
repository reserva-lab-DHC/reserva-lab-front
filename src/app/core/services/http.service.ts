import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private readonly baseUrl = 'http://naotemainda';

    constructor(private http: HttpClient) { }

    /**
     * Generic GET request
     * @param endpoint API endpoint (e.g., '/users')
     * @param params Query parameters (optional)
     * @param headers Custom headers (optional)
     */
    get<T>(endpoint: string, params?: Record<string, string | number | null | boolean | undefined>, headers?: HttpHeaders): Observable<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            headers: headers || this.getDefaultHeaders(),
            params: this.createParams(params || {})
        };

        return this.http.get<T>(url, options).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Generic POST request
     * @param endpoint API endpoint (e.g., '/users')
     * @param body Request payload (JSON)
     * @param headers Custom headers (optional)
     */
    post<T, B extends Record<string, unknown>>(endpoint: string, body: B, headers?: HttpHeaders): Observable<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const options = { headers: headers || this.getDefaultHeaders() };

        return this.http.post<T>(url, body, options).pipe(
            catchError(this.handleError)
        );
    }

    private getDefaultHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    private createParams(params: Record<string, string | number | boolean | undefined | null>): HttpParams {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null) {
                    httpParams = httpParams.append(key, params[key]!.toString());
                }
            });
        }
        return httpParams;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        const errorResponse = {
            status: error.status,
            message: error.error?.message || 'An unknown error occurred',
            errors: error.error?.errors || []
        };

        console.error('HTTP Error:', errorResponse);

        return throwError(() => errorResponse);
    }
}