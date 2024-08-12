import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {
  HttpClient,
  HttpErrorResponse,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(), provideAnimations()],
    });

    fixture = TestBed.createComponent(LoginComponent);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm.value).toBeTruthy();
  });

  describe('login cases', () => {
    it('login should auth successfully', () => {
      const testCredentials = { username: 'testino', password: 'testPassw0rd' };
      spyOn(httpClient, 'post').and.returnValue(of({ token: 'token-test' }));
      spyOn(authService, 'login').and.callThrough();

      component.loginForm.patchValue(testCredentials);

      component.login();

      expect(httpClient.post).toHaveBeenCalled();
      expect(httpClient.post).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledOnceWith(testCredentials);
    });

    it('login should failed auth', () => {
      const testCredentials = { username: 'testino', password: 'testPassw0rd' };
      let status;

      spyOn(httpClient, 'post').and.returnValue(
        throwError(() => new HttpErrorResponse({ error: 'Test http error' }))
      );
      spyOn(authService, 'login').and.callThrough();

      authService.isAuthenticated$.subscribe((isAuth) => {
        status = isAuth;
      });

      expect(status).toBeFalse();

      component.loginForm.patchValue(testCredentials);

      component.login();

      expect(httpClient.post).toHaveBeenCalled();
      expect(status).toBeFalse();
    });
  });
});
