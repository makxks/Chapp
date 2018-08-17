import { getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

import { ChatComponent } from '../chat/chat.component';

import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

import { MockBackend } from '@angular/http/testing';

import { User } from './user.model';

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

let fixture: ComponentFixture<AuthComponent>;
let comp: AuthComponent;
let authService: AuthService;
let user: User;

export class MockAuthService {
  authCallOccurred = new EventEmitter<String>();

  display: string = 'none';

  public handleAuthentication(): void {
    return;
  }

  public handleAuthClick(type: string){
    this.authCallOccurred.emit(type);
  }

  public showHideAuthModal(showHide: string){
    this.display = showHide;
  }

  public getAuthModalDisplay(){
    return this.display;
  }

  public signup(username: string, email:string, fakepassword: string){
    return;
  }
}

describe(`AuthComponent tests`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent, ChatComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        MockBackend
      ]
    })
    .overrideComponent(AuthComponent, {
      set: {
        providers: [{ provide: AuthService, useValue: new MockAuthService() }]
      }
    })
    .compileComponents();
    fixture = TestBed.createComponent(AuthComponent);
    comp = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
  });

  afterEach(() => {
    getTestBed().resetTestingModule();
  });

  it('should have display type of "login" at first', () => {
    expect(comp.displayType == 'login');
  });

  it('should be hidden', () => {
    expect(authService.getAuthModalDisplay() == 'none')
  })

  it('should change the display type when tabs are clicked', () =>
 {
    fixture.detectChanges();

    let suButton = fixture.debugElement.query(By.css('#signupButton'));

    let selectSignup = chai.spy.on(suButton, 'displayTypeChange');

    suButton.triggerEventHandler('click', {});
    expect(selectSignup).to.have.been.called;
    expect(comp.displayType == 'signup');

    fixture.detectChanges();

    let liButton = fixture.debugElement.query(By.css('#loginButton'));

    let selectLogin = chai.spy.on(liButton, 'displayTypeChange');

    liButton.triggerEventHandler('click', {});
    expect(selectLogin).to.have.been.called;
    expect(comp.displayType == 'login');

    fixture.detectChanges();

    let loButton = fixture.debugElement.query(By.css('#logoutButton'));

    let selectLogout = chai.spy.on(loButton, 'displayTypeChange');

    loButton.triggerEventHandler('click', {});
    expect(selectLogout).to.have.been.called;
    expect(comp.displayType == 'logout');
  });

  it('should pass the values in the form to sign up function', () => {
    fixture.detectChanges();

    let suButton = fixture.debugElement.query(By.css('#signupButton'));

    let selectSignup = chai.spy.on(suButton, 'displayTypeChange');

    suButton.triggerEventHandler('click', {});
    expect(selectSignup).to.have.been.called;

    var testUsername = "Max";
    var testEmail = "blah@blah.com";
    var testPassword = "test";
    comp.signupForm.value.username = testUsername;
    comp.signupForm.value.email = testEmail;
    comp.signupForm.value.password = testPassword;

    user = comp.onSignup();

    expect(user.name == comp.signupForm.value.username);
    expect(user.email == comp.signupForm.value.email);
  });

  it('should pass the entered username to the login function on login', () => {
    fixture.detectChanges();

    var testUsername = "Max";
    var testPassword = "test";
    comp.loginForm.value.username = testUsername;

    user = comp.onLogin();

    expect(user.name == comp.loginForm.value.username);
  })


  /* snip */
});
