import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ICredentials, ILogData } from '@models/credentials.model';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let spyHttpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });

    service = TestBed.inject(AuthenticationService);
    spyHttpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update auth status, log in & log out user', () => {
    sessionStorage.clear();
    spyOn(spyHttpClient, 'post').and.returnValue(of({ token: 'token-test' }));
    let status;

    expect(sessionStorage.getItem('token')).toBeNull();

    service.isAuthenticated$.subscribe((isAuth) => {
      status = isAuth;
    });

    service.logout();
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(status).toBeFalse();

    service.login({ username: 'tester', password: 'testPassw0rd' }).subscribe();

    expect(status).toBeTrue();
    expect(sessionStorage.getItem('token')).toBeTruthy();
    expect(spyHttpClient.post).toHaveBeenCalled();

    service.logout();
    expect(status).toBeFalse();
  });

  it('checkPreviousSession should come back the saved token and set the auth flag', () => {
    let status;

    sessionStorage.clear();

    service.isAuthenticated$.subscribe((isAuth) => {
      status = isAuth;
    });

    service.checkPreviousSession();
    expect(status).toBeFalse();

    sessionStorage.setItem('token', 'test-token');

    service.checkPreviousSession();
    expect(status).toBeTrue();
  });

  it('should handle register error', (done) => {
    const mockUserData: ILogData = {
      username: 'test_user',
      password: 'password123',
      email: 'tester@test.dev',
      name: { firstname: 'testino', lastname: 'tester' },
    };
    const mockError = new HttpErrorResponse({ error: 'Registration failed' });

    spyOn(spyHttpClient, 'post').and.returnValue(throwError(() => mockError));

    service.register(mockUserData).subscribe({
      next: () => fail('Unexpected success'),
      error: (httpErrorResponse: HttpErrorResponse) => {
        expect(httpErrorResponse.error).toEqual('Registration failed');
        done();
      },
    });
  });

  it('should handle login error', (done) => {
    const mockCredentials: ICredentials = {
      username: 'test_user',
      password: 'password123',
    };
    const mockError = new HttpErrorResponse({ error: 'Login failed' });

    spyOn(spyHttpClient, 'post').and.returnValue(throwError(() => mockError));

    service.login(mockCredentials).subscribe({
      error: (httpErrorResponse) => {
        expect(httpErrorResponse.message).toEqual('Login error: Login failed');
        service.isAuthenticated$.subscribe((isAuth) =>
          expect(isAuth).toBeFalse()
        );
        done();
      },
    });
  });
});
