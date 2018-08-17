import {throwError as observableThrowError,  Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import * as jwt_decode from 'jwt-decode';

import { HttpClient } from '@angular/common/http';
import { Response, Headers } from '@angular/http';

import { User } from './user.model';
//import { ErrorService } from '../errors/error.service';

declare var auth0: any;

interface TokenDto {
  string: string;
  exp: number;
  iat: number;
}

@Injectable()
export class AuthService {
  authCallOccurred = new EventEmitter<String>();

  display: string = 'none';

  auth0 = new auth0.WebAuth({
    domain: 'makks.eu.auth0.com',
    clientID: 'asLK8UP5QoSpU8ZZ8x8ZY82fnjSWb4pl',
    // specify your desired callback URL
    redirectUri: 'localhost:3000',
    responseType: 'token id_token'
  });

  public incorrectUserOrPassword = false;
  public loggedInUser: string = "";
  public emailVerified: boolean = false;

  constructor(/*public errorService: ErrorService,*/ private http: HttpClient) {
    if(localStorage.getItem('access_token') && this.isAuthenticated()){
      if(localStorage.getItem('user')){
        this.loggedInUser = localStorage.getItem('user');
      }
      this.auth0.client.userInfo(localStorage.getItem('access_token'), (err: any, user: any) => {
        if(err){
          this.loggedInUser = "";
          var errorCode = err.code;
          var errorMessage = err.message;
          //this.errorService.handleError(err);
          return observableThrowError(err);
        }
        if(user){
        this.loggedInUser = user.username;
        //readd later after fully checked and tested
        this.emailVerified = user.email_verified;
        }
      });
    }
    else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('user');
    }
  }

  public handleAuthentication(): void {
    this.incorrectUserOrPassword = false;
    this.auth0.parseHash({ _idTokenVerification: false}, (err: any, authResult: any) => {
      if(err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        //this.errorService.handleError(err);
        return observableThrowError(err);
      }
      if(authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);

        this.auth0.client.userInfo(authResult.accessToken, (err: any, user: any) => {
          if(user){
            window.location.hash = '';
            localStorage.setItem('user', user.username);
            this.loggedInUser = user.username;
            this.emailVerified = user.email_verified;
          }
          else{
            this.incorrectUserOrPassword = true;
          }
        });
      }
    });
  }

  public login(username: string, password: string): void {
    this.auth0.redirect.loginWithCredentials({
      connection: 'Chapp',
      username: username,
      password: password
    }, (err: any, user: any) => {
      if (err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        //this.errorService.handleError(err);
        return observableThrowError(err);
      }
      localStorage.setItem('user', username);
      this.emailVerified = user.email_verified;
    });
  }

  public signup(username: string, email: string, password: string, user: User): void {
    if(this.isAuthenticated){
      this.logout();
    };
    this.auth0.signup({
      connection: 'Chapp',
      email: email,
      username: username,
      password: password
    }, (err: any) => {
      if (err) {
        var errorCode = err.code;
        var errorMessage = err.description;
        //this.errorService.handleError(err);
        return observableThrowError(err);
      };
      /*this.addUser(user)
  			.subscribe(
  				data => console.log(data),
  				error => console.error(error)
  			);*/
    });
  }

  public isAuthenticated(): boolean {
    const sessionIdInfo: TokenDto = jwt_decode(localStorage.getItem('token'));
    const currentDate = new Date();
    const current_ts: number = Math.floor(currentDate.valueOf() / 1000);
    console.log(sessionIdInfo.exp);
    console.log(current_ts);
    if(current_ts > sessionIdInfo.exp){
     console.log("Token expired");
     return false;
   }
    else {
      return true;
    }
  }

  public isIncorrect(): boolean {
    return this.incorrectUserOrPassword;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.loggedInUser = "";
  }

  private setUser(authResult: any){
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }

  public addUser(user: User){
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    /*return this.http.post('https://class-tracker.herokuapp.com/user', body, {headers: headers}).pipe(
      map((response: Response) => {
        console.log(response);
        response.json();
      }),
      catchError((error: Response) => {
        console.log(error.json());
        //this.errorService.handleError(error.json());
        return observableThrowError(error.json());
      }),);*/
  }

  public reset(email: string){
    this.auth0.changePassword({
      connection: 'Chapp',
      email: email
    }, function (err: any, resp: any) {
      if(err){
        var errorCode = err.code;
        var errorMessage = err.message;
        //this.errorService.handleError(err);
        return observableThrowError(err);
      }
      else{
        console.log(resp);
      }
    });
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

}
