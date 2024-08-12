import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor() {}

  login() {
    this.isAuthenticatedSubject.next(true);
    console.log('logged in');
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    console.log('logged out');
  }
}
