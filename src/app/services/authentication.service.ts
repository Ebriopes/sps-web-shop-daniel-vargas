import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

import { ICredentials, ILogData } from '@models/credentials.model';
import { IUser } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private baseUrl = 'https://fakestoreapi.com';

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  register(data: ILogData): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}/users`, data);
  }

  login(credentials: ICredentials): Observable<string> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, credentials).pipe(
      map((response) => {
        if (response?.token) {
          this.isAuthenticatedSubject.next(true);

          sessionStorage.setItem('token', response.token);

          return response.token;
        }

        this.isAuthenticatedSubject.next(false);
      }),
      catchError((httpError: HttpErrorResponse) => {
        this.isAuthenticatedSubject.next(false);

        console.error('Login error:', httpError.error);

        return throwError(() => new Error(`Login error: ${httpError.error}`));
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    this.isAuthenticatedSubject.next(false);
  }

  checkPreviousSession() {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }
}
