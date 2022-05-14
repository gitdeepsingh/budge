import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register, Login, Profile, UserProfile, Expense } from './types';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3001';

  private handleError(err: HttpErrorResponse) {
    return throwError({
      message: err?.error?.error?.message || 'INTERNAL_SERVER_ERROR',
      status: err?.status || 500,
    });
  }

  registerUser(data: Register): Observable<Register> {
    return this.http
      .post<Register>(`${this.baseUrl}/registration`, data)
      .pipe(catchError(this.handleError));
  }

  login(data: Login): Observable<Login> {
    return this.http
      .post<Login>(`${this.baseUrl}/login`, data)
      .pipe(catchError(this.handleError));
  }

  getProfile(data: Profile): Observable<UserProfile> {
    return this.http
      .get<UserProfile>(`${this.baseUrl}/profile/${data.email}`)
      .pipe(catchError(this.handleError));
  }

  createExpense(data: Expense): Observable<Expense> {
    return this.http
      .post<Expense>(`${this.baseUrl}/create-expense`, data)
      .pipe(catchError(this.handleError));
  }
}
