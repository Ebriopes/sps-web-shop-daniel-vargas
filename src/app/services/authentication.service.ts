import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials, ILogData } from '@models/credentials.model';
import { IUser } from '@models/user.model';

import { BehaviorSubject, map, Observable } from 'rxjs';

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
        this.isAuthenticatedSubject.next(true);

        return response;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    this.isAuthenticatedSubject.next(false);
  }
}
