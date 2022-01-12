import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Register, Login } from './types';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }
    private baseUrl = 'http://localhost:3001';

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

    registerUser(data: Register): Observable<Register> {
        return this.http.post<Register>(`${this.baseUrl}/registration`, data)
            .pipe(
                catchError(this.handleError)
            )
    }

    login(data: Login): Observable<Login> {
        return this.http.post<Login>(`${this.baseUrl}/login`, data)
            .pipe(
                catchError(this.handleError)
            )
    }
}