import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

describe('AppComponent', () => {
  let authService: AuthenticationService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    authService = TestBed.inject(AuthenticationService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'eagle-wear' title`, () => {
    expect(app.title).toEqual('eagle-wear');
  });

  it('test ngOnInit should call checkPreviusSession method', () => {
    const spyAuthCheck = spyOn(authService, 'checkPreviousSession');

    app.ngOnInit();

    expect(spyAuthCheck).toHaveBeenCalled();
  });
});
